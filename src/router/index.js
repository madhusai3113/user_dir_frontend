import Vue from 'vue'
import Router from 'vue-router'
import mainbody from '@/components/mainbody'
import formUpdate from '@/components/formUpdate'
//import header from '@/components/headerfile'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/main',
      name: 'mainbody',
      component:mainbody       
    
    },
    {
      path: '/add',
      name: 'formUpdate',
      component: formUpdate
    }
  ]
})
