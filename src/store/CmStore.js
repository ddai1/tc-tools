import { post, get } from '../service/http'
import {extendObservable, action} from "mobx"

class CmStore {
  constructor(){
    
    extendObservable(this, {
      loading:true,
      cmlist:[],
      manager:null,
      assignedCmId:null,
      assingedRm:null,

      getCmlist: (user,isManager) => {
        let url = ""

        if (isManager) {
        url = `tc_expiration\\getCmTcExpiration.mustache?managerUser=glgroup\\${user}`
        }
        else {
        url = `tc_expiration\\getCmTcExpiration.mustache?loginName=glgroup\\${user}`
        }
        // TODO:
        // &&tcStartDate=%272017-10-01%27&&tcEndDate=%272018-03-01%27&&pageNumber=1&&pageSize=10
        return get(`${url}`)
          .then ((cms) => {
            this.cmlist = cms.results[0]
            this.loading=false
        })
      }

    })
  }
}

export default CmStore
