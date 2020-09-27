class Node {
  next
  item
}

class NodeMaxPQ {
  pq = new Node()
  last
  insert(v) {
    const node = new Node()
    node.item = v
    if (!this.pq.item) {
      this.pq = node
      this.last = node
    } else {
      this.last.next = node
      this.last = node
    }
  }

  deleteMax() {
    let cur = this.pq
    let pre = this.pq
    let max = this.pq
    let maxPre = this.pq

    while (cur) {
      if (cur.item > max.item) {
        max = cur
        maxPre = pre
      }
      pre = cur
      cur = cur.next
    }

    if (max === this.pq) {
      this.pq = this.pq.next
    } else maxPre.next = maxPre.next.next

    return max
  }
}

const nodeMaxPQ = new NodeMaxPQ()
nodeMaxPQ.insert(10)
nodeMaxPQ.insert(3)
nodeMaxPQ.insert(9)
nodeMaxPQ.insert(8)
nodeMaxPQ.deleteMax()
nodeMaxPQ.deleteMax()
console.log(nodeMaxPQ.pq)
