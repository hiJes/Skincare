const express = require('express')
const router = require('./routes')
const app = express()
const port = 3001

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
app.set('view emgine', 'ejs')
app.use(express.urlencoded ({extended:false}))
app.use(router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})