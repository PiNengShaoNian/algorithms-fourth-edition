import LoopQueue from '../../lib/LoopQueue'
import StringST from '../../model/StringST'

class Node<Value> {
  public val: Value | null = null
  public next: (Node<Value> | null)[] = []
}

class TrieST<Value> implements StringST<Value> {
  private R = 256
  private root: Node<Value> | null = null

  put(key: string, value: Value): void {
    this.root = this._put(this.root, key, value, 0)
  }

  private _put(
    x: null | Node<Value>,
    key: string,
    value: Value,
    d: number
  ): Node<Value> {
    if (x == null) x = new Node()
    if (d === key.length) {
      x.val = value
      return x
    }
    const c = key.charCodeAt(d)

    x.next[c] = this._put(x.next[c], key, value, d + 1)

    return x
  }

  keysThatMatch(pat: string): Iterable<string> {
    const q = new LoopQueue<string>()
    this._collect(this.root, '', pat, q)
    return q
  }

  _collect(
    x: Node<Value> | null,
    pre: string,
    pat: string,
    q: LoopQueue<string>
  ) {
    const d = pre.length
    if (x === null) return
    if (d === pat.length && x.val !== null) q.enqueue(pre)
    if (d === pat.length) return

    const next = pat.charAt(d)

    for (let c = 0; c < this.R; c++) {
      if (next === '.' || next === String.fromCharCode(c)) {
        this._collect(x.next[c], pre + String.fromCharCode(c), pat, q)
      }
    }
  }

  get(key: string): Value | null {
    const x = this._get(this.root, key, 0)
    if (x === null) return null
    return x.val
  }
  private _get(
    x: Node<Value> | null,
    key: string,
    d: number
  ): Node<Value> | null {
    if (x === null) return null
    if (d === key.length) return x
    const c = key.charCodeAt(d)
    return this._get(x.next[c], key, d + 1)
  }
  delete(key: string): void {
    this.root = this._delete(this.root, key, 0)
  }
  _delete(x: Node<Value> | null, key: string, d: number): null | Node<Value> {
    if (x === null) return null
    if (d === key.length) x.val = null
    else {
      const c = key.charCodeAt(d)
      x.next[c] = this._delete(x.next[c], key, d + 1)
    }

    if (x.val !== null) return x
    for (let c = 0; c < this.R; c++) {
      if (x.next[c]) return x
    }

    return null
  }
  contains(key: string): boolean {
    throw new Error('Method not implemented.')
  }
  isEmpty(): boolean {
    throw new Error('Method not implemented.')
  }
  longestPrefixOf(s: string): Iterable<string> {
    const length = this.search(this.root, s, 0, 0)
    return s.substring(0, length)
  }

  private search(
    x: Node<Value> | null,
    s: string,
    d: number,
    length: number
  ): number {
    if (x === null) return length
    if (x.val !== null) length = d
    if (d === s.length) return length
    const c = s.charCodeAt(d)
    return this.search(x.next[c], s, d + 1, length)
  }
  collect(x: Node<Value> | null, pre: string, q: LoopQueue<string>) {
    if (x === null) return
    if (x.val !== null) q.enqueue(pre)
    for (let c = 0; c < this.R; c++) {
      this.collect(x.next[c], pre + String.fromCharCode(c), q)
    }
  }
  keysWithPrefix(s: string): Iterable<string> {
    const q = new LoopQueue<string>()
    this.collect(this._get(this.root, s, 0), s, q)
    return q
  }
  size(): number {
    throw new Error('Method not implemented.')
  }
  keys(): Iterable<string> {
    throw new Error('Method not implemented.')
  }
}
