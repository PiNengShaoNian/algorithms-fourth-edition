class LinkedList {
  first = null
  N = 0

  constructor(item) {
    this.last = this.first = {
      item,
      next: null,
    }
    this.N = 1
  }

  add(item) {
    if (!this.last) {
      this.first = this.last = {
        item,
        next: null,
      }
      return
    }
    const node = {
      item,
      next: null,
    }
    this.last.next = node
    this.last = node
    this.N++
  }

  size() {
    return this.N
  }

  remove(k) {
    if (typeof k === 'number') {
      if (k > this.N - 1) return
      let node = this.first
      let prev
      while (k) {
        k--
        prev = node
        node = node.next
      }

      if (!node.next) {
        prev.next = null
      } else {
        prev.next = node.next
      }
    } else if (typeof k === 'object') {
      let node = this.first
      let prev
      while (true && node) {
        if (node === k) {
          break
        }
        prev = node
        node = node.next
      }

      if (node) {
        if (prev) {
          prev.next = node.next
        } else this.first = this.first.next
      }
    }
  }

  *[Symbol.iterator]() {
    for (let x = this.first; x; x = x.next) {
      yield x
    }
  }
}

const list = new LinkedList(1)
list.add(2)
list.add(3)

const max = (node, i) => {
  console.log({ i, node })
  if (node.next) {
    return max(node.next, i > node.next.item ? i : node.next.item)
  } else return i
}

// const result = max(list.first, list.first.item)

const reverse = (x) => {
  let first = x
  let reverse = null

  while (first) {
    const second = first.next
    first.next = reverse
    reverse = first
    first = second
  }

  return reverse
}

// const result = reverse(list.first)
// console.log(result)

const reverse1 = (first) => {
  if (first === null) return null
  if (!first.next) return first
  const second = first.next
  const rest = reverse1(second)
  second.next = first
  first.next = null

  return rest
}

const result = reverse1(list.first)
console.log(result)
