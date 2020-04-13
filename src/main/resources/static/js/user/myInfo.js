var url = url ;
var personal = true ;
// var userInfo = userNameInitialization() ;
//验证是否已有用户登录
var userInfo = userNameInitialization() ;
$(function() {
	//先销毁我的留言表格
	$('#myGuestBookTab_id').bootstrapTable('destroy');
	/*我的留言表格初始化*/
	myGuestbookTabelInitialization();
	//先销毁我的拾取表格
	$('#myFindedTab_id').bootstrapTable('destroy');
	/*我的拾取表格初始化*/
	myFindedTabelInitialization();
	//先销毁我的丢失表格
	$('#myLostedTab_id').bootstrapTable('destroy');
	/*我的丢失表格初始化*/
	myLostedTabelInitialization();
	/*toastr弹出框插件初始化*/
	toastrInitialization() ;
	//验证是否已有用户登录
	userNameInitialization() ;
	// 注册表单验证初始化
	registerFormValidator();
	//注册模态框隐藏
	registerDialogHidden();
	//登录表单验证初始化
	loginFormValidator();
	//登录模态框隐藏
	loginDialogHidden();
	//我的信息表单验证初始化
	myInfoFormValidator();
	//我的信息模态框隐藏
	myInfoDialogHidden();
	//修改密码表单验证初始化
	changePasswordFormValidator();
	//修改密码模态框隐藏
	changePasswordDialogHidden();
	//点击注册
	clickOpenModal("#register_id","#registerDialog_id");
	//点击注册模态框的保存
	$("#registerSubmit_id").click(function() {
		userRegister();
	});
	//点击登录
	clickOpenModal("#login_id","#loginDialog_id");
	//点击登录模态框的保存
	$("#loginSubmit_id").click(function() {
		userLogin();
	});
	//点击我的信息
	$("#myInfo_id").click(function() {
		fillingUserInfo() ;
		$("#myInfoDialog_id").modal({
			backdrop: "static" 
		});
	}) ;
	//点击我的信息模态框的修改
	$("#myInfoSubmit_id").click(function() {
		saveMyInfo();
	});
	//点击修改密码
	clickOpenModal("#changePassword_id","#changePasswordDialog_id");
	//点击修改密码模态框的修改
	$("#changePasswordSubmit_id").click(function() {
		saveChangePassword();
	});
	//点击退出登录
	$("#logOut_id").click(function() {
		logOut();
	});
	//点击发送验证码
	$("#sendCaptcha_id").click(function() {
		sendCaptcha() ;
	});
	//点击删除留言
	$("#deleteGuestBookSubmit_id").click(function() {
		var showGuestBookId = $("#showGuestBookId_id").val() ;
		deleteGuestBook(showGuestBookId) ;
	});
	//点击确认已认领/确认已归还
	$("#dealPropertySubmit_id").click(function() {
		dealProperty() ;
	});
	//点击删除
	$("#deletePropertySubmit_id").click(function() {
		deleteProperty() ;
	});
});
function deleteProperty() {
	var propertyId = $("#propertyId_id").val() ;
	if(removeConfirm()) {
		$.ajax({
			type:"get" ,
			url : url+'/student/deleteLostGoods?lostGoodsId='+propertyId,
			async:true,
			crossDomain:true, //设置跨域为true
			xhrFields: {
				 withCredentials: true //默认情况下，标准的跨域请求是不会发送cookie的
			},
			dataType:"json",
			contentType:'application/json',
			 success:function(data) {
				$('#propertyInfoDialog_id').modal('hide'); 
				if(data.code != 10000) {
					toastr.warning(data.message);
					return ;
				}
				toastr.success("删除成功");
				$('#myFindedTab_id').bootstrapTable('selectPage', 1);
				$('#myLostedTab_id').bootstrapTable('selectPage', 1);
			}
		})
	}
}
/**
 * 处理我的拾得/我的丢失
 */
