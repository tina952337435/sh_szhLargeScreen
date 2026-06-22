<template>
</template>

<script setup>
	import {
		ref,
		onMounted,
		onUnmounted,
		nextTick
	} from 'vue'

	import {
		useRouter
	} from "vue-router";
	import api from "@/api/login/index.js";
	import {
		setWithExpiry,
		getWithExpiry
	} from '@/api/login/localStorageItem.js';

	import md5 from "js-md5";
    import { ElMessage } from 'element-plus'
	const router = useRouter();
	onMounted(() => {
		// console.error("===")
		// console.error((window.location.search).split("=")[1])
		var username = (window.location.search).split("=")[1];
		if (username !== undefined) {
			if (username.indexOf("&") > -1) {
				username = username.split("&")[0];
			}
			// window.location.href = "/zonglan";
			// getUserList();
			login(username);
		}
	});
	const getUserList = (userName) => {
		api.getvHyUserlist(userName).then((res) => {
			if (res != "") {
				// 使用示例
				setWithExpiry('htmlIframe', userName, 7200000); // 1小时（3600000）后过期：毫秒单位
				setWithExpiry('chineseName', res[0].name, 7200000);
				const actualOrgsName = res[0].actualOrgs[0].name;
				setWithExpiry('actualOrgsName', actualOrgsName, 7200000);
				setWithExpiry('useremail', res[0].mail, 7200000);
				const parentDept_name = res[0].orgName
				setWithExpiry('parentDept_name', parentDept_name, 7200000);
				// alert(parentDept_name)
				api.getsys_dept({}).then((responseDeptData) => {
					console.error('responseDeptData', responseDeptData);
					const dataDept = responseDeptData;
					const parentData = findAncestors(dataDept,actualOrgsName); //通过统一登录的部门找到用户的二级单位，只有二级单位下的才有知识库
					if (parentData == null) { //找不到二级部门
						return;
					}
					console.log("部门信息", parentData)
					const parentDept_name = parentData[1].dept_name;
				});

				const strWhere = {
					"username": getWithExpiry('htmlIframe'),
					"useremail": getWithExpiry('useremail')
				}
				//获取token
				api.getToken(strWhere).then((responseToken) => {
					var token = responseToken.result.token;
					setWithExpiry('token', token, 7200000); //存储token
				});

				window.location.href = "/zonglan";//登录成功跳转到指定路由
			} else {
				alert("用户名无权限或未获取用户信息，请重新输入");
			}
			console.error('res', res);
		});
	}
	const login =(userName) => {
		var strParam = {};
		strParam["username"] = userName;
		strParam["password"] = md5("Gaoqi_0531");
		strParam["platform"] = "PC";
		api.useLogin(strParam).then(res => {
			// 判断登录请求是否成功
			if (res.result.length > 0) {
				ElMessage.success("登录成功");
				let strJson = res.result;
				localStorage.setItem("token_tbasw", strJson[0].token);
				var oneLogin="";
				if (strJson.length > 0) {
					var item = strJson[0];
					oneLogin=item["memo2"];

					localStorage.setItem("LOGINNAME_tbasw", item.name);
					localStorage.setItem("GROUPID_tbasw", item.groupid);
					localStorage.setItem("USERID_tbasw", item.id);
					localStorage.setItem("USERNAME_tbasw", item.qx_login);
				}
				window.location.href = "/zonglan";
			} else {
				ElMessage.error("登录失败");
			}
		});
	}
	
</script>