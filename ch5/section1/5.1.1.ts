import BSTMap from '../../lib/BSTMap'
import BSTSet from '../../lib/BSTSet'
import MSD from './MSD'

class StringSortDynamicAlphabet {
  private static CUTOFF_FOR_SMALL_SUBARRAYS = 15

  private auxArray: string[] = []
  private alphabetSize: number = 0

  keysIndex: BSTMap<string, number> = new BSTMap()

  private charAt(string: string, digit: number) {
    if (digit < string.length) {
      return this.keysIndex.get(string.charAt(digit))!
    } else {
      return -1
    }
  }
  
  sortStringArray(array: string[]) {
    const uniqueKeys = new BSTSet<string>()

    for (const string of array) {
      for (const char of string) {
        if (!uniqueKeys.contains(char)) {
          uniqueKeys.add(char)
        }
      }
    }

    const allKyes: string[] = []

    for (const key of uniqueKeys) {
      allKyes.push(key)
    }

    for (let keyIndex = 0; keyIndex < allKyes.length; keyIndex++) {
      this.keysIndex.put(allKyes[keyIndex], keyIndex)
    }

    this.alphabetSize = uniqueKeys.size()

    this._sortStringArray(array, 0, array.length - 1, 0)
  }

  _sortStringArray(array: string[], low: number, high: number, digit: number) {
    if (low + StringSortDynamicAlphabet.CUTOFF_FOR_SMALL_SUBARRAYS >= high) {
      MSD._sort(array, low, high, digit)
      return
    }

    const count = Array.from({ length: this.alphabetSize + 2 }, () => 0)

    for (let i = low; i <= high; i++) {
      const keyIndex = this.charAt(array[i], digit) + 2

      count[keyIndex]++
    }

    for (let r = 0; r < this.alphabetSize + 1; r++) {
      count[r + 1] += count[r]
    }

    for (let i = low; i <= high; i++) {
      const keyIndex = this.charAt(array[i], digit) + 1

      const indexInAuxArray = count[keyIndex]++
      this.auxArray[indexInAuxArray] = array[i]
    }

    for (let i = low; i <= high; i++) {
      array[i] = this.auxArray[i - low]
    }

    for (let r = 0; r < this.alphabetSize; r++) {
      this._sortStringArray(
        array,
        low + count[r],
        low + count[r + 1],
        digit + 1
      )
    }
  }
}