function dealProperty() {
	var propertyId = $("#propertyId_id").val() ;
	$.ajax({
		type:"get" ,
		url : url+'/student/changeState?lostGoodsId='+propertyId+'&state='+"FINISH",
		async:true,
		crossDomain:true, //设置跨域为true
		xhrFields: {
		     withCredentials: true //默认情况下，标准的跨域请求是不会发送cookie的
		},
		dataType:"json",
		contentType:'application/json',
		 success:function(data) {
			$('#propertyInfoDialog_id').modal('hide'); 
			if(data.code != 10000) {
				toastr.warning(data.message);
				return ;
			}
			toastr.success("处理成功");
			$('#myFindedTab_id').bootstrapTable('selectPage', 1);
			$('#myLostedTab_id').bootstrapTable('selectPage', 1);
		}
	})
}
/**
 * 	展示失物招领/寻物启事详细信息
 * @param {Object} row	数据
 */
function viewFinded(row) {
	// console.log(row) ;
	$(".articleImageUrl_class").remove() ;
	var img = "<img class='articleImageUrl_class' src='"+url+"/getImg?imgPath="+row.goodsImageUrl+"' />" ;
	$(".imgDiv_class").append(img) ;
	var button = "" ;
	if(row.getLostType == 0) {
		$("#propertyAddTitle_id").text("拾取地点：");
		$("#propertyManTitle_id").text("拾取人：");
		$("#dioTitle_id").text("失物招领详细信息");
		button = "确认已归还" ;
	}else {
		$("#propertyAddTitle_id").text("丢失地点：");
		$("#propertyManTitle_id").text("丢失人：");
		$("#dioTitle_id").text("寻物启事详细信息");
		button = "确认已认领" ;
	}
	$("#propertyId_id").val(row.lostGoodsId);
	$("#propertyName_id").val(row.releaseTitle);
	$("#propertyModule_id").val(row.goodsTypeName);
	$("#propertyDetail_id").val(row.releaseContent);
	$("#propertyMan_id").val(row.userName) ;
	$("#propertyAddDetail_id").val(row.detailedAddress);
	$("#propertyPhoneNumber_id").val(row.phoneNumber);
	switch(row.state) {
		case "UNREVIEWED" : 
			$("#dealPropertySubmit_id").attr("style","display:none;");
			$("#deletePropertySubmit_id").attr("style","display:none;");
			break ;
		case "PASS" : 
			$("#dealPropertySubmit_id").attr("style","display:none;");
			$("#deletePropertySubmit_id").attr("style","display:none;");
			break ;
		case "NOTPASS" : 
			$("#dealPropertySubmit_id").attr("style","display:none;");
			$("#deletePropertySubmit_id").attr("style","display:inline;");
			break ;
		case "DEAL" : 
			$("#dealPropertySubmit_id").attr("style","display:inline;");
			$("#deletePropertySubmit_id").attr("style","display:none;");
			$("#dealPropertySubmit_id").text(button);
			break ;
		case "FINISH" : 
			$("#dealPropertySubmit_id").attr("style","display:none;");
			$("#deletePropertySubmit_id").attr("style","display:none;");
			break ;
	}
	if(row.claimName == userInfo.userName) {
		$("#dealPropertySubmit_id").attr("style","display:none;");
		$("#deletePropertySubmit_id").attr("style","display:none;");
	}
	$("#propertyInfoDialog_id").modal({
		backdrop: "static"
	});
}
/**
 * 	我的丢失表格初始化
 */
