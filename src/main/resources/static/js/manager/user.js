var url = url;
$(function() {
	//先销毁表格
	$('#sysUserTab_id').bootstrapTable('destroy');
	/*表格初始化*/
	tabelInitialization() ;
	/**
	 * 	表单验证初始化
	 */
	formValidator();
	//登录表单验证初始化
	loginFormValidator();
	//登录模态框隐藏
	loginDialogHidden();
	//点击登录
	clickOpenModal("#login_id","#loginDialog_id");
	//点击登录模态框的保存
	$("#loginSubmit_id").click(function() {
		userLogin();
	});
	/*toastr弹出框插件初始化*/
	toastrInitialization() ;
	/**
	 * 	点击addSysUserBut_id(发布留言)时，显示addSysUserDialog_id Dialog
	 */
	$("#addSysUserBut_id").click(function() {
		$("#dialogLabel_id").text("发布留言");
		$('#addSysUserDialog_id').modal({
			backdrop: "static" //--设置为static后可以防止不小心点击其他区域是弹出框消失
		});
	});

	/*
	函数作用：点击addmoduleNameSubmit_id(保存)调用saveSysUser添加类别信息
	参数说明：无
	*/
	$("#addSysUserSubmit_id").click(function(){
 		/*表单验证*/
		var bootstrapValidator = $("#addSysUserForm_id").data('bootstrapValidator');
		bootstrapValidator.validate();
		if(!bootstrapValidator.isValid()){
			return ;
		}
		var form = document.querySelector("#addSysUserForm_id") ;
		let data = new FormData(form);
		//data.append("sysUserContent",$('#sysUserContent_id').val());
		
		var formData = {};
		data.forEach((value, key) => formData[key] = value );
		$.ajax({
			type:"post",
			url:url+'/student/saveSysUser',
			async:false,
			processData:false,
			crossDomain:true, //设置跨域为true
			xhrFields: {
			     withCredentials: true //默认情况下，标准的跨域请求是不会发送cookie的
			},
			data:JSON.stringify(formData),
			dataType:'json',
			contentType:'application/json',
			success:function(result) {
				if(result.code == 10000) {
					$('#addSysUserDialog_id').modal('hide'); //关闭对话框
					$('#sysUserTab_id').bootstrapTable('refresh');
					toastr.success(result.message);
					return ;
				}
				if(result.code == 32000) {
					toastr.warning(result.message) ;
					setTimeout(function() {
						$("#loginDialog_id").modal({
							backdrop: "static" 
						});
					},300);
					return ;
				}
					toastr.warning(result.message) ;
			},
			error:function(result) {
				// toastr.error(result.message);
			}
		});
	});
	// 销毁对话框内容
	$('#addSysUserDialog_id').on('hidden.bs.modal', function() {
	    $('#addSysUserForm_id').data('bootstrapValidator', null);
		$("#sysUserId_id").val("") ;
		$("#sysUserContent_id").val("");
		$("#addSysUserType_id").selectpicker('val','');
		formValidator();
	});
	/**
	 * 点击moduleNameSeaBut_id更新表格搜索条件
	 */
	$('#sysUserSeaBut_id').click(function(){
		$('#sysUserTab_id').bootstrapTable('selectPage', 1);
	}) ;
	/**
	 * 点击moduleNameSeaDel_id(重置)按钮，清空查询条件
	 */
	$('#sysUserSeaDel_id').click(function(){
		$('#userNameSea_id').val("");
		$('#sysUserTab_id').bootstrapTable('selectPage', 1);
	}) ;
});
/**
 * 	表格初始化
 * @param url 初始化请求接口
 */
