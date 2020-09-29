class BruteForceSubstringSearchAll {
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

  searchAll(text: string): void {
    let occurrenceIndex = this.searchFromIndex(text, 0)

    if (occurrenceIndex === text.length) {
      console.log('No occurrences')
      return
    }

    while (occurrenceIndex !== text.length) {
      console.log('Pattern found at index' + occurrenceIndex)
      occurrenceIndex = this.searchFromIndex(text, occurrenceIndex + 1)
    }
  }

  searchFromIndex(text: string, textStartIndex: number): number {
    const textLength = text.length

    for (let textIndex = textStartIndex; textIndex < textLength; textIndex++) {
      let patternIndex: number

      for (
        patternIndex = 0;
        patternIndex < this.patternLength;
        patternIndex++
      ) {
        if (text[textIndex + patternIndex] !== this.pattern[patternIndex]) break
      }

      if (patternIndex === this.patternLength) return textIndex
    }

    return textLength
  }
}

export default BruteForceSubstringSearchAll
