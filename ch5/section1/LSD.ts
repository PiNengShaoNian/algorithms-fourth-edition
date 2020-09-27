class LSD {
  static sort(a: string[], W: number) {
    const N = a.length
    const R = 256
    const aux: string[] = []

    for (let d = W - 1; d >= 0; d--) {
      const count: number[] = Array.from({ length: R + 1 }, () => 0)
      for (let i = 0; i < N; i++) {
        count[a[i].charCodeAt(d) + 1]++
      }

      for (let r = 0; r < R; r++) {
        count[r + 1] += count[r]
      }

      for (let i = 0; i < N; i++) {
        aux[count[a[i].charCodeAt(d)]++] = a[i]
      }

      for (let i = 0; i < N; i++) {
        a[i] = aux[i]
      }
    }
  }
}

const a = ['4PGC938', '2IYE230', '3CI0720', '1ICK750', '10HV845', '4jZY524']

LSD.sort(a, 7)

console.log(a)
