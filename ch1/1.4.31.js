class Deque {
  sLeft = []
  sRight = []
  sTemp = []
  TempIsRight = false

  isEmpty() {
    return !this.sLeft.length && !this.sRight.length && !this.sTemp.length
  }

  pushRight(item) {
    this.sRight.push(item)
  }

  pushLeft(item) {
    this.sLeft.push(item)
  }

  popLeft() {
    if (this.sLeft.length) return this.sLeft.pop()
    else if (this.sTemp.length && this.TempIsRight) return this.sTemp.pop()
    else if (this.sTemp.length && !this.TempIsRight) {
      while (this.sTemp.length) this.sLeft.push(this.sTemp.pop())

      return this.sLeft.pop()
    } else if (!this.sTemp.length && this.sRight.length) {
      while (this.sRight.length) {
        this.sTemp.push(this.sRight.pop())
      }

      this.TempIsRight = true
      return this.sTemp.pop()
    } else return undefined
  }

  popRight() {
    if (this.sRight.length) return this.sRight.pop()
    else if (this.sTemp.length && !this.TempIsRight) {
      return this.sTemp.pop()
    } else if (this.sTemp.length && this.TempIsRight) {
      while (this.sTemp.length) this.sRight.push(this.sTemp.pop())
    } else if (!this.sTemp.length && this.sLeft.length) {
      while (this.sLeft.length) this.sTemp.push(this.sLeft.pop())
      this.TempIsRight = false
      return this.sTemp.pop()
    } else return undefined
  }
}

const deque = new Deque()
deque.pushLeft(1)
deque.pushRight(3)
deque.pushRight(4)
deque.popRight()
deque.popLeft()
deque.popLeft()
console.log(deque)
