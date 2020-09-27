class Dequeue {
  exch(a) {
    let t = a[0]
    a[0] = a[1]
    a[1] = t
  }

  insertAfterLast(a) {
    const t = a.shift()
    a.push(t)
  }

  sort(a) {
    const [n1, n2] = a
    if (n2 < n1) {
      this.exch(a)
    }
  }
}
