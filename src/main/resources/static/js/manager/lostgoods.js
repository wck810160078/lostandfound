var url = url;
$(function() {
	//先销毁表格
	$('#lostGoodsTab_id').bootstrapTable('destroy');
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

	//删除
	$("#deletePropertySubmit_id").click(function(){
		removeLostGoods($("#propertyId_id").val());
	});
	
	//审核通过
	$("#passSubmit_id").click(function(){
		reviewLostGoods($("#propertyId_id").val(),"PASS");
	});
	
	//审核不通过
	$("#notPassSubmit_id").click(function(){
		reviewLostGoods($("#propertyId_id").val(),"NOTPASS");
	});
	/*
	函数作用：点击addmoduleNameSubmit_id(保存)调用saveLostGoods添加类别信息
	参数说明：无
	*/
	$("#addLostGoodsSubmit_id").click(function(){
 		/*表单验证*/
		var bootstrapValidator = $("#addLostGoodsForm_id").data('bootstrapValidator');
		bootstrapValidator.validate();
		if(!bootstrapValidator.isValid()){
			return ;
		}
		var form = document.querySelector("#addLostGoodsForm_id") ;
		let data = new FormData(form);
		//data.append("lostGoodsContent",$('#lostGoodsContent_id').val());
		
		var formData = {};
		data.forEach((value, key) => formData[key] = value );
		$.ajax({
			type:"post",
			url:url+'/student/saveLostGoods',
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
					$('#addLostGoodsDialog_id').modal('hide'); //关闭对话框
					$('#lostGoodsTab_id').bootstrapTable('refresh');
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
	$('#addLostGoodsDialog_id').on('hidden.bs.modal', function() {
	    $('#addLostGoodsForm_id').data('bootstrapValidator', null);
		$("#lostGoodsId_id").val("") ;
		$("#lostGoodsContent_id").val("");
		$("#addLostGoodsType_id").selectpicker('val','');
		formValidator();
	});
	/**
	 * 	更改lostGoodsSeaBut_id调更新表格搜索条件
	 */
	$('#lostGoodsType_id').change(function(){
		$('#lostGoodsTab_id').bootstrapTable('selectPage', 1);
	});
	/**
	 * 点击moduleNameSeaBut_id更新表格搜索条件
	 */
	$('#lostGoodsSeaBut_id').click(function(){
		$('#lostGoodsTab_id').bootstrapTable('selectPage', 1);
	}) ;
	/**
	 * 点击moduleNameSeaDel_id(重置)按钮，清空查询条件
	 */
	$('#lostGoodsSeaDel_id').click(function(){
		$("#lostGoodsType_id").selectpicker('val','-1');
		$('#lostGoodsContentSea_id').val("");
		$('#lostGoodsTab_id').bootstrapTable('selectPage', 1);
	}) ;
	$("#changeImg_btn").click(function(){
		$("#changeImg_yn").val("yes") ;
		$("#changeImg_btn").attr("style","display:none;");
		changeImg();
	});
});
/**
 * 	表格初始化
 */
function tabelInitialization() {
	$('#lostGoodsTab_id').bootstrapTable({
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
        pageList: [5,10,15],       		//可供选择的每页的行数（*）
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
					"state" : $("#lostGoodsType_id").val()=="-1"?null:$("#lostGoodsType_id").val(),
					"getLostType" :0,
					"releaseTitle" :	$('#lostGoodsContentSea_id').val() 
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
				var pageSize=$('#lostGoodsTab_id').bootstrapTable('getOptions').pageSize;//通过表的#id 可以得到每页多少条
                var pageNumber=$('#lostGoodsTab_id').bootstrapTable('getOptions').pageNumber;//通过表的#id 可以得到当前第几页
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
			field: 'claimName',
			title: '拾取人',
			valign: 'middle',
			align: 'center',
			visible: false //不显示
		},{
			field: 'claimName',
			title: '联系方式',
			valign: 'middle',
			align: 'center',
			visible: false //不显示
		},{
			field: 'getLostTime',
			title: '拾取时间',
			valign: 'middle',
			align: 'center',
			formatter: dateFormat 
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
/**
 * 	展示失物招领/寻物启事详细信息
 * @param {Object} row	数据
 */
function viewFinded(row) {
	$(".articleImageUrl_class").remove() ;
	var img = "<img class='articleImageUrl_class' src='"+url+"/getImg?imgPath="+row.goodsImageUrl+"' />" ;
	$(".imgDiv_class").append(img) ;
	if(row.getLostType == 0) {
		$("#propertyAddTitle_id").text("拾取地点：");
		$("#propertyManTitle_id").text("拾取人：");
		$("#dioTitle_id").text("失物招领详细信息");
	}else {
		$("#propertyAddTitle_id").text("丢失地点：");
		$("#propertyManTitle_id").text("丢失人：");
		$("#dioTitle_id").text("寻物启事详细信息");
	}
	$("#propertyId_id").val(row.lostGoodsId);
	$("#propertyName_id").val(row.releaseTitle);
	$("#propertyModule_id").val(row.goodsTypeName);
	$("#propertyDetail_id").val(row.releaseContent);
	$("#propertyMan_id").val(row.userName);
	$("#propertyAddDetail_id").val(row.detailedAddress);
	$("#propertyPhoneNumber_id").val(row.phoneNumber);
	switch(row.state) {
		case "UNREVIEWED" : 
			$("#passSubmit_id").text("通过");
			$("#notPassSubmit_id").text("不通过");
			$("#deletePropertySubmit_id").css("display","inline");
			$("#passSubmit_id").css("display","inline");
			$("#notPassSubmit_id").css("display","inline");
			break ;
		case "DEAL" :
			$("#deletePropertySubmit_id").css("display","none");
			$("#passSubmit_id").css("display","none");
			$("#notPassSubmit_id").css("display","none");
			break;
		default :
			$("#deletePropertySubmit_id").css("display","inline");
			$("#passSubmit_id").css("display","none");
			$("#notPassSubmit_id").css("display","none");
	}
	$("#propertyInfoDialog_id").modal({
		backdrop: "static"
	});
}
function findedMethod(value, row, index) {
	var view = "<input type='button' id='view"+row["lostGoodsId"]+"' class='btn btn-primary viewFinded_class' onclick='viewFinded("+JSON.stringify(row)+")' value='查看'>" ;
	return view ;
}

// 自定义操作列
function method(value, row, index) {
	var review = "<input type='button' id='review"+row["lostGoodsId"]+"' class='btn btn-primary reviewLostGoods_class' onclick='reviewLostGoods("+row['lostGoodsId']+")' value='审核'>" ;
	var remove = "<input type='button' id='remove"+row["lostGoodsId"]+"' class='btn btn-primary removeLostGoods_class' onclick='removeLostGoods("+row['lostGoodsId']+")' value='删除'>" ;
	if(row.state=='UNREVIEWED'){
		return review +" "+remove;
	}
	return remove ;
}
function dealTimeFormat(value, row, index){
	var createTime = new Date(row.dealTime);
	var o = {
		"M": createTime.getMonth() + 1, //月份 
		"d": createTime.getDate(), //日 
		"H": createTime.getHours(), //小时 
		"m": createTime.getMinutes(), //分 
		"s": createTime.getSeconds(), //秒 
	};
	return createTime.getFullYear()+"-"+o.M+"-"+o.d+" "+o.H+":"+o.m+":"+o.s ;
}
function dateFormat(value, row, index) {
	var createTime = new Date(row.getLostTime);
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
function removeLostGoods(id) {
	if(removeConfirm()) {
		$.ajax({
			type: "get",
			url: url+'/student/deleteLostGoods',
			async: true,
			data: {
				"lostGoodsId": id
			},
			crossDomain:true, //设置跨域为true
			xhrFields: {
			     withCredentials: true //默认情况下，标准的跨域请求是不会发送cookie的
			},
			success: function(result) {
				if(result.code == 10000) {
					$('#propertyInfoDialog_id').modal('hide'); //关闭对话框
					$('#lostGoodsTab_id').bootstrapTable('refresh');
					toastr.success(result.message);
					return ;
				}
				if(result.code == 32000) {
					$('#propertyInfoDialog_id').modal('hide'); //关闭对话框
					toastr.warning(result.message) ;
					setTimeout(function() {
						$("#loginDialog_id").modal({
							backdrop: "static" 
						});
					},300);
					return ;
				}
				toastr.success(result.message) ;
				$("#lostGoodsTab_id").bootstrapTable('refresh'); //刷新，但页码依然为当前的页码，比如page=5依然为5 
			},
			error: function(result) {
				// toastr.error(data.info) ;
			}
		});
	}
}

function reviewLostGoods(id,state) {
	$.ajax({
			type:"get",
			url:url+'/student/changeState',
			async:false,
			processData:false,
			crossDomain:true, //设置跨域为true
			xhrFields: {
			     withCredentials: true //默认情况下，标准的跨域请求是不会发送cookie的
			},
			data:"lostGoodsId="+id+"&state="+state,
			success:function(result) {
				if(result.code == 10000) {
					$('#propertyInfoDialog_id').modal('hide'); //关闭对话框
					$('#lostGoodsTab_id').bootstrapTable('refresh');
					toastr.success(result.message);
					return ;
				}
				if(result.code == 32000) {
					$('#propertyInfoDialog_id').modal('hide'); //关闭对话框
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
    $('#addLostGoodsForm_id').bootstrapValidator({
    	message: 'This value is not valid',
    	//提供输入验证图标提示
    	feedbackIcons: {
    		valid: 'glyphicon glyphicon-ok',
    		invalid: 'glyphicon glyphicon-remove',
    		validating: 'glyphicon glyphicon-refresh'
    	},
    	fields: {
    		lostGoodsContent: {
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
    		lostGoodsType: {
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
