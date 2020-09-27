const min = (a) => {
  let Rlo = 1
  let Rhi = a.length
  let Rmid

  let Clo = 1
  let Chi = a[0].length
  let Cmid

  while (Rlo < Rhi && Clo < Chi) {
    Rmid = Math.floor(Rlo + Rhi) / 2
    Rmid = Math.floor(Clo + Chi) / 2

    if (a[Rmid - 1][Cmid] < a[Rmid][Cmid]) Rhi = Rmid - 1
    else if (a[Rmid][Cmid] > a[Rmid + 1][Cmid]) Chi = Cmid - 1
    else if (a[Rmid][Cmid - 1] < a[Rmid][Cmid]) Chi = Cmid - 1
    else {
        
    }
  }
}
