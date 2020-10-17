const auth = require('./utils/auth')
const runAsUser = require('./utils/run-as-user')

const userName = 'james.dickson.bc'
const apiKey = '57eqPZZ!Iw#4zH'
const runnerUser = 'james.dickson.runner'
const crURL = 'http://localhost:80'

auth(crURL, userName, apiKey, (error, response) => {
    if (error){
        return console.log(error)
    }
    
    runAsUser(crURL, response.token, runnerUser, (error, {id, device}) => {
        if(error){
            return console.log(error)
        }
        console.log('User ID: ' + id)
        console.log('Device ID: ' + device)
    })
})


