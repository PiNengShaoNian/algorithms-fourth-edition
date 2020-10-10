interface SubstringSearchCharArray {
  search(text: string[]): number
  count(text: string[]): number
  findAll(text: string[]): Iterable<number>
}

class BruteForceSubstringSearchCharArray implements SubstringSearchCharArray {
  private pattern: string[]
  private patternLength: number

  constructor(pattern: string[]) {
    this.pattern = pattern
    this.patternLength = pattern.length
  }

  search(text: string[]): number {
    return this.searchFromIndex(text, 0)
  }

  search2(text: string[]): number {
    const textLength = text.length

    let textIndex: number
    let patternIndex: number

    for (
      textIndex = 0, patternIndex = 0;
      textIndex < textLength && patternIndex < this.patternLength;
      textIndex++
    ) {
      if (text[textIndex] === this.pattern[patternIndex]) {
        patternIndex++
      } else {
        textIndex -= patternIndex
        patternIndex = 0
      }
    }

    if (patternIndex === this.patternLength)
      return textIndex - this.patternLength
    else return textLength
  }

  count(text: string[]): number {
    let count = 0

    let occurenceIndex = this.searchFromIndex(text, 0)

    while (occurenceIndex != text.length) {
      count++
      occurenceIndex = this.searchFromIndex(text, occurenceIndex + 1)
    }

    return count
  }

  searchFromIndex(text: string[], textStartIndex: number): number {
    let textLength = text.length

    for (
      let textIndex = textStartIndex;
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

      if (patternIndex === this.patternLength) return textIndex
    }

    return textLength
  }

  findAll(text: string[]): Iterable<number> {
    const offsets = []

    let occurenceIndex = this.searchFromIndex(text, 0)

    while (occurenceIndex !== text.length) {
      offsets.push(occurenceIndex)
      occurenceIndex = this.searchFromIndex(text, occurenceIndex + 1)
    }

    return offsets
  }
}

class KnuthMorrisPrattCharArray implements SubstringSearchCharArray {
  private pattern: string[]
  private dfa: number[][]

  constructor(pattern: string[]) {
    this.pattern = pattern

    const patternLength = pattern.length
    const alphabetSize = 256

    this.dfa = Array.from({ length: alphabetSize }, () =>
      Array.from({ length: patternLength }, () => 0)
    )

    this.dfa[pattern[0].charCodeAt(0)][0] = 1

    let restartState = 0

    for (let patternIndex = 1; patternIndex < patternLength; patternIndex++) {
      for (let currentChar = 0; currentChar < alphabetSize; currentChar++) {
        this.dfa[currentChar][patternIndex] = this.dfa[currentChar][
          restartState
        ]
      }

      this.dfa[pattern[patternIndex].charCodeAt(0)][patternIndex] =
        patternIndex + 1

      restartState = this.dfa[pattern[patternIndex].charCodeAt(0)][restartState]
    }
  }

  search(text: string[]): number {
    throw new Error('Method not implemented.')
  }

  searchFromIndex(text: string[], textStartIndex: number): number {
    let textIndex: number
    let patternIndex: number
    let textLength: number = text.length
    let patternLength: number = this.pattern.length

    for (
      textIndex = textStartIndex, patternIndex = 0;
      textIndex < textLength && patternIndex < patternLength;
      textIndex++
    ) {
      patternIndex = this.dfa[text[textIndex].charCodeAt(0)][patternIndex]
    }

    if (patternIndex === patternLength) return textIndex - patternLength
    else return textLength
  }

  count(text: string[]): number {
    let count = 0

    let occurenceIndex = this.searchFromIndex(text, 0)

    while (occurenceIndex !== text.length) {
      count++
      occurenceIndex = this.searchFromIndex(text, occurenceIndex + 1)
    }

    return count
  }
  findAll(text: string[]): Iterable<number> {
    throw new Error('Method not implemented.')
  }
}

class BoyerMooreCharArray implements SubstringSearchCharArray {
  private right: number[]
  private pattern: string[]

  constructor(pattern: string[]) {
    this.pattern = pattern
    const alphabetSize = 256

    this.right = Array.from({ length: alphabetSize }, () => -1)

    for (let patternIndex = 0; patternIndex < pattern.length; patternIndex++) {
      this.right[pattern[patternIndex].charCodeAt(0)] = patternIndex
    }
  }

  searchFromIndex(text: string[], textStartIndex: number): number {
    let textLength = text.length
    let patternLength = this.pattern.length

    let skip: number

    for (
      let textIndex = textStartIndex;
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
          skip = Math.max(
            1,
            patternIndex -
              this.right[text[textIndex + patternIndex].charCodeAt(0)]
          )
        }
      }
      if (skip === 0) {
        return textLength
      }
    }

    return textLength
  }
  search(text: string[]): number {
    throw new Error('Method not implemented.')
  }
  count(text: string[]): number {
    throw new Error('Method not implemented.')
  }
  findAll(text: string[]): Iterable<number> {
    throw new Error('Method not implemented.')
  }
}
