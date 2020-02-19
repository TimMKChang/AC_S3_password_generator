function sample(array) {
  const index = Math.floor(Math.random() * array.length)
  return array[index]
}

function generatePassword(options) {
  // define characters user may want
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const upperCaseLetters = lowerCaseLetters.toUpperCase()
  const numbers = '1234567890'
  const symbols = '`~!@$%^&*()-_+={}[]|;:"<>,.?/'

  //  define dummy data
  // const options = {
  //   length: 12,
  //   lowercase: 'on',
  //   uppercase: 'on',
  //   numbers: 'on',
  //   excludeCharacters: '40'
  // }

  // create a collection to store what user pick up
  let collection = []

  if (options.lowercase === 'on') {
    collection = collection.concat(...lowerCaseLetters)
  }

  if (options.uppercase === 'on') {
    collection = collection.concat(...upperCaseLetters)
  }

  if (options.numbers === 'on') {
    collection = collection.concat(...numbers)
  }

  if (options.symbols === 'on') {
    collection = collection.concat(...symbols)
  }

  // remove characters user do not want
  if (options.excludeSimilarCharacters) {
    const similarCharacters = '1iIl0oO'
    collection = collection.filter(character => {
      return ![...similarCharacters].includes(character)
    })
  }

  if (options.excludeCharacters) {
    collection = collection.filter(character => {
      return !options.excludeCharacters.includes(character)
    })
  }

  // return error message if the collection is empty
  let error = false
  if (collection.length === 0) {
    // return 'There are no valid characters in your selection.'
    error = true
    return { error }
  }

  // generating password
  let password = []
  for (let i = 0; i < Number(options.amount); i++) {
    let tempOnePasssword = ''
    for (let j = 0; j < Number(options.length); j++) {
      tempOnePasssword += sample(collection)
    }
    password.push(tempOnePasssword)
  }

  // return
  return { password, error }
}

module.exports = generatePassword
