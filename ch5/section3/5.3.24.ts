class KnuthMorrisPratt {
  protected pattern: string
  protected dfa: number[][]

  constructor(pattern: string) {
    this.pattern = pattern

    const patternLength = pattern.length
    const alphabetSize = 256

    this.dfa = Array.from({ length: alphabetSize }, () =>
      Array.from({ length: patternLength }, () => 0)
    )

    this.dfa[pattern.charCodeAt(0)][0] = 1

    let restartState = 0

    for (let patternIndex = 1; patternIndex < patternLength; patternIndex++) {
      for (let currentChar = 0; currentChar < alphabetSize; currentChar++) {
        this.dfa[currentChar][patternIndex] = this.dfa[currentChar][
          restartState
        ]

        this.dfa[pattern.charCodeAt(patternIndex)][patternIndex] =
          patternIndex + 1
        restartState = this.dfa[pattern.charCodeAt(patternIndex)][restartState]
      }
    }
  }

  search(text: string): number {
    let textIndex
    let patternIndex
    const textLength = text.length
    const patternLength = this.pattern.length

    for (
      textIndex = 0, patternIndex = 0;
      textIndex < textLength && patternIndex < patternLength;
      textIndex++
    ) {
      patternIndex = this.dfa[text.charCodeAt(textIndex)][patternIndex]
    }

    if (patternIndex === patternLength) {
      return textIndex - patternLength
    } else return textLength
  }
}

export class BoyerMoore {
  protected right: number[]
  protected pattern: string

  constructor(pattern: string) {
    this.pattern = pattern

    const alphabetSize = 256

    this.right = Array.from({ length: alphabetSize }, () => -1)

    for (let patternIndex = 0; patternIndex < pattern.length; patternIndex++) {
      this.right[pattern.charCodeAt(patternIndex)] = patternIndex
    }
  }

  search(text: string): number {
    const textLength = text.length
    const patternLength = this.pattern.length

    let skip: number

    for (
      let textIndex = 0;
      textIndex <= textLength - patternLength;
      textIndex += skip
    ) {
      skip = 0

      for (
        let patternIndex = patternLength - 1;
        patternIndex >= 0;
        patternIndex--
      ) {
        if (this.pattern[patternIndex] !== text[textIndex + patternIndex]) {
          skip += Math.max(
            1,
            patternIndex - this.right[text.charCodeAt(textIndex + patternIndex)]
          )
          break
        }
      }

      if (skip === 0) return textIndex
    }
    return textLength
  }
}
