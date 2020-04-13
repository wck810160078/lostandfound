var url = url;
$(function() {
	/*toastr弹出框插件初始化*/
	toastrInitialization() ;
	//登录表单验证初始化
	loginFormValidator();
	//登录模态框隐藏
	loginDialogHidden();
	//点击登录
	clickOpenModal("#login_id","#loginDialog_id");
	// 修改密码表单验证
	changePwFormValidator();
	userNameInitialization();
	changePwDialogHidden() ;
	/**
	 * 	点击ManagerInfo(个人信息)时，显示ManagerInfoDialog_id Dialog
	 */
	$("#ManagerInfo").click(function() {
		$('#ManagerInfoDialog_id').modal({
			backdrop: "static" //--设置为static后可以防止不小心点击其他区域是弹出框消失
		});
	});
	/**
	 * 	点击changePw(修改密码)时，显示changePwDialog_id Dialog
	 */
	$("#changePw").click(function() {
		$('#changePwDialog_id').modal({
			backdrop: "static" //--设置为static后可以防止不小心点击其他区域是弹出框消失
		});
	});
	//点击登录模态框的保存
	$("#loginSubmit_id").click(function() {
		userLogin();
	});
	// 修改密码
	$("#changePasswordSubmit_id").click(function() {
		changePassword();
	});
	// 退出登录
	$("#logout_id").click(function() {
		logOut() ;
	});
});
function accountInitialization() {
	$.ajax({
		url : url+'/getUser',
		type : 'get',
		async : false,
		xhrFields: {
			withCredentials: true
		},
		success:function(result) {
			// console.log(result) ;
			if(result.code == 10000) {
				if(result.resp == null || result.resp == "") {
					$("#changePw").attr("style","display:none;");
					$("#logOut_id").attr("style","display:none;");
					$("#login_id").attr("style","display:inline;");
				}else {
					$("#changePw").attr("style","display:inline;");
					$("#logOut_id").attr("style","display:inline;");
					$("#login_id").attr("style","display:none;");
				}
			}
			// toastr.warning(result.message) ;
		},
		error:function(result) {
		}
	});
}
function logOut() {
	$.ajax({
		url : url+'/logout',
		type : 'POST',
		async : false,
		xhrFields: {
			withCredentials: true
		},
		// data:$('#changePwForm_id').serialize(),//jq提供的获取form表单数据的快捷方式，通过form内标签的id属性
		success:function(result) {
			// console.log(result) ;
			window.parent.location.href = "../../html/user/userMain.html" ;
			return ;
		},
		error:function(result) {
			// console.log(result.message);//可以在控制台查看打印的data值
		}
	});
}
function changePassword() {
	/*表单验证*/
	var bootstrapValidator = $("#changePwForm_id").data('bootstrapValidator');
	bootstrapValidator.validate();
	if(!bootstrapValidator.isValid()){
		return ;
	}
	$.ajax({
		url : url+'/admin/updatePassword',
		type : 'POST',
		async : false,
		xhrFields: {
			withCredentials: true
		},
		data:$('#changePwForm_id').serialize(),//jq提供的获取form表单数据的快捷方式，通过form内标签的id属性
		success:function(result) {
			// console.log(result) ;
			if(result.code == 10000) {
				$('#changePwDialog_id').modal('hide'); //关闭对话框
				toastr.success(result.message);
				return ;
			}
			if(result.code == 32000) {
				toastr.warning(result.message) ;
				window.parent.location.href = "../../html/user/userMain.html" ;
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
 * 修改密码Modal验证销毁重构
 */
function changePwDialogHidden() {
	$('#changePwDialog_id').on('hidden.bs.modal', function() {
		$("#changePwForm_id").data('bootstrapValidator').destroy();
		$('#changePwForm_id').data('bootstrapValidator', null);
		$('#changePwForm_id')[0].reset();
		changePwFormValidator();
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
        timeOut: "1500",		//展现时间
        extendedTimeOut: "1000",	//加长展示时间
        showEasing: "swing",		//显示时的动画缓冲方式
        hideEasing: "linear",		//消失时的动画缓冲方式
        showMethod: "fadeIn",		//显示时的动画方式
        hideMethod: "fadeOut"		//消失时的动画方式
    };
}
//form验证规则
function changePwFormValidator(){
	/*初始化表单验证插件*/
    $("#changePwForm_id").bootstrapValidator({
    	message: 'This value is not valid',
    	//提供输入验证图标提示
    	feedbackIcons: {
    		valid: 'glyphicon glyphicon-ok',
    		invalid: 'glyphicon glyphicon-remove',
    		validating: 'glyphicon glyphicon-refresh'
    	},
    	fields: {
			oldPassword: {
				message: '旧密码验证失败',
			    validators: {
			        notEmpty: {
			            message: '旧密码不能为空'
			        },
					stringLength: {
					     min: 3,
					     max: 12,
					     message: '密码长度必须在3到12之间'
					},
			    }
			},
			passw: {
				message: '新密码验证失败',
			    validators: {
			        notEmpty: {
			            message: '新密码不能为空'
			        },
					stringLength: {
					     min: 3,
					     max: 12,
					     message: '密码长度必须在3到12之间'
					},
					identical: {
						field: 'newPassword',
						message: '两次输入的密码不一致'
					}
			    }
			},
			newPassword: {
				message: '确认密码验证失败',
			    validators: {
			        notEmpty: {
			            message: '确认密码不能为空'
			        },
					stringLength: {
					     min: 3,
					     max: 12,
					     message: '密码长度必须在3到12之间'
					},
					identical: {
						field: 'passw',
						message: '两次输入的密码不一致'
					}
			    }
			},
        }
    });
}