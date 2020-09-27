const RED = true
const BLACK = false

class Node {
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
    h.N = this._size(h.left) + this._size(h.right) + 1
    return x
  }

  flipColors(h) {
    h.color = RED
    h.left.color = BLACK
    h.right.color = BLACK
  }

  put(key, val) {
    this.root = this._put(this.root, key, val)
    this.root.color = BLACK
  }

  _put(h, key, val) {
    if (h == null) return new Node(key, val, 1, RED)

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

  
}
