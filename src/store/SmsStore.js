import {extendObservable, action} from "mobx"
import axios from 'axios'

class SmsStore {
  constructor(){
    
    extendObservable(this, {
        smsSent: false,

      sendSMS: (payload) => {
        let xcom_server = `https://jobs-internal.glgresearch.com/xcom/`
        return axios.post(
            `${xcom_server}api/sms/send`,
            payload            
        ).then(function(res) {
            console.log('res', res)
            return true
        })
        .catch(function(error){
            console.log('error', error)
        })
      }
    })
  }
}

export default SmsStore
