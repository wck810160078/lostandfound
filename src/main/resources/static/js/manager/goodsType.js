var url = url;
var parentData;
$(function() {
	//先销毁表格
	$('#goodsTypeTab_id').bootstrapTable('destroy');
	/*表格初始化*/
	tabelInitialization() ;
	//初始化下拉框
	getParentType("#goodsTypeSel_id");
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
	 * 	点击addGoodsTypeBut_id(发布留言)时，显示addGoodsTypeDialog_id Dialog
	 */
	$("#addGoodsTypeBut_id").click(function() {
		$("#dialogLabel_id").text("新增类别");
		//初始化下拉框
		showData("#addGoodsTypeSel_id",parentData,"-1");
		$('#addGoodsTypeDialog_id').modal({
			backdrop: "static" //--设置为static后可以防止不小心点击其他区域是弹出框消失
		});
	});

	/*
	函数作用：点击addmoduleNameSubmit_id(保存)调用saveGoodsType添加类别信息
	参数说明：无
	*/
	$("#addGoodsTypeSubmit_id").click(function(){
 		/*表单验证*/
		var bootstrapValidator = $("#addGoodsTypeForm_id").data('bootstrapValidator');
		bootstrapValidator.validate();
		if(!bootstrapValidator.isValid()){
			return ;
		}
		var form = document.querySelector("#addGoodsTypeForm_id") ;
		let data = new FormData(form);
		//data.append("goodsTypeName",$('#goodsTypeName_id').val());
		
		var formData = {};
		data.forEach((value, key) => formData[key] = value );
		$.ajax({
			type:"post",
			url:url+'/student/saveGoodsType',
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
					$('#addGoodsTypeDialog_id').modal('hide'); //关闭对话框
					$('#goodsTypeTab_id').bootstrapTable('refresh');
					toastr.success(result.message);
					return ;
				}
				if(result.code == 32000) {
					toastr.warning(result.message) ;
					$('#addGoodsTypeDialog_id').modal('hide'); //关闭对话框
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
	$('#addGoodsTypeDialog_id').on('hidden.bs.modal', function() {
	    $('#addGoodsTypeForm_id').data('bootstrapValidator', null);
		$("#goodsTypeId_id").val("") ;
		$("#goodsTypeName_id").val("");
		$("#addGoodsTypeSel_id").selectpicker('val','');
		formValidator();
	});
	/**
	 * 	更改goodsTypeSeaBut_id调更新表格搜索条件
	 */
	$('#goodsTypeSel_id').change(function(){
		$('#goodsTypeTab_id').bootstrapTable('selectPage', 1);
	});
	/**
	 * 点击moduleNameSeaBut_id更新表格搜索条件
	 */
	$('#goodsTypeSeaBut_id').click(function(){
		$('#goodsTypeTab_id').bootstrapTable('selectPage', 1);
	}) ;
	/**
	 * 点击moduleNameSeaDel_id(重置)按钮，清空查询条件
	 */
	$('#goodsTypeSeaDel_id').click(function(){
		$("#goodsTypeSel_id").selectpicker('val','-1');
		$('#goodsTypeNameSea_id').val("");
		$('#goodsTypeTab_id').bootstrapTable('selectPage', 1);
	}) ;
	$("#changeImg_btn").click(function(){
		$("#changeImg_yn").val("yes") ;
		$("#changeImg_btn").attr("style","display:none;");
		changeImg();
	});
});
/**
 * 	表格初始化
 * @param url 初始化请求接口
 */
function tabelInitialization() {
	$('#goodsTypeTab_id').bootstrapTable({
		url: url+'/goodsTypeList',
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
        uniqueId: "goodsTypeId",            //每一行的唯一标识，一般为主键列
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
					"parentId" :$("#goodsTypeSel_id").val()== '-1' ? null : $('#goodsTypeSel_id').val(),
					"goodsTypeName" :	$('#goodsTypeNameSea_id').val() 
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
				var pageSize=$('#goodsTypeTab_id').bootstrapTable('getOptions').pageSize;//通过表的#id 可以得到每页多少条
                var pageNumber=$('#goodsTypeTab_id').bootstrapTable('getOptions').pageNumber;//通过表的#id 可以得到当前第几页
                return Number(pageSize * (pageNumber - 1) + index + 1) ;//返回每条的序号： 每页条数 * （当前页 - 1 ）+ 序号
			},
			width:60,
		},
		{
			field: 'goodsTypeId',
			align: 'center',
			valign: 'middle',
			visible: false //不显示
		},{
			field: 'goodsTypeName',
			title: '物品分类名称',
			align: 'center',
			valign: 'middle'
		},{
			field: 'parentName',
			title: '上一级分类',
			align: 'center',
			valign: 'middle',
			width:100
		},{
			title: '操作',
			align: 'center',
			valign: 'middle',
			width:200,
			formatter: method //自定义操作方法
		}]
	});
}

// 自定义操作列
function method(value, row, index) {
	var edit = "<input type='button' id='edit"+row["goodsTypeId"]+"' class='btn btn-primary editGoodsType_class' onclick='editGoodsType("+row['goodsTypeId']+")' value='编辑'>" ;
	var remove = "<input type='button' id='remove"+row["goodsTypeId"]+"' class='btn btn-primary removeGoodsType_class' onclick='removeGoodsType("+row['goodsTypeId']+")' value='删除'>" ;
	if(row.parentId==0){
		return edit;
	}
	return edit + " " +remove ;
}
function dateFormat(value, row, index) {
	var createTime = new Date(row.goodsTypeTime);
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
function removeGoodsType(id) {
	if(removeConfirm()) {
		$.ajax({
			type: "get",
			url: url+'/admin/deleteGoodsType',
			async: true,
			data: {
				"goodsTypeId": id
			},
			crossDomain:true, //设置跨域为true
			xhrFields: {
			     withCredentials: true //默认情况下，标准的跨域请求是不会发送cookie的
			},
			success: function(result) {
				if(result.code == 10000) {
					toastr.success("删除成功！") ;
					$("#goodsTypeTab_id").bootstrapTable('refresh'); //刷新，但页码依然为当前的页码，比如page=5依然为5 
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
				$("#goodsTypeTab_id").bootstrapTable('refresh'); //刷新，但页码依然为当前的页码，比如page=5依然为5 
			},
			error: function(result) {
				// toastr.error(data.info) ;
			}
		});
	}
}
function changeImg(id) {
	var id = $("#editGoodsTypeId_id").val() ;
	$("#newImg_class").attr("style","display:inline;");
	$("#oldImg_div").attr("style","display:none;");
}
function editGoodsType(id) {
	var row = $('#goodsTypeTab_id').bootstrapTable('getRowByUniqueId',id);//行的数据
	$("#dialogLabel_id").text("编辑类别");
	$("#goodsTypeId_id").val(row.goodsTypeId);
	showData("#addGoodsTypeSel_id",parentData,row.parentId);
	$("#goodsTypeName_id").val(row.goodsTypeName);
	$('#addGoodsTypeDialog_id').modal({
		backdrop: "static" //--设置为static后可以防止不小心点击其他区域是弹出框消失
	});
}
//form验证规则
function formValidator(){
	/*初始化表单验证插件*/
    $('#addGoodsTypeForm_id').bootstrapValidator({
    	message: 'This value is not valid',
    	//提供输入验证图标提示
    	feedbackIcons: {
    		valid: 'glyphicon glyphicon-ok',
    		invalid: 'glyphicon glyphicon-remove',
    		validating: 'glyphicon glyphicon-refresh'
    	},
    	fields: {
    		goodsTypeName: {
    			message: '类别名称内容验证失败',
                validators: {
                    notEmpty: {
                        message: '类别名称内容不能为空'
                    },
					stringLength: {
                         min: 1,
                         max: 20,
                         message: '类别名称长度必须在1到30之间'
                    },
                }
            },
    		parentId: {
    			message: '类别验证失败',
                validators: {
                    notEmpty: {
                        message: '类别不能为空'
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

function getParentType(id){
	$.ajax({
			type: "get",
			url: url+'/getGoodsTypeByParentId',
			async: true,
			data: {
				"parentId": 0
			},
			success: function(result) {
				if(result.code == 10000) {
					parentData = result.resp;
					showData(id,result.resp,"-1");
					return ;
				}
				toastr.warning(result.message) ;
			},
			error: function(result) {
				// toastr.error(data.info) ;
			}
		});
}
/*
函数名称：showData
函数作用：拼接select，展示数据
参数说明：result：通过ajax调用getModuleList接收到的所有类别
*/
function showData(id,result,goodsTypeId) {
	var str = "" ;
	$(id).html("") ;
	if(id == "#goodsTypeSel_id") {
		$(id).append("<option value='-1'>全部</option>");
	}
	if(goodsTypeId==0){
		$(id).attr("disabled","disabled") ;
	}else{
		$(id).attr("disabled",false) ;
	}
	$(result).each(function(index,value){
		if(goodsTypeId == value.goodsTypeId) {
			str = "<option value='"+value.goodsTypeId+"' selected='selected'>"+value.goodsTypeName+"</option>" ;
		}else {
			str = "<option value='"+value.goodsTypeId+"'>"+value.goodsTypeName+"</option>" ;
		}
		$(id).append(str) ;
		//使用refresh方法更新UI以匹配新状态。
		$(id).selectpicker('refresh');
		//render方法强制重新渲染引导程序 - 选择ui。
		$(id).selectpicker('render');
	});
}