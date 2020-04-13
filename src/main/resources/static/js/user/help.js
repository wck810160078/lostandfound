var url = url ;
$(function() {
	/*toastr弹出框插件初始化*/
	toastrInitialization() ;
	//验证是否已有用户登录
	userNameInitialization() ;
	//友情链接
	youqinglianjie();
	// 注册表单验证初始化
	registerFormValidator();
	//注册模态框隐藏
	registerDialogHidden();
	//登录表单验证初始化
	loginFormValidator();
	//登录模态框隐藏
	loginDialogHidden();
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
	//点击退出登录
	$("#logOut_id").click(function() {
		logOut();
	});
});