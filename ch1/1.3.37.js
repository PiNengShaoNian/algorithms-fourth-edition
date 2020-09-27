const josephus = (N, M) => {
  const arr = Array.from({ length: N }, (_, i) => i + 1)
  const queue = []

  let index = 0
  while (arr.length > 1) {
    const len = arr.length
    index = index + M - 1
    if (index >= len) {
      index = index % len
    }

    queue.push(arr[index])
    arr.splice(index, 1)
  }

  return queue
}

const result = josephus(4, 4)
console.log(result)
