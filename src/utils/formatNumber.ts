const formatNumber = (num?: number | string) => {
  if (num === undefined) return ''
  const numAsNumber = typeof num === 'string' ? parseFloat(num) : num

  return Math.round(numAsNumber)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export default formatNumber
