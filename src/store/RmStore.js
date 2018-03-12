import { post, get } from '../service/http'
import {extendObservable, action} from "mobx"
import _ from 'lodash'

class RmStore {
  constructor(){
    
    extendObservable(this, {
      loading:true,
      avalaibleRms:[],
      manager:null,
      assignedCmId:null,

      getRmlist: (manager) => {
        let url = `tc_expiration\\getAssignment.mustache?managerUser=glgroup\\${manager}`
        return get(`${url}`)
          .then ((avalaibleRms) => {
            this.avalaibleRms = _(avalaibleRms.results[0]).map((rm) => { return {value: rm.USER_ID, label : rm.FIRST_NAME + ' ' + rm.LAST_NAME, } }).value()
            
        })
      },

      upsertAssignRM: (cmId, rmId, loginRm) => {
        let url = `tc_expiration\\upsertAssignment.mustache`
        let data =  {
          "cmIDs": cmId,
          "recruiterUID": rmId,
          "updatedBy": loginRm
        }
        return post (`${url}`, data)
          .then(() => {
            return true
          }
        )
        .catch(() => {
          return 'failed to assign.'
        })


        console.log('cmId, rmId', cmId, rmId)
      }


    })
  }
}

export default RmStore