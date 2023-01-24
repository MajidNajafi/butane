export const FormatTime = (time: number) => {
  let seconds = time
  seconds = seconds % 3600
  const minutes = parseInt((seconds / 60).toString())
  seconds = Math.round(seconds % 60)
  const mm = `${minutes < 10 ? "0" : ""}${minutes}:`
  const ss = `${seconds < 10 ? "0" : ""}${seconds}`
  return `${mm}${ss}`
}
