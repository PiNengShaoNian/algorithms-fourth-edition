export class StringStream {
  private string: string
  private current: number = 0
  constructor(string: string) {
    this.string = string
  }

  readChar() {
    return this.string[this.current++]
  }

  hasNextChar() {
    return this.current < this.string.length
  }

  in(s: string) {
    this.string += s
  }
}

class BruteForceSubstringSearchBuffer {
  private pattern: string
  private patternLength: number
  constructor(pattern: string) {
    this.pattern = pattern
    this.patternLength = pattern.length
  }

  search(inputStream: StringStream): number {
    let textIndex: number
    const buffer: string[] = Array.from({ length: this.patternLength })

    let startBufferIndex = 0
    let endBufferIndex = -1
    let totalTextIndex = 0

    for (textIndex = 0; inputStream.hasNextChar(); textIndex++) {
      while (textIndex + this.patternLength - 1 >= totalTextIndex) {
        if (inputStream.hasNextChar()) {
          if (endBufferIndex + 1 === buffer.length) {
            endBufferIndex = 0
          } else {
            endBufferIndex = endBufferIndex + 1
          }

          buffer[endBufferIndex] = inputStream.readChar()
          totalTextIndex++
        } else {
          return totalTextIndex
        }
      }

      let patternIndex: number

      for (
        patternIndex = 0;
        patternIndex < this.patternLength;
        patternIndex++
      ) {
        let bufferIndex

        if (startBufferIndex + patternIndex >= buffer.length) {
          bufferIndex = patternIndex - (buffer.length - startBufferIndex)
        } else bufferIndex = startBufferIndex + patternIndex

        if (buffer[bufferIndex] !== this.pattern[patternIndex]) break
      }

      if (startBufferIndex + 1 === buffer.length) startBufferIndex = 0
      else {
        startBufferIndex = startBufferIndex + 1
      }

      if (patternIndex === this.patternLength) return textIndex
    }

    return totalTextIndex
  }
}

// const stringStream = new StringStream('abacadabrabracabracadabrabrabracad')

// const bruteSearch = new BruteForceSubstringSearchBuffer('abracadabra')
// debugger
// console.log(bruteSearch.search(stringStream))