function tabelInitialization() {
	$('#sysUserTab_id').bootstrapTable({
		url: url+'/admin/getSysUserList',
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
        pageList: [5, 10, 15],       		//可供选择的每页的行数（*）
        search: false,                      //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
        strictSearch: true,
        minimumCountColumns: 2,             //最少允许的列数
        clickToSelect: true,                //是否启用点击选中行 //点击行即可选中单选/复选框 
        uniqueId: "sysUserId",            //每一行的唯一标识，一般为主键列
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
			if(res.code==10000){
				return {
					"total": res.resp.total,//总页数
					"rows": res.resp.rows   //数据
				}
			}else{
				$('#loginDialog_id').modal({
					backdrop: "static" //--设置为static后可以防止不小心点击其他区域是弹出框消失
				});
			}
		},
		queryParams : function(params) {
			return {
				"size" : params.limit,
				"page" : params.offset,
				"paramObj" : {
					"userName" :	$('#userNameSea_id').val() 
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
			formatter : function(value, row, index) {
				var pageSize=$('#sysUserTab_id').bootstrapTable('getOptions').pageSize;//通过表的#id 可以得到每页多少条
                var pageNumber=$('#sysUserTab_id').bootstrapTable('getOptions').pageNumber;//通过表的#id 可以得到当前第几页
                return Number(pageSize * (pageNumber - 1) + index + 1) ;//返回每条的序号： 每页条数 * （当前页 - 1 ）+ 序号
			},
			width:60,
		},
		{
			field: 'id',
			align: 'center',
			valign: 'middle',
			visible: false //不显示
		},{
			field: 'enabled',
			align: 'center',
			valign: 'middle',
			visible: false //不显示
		},{
			field: 'userName',
			title: '用户名',
			align: 'center',
			valign: 'middle',
		},{
			field: 'email',
			title: '邮箱',
			align: 'center',
			valign: 'middle',
			width:150,
		},{
			field: 'lastLoginTime',
			title: '上次登录时间',
			align: 'center',
			valign: 'middle',
			width:150,
			formatter:dateFormat
		},{
			field: 'phoneNumber',
			title: '手机号',
			align: 'center',
			valign: 'middle'
		},{
			field: 'loginIp',
			title: '上次登录ip',
			align: 'center',
			valign: 'middle'
		},{
			title: '用户状态',
			align: 'center',
			valign: 'middle',
			width:100,
			formatter: stateFormat //自定义操作方法
		},{
			title: '操作',
			align: 'center',
			valign: 'middle',
			width:100,
			formatter: method //自定义操作方法
		}]
	});
}

