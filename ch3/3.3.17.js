import rfdc from './rfdc.js'

const clone = rfdc({ proto: true })
const snapshots = []

class Node {
  constructor(key, val, N) {
    this.key = key
    this.val = val
    this.N = N
  }
}

class Key {
  constructor(key) {
    this.key = key
  }

  compareTo(that) {
    const min = Math.min(that.key.length, this.key.length)

    for (let i = 0; i < min; i++) {
      if (this.key[i] < that.key[i]) return -1
      else if (this.key[i] > that.key[i]) return 1
    }

    return this.key.length - that.key.length
  }

  toString() {
    return this.key
  }
}

class BST {
  put(key, val) {
    this.root = this._put(this.root, new Key(key), val)
  }

  size() {
    return this._size(this.root)
  }

  _size(x) {
    if (x == null) return 0
    return x.N
  }

  _put(x, key, val) {
    if (x == null) return new Node(key, val, 1)

    const cmp = key.compareTo(x.key)

    if (cmp > 0) x.right = this._put(x.right, key, val)
    else if (cmp < 0) x.left = this._put(x.left, key, val)
    else x.val = val

    x.N = this._size(x.left) + this._size(x.right) + 1

    return x
  }
}

const RED = true
const BLACK = false

class BlackRedNode {
  constructor(key, val, N, color) {
    this.key = key
    this.val = val
    this.N = N
    this.color = color
  }
}

class BlackRedBST {
  isRed(x) {
    if (x == null) return false

    return x.color === RED
  }

  size() {
    return this._size(this.root)
  }

  _size(x) {
    if (x == null) return 0
    return x.N
  }

  rotateLeft(h) {
    const x = h.right
    h.right = x.left
    x.left = h
    x.color = h.color
    h.color = RED
    x.N = h.N
    h.N = 1 + this._size(h.left) + this._size(h.right)
    return x
  }

  rotateRight(h) {
    const x = h.left
    h.left = x.right
    x.right = h
    x.color = h.color
    h.color = RED
    x.N = h.N
    h.N = 1 + this._size(h.left) + this._size(h.right)

    return x
  }

  put(key, val) {
    this.root = this._put(this.root, new Key(key), val)
    this.root.color = BLACK
  }

  _put(h, key, val) {
    if (h == null) return new BlackRedNode(key, val, 1, RED)

    const cmp = key.compareTo(h.key)
    if (cmp < 0) h.left = this._put(h.left, key, val)
    else if (cmp > 0) h.right = this._put(h.right, key, val)
    else h.val = val

    if (this.isRed(h.right) && !this.isRed(h.left)) h = this.rotateLeft(h)
    if (this.isRed(h.left) && this.isRed(h.left.left)) h = this.rotateRight(h)
    if (this.isRed(h.left) && this.isRed(h.right)) this.flipColors(h)

    h.N = this._size(h.left) + this._size(h.right) + 1

    return h
  }

  flipColors(node) {
    if (node == null || node.left == null || node.right == null) return

    if (
      (this.isRed(node) && !this.isRed(node.left) && !this.isRed(node.right)) ||
      (!this.isRed(node) && this.isRed(node.left) && this.isRed(node.right))
    ) {
      node.color = !node.color
      node.left.color = !node.left.color
      node.right.color = !node.right.color
    }
  }

  moveRedLeft(node) {
    this.flipColors(node)

    snapshots.push(clone(this))

    if (node.right != null && this.isRed(node.right.left)) {
      snapshots.push(clone(this))
      node.right = this.rotateRight(node.right)
      snapshots.push(clone(this))
      debugger
      node = this.rotateLeft(node)
      snapshots.push(clone(this))
      this.flipColors(node)
    }

    snapshots.push(clone(this))

    return node
  }

  _deleteMin(node) {
    if (node.left == null) return null

    snapshots.push(clone(this))
    if (!this.isRed(node.left) && !this.isRed(node.left.left)) {
      snapshots.push(clone(this))
      node = this.moveRedLeft(node)
      snapshots.push(clone(this))
    }

    snapshots.push(clone(this))

    node.left = this._deleteMin(node.left)

    snapshots.push(clone(this))

    return this.balance(node)
  }

  balance(node) {
    if (node == null) return null

    snapshots.push(clone(this))
    if (this.isRed(node.right)) {
      node = this.rotateLeft(node)
    }

    if (this.isRed(node.left) && this.isRed(node.left.left)) {
      node = this.rotateRight(node)
    }

    if (this.isRed(node.left) && this.isRed(node.right)) {
      this.flipColors(node)
    }

    node.size = this._size(node.left) + 1 + this._size(node.right)

    snapshots.push(clone(this))
    return node
  }

