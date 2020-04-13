var url = url ;
var personal = false ;
$(function() {
	/*toastr弹出框插件初始化*/
	toastrInitialization() ;
	//物品分类初始化
	typeInitialization() ;
	//加载留言
	guestbookLoad(personal);
	//加载新闻
	articleLoad();
	//加载失物招领
	shiwuLoad() ;
	//加载寻物启事
	xunwuLoad() ;
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
	//大图点击跳转
	$("#bigImages_id").click(function() {
		window.location.href = "../../html/user/userMain.html" ;
	});
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
	//点击发布留言
	clickOpenModal("#releaseGuestBook_id","#releaseGuestBookDialog_id") ;
	//监听留言输入框内容长度
	monitorTextLength() ;
	//点击发布留言模态框的发布
	$("#releaseGuestBookSubmit_id").click(function() {
		saveGuestBook() ;
	});
	//点击新闻更多
	$("#newsMore_id").click(function() {
		window.location.href = "../../html/user/userNews.html" ;
	});
	//点击认领/归还
	$("#propertySubmit_id").click(function() {
		dealProperty();
	});
});
function viewGoodsType(value) {
	// console.log(value) ;
	htmlUrl = "lostProperty.html?goodsTypeId="+value.goodsTypeId+"&goodsTypeName="+value.goodsTypeName;//此处拼接内容
	window.location.href = "../../html/user/"+htmlUrl;

}
function showType(data) {
	var str = "" ;
	$(data).each(function(indexP,valueP){
		// console.log(valueP) ;
		str = "<div class='typeInfoP_class'>"
			+"<h4>"+valueP.goodsTypeName+"</h4>" ;
		$(valueP.goodsTypes).each(function(index,value) {
			// console.log(value) ;
			str += "<span onclick='viewGoodsType("+JSON.stringify(value)+")' class='typeInfo_class'>&nbsp;"+value.goodsTypeName+"&nbsp;</span>" ;
		});
		str += "</div>"
		$(".typeDiv_class").append(str) ;
	});
}
function typeInitialization() {
	$.ajax({
		type:"get" ,
		url : url+'/getAllGoodsType',
		async:true,
		crossDomain:true, //设置跨域为true
		xhrFields: {
			 withCredentials: true //默认情况下，标准的跨域请求是不会发送cookie的
		},
		dataType:"json",
		contentType:'application/json',
		 success:function(data) {
			 // console.log(data.resp);
			if(data.code != 10000) {
				toastr.warning(data.message);
				return ;
			}
			showType(data.resp);
		}
	});
}
function dealPropertyConfirm(propertySubmit) {
	var msg = "确定要"+propertySubmit+"吗？";
	if (confirm(msg)==true){
		return true;
	}else{
		return false;
	}
}
/**
 * 处理我的归还/我的丢失
 */
