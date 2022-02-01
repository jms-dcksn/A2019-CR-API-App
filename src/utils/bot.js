const axios = require('axios')

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
      return [message, undefined]
    }
    if(data.list.length===0){
      return ["Bot name not found.", undefined]
    }
    const botId = data.list[0].id
    return [undefined, botId]
  } catch (error) {
    return [error.response.data.message, undefined]
  }
}

module.exports = bot
