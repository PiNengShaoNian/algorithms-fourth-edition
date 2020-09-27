const STdouble = require('../lib/BlackRedTree')
const STint = STdouble

class SparseVectorIntKeys {
  constructor() {
    this.stInt = new STint()
  }

  put(key, value) {
    this.stInt.put(key, value)
  }

  get(key) {
    if (!this.stInt.contains(key)) return 0
    else {
      return this.stInt.get(key)
    }
  }

  dot(that) {
    let sum = 0

    debugger
    for (const key of this.stInt.keys()) {
      //   sum += that[key.valueOf()] * this.get(key)
      const a = that[Math.floor(key.valueOf())]
      const b = this.get(key)
      sum += a * b
    }

    return sum
  }
}

class SparseVectorDoubleKeys {
  constructor() {
    this.stDouble = new STdouble()
  }

  size() {
    return this.stDouble.size()
  }

  put(key, value) {
    if (!this.stDouble.contains(key)) return 0
    else {
      return this.stDouble.get(key)
    }
  }

  dot(that) {
    let sum = 0

    for (const key of this.stDouble.keys()) {
      const a = that[Math.floor(key.valueOf())]
      const b = this.get(key)
      sum += a * b
    }

    return sum
  }
}

const testInt = () => {
  debugger
  const matrixColumn0 = new SparseVectorIntKeys()
  matrixColumn0.put(1, 0.9)

  const matrixColumn1 = new SparseVectorIntKeys()
  matrixColumn1.put(2, 0.36)
  matrixColumn1.put(3, 0.36)
  matrixColumn1.put(4, 0.18)

  const matrixColumn2 = new SparseVectorIntKeys()
  matrixColumn2.put(3, 0.9)

  const matrixColumn3 = new SparseVectorIntKeys()
  matrixColumn3.put(0, 0.9)

  const matrixColumn4 = new SparseVectorIntKeys()
  matrixColumn4.put(0, 0.47)
  matrixColumn4.put(2, 0.47)

  const matrix = [
    matrixColumn0,
    matrixColumn1,
    matrixColumn2,
    matrixColumn3,
    matrixColumn4,
  ]

  const vector = [0.05, 0.04, 0.36, 0.37, 0.19]

  const resultVector = []

  for (let matrixColumn = 0; matrixColumn < matrix.length; matrixColumn++) {
    resultVector[matrixColumn] = matrix[matrixColumn].dot(vector)
  }

  console.log(resultVector)
}

testInt()