  isEmpty() {
    return this.size() === 0
  }

  deleteMin() {
    if (this.isEmpty()) return

    snapshots.push(clone(this))

    if (!this.isRed(this.root.left) && !this.isRed(this.root.right)) {
      this.root.color = RED
    }

    this.root = this._deleteMin(this.root)
    if (!this.isEmpty()) {
      this.root.color = BLACK
    }
  }
}

const draw = (root, id) => {
  let treeLevel = 0
  const size = root.N
  const context = document.getElementById(id).getContext('2d')
  const width = 1000
  context.clearRect(0, 0, width, width)
  const setCoordinates = (node, distance) => {
    if (node == null) return

    setCoordinates(node.left, distance + 0.05)
    node.xCoordinate = (0.5 + treeLevel++) / size
    node.yCoordinate = distance + 0.05
    setCoordinates(node.right, distance + 0.05)
  }

  const drawLines = (node) => {
    if (node == null) return

    drawLines(node.left)

    if (node.left != null) {
      context.beginPath()
      context.moveTo(node.xCoordinate * width, node.yCoordinate * width)
      context.lineTo(
        node.left.xCoordinate * width,
        node.left.yCoordinate * width
      )
      context.lineWidth = 1
      if (node.left.color === RED) {
        context.strokeStyle = 'red'
      } else {
        context.strokeStyle = 'black'
      }
      context.stroke()
    }
    if (node.right != null) {
      context.beginPath()
      context.moveTo(node.xCoordinate * width, node.yCoordinate * width)
      context.lineTo(
        node.right.xCoordinate * width,
        node.right.yCoordinate * width
      )
      context.lineWidth = 1
      if (node.right.color === RED) {
        context.strokeStyle = 'red'
      } else {
        context.strokeStyle = 'black'
      }
      context.stroke()
    }

    drawLines(node.right)
  }

  const drawNodes = (node) => {
    if (node == null) return

    const nodeRadius = 0.022

    drawNodes(node.left)

    context.beginPath()
    context.strokeStyle = 'black'
    context.arc(
      node.xCoordinate * width,
      node.yCoordinate * width,
      nodeRadius * width,
      0,
      2 * Math.PI
    )

    context.stroke()

    context.font = 'bold 20px arial'
    context.fillStyle = 'red'
    context.textBaseline = 'middle'
    context.textAlign = 'center'
    context.fillText(
      node.key.key,
      node.xCoordinate * width,
      node.yCoordinate * width
    )

    drawNodes(node.right)
  }

  setCoordinates(root, 0)

  drawLines(root)

  drawNodes(root)

  return root
}

// const root = draw(blackRedBST.root)
// console.log({
//   x: root.xCoordinate,
//   y: root.yCoordinate,
// })

const shuffle = (arr) => {
  const len = arr.length
  for (let i = 0; i < len; i++) {
    const index = Math.floor(len * Math.random())
    const temp = arr[index]
    arr[index] = arr[i]
    arr[i] = temp
  }

  return arr
}

const str = 'ABCDEFGHIJKLMNOPQR'

const generateTree = (arr, type) => {
  const blackRedBST = new BlackRedBST()
  const bst = new BST()
  for (let i = 0; i < arr.length; i++) {
    if (type === 'bst') {
      bst.put(arr[i], i)
    } else {
      blackRedBST.put(arr[i], i)
    }
  }

  return type === 'bst' ? bst : blackRedBST
}
// const arr = shuffle(str.split(''))
const arr = [...'SAEOCSCSDSFJLM']
// const bst = generateTree(arr, 'bst')
const tree = generateTree(arr)

tree.deleteMin()
let current = 0
const text = document.getElementById('text')
const prev = document.getElementById('prev')
const next = document.getElementById('next')
const currentIndex = document.getElementById('current')

text.textContent = snapshots.length

next.addEventListener('click', () => {
  if (current >= snapshots.length - 2) return
  current += 1
  currentIndex.textContent = current
  draw(snapshots[current].root, 'blackRedBST')
  draw(snapshots[current + 1].root, 'BST')
})

prev.addEventListener('click', () => {
  if (current <= 0) return
  current -= 1
  currentIndex.textContent = current
  draw(snapshots[current].root, 'blackRedBST')
  draw(snapshots[current + 1].root, 'BST')
})

draw(snapshots[1].root, 'blackRedBST')
draw(snapshots[2].root, 'BST')

// draw(tree.root, 'blackRedBST')
currentIndex.textContent = 0
