var url = url ;
var personal = false ;
var releaseTitle = "" ;
var getLostType = "" ;
var goodsTypeId = "" ;
$(function() {
	$("#goodsTypeSel_id").text("全部");
	goodsTypeId = $.query.get("goodsTypeId");
	goodsTypeName = $.query.get("goodsTypeName");
	if(goodsTypeName != "" && goodsTypeName != null) {
		$("#goodsTypeSel_id").text(goodsTypeName);
	}
	// alert(releaseTitle) ;
	$("#getLostType_id").change(function() {
		getLostType = $(this).val() ;
		AjaxPaginator($("#pageLimit"),getLostType,personal,releaseTitle,goodsTypeId)
	});
	/*toastr弹出框插件初始化*/
	toastrInitialization() ;
	//物品分类初始化
	typeInitialization() ;
	//发布信息初始化下拉框
	// typeSelectInitialization();
	//页面失物招领/寻物启事初始化
	AjaxPaginator($("#pageLimit"),getLostType,personal,releaseTitle,goodsTypeId)
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
	//发布失物招领表单验证初始化
	releaseLostPropertyInfoFormValidator();
	//发布失物招领模态框隐藏
	releaseLostPropertyInfoDialogHidden();
	//图片上传初始化
	imgFileinputInitialization("#uploadImg_id","#uploadImg_div","") ;
	//日期控件初始化
	dateInitialization("#releaseLostPropertyTime_id",0);
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
	//点击失物招领信息
	clickOpenModal(".lostPropertyInfo_class","#lostPropertyInfoDialog_id");
	//点击发布失物招领信息
	monitorTextLength() ;
	clickOpenModal("#releaseLost_id","#releaseLostPropertyInfoDialog_id");
	//点击发布失物招领信息模态框的发布
	$("#releaseLostSubmit_id").click(function() {
		releaseLost();
	});
	//点击退出登录
	$("#logOut_id").click(function() {
		logOut();
	});
	//点击认领/归还
	$("#propertySubmit_id").click(function() {
		dealProperty();
	});
	//点击查找
	$("#propertySel_id").click(function() {
		releaseTitle = $("#searchContent_id").val() ;
		AjaxPaginator($("#pageLimit"),getLostType,personal,releaseTitle,goodsTypeId)
	});
	//点击重置
	$("#propertyDel_id").click(function() {
		$("#searchContent_id").val("") ;
		$("#getLostType_id").selectpicker('val','-1');
		$("#goodsTypeSel_id").text("全部");
		$.query.get("goodsTypeName") == "" ;
		releaseTitle = "" ;
		getLostType = "" ;
		goodsTypeId = "" ;
		AjaxPaginator($("#pageLimit"),getLostType,personal,releaseTitle,goodsTypeId)
	});
});
/**
 * 监听留言内容输入框长度
 */
function monitorTextLength() {
	$('#releaseLostPropertyDetail_id').keyup(function() {
	var len=this.value.length
		$('#text-count2').text(len);
	});
}
function showtypeSelect(data) {
	$(".goodsType_class").remove() ;
	var str = "" ;
	$(data).each(function(indexP,valueP){
		// console.log(valueP) ;
		$(valueP.goodsTypes).each(function(index,value) {
			// console.log(value) ;
			str = "<option class='goodsType_class' value='"+value.goodsTypeId+"'>"+value.goodsTypeName+"</option>" ;
			$("#releaseLostPropertyModule_id").append(str) ;
		});
	});
	
}
function viewGoodsType(value) {
	$("#goodsTypeSel_id").text(value.goodsTypeName);
	goodsTypeId = value.goodsTypeId ;
	AjaxPaginator($("#pageLimit"),getLostType,personal,releaseTitle,goodsTypeId)
}
function showType(data) {
	var str = "" ;
	$(data).each(function(indexP,valueP){
		// console.log(valueP) ;
		str = "<div class='col-md-3 column typeInfoP_class'>"
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
			showtypeSelect(data.resp) ;
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
				AjaxPaginator($("#pageLimit"),getLostType,personal,releaseTitle,goodsTypeId)
			}
		})
	}
}
function DateFormat(releaseLostPropertyTime) {
	// var getLostTime = new Date(row.getLostTime);
	var o = {
		"M": releaseLostPropertyTime.getMonth() + 1, //月份 
		"d": releaseLostPropertyTime.getDate(), //日 
		"H": releaseLostPropertyTime.getHours(), //小时 
		"m": releaseLostPropertyTime.getMinutes(), //分 
		"s": releaseLostPropertyTime.getSeconds(), //秒 
	};
	return releaseLostPropertyTime.getFullYear()+"-"+o.M+"-"+o.d+" "+o.H+":"+o.m+":"+o.s ;
}
/**
 * 发布失物招领信息
 */
