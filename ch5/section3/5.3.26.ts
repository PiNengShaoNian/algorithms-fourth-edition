import KMP from './KMP'

const isCyclicRotation = (string1: string, string2: string): boolean => {
  if (string1.length !== string2.length) return false

  const concatenatedString = string1 + string1

  const kmp = new KMP(string2)

  return kmp.search(concatenatedString) !== concatenatedString.length
}

export default isCyclicRotation

console.log(isCyclicRotation('exampleexample', 'mpleexa'))
