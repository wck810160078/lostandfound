var url = url;
var editor;
var userInfo = userNameInitialization() ;
$(function() {
	// adminInitialization() ;
	imgFileinputInitialization("");
	editor = initWangEditor();
	//先销毁表格
	$('#articleTab_id').bootstrapTable('destroy');
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
	//初始化查询页面类别下拉框
	//selectInitialization("#ModuleSel_id","");
	/**
	 * 	点击addArticleBut_id(发布新闻)时，显示addArticleDialog_id Dialog
	 */
	$("#addArticleBut_id").click(function() {
		$("#dialogLabel_id").text("发布新闻");
		/**
		 * 上传图片fileinput初始化
		 */
		$('#uploadImg_id').fileinput('destroy');
		imgFileinputInitialization("") ;
		$("#sport_news_id").val("") ;
		//selectInitialization("#addCategoryType_id","");
		$('#addArticleDialog_id').modal({
			backdrop: "static" //--设置为static后可以防止不小心点击其他区域是弹出框消失
		});
	});

	/*
	函数作用：点击addmoduleNameSubmit_id(保存)调用saveArticle添加类别信息
	参数说明：无
	*/
	$("#addArticleSubmit_id").click(function(){
		console.log(editor.txt.html());
		if(editor.txt.html() == "<p><br/></p>" || editor.txt.html() == null) {
			alert("新闻内容不能为空");
			return ;
		}
 		/*表单验证*/
		var bootstrapValidator = $("#addArticleForm_id").data('bootstrapValidator');
		bootstrapValidator.validate();
		if(!bootstrapValidator.isValid()){
			return ;
		}
		var form = document.querySelector("#addArticleForm_id") ;
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
				$("#articleImageUrl_id").val(result.resp) ;
					// toastr.warning(result.message) ;
			},
			error:function(result) {
				// toastr.error(result.message);
			}
		});
		var form = document.querySelector("#addArticleForm_id") ;
		let data = new FormData(form);
		data.append("articleContent",editor.txt.html());
		
		editor.txt.html("<p><br/></p>");
		var formData = {};
		data.forEach((value, key) => formData[key] = value );
		$.ajax({
			type:"post",
			url:url+'/admin/saveArticle',
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
				$('#addArticleDialog_id').modal('hide'); //关闭对话框
				if(result.code == 10000) {
					$('#articleTab_id').bootstrapTable('refresh');
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
	$('#addArticleDialog_id').on('hidden.bs.modal', function() {
	    //$("#addArticleForm_id").data('bootstrapValidator').destroy();
	    $('#addArticleForm_id').data('bootstrapValidator', null);
	    editor.txt.html("<p><br/></p>");
	    $("#title_id").val("") ;
		$("#articleId_id").val("") ;
		$("#articleImageUrl_id").val("");
		$("#addCategoryType_id").selectpicker('val',"");
		formValidator();
	});
	/**
	 * 	更改articleSeaBut_id调更新表格搜索条件
	 */
	$('#categoryType_id').change(function(){
		$('#articleTab_id').bootstrapTable('selectPage', 1);
	});
	/**
	 * 点击moduleNameSeaBut_id更新表格搜索条件
	 */
	$('#articleSeaBut_id').click(function(){
		$('#articleTab_id').bootstrapTable('selectPage', 1);
	}) ;
	/**
	 * 点击moduleNameSeaDel_id(重置)按钮，清空查询条件
	 */
	$('#articleSeaDel_id').click(function(){
		$("#categoryType_id").selectpicker('val','-1');
		$('#articleTitle_id').val("");
		$('#articleTab_id').bootstrapTable('selectPage', 1);
	}) ;
	$("#changeImg_btn").click(function(){
		$("#changeImg_yn").val("yes") ;
		$("#changeImg_btn").attr("style","display:none;");
		changeImg();
	});
});
function initWangEditor(){
	var edit = new wangEditor('#editor');
	    
	edit.customConfig.menus = [
		'bold',  // 粗体
		// 'fontSize',  // 字号
		'fontName',  // 字体
		'italic',  // 斜体
		'underline',  // 下划线
		'strikeThrough',  // 删除线
		'foreColor',  // 文字颜色
		'justify',  // 对齐方式
		'undo',  // 撤销
		'redo'  // 重复
	];
	
	edit.create();
	return edit;
}
/**
 * 	表格初始化
 * @param url 初始化请求接口
 */
function tabelInitialization() {
	$('#articleTab_id').bootstrapTable({
		url: url+'/getArticleList',
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
        uniqueId: "articleId",            //每一行的唯一标识，一般为主键列
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
					"categoryType" :$("#categoryType_id").val()== '-1' ? null : $('#categoryType_id').val(),
					"articleTitle" :	$('#articleTitle_id').val() 
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
				var pageSize=$('#articleTab_id').bootstrapTable('getOptions').pageSize;//通过表的#id 可以得到每页多少条
                var pageNumber=$('#articleTab_id').bootstrapTable('getOptions').pageNumber;//通过表的#id 可以得到当前第几页
                return Number(pageSize * (pageNumber - 1) + index + 1) ;//返回每条的序号： 每页条数 * （当前页 - 1 ）+ 序号
			},
			width:60,
		},
		// {
		// 	checkbox: true
		// },
		{
			field: 'articleId',
			align: 'center',
			visible: false //不显示
		},{
			field: 'articleImageUrl',
			align: 'center',
			visible: false //不显示
		},{
			field: 'categoryType',
			title: '栏目类型',
			align: 'center',
			valign: 'middle',
		},{
			field: 'articleTitle',
			title: '新闻标题',
			align: 'center',
			valign: 'middle',
			cellStyle:{
				css:{
					"overflow": "hidden",
					"text-overflow": "ellipsis",
					"white-space": "nowrap"
					}
			}
		},{
			field: 'articleSrc',
			title: '文章来源',
			align: 'center',
			valign: 'middle',
		},{
			field: 'articleContent',
			title: '新闻正文',
			align: 'center',
			visible: false //不显示
		},{
			title: '新闻图片',
			align: 'center',
			formatter: getImage
		},{
			field: 'createTime',
			title: '发布日期',
			align: 'center',
			valign: 'middle',
			formatter:dateFormat
		},{
			title: '操作',
			align: 'center',
			width:200,
			formatter: method //自定义操作方法
		}]
	});
}

