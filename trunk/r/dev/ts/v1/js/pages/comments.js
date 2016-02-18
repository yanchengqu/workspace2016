/*function area*/
var tongshuai = tongshuai || {};
function imgbox(){
	$('.ul-sharebox').thumbox({maxThumbWidth:500});
}
/*use*/
tongshuai.products = {
	init : function () {
		var that = this;
		$('.ul-sharebox').thumbox({maxThumbWidth:500});//查看缩略图			
		that._rateAnimate();//百分比
		that.showReplyBox();
		that.saveComment();
		imgbox();
	},
	
	_rateAnimate:function(){//百分比
	var max="bargood";
	var middle="barsoso";
	var min="barbad";	
	
	var maxValue=0; 
	var minValue=0;
	
	var maxIndex=0;
	var minIndex=0;
	
	$(".charts").each(function(i,item){
		var a=parseInt($(item).attr("w"));
	
		if(i===0){
			minValue=a;
			minIndex=i;
		}
	
		if(a>maxValue){
			maxValue=a;
			maxIndex=i;
		}else if(a<minValue){
			minValue=a;
			minIndex=i;
		}
	
	});
	
	$(".charts").each(function(i,item){
		var addStyle="";
		var divindex=parseInt($(item).attr("divindex"));
		if(divindex==maxIndex){
			addStyle=max;
		}else if(divindex==minIndex){
			addStyle=min;
		}else{
			addStyle=middle;
		}
	
		$(item).addClass(addStyle);
		var a=$(item).attr("w");
		$(item).animate({
			width: a+"%"
		},1000);
	});
	
	},

	showReplyBox : function(){
		$('.reply-btns').data({'state':false});
		//$('.reply-btns').data({"f":0,admin:"no",num:111.222,boolll:true});
		//console.log($('.reply-btns').data());
		var that = this;
		var _combox = '<img src="http://static.tongshuai.com/r/build/ts/v1/img/icons/arrow-up.png" class="img-arup"><div class="shadow"></div><textarea type="text" class="form-control" maxlength="680"></textarea><button class="btn btn-important btn-large J_commentBtn">发 布</button>';
		$(document).on('click','.reply-btns',function(event) {
			var self = this;
			that.currentDiv = $(this).closest('.media');
			that.commentId = $(this).closest('.media').data('comment');//获取commentsId
			that.currentSubox = $(this).closest('.media').find('.submedia');

			
			if(!$(self).data("state")){
				$(self).data({'state':true});			
				$(self).next('.replybox').slideDown('300', function() {
					var replyThis = this;
					$(replyThis).append(_combox);
					$(replyThis).find('.form-control').focus();
					$("html,body").stop().animate({'scrollTop': $(replyThis).offset().top - 50});					
				});
				
			}else{
				$(self).data({'state':false});	
				$(self).next('.replybox').slideUp('300', function() {
					var replyThis = this;
					$(replyThis).empty();
					$("html,body").stop().animate({'scrollTop': $(replyThis).offset().top});
				});
			}
			
			
		});
		// $('.reply-btns').click(function(){
		// 	var _combox = '<img src="http://static.tongshuai.com/r/dev/ts/v1/img/icons/arrow-up.png" class="img-arup"><div class="shadow"></div><textarea type="text" class="form-control" maxlength="680"></textarea><button class="btn btn-important btn-large">发 布</button>';
		// 	if($('.form-control').length){
				
		// 	}			
			
		// 	//
		// })
		
	},
	applyTemplate: function(data,templateId,$el){ 
		var scriptTemplate = $(templateId).html(),
			compiled = _.template(scriptTemplate),
			html = compiled(data);
		$el.append(html);
	},
	saveComment: function(){
		var that = this;
		
		//console.log($('#commentBtn').length);
		$(document).on('click','.J_commentBtn', function(){
			
			var commentContent = $('.form-control',that.currentDiv).val();
			commentContent = $.trim(commentContent);
			
			if(window.isToLogin){ 
				var islogin = window.isToLogin();
				
				if(!islogin) return;
			}else {
				return;
			}

			//debugger
			if(commentContent === ""){ 
				alert('回复内容不能为空');
				return;
			};

			var saveData = {'commentsId': that.commentId, 'replyContent': commentContent};
			var imgUrl = 'http://static.tongshuai.com/r/build/ts/v1/img/pages/comments/damd.jpg';
			that.imgUrl = imgUrl;
			
			$.ajax({ 
				url: '/pc/comment_json/save.html',
				type: 'get',
				data: saveData,
				dataType: 'json',
				success:function(data){
					if(data.success && data.data){
						$('.reply-btns',that.currentDiv).data({'state':false});
						$('.reply-btns',that.currentDiv).next('.replybox').slideUp('300', function() {
							var replyThis = this;
							$(replyThis).empty();
							//$("html,body").stop().animate({'scrollTop': $(replyThis).offset().top});
						});
						var replayData = data.data;				
					    var showBox = $('.submedia',that.currentDiv);
						var isshowBox = !showBox.length;
						var parentBox = that.currentDiv.find('>.media__body');
						var data = {'count':1,'showBox':isshowBox,'data':replayData};
						if(!isshowBox){
							var currentReys = $('.replay-length', that.currentDiv);
							var num = parseInt(currentReys.html());
							var num = Number(currentReys.html()||0);
							currentReys.html(num+1);
							that.applyTemplate(data,'#commentReplayTemplate',showBox);
						}else {
							that.applyTemplate(data,'#commentReplayTemplate',parentBox);
						}
						//var target = $('.submedia',that.currentDiv);
						
					}
					else{ 
						//alert('评论失败！');
					}
				},
				error:function(info){
					
				}
			});

		});
		
	}
};

