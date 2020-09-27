import BSTMap from '../../lib/BSTMap'
import LinearProbingHashTable from '../../lib/LinearProbingHashTable'
import LoopQueue from '../../lib/LoopQueue'
import SeparateChainingHashTable from '../../lib/SeparateChainingHashTable'
import StringST from '../../model/StringST'

class Node<Value> {
  value: Value | null = null
  next: (Node<Value> | null)[] = []
  size = 0
}

class Tire<Value> implements StringST<Value> {
  protected static readonly R = 256
  protected root: Node<Value> | null = new Node()

  put(key: string, value: Value): void {
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
  ): Node<Value> {
    if (!node) node = new Node()
    if (isNewKey) node.size += 1

    if (digit === key.length) {
      node.value = value
      return node
    }

    const nextChar = key.charCodeAt(digit)

    node.next[nextChar] = this._put(
      node.next[nextChar],
      key,
      value,
      digit + 1,
      isNewKey
    )

    return node
  }

  get(key: string): Value | null {
    if (key.length === 0) {
      throw new Error('Key must have positive length')
    }

    const node = this._get(this.root, key, 0)

    if (!node) return null

    return node.value
  }

  private _get(
    node: Node<Value> | null,
    key: string,
    digit: number
  ): Node<Value> | null {
    if (!node) return null

    if (digit === key.length) return node

    const nextChar = key.charCodeAt(digit)

    return this._get(node.next[nextChar], key, digit + 1)
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

    node.size -= 1

    if (digit === key.length) {
      node.value = null
    } else {
      const nextChar = key.charCodeAt(digit)
      node.next[nextChar] = this._delete(node.next[nextChar], key, digit + 1)
    }

    if (node.value != null) return node

    for (let nextChar = 0; nextChar < Tire.R; nextChar++) {
      if (node.next[nextChar]) {
        return node
      }
    }

    return null
  }
  contains(key: string): boolean {
    return this.get(key) !== null
  }
  isEmpty(): boolean {
    return this.size() === 0
  }
  longestPrefixOf(s: string): Iterable<string> {
    const length = this.search(this.root, s, 0, 0)

    return s.substring(0, length)
  }

  search(
    node: Node<Value> | null,
    query: string,
    digit: number,
    length: number
  ): number {
    if (!node) return length

    if (node.value !== null) length = digit

    if (digit == query.length) return length

    const nextChar = query.charCodeAt(digit)
    return this.search(node.next[nextChar], query, digit, length)
  }
  keysWithPrefix(s: string): Iterable<string> {
    const keysWithPrefix = new LoopQueue<string>()

    const nodeWithPrefix = this._get(this.root, s, 0)

    this.collect(nodeWithPrefix, s, keysWithPrefix)

    return keysWithPrefix
  }

  collect(
    node: Node<Value> | null,
    prefix: string,
    queue: LoopQueue<string>
  ): void {
    if (!node) return

    if (node.value !== null) queue.enqueue(prefix)

    for (let nextChar = 0; nextChar < Tire.R; nextChar++) {
      prefix += String.fromCharCode(nextChar)
      this.collect(node.next[nextChar], prefix, queue)
      prefix = prefix.substring(0, prefix.length - 1)
    }
  }

  keysThatMatch(s: string): Iterable<string> {
    const keysThatMatch = new LoopQueue<string>()

    this._collect(this.root, '', s, keysThatMatch)

    return keysThatMatch
  }

  _collect(
    node: Node<Value> | null,
    prefix: string,
    pattern: string,
    queue: LoopQueue<string>
  ): void {
    if (!node) return
    const digit = prefix.length

    if (digit === pattern.length && node.value !== null) {
      queue.enqueue(prefix)
    }

    if (digit === pattern.length) return

    const nextCharInPattern = pattern[digit]

    for (let nextChar = 0; nextChar < Tire.R; nextChar++) {
      if (
        nextCharInPattern === '.' ||
        nextCharInPattern === String.fromCharCode(nextChar)
      ) {
        prefix += String.fromCharCode(nextChar)
        this._collect(node.next[nextChar], prefix, pattern, queue)
        prefix = prefix.substring(0, prefix.length - 1)
      }
    }
  }

  size(): number {
    return this._size(this.root)
  }

