import StringST from '../../model/StringST'

class Node<Value> {
  character: string = ''
  value: Value | null = null
  left: Node<Value> | null = null
  middle: Node<Value> | null = null
  right: Node<Value> | null = null
  size: number = 0
}

class TernarySearchTrie<Value> implements StringST<Value> {
  private _size: number = 0
  private root: Node<Value> | null = null
  put(key: string, value: Value | null): void {
    if (value === null) {
      return
    }

    let isNewKey = false

    if (!this.contains(key)) isNewKey = true

    this.root = this._put(this.root, key, value, 0, isNewKey)
  }

  private _put(
    node: Node<Value> | null,
    key: string,
    value: Value,
    digit: number,
    isNewKey: boolean
  ): null | Node<Value> {
    const currentChar = key[digit]

    if (!node) {
      node = new Node()
      node.character = currentChar
    }

    if (currentChar < node.character) {
      node.left = this._put(node.left, key, value, digit, isNewKey)
    } else if (currentChar > node.character) {
      node.right = this._put(node.right, key, value, digit, isNewKey)
    } else if (digit < key.length - 1) {
      node.middle = this._put(node.middle, key, value, digit + 1, isNewKey)

      if (isNewKey) {
        node.size += 1
      }
    } else {
      node.value = value

      if (isNewKey) {
        node.size += 1
        this._size++
      }
    }

    return node
  }
  get(key: string): Value | null {
    if (key.length === 0) {
      throw new Error('Key must have a positive length')
    }

    const node = this._get(this.root, key, 0)

    if (!node) return null

    return node.value
  }

  private _get(
    node: Node<Value> | null,
    key: string,
    digit: number
  ): null | Node<Value> {
    if (!node) return null

    const currentChar = key[digit]

    if (currentChar < node.character) {
      return this._get(node.left, key, digit)
    } else if (currentChar > node.character) {
      return this._get(node.right, key, digit)
    } else if (digit < key.length - 1) {
      return this._get(node.middle, key, digit + 1)
    } else return node
  }

  delete(key: string): void {
    if (!this.contains(key)) return

    this.root = this._delete(this.root, key, 0)
  }

  private _delete(
    node: Node<Value> | null,
    key: string,
    digit: number
  ): Node<Value> | null {
    if (!node) return null

    if (digit === key.length - 1) {
      node.size -= 1
      node.value = null
    } else {
      const nextChar = key[digit]

      if (nextChar < node.character) {
        node.left = this._delete(node.left, key, digit)
      } else if (nextChar > node.character) {
        node.right = this._delete(node.right, key, digit)
      } else {
        node.size -= 1
        node.middle = this._delete(node.middle, key, digit + 1)
      }
    }

    if (node.size === 0) {
      if (!node.left && !node.right) {
        return null
      } else if (!node.left) {
        return node.right
      } else if (!node.right) {
        return node.left
      } else {
        const aux = node
        node = this._min(aux.right!)
        node.right = this._deleteMin(aux.right!)
        node.left = aux.left
      }
    }

    return node
  }

  min(): null | string {
    if (this.isEmpty()) return null

    let minNode: Node<Value> = this._min(this.root!)

    let minKey = ''
    minKey += minNode.character

    while (minNode.value === null) {
      minNode = minNode.middle!

      while (minNode.left) {
        minNode = minNode.left
      }

      minKey += minNode.character
    }

    return minKey
  }

  deleteMin(): void {
    if (this.isEmpty()) {
      return
    }

    const minKey = this.min()!

    this.delete(minKey)
  }

  private _deleteMin(node: Node<Value>): Node<Value> | null {
    if (!node.left) return node.right

    node.left = this._deleteMin(node.left)
    return node
  }

  private _min(node: Node<Value>): Node<Value> {
    if (!node.left) return node

    return this._min(node.left)
  }
  contains(key: string): boolean {
    throw new Error('Method not implemented.')
  }
  isEmpty(): boolean {
    return this._size === 0
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
    return this._size
  }
  keys(): Iterable<string> {
    throw new Error('Method not implemented.')
  }
}
