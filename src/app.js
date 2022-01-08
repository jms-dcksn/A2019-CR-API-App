const auth = require('./utils/auth')
const bot = require('./utils/bot')
const deploy = require('./utils/bot-deploy')
const runAsUser = require('./utils/run-as-user')
const axios = require('axios')

var inputs = process.argv

const userName = 'james.dickson.bc'
const apiKey = 'jVH0oWd4irdr'
const url = 'http://aaus34f1g2zxk:80'
const botName = 'Msg Box'
const runAsUserId = '8'
const poolId = '1'
const botInput = {}

/* auth(crURL, userName, apiKey)
    .then(token => {
        deploy(url, token, '11917', '8', '1')
        .then(deploymentId => {console.log(`Deployment ID: ${deploymentId}`)})
        .catch(e => {
            console.log(e)
        })
    })
    .catch(e => { 
        console.log('error')
    }) */


const runBot = async () => {
    const token = await auth(url, userName, apiKey)
    const botId = await bot(url, token, botName)
    const deploymentId = await deploy(url, token, botId, runAsUserId, poolId, botInput)
    console.log(deploymentId)
}

runBot()