import LoopQueue from '../../lib/LoopQueue'

class BucketSort {
  private alphabetSize: number = 256
  private buckets: LoopQueue<string>[] | null = null

  bucketSort(strings: string[]) {
    this.buckets = Array.from(
      { length: this.alphabetSize + 1 },
      () => new LoopQueue()
    )

    for (let i = 0; i < strings.length; i++) {
      let leadingDigitIndex = strings[i].charCodeAt(0)

      this.buckets[leadingDigitIndex].enqueue(strings[i])
    }

    for (let bucket = 0; bucket < this.buckets.length; bucket++) {
      if (!this.buckets[bucket].isEmpty()) {
        this.sortBucket(this.buckets[bucket])
      }
    }

    let arrayIndex = 0
    for (let r = 0; r <= this.alphabetSize; r++) {
      while (!this.buckets[r].isEmpty()) {
        const currentString = this.buckets[r].dequeue()!
        strings[arrayIndex++] = currentString
      }
    }
    return strings
  }

  private sortBucket(bucket: LoopQueue<string>) {
    const strings: string[] = []

    while (bucket.size()) {
      strings.push(bucket.dequeue()!)
    }

    strings.sort()

    for (const string of strings) {
      bucket.enqueue(string)
    }
  }
}

console.log(new BucketSort().bucketSort(['b', 'a', 'ab', 'c']))
