class Node {
  item
  next
}

class Link {
  first
  tail

  constructor(...args) {
    for (let i = 0; i < args.length; i++) {
      const node = new Node()
      node.item = args[i]
      if (!this.first && !this.tail) {
        this.first = node
        this.tail = node
      } else {
        this.tail.next = node
        this.tail = this.tail.next
      }
    }
  }

  _sort(first) {
    debugger
    if (!first.next || !first.next.next) return

    let hiNext = first.next
    let preHiPre = new Node()

    let lo = first.next
    let sp = first.next
    let hi

    while (!(lo === first.next && !sp.next)) {
      lo = first.next
      while (lo) {
        sp = this.findAscIndex(lo)
        hi = this.findAscIndex(sp.next)
        if (!hi) break
        else {
          hiNext = hi.next
          this.merge(first, preHiPre, lo, sp, hi)
          lo = hiNext
        }
      }
    }
  }

  sort() {
    let node = new Node()
    node.next = this.first
    this._sort(node)
  }

  merge(first, preHiPre, lo, sp, hi) {
    let mergeFirst
    let mergeTail
    let leftMax = sp.next
    let rightMax = hi.next

    let i = lo
    let j = sp.next

    if (this.less(i.item, j.item)) {
      mergeFirst = i
      mergeTail = i
      i = i.next
    } else {
      mergeFirst = j
      mergeTail = j
      j = j.next
    }

    while (!(i === leftMax && j === rightMax)) {
      if (i === leftMax) {
        mergeTail.next = j
        mergeTail = mergeTail.next
        j = j.next
      } else if (j === rightMax) {
        mergeTail.next = i
        mergeTail = mergeTail.next
        i = i.next
      } else if (this.less(i.item, j.item)) {
        mergeTail.next = i
        mergeTail = mergeTail.next
        i = i.next
      } else {
        mergeTail.next = j
        mergeTail = mergeTail.next
        j = j.next
      }
    }
    mergeTail.next = rightMax

    if (first.next === lo) {
      first.next = mergeFirst
      preHiPre.next = mergeTail
    } else {
      preHiPre.next.next = mergeFirst
      preHiPre.next = mergeTail
    }
  }

  findAscIndex(lo) {
    if (!lo) return null
    let pre = lo
    let cur = lo.next
    while (cur) {
      if (this.less(cur.item, pre.item)) {
        break
      } else {
        pre = cur
        cur = cur.next
      }
    }

    return pre
  }

  less(a, b) {
    return a < b
  }

  *[Symbol.iterator]() {
    let cur = this.first
    while (cur) {
      yield cur.item
      cur = cur.next
    }
  }
}

link = new Link(2, 1)
link.sort()
console.log(link.first)
for (let i of link) console.log(i)
