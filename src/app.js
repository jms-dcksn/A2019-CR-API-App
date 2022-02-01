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
const runAsUserName = 'james.dickson.runner'
const poolId = '1'
const botInput = {}

const runBot = async () => {
    try{
        const [tokenError, token] = await auth(url, userName, apiKey)
        if(tokenError) throw new Error(tokenError);

        const [userError, runAsUserId] = await runAsUser(url, token, runAsUserName)
        if(userError) throw new Error(userError);

        const [botError, botId] = await bot(url, token, botName)
        if(botError) throw new Error(botError)

        const [deployError, deploymentId] = await deploy(url, token, botId, runAsUserId, poolId, botInput)
        if(deployError) throw new Error(deployError)

        console.log(deploymentId)
    } catch (error){ console.log (error)}
}

runBot()