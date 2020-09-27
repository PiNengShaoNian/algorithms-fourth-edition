class Node {
  right
  left
  parent
  item
}

class MaxPQ {
  pq = new Node()

  insert(v) {
    if (!this.pq.item) {
      this.pq.item = v
      this.last = this.pq
    } else {
      const node = new Node()
      node.item = v
      node.parent = this.last
      if (!this.last.right) {
        this.last.right = node
      } else {
        this.last.left = node
      }
      if (this.last.right && this.last.left) this.last = node
      this.swim(node)
    }
  }

  swim(node) {
    while (node.parent && this.less(node.parent, node)) {
      this.exch(node, node.parent)
      node = node.parent
    }
  }

  less(n1, n2) {
    return n1.item < n2.item
  }

  deleteMax() {
    if (this.last === this.pq) {
      const max = this.pq.item
      this.pq.item = undefined
      return max
    } else {
      const max = this.pq.item
      this.exch(this.pq, this.last)
      const parent = this.last.parent
      if (parent.right === this.last) {
        parent.right = undefined
      } else {
        parent.left = undefined
      }
      this.last.parent = undefined
      this.last = parent
      this.sink(this.pq)
      return max
    }
  }

  exch(n1, n2) {
    const t = n1.item
    n1.item = n2.item
    n2.item = t
  }

  sink(node) {
    while (node.right || node.left) {
      if (!node.right && this.less(node, node.left)) {
        this.exch(node, node.left)
      } else if (!node.left && this.less(node, node.right)) {
        this.exch(node, node.right)
      } else if (node.right && node.left) {
        const max = this.less(node.right, node.left) ? node.left : node.right
        if (this.less(node, max)) this.exch(node, max)
        else break
      } else break
    }
  }
}

const maxPQ = new MaxPQ()
maxPQ.insert(1)
maxPQ.insert(2)
maxPQ.insert(3)
debugger
for (let i = 0; i < 3; i++) console.log(maxPQ.deleteMax())