function releaseLost() {
	var releaseLostPropertyModule_id = $("#releaseLostPropertyModule_id").val();
	if(releaseLostPropertyModule_id == "请选择物品分类") {
		alert(releaseLostPropertyModule_id);
	}
	var bootstrapValidator = $("#releaseLostPropertyInfoForm_id").data('bootstrapValidator');
	bootstrapValidator.validate();
	if(!bootstrapValidator.isValid()){
		return ;
	}
	var form = document.querySelector("#releaseLostPropertyInfoForm_id") ;
	let formDa = new FormData(form);
	$.ajax({
		type:"post",
		url:url+'/uploadFile',
		async:false,
		processData:false,
		crossDomain:true, //设置跨域为true
		xhrFields: {
		     withCredentials: true //默认情况下，标准的跨域请求是不会发送cookie的
		},
		data:formDa,
		contentType :false,
		success:function(result) {
			if(result.code != 10000) {
				toastr.warning(result.message) ;
				return ;
			}
			$("#imageUrl_id").val(result.resp) ;
				// toastr.warning(result.message) ;
		},
		error:function(result) {
			// toastr.error(result.message);
		}
	});
	var releaseLostPropertyModule_id = $("#releaseLostPropertyModule_id").val();
	// releaseLostPropertyTime = new Date(releaseLostPropertyTime);
	// releaseLostPropertyTime = DateFormat(releaseLostPropertyTime);
	console.log(releaseLostPropertyModule_id) ;
	// return ;
	var jsonDate = formDataToJsonDate('#releaseLostPropertyInfoForm_id') ;
	$.ajax({
		url : url+'/student/saveLostGoods',
		type : 'POST',
		async : false,
		processData:false,
		crossDomain:true, //设置跨域为true
		xhrFields: {
		     withCredentials: true //默认情况下，标准的跨域请求是不会发送cookie的
		},
		data:JSON.stringify(jsonDate),
		contentType:'application/json',
		dataType:'json',
		success:function(result) {
			$("#releaseLostPropertyInfoDialog_id").modal('hide');//关闭后背景色消失
			AjaxPaginator($("#pageLimit"),getLostType,personal,releaseTitle,goodsTypeId)
			if(result.code == 10000) {
				toastr.success(result.message+",请等待管理员审核");
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
// 自定义操作列
function getLostTimeDateFormat(row) {
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
function showLostAndFound(result) {
	$(".lostPropertyInfo_class").remove() ;
	$(".meiyou").remove() ;
	var str = "" ;
	var Got = "" ;
	var time = "" ;
	if(result == null || result == "") {
		str = "<h1 class='meiyou'>暂时没有相关信息</h1>" ;
		$(".lostPropertyList_class").append(str) ;
		return ;
	}
	$(result).each(function(index,value){
		// console.log(value) ;
		if(value.getLostType == 0) {
			Got = "拾得" ;
			time = "<h3>拾得时间："+getLostTimeDateFormat(value)+"</h3>" ;
		}else{
			Got = "丢失" ;
			time = "<h3>丢失时间："+getLostTimeDateFormat(value)+"</h3>" ;
		}
		str =  "<div class='lostPropertyInfo_class' onclick='viewLostAndFound("+JSON.stringify(value)+")'>"
			+"<img class='lostPropertyImg_class' src='"+url+"/getImg?imgPath="+value.goodsImageUrl+"' />"
			+"<h3>物品名称："+value.releaseTitle+"</h3>"
			+"<h3>分类："+value.goodsTypeName+"</h3>"
			+"<h3>描述："+value.releaseContent+"</h3>"
			+time
			+"<h3>地点："+value.detailedAddress+Got+"</h3>"
			+"</div>";
		$(".lostPropertyList_class").append(str) ;
	});
}
/**
 * 页面初始化(获取留言内容)
 * @param {Object} obj				分页id
 * @param {Object} getLostType		信息类别 0：失物招领，1：寻物启事
 * @param {Object} personal			是否查询自己的信息
 * @param {Object} releaseTitle		查询关键字
 */
function AjaxPaginator(obj,getLostType,personal,releaseTitle,goodsTypeId) {
	if(getLostType == "" || getLostType == "-1") {
		getLostType = null ;
	}
	if(goodsTypeId == "" || goodsTypeId == "-1") {
		goodsTypeId = null ;
	}
	var paramObj = {
		"getLostType" : getLostType,
		"personal" :personal,
		"state" : "PASS",
		"releaseTitle" : releaseTitle,
		"goodsTypeId" : goodsTypeId
	}
	// console.log(paramObj) ;
	var news ;
	var totalPages;//总页数
	var pageSize = 9;//每页显示数量
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
			// console.log("初始化："+result.resp.total) ;
			if(result.code != 10000) {
				toastr.warning(result.message);
				return ;
			}
			showLostAndFound(result.resp.rows) ;
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
							 url:url+'/getLostGoodsList',
							 data:JSON.stringify({size:pageSize,page:page,paramObj:paramObj}),
							 dataType:"json",
							 contentType:'application/json',
							 type:"post",
							 success:function(result) {
								if(result.code == 10000) {
									showLostAndFound(result.resp.rows) ;
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