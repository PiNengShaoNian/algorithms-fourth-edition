class Merge {
  sort(a) {
    const aux = []
    this._sort(a, aux, 0, a.length - 1)
    return a
  }

  less(a, b) {
    return b.compareTo(a)
  }

  _sort(a, aux, lo, hi) {
    if (hi <= lo) return
    const mid = Math.floor(lo + (hi - lo) / 2)

    this._sort(a, aux, lo, mid)
    this._sort(a, aux, mid + 1, hi)

    this.merge(a, aux, lo, mid, hi)
  }

  merge(a, aux, lo, mid, hi) {
    debugger
    let i = lo
    let j = mid + 1
    for (let k = lo; k <= hi; k++) aux[k] = a[k]

    for (let k = lo; k <= hi; k++) {
      if (i > mid) a[k] = aux[j++]
      else if (j > hi) a[k] = aux[i++]
      else if (this.less(aux[i], aux[j])) a[k] = aux[i++]
      else a[k] = aux[j++]
    }
  }
}

class Name {
  constructor(name) {
    this.name = name
    this.charCodeArr = []
    for (let i = 0; i < name.length; i++) {
      this.charCodeArr[i] = name.charCodeAt(i)
    }
  }
  compareTo(a) {
    const aLen = a.charCodeArr.length
    const selfLen = a.charCodeArr.length
    const minLen = Math.min(aLen, selfLen)
    for (let i = 0; i < minLen; i++) {
      if (this.charCodeArr[i] < a.charCodeArr[i]) return false
      else return true
    }

    if (aLen < selfLen) return true
    else return false
  }

  equal(b) {
    return this.name === b.name
  }
}

// console.log(new Merge().sort([...'dcba'].map((v) => new Name(v))))

const findCommonName = (a, b, c) => {
  const merge = new Merge()
  merge.sort(a)
  merge.sort(b)
  merge.sort(c)
  const aLen = a.length
  const bLen = b.length
  const cLen = c.length
  const findMax = (a, b, c) => {
    return merge.sort([a, b, c])[2]
  }

  let aIndex = 0
  let bIndex = 0
  let cIndex = 0

  while (aIndex < aLen && bIndex < bLen && cIndex < cLen) {
    const aItem = a[aIndex]
    const bItem = b[bIndex]
    const cItem = c[bIndex]

    const maxItem = findMax(aItem, bItem, cItem)
    if (aItem.equal(bItem) && bItem.equal(cItem)) return aItem
    else if (aIndex < aLen && maxItem.compareTo(aItem)) aIndex++
    else if (bIndex < bLen && maxItem.compareTo(bItem)) bIndex++
    else if (cIndex < cLen && maxItem.compareTo(cItem)) cIndex++
  }

  return null
}

const aArr = [...'bca'].map((v) => new Name(v))
const bArr = [...'sffleaf'].map((v) => new Name(v))
const cArr = [...'cgfdade'].map((v) => new Name(v))

console.log(findCommonName(aArr, bArr, cArr))
