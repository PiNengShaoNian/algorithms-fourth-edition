class BinarySearch {
  constructor(list) {
    this.list = list
  }

  search(key) {
    console.log(this.list)
    let low = 0
    let high = this.list.length - 1
    while (low <= high) {
      const mid = Math.floor((low + high) / 2)
      console.log({
        mid,
        midValue: this.list[mid],
      })
      if (this.list[mid] === key) return mid
      else if (this.list[mid] > key) {
        high = mid - 1
      } else {
        low = mid + 1
      }
    }

    return -1
  }
}

const binarySearch = new BinarySearch([1, 3, 5, 7, 13, 50, 99])

const index = binarySearch.search(1)
console.log({ index })
