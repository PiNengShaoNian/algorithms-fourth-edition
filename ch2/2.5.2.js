class Word {
  constructor(a) {
    this.word = a
  }
  compareTo(that) {
    const len = Math.min(that.word.length, this.word.length)

    for (let i = 0; i < len; i++) {
      if (this.word[i] > that.word[i]) return 1
      else if (this.word[i] < that.word[i]) return -1
    }

    return this.word.length - that.word.length
  }

  lenCompareTo(that) {
    return this.word.length - that.word.length
  }

  get length() {
    return this.word.length
  }
}

a = new Word('a')
b = new Word('b')
ac = new Word('ac')
c = new Word('c')

class Quick {
  sort(a) {
    this._sort(a, 0, a.length - 1)
  }

  _sort(a, lo, hi) {
    if (hi <= lo) return
    let j = this.partition(a, lo, hi)
    this._sort(a, lo, j - 1)
    this._sort(a, j + 1, hi)
  }

  partition(a, lo, hi) {
    let i = lo,
      j = hi + 1

    const v = a[lo]

    while (true) {
      while (this.less(a[++i], v)) if (i === hi) break
      while (this.less(v, a[--j])) if (j === lo) break

      if (i >= j) break

      this.exch(a, i, j)
    }

    this.exch(a, lo, j)

    return j
  }

  less(a, b) {
    return a.lenCompareTo(b) < 0
  }

  exch(a, i, j) {
    const t = a[i]
    a[i] = a[j]
    a[j] = t
  }
}

const words = [
  'book',
  'shop',
  'store',
  'seller',
  'mark',
  'goodbye',
  'good',
  'bye',
  'bookshop',
  'shop',
  'store',
  'seller',
  'mark',
  'store',
  'seller',
  'mark',
  'goodbye',
  'good',
  'bye',
  'bookshop',
  'shop',
  'store',
  'seller',
  'mark',
  'goodbye',
  'good',
  'bye',
  'bookshop',
  'play',
  'playground',
  'ground',
  'get',
  'roller',
  'after',
  'though',
  'afterthough',
].map((v) => new Word(v))
const findCompound = (a) => {
  new Quick().sort(a)
  const canCombine = a[0].length * 2
  let n = 0

  tag: for (let i = a.length - 1; i >= 0; i--) {
    const v = a[i]
    if (v.length < canCombine) break

    for (let j = 0; j < i; j++) {
      if (a[j].length >= v.length) break

      const secondLen = v.length - a[j].length

      if (secondLen < a[0].length) break

      for (let k = 0; k < i; k++) {
        n++

        if (a[k].length > secondLen) break
        else if (a[k].length < secondLen) continue
        if (a[j].word + a[k].word === v.word) {
          console.log(v.word)
          continue tag
        }
      }
    }
  }

  console.log({
    n,
    N: a.length,
  })
}

findCompound(words)
