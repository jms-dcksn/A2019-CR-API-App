const auth = require('./utils/auth')
const bot = require('./utils/bot')
const runAsUser = require('./utils/run-as-user')

const userName = 'james.dickson.bc'
const apiKey = '57eqPZZ!Iw#4zH'
const runnerUser = 'james.dickson.runner'
const crURL = 'http://localhost:80'
const botName = 'Fleetcor Live Agent UI'

auth(crURL, userName, apiKey, (error, {token}) => {
    if (error){
        return console.log(error)
    }
    
    runAsUser(crURL, token, runnerUser, (error, {userId, device}={}) => {
        if(error){
            return console.log(error)
        }
        console.log('User ID: ' + userId)
        console.log('Device ID: ' + device)
    })
    bot(crURL, token, botName, (error, {botId}={}) => {
        if (error){
            return console.log(error)
        }
        console.log(botId)
    })
})


