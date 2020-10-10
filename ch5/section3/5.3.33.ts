const uniform = (a: number, b: number) => {
  return Math.floor((b - a) * Math.random()) + a
}

class LongRandomPrime {
  static longRandomPrime(): number {
    let longRandomPrime = 0
    const numberOfDigits = 14

    let foundLongRandomPrime = false

    const primeNumbers = this.eratosthenesSieveGetOnlyPrimes()
    while (!foundLongRandomPrime) {
      let number = ''

      for (let digit = 0; digit < numberOfDigits; digit++) {
        const randomValue = uniform(0, 10)
        number += randomValue
      }

      const parsedLongNumber = +number
      if (this.isPrime(parsedLongNumber, primeNumbers)) {
        foundLongRandomPrime = true
        longRandomPrime = parsedLongNumber
      }
    }

    return longRandomPrime
  }

  private static isPrime(number: number, primeNumbers: number[]): boolean {
    for (const primeNumber of primeNumbers) {
      if (number % primeNumber === 0) return false
    }

    return true
  }

  private static eratosthenesSieveGetOnlyPrimes(): number[] {
    const arraySize = 10000000

    const primeNumbers: number[] = []
    const isPrime: boolean[] = Array.from({ length: arraySize + 1 }, () => true)

    for (let i = 2; i <= arraySize; i++) {
      if (isPrime[i]) {
        for (let j = i * i; j < isPrime.length; j += i) {
          isPrime[j] = false
        }

        primeNumbers.push(i)
      }
    }

    return primeNumbers
  }
}

export default LongRandomPrime
