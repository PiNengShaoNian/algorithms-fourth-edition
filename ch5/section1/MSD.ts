export class Insertion {
  static sort(a: string[], lo: number, hi: number, d: number) {
    for (let i = lo; i <= hi; i++) {
      for (let j = i; j > lo; j--) {
        if (this.less(a[j], a[j - 1], d)) this.exch(a, j, j - 1)
      }
    }
  }

  static exch(a: any[], i: number, j: number) {
    const t = a[i]
    a[i] = a[j]
    a[j] = t
  }

  static less(v: string, w: string, d: number) {
    return (v[d] ?? '') < (w[d] ?? '')
  }
}

class MSD {
  private static R = 256
  private static M = 15
  private static aux: string[] = []
  private static charAt(s: string, d: number) {
    if (d < s.length) return s.charCodeAt(d)
    return -1
  }

  static sort(a: string[]) {
    const N = a.length

    this._sort(a, 0, N - 1, 0)

    return a
  }

  static _sort(a: string[], lo: number, hi: number, d: number) {
    if (hi <= lo + this.M) {
      Insertion.sort(a, lo, hi, d)
      return
    }

    const count = Array.from({ length: this.R + 2 }, () => 0)

    for (let i = lo; i <= hi; i++) {
      count[this.charAt(a[i], d) + 2]++
    }

    for (let r = 0; r < this.R + 1; r++) {
      count[r + 1] += count[r]
    }

    for (let i = lo; i <= hi; i++) {
      this.aux[count[this.charAt(a[i], d) + 1]++] = a[i]
    }

    for (let i = lo; i <= hi; i++) {
      a[i] = this.aux[i - lo]
    }

    for (let r = 0; r < this.R; r++) {
      this._sort(a, lo + count[r], lo + count[r + 1] - 1, d + 1)
    }
  }
}

export default MSD
