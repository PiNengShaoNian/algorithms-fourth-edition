class KnuthMorrisPrattSearchAll {
  private pattern: string
  private dfa: number[][]
  constructor(pattern: string) {
    this.pattern = pattern

    const M = pattern.length
    const R = 256

    this.dfa = Array.from({ length: R }, () =>
      Array.from({ length: M }, () => 0)
    )

    this.dfa[pattern.charCodeAt(0)][0] = 1

    for (let X = 0, j = 1; j < M; j++) {
      for (let c = 0; c < R; c++) {
        this.dfa[c][j] = this.dfa[c][X]
      }

      this.dfa[pattern.charCodeAt(j)][j] = j + 1

      X = this.dfa[pattern.charCodeAt(j)][X]
    }
  }

  search(text: string): number {
    let i,
      j,
      N = text.length,
      M = this.pattern.length

    for (i = 0, j = 0; i < N && j < M; i++) {
      j = this.dfa[text.charCodeAt(i)][j]
    }

    if (j === M) return i - M
    else return N
  }

  count(text: string): number {
    let count = 0
    let occurrenceIndex = this.searchFromIndex(text, 0)

    while (occurrenceIndex !== text.length) {
      count++
      occurrenceIndex = this.searchFromIndex(text, occurrenceIndex + 1)
    }

    return count
  }

  searchFromIndex(text: string, textStartIndex: number): number {
    let textIndex
    let patternIndex
    let textLength = text.length
    let patternLength = this.pattern.length

    for (
      textIndex = textStartIndex, patternIndex = 0;
      textIndex < textLength && patternIndex < patternLength;
      textIndex++
    ) {
      patternIndex = this.dfa[text.charCodeAt(textIndex)][patternIndex]
    }

    if (patternIndex === patternLength) return textIndex - patternLength
    else return textLength
  }

  searchAll(text: string) {
    let occurrenceIndex = this.searchFromIndex(text, 0)

    if (occurrenceIndex === text.length) {
      console.log('No occurrences')
    }

    while (occurrenceIndex !== text.length) {
      console.log('Pattern found at index ' + occurrenceIndex)
      occurrenceIndex = this.searchFromIndex(text, occurrenceIndex + 1)
    }
  }
}
