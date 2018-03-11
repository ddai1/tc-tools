import { RouterStore } from 'mobx-router'
import RmStore from './RmStore'
import CmStore from './CmStore'
import AppStore from './AppStore'
import SmsStore from './SmsStore'

const rmStore = new RmStore()
const cmStore = new CmStore()
const smsStore =  new SmsStore()
const appStore = new AppStore(rmStore, cmStore, smsStore)

export function createStores() {
  return {
    router: new RouterStore(),
    rmStore,
    cmStore,
    smsStore,
    appStore
  }
}


