const array1 = [1,2,3]
const array2 = [2,3,4, [1,2,5]]

const newArray = array1.concat(...array2)
const uniqueArray = [...new Set(newArray)]
console.log(uniqueArray)