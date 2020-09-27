class Shell {
  static sort(a) {
    let N = a.length
    let h = 1
    let t

    while (h < Math.floor(N / 3)) h = 3 * h + 1

    while (h >= 1) {
      for (let i = h; i < N; i++) {
        for (let j = i; j >= h && a[j] < a[j - h]; j -= h) {
          t = a[j]
          a[j] = a[j - h]
          a[j - h] = t
        }
      }

      h = Math.floor(h / 3)
    }

    return a
  }

  static less(a, b) {
      
  }

  static check() {

  }
}

console.log(Shell.sort([5, 4, 3, 2, 1]))
