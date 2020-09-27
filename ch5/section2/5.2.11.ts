class TrieNode<Value> {
  value: Value | null = null
  next: TrieNode<Value>[] = []
  size: number = 0
  characters: string | null = null
}

class TrieNoExternalOneWayBranching<Value> {
  protected static readonly R: number = 256
  protected root = new TrieNode<Value>()

  size() {
    return this._size(this.root)
  }

  private _size(node: TrieNode<Value> | null): number {
    if (!node) return 0

    return node.size
  }

  isEmpty() {
    return this.size() === 0
  }

  contains(key: string): boolean {
    throw new Error('')
  }

  put(key: string, value: Value) {
    if (value === null) {
      return
    }

    let isNewKey = false

    if (!this.contains(key)) isNewKey = true

    this.root = this._put(this.root, key, value, 0, isNewKey)
  }

  private _put(
    node: TrieNode<Value> | null,
    key: string,
    value: Value,
    digit: number,
    isNewKey: boolean
  ): TrieNode<Value> {
    if (!node) {
      node = new TrieNode<Value>()
      if (digit !== key.length) {
        node.characters = key.substring(digit - 1, key.length)
      }

      node.value = value
      node.size = 1
      return node
    }

    if (isNewKey) {
      node.size = node.size + 1
    }

    if (node.characters !== null) {
      const nodeCharactersLength = node.characters.length

      if (!isNewKey && digit - 1 + nodeCharactersLength === key.length) {
        node.value = value
        return node
      }

      const parentNode = new TrieNode<Value>()
      parentNode.size = 2

      let currentNode = parentNode

      const maxLength = Math.max(nodeCharactersLength, key.length - digit + 1)

      for (let index = 1; index < maxLength; index++) {
        if (index < nodeCharactersLength && digit - 1 + index < key.length) {
          const existingNodeCharacter = node.characters.charCodeAt(index)
          const newNodeCurrentCharacter = key.charCodeAt(digit - 1 + index)

          if (existingNodeCharacter === newNodeCurrentCharacter) {
            const newNode = new TrieNode<Value>()
            node.size = 2

            currentNode.next[existingNodeCharacter] = newNode
            currentNode = newNode
          } else {
            this.splitNodes(node, currentNode, key, value, index, digit - 1)
            return parentNode
          }
        }
      }
    }

    return node
  }

  splitNodes(
    originalNode: TrieNode<Value>,
    splitParentNode: TrieNode<Value>,
    key: string,
    value: Value,
    index: number,
    digit: number
  ): void {}
}