/*use*/
$(function () {
	tongshuai.products.init();
});

Date.prototype.format = function(format){ 
	var o = { 
		"M+" : this.getMonth()+1, //month 
		"d+" : this.getDate(), //day 
		"h+" : this.getHours(), //hour 
		"m+" : this.getMinutes(), //minute 
		"s+" : this.getSeconds(), //second 
		"q+" : Math.floor((this.getMonth()+3)/3), //quarter 
		"S" : this.getMilliseconds() //millisecond 
	} 
	if(/(y+)/.test(format)) { 
		format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
	} 

	for(var k in o) { 
		if(new RegExp("("+ k +")").test(format)) { 
			format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length)); 
		} 
	} 
	return format; 
}

function updateTime(time){
	var timeStr = time.toString();
	if(/^\d+$/.test(timeStr)){ 
		var date = new Date(parseInt(time));
		if(date){ 
			return date.format('yyyy-MM-dd hh:mm:ss');
		}
	}
	return time;
}

window.updateTime = updateTime;

!function(){ 
	var commentType={ 
		All:'all',
		Praise:'praise',
		Neutral:'neutral',
		Poor:'poor'
	};

	window.paging = {};

	function setPage(productId,type,count,isReset){ 
		if(count<=1) return;
		delete window.paging;
		window.paging = new Paging({ 
			containerId:'pagination',
			//总页数
			pageCount:count,
			//显示页数
			showItemCount:7,
			//头数量
			headCount:2,
			//当前页数（初使化页数）
			currentPage:0,

			pageUrl:'/pc/comment_json/comment.html',
			//pageUrl:'data.json',
			//分页数据请求方式
			requestType:'get',
			//分页数据参数
			requestParam:{'productId':productId,'type':type},
			//pageIndex名称
			requestPageIndexName:'pageId',
			//处理数据
			resetData:function(data){ 
				if(data.success && data.data){ 
					return {'data':data.data};
				}
			},
			//-----------模样相关参数---------
			itemTemplateId:'commentScriptTemplate',
			itemContainerId:'commentsList'
		});
		if(isReset) window.paging.resetPage(1);
	}
	
	var productId = document.getElementById('productId').value;
	
	//全评，中评，好评，差评点击事件
	var $commentsTabUl = $('#commentsTabUl');
	$commentsTabUl.on('click','li.comments-tab',function(){ 
		//debugger;
		var $this = $(this);
		var type = $this.attr('data-type');
		var count = Number($this.attr('data-count') || 0);
		if(type) setPage(productId,type,count,true);
		$('.comments-list.comments-tab-sel',$commentsTabUl).removeClass('comments-tab-sel');
		$('.comments-list',$this).addClass('comments-tab-sel');
		imgbox();
	});

	var allCount = Number($('#commentsTabUl li.comments-tab[data-type="all"]').attr('data-count'));
	setPage(productId,commentType.All,allCount);

}();