function myLostedTabelInitialization() {
	$('#myLostedTab_id').bootstrapTable({
		url : url+'/getLostGoodsList',
		ajaxOptions: {
			xhrFields: {        //跨域
				withCredentials: true
			},
			crossDomain: true
		},
	    contentType:'application/json',
	    showHeader: true,     				//是否显示列头
	    showLoading: true,
	    undefinedText: "——", 				//当数据为 undefined 时显示的字符。
	    showFullscreen: true,
	    toolbarAlign: 'left',
	    paginationHAlign: 'right',
	    silent: true,
		singleSelect: true,					//复选框只能选择一条记录
	    method: 'post',                     //请求方式（*）
	    toolbar: '#toolbar',                //工具按钮用哪个容器 //设置工具栏的Id或者class 
	    striped: true,                      //是否显示行间隔色
	    cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
	    pagination: true,                   //是否显示分页（*）
	    sidePagination: "server",			//分页方式：client客户端分页，server服务端分页（*）
	    sortable: true,                     //是否启用排序
	    sortOrder: "asc",                   //排序方式
	    pageNumber: 1,                      //初始化加载第一页，默认第一页
	    pageSize: 5,                       	//每页的记录行数（*）
	    pageList: [5],       		//可供选择的每页的行数（*）
	    search: false,                      //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
	    strictSearch: true,
	    minimumCountColumns: 2,             //最少允许的列数
	    clickToSelect: true,                //是否启用点击选中行 //点击行即可选中单选/复选框 
	    uniqueId: "lostGoodsId",               //每一行的唯一标识，一般为主键列
	    detailView: false,                  //是否显示父子表
	    showExport: true,
	    exportDataType: "selected",        	//导出checkbox选中的行数
	    paginationLoop: false,             	//是否无限循环
		paginationPreText: "上一页",
		paginationNextText: "下一页",
		paginationFirstText : "首页",
		paginationLastText : "尾页",
		locale: "zh-CN", //中文支持
		responseHandler: function(res) {
			return {
				"total": res.resp.total,//总页数
				"rows": res.resp.rows   //数据
			 }
		},
		queryParams : function(params) {
			return {
				"size" : params.limit,
				"page" : params.offset,
				"paramObj" : {
					"getLostType" : 1,
					"personal" :personal,
					"state" : null,
					"releaseTitle" : null
				}
			};
		},
		formatLoadingMessage: function() {
			return "请稍等，正在加载中...";
		},
		icons: {
			refresh: "glyphicon-repeat",
			toggle: "glyphicon-list-alt"
		},
		columns: [
		{
			field : 'number',
			title : '行号',
			align: 'center',
			valign: 'middle',
			formatter : function(value, row, index) {
				var pageSize=$('#myLostedTab_id').bootstrapTable('getOptions').pageSize;//通过表的#id 可以得到每页多少条
	            var pageNumber=$('#myLostedTab_id').bootstrapTable('getOptions').pageNumber;//通过表的#id 可以得到当前第几页
	            return Number(pageSize * (pageNumber - 1) + index + 1) ;//返回每条的序号： 每页条数 * （当前页 - 1 ）+ 序号
			}
		},{
			field: 'lostGoodsId',
			align: 'center',
			visible: false //不显示
		},{
			field: 'releaseTitle',
			title: '物品名称',
			valign: 'middle',
			align: 'center',
		},{
			field: 'goodsImageUrl',
			title: '物品图片',
			valign: 'middle',
			align: 'center',
			visible: false //不显示
		},{
			field: 'detailedAddress',
			title: '丢失地点',
			valign: 'middle',
			align: 'center',
		},{
			field: 'goodsTypeName',
			title: '物品分类',
			valign: 'middle',
			align: 'center',
		},{
			field: 'releaseContent',
			title: '详细描述',
			valign: 'middle',
			align: 'center',
			 cellStyle:{
				css:{
					"overflow": "hidden",
					"text-overflow": "ellipsis",
					"white-space": "nowrap"
					}
			}
		},{
			field: 'userName',
			title: '丢失人',
			valign: 'middle',
			align: 'center',
			visible: false //不显示
		},{
			field: 'phoneNumber',
			title: '联系方式',
			valign: 'middle',
			align: 'center',
			visible: false //不显示
		},{
			field: 'getLostTime',
			title: '丢失时间',
			valign: 'middle',
			align: 'center',
			formatter: getLostTimeDateFormat 
		},{
			field: 'state',
			title: '状态',
			valign: 'middle',
			align: 'center',
			formatter: stateDateFormat 
		},{
			title: '操作',
			align: 'center',
			formatter: findedMethod 
		}]
	});
}
/**
 * 	我的拾取表格初始化
 */
