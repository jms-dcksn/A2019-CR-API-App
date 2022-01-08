const axios = require('axios')

//Return the run as user ID to be used in the bot deployment API

/* const bot = (crURL, token, botName, callback) => {
    const url = crURL + '/v2/repository/workspaces/public/files/list'
    request({
        url : url,
        method :"POST",
        headers : {
          "content-type": "application/json",
          "X-Authorization": token
        },
        body: {
          //json body to filter based on bot name provided
            'sort':[
               {
                  'field':'name',
                  'direction':'asc'
               }
            ],
            'filter':{
               'operator': 'eq',
               'field': 'name',
               'value': botName
         
            },
            'fields':[],
            'page':{
               'length':5,
               'offset':0
            }
         },
        json: true
      }, (e, r, body)=>{
        if(e){
            callback('Connection with control room failed. Please try again.', undefined)
        } else if (r.body.message){
            callback(body.message, undefined)
        } else if (body.list.length===0) {
          callback('Bot name not found. Please try again.', undefined)
        } else {
            callback(undefined, {
                botId: r.body.list[0].id
            })
        }
    })
} */


const bot = async (url, token, botName) => {
  url = url + '/v2/repository/workspaces/public/files/list'
  try{
  const { data } = await axios(
    {
      method: 'post',
      url: url,
      data: {
        //json body to filter based on bot name provided
          'sort':[
              {
                'field':'name',
                'direction':'asc'
            }
          ],
          'filter':{
              'operator': 'eq',
              'field': 'name',
              'value': botName
          },
          'fields':[],
          'page':{
              'length':5,
              'offset':0
          }
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
    if(data.list.length===0){
      return "Bot name not found."
    }
    const botId = data.list[0].id
    return botId
  } catch (error) {
    if (error.response.status >= 400) {
      console.log(error.response.data.message)
    }
  }
}

module.exports = bot
