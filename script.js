const resultEl = document.querySelector('.result')
const lengthEl = document.querySelector('#length')
const uppercaseEl = document.querySelector('#uppercase')
const lowercaseEl = document.querySelector('#lowercase')
const numbersEl = document.querySelector('#numbers')
const symbolsEl = document.querySelector('#symbols')
const copyEl = document.querySelector('#copy')
const generateEl = document.querySelector('#generate')

const randomFunc = {
  lower: getRandomLowercase,
  upper: getRandomUppercase,
  number: getRandomNumber,
  symbol: getRandomSymbol
}

generateEl.addEventListener('click', () => {
  const length = +lengthEl.value
  const lower = lowercaseEl.checked
  const upper = uppercaseEl.checked
  const numbers = numbersEl.checked
  const symbols = symbolsEl.checked

  resultEl.innerText = generatePassword(length, upper, lower, numbers, symbols)
})

copyEl.addEventListener('click', () => {
  const textArea = document.createElement('textarea')
  const pasword = resultEl.innerText

  if (!pasword) { return }
  textArea.value = pasword
  document.body.appendChild(textArea)
  textArea.select()
  document.execCommand('copy')
  textArea.remove()
  alert('Password copied!')
})

function generatePassword (length, upper, lower, number, symbol) {
  let generatedPassword = ''
  const typesCount = upper + lower + number + symbol
  const typesArr = [{upper}, {lower}, {number}, {symbol}].filter(item => Object.values(item)[0])

  if (typesCount === 0) {
    return ''
  }
  
  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach(type => {
      const funcName = Object.keys(type)[0]
      generatedPassword += randomFunc[funcName]()
    })
  }

  const finalPassword = generatedPassword.slice(0, length)

  return finalPassword
}

function getRandomLowercase () {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

function getRandomUppercase () {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function getRandomNumber () {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

function getRandomSymbol () {
  const symbols = '!@#$%&*'
  return symbols [Math.floor(Math.random() * symbols.length)]
}