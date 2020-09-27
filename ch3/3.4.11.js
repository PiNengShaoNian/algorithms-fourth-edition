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
    this.keysSize = 0
  }

  put(key, value) {
    let index = this.hash(key)

    debugger

    if (!this.buckets[index]) {
      this.keysSize++
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

    this.keysSize++

    this.buckets[index] = new Node(key, value)

    if (this.getLoadFactor() >= 0.5) {
      this.resize(this.numberOfBucket * 2)
    }
  }

  getLoadFactor() {
    return this.keysSize / this.numberOfBucket
  }

  resize(newBucketSize) {
    const tempBucket = this.buckets
    this.numberOfBucket = newBucketSize
    this.keysSize = 0
    this.buckets = Array.from({ length: newBucketSize }, () => null)

    for (let node of tempBucket) {
      if (node) {
        this.put(node.key, node.val)
      }
    }
  }

  hash(key) {
    return (key.charCodeAt(0) * 11) % this.numberOfBucket
  }
}

const st = new LinearProbingHashTable(4)
;[...'EASYQUESTION'].forEach((key) => {
  st.put(key, 1)
})
console.log(st)
