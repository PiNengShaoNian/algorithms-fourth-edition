class BruteRL {
  private pattern: string
  private patternLength: number

  constructor(pattern: string) {
    this.pattern = pattern
    this.patternLength = pattern.length
  }

  search(text: string): number {
    const textLength = text.length

    for (
      let textIndex = textLength - 1;
      textIndex >= this.patternLength;
      textIndex--
    ) {
      let patternIndex

      for (
        patternIndex = this.patternLength - 1;
        patternIndex >= 0;
        patternIndex--
      ) {
        if (
          text[textIndex - (this.patternLength - patternIndex - 1)] !==
          this.pattern[patternIndex]
        )
          break
      }
      if (patternIndex === -1) {
        return textIndex - this.patternLength
      }
    }
    return textLength
  }
}

const str = Array.from({ length: 1000000 }, () => 'a').join('') + 'b'

console.time('a')
const brute = new BruteRL('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab')
debugger
console.log(brute.search(str))
console.timeEnd('a')
// console.log(str)
