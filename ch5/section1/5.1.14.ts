const uniform = (a: number, b: number) => {
  return Math.floor((b - a) * Math.random()) + a
}

class ArraySort {
  treeWayStringQuickSortArrays(arrays: number[][]) {
    this._treeWayStringQuickSortArrays(arrays, 0, arrays.length - 1, 0)
  }

  _treeWayStringQuickSortArrays(
    arrays: number[][],
    low: number,
    high: number,
    valueIndex: number
  ) {
    if (low >= high) return

    let lowerThan = low
    let greaterThan = high

    const pivotIndex = uniform(low, high + 1)
    this.swapArrays(arrays, low, pivotIndex)

    const pivot = this.valueAt(arrays[low], valueIndex)

    let index = low + 1

    while (index <= greaterThan) {
      const currentValue = this.valueAt(arrays[index], valueIndex)

      if (
        (currentValue === null && pivot !== null) ||
        (pivot !== null &&
          typeof currentValue === 'number' &&
          currentValue < pivot)
      ) {
        this.swapArrays(arrays, lowerThan++, index++)
      } else if (
        (pivot === null && currentValue !== null) ||
        (pivot !== null && currentValue !== null && currentValue > pivot)
      ) {
        this.swapArrays(arrays, index, greaterThan--)
      } else index++
    }

    this._treeWayStringQuickSortArrays(arrays, low, lowerThan - 1, valueIndex)

    if (pivot !== null) {
      this._treeWayStringQuickSortArrays(
        arrays,
        lowerThan,
        greaterThan,
        valueIndex + 1
      )
    }
    this._treeWayStringQuickSortArrays(
      arrays,
      greaterThan + 1,
      high,
      valueIndex
    )
  }

  valueAt(array: number[], index: number) {
    if (index < array.length) return array[index]
    else return null
  }

  private swapArrays(arrays: number[][], index1: number, index2: number) {
    const temp: number[] = arrays[index1]
    arrays[index1] = arrays[index2]
    arrays[index2] = temp
  }
}
