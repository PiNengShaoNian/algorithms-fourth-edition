import SeparateChainingHashTable from '../../lib/SeparateChainingHashTable'

class BoyerMooreBinaryStrings {
  private right: number[]
  private pattern: string
  private bitsSize: number
  private binaryStringToIntegerMap: SeparateChainingHashTable<string, number>

  constructor(pattern: string) {
    if (pattern.length > 90) {
      throw new Error('Pattern must have length less than or euqal to 90')
    }

    this.pattern = pattern

    this.bitsSize = Math.floor(pattern.length / 3)

    if (this.bitsSize === 0) this.bitsSize = 1

    const alphabetSize = Math.pow(2, this.bitsSize)
    this.binaryStringToIntegerMap = new SeparateChainingHashTable()
    this.right = Array.from({ length: alphabetSize }, () => -1)

    for (
      let patternIndex = 0;
      patternIndex + this.bitsSize <= pattern.length;
      patternIndex++
    ) {
      const binaryString = pattern.substring(
        patternIndex,
        patternIndex + this.bitsSize
      )

      if (!this.binaryStringToIntegerMap.contains(binaryString)) {
        const integerValue = this.binaryStringToIntegerValue(binaryString)
        this.binaryStringToIntegerMap.put(binaryString, integerValue)
      }

      const index = this.binaryStringToIntegerMap.get(binaryString)!
      this.right[index] = patternIndex
    }
  }

  private binaryStringToIntegerValue(binaryString: string): number {
    let integerValue = 0
    let powerOf2 = 1

    for (let index = binaryString.length - 1; index >= 0; index--) {
      const isDigitSet = binaryString[index] === '1'

      if (isDigitSet) {
        if (index === binaryString.length - 1) {
          integerValue++
        } else {
          integerValue += powerOf2
        }
      }

      powerOf2 = powerOf2 * 2
    }

    return integerValue
  }

  search(text: string): number {
    const textLength = text.length
    const patternLength = this.pattern.length

    let skip

    for (
      let textIndex = 0;
      textIndex <= textLength - patternLength;
      textIndex += skip
    ) {
      skip = 0

      for (
        let patternIndex = patternLength - this.bitsSize;
        true;
        patternIndex -= this.bitsSize
      ) {
        if (patternIndex < 0) patternIndex = 0

        const binaryStringInText = text.substring(
          textIndex + patternIndex,
          textIndex + patternIndex + this.bitsSize
        )
        const binaryStringInPattern = this.pattern.substring(
          patternIndex,
          patternIndex + this.bitsSize
        )

        let index

        if (!this.binaryStringToIntegerMap.contains(binaryStringInText)) {
          index = this.binaryStringToIntegerValue(binaryStringInText)
          this.binaryStringToIntegerMap.put(binaryStringInText, index)
        } else {
          index = this.binaryStringToIntegerMap.get(binaryStringInText)!
        }

        if (binaryStringInPattern !== binaryStringInText) {
          skip = Math.max(1, patternIndex - this.right[index])
          break
        }

        if (patternIndex === 0) break
      }

      if (skip === 0) return textIndex
    }
    return textLength
  }
}
