import LoopQueue from '../../lib/LoopQueue'
import ArrayStack from '../../lib/Stack'

class TrieNode<Value> {
  value: Value | null = null
  next: (TrieNode<Value> | null)[] = []
  size: number = 0
}

class NodeWithInformation<Value> {
  constructor(
    public node: TrieNode<Value>,
    public prefix: string,
    public digit?: number,
    public mustBeEqualDigit?: boolean
  ) {
    if (digit === undefined) this.digit = 0
  }
}

class TrieIterative<Value> {
  private readonly R = 266
  private root: TrieNode<Value> = new TrieNode()

  size(): number {
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
    if (!key) {
      throw new Error('Key cannot be null')
    }

    return this.get(key) !== null
  }

  get(key: string): Value | null {
    if (key.length === 0) {
      throw new Error('Key must have a positive length')
    }

    const node = this.getNode(key)

    if (!node) return null

    return node.value
  }

  getNode(key: string): TrieNode<Value> | null {
    let currentNode: TrieNode<Value> | null = this.root

    let digit = 0

    while (currentNode) {
      if (digit === key.length) {
        break
      }

      const nextChar = key.charCodeAt(digit)

      currentNode = currentNode.next[nextChar]
      digit++
    }

    return currentNode
  }

  put(key: string, value: Value) {
    if (!key) {
      throw new Error('Key must have a positive length')
    }

    if (value === null) {
      return
    }

    const isNewKey = !this.contains(key)

    let parent = this.root
    let currentNode: TrieNode<Value> | null = this.root

    let digit = 0
    let nextChar = key.charCodeAt(0)

    while (digit <= key.length) {
      if (!currentNode) {
        currentNode = new TrieNode()
        parent.next[nextChar] = currentNode
      }

      parent = currentNode

      if (isNewKey) {
        currentNode.size = currentNode.size + 1
      }

      if (digit === key.length) {
        currentNode.value = value
        return
      }

      nextChar = key.charCodeAt(digit)
      currentNode = currentNode.next[nextChar]
      digit++
    }
  }

  delete(key: string) {
    if (!key) {
      throw new Error('Key must have a positive length')
    }

    if (!this.contains(key)) return

    let parent
    let currentNode: TrieNode<Value> | null = this.root
    let digit = 0
    while (currentNode) {
      parent = currentNode

      currentNode.size -= 1

      if (digit === key.length) {
        currentNode.value = null
        return
      } else {
        const nextChar = key.charCodeAt(digit)
        currentNode = currentNode.next[nextChar]

        if (currentNode && currentNode.size === 1) {
          parent.next[nextChar] = null
          return
        }

        digit++
      }
    }
  }

  keysWithPrefix(prefix: string): Iterable<string> {
    const keysWithPrefix = new LoopQueue<string>()

    const nodeWithPrefix = this.getNode(prefix)

    if (!nodeWithPrefix) return keysWithPrefix

    const stack = new ArrayStack<NodeWithInformation<Value>>()

    stack.push(new NodeWithInformation(nodeWithPrefix, prefix))

    while (!stack.isEmpty()) {
      const currentNodeWithInformation = stack.pop()!

      const currentNode = currentNodeWithInformation.node
      const currentPrefix = currentNodeWithInformation.prefix

      if (currentNode.value !== null) keysWithPrefix.enqueue(currentPrefix)

      for (let nextChar = this.R - 1; true; nextChar--) {
        if (currentNode.next[nextChar]) {
          stack.push(
            new NodeWithInformation(
              currentNode.next[nextChar]!,
              prefix + String.fromCharCode(nextChar)
            )
          )
        }

        if (nextChar === 0) break
      }
    }
    return keysWithPrefix
  }

  keysThatMatch(pattern: string): Iterable<string> {
    const keysThatMatch = new LoopQueue<string>()

    const stack = new ArrayStack<NodeWithInformation<Value>>()

    stack.push(new NodeWithInformation(this.root, ''))

    while (!stack.isEmpty()) {
      const currentNodeWithInformation = stack.pop()!
      const currentNode = currentNodeWithInformation.node
      const currentPrefix = currentNodeWithInformation.prefix

      let digit = currentPrefix.length
      if (digit === pattern.length && currentNode.value !== null) {
        keysThatMatch.enqueue(currentPrefix)
      }

      if (digit === pattern.length) continue

      const nextCharInPattern = pattern.charCodeAt(digit)

      for (let nextChar = this.R - 1; true; nextChar--) {
        if (
          String.fromCharCode(nextChar) === '.' ||
          nextCharInPattern === nextChar
        ) {
          if (currentNode.next[nextChar]) {
            stack.push(
              new NodeWithInformation(
                currentNode.next[nextChar]!,
                currentPrefix + String.fromCharCode(nextChar)
              )
            )
          }

          if (nextChar === 0) break
        }
      }
    }

    return keysThatMatch
  }

