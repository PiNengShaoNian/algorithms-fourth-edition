class BruteSearchRL {
  constructor(private pattern: string) {}

  search(text: string) {
    const textLength = text.length
    const patternLength = this.pattern.length
    let textIndex: number
    let patternIndex: number

    for (
      textIndex = textLength - 1;
      textIndex >= patternLength - 1;
      textIndex--
    ) {
      for (
        patternIndex = patternLength - 1;
        patternIndex >= 0;
        patternIndex--
      ) {
        if (
          text[textIndex - (patternLength - patternIndex - 1)] !==
          this.pattern[patternIndex]
        )
          break
      }

      if (patternIndex <= 0) return textIndex - patternLength + 1
    }

    return textLength
  }

  search2(text: string): number {
    const textLength = text.length

    let textIndex: number
    let patternIndex: number
    for (
      textIndex = textLength - 1, patternIndex = this.pattern.length - 1;
      textIndex >= 0 && patternIndex >= 0;
      textIndex--
    ) {
      if (text[textIndex] === this.pattern[patternIndex]) patternIndex--
      else {
        textIndex += this.pattern.length - patternIndex - 1
        patternIndex = this.pattern.length - 1
      }
    }

    if (patternIndex <= 0) return textIndex + 1
    else return textLength
  }
}

const search = new BruteSearchRL('aab')

console.log(search.search2('aaaaaabbbbb'))
