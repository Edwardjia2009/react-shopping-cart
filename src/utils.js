const formatCurrency = (number) => `$ ${Number(number.toFixed(1)).toLocaleString()} `

export default formatCurrency
