class Queue {
  _queue = []

  constructor(...args) {
    this._queue.push(...args)
  }

  enqueue(i) {
    this._queue.push(i)
  }

  dequeue() {
    return this._queue.shift()
  }

  size() {
    return this._queue.length
  }

  isEmpty() {
    return this._queue.length === 0
  }
}

class Merge {
  sort(a, b) {
    return this.merge(a, b)
  }

  merge(a, b) {
    const r = new Queue()
    if (a.isEmpty() && b.isEmpty()) return qMerge
    else if (a.isEmpty()) return b
    else if (b.isEmpty()) return a
    let nextIsA = false
    let aItem = a.dequeue()
    let bItem = b.dequeue()
    while (true) {
      if (this.less(aItem, bItem)) {
        r.enqueue(aItem)
        nextIsA = true
      } else {
        r.enqueue(bItem)
        nextIsA = false
      }

      if (nextIsA && !a.isEmpty()) {
        aItem = a.dequeue()
      } else if (!nextIsA && !b.isEmpty()) {
        bItem = b.dequeue()
      } else if (nextIsA && a.isEmpty()) {
        r.enqueue(bItem)
        while (!b.isEmpty()) {
          r.enqueue(b.dequeue())
        }

        return r
      } else if (!nextIsA && b.isEmpty()) {
        r.enqueue(aItem)
        while (!a.isEmpty()) {
          r.enqueue(a.dequeue())
        }

        return r
      }
    }
  }

  less(a, b) {
    return a < b
  }
}

const merge = (...args) => {
  const queues = new Queue()
  for (let i = 0; i < args.length; i++) {
    queues.enqueue(new Queue(args[i]))
  }

  const m = new Merge()

  while (queues.size() > 1) {
    const t = m.sort(queues.dequeue(), queues.dequeue())
    queues.enqueue(t)
  }

  return queues
}

console.log(merge(5, 4, 3, 2, 1)._queue[0])