// 自定义操作列
function getImage(value, row, index){
	return "<img src='"+url+"/getImg?imgPath="+row.articleImageUrl+"' />"
}
function method(value, row, index) {
	var edit = "<input type='button' id='edit"+row["articleId"]+"' class='btn btn-primary editArticle_class' onclick='editArticle("+row['articleId']+")' value='编辑'>" ;
	var remove = "<input type='button' id='remove"+row["articleId"]+"' class='btn btn-primary removeArticle_class' onclick='removeArticle("+row['articleId']+")' value='删除'>" ;
	return edit+"&nbsp;&nbsp;&nbsp;&nbsp;"+remove ;
}
function dateFormat(value, row, index) {
	var createTime = new Date(row.createTime);
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
	var msg = "确定要删除这条新闻吗？";
	if (confirm(msg)==true){
		return true;
	}else{
		return false;
	}
}
function removeArticle(id) {
	if(removeConfirm()) {
		$.ajax({
			type: "get",
			url: url+'/admin/deleteArticle',
			async: true,
			data: {
				"articleId": id
			},
			crossDomain:true, //设置跨域为true
			xhrFields: {
			     withCredentials: true //默认情况下，标准的跨域请求是不会发送cookie的
			},
			success: function(result) {
				if(result.code == 10000) {
					toastr.success("删除成功！") ;
					$("#articleTab_id").bootstrapTable('refresh'); //刷新，但页码依然为当前的页码，比如page=5依然为5 
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
				$("#articleTab_id").bootstrapTable('refresh'); //刷新，但页码依然为当前的页码，比如page=5依然为5 
			},
			error: function(result) {
				// toastr.error(data.info) ;
			}
		});
	}
}
function editEditorInitialization(articleContent) {
	var E = window.wangEditor;
	var editorS = new E('#editEditor');
	editorS.customConfig.zIndex = 100 ;
	//获取隐藏控件<textarea>的id，用于显示内容，也方便后台获取内容
	var $editArticleContent = $('#editArticleContent_id');
	// 或者 var editor = new E( document.getElementById('editor') )
	// 自定义菜单配置
	editorS.customConfig.menus = [
		'bold',  // 粗体
		'fontSize',  // 字号
		'fontName',  // 字体
		'italic',  // 斜体
		'underline',  // 下划线
		'strikeThrough',  // 删除线
		'foreColor',  // 文字颜色
		'justify',  // 对齐方式
		'undo',  // 撤销
		'redo'  // 重复
	]
	editorS.customConfig.onchange = function (html) {
		// 监控变化，同步更新到 textarea
		$editArticleContent.val(html) ;
	}
	editorS.create();
	$editArticleContent.val(editorS.txt.html());// 初始化 textarea 的值
	editorS.txt.html(articleContent) ;
}
function changeImg(id) {
	var id = $("#editArticleId_id").val() ;
	$("#newImg_class").attr("style","display:inline;");
	$("#oldImg_div").attr("style","display:none;");
}
function editArticle(id) {
	var row = $('#articleTab_id').bootstrapTable('getRowByUniqueId',id);//行的数据
	var imgSrc = url+'/getImg?imgPath='+row.articleImageUrl;
	var img = "<img src='"+imgSrc+"' class='file-preview-image' ></img>";
	// console.log(imgSrc);
	$('#uploadImg_id').fileinput('destroy');
	imgFileinputInitialization(imgSrc);
	//"<img src='../../images/1.jpg' class='file-preview-image' />"
	//$('#uploadImg_id').fileinput("refresh");
	editor = initWangEditor();
	$("#dialogLabel_id").text("编辑新闻");
	$("#title_id").val(row.articleTitle) ;
	$("#articleId_id").val(row.articleId);
	editor.txt.html(row.articleContent);
	$("#addCategoryType_id").selectpicker('val',row.categoryType);
	$('#addArticleDialog_id').modal({
		backdrop: "static" //--设置为static后可以防止不小心点击其他区域是弹出框消失
	});
}
//form验证规则
function formValidator(){
	/*初始化表单验证插件*/
    $('#addArticleForm_id').bootstrapValidator({
    	message: 'This value is not valid',
    	//提供输入验证图标提示
    	feedbackIcons: {
    		valid: 'glyphicon glyphicon-ok',
    		invalid: 'glyphicon glyphicon-remove',
    		validating: 'glyphicon glyphicon-refresh'
    	},
    	fields: {
			imgFile: {
				message: '图片验证失败',
			    validators: {
			        notEmpty: {
			            message: '图片不能为空'
			        }
			    }
			},
    		articleTitle: {
    			message: '新闻标题验证失败',
                validators: {
                    notEmpty: {
                        message: '新闻标题不能为空'
                    },
					stringLength: {
                         min: 1,
                         max: 30,
                         message: '用户名长度必须在1到30之间'
                    },
                }
            }
        }
    });
}
/**
 * 	fileinput上传插件初始化（图片上传）
 */
function imgFileinputInitialization(imgUrl) {
	$("#uploadImg_id").remove();
	var uploadImg_id = "<input id='uploadImg_id' name='imgFile'  type='file' data-show-caption='true' />";
	$("#uploadImg_div").append(uploadImg_id);
	if(url==""){
		$('#uploadImg_id').fileinput({
			language: 'zh', 									//设置语言
			allowedFileExtensions: ['jpg', 'gif', 'png'], 		//接收的文件后缀
			uploadAsync: false, 									//默认异步上传
			showUpload: false, 									//是否显示上传按钮
			showCaption: false, 								//是否显示标题
			removeLabel: "移除",
			overwriteInitial:true,
			browseClass: "btn btn-primary", 					//按钮样式
			dropZoneEnabled: false, 							//是否显示拖拽区域
			maxFileSize: 1024*8,								//单位为kb，如果为0表示不限制文件大小
			maxFileCount: 1, 	//表示允许同时上传的最大文件个数
			msgFilesTooMany: "选择上传的文件数量({n}) 超过允许的最大数值{m}！",
			autoReplace : true
		}).on('filepreupload', function(event, data, previewId, index) { //上传中
			var form = data.form,
			files = data.files,
			extra = data.extra,
			response = data.response,
			reader = data.reader;
			console.log('文件正在上传');
		}).on("fileuploaded", function(event, data, previewId, index) { //一个文件上传成功
			console.log('文件上传成功！');
			console.log(data) ;
		}).on('fileerror', function(event, data, msg) { //一个文件上传失败
			console.log('文件上传失败！' + data.id);
		});
	}else{
		$('#uploadImg_id').fileinput({
			language: 'zh', 									//设置语言
			allowedFileExtensions: ['jpg', 'gif', 'png'], 		//接收的文件后缀
			uploadAsync: false, 									//默认异步上传
			showUpload: false, 									//是否显示上传按钮
			showCaption: false, 								//是否显示标题
			removeLabel: "移除",
			previewFileType : ['image', 'html'],
			initialPreview : imgUrl,
			initialPreviewCount : 1,
			initialPreviewFileType : 'image',
			initialPreviewAsData:true,
			initialPreviewShowDelete:false,
			overwriteInitial:true,
			browseClass: "btn btn-primary", 					//按钮样式
			dropZoneEnabled: false, 							//是否显示拖拽区域
			maxFileSize: 1024*8,								//单位为kb，如果为0表示不限制文件大小
			maxFileCount: 1, 	//表示允许同时上传的最大文件个数
			msgFilesTooMany: "选择上传的文件数量({n}) 超过允许的最大数值{m}！",
			autoReplace : true
		}).on('filepreupload', function(event, data, previewId, index) { //上传中
			var form = data.form,
			files = data.files,
			extra = data.extra,
			response = data.response,
			reader = data.reader;
			console.log('文件正在上传');
		}).on("fileuploaded", function(event, data, previewId, index) { //一个文件上传成功
			console.log('文件上传成功！');
			// console.log(data) ;
		}).on('fileerror', function(event, data, msg) { //一个文件上传失败
			console.log('文件上传失败！' + data.id);
		});
	}
	
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
        timeOut: "500",		//展现时间
        extendedTimeOut: "1000",	//加长展示时间
        showEasing: "swing",		//显示时的动画缓冲方式
        hideEasing: "linear",		//消失时的动画缓冲方式
        showMethod: "fadeIn",		//显示时的动画方式
        hideMethod: "fadeOut"		//消失时的动画方式
    };
}
/*
函数名称：showData
函数作用：拼接select，展示数据
参数说明：result：通过ajax调用getModuleList接收到的所有类别
*/
function showData(id,result,categoryType) {
	// console.log(result);
	var str = "" ;
	$(id).html("") ;
	if(id == "#ModuleSel_id") {
		$(id).append("<option value='-1'>全部</option>");
	}
	$(result).each(function(index,value){
		if(categoryType == value.categoryType) {
			str = "<option value='"+value.categoryType+"' selected='selected'>"+value.categoryType+"</option>" ;
		}else {
			str = "<option value='"+value.categoryType+"'>"+value.categoryType+"</option>" ;
		}
		$(id).append(str) ;
		//使用refresh方法更新UI以匹配新状态。
		$(id).selectpicker('refresh');
		//render方法强制重新渲染引导程序 - 选择ui。
		$(id).selectpicker('render');
	});
}
function getImg(src){
	var img = "" ;
	$.ajax({
			url : url+"/getImg?imgPath="+src,
			type : 'GET',
			async : false,
			// data : "word="+word ,
	        cache: false,//上传文件无需缓存
			// 告诉jQuery不要去处理发送的数据
			processData : false,
			// 告诉jQuery不要去设置Content-Type请求头
			contentType : false,
			success : function(result) {
				img = result;
			}
	});
	return img;
}
