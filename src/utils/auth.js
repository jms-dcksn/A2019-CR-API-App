const axios = require('axios')


const auth = async (url, userName, password) => {
  url = url + '/v1/authentication'
  try{
  const { data } = await axios(
    {
      method: 'post',
      url: url,
      data: {
        username: userName,
        password: password
      },
      headers : {
        "Content-Type": "application/json",
      }
    });
    if(data.message){
      const message = data.message
      return message
    }
    const token = data.token
    return token
  } catch (error) {
    if (error.response.status >= 400) {
      console.log(error.response.data.message)
    }
  }
  

}

module.exports = auth