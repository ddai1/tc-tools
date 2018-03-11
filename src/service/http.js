import request from 'superagent-bluebird-promise'

export function post (path, data){
  path = `http://localhost:9710/simple/glglive/${path}`
  return request
    .post(path)
    .timeout(60000)
    .withCredentials()
    .send(data)
    .then((res) => {
      return res.text?JSON.parse(res.text):null
    })
    .catch((error)=> {
      console.log('EPI POST ERROR %s PATH %s DATA %s', JSON.stringify(error), path, JSON.stringify(data))
      throw Error(error.message)
    })
}

export function get (path){
  path = `http://localhost:9710/simple/glglive/${path}`
  return request
    .get(path)
    .timeout(60000)
    .withCredentials()
    .then((res) => {
      return JSON.parse(res.text)
    })
    .catch((error) => {
      console.log('EPI GET ERROR %s PATH %s', JSON.stringify(error), path)
      throw Error(error.message)
    })
}

