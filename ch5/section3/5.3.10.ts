import LongRandomPrime from './5.3.33'

class RabinKarpSearchAll {
  private pat: string
  private patHash: number
  private M: number
  private Q: number
  private R = 256
  private RM: number

  constructor(pat: string) {
    this.pat = pat
    this.M = pat.length
    this.Q = LongRandomPrime.longRandomPrime()
    this.RM = 1

    for (let i = 1; i <= this.M - 1; i++) {
      this.RM = (this.R * this.RM) % this.Q
    }

    this.patHash = this.hash(pat, this.M)
  }

  private hash(key: string, M: number): number {
    let h = 0
    for (let j = 0; j < M; j++) {
      h = (this.R * h + key.charCodeAt(j)) % this.Q
    }

    return h
  }

  private check(i: number): boolean {
    return true
  }

  search(txt: string): number {
    const N = txt.length

    let txtHash = this.hash(txt, this.M)

    if (this.patHash === txtHash && this.check(0)) return 0

    for (let i = this.M; i < N; i++) {
      txtHash =
        (txtHash + this.Q - ((this.RM * txt.charCodeAt(i - this.M)) % this.Q)) %
        this.Q
      txtHash = (txtHash * this.R + txt.charCodeAt(i)) % this.Q

      if (this.patHash === txtHash) {
        if (this.check(i - this.M + 1)) return i - this.M + 1
      }
    }

    return N
  }
}
