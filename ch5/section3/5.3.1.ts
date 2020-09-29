class Brute {
  private pattern: string
  private patternLength: number

  constructor(pattern: string) {
    this.pattern = pattern
    this.patternLength = pattern.length
  }

  search(text: string): number {
    const textLength = text.length

    for (
      let textIndex = 0;
      textIndex <= textLength - this.patternLength;
      textIndex++
    ) {
      let patternIndex

      for (
        patternIndex = 0;
        patternIndex < this.patternLength;
        patternIndex++
      ) {
        if (text[textIndex + patternIndex] !== this.pattern[patternIndex]) break
      }
      if (patternIndex === this.patternLength) {
        return textIndex
      }
    }
    return textLength
  }
}

export default Brute
