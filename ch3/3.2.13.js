class Node {
  constructor(key, val, N) {
    this.key = key
    this.val = val
    this.N = N
  }
}

class BST {
  get(key) {
    this._get(this.root, key)
  }

  _get(x, key) {
    while (x) {
      const cmp = key.compareTo(x.key)

      if (cmp < 0) x = x.left
      else if (cmp > 0) x = x.right
      else return x.val
    }

    return null
  }

  put(key, val) {
    this._put(this.root, key, val)
  }

  _put(x, key, val) {
    const stack = []

    while (x) {
      stack.push(x)
      const cmp = key.compareTo(x.key)

      if (cmp < 0) x = x.left
      else if (cmp > 0) x = x.right
      else return (x.val = val)
    }

    const parent = stack[stack.length - 1]
    const cmp = key.compareTo(parent.key)
    const node = new Node(key, val, 1)
    if (cmp < 0) parent.left = node
    else parent.right = node

    while (stack.length > 0) stack.pop().N += 1
  }
}
