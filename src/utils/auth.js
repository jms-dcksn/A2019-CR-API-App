const request = require('request')

const auth = (userName, apiKey, callback) => {
    const url = 'http://localhost:80/v1/authentication'
    request({
        url : url,
        method :"POST",
        headers : {
          "content-type": "application/json",
        },
        body: {
          'username':userName,
          'password':apiKey
        },
        json: true
      }, (e, r, body)=>{
        if(e){
            callback('Authorization failed. Please try again.', undefined)
        } else if (r.body.message){
            callback(body.message, undefined)
        } else{
            callback(undefined, {
                token: r.body.token
            })
        }
    })
}

module.exports = auth