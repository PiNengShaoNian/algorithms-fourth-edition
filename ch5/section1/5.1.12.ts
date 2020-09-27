import { Insertion } from './MSD'

interface AlphabetAPI {
  toChar(index: number): string
  toIndex(character: string): number
  contains(character: string): boolean
  R(): number
  lgR(): number
  toIndices(string: string): number[]
  toChars(indices: number[]): string
}

class Alphabet implements AlphabetAPI {
  private charToIndexMap: { [key: string]: number } = {}
  private indexToChar: string[]
  private size: number = 0

  constructor(string: string) {
    this.indexToChar = [...string]
    this.indexToChar.sort()
    this.size = this.indexToChar.length

    for (let index = 0; index < this.indexToChar.length; index++) {
      this.charToIndexMap[this.indexToChar[index]] = index
    }
  }

  toChar(index: number): string {
    if (index < 0 || index >= this.R()) {
      throw new Error('Index must be between 0 and  ' + (this.R() - 1))
    }
    return this.indexToChar[index]
  }

  toIndex(character: string): number {
    if (!this.contains(character)) {
      throw new Error(`Character ${character} is not in the alphabet`)
    }

    return this.charToIndexMap[character]
  }
  contains(character: string): boolean {
    return typeof this.charToIndexMap[character] === 'number'
  }
  R(): number {
    return this.size
  }
  lgR(): number {
    return Math.floor(Math.log(this.size) / Math.log(2))
  }
  toIndices(string: string): number[] {
    const indices: number[] = []

    for (let i = 0; i < string.length; i++) {
      indices[i] = this.toIndex(string[i])
    }

    return indices
  }
  toChars(indices: number[]): string {
    let chars = ''

    for (let i = 0; i < indices.length; i++) {
      chars += this.toChar(indices[i])
    }

    return chars
  }
}

class LSDGeneralAlphabet {
  lsdSort(alphabet: AlphabetAPI, array: string[], stringsLength: number) {
    const alphabetSize = alphabet.R()

    const auxArray = []

    for (let digit = stringsLength - 1; digit >= 0; digit--) {
      const count = Array.from({ length: alphabetSize + 1 }, () => 0)

      for (let i = 0; i < array.length; i++) {
        const digitIndex = alphabet.toIndex(array[i][digit])
        count[digitIndex + 1]++
      }

      for (let r = 0; r < alphabetSize; r++) {
        count[r + 1] += count[r]
      }

      for (let i = 0; i < array.length; i++) {
        const digitIndex = alphabet.toIndex(array[i][digit])

        const indexInAuxArray = count[digitIndex]++
        auxArray[indexInAuxArray] = array[i]
      }

      for (let i = 0; i < array.length; i++) {
        array[i] = auxArray[i]
      }
    }
  }
}

class MSDGeneralAlphabet {
  private alphabetSize: number = 0
  private CUTOFF_FOR_SMALL_SUBARRAYS: number = 15
  private auxArray: string[] = []
  private alphabet: AlphabetAPI | null = null

  msdSort(alphabet: AlphabetAPI, array: string[]) {
    this.alphabetSize = alphabet.R()
    this.alphabet = alphabet

    this.sort(array, 0, array.length - 1, 0)
  }

  sort(array: string[], low: number, high: number, digit: number) {
    if (low + this.CUTOFF_FOR_SMALL_SUBARRAYS >= high) {
      Insertion.sort(array, low, high, digit)
      return
    }

    const count = Array.from({ length: this.alphabetSize + 2 }, () => 0)

    for (let i = low; i <= high; i++) {
      const digitIndex = this.charAt(array[i], digit) + 2

      count[digitIndex]++
    }

    for (let r = 0; r < this.alphabetSize + 1; r++) {
      count[r + 1] += count[r]
    }

    for (let i = low; i <= high; i++) {
      const digitIndex = this.charAt(array[i], digit) + 1

      const indexInAuxArray = count[digitIndex]++
      this.auxArray[indexInAuxArray] = array[i]
    }

    for (let i = low; i <= high; i++) {
      array[i] = this.auxArray[i - low]
    }

    for (let r = 0; r < this.alphabetSize; r++) {
      this.sort(array, low + count[r], low + count[r + 1] - 1, digit + 1)
    }
  }

  charAt(string: string, digit: number): number {
    if (digit < string.length) return this.alphabet!.toIndex(string[digit])
    else return -1
  }
}
