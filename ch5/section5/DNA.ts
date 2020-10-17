import path from 'path'
import {
  createReadStream,
  createWriteStream,
  ReadStream,
  WriteStream,
} from 'fs'
import Alphabet from '../section1/Alphabet'

class DNA {
  compress(binaryIn: ReadStream, binaryOut: WriteStream) {
    const DNA = new Alphabet('ACTG')

    binaryIn.on('data', (data) => {
      const s = data.toString()
      const N = s.length
      binaryOut.write(Buffer.alloc(4, N))

      for (let i = 0; i < N; i++) {
        const d = DNA.toIndex(s[i])

        binaryOut.write(Buffer.alloc(2, d))
      }
    })
  }

  expand(binaryIn: ReadStream, binaryOut: WriteStream) {
    const DNA = new Alphabet('ACTG')
    const w = DNA.lgR()

    binaryIn.once('readable', () => {
      const N = binaryIn.read(4)
      console.log({ N })
      for (let i = 0; i < N; i++) {
        const c = binaryIn.read(w)
        binaryOut.write(Buffer.alloc(8, c))
      }

      binaryOut.end()
    })
  }
}

const dna = new DNA()

dna.compress(
  createReadStream(path.join(__dirname, './dna.txt')),
  createWriteStream(path.join(__dirname, './compressedDNA.txt'))
)

dna.expand(
  createReadStream(path.join(__dirname, './compressedDNA.txt')),
  createWriteStream(path.join(__dirname, './DNA1.txt'))
)