// 自定义操作列
function stateFormat(value, row, index){
	return row["enabled"]?"启用":"禁用";
}
function method(value, row, index) {
	var edit = "<input type='button' id='edit"+row["id"]+"' class='btn btn-primary editSysUser_class' onclick='editSysUser("+row['id']+","+row['enabled']+")' value='禁用/启用'>" ;
	//var remove = "<input type='button' id='remove"+row["sysUserId"]+"' class='btn btn-primary removeSysUser_class' onclick='removeSysUser("+row['sysUserId']+")' value='删除'>" ;
	return edit ;
}
function dateFormat(value, row, index) {
	if(row.lastLoginTime==null){
		return null;
	}
	var createTime = new Date(row.lastLoginTime);
	var o = {
		"M": createTime.getMonth() + 1, //月份 
		"d": createTime.getDate(), //日 
		"H": createTime.getHours(), //小时 
		"m": createTime.getMinutes(), //分 
		"s": createTime.getSeconds(), //秒 
	};
	return createTime.getFullYear()+"-"+o.M+"-"+o.d+" "+o.H+":"+o.m+":"+o.s ;
}
function removeConfirm() {
	var msg = "确定要删除吗？";
	if (confirm(msg)==true){
		return true;
	}else{
		return false;
	}
}
function removeSysUser(id) {
	if(removeConfirm()) {
		$.ajax({
			type: "get",
			url: url+'/admin/deleteSysUser',
			async: true,
			data: {
				"sysUserId": id
			},
			crossDomain:true, //设置跨域为true
			xhrFields: {
			     withCredentials: true //默认情况下，标准的跨域请求是不会发送cookie的
			},
			success: function(result) {
				if(result.code == 10000) {
					toastr.success("删除成功！") ;
					$("#sysUserTab_id").bootstrapTable('refresh'); //刷新，但页码依然为当前的页码，比如page=5依然为5 
					return ;
				}
				if(result.code == 32000) {
					toastr.warning(result.message) ;
					setTimeout(function() {
						$("#loginDialog_id").modal({
							backdrop: "static" 
						});
					},300);
					return ;
				}
				toastr.success(result.message) ;
				$("#sysUserTab_id").bootstrapTable('refresh'); //刷新，但页码依然为当前的页码，比如page=5依然为5 
			},
			error: function(result) {
				// toastr.error(data.info) ;
			}
		});
	}
}
function changeImg(id) {
	var id = $("#editSysUserId_id").val() ;
	$("#newImg_class").attr("style","display:inline;");
	$("#oldImg_div").attr("style","display:none;");
}
function editSysUser(id,enable) {
	$.ajax({
			type:"post",
			url:url+'/student/updateUserInfo',
			async:false,
			processData:false,
			crossDomain:true, //设置跨域为true
			xhrFields: {
			     withCredentials: true //默认情况下，标准的跨域请求是不会发送cookie的
			},
			data:'{"id":'+id+',"enabled":'+!enable+'}',
			dataType:'json',
			contentType:'application/json',
			success:function(result) {
				if(result.code == 10000) {
					$('#sysUserTab_id').bootstrapTable('refresh');
					toastr.success(result.message);
					return ;
				}
				if(result.code == 32000) {
					toastr.warning(result.message) ;
					setTimeout(function() {
						$("#loginDialog_id").modal({
							backdrop: "static" 
						});
					},300);
					return ;
				}
					toastr.warning(result.message) ;
			},
			error:function(result) {
				// toastr.error(result.message);
			}
		});
}
//form验证规则
function formValidator(){
	/*初始化表单验证插件*/
    $('#addSysUserForm_id').bootstrapValidator({
    	message: 'This value is not valid',
    	//提供输入验证图标提示
    	feedbackIcons: {
    		valid: 'glyphicon glyphicon-ok',
    		invalid: 'glyphicon glyphicon-remove',
    		validating: 'glyphicon glyphicon-refresh'
    	},
    	fields: {
    		sysUserContent: {
    			message: '留言内容验证失败',
                validators: {
                    notEmpty: {
                        message: '留言内容不能为空'
                    },
					stringLength: {
                         min: 1,
                         max: 30,
                         message: '用户名长度必须在1到30之间'
                    },
                }
            },
    		sysUserType: {
    			message: '留言类型验证失败',
                validators: {
                    notEmpty: {
                        message: '留言类型不能为空'
                    },
                }
            }
        }
    });
}

/**
 * 	toastr插件初始化
 */
function toastrInitialization() {
	/*将这个属性值设置为不同的值就能让提示信息显示在不同的位置，
	如toast-bottom-right表示下右、toast-bottom-center表示下中、
	toast-top-center表示上中等，toast-top-full-width表示顶端中间(宽度铺满)
	*/
	 toastr.options = {
        closeButton: false,		//是否显示关闭按钮
        debug: false,			//是否使用debug模式
        progressBar: false,
        positionClass: "toast-top-right",	//弹出窗的位置
        onclick: null,
        showDuration: "300",	//显示的动画时间
        hideDuration: "1000",	//消失的动画时间
        timeOut: "1000",		//展现时间
        extendedTimeOut: "1000",	//加长展示时间
        showEasing: "swing",		//显示时的动画缓冲方式
        hideEasing: "linear",		//消失时的动画缓冲方式
        showMethod: "fadeIn",		//显示时的动画方式
        hideMethod: "fadeOut"		//消失时的动画方式
    };
}
