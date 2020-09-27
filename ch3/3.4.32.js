class HashAttack {
  hashCode(str) {
    let hash = 0

    for (let i = 0; i < str.length; i++) {
      hash = hash * 31 + str.charCodeAt(i)
    }

    return hash
  }

  generateStringsInput(n) {
    const values = ['Aa', 'BB']

    const strings = []

    this.generateStrings(n, 0, strings, '', values)

    return strings
  }

  generateStrings(n, currentIndex, strings, currentString, values) {
    if (currentIndex === n) {
      strings.push(currentString)
      return
    }

    for (const value of values) {
      const newValue = currentString + value

      let newIndex = currentIndex + 1
      this.generateStrings(n, newIndex, strings, newValue, values)
    }
  }
}

const ha = new HashAttack()
const a = ha.generateStringsInput(2)
console.log(a.map(v => ha.hashCode(v)))