function myFindedTabelInitialization() {
	$('#myFindedTab_id').bootstrapTable({
		url : url+'/getLostGoodsList',
		ajaxOptions: {
			xhrFields: {        //跨域
				withCredentials: true
			},
			crossDomain: true
		},
        contentType:'application/json',
        showHeader: true,     				//是否显示列头
        showLoading: true,
        undefinedText: "——", 				//当数据为 undefined 时显示的字符。
        showFullscreen: true,
        toolbarAlign: 'left',
        paginationHAlign: 'right',
        silent: true,
		singleSelect: true,					//复选框只能选择一条记录
        method: 'post',                     //请求方式（*）
        toolbar: '#toolbar',                //工具按钮用哪个容器 //设置工具栏的Id或者class 
        striped: true,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,                   //是否显示分页（*）
        sidePagination: "server",			//分页方式：client客户端分页，server服务端分页（*）
        sortable: true,                     //是否启用排序
        sortOrder: "asc",                   //排序方式
        pageNumber: 1,                      //初始化加载第一页，默认第一页
        pageSize: 5,                       	//每页的记录行数（*）
        pageList: [5],       		//可供选择的每页的行数（*）
        search: false,                      //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
        strictSearch: true,
        minimumCountColumns: 2,             //最少允许的列数
        clickToSelect: true,                //是否启用点击选中行 //点击行即可选中单选/复选框 
        uniqueId: "lostGoodsId",               //每一行的唯一标识，一般为主键列
        detailView: false,                  //是否显示父子表
        showExport: true,
        exportDataType: "selected",        	//导出checkbox选中的行数
        paginationLoop: false,             	//是否无限循环
		paginationPreText: "上一页",
		paginationNextText: "下一页",
		paginationFirstText : "首页",
		paginationLastText : "尾页",
		locale: "zh-CN", //中文支持
		responseHandler: function(res) {
			return {
				"total": res.resp.total,//总页数
				"rows": res.resp.rows   //数据
			 }
		},
		queryParams : function(params) {
			return {
				"size" : params.limit,
				"page" : params.offset,
				"paramObj" : {
					"getLostType" : 0,
					"personal" :personal,
					"state" : null,
					"releaseTitle" : null
				}
			};
		},
		formatLoadingMessage: function() {
			return "请稍等，正在加载中...";
		},
		icons: {
			refresh: "glyphicon-repeat",
			toggle: "glyphicon-list-alt"
		},
		columns: [
		{
			field : 'number',
			title : '行号',
			align: 'center',
			valign: 'middle',
			formatter : function(value, row, index) {
				var pageSize=$('#myFindedTab_id').bootstrapTable('getOptions').pageSize;//通过表的#id 可以得到每页多少条
                var pageNumber=$('#myFindedTab_id').bootstrapTable('getOptions').pageNumber;//通过表的#id 可以得到当前第几页
                return Number(pageSize * (pageNumber - 1) + index + 1) ;//返回每条的序号： 每页条数 * （当前页 - 1 ）+ 序号
			}
		},{
			field: 'lostGoodsId',
			align: 'center',
			visible: false //不显示
		},{
			field: 'releaseTitle',
			title: '物品名称',
			valign: 'middle',
			align: 'center',
		},{
			field: 'goodsImageUrl',
			title: '物品图片',
			valign: 'middle',
			align: 'center',
			visible: false //不显示
		},{
			field: 'detailedAddress',
			title: '拾取地点',
			valign: 'middle',
			align: 'center',
		},{
			field: 'goodsTypeName',
			title: '物品分类',
			valign: 'middle',
			align: 'center',
		},{
			field: 'releaseContent',
			title: '详细描述',
			valign: 'middle',
			align: 'center',
			 cellStyle:{
				css:{
					"overflow": "hidden",
					"text-overflow": "ellipsis",
					"white-space": "nowrap"
					}
			}
		},{
			field: 'userName',
			title: '拾取人',
			valign: 'middle',
			align: 'center',
			visible: false //不显示
		},{
			field: 'phoneNumber',
			title: '联系方式',
			valign: 'middle',
			align: 'center',
			visible: false //不显示
		},{
			field: 'getLostTime',
			title: '拾取时间',
			valign: 'middle',
			align: 'center',
			formatter: getLostTimeDateFormat 
		},{
			field: 'state',
			title: '状态',
			valign: 'middle',
			align: 'center',
			formatter: stateDateFormat 
		},{
			title: '操作',
			align: 'center',
			formatter: findedMethod 
		}]
	});
}
function stateDateFormat(value, row, index) {
	var state = "<span" ;
		switch(row.state) {
			case "UNREVIEWED" : 
				state += ">未审核</span>" ; 
				break ;
			case "PASS" : 
				state += " style='color:blue;'>审核通过</span>" ; 
				break ;
			case "NOTPASS" : 
				state += " style='color:orange;'>审核不通过</span>" ; 
				break ;
			case "DEAL" : 
				state += " style='color:red;'>处理中</span>" ; 
				break ;
			case "FINISH" : 
				state += " style='color:green;'>已完成</span>" ; 
				break ;
		}
		return state ;
}
// 自定义操作列
function getLostTimeDateFormat(value, row, index) {
	var getLostTime = new Date(row.getLostTime);
	var o = {
		"M": getLostTime.getMonth() + 1, //月份 
		"d": getLostTime.getDate(), //日 
		"H": getLostTime.getHours(), //小时 
		"m": getLostTime.getMinutes(), //分 
		"s": getLostTime.getSeconds(), //秒 
	};
	return getLostTime.getFullYear()+"-"+o.M+"-"+o.d+" "+o.H+":"+o.m+":"+o.s ;
}
function findedMethod(value, row, index) {
	var view = "<input type='button' id='view"+row["lostGoodsId"]+"' class='btn btn-primary viewFinded_class' onclick='viewFinded("+JSON.stringify(row)+")' value='查看'>" ;
	return view ;
}
function removeConfirm() {
	var msg = "确定要删除吗？";
	if (confirm(msg)==true){
		return true;
	}else{
		return false;
	}
}
function deleteGuestBook(id) {
	if(removeConfirm()) {
		$.ajax({
			type:"get" ,
			url : url+'/student/deleteGuestbook?guestbookId='+id,
			async:true,
			crossDomain:true, //设置跨域为true
			xhrFields: {
			     withCredentials: true //默认情况下，标准的跨域请求是不会发送cookie的
			},
			dataType:"json",
			contentType:'application/json',
			 success:function(data) {
				$('#showGuestBookDialog_id').modal('hide'); 
				// console.log(data.resp) ;
				if(data.code != 10000) {
					toastr.warning(data.message);
					return ;
				}
				toastr.success("删除成功");
				$('#myGuestBookTab_id').bootstrapTable('selectPage', 1);
			}
		})
	}
}
/**
 * 查看留言详情
 * @param {Object} id 留言id
 */
