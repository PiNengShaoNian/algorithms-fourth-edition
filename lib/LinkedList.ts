class ListNode<E> {
  constructor(public item: E, public next: ListNode<E> | null) {}

  toString() {
    return this.item
  }
}

class LinkedList<E> {
  private dummyHead: ListNode<E> | null = new ListNode(
    (null as unknown) as E,
    null
  )
  private _size: number = 0

  size() {
    return this._size
  }

  isEmpty() {
    return this._size === 0
  }

  addFirst(e: E) {
    this.addAtIndex(0, e)
  }

  addAtIndex(index: number, e: E) {
    if (index < 0 || index > this._size) {
      throw new Error(`Index ${index} out of range 0-${this._size}`)
    }

    let prev = this.dummyHead

    for (let i = 0; i < index; i++) {
      prev = prev!.next
    }

    prev!.next = new ListNode(e, prev!.next)
    this._size++
  }

  addLast(e: E) {
    this.addAtIndex(this._size, e)
  }

  get(index: number): E {
    if (index < 0 || index > this._size) {
      throw new Error(`Index ${index} out of range 0-${this._size}`)
    }

    let cur = this.dummyHead?.next

    for (let i = 0; i < index; i++) {
      cur = cur!.next
    }

    return cur!.item
  }

  first() {
    return this.get(0)
  }

  last() {
    return this.get(this._size - 1)
  }

  set(index: number, e: E) {
    if (index < 0 || index > this._size) {
      throw new Error(`Index ${index} out of range 0-${this._size}`)
    }

    let cur = this.dummyHead!.next

    for (let i = 0; i < index; i++) {
      cur = cur!.next
    }

    cur!.item = e
  }

  removeAtIndex(index: number) {
    if (index < 0 || index > this._size) {
      throw new Error(`Index ${index} out of range 0-${this._size}`)
    }

    let prev = this.dummyHead

    for (let i = 0; i < index; i++) {
      prev = prev!.next
    }

    const retNode = prev!.next
    prev!.next = retNode!.next
    retNode!.next = null
    this._size--

    return retNode?.item
  }

  removeFirst() {
    return this.removeAtIndex(0)
  }

  delete(item: E) {
    let index = 0
    const currentNode = this.dummyHead?.next

    while (currentNode && currentNode.item !== item) index++

    this.removeAtIndex(index)
  }

  removeLast() {
    return this.removeAtIndex(this._size - 1)
  }

  contains(e: E) {
    let cur = this.dummyHead?.next

    while (cur) {
      if (cur.item === e) return true

      cur = cur.next
    }

    return false
  }

  toString() {
    let str = ''
    let cur = this.dummyHead?.next
    while (cur) {
      str += cur.item + '->'
      cur = cur.next
    }

    return str
  }

  *[Symbol.iterator]() {
    for (
      let currentNode = this.dummyHead?.next;
      currentNode;
      currentNode = currentNode.next
    ) {
      yield currentNode.item
    }
  }
}

export default LinkedList
