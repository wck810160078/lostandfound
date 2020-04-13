var url = url ;
var personal = false ;
$(function() {
	/*toastr弹出框插件初始化*/
	toastrInitialization() ;
	//页面留言初始化
	AjaxPaginator($("#pageLimit"),"",personal);
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
	//发布留言表单验证初始化
	releaseGuestBookFormValidator();
	//发布留言模态框隐藏
	releaseGuestBookDialogHidden();
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
	//点击发布留言
	clickOpenModal("#releaseGuestBook_id","#releaseGuestBookDialog_id") ;
	//监听留言输入框内容长度
	monitorTextLength() ;
	//点击发布留言模态框的发布
	$("#releaseGuestBookSubmit_id").click(function() {
		saveGuestBook() ;
	});
	//点击退出登录
	$("#logOut_id").click(function() {
		logOut();
	});
	//点击全部，查看全部留言
	$("#guestbook_all").click(function() {
		AjaxPaginator($("#pageLimit"),"",personal);
	});
	//点击咨询，查看咨询相关留言
	$("#guestbook_1").click(function() {
		AjaxPaginator($("#pageLimit"),"1",personal);
	});
	//点击感谢，查看感谢相关留言
	$("#guestbook_2").click(function() {
		AjaxPaginator($("#pageLimit"),"2",personal);
	});
	//点击投诉，查看投诉相关留言
	$("#guestbook_3").click(function() {
		AjaxPaginator($("#pageLimit"),"3",personal);
	});
	//点击建议，查看建议相关留言
	$("#guestbook_4").click(function() {
		AjaxPaginator($("#pageLimit"),"4",personal);
	});
	//点击其他，查看其他相关留言
	$("#guestbook_5").click(function() {
		AjaxPaginator($("#pageLimit"),"5",personal);
	});
});
/**
 * 监听留言内容输入框长度
 */
function monitorTextLength() {
	$('#releaseGuestBookContent_id').keyup(function() {
	var len=this.value.length
		$('#text-count2').text(len);
	});
}
/**
 * 保存留言
 */
function saveGuestBook() {
	/*表单验证*/
	var bootstrapValidator = $("#releaseGuestBookForm_id").data('bootstrapValidator');
	bootstrapValidator.validate();
	if(!bootstrapValidator.isValid()){
		return ;
	}
	var jsonData = formDataToJsonDate("#releaseGuestBookForm_id") ;
	$.ajax({
		url : url+'/student/saveGuestbook',
		type : 'POST',
		async : false,
		processData:false,
		crossDomain:true, //设置跨域为true
		xhrFields: {
		     withCredentials: true //默认情况下，标准的跨域请求是不会发送cookie的
		},
		data:JSON.stringify(jsonData),
		contentType:'application/json',
		dataType:'json',
		success:function(result) {
			AjaxPaginator($("#pageLimit"),"",personal);
			if(result.code == 10000) {
				$("#releaseGuestBookDialog_id").modal('hide');//关闭后背景色消失
				toastr.success(result.message);
				return ;
			}else if(result.code == 32000){
				$("#releaseGuestBookDialog_id").modal('hide');//关闭后背景色消失
				toastr.warning(result.message);
				$('#loginDialog_id').modal({
				//--设置为static后可以防止不小心点击其他区域是弹出框消失
					backdrop: "static"	,
				});
				return ;
			}
			toastr.warning(result.message);
		},
		error:function(result) {
		}
	});
}
function guestbookTypeContent(row) {
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
function dateFormat(row) {
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
function userName(userName) {
	if(userName == "admin") {
		return "管理员" ;
	}else {
		return userName ;
	}
}
function viewGuestbook(value) {
	$("#showGuestBookUserName_id").val(value.userName);
	$("#showGuestBookType_id").val(guestbookTypeContent(value)) ;
	$("#showGuestBookContent_id").text(value.guestbookContent) ;
	$("#showGuestBookTime_id").val(dateFormat(value));
	$("#showGuestBookDialog_id").modal({
		backdrop: "static"
	});
}
function showGuestbook(result) {
	// console.log(result) ;
	$(".guestbookDetail").remove() ;
	$(".hh").remove() ;
	var str = "" ;
	var guestbook = "" ;
	$(".meiyou").remove() ;
	if(result == null || result == "") {
		str = "<h1 class='meiyou'>暂时没有相关留言，留下你的想法吧！</h1>" ;
		$(".guestBookList_class").append(str) ;
		return ;
	}
	$(result).each(function(index,value){
		if(value.userName=='admin'){
			value.userName = '管理员';
		}
		// console.log(value) ;
		if(index%2 != 0) {
			guestbook = "<div class='guestbook' style='background-color: #edfff3;'>" ;
		}else {
			guestbook = "<div class='guestbook'>" ;
		}
		str = guestbook
			+ "<div class='guestbookDetail'>"
			+"<a class='gonggao_class'>"
			+"<span class='jiantou_class'>&nbsp;>&nbsp;</span>"
			+"<span class='guestbookContent_class' id='guestbookContent_"+value.guestbookId+"' onclick='viewGuestbook("+JSON.stringify(value)+")'>"+value.guestbookContent+"</span>"
			+"</a></div></div>";
		$(".guestBookList_class").append(str) ;
		$(".guestBookList_class").append("<div class='hh'></div>"+"<div class='hh'></div>") ;
	});
}
/**
 * 页面初始化(获取留言内容)
 * @param {Object} obj				分页id
 * @param {Object} guestbookType	留言类别
 * @param {Object} personal			是否查询自己的留言
 */
function AjaxPaginator(obj,guestbookType,personal) {
	if(guestbookType == "") {
		guestbookType = null ;
	}
	var paramObj = {
		"guestbookType" : guestbookType,
		"personal" :personal
	}
	// console.log(paramObj) ;
	var news ;
	var totalPages;//总页数
	var pageSize = 6;//每页显示数量
	var currentPage = 0 //当前页
	   $.ajax({
		 url:url+'/getGuestbookList',
		 data:JSON.stringify({size:pageSize,page:currentPage,paramObj:paramObj}),
		 dataType:"json",
		 contentType:'application/json',
		 type:"post",
		 crossDomain:true, //设置跨域为true
		 xhrFields: {
		      withCredentials: true //默认情况下，标准的跨域请求是不会发送cookie的
		 },
		 success:function(result) {
			// console.log("初始化："+result.resp.total) ;
			if(result.code != 10000) {
				toastr.warning(result.message);
				return ;
			}
			showGuestbook(result.resp.rows) ;
			// 获得数据
			news = result.resp;
			//设置显示的页数
			totalPages = Math.ceil(news.total/news.size);
			// console.log("总页数："+totalPages) ;
			var options = {
					currentPage:1,//当前的请求页面。
					totalPages:totalPages,//一共多少页。
					size:"normal",//应该是页眉的大小。
					bootstrapMajorVersion: 3,//bootstrap的版本要求。
					alignment:"right",
					// numberOfPages:numberOfPages,//显示多少页数
					itemTexts: function (type, page, current) {//如下的代码是将页眉显示的中文显示我们自定义的中文。
						switch (type) {
						case "first": return "首页";
						case "prev": return "上一页";
						case "next": return "下一页";
						case "last": return "尾页";
						case "page": return page;
						}
					},
					//点击页码时ajax请求数据    
					onPageClicked: function(event,originalEvent,type,page){
						page = (page - 1)*pageSize ;
						 $.ajax({
							 url:url+'/getGuestbookList',
							 data:JSON.stringify({size:pageSize,page:page,paramObj:paramObj}),
							 dataType:"json",
							 contentType:'application/json',
							 type:"post",
							 success:function(result) {
								if(result.code == 10000) {
									showGuestbook(result.resp.rows) ;
								}else {
									toastr.warning(result.message);
								}
								 
							 }     
						 })
					},
					onPageChanged:function(event,oldPage,newPage) {
						
					}
			   }
				  //初始化分页插件
				  obj.bootstrapPaginator(options);
		 }
	})    
}