function dealProperty() {
	var propertySubmit = $("#propertySubmit_id").text() ;
	var propertyId = $("#propertyId_id").val() ;
	if(dealPropertyConfirm(propertySubmit)) {
		$.ajax({
			type:"get" ,
			url : url+'/student/changeState?lostGoodsId='+propertyId+'&state='+"DEAL",
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
				shiwuLoad() ;
				xunwuLoad() ;
				// AjaxPaginator($("#pageLimit"),getLostType,personal,releaseTitle);
			}
		});
	}
}
function viewLostAndFound(value) {
	// console.log(value) ;
	$(".articleImageUrl_class").remove() ;
	var img = "<img class='articleImageUrl_class' src='"+url+"/getImg?imgPath="+value.goodsImageUrl+"' />" ;
	if(value.getLostType == 0) {
		$("#propertyAddTitle_id").text("拾取地点：");
		$("#propertyManTitle_id").text("拾取人：");
		$("#dioTitle_id").text("失物招领详细信息");
		$("#propertySubmit_id").text("认领");
	}else {
		$("#propertyAddTitle_id").text("丢失地点：");
		$("#propertyManTitle_id").text("丢失人：");
		$("#dioTitle_id").text("寻物启事详细信息");
		$("#propertySubmit_id").text("归还");
	}
	$(".imgDiv_class").append(img) ;
	$("#propertyId_id").val(value.lostGoodsId);
	$("#propertyName_id").val(value.releaseTitle);
	$("#propertyModule_id").val(value.goodsTypeId);
	$("#propertyDetail_id").val(value.releaseContent);
	$("#propertyMan_id").val(value.userName);
	$("#propertyAddDetail_id").val(value.detailedAddress);
	$("#propertyPhoneNumber_id").val(value.phoneNumber);
	$("#propertyInfoDialog_id").modal({
		backdrop: "static"
	});
}
function showXunwu(data) {
	$(".xunwuDetail").remove() ;
	$(".hh").remove() ;
	var str = "" ;
	var xunwu = "" ;
	if(data == null || data == "") {
		str = "暂时没有寻物信息" ;
		$(".xunwuqishi_class").append(str) ;
		return ;
	}
	$(data).each(function(index,value){
		if(index%2 != 0) {
			xunwu = "<div class='xunwu' style='background-color: #edfff3;'>" ;
		}else {
			xunwu = "<div class='xunwu'>" ;
		}
		// console.log(value) ;
		str = xunwu
			+ "<div class='xunwuDetail'>"
			+"<a class='gonggao_class'>"
			+"<span class='jiantou_class'>&nbsp;>&nbsp;</span>"
			+"<span class='xunwuContent_class' onclick='viewLostAndFound("+JSON.stringify(value)+")'>"+value.releaseContent+"</span>"
			+"</a></div></div>";
		$(".xunwuqishi_class").append(str) ;
		$(".xunwuqishi_class").append("<div class='hh'></div>"+"<div class='hh'></div>") ;
	});
}
/**
 * 页面初始化(获取失物招领/寻物启事内容)
 */
function xunwuLoad() {
	var paramObj = {
		"getLostType" : 1,
		"personal" :false,
		"state" : "PASS",
		"releaseTitle" : null
	}
	var news ;
	var totalPages;//总页数
	var pageSize = 13;//每页显示数量
	var currentPage = 0 //当前页
	   $.ajax({
		 url:url+'/getLostGoodsList',
		 data:JSON.stringify({size:pageSize,page:currentPage,paramObj:paramObj}),
		 dataType:"json",
		 contentType:'application/json',
		 type:"post",
		 crossDomain:true, //设置跨域为true
		 xhrFields: {
		      withCredentials: true //默认情况下，标准的跨域请求是不会发送cookie的
		 },
		 success:function(result) {
			// console.log("初始化："+result.resp.rows) ;
			if(result.code != 10000) {
				toastr.warning(result.message);
				return ;
			}
			// if(result.resp.rows.length == 0) {
			// 	// alert("暂时没有相关信息");
			// 	// window.location.href = "../../html/user/userMain.html" ;
			// 	return ;
			// }
			showXunwu(result.resp.rows) ;
		 }
	})    
}
function showShiwu(data) {
	// console.log(data == null || data == "") ;
	$(".shiwuDetail").remove() ;
	$(".hh").remove() ;
	var str = "" ;
	var shiwu = "" ;
	if(data == null || data == "") {
		str = "暂时没有失物信息" ;
		$(".shiwuzhaoling_class").append(str) ;
		return ;
	}
	$(data).each(function(index,value){
		if(index%2 != 0) {
			shiwu = "<div class='shiwu' style='background-color: #edfff3;'>" ;
		}else {
			shiwu = "<div class='shiwu'>" ;
		}
		// console.log(value) ;
		str = shiwu
			+ "<div class='shiwuDetail'>"
			+"<a class='gonggao_class'>"
			+"<span class='jiantou_class'>&nbsp;>&nbsp;</span>"
			+"<span class='shiwuContent_class' onclick='viewLostAndFound("+JSON.stringify(value)+")'>"+value.releaseContent+"</span>"
			+"</a></div></div>";
		$(".shiwuzhaoling_class").append(str) ;
		$("shiwuzhaoling_class").append("<div class='hh'></div>"+"<div class='hh'></div>") ;
	});
}
/**
 * 页面初始化(获取失物招领/寻物启事内容)
 */
