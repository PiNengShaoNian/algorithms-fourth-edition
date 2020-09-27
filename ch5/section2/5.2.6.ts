import SeparateChainingHashTable from '../../lib/SeparateChainingHashTable'

interface StringSETAPI {
  add(key: string): void
  delete(key: string): void
  contains(key: string): boolean
  size(): number
}

class Node {
  next = new SeparateChainingHashTable<string, Node>()
  isKey: boolean = false
}
class StringSET implements StringSETAPI {
  private root: Node | null = new Node()
  private _size: number = 0

  size(): number {
    return this._size
  }

  isEmpty() {
    return this._size === 0
  }
  add(key: string): void {
    if (this.contains(key)) return

    this.root = this._add(this.root, key, 0)
  }

  private _add(node: Node | null, key: string, digit: number): Node {
    if (!node) node = new Node()

    if (digit === key.length) {
      node.isKey = true
      return node
    }

    const nextChar = key.charAt(digit)

    const nextNode = this._add(node.next.get(nextChar), key, digit + 1)
    node.next.put(nextChar, nextNode)
    return node
  }
  delete(key: string): void {
    if (!this.contains(key)) return

    this.root = this._delete(this.root!, key, 0)
  }

  _delete(node: Node, key: string, digit: number): Node | null {
    if (digit === key.length) node.isKey = false
    else {
      const nextChar = key.charAt(digit)
      const childNode = this._delete(node.next.get(nextChar)!, key, digit + 1)
      node.next.put(nextChar, childNode)
    }

    if (node.isKey || node.next.size() > 0) {
      return node
    }

    return null
  }

  contains(key: string): boolean {
    return this._contains(this.root, key, 0)
  }

  private _contains(node: Node | null, key: string, digit: number): boolean {
    if (!node) return false

    if (digit === key.length) return node.isKey

    const nextChar = key.charAt(digit)

    if (node.next.contains(nextChar)) {
      return this._contains(node.next.get(nextChar), key, digit + 1)
    } else return false
  }
}