  longestPrefixOf(query: string): string | null {
    if (this.isEmpty()) return null

    let currentNode: TrieNode<Value> | null = this.root
    let length = 0
    let digit = 0

    while (currentNode) {
      if (currentNode.value !== null) {
        length = digit
      }

      if (digit === query.length) {
        break
      }

      const nextChar = query.charCodeAt(digit)

      if (currentNode.next[nextChar]) {
        currentNode = currentNode.next[nextChar]
        digit++
      } else break
    }

    return query.substring(0, length)
  }

  floor(key: string): string | null {
    if (this.isEmpty()) return null

    let lastKeyFound = null

    const stack = new ArrayStack<NodeWithInformation<Value>>()

    stack.push(new NodeWithInformation(this.root, ''))

    while (!stack.isEmpty()) {
      const currentNodeWithInformation = stack.pop()!
      const currentNode = currentNodeWithInformation.node
      const currentPrefix = currentNodeWithInformation.prefix

      const currentDigit = currentNodeWithInformation.digit!

      if (currentDigit === 0) {
        currentNodeWithInformation.mustBeEqualDigit = true
      }

      let mustBeEqualDigit = currentNodeWithInformation.mustBeEqualDigit

      if (currentNode.value !== null) {
        const currentKey = currentPrefix

        if (lastKeyFound && currentKey < lastKeyFound) {
          return lastKeyFound
        }

        lastKeyFound = currentPrefix
      }

      let rightChar: number

      if (mustBeEqualDigit && currentDigit < key.length) {
        rightChar = key.charCodeAt(currentDigit)
      } else {
        rightChar = this.R - 1
      }

      for (let nextChar = 0; nextChar <= rightChar; nextChar++) {
        if (currentNode.next[nextChar]) {
          if (nextChar < rightChar) {
            mustBeEqualDigit = false
          } else if (
            currentNodeWithInformation.mustBeEqualDigit &&
            nextChar === rightChar
          ) {
            mustBeEqualDigit = true
          }

          const currentKey = currentPrefix + String.fromCharCode(nextChar)

          if (currentKey > key) continue

          stack.push(
            new NodeWithInformation(
              currentNode.next[nextChar]!,
              currentPrefix + String.fromCharCode(nextChar),
              currentDigit + 1,
              mustBeEqualDigit
            )
          )
        }
      }
    }
    return lastKeyFound
  }

  ceiling(key: string): string | null {
    if (this.isEmpty()) return null

    const stack = new ArrayStack<NodeWithInformation<Value>>()

    stack.push(new NodeWithInformation(this.root, ''))

    while (!stack.isEmpty()) {
      const currentNodeWithInformation = stack.pop()!
      const currentNode = currentNodeWithInformation.node
      const currentPrefix = currentNodeWithInformation.prefix

      const currentDigit = currentNodeWithInformation.digit!

      if (currentDigit === 0) {
        currentNodeWithInformation.mustBeEqualDigit = true
      }

      let mustBeEqualDigit = currentNodeWithInformation.mustBeEqualDigit

      if (currentNode.value !== null && currentPrefix > key) {
        return currentPrefix
      }

      let leftChar: number

      if (mustBeEqualDigit && currentDigit < key.length) {
        leftChar = key.charCodeAt(currentDigit)
      } else leftChar = 0

      for (let nextChar = this.R - 1; true; nextChar--) {
        if (currentNode.next[nextChar]) {
          if (nextChar > leftChar) {
            mustBeEqualDigit = false
          } else if (
            currentNodeWithInformation.mustBeEqualDigit &&
            nextChar === leftChar
          ) {
            mustBeEqualDigit = true
          }

          stack.push(
            new NodeWithInformation(
              currentNode.next[nextChar]!,
              currentPrefix + String.fromCharCode(nextChar),
              currentDigit + 1,
              mustBeEqualDigit
            )
          )
        }

        if (nextChar === leftChar) break
      }
    }

    return null
  }

  select(index: number): string | null {
    if (index < 0 || index >= this.size()) {
      throw new Error('Index cannot be negative and must lower than trie size')
    }

    let currentNode: TrieNode<Value> | null = this.root

    let prefix = ''

    while (currentNode) {
      if (currentNode.value !== null) {
        index--

        if (index === -1) return prefix
      }

      for (let nextChar = 0; nextChar < this.R; nextChar++) {
        if (currentNode!.next[nextChar]) {
          if (index - this._size(currentNode) < 0) {
            currentNode = currentNode!.next[nextChar]
            prefix += String.fromCharCode(nextChar)
            break
          } else {
            index = index - this._size(currentNode.next[nextChar])
          }
        }
      }
    }

    return null
  }

