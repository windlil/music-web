export function getCompleteName(nameArr: any[]) {
  if (nameArr.length === 1) {
    return nameArr[0].name
  } else {
    return nameArr.reduce((preValue, currentValue) => {
      return `${preValue}  ${currentValue.name}`
    }, '')
  }
}
