  export default[
   {
        path:"CommonCompanyMessage",
       /* name:"RenterEmployeeManagement",*/
        meta:{
          title:'消息页面'
        },
        redirect:'CommonCompanyMessage/CommonCompanyMessage_receive',
        component: resolve => require(['@/pages/CommonCompany/CommonCompanyMessage/index'], resolve),
        children:[
          {
            path:"CommonCompanyMessage_receive",
            name:"CommonCompanyMessage_receive",
            meta:{
              title:'收到的消息'
            },
            component: resolve => require(['@/pages/CommonCompany/CommonCompanyMessage/CommonCompanyMessage_receive'], resolve)
          },
          {
            path:"CommonCompanyMessage_receiveDetails",
            name:"CommonCompanyMessage_receiveDetails",
            meta:{
              title:'收到的消息详情'
            },
            component: resolve => require(['@/pages/CommonCompany/CommonCompanyMessage/CommonCompanyMessage_receiveDetails'], resolve)
          },
          {
            path:"CommonCompanyMessage_send",
            name:"CommonCompanyMessage_send",
            meta:{
              title:'发消息页面'
            },
            component: resolve => require(['@/pages/CommonCompany/CommonCompanyMessage/CommonCompanyMessage_send'], resolve)
          },
          {
            path:"CommonCompanyMessage_sended",
            name:"CommonCompanyMessage_sended",
            meta:{
              title:'已发送消息页面'
            },
            component: resolve => require(['@/pages/CommonCompany/CommonCompanyMessage/CommonCompanyMessage_sended'], resolve)
          },
          {
            path:"CommonCompanyMessageDetails",
            name:"CommonCompanyMessageDetails",
            meta:{
              title:'已发送消息页面'
            },
            component: resolve => require(['@/pages/CommonCompany/CommonCompanyMessage/CommonCompanyMessageDetails'], resolve)
          },
        ]
    }]
 
 
  