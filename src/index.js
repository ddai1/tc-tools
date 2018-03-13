//import { useStrict } from 'mobx'
//useStrict(true)

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react'
import {MobxRouter, startRouter} from 'mobx-router'
import views from './views'

import { createStores } from './store/index'
import 'muicss/dist/css/mui.min.css'
import registerServiceWorker from './registerServiceWorker';



const store = createStores()

startRouter(views, store)


ReactDOM.render(
  <Provider store={store}>
      <div>
          <MobxRouter/>          
      </div>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
