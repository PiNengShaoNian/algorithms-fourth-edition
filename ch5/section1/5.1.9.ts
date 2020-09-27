class LeastSignificantDigitVariableLength {
  private charAt(s: string, d: number) {
    if (d < s.length) return s.charCodeAt(d)
    return -1
  }
  lsdSort(array: string[]) {
    if (array.length === 0) return array

    const alphabetSize = 256

    const auxArray = []
    const maxStringLength = this.getMaxStringLength(array)

    for (let digit = maxStringLength - 1; digit >= 0; digit--) {
      const count = Array.from({ length: alphabetSize + 1 }, () => 0)

      for (let i = 0; i < array.length; i++) {
        const digitIndex = this.charAt(array[i], digit)

        count[digitIndex + 1]++
      }

      for (let r = 0; r < alphabetSize; r++) {
        count[r + 1] = count[r]
      }

      for (let i = 0; i < array.length; i++) {
        const digitIndex = this.charAt(array[i], digit)
        const indexInAuxArray = count[digitIndex]++
        auxArray[indexInAuxArray] = array[i]
      }

      for (let i = 0; i < array.length; i++) {
        array[i] = auxArray[i]
      }
    }

    return array
  }

  getMaxStringLength(strings: string[]): number {
    let maxLength = -1

    for (const string of strings) {
      if (string.length > maxLength) {
        maxLength = string.length
      }
    }

    return maxLength
  }
}
