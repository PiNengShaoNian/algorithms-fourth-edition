class Node {
  val
  key
  next
}

class OrderedSequentialSearchST {
  first = null
  tail = null
  N = 0

  put(key, val) {
    let right = this.first
    let left
    while (right != null && key > right.key) {
      left = right
      right = right.next
    }

    this.N++

    if (right && right.key === key) {
      right.val = val
      return
    }
    const node = new Node()
    node.key = key
    node.val = val
    node.next = right
    if (!right) this.tail = node
    if (left) left.next = node
    if (!this.first) {
      this.first = this.tail = node
    }
  }

  get(key) {
    for (let x = this.first; x != null; x = x.next) {
      if (x.key === key) return x.val
    }

    return null
  }

  *[Symbol.iterator]() {
    for (let x = this.first; x != null; x = x.next) {
      yield x
    }
  }

  size() {
    return this.N
  }

  select(k) {
    if (k > this.N) throw new Error('out of bounds')

    for (let x = this.first, i = k; i >= 0; i--) x = x.next

    return x
  }

  rank(key) {
    let right = this.first

    let i = 0
    while (right != null && key > right.key) {
      i++
      right = right.next
    }

    return i
  }

  min() {
    return this.first
  }

  max() {
    return this.tail
  }
}

const osst = new OrderedSequentialSearchST()

osst.put(1, 1)
osst.put(2, 2)
osst.put(3, 3)
osst.put(1, 4)
osst.put(4, 4)

// for (let x of osst) console.log(x.val)
console.log({
  min: osst.min(),
  max: osst.max(),
})
