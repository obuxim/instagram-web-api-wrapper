const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
const PORT = process.env.PORT || 5050

const Instagram = require('instagram-web-api')
const username = process.env.ig_username
const password = process.env.ig_password
 
const client = new Instagram({ username, password })
client
  .login()
  .then(() => {
    client
      .getProfile()
      .then(console.log)
  })

app.get('/', (req, res) => res.send('API is running!'))

app.get('/api/instagram/:username/:count?', async (req, res) => {
	try {
		const data = await client.getPhotosByUsername({ username: req.params.username, first: req.params.count ? req.params.count : 10 })
		res.send(data)
	} catch(error){
		console.error(`Error loading api: ${error}`)
	}
})

app.listen(PORT, console.log(`Server running!`))