function viewGuestbook(id) {
	var row = $("#myGuestBookTab_id").bootstrapTable('getRowByUniqueId',id);
	$("#showGuestBookId_id").val(row.guestbookId);
	$("#showGuestBookType_id").val(guestbookTypeContent("",row,"")) ;
	$("#showGuestBookContent_id").text(row.guestbookContent) ;
	$("#showGuestBookTime_id").val(dateFormat("",row,""));
	$("#showGuestBookDialog_id").modal({
		backdrop: "static"
	});
}
/**
 * 	我的留言表格初始化
 */
function myGuestbookTabelInitialization() {
	$('#myGuestBookTab_id').bootstrapTable({
		url : url+'/getGuestbookList',
		ajaxOptions: {
			xhrFields: {        //跨域
				withCredentials: true
			},
			crossDomain: true
		},
        contentType:'application/json',
        showHeader: true,     				//是否显示列头
        showLoading: true,
        undefinedText: "——", 				//当数据为 undefined 时显示的字符。
        showFullscreen: true,
        toolbarAlign: 'left',
        paginationHAlign: 'right',
        silent: true,
		singleSelect: true,					//复选框只能选择一条记录
        method: 'post',                     //请求方式（*）
        toolbar: '#toolbar',                //工具按钮用哪个容器 //设置工具栏的Id或者class 
        striped: true,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,                   //是否显示分页（*）
        sidePagination: "server",			//分页方式：client客户端分页，server服务端分页（*）
        sortable: true,                     //是否启用排序
        sortOrder: "asc",                   //排序方式
        pageNumber: 1,                      //初始化加载第一页，默认第一页
        pageSize: 5,                       	//每页的记录行数（*）
        pageList: [5],       		//可供选择的每页的行数（*）
        search: false,                      //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
        strictSearch: true,
        minimumCountColumns: 2,             //最少允许的列数
        clickToSelect: true,                //是否启用点击选中行 //点击行即可选中单选/复选框 
        uniqueId: "guestbookId",               //每一行的唯一标识，一般为主键列
        detailView: false,                  //是否显示父子表
        showExport: true,
        exportDataType: "selected",        	//导出checkbox选中的行数
        paginationLoop: false,             	//是否无限循环
		paginationPreText: "上一页",
		paginationNextText: "下一页",
		paginationFirstText : "首页",
		paginationLastText : "尾页",
		locale: "zh-CN", //中文支持
		responseHandler: function(res) {
			return {
				"total": res.resp.total,//总页数
				"rows": res.resp.rows   //数据
			 }
		},
		queryParams : function(params) {
			return {
				"size" : params.limit,
				"page" : params.offset,
				"paramObj" : {
					"goodsTypeId" : 1,
					"personal" :personal
				}
			};
		},
		formatLoadingMessage: function() {
			return "请稍等，正在加载中...";
		},
		icons: {
			refresh: "glyphicon-repeat",
			toggle: "glyphicon-list-alt"
		},
		columns: [
		{
			field : 'number',
			title : '行号',
			align: 'center',
			valign: 'middle',
			formatter : function(value, row, index) {
				var pageSize=$('#myGuestBookTab_id').bootstrapTable('getOptions').pageSize;//通过表的#id 可以得到每页多少条
                var pageNumber=$('#myGuestBookTab_id').bootstrapTable('getOptions').pageNumber;//通过表的#id 可以得到当前第几页
                return Number(pageSize * (pageNumber - 1) + index + 1) ;//返回每条的序号： 每页条数 * （当前页 - 1 ）+ 序号
			}
		},{
			field: 'guestbookId',
			align: 'center',
			visible: false //不显示
		},{
			field: 'guestbookType',
			title: '留言分类',
			valign: 'middle',
			align: 'center',
			formatter: guestbookTypeContent 
		},{
			field: 'guestbookContent',
			title: '留言内容',
			valign: 'middle',
			align: 'center',
			cellStyle:{
				css:{
					"overflow": "hidden",
					"text-overflow": "ellipsis",
					"white-space": "nowrap"
				}
			}
		},{
			field: 'guestbookTime',
			title: '发布时间',
			valign: 'middle',
			align: 'center',
			formatter: dateFormat 
		},{
			title: '操作',
			align: 'center',
			formatter: method 
		}]
	});
}
// 自定义操作列
function dateFormat(value, row, index) {
	var guestbookTime = new Date(row.guestbookTime);
	var o = {
		"M": guestbookTime.getMonth() + 1, //月份 
		"d": guestbookTime.getDate(), //日 
		"H": guestbookTime.getHours(), //小时 
		"m": guestbookTime.getMinutes(), //分 
		"s": guestbookTime.getSeconds(), //秒 
	};
	return guestbookTime.getFullYear()+"-"+o.M+"-"+o.d+" "+o.H+":"+o.m+":"+o.s ;
}
// 自定义操作列
function guestbookTypeContent(value,row, index) {
	var guestbookType = "" ;
	switch(row.guestbookType) {
		case 1 : guestbookType = "咨询" ; break ;
		case 2 : guestbookType = "感谢" ; break ;
		case 3 : guestbookType = "投诉" ; break ;
		case 4 : guestbookType = "建议" ; break ;
		case 5 : guestbookType = "其他" ; break ;
	}
	return guestbookType ;
}
// 自定义操作列
function method(value, row, index) {
	var view = "<input type='button' id='view"+row["guestbookId"]+"' class='btn btn-primary viewGuestbook_class' onclick='viewGuestbook("+row['guestbookId']+")' value='查看'>" ;
	return view ;
}
/**
 * 填充用户信息
 */
