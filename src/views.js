import React from 'react';
//moduls
import {Route} from 'mobx-router'


//import components
//import NotFound from './components/notFound'
import CmList from './components/cmList'

const views = {
  home: new Route({
    path:'/',
    component: <CmList/> 
  }),
  wrongPath: new Route({
    path: '/:any',
    component: <CmList/>
  })
}

export default views
