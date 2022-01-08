const axios = require('axios')

const deploy = async (url, token, botId, runAsUserId, poolId, botInput) => {
    url = url + '/v3/automations/deploy'
    try{
        const { data } = await axios(
        {
            method: 'post',
            url: url,
            data: {
                    'fileId': botId,
                    'callbackInfo':{},
                    'runAsUserIds':[runAsUserId], //Run As User should have default device set - otherwise Pool ID is needed
                    'poolIds': [poolId],
                    'overrideDefaultDevice': false,
                    'botInput': botInput
                },
            headers : {
                "Content-Type": "application/json",
                "X-Authorization": token
            }
        });
        if(data.message){
            const message = data.message
            return message
        }
        const deploymentId = data.deploymentId
        return deploymentId
    } catch (error) {
        if (error.response.status >= 400) {
            return error.response.data.message
        }
    }
}

module.exports = deploy