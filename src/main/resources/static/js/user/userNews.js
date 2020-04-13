var url = url ;
$(function() {
	/*toastr弹出框插件初始化*/
	toastrInitialization() ;
	//页面新闻初始化
	AjaxPaginator($("#pageLimit"),"");
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
	//点击全部，查看全部留言
	$("#categoryType_all").click(function() {
		AjaxPaginator($("#pageLimit"),"");
	});
	//点击社会资讯，查看社会资讯相关新闻
	$("#categoryType_xw").click(function() {
		AjaxPaginator($("#pageLimit"),"社会资讯");
	});
	//点击失物招领，查看失物招领相关新闻
	$("#categoryType_sw").click(function() {
		AjaxPaginator($("#pageLimit"),"失物招领");
	});
});
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
function viewArticle(value) {
	$(".articleContentDe_class").remove() ;
	$(".articleImageUrl_class").remove() ;
	var articleContent = "<div class='articleContentDe_class'>"
						+ value.articleContent
						+"</div>" ;
	if(value.articleImageUrl!=null&&value.articleImageUrl!=""){
		var img = "<img class='articleImageUrl_class' src='"+url+"/getImg?imgPath="+value.articleImageUrl+"' />" ;
		$(".img_class").append(img) ;
	}
	$("#articleTitle_id").text(value.articleTitle);
	$("#createTime_id").text("发布时间："+dateFormat(value)) ;
	$("#articleSrc_id").text("新闻来源："+articleSrc(value.articleSrc)) ;
	$("#categoryType_id").text(value.categoryType) ;
	$("#articleContent_id").append(articleContent);
	$("#showNewsDialog_id").modal({
		backdrop: "static"
	});
}
/**
 * 展示新闻内容
 * @param {Object} result	数据
 */
function showArticle(result) {
	// console.log(result) ;
	$(".articleDetail").remove() ;
	$(".meiyou").remove() ;
	$(".hh").remove() ;
	var str = "" ;
	var article = "" ;
	if(result == null || result == "") {
		str = "<h1 class='meiyou'>暂时没有相关新闻，可以留言建议管理员添加！</h1>" ;
		$(".newsList_class").append(str) ;
		return ;
	}
	$(result).each(function(index,value){
		if(index%2 != 0) {
			article = "<div class='article' style='background-color: #edfff3;'>" ;
		}else {
			article = "<div class='article'>" ;
		}
		str = article
			+ "<div class='articleDetail'>"
			+"<a class='gonggao_class'>"
			+"<span class='jiantou_class'>&nbsp;>&nbsp;</span>"
			+"<span id='articleTitle_"+value.articleId+"' onclick='viewArticle("+JSON.stringify(value)+")' class='articleTitle_class'>"+value.articleTitle+"</span>"
			+"</a></div></div>";
		$(".newsList_class").append(str) ;
		$(".newsList_class").append("<div class='hh'></div>"+"<div class='hh'></div>") ;
	});
}
/**
 * 新闻初始化
 * @param {Object} obj				分页id
 * @param {Object} categoryType		新闻类别
 */
function AjaxPaginator(obj,categoryType) {
	if(categoryType == "") {
		categoryType = null ;
	}
	var paramObj = {
		"categoryType" : categoryType,
		"articleTitle" : null
	}
	// console.log(paramObj) ;
	var news ;
	var totalPages;//总页数
	var pageSize = 6;//每页显示数量
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
			// if(result.resp.rows.length == 0) {
			// 	alert("暂时没有相关新闻，可以留言建议管理员添加！");
			// 	window.location.href = "../../html/user/userNews.html" ;
			// 	return ;
			// }
			showArticle(result.resp.rows) ;
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
							 url:url+'/getArticleList',
							 data:JSON.stringify({size:pageSize,page:page,paramObj:paramObj}),
							 dataType:"json",
							 contentType:'application/json',
							 type:"post",
							 success:function(result) {
								if(result.code == 10000) {
									showArticle(result.resp.rows) ;
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