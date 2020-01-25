/**
 * @des deep clone
 * @param
 */
export const deepclone = (param) => {
  if (typeof param !== 'object') return param
  const temp = Array.isArray(param) ? [] : {}
  Object.keys(param).forEach(i => {
    if (typeof param[i] === 'object') {
      temp[i] = deepclone(param[i])
    } else {
      temp[i] = param[i]
    }
  })
  return temp
}
