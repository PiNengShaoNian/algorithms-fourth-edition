import StringST from '../../model/StringST'

class Node<Value> {
  left: Node<Value> | null = null
  right: Node<Value> | null = null
  mid: Node<Value> | null = null
  val: Value | null = null

  constructor(public c: string) {}
}

class TST<Value> implements StringST<Value> {
  private root: Node<Value> | null = null
  put(key: string, value: Value): void {
    this.root = this._put(this.root, key, value, 0)
  }

  private _put(
    x: Node<Value> | null,
    key: string,
    value: Value,
    d: number
  ): Node<Value> | null {
    const c = key[d]

    if (x == null) x = new Node(c)

    if (c < x.c) x.left = this._put(x.left, key, value, d)
    else if (c > x.c) x.right = this._put(x.right, key, value, d)
    else if (d < key.length - 1) {
      x.mid = this._put(x.mid, key, value, d + 1)
    } else x.val = value

    return x
  }
  get(key: string): Value | null {
    const x = this._get(this.root, key, 0)

    if (x) return x.val
    return null
  }

  private _get(
    x: Node<Value> | null,
    key: string,
    d: number
  ): null | Node<Value> {
    if (x === null) return null
    const c = key[d]

    if (c < x.c) {
      return this._get(x.left, key, d)
    } else if (c > x.c) {
      return this._get(x.right, key, d)
    } else if (d < key.length) {
      return this._get(x.mid, key, d + 1)
    } else return x
  }
  delete(key: string): void {
    throw new Error('Method not implemented.')
  }
  contains(key: string): boolean {
    throw new Error('Method not implemented.')
  }
  isEmpty(): boolean {
    throw new Error('Method not implemented.')
  }
  longestPrefixOf(s: string): Iterable<string> {
    throw new Error('Method not implemented.')
  }
  keysWithPrefix(s: string): Iterable<string> {
    throw new Error('Method not implemented.')
  }
  keysThatMatch(s: string): Iterable<string> {
    throw new Error('Method not implemented.')
  }
  size(): number {
    throw new Error('Method not implemented.')
  }
  keys(): Iterable<string> {
    throw new Error('Method not implemented.')
  }
}
