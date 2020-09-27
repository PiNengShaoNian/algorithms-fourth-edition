class Node {
  constructor(key, val) {
    this.key = key
    this.val = val
  }
}

class LinearProbingHashTable {
  constructor(numberOfBucket) {
    this.buckets = Array.from(
      {
        length: numberOfBucket,
      },
      () => null
    )
    this.numberOfBucket = numberOfBucket
  }

  put(key, value) {
    let index = this.hash(key)

    if (!this.buckets[index]) {
      this.buckets[index] = new Node(key, value)
      return
    }

    let node = this.buckets[index]
    while (node) {
      if (node.key === key) {
        node.val = value
        return
      }
      index = (index + 1) % this.numberOfBucket
      node = this.buckets[index]
    }

    this.buckets[index] = new Node(key, value)
  }

  hash(key) {
    return (key.charCodeAt(0) * 11) % this.numberOfBucket
  }
}

const st = new LinearProbingHashTable(10)
;[...'EASYQUESTION'].forEach((key) => {
  debugger
  st.put(key, 1)
})
console.log(st)