  rank(key: string): number {
    let currentNode: TrieNode<Value> | null = this.root

    let digit = 0
    let size = 0

    while (currentNode) {
      if (digit === key.length) {
        return size
      }

      if (currentNode.value !== null) {
        if (digit < key.length) size++
        else return size
      }

      const currentChar = key.charCodeAt(digit)

      for (let nextChar = 0; nextChar < currentChar; nextChar++) {
        size += this._size(currentNode.next[nextChar])
      }

      currentNode = currentNode.next[currentChar]

      digit++
    }

    return size
  }

  min(): string | null {
    if (this.isEmpty()) return null

    let currentNode: TrieNode<Value> | null = this.root

    let prefix = ''
    let hasNextCharacter = true

    while (hasNextCharacter) {
      hasNextCharacter = false

      for (let nextChar = 0; nextChar < this.R; nextChar++) {
        if (currentNode.next[nextChar]) {
          currentNode = currentNode.next[nextChar]!
          prefix += String.fromCharCode(nextChar)

          if (currentNode.value !== null) {
            return prefix
          }

          hasNextCharacter = true

          break
        }
      }
    }

    return null
  }

  max(): null | string {
    if (this.isEmpty()) return null

    let currentNode = this.root

    let prefix = ''
    let maxKey = ''
    let hasNextCharacter = true

    while (hasNextCharacter) {
      hasNextCharacter = false

      for (let nextChar = this.R - 1; true; nextChar--) {
        if (currentNode.next[nextChar]) {
          currentNode = currentNode.next[nextChar]!

          prefix += String.fromCharCode(nextChar)
          if (currentNode.value !== null) maxKey = prefix

          hasNextCharacter = true
          break
        }
      }
    }

    return maxKey
  }

  deleteMin(): void {
    if (this.isEmpty()) return

    const minKey = this.min()!
    this.delete(minKey)
  }

  deleteMax(): void {
    if (this.isEmpty()) return

    const maxKey = this.max()!

    this.delete(maxKey)
  }
}

class TSTrieNode<Value> {
  public left: TSTrieNode<Value> | null = null
  public mid: TSTrieNode<Value> | null = null
  public right: TSTrieNode<Value> | null = null

  public size: number = 0
  public value: Value | null = null
  public char: string = ''
}

enum Direction {
  LEFT,
  MIDDLE,
  RIGHT,
}

class TernarySearchTrieIterative<Value> {
  private _size = 0
  private root: TSTrieNode<Value> | null = null

  size(): number {
    return this._size
  }

  isEmpty() {
    return this.size() === 0
  }

  contains(key: string) {
    return this.get(key) !== null
  }

  get(key: string): Value | null {
    if (key.length === 0) {
      throw new Error('key must have a positive length')
    }

    const node = this.getNode(key)

    if (node) return node.value

    return null
  }

  getNode(key: string): null | TSTrieNode<Value> {
    let currentNode = this.root
    let digit = 0

    while (digit !== key.length) {
      if (!currentNode) return null

      const currentChar = key[digit]

      if (currentChar < currentNode.char) {
        currentNode = currentNode.left
      } else if (currentChar > currentNode.char) {
        currentNode = currentNode.right
      } else if (digit < key.length - 1) {
        currentNode = currentNode.mid
        digit++
      } else return currentNode
    }

    return null
  }

  put(key: string, value: Value): void {
    if (value === null) {
      return
    }

    const isNewKey = !this.contains(key)
    let digit = 0

    if (!this.root) {
      this.root = new TSTrieNode()
      this.root.char = key[digit]

      if (key.length === 1) {
        this.root.value = value
        this.root.size = 1
        return
      }
    }

    let parent: TSTrieNode<Value> | null = null
    let currentNode: null | TSTrieNode<Value> = this.root
    let direction = Direction.LEFT

    while (digit !== key.length) {
      const currentChar = key[digit]

      if (!currentNode) {
        currentNode = new TSTrieNode()
        currentNode.char = currentChar

        parent && this.updateParentReference(parent, currentNode, direction)
      }

      parent = currentNode

      if (currentChar < currentNode.char) {
        currentNode = currentNode.left
        direction = Direction.LEFT
      } else if (currentChar > currentNode.char) {
        currentNode = currentNode.right
        direction = Direction.RIGHT
      } else if (digit < key.length - 1) {
        if (isNewKey) {
          currentNode.size += 1
        }

        currentNode = currentNode.mid
        digit++
        direction = Direction.MIDDLE
      } else {
        currentNode.value = value
        if (isNewKey) {
          currentNode.size = currentNode.size + 1
          this._size++
        }

        digit++
        direction = Direction.MIDDLE
      }
    }
  }