function shiwuLoad() {
	var paramObj = {
		"getLostType" : 0,
		"personal" :false,
		"state" : "PASS",
		"releaseTitle" : null
	}
	var news ;
	var totalPages;//总页数
	var pageSize = 13;//每页显示数量
	var currentPage = 0 //当前页
	   $.ajax({
		 url:url+'/getLostGoodsList',
		 data:JSON.stringify({size:pageSize,page:currentPage,paramObj:paramObj}),
		 dataType:"json",
		 contentType:'application/json',
		 type:"post",
		 crossDomain:true, //设置跨域为true
		 xhrFields: {
		      withCredentials: true //默认情况下，标准的跨域请求是不会发送cookie的
		 },
		 success:function(result) {
			// console.log("初始化："+result.resp.rows) ;
			if(result.code != 10000) {
				toastr.warning(result.message);
				return ;
			}
			showShiwu(result.resp.rows) ;
		 }
	})    
}
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
			$("#releaseGuestBookDialog_id").modal('hide');//关闭后背景色消失
			guestbookLoad(personal);
			if(result.code == 10000) {
				toastr.success(result.message);
				return ;
			}else if(result.code == 32000){
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
function guestbookTimeFormat(row) {
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
function viewGuestbook(id) {
	$("#showGuestBookUserName_id").val(userName($("#userName_"+id).text()));
	$("#showGuestBookType_id").val($("#guestbookType_"+id).text()) ;
	$("#showGuestBookContent_id").text($("#guestbookContent_"+id).text()) ;
	$("#showGuestBookTime_id").val($("#guestbookTime_"+id).text());
	$("#showGuestBookDialog_id").modal({
		backdrop: "static"
	});
}
/**
 * 展示留言
 * @param {Object} result 数据
 */
function showGuestbook(result) {
	// console.log(result) ;
	$(".guestbookDetail").remove() ;
	$(".hh").remove() ;
	var str = "" ;
	if(result == null || result == "") {
		str = "暂时没有留言信息" ;
		$(".guestBookList_class").append(str) ;
		return ;
	}
	var guestbook = "<div class='guestbook'>" ;
	$(result).each(function(index,value){
		if(value.userName=='admin'){
			value.userName = '管理员';
		}
		str = guestbook
			+ "<div class='guestbookDetail'>"
			+"<a class='gonggao_class'>"
			+"<span class='jiantou_class'>&nbsp;>&nbsp;</span>"
			+"<span class='guestbookContent_class' id='guestbookContent_"+value.guestbookId+"' onclick='viewGuestbook("+value.guestbookId+")'>"+value.guestbookContent+"</span>"
			+"<span class='hidden_class' id='guestbookType_"+value.guestbookId+"'>"+guestbookTypeContent(value)+"</span>"
			+"<span class='hidden_class' id='guestbookTime_"+value.guestbookId+"' >"+guestbookTimeFormat(value)+"</span>"
			+"<span class='hidden_class' id='userName_"+value.guestbookId+"' >"+value.userName+"</span>"
			+"</a></div></div>";
		$(".guestBookList_class").append(str) ;
		$(".guestBookList_class").append("<div class='hh'></div>"+"<div class='hh'></div>") ;
	});
}
/**
 * 页面初始化(获取留言内容)
 * @param {Object} obj			分页标签id
 * @param {Object} guestbookType
 */
function guestbookLoad(personal) {
	var paramObj = {
		"guestbookType" : null,
		"personal":personal
	}
	var news ;
	var totalPages;//总页数
	var pageSize = 5;//每页显示数量
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
			// if(result.resp.rows.length == 0) {
			// 	// alert("暂时没有相关留言，留下你的想法吧！");
			// 	// window.location.href = "../../html/user/guestBook.html" ;
			// 	return ;
			// }
			showGuestbook(result.resp.rows) ;
		 }
	})    
}
/**
 * 时间格式化
 * @param {Object} createTime	时间
 */
