export default [{
	path: 'PropertyCompanyMessage',
	meta: {
		title: '消息页面'
	},
	redirect: 'PropertyCompanyMessage/propertyCompanyMessage_receive',
	component: resolve => require(['@/pages/PropertyCompany/PropertyCompanyMessage/index'], resolve),
	children: [{
			path: "PropertyCompanyMessage_receive",
			name: "PropertyCompanyMessage_receive",
			meta: {
				title: '收到的消息'
			},
			component: resolve => require(['@/pages/PropertyCompany/PropertyCompanyMessage/PropertyCompanyMessage_receive'], resolve)
		},
		{
			path: "PropertyCompanyMessage_send",
			name: "PropertyCompanyMessage_send",
			meta: {
				title: '发消息页面'
			},
			component: resolve => require(['@/pages/PropertyCompany/PropertyCompanyMessage/PropertyCompanyMessage_send'], resolve)
		},
		{
			path: "PropertyCompanyMessage_sended",
			name: "PropertyCompanyMessage_sended",
			meta: {
				title: '已发送消息页面'
			},
			component: resolve => require(['@/pages/PropertyCompany/PropertyCompanyMessage/PropertyCompanyMessage_sended'], resolve)
		},
		{
			path: "PropertyCompanyMessageDetails",
			name: "PropertyCompanyMessageDetails",
			meta: {
				title: '已发送消息详情'
			},
			component: resolve => require(['@/pages/PropertyCompany/PropertyCompanyMessage/PropertyCompanyMessageDetails'], resolve)
		},
		{
			path: "PropertyCompanyMessage_receiveDetails",
			name: "PropertyCompanyMessage_receiveDetails",
			meta: {
				title: '已收到消息详情'
			},
			component: resolve => require(['@/pages/PropertyCompany/PropertyCompanyMessage/propertyPropertyMessage_receiveDetails'], resolve)
		},
	]
}]