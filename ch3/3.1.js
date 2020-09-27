class Node {
  constructor(key, val, next) {
    this.key = key
    this.val = val
    this.next = next
  }
}

class SequentialSearchST {
  first = null

  get(key) {
    for (let x = this.first; x != null; x = x.next) {
      if (key.equals(x.key)) return x.val
    }

    return null
  }

  set(key, val) {
    for (let x = this.first; x != null; x = x.next) {
      if ((key.equals && key.equals(x.key)) || key === x.key) {
        x.val = val
        return
      }
    }

    this.first = new Node(key, val, this.first)
  }

  *[Symbol.iterator]() {
    for (let x = this.first; x != null; x = x.next) {
      yield x
    }
  }
}

const sst = new SequentialSearchST()

sst.set(1, 1)
sst.set(2, 2)
sst.set(3, 3)
sst.set(1, 4)
for (let x of sst) console.log(x.val)
