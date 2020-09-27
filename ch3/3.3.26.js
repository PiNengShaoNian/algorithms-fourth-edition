const RED = true
const BLACK = false

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

class Node {
  constructor(key, value, size, color) {
    this.key = key
    this.value = value
    this.size = size
    this.color = color
  }
}

class RedBlackIterative234BST {
  size() {
    return this._size(this.root)
  }

  _size(node) {
    if (!node) return 0

    return node.size
  }

  isEmpty() {
    return this._size(this.root) === 0
  }

  isRed(node) {
    if (!node) return false

    return node.color === RED
  }

  rotateLeft(node) {
    if (!node || !node.right) return node
    const newRoot = node.right

    node.right = newRoot.left
    newRoot.left = node

    newRoot.color = node.color
    node.color = RED

    newRoot.size = node.size
    node.size = this._size(node.left) + 1 + this._size(node.right)

    return newRoot
  }

  rotateRight(node) {
    if (!node || !node.left) return node

    const newRoot = node.left

    node.left = newRoot.right
    newRoot.right = node

    newRoot.color = node.color
    node.color = RED

    newRoot.size = node.size
    node.size = this._size(node.left) + 1 + this._size(node.right)

    return newRoot
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

  contains(key) {
    if (!key) throw new Error('Argument to contains() cannot be null')

    return this.get(key) != null
  }

  get(key) {
    let current = this.root
    key = key.compareTo ? key : new Key(key)
    while (current) {
      const compare = key.compareTo(current.key)

      if (compare < 0) {
        current = current.left
      } else if (compare > 0) {
        current = current.right
      } else return current.value
    }

    return null
  }

  put(key, val) {
    if (!key) return

    debugger

    const isANewNode = !this.contains(key)
    let godparentNode = null
    let grandparentNode = null

    let parentNode = null

    let currentNode = this.root

    key = new Key(key)

    if (!this.root) this.root = new Node(key, val, 1, RED)
    else {
      while (currentNode) {
        if (isANewNode) {
          currentNode.size = currentNode.size + 1
        }

        if (this.isRed(currentNode.left) && this.isRed(currentNode.right)) {
          this.flipColors(currentNode)
        }

        if (
          grandparentNode &&
          this.isRed(grandparentNode.left) &&
          this.isRed(grandparentNode.left.left)
        ) {
          grandparentNode = this.rotateRight(grandparentNode)
          updateParentReference(godparentNode, grandparentNode)
        }

        if (this.isRed(currentNode.right) && !this.isRed(currentNode.left)) {
          currentNode = this.rotateLeft(currentNode)
          this.updateParentReference(parentNode, currentNode)
        }

        if (this.isRed(currentNode.left) && this.isRed(currentNode.left.left)) {
          currentNode = this.rotateRight(currentNode)
          this.updateParentReference(parentNode, currentNode)
        }

        const compare = key.compareTo(currentNode.key)

        if (compare < 0) {
          if (!currentNode.left) {
            currentNode.left = new Node(key, val, 1, RED)
            break
          }

          godparentNode = grandparentNode
          grandparentNode = parentNode
          parentNode = currentNode

          currentNode = currentNode.left
        } else if (compare > 0) {
          if (!currentNode.right) {
            currentNode.right = new Node(key, val, 1, RED)
            break
          }

          godparentNode = grandparentNode
          grandparentNode = parentNode
          parentNode = currentNode
          currentNode = currentNode.right
        } else {
          currentNode.value = val
          break
        }
      }
    }

    if (currentNode) {
      if (this.isRed(currentNode.left) && this.isRed(currentNode.right)) {
        this.flipColors(currentNode)
      }

      if (this.isRed(currentNode.right) && !this.isRed(currentNode.left)) {
        currentNode = this.rotateLeft(currentNode)
        this.updateParentReference(parentNode, currentNode)
      }

      if (
        parentNode &&
        this.isRed(parentNode.left) &&
        this.isRed(parentNode.left.left)
      ) {
        parentNode = this.rotateRight(parentNode)
        this.updateParentReference(grandparentNode, parentNode)
      }
    }

    this.root.color = BLACK
  }

  updateParentReference(parent, child) {
    if (!parent) this.root = child
    else {
      const isCurrentNodeLeftChild = child.key.compareTo(parent.key) < 0

      if (isCurrentNodeLeftChild) {
        parent.left = child
      } else {
        parent.right = child
      }
    }
  }

  deleteMin() {
    this.root = this._deleteMin(this.root, false)
  }

  _deleteMin(subtreeRoot, isDelete) {
    if (this.isEmpty()) return null

    if (!subtreeRoot.left) return subtreeRoot.right

    if (!this.isRed(subtreeRoot.left) && !this.isRed(subtreeRoot.right)) {
      subtreeRoot.color = RED
    }

    let grandparent = null
    let parent = null
    let currentNode = subtreeRoot

    const nodeDeleted = false

    while (currentNode) {
      if (!nodeDeleted) {
        currentNode.size = currentNode.size - 1
      }

      if (
        !this.isRed(currentNode.left) &&
        currentNode &&
        !this.isRed(currentNode.left.left)
      ) {
        let updateSubtreeRoot = false
        if (currentNode === subtreeRoot) {
          updateSubtreeRoot = true
        }

        currentNode = moveRedLeft(currentNode)
        this.updateParentReference(parent, currentNode)

        if (updateSubtreeRoot) {
          subtreeRoot = currentNode
        }
      }
    }
  }
}

const bst = new RedBlackIterative234BST()

bst.put('a', 1)
bst.put('b', 1)
bst.put('c', 1)

console.log(bst)
