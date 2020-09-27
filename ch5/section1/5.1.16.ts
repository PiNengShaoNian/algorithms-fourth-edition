import DoublyLinkedListCircular, {
  DoubleNode,
} from '../../lib/DoublyLinkedListCircular'

const uniform = (a: number, b: number) => {
  return Math.floor((b - a) * Math.random()) + a
}

class LinkedListSort {
  sortLinkedList(linkedList: DoublyLinkedListCircular<string>) {
    const lowNode = linkedList.firstNode()
    const highNode = linkedList.lastNode()

    this._sortLinkedList(lowNode, highNode, 0, linkedList.size() - 1, 0)
  }

  _sortLinkedList(
    lowNode: DoubleNode<string> | null,
    highNode: DoubleNode<string> | null,
    lowIndex: number,
    highIndex: number,
    digit: number
  ) {
    if (lowIndex >= highIndex) return

    const pivotNode = this.getPivotNode(
      lowNode!,
      highNode!,
      lowIndex,
      highIndex
    )
    this.exchange(lowNode!, pivotNode)
    let lowerThanIndex = lowIndex
    let greaterThanIndex = highIndex
    const pivot = this.charAt(lowNode!.item, digit)

    const currentNode = lowNode!.next!
    let index = lowIndex + 1

    while (index <= greaterThanIndex) {
      const currentChar = this.charAt(currentNode.item, digit)

      if (currentChar < pivot) {
        // this.exchange(lowerThanIndex, )
      }
    }
  }

  exchange(node1: DoubleNode<string>, node2: DoubleNode<string>) {
    const temp = node1.item
    node1.item = node2.item
    node2.item = temp
  }

  charAt(string: string, digit: number): number {
    if (digit < string.length) {
      return string.charCodeAt(digit)
    } else return -1
  }

  getPivotNode(
    lowNode: DoubleNode<string>,
    highNode: DoubleNode<string>,
    lowIndex: number,
    highIndex: number
  ): DoubleNode<string> {
    const pivotIndex = uniform(lowIndex, highIndex + 1)

    let currentNode: DoubleNode<string> | null
    const middleIndex = lowIndex + Math.floor((highIndex - lowIndex) / 2)

    if (pivotIndex <= middleIndex) {
      currentNode = lowNode
      let count = lowIndex

      while (count !== pivotIndex) {
        currentNode = currentNode!.next
        count++
      }
    } else {
      currentNode = highNode
      let count = highIndex

      while (count !== pivotIndex) {
        currentNode = currentNode!.previous
        count--
      }
    }

    return currentNode!
  }
}
