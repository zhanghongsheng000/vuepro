import AccountManager from '../../Public/AccountManagerPublic'
export default [{
		path: '/SalaryManager/yg/home', //员工
		// component:resolve=>require(['@/pages/SalaryManager/yg/home'],resolve),
		component: () =>
			import('@/pages/SalaryManager/yg/home'),
		meta: {
			title: '员工页面'
		},
		children: [{
				path: '', //员工默认首页
				component: () =>
					import('@/components/SalaryManager/yg/yghome'),
				meta: {
					title: '员工默认首页'
				},
				name: 'YgHome'
			},
			{
				path: '/SalaryManager/yg/ygPayroll', //员工工资条
				component: () =>
					import('@/pages/SalaryManager/yg/ygPayroll'),
				meta: {
					title: '员工工资条'
				},
				name: 'YgPayroll'
			},
			{
				path: '/SalaryManager/yg/accountsManage', //员工工资条
				component: () =>
					import('@/pages/SalaryManager/yg/accountsManage'),
				meta: {
					title: '员工工资条'
				},
				name: 'YgPayroll',
				children: [
					...AccountManager,
				]
			},
			// {
			//   path:'realname',//员工实名认证
			//   component:()=>import('@/pages/SalaryManager/yg/realname'),
			//   name:'Realname'
			// },
			{
				path: '/SalaryManager/yg/modifyPassword', //员工修改密码
				component: () =>
					import('@/pages/SalaryManager/yg/modifyPassword'),
				meta: {
					title: '员工修改密码'
				},
				name: 'ModifyPassword'
			}
		]
	},
	{
		path: '/SalaryManager/rs/home', //人事
		component: () =>
			import('@/pages/SalaryManager/rs/home'),
		children: [{
				path: '', //人事默认首页
				component: () =>
					import('@/components/SalaryManager/rs/rshome'),
				meta: {
					title: '人事默认首页'
				},
				name: 'RsHome'
			},
			{
				path: '/SalaryManager/rs/rsManage', //人事=》员工管理
				component: () =>
					import('@/pages/SalaryManager/rs/ysManage'),
				meta: {
					title: '人事员工管理'
				},
				name: 'YsManage'
			},
			/*{
			  path:'/SalaryManager/rs/realname',
			  component:()=>import('@/pages/SalaryManager/rs/realname'),
			  name:'rsRealname'
			},*/
			{
				path: '/SalaryManager/rs/modifyPassword',
				component: () =>
					import('@/pages/SalaryManager/rs/modifyPassword'),
				meta: {
					title: '修改密码'
				},
				name: 'rsModifyPassword'
			}

		]
	},
	{
		path: '/SalaryManager/ld/home', //领导
		component: () =>
			import('@/pages/SalaryManager/ld/home'),
		children: [{
				path: '', //领导默认首页
				component: () =>
					import('@/components/SalaryManager/ld/ldhome'),
				meta: {
					title: '领导默认首页'
				},
				name: 'LdHome'
			},
			{
				path: '/SalaryManager/ld/ApprovalPayfor',
				component: () =>
					import('@/pages/SalaryManager/ld/ApprovalPayfor'),
				meta: {
					title: '待审批工资表列表'
				},
				name: 'ApprovalPayfor'
			},
			{
				path: '/SalaryManager/ld/ApprovalPayfor_xq',
				component: () =>
					import('@/pages/SalaryManager/ld/ApprovalPayfor_xq'),
				meta: {
					title: '待审批工资表详情'
				},
				name: 'ApprovalPayfor_xq'
			},
			{
				path: '/SalaryManager/ld/alApprovalPayfor',
				component: () =>
					import('@/pages/SalaryManager/ld/alApprovalPayfor'),
				meta: {
					title: '已审批工资表列表'
				},
				name: 'alApprovalPayfor'
			},
			{
				path: '/SalaryManager/ld/alApprovalPayfor_xq',
				component: () =>
					import('@/pages/SalaryManager/ld/alApprovalPayfor_xq'),
				meta: {
					title: '已审批工资表详情'
				},
				name: 'alApprovalPayfor_xq'
			},
			/*{
			  path:'/SalaryManager/ld/realname',
			  component:()=>import('@/pages/SalaryManager/ld/realname'),
			  name:'Realname1'
			},*/
			{
				path: '/SalaryManager/ld/modifyPassword',
				component: () =>
					import('@/pages/SalaryManager/ld/modifyPassword'),
				meta: {
					title: '修改密码'
				},
				name: 'ModifyPassword1'
			}
		]
	},
	{
		path: '/SalaryManager/cw/home', //财务
		component: () =>
			import('@/pages/SalaryManager/cw/home'),
		meta: {
			title: '财务首页'
		},
		children: [{
				path: '', //财务默认首页
				component: () =>
					import('@/components/SalaryManager/cw/cwhome'),
				meta: {
					title: '财务首页'
				},
				name: 'CwHome'
			},
			{
				path: '/SalaryManager/cw/cwxzsz', //财务薪资参数设置
				component: () =>
					import('@/pages/SalaryManager/cw/cwxzsz'),
				meta: {
					title: '薪资参数设置'
				},
				name: 'cwxzsz'
			},
			{
				path: '/SalaryManager/cw/cwygxzgl', //财务 员工薪资管理
				component: () =>
					import('@/pages/SalaryManager/cw/cwygxzgl'),
				meta: {
					title: '员工薪资管理'
				},
				name: 'cwygxzgl'
			},
			{
				path: '/SalaryManager/cw/cwzdgzb', //财务 制定工资表
				component: () =>
					import('@/pages/SalaryManager/cw/cwzdgzb'),
				meta: {
					title: '制定工资表'
				},
				name: 'cwzdgzb'
			},
			{
				path: '/SalaryManager/cw/cwffgzList', //财务 发放工资列表
				component: () =>
					import('@/pages/SalaryManager/cw/cwffgzList'),
				meta: {
					title: '发放工资列表'
				},
				name: 'cwffgzList'
			},
			{
				path: '/SalaryManager/cw/cwffgz', //财务 发放工资
				component: () =>
					import('@/pages/SalaryManager/cw/cwffgz'),
				meta: {
					title: '发放工资'
				},
				name: 'cwffgz'
			},
			{
				path: '/SalaryManager/cw/cwgzbcx', //财务 工资表查询
				component: () =>
					import('@/pages/SalaryManager/cw/cwgzbcx'),
				meta: {
					title: '工资表查询'
				},
				name: 'cwgzbcx'
			},
			{
				path: '/SalaryManager/cw/salaryxq', //财务 工资表查询详情
				component: () =>
					import('@/pages/SalaryManager/cw/salaryxq'),
				meta: {
					title: '工资表查询详情'
				},
				name: 'salaryxq'
			},
			{
				path: '/SalaryManager/cw/accountsManage', // 财务 账务管理
				component: () =>
					import('@/pages/SalaryManager/cw/zwgl/accountsManage'),
				meta: {
					title: '财务管理'
				},
				name: 'CwAccountsManage'
			},
			{
				path: '/SalaryManager/cw/accountsManage/nameConfirm', // 员工账务管理 实名认证
				component: () =>
					import('@/pages/SalaryManager/cw/zwgl/nameConfirm'),
				meta: {
					title: '实名认证'
				},
				name: 'CwNameConfirm'
			},
			{
				path: '/SalaryManager/cw/accountsManage/setPaw', // 员工账务管理 设置交易密码
				component: () =>
					import('@/pages/SalaryManager/cw/zwgl/setPaw'),
				meta: {
					title: '设置交易密码'
				},
				name: 'CwSetPaw'
			},
			{
				path: '/SalaryManager/cw/accountsManage/setPaw/bindcard-one', // 员工账务管理 绑卡1
				component: () =>
					import('@/pages/SalaryManager/cw/zwgl/bindcard-one'),
				meta: {
					title: '绑卡第一步'
				},
				name: 'CwBindCardOne'
			},
			{
				path: '/SalaryManager/cw/accountsManage/setPaw/bindcard-two', // 员工账务管理 绑卡2
				component: () =>
					import('@/pages/SalaryManager/cw/zwgl/bindcard-two'),
				meta: {
					title: '绑卡第二步'
				},
				name: 'CwBindCardTwo'
			},
			{
				path: '/SalaryManager/cw/accountsManage/setPaw/bindcard-twos', // 员工账务管理 绑卡3
				component: () =>
					import('@/pages/SalaryManager/cw/zwgl/bindcard-twos'),
				meta: {
					title: '绑卡第三步'
				},
				name: 'CwBindCardTwos'
			},
			{
				path: '/SalaryManager/cw/accountsManage/setPaw/bindcard-four', // 员工账务管理 绑卡4
				component: () =>
					import('@/pages/SalaryManager/cw/zwgl/bindcard-four'),
				meta: {
					title: '绑卡第四步'
				},
				name: 'CwBindCardFour'
			},
			{
				path: '/SalaryManager/cw/accountsManage/setPaw/extract-one', // 员工账务管理 提现1
				component: () =>
					import('@/pages/SalaryManager/cw/zwgl/extract-one'),
				meta: {
					title: '提现第一步'
				},
				name: 'CwExtractOne'
			},
			{
				path: '/SalaryManager/cw/accountsManage/setPaw/extract-two', // 员工账务管理 提现2
				component: () =>
					import('@/pages/SalaryManager/cw/zwgl/extract-two'),
				meta: {
					title: '提现第二步'
				},
				name: 'CwExtractTwo'
			},
			{
				path: '/SalaryManager/cw/accountsManage/setPaw/recharge-one', // 员工账务管理 充值1
				component: () =>
					import('@/pages/SalaryManager/cw/zwgl/recharge-one'),
				meta: {
					title: '充值第一步'
				},
				name: 'CwRechargeOne'
			},
			{
				path: '/SalaryManager/cw/accountsManage/setPaw/recharge-two', // 员工账务管理 充值2
				component: () =>
					import('@/pages/SalaryManager/cw/zwgl/recharge-two'),
				meta: {
					title: '充值第二步'
				},
				name: 'CwRechargeTwo'
			},
			{
				path: '/SalaryManager/cw/modifyPassword', //财务修改密码
				component: () =>
					import('@/pages/SalaryManager/cw/modifyPassword'),
				meta: {
					title: '财务修改密码'
				},
				name: 'CwmodifyPassword'
			}
		]
	},
	{
		path: '/SalaryManager/qy/home', //企业法人
		component: () =>
			import('@/pages/SalaryManager/qy/home'),
		children: [{
				path: '', //企业默认首页
				component: () =>
					import('@/components/SalaryManager/qy/qyhome'),
				meta: {
					title: '企业首页'
				},
				name: 'QyHome'
			},
			{
				path: '/SalaryManager/qy/qyManage', //企业=》部门管理
				component: () =>
					import('@/pages/SalaryManager/qy/qyManage'),
				meta: {
					title: '部门管理'
				},
				name: 'QyManage'
			},
			{
				path: '/SalaryManager/qy/staffManage', //企业=》部门管理
				component: () =>
					import('@/pages/SalaryManager/qy/staffManage'),
				meta: {
					title: '部门管理'
				},
				name: 'StaffManage'
			},
		]
	}

]
