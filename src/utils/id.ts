/* eslint-disable no-unused-vars */
const idAssignment = (
  length: number,
  dict = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
) =>
  Array.from({ length }, (_) => dict[~~(Math.random() * dict.length)]).join('')

export default idAssignment
