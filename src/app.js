const auth = require('./utils/auth')

const userName = 'james.dickson.bc'
const apiKey = 'bs'


auth(userName, apiKey, (error, response) => {
    if (error){
        return console.log(error)
    }
    console.log(response.token)
})
