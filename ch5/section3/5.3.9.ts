class BoyerMooreSearchAll {
  private right: number[]
  private pat: string

  constructor(pat: string) {
    this.pat = pat
    const M = pat.length
    const R = 256

    this.right = Array.from({ length: R }, () => -1)

    for (let j = 0; j < M; j++) {
      this.right[pat.charCodeAt(j)] = j
    }
  }

  search(txt: string): number {
    const N = txt.length
    const M = this.pat.length

    let skip: number

    for (let i = 0; i <= N - M; i += skip) {
      skip = 0

      for (let j = M - 1; j >= 0; j--) {
        if (this.pat[j] !== txt[i + j]) {
          skip = j - this.right[txt.charCodeAt(i + j)]

          if (skip < 1) skip = 1
          break
        }
      }

      if (skip === 0) return i
    }

    return N
  }

  count(text: string): number {
    let count = 0

    return count
  }

  searchAll(text: string) {
    let occurenceIndex = this.searchFromIndex(text, 0)

    if (occurenceIndex === text.length) {
      console.log('no occurences')
    }

    while (occurenceIndex !== text.length) {
      occurenceIndex = this.searchFromIndex(text, occurenceIndex + 1)
    }
  }

  searchFromIndex(text: string, textStartIndex: number): number {
    const textLength = text.length

    let patternLength = this.pat.length

    let skip: number

    for (
      let textIndex = textStartIndex;
      textIndex <= textLength - patternLength;
      textIndex += skip
    ) {
      skip = 0

      for (let j = patternLength - 1; j >= 0; j--) {
        if (this.pat[j] !== text[textIndex + j]) {
          skip = Math.max(
            1,
            patternLength - this.right[text.charCodeAt(textIndex + j)]
          )
          break
        }
      }

      if (skip === 0) {
        return textIndex
      }
    }

    return textLength
  }
}