function dateFormat(value) {
	var createTime = new Date(value.createTime);
	var o = {
		"M": createTime.getMonth() + 1, //月份 
		"d": createTime.getDate(), //日 
		"H": createTime.getHours(), //小时 
		"m": createTime.getMinutes(), //分 
		"s": createTime.getSeconds(), //秒 
	};
	return createTime.getFullYear()+"-"+o.M+"-"+o.d+" "+o.H+":"+o.m+":"+o.s ;
}
function articleSrc(articleSrc) {
	if(articleSrc == "admin") {
		return "商丘一高中失物招领网站" ;
	}else {
		return articleSrc ;
	}
}
function viewArticle(id) {
	$(".articleImageUrl_class").remove() ;
	var img = "<img class='articleImageUrl_class' src='"+url+"/getImg?imgPath="+$("#articleImageUrl_"+id).text()+"' />" ;
	$("#articleTitle_id").text($("#articleTitle_"+id).text());
	$("#createTime_id").text($("#createTime_"+id).text()) ;
	$("#articleSrc_id").text("新闻来源："+articleSrc($("#articleSrc_"+id).text())) ;
	$("#categoryType_id").text($("#categoryType_"+id).text()) ;
	$(".img_class").append(img) ;
	$("#articleContent_id").text($("#articleContent_"+id).text());
	$("#showNewsDialog_id").modal({
		backdrop: "static"
	});
}
/**
 * 展示新闻
 * @param {Object} result 数据
 */
function showArticle(result) {
	// console.log(result) ;
	$(".articleDetail").remove() ;
	$(".hh").remove() ;
	var str = "" ;
	var article = "" ;
	if(result == null || result == "") {
		str = "暂时没有新闻信息" ;
		$(".articleList_class").append(str) ;
		return ;
	}
	$(result).each(function(index,value){
		str = article
			+ "<div class='articleDetail'>"
			+"<a class='gonggao_class'>"
			+"<span class='jiantou_class'>&nbsp;>&nbsp;</span>"
			+"<span id='articleTitle_"+value.articleId+"' onclick='viewArticle("+value.articleId+")' class='articleTitle_class'>"+value.articleTitle+"</span>"
			+"<span id='categoryType_"+value.articleId+"' class='hidden_class'>"+value.categoryType+"</span>"
			+"<span id='articleSrc_"+value.articleId+"' class='hidden_class'>"+value.articleSrc+"</span>"
			+"<span id='articleImageUrl_"+value.articleId+"' class='hidden_class'>"+value.articleImageUrl+"</span>"
			+"<span id='createTime_"+value.articleId+"' class='hidden_class'>"+dateFormat(value)+"</span>"
			+"<span id='createUserId_"+value.articleId+"' class='hidden_class'>"+value.createUserId+"</span>"
			+"<span id='articleContent_"+value.articleId+"' class='hidden_class'>"+value.articleContent+"</span>"
			+"</a></div></div>";
		$(".articleList_class").append(str) ;
		$(".articleList_class").append("<div class='hh'></div>"+"<div class='hh'></div>") ;
	});
}
/**
 * 页面初始化(获取新闻内容)
 */
function articleLoad() {
	var paramObj = {
		"categoryType" : null,
		"articleTitle" : null
	}
	var news ;
	var totalPages;//总页数
	var pageSize = 5;//每页显示数量
	var currentPage = 0 //当前页
	   $.ajax({
		 url:url+'/getArticleList',
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
			if(result.resp.rows.length == 0) {
				// alert("暂时没有相关留言，留下你的想法吧！");
				// window.location.href = "../../html/user/guestBook.html" ;
				return ;
			}
			showArticle(result.resp.rows) ;
		 }
	})    
}