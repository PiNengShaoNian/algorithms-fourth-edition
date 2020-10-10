import LongRandomPrime from './5.3.33'

class PalindromeStreamChecker {
  private currentString: string
  private largePrimeNumber: number
  private hash: number
  private alphabetSize: number

  private leftHalfReversedHash: number = 0
  private rightHalfHash: number = 0

  constructor() {
    this.currentString = ''
    this.alphabetSize = 256
    this.hash = 1

    this.largePrimeNumber = LongRandomPrime.longRandomPrime()
  }

  checkPalindromeOnline(character: string) {
    this.currentString += character

    let patternLength = this.currentString.length

    if (patternLength === 0)
      this.leftHalfReversedHash =
        character.charCodeAt(0) % this.largePrimeNumber
    else if (patternLength === 2) {
      this.rightHalfHash = character.charCodeAt(0) % this.largePrimeNumber

      return this.currentString[0] === this.currentString[1]
    }

    if (patternLength % 2 === 0) {
      const characterToBeAddedInLeftString = this.currentString[
        Math.floor((patternLength - 1) / 2)
      ]

      this.hash = (this.hash * this.alphabetSize) % this.largePrimeNumber

      this.leftHalfReversedHash =
        (this.leftHalfReversedHash +
          this.hash * characterToBeAddedInLeftString.charCodeAt(0)) %
        this.largePrimeNumber
      this.rightHalfHash =
        (this.rightHalfHash * this.alphabetSize + character.charCodeAt(0)) %
        this.largePrimeNumber
    } else {
      const characterToRemove = this.currentString[
        Math.floor(patternLength / 2)
      ]

      this.rightHalfHash =
        (((this.alphabetSize *
          (this.rightHalfHash +
            this.largePrimeNumber -
            characterToRemove.charCodeAt(0) * this.hash)) %
          this.largePrimeNumber) +
          character.charCodeAt(0)) %
        this.largePrimeNumber
    }

    if (this.leftHalfReversedHash === this.rightHalfHash) {
      let isPalindrome = true

      for (
        let index = 0;
        index < Math.floor(this.currentString.length / 2);
        index++
      ) {
        if (
          this.currentString[index] !==
          this.currentString[this.currentString.length - 1 - index]
        ) {
          isPalindrome = false
          break
        }
      }

      return isPalindrome
    }

    return false
  }
}
