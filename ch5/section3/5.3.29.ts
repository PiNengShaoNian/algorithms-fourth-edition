import { StringStream } from './5.3.28'

class BoyerMooreBuffer {
  private pattern: string
  private right: number[]
  constructor(pattern: string) {
    this.pattern = pattern

    const alphabetSize = 256

    this.right = Array.from({ length: alphabetSize }, () => -1)

    for (let patternIndex = 0; patternIndex < pattern.length; patternIndex++) {
      this.right[pattern.charCodeAt(patternIndex)] = patternIndex
    }
  }

  search(inputStream: StringStream): number {
    let textIndex: number
    const patternLength = this.pattern.length

    const buffer: string[] = Array.from({ length: patternLength })

    let startBufferIndex = 0
    let endBufferIndex = -1
    let totalTextIndex = 0

    let skip: number

    for (textIndex = 0; inputStream.hasNextChar(); textIndex += skip) {
      while (textIndex + patternLength - 1 >= totalTextIndex) {
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

      skip = 0

      for (
        let patternIndex = patternLength - 1;
        patternIndex >= 0;
        patternIndex--
      ) {
        let bufferIndex: number

        if (startBufferIndex + patternIndex >= buffer.length) {
          bufferIndex = patternIndex - (buffer.length - startBufferIndex)
        } else bufferIndex = startBufferIndex + patternIndex

        if (this.pattern[patternIndex] !== buffer[bufferIndex]) {
          skip = Math.max(
            1,
            patternIndex - this.right[buffer[bufferIndex].charCodeAt(0)]
          )

          if (startBufferIndex + skip >= buffer.length) {
            startBufferIndex = skip - (buffer.length - startBufferIndex)
          } else {
            startBufferIndex += skip
          }

          break
        }
      }

      if (skip === 0) return textIndex
    }

    return totalTextIndex
  }
}

const stringStream = new StringStream('abacadabrabracabracadabrabrabracad')

const bruteSearch = new BoyerMooreBuffer('abracadabra')
debugger
console.log(bruteSearch.search(stringStream))