  updateParentReference(
    parent: TSTrieNode<Value>,
    currentNode: TSTrieNode<Value> | null,
    direction: Direction
  ) {
    switch (direction) {
      case Direction.LEFT:
        parent.left = currentNode
        break
      case Direction.MIDDLE:
        parent.mid = currentNode
        break
      case Direction.RIGHT:
        parent.right = currentNode
    }
  }

  delete(key: string): void {
    if (!this.contains(key)) return

    let digit = 0

    if (this.root!.char === key.charAt(0) && this.root!.size === 1) {
      if (!this.root?.left && !this.root?.right) {
        this.root = null
      } else if (!this.root.left) {
        this.root = this.root.right
      } else if (!this.root.right) {
        this.root = this.root.left
      } else {
        const aux = this.root
        this.root = this._min(aux.right)!
        this.root.right = this._deleteMin(aux.right!)
        this.root.left = aux.left
      }

      return
    }

    let parent: TSTrieNode<Value> | null = null

    let currentNode = this.root

    let direction = Direction.MIDDLE

    while (digit !== key.length) {
      const currentChar = key[digit]

      if (currentChar === currentNode?.char && currentNode.size === 1) {
        if (!currentNode.left && currentNode.right) {
          this.updateParentReference(parent!, null, direction)
        } else if (!currentNode?.left) {
          this.updateParentReference(parent!, currentNode!.right, direction)
        } else if (!currentNode.right) {
          this.updateParentReference(parent!, currentNode.left, direction)
        } else {
          const aux = currentNode
          currentNode = this._min(aux.right)
          currentNode!.right = this._deleteMin(aux.right!)
          currentNode!.left = aux.left
        }
        break
      }

      parent = currentNode

      if (currentChar < currentNode!.char) {
        currentNode = currentNode!.left
        direction = Direction.LEFT
      } else if (currentChar > currentNode!.char) {
        currentNode = currentNode!.right
        direction = Direction.RIGHT
      } else {
        if (digit === key.length - 1) {
          currentNode!.value = null
        }

        currentNode!.size = currentNode!.size - 1
        digit++
        currentNode = currentNode!.mid
        direction = Direction.MIDDLE
      }
    }

    this._size--
  }

  _deleteMin(node: TSTrieNode<Value>): null | TSTrieNode<Value> {
    let currentNode = node

    while (currentNode.left) {
      currentNode = currentNode.left
    }

    return currentNode.right
  }

  deleteMin() {
    if (this.isEmpty()) return

    const minKey = this.min()

    typeof minKey === 'string' && this.delete(minKey)
  }

  min(): null | string {
    let minNode = this._min(this.root)

    if (!minNode) return null

    let minKey = ''
    minKey += minNode.char

    while (minNode!.value === null) {
      minNode = minNode?.mid ?? null

      while (minNode?.left) {
        minNode = minNode.left
      }

      minKey += minNode?.char
    }

    return minKey
  }

  private _min(node: TSTrieNode<Value> | null): null | TSTrieNode<Value> {
    if (!node) return null

    let currentNode = node

    while (currentNode.left) {
      currentNode = currentNode.left
    }

    return currentNode
  }

  collect(node: TSTrieNode<Value> | null, prefix: string): LoopQueue<string> {
    const queue = new LoopQueue<string>()
    if (!node) return queue

    const stack = new ArrayStack<NodeWithInformation<Value>>()

    // stack.push(new NodeWithInformation(node, 'prefix'))
    return queue
  }

  keysWithPrefix(prefix: string): Iterable<string> {
    const keysWithPrefix = new LoopQueue<string>()

    let nodeWithPrefix = this.getNode(prefix)

    if (!nodeWithPrefix) return keysWithPrefix

    if (nodeWithPrefix.value !== null) keysWithPrefix.enqueue(prefix)

    const otherKeys = this.collect(nodeWithPrefix.mid, '')

    return keysWithPrefix
    // for(const key = other)
  }
}

const tsTrie = new TernarySearchTrieIterative<number>()

tsTrie.put('a', 1)
tsTrie.put('b', 2)
tsTrie.put('c', 3)
tsTrie.put('abcd', 4)

console.log(tsTrie.get('c'))
console.log(tsTrie.get('abcd'))
