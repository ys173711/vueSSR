
/**
 * @des 自定义 http 状态码和错误提示
 * @param
 */
export const createError = (code, msg) => {
  const error = new Error(msg)
  error.code = code
  return error
}
