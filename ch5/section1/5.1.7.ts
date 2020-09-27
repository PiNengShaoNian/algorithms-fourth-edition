import LoopQueue from '../../lib/LoopQueue'
const charAt = (s: string, d: number) => {
  if (d < s.length) return s.charCodeAt(d)
  return -1
}
const keyIndexedCountWithQueue = (array: string[], stringsLength: number) => {
  const alphabetSize = 256

  const count: LoopQueue<string>[] = Array.from(
    { length: alphabetSize + 1 },
    () => new LoopQueue()
  )

  for (let digit = stringsLength - 1; digit >= 0; digit--) {
    for (let i = 0; i < array.length; i++) {
      const keyIndex = charAt(array[i], digit)
      count[keyIndex].enqueue(array[i])
    }

    let keyIndex = 0
    for (let i = 0; i < count.length; i++) {
      while (count[i].size()) {
        array[keyIndex++] = count[i].dequeue()!
      }
    }
  }
}