  private _size(node: Node<Value> | null): number {
    if (!node) return 0

    return node.size
  }
  keys(): Iterable<string> {
    return this.keysWithPrefix('')
  }

  floor(key: string): null | string {
    return this._floor(this.root, key, 0, '', null, true)
  }

  _floor(
    node: Node<Value> | null,
    key: string,
    digit: number,
    prefix: string,
    lastKeyFound: null | string,
    mustBeEqualDigit: boolean
  ): null | string {
    if (!node) return null

    if (prefix > key) {
      return lastKeyFound
    }

    if (node.value !== null) {
      lastKeyFound = prefix
    }

    let currentChar

    if (mustBeEqualDigit && digit < key.length) {
      currentChar = key.charCodeAt(digit)
    } else {
      currentChar = Tire.R - 1
    }

    for (let nextChar = currentChar; true; nextChar--) {
      if (node.next[nextChar]) {
        if (nextChar < currentChar) mustBeEqualDigit = false

        lastKeyFound = this._floor(
          node.next[nextChar],
          key,
          digit + 1,
          prefix + String.fromCharCode(nextChar),
          lastKeyFound,
          mustBeEqualDigit
        )

        if (lastKeyFound !== null) {
          return lastKeyFound
        }

        prefix = prefix.substring(0, prefix.length - 1)
      }

      if (nextChar === 0) break
    }

    return lastKeyFound
  }

  max(): null | string {
    if (this.isEmpty()) return null

    return this._max(this.root!, '')
  }

  private _max(node: Node<Value>, prefix: string): string | null {
    for (let nextChar = Tire.R - 1; true; nextChar--) {
      if (node.next[nextChar]) {
        return this._max(
          node.next[nextChar]!,
          prefix + String.fromCharCode(nextChar)
        )
      }

      if (nextChar === 0) break
    }

    return prefix
  }

  rank(key: string): number {
    return this._rank(this.root, key, 0, 0)
  }

  private _rank(
    node: Node<Value> | null,
    key: string,
    digit: number,
    size: number
  ): number {
    if (!node || digit === key.length) return size

    if (node.value !== null) {
      if (digit < key.length) {
        size++
      } else return size
    }

    const currentChar = key.charCodeAt(digit)

    for (let nextChar = 0; nextChar < currentChar; nextChar++) {
      size += this._size(node.next[nextChar])
    }

    return this._rank(node.next[currentChar], key, digit + 1, size)
  }
}

const arr = [
  'Last',
  'week,',
  'Mozilla',
  'announced',
  'some',
  'general',
  'changes',
  'in',
  'our',
  'investments',
  'and',
  'we',
  'would',
  'like',
  'to',
  'outline',
  'how',
  'they',
  'will',
  'impact',
  'our',
  'MDN',
  'platform',
  'efforts',
  'moving',
  'forward.',
  'It',
  'hurts',
  'to',
  'make',
  'these',
  'cuts,',
  'and',
  'it’s',
  'important',
  'that',
  'we',
  'be',
  'candid',
  'on',
  'what’s',
  'changing',
  'and',
  'why',
  'First',
  'we',
  'want',
  'to',
  'be',
  'clear,',
  'MDN',
  'is',
  'not',
  'going',
  'away.',
  'The',
  'core',
  'engineering',
  'team',
  'will',
  'continue',
  'to',
  'run',
  'the',
  'MDN',
  'site',
  'and',
  'Mozilla',
  'will',
  'continue',
  'to',
  'develop',
  'the',
  'platform.',
  'However,',
  'because',
  'of',
  'Mozilla’s',
  'restructuring,',
  'we',
  'have',
  'had',
  'to',
  'scale',
  'back',
  'our',
  'overall',
  'investment',
  'in',
  'developer',
  'outreach,',
  'including',
  'MDN.',
  'Our',
  'Co-Founder',
  'and',
  'CEO',
  'Mitchell',
  'Baker',
  'outlines',
  'the',
  'reasons',
  'why',
  'here.',
  'As',
  'a',
  'result,',
  'we',
  'will',
  'be',
  'pausing',
  'support',
  'for',
  'DevRel',
  'sponsorship,',
  'Hacks',
  'blog',
  'and',
  'Tech',
  'Speakers.',
  'The',
  'other',
  'areas',
  'we',
  'have',
  'had',
  'to',
  'scale',
  'back',
  'on',
  'staffing',
  'and',
  'programs',
  'include:',
  'Mozilla',
  'developer',
  'programs,',
  'developer',
  'events',
  'and',
  'advocacy,',
  'and',
  'our',
  'MDN',
  'tech',
  'writing.',
  'We',
  'recognize',
  'that',
  'our',
  'tech',
  'writing',
  'staff',
  'drive',
  'a',
  'great',
  'deal',
  'of',
  'value',
  'to',
  'MDN',
  'users,',
  'as',
  'do',
  'partner',
  'contributions',
  'to',
  'the',
  'content.',
  'So',
  'we',
  'are',
  'working',
  'on',
  'a',
  'plan',
  'to',
  'keep',
  'the',
  'content',
  'up',
  'to',
  'date.',
  'We',
  'are',
  'continuing',
  'our',
  'planned',
  'platform',
  'improvements,',
  'including',
  'a',
  'GitHub-based',
  'submission',
  'system',
  'for',
  'contributors.',
  'We',
  'believe',
  'in',
  'the',
  'value',
  'of',
  'MDN',
  'Web',
  'Docs',
  'as',
  'a',
  'premier',
  'web',
  'developer',
  'resource',
  'on',
  'the',
  'internet.',
  'We',
  'are',
  'currently',
  'planning',
  'how',
  'to',
  'move',
  'MDN',
  'forward',
  'long',
  'term,',
  'and',
  'will',
  'develop',
  'this',
  'new',
  'plan',
  'in',
  'close',
  'collaboration',
  'with',
  'our',
  'industry',
  'partners',
  'and',
  'community',
  'members.',
  'Thank',
  'you',
  'all',
  'for',
  'your',
  'continued',
  'care',
  'and',
  'support',
  'for',
  'MDN,',
  '—',
  'Rina',
  'Jensen,',
  'Director,',
  'Contributor',
  'Experience',
]

