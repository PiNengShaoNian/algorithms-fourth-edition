class BoyerMoore {
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
    let skip

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
}
