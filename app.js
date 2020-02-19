const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const port = 3000
const bodyParser = require('body-parser')
const generatePassword = require('./generate_password.js')
const handlebars = require('handlebars')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))

handlebars.registerHelper('ifOdd', function (value, options) {
  if (+value % 2 === 1) {
    return options.fn(this);
  }
  return options.inverse(this);
});

app.get('/', (req, res) => {
  res.render('index', { options: { length: 12, amount: 1, excludeSimilarCharacters: 'on' } })
})

app.post('/', (req, res) => {
  const options = req.body
  const { password, error } = generatePassword(options)
  res.render('index', { password, error, options })
})

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