const bench = () => {
  console.time('Tire')
  for (let i = 0; i < 100; i++) {
    const trie = new Tire<number>()
    for (let i = 0; i < arr.length; i++) {
      trie.put(arr[i], i)
    }

    for (let i = 0; i < arr.length; i++) {
      trie.get(arr[i])
    }

    for (let i = 0; i < arr.length; i++) {
      trie.delete(arr[i])
    }
  }

  console.timeEnd('Tire')
}

const bench1 = () => {
  console.time('NativeMap')
  for (let i = 0; i < 100; i++) {
    const map: {
      [key: string]: number
    } = {}
    for (let i = 0; i < arr.length; i++) {
      map[arr[i]] = i
    }

    for (let i = 0; i < arr.length; i++) {
      map[arr[i]]
    }

    for (let i = 0; i < arr.length; i++) {
      delete map[arr[i]]
    }
  }

  console.timeEnd('NativeMap')
}

const bench2 = () => {
  console.time('SeparateChainingHashTable')
  for (let i = 0; i < 100; i++) {
    const map = new SeparateChainingHashTable<string, number>()
    for (let i = 0; i < arr.length; i++) {
      map.put(arr[i], i)
    }

    for (let i = 0; i < arr.length; i++) {
      map.get(arr[i])
    }

    for (let i = 0; i < arr.length; i++) {
      map.delete(arr[i])
    }
  }

  console.timeEnd('SeparateChainingHashTable')
}
const bench3 = () => {
  console.time('BSTMap')
  for (let i = 0; i < 100; i++) {
    const map = new BSTMap<string, number>()
    for (let i = 0; i < arr.length; i++) {
      map.put(arr[i], i)
    }

    for (let i = 0; i < arr.length; i++) {
      map.get(arr[i])
    }

    for (let i = 0; i < arr.length; i++) {
      map.delete(arr[i])
    }
  }

  console.timeEnd('BSTMap')
}
const bench4 = () => {
  console.time('LinearProbingHashTable')
  for (let i = 0; i < 100; i++) {
    const map = new LinearProbingHashTable<string, number>(1000)
    for (let i = 0; i < arr.length; i++) {
      map.put(arr[i], i)
    }

    for (let i = 0; i < arr.length; i++) {
      map.get(arr[i])
    }

    for (let i = 0; i < arr.length; i++) {
      map.delete(arr[i])
    }
  }

  console.timeEnd('LinearProbingHashTable')
}
bench()
bench1()
bench2()
bench3()
bench4()