function fillingUserInfo() {
	userInfo = userNameInitialization() ;
	// console.log(userInfo) ;
	$("#myInfoUserId_id").val(userInfo.id);
	$("#myInfoUserName_id").val(userInfo.userName) ;
	$("#myInfoName_id").val(userInfo.name) ;
	$("#myInfoEmail_id").val(userInfo.email) ;
	$("#myInfoPhoneNumber_id").val(userInfo.phoneNumber) ; 
}
/**
 * 发送验证码
 */
function sendCaptcha() {
	$.ajax({
		url : url+'/student/sendValidateCode',
		type : 'get',
		async : false,
		xhrFields: {
			withCredentials: true
		},
		success:function(result) {
			if(result.code == 10000) {
				toastr.success(result.message);
			}else {
				toastr.warning(result.message) ;
			}
		},
		error:function(result) {
			// console.log(result.message);//可以在控制台查看打印的data值
		}
	});
}
/**
 * 修改我的信息
 */
function saveMyInfo() {
	// saveFormValidator("#myInfoForm_id") ;
	var jsonData = formDataToJsonDate("#myInfoForm_id") ;
	var bootstrapValidator = $("#myInfoForm_id").data('bootstrapValidator');
	bootstrapValidator.validate();
	if(!bootstrapValidator.isValid()){
		return ;
	}
	$.ajax({
		url : url+'/student/updateUserInfo',
		type : 'POST',
		async : false,
		xhrFields: {
			withCredentials: true
		},
		data:JSON.stringify(jsonData),
		contentType:'application/json',
		success:function(result) {
			// console.log(result) ;
			if(result.code == 10000) {
				$('#myInfoDialog_id').modal('hide'); //关闭对话框
				toastr.success(result.message);
				return ;
			}
			if(result.code == 32000) {
				$('#myInfoDialog_id').modal('hide'); //关闭对话框
				toastr.warning(result.message) ;
				setTimeout(function(){
					toastr.warning(result.message);
					$('#loginDialog_id').modal({
					//--设置为static后可以防止不小心点击其他区域是弹出框消失
						backdrop: "static"	,
					});
				},300)  //表示 延迟0.3秒之后执行 function
				return ;
			}
			toastr.warning(result.message) ;
		},
		error:function(result) {
			// console.log(result.message);//可以在控制台查看打印的data值
		}
	});
}
/**
 * 修改密码
 */
