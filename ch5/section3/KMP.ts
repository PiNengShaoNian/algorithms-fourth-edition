class KMP {
  private pat: string
  private dfa: number[][]

  constructor(pat: string) {
    this.pat = pat
    const M = pat.length

    const R = 256

    this.dfa = Array.from({ length: R }, () =>
      Array.from({ length: M }, () => 0)
    )
    this.dfa[pat.charCodeAt(0)][0] = 1

    for (let X = 0, j = 1; j < M; j++) {
      for (let c = 0; c < R; c++) {
        this.dfa[c][j] = this.dfa[c][X]
      }
      this.dfa[pat.charCodeAt(j)][j] = j + 1

      X = this.dfa[pat.charCodeAt(j)][X]
    }
  }

  search(txt: string) {
    let i,
      j,
      N = txt.length,
      M = this.pat.length

    for (i = 0, j = 0; i < N && j < M; i++) {
      j = this.dfa[txt.charCodeAt(i)][j]
    }

    if (j === M) return i - M
    else return N
  }
}

export default KMP
