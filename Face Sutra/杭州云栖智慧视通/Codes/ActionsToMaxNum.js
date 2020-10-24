const actionsToMaxNum = (num1, num2, action) => Number(eval(`${BigInt(num1)}${action}${BigInt(num2)}`))

console.log(actionsToMaxNum(169602978461186064, 989711365781532651, '+')) // 1159314344242718700