function saveChangePassword() {
	// saveFormValidator("#changePasswordForm_id") ;
	var bootstrapValidator = $("#changePasswordForm_id").data('bootstrapValidator');
	bootstrapValidator.validate();
	if(!bootstrapValidator.isValid()){
		return ;
	}
	// var code = sendCaptcha() ;
	$.ajax({
		url : url+'/gm/updatePassword',
		type : 'POST',
		async : false,
		xhrFields: {
			withCredentials: true
		},
		data:$('#changePasswordForm_id').serialize(),//jq提供的获取form表单数据的快捷方式，通过form内标签的id属性
		success:function(result) {
			// console.log(result) ;
			if(result.code == 10000) {
				toastr.success(result.message);
				$('#changePasswordDialog_id').modal('hide'); //关闭对话框
				return ;
			}
			if(result.code == 32000) {
				toastr.warning(result.message) ;
				setTimeout(function(){
					$('#changePasswordDialog_id').modal('hide'); //关闭对话框
					toastr.warning(result.message);
					$('#loginDialog_id').modal({
					//--设置为static后可以防止不小心点击其他区域是弹出框消失
						backdrop: "static"	,
					});
				},300)  //表示 延迟0.3秒之后执行 function
				return ;
			}
			toastr.warning(result.message) ;
		},
		error:function(result) {
			// console.log(result.message);//可以在控制台查看打印的data值
		}
	});
}