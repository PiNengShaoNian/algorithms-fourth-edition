import KMP from './KMP'

const tandemRepeat = (baseString: string, text: string): number => {
  let repeat = 0
  let occurencedIndex = 0
  let pattern = baseString

  while (true) {
    const kmp = new KMP(pattern)
    occurencedIndex = kmp.search(text)

    if (occurencedIndex === text.length) return repeat
    else {
      repeat++
      pattern += baseString
    }
  }
}

class KnuthMorrisPrattTandemRepeat {
  private pattern: string

  private dfa: number[][]
  private baseStringLength: number = 0
  private tandemRepeat: number = 0

  constructor(baseString: string, text: string) {
    let pattern = ''
    let maxNumberOfRepeats = Math.floor(text.length / baseString.length)

    for (let repeat = 0; repeat < maxNumberOfRepeats; repeat++) {
      pattern += baseString
    }

    this.pattern = pattern

    let patternLength = pattern.length
    const alphabetSize = 256
    this.baseStringLength = baseString.length
    this.tandemRepeat = -1

    this.dfa = Array.from({ length: alphabetSize }, () =>
      Array.from({ length: patternLength }, () => 0)
    )

    this.dfa[pattern.charCodeAt(0)][0] = 1

    let restartState = 0

    for (let patternIndex = 1; patternIndex < patternLength; patternIndex++) {
      for (let currentChar = 0; currentChar < alphabetSize; currentChar++) {
        this.dfa[currentChar][patternIndex] = this.dfa[currentChar][
          restartState
        ]
      }

      this.dfa[pattern.charCodeAt(patternIndex)][patternIndex] =
        patternIndex + 1
      restartState = this.dfa[pattern.charCodeAt(patternIndex)][restartState]
    }

    this.computeTandemRepeat(text)
  }

  computeTandemRepeat(text: string) {
    let textIndex
    let patternIndex

    let maxPatternIndexMatched = this.baseStringLength

    for (
      textIndex = 0, patternIndex = 0;
      textIndex < text.length && patternIndex < this.pattern.length;
      textIndex++
    ) {
      patternIndex = this.dfa[text.charCodeAt(textIndex)][patternIndex]

      if (
        patternIndex % this.baseStringLength === 0 &&
        patternIndex > maxPatternIndexMatched
      ) {
        this.tandemRepeat = textIndex - patternIndex + 1
        maxPatternIndexMatched = patternIndex
      }
    }
  }

  findTandemRepeat() {
    return this.tandemRepeat
  }
}
