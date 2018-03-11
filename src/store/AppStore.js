import { extendObservable, action } from 'mobx'
import { get } from '../service/http'
import superUserList from './superUserList'

export default class AppStore {
  constructor(rmStore, cmStore, smsStore) {
    extendObservable(this, {
      initials:null,
      currentUser:null,
      currentUserId:0, // pre-set as system process
      assignedCmId:null,
      assingedRm:null,
      avalaibleRms:null,
      isManager:false,
      isSuper:false,
      cmlist:null,
      assignmentSwitch: false,

      checkUserLevel: () => {
        
        var patt = /(starphleet_user=)(\w+)(;)/
        var decodeString = patt.exec(document.cookie)
        if ( decodeString !== null) {
          this.currentUser = decodeString[2]
        } else {
          // TODO: for development only
          this.currentUser = "ddai2"
        };

        this.getUserId(this.currentUser);

        if (superUserList.manager.includes(this.currentUser.toLowerCase())) {
          this.isManager=true
        } 
      },

      getUserId: (userName) => {
          let url = `affirmative-consent/getUserByLoginName.sql?loginName=glgroup\\${userName}`
          get (url)
          .then((u) => {
            this.currentUserId = u.results[0][0].userId
          })
      } 

    })
  }
}
