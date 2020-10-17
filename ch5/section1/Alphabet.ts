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

export default Alphabet
