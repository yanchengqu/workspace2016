!function(){ 
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

	var clickEvent = "ontouchstart" in window ? "touchend" : "click",
		dom = { 
			moreBtn : $('.viewMore'),
			viewMoreloading : $('.viewMoreloading'),
			productIdHidden : $('#productIdEl'),
			commentList : $('.comment-list'),
			cancelBtn : $('#cancelBtn'),
			replayBtn : $('#replayBtn')
		},
		ajaxUrl = { 
			commentList:{ 
				url:'/mobile/comment_json/comment.html',
				type:'get'
			},
			applyComment:{ 
				url:'/mobile/comment_json/save.html',
				type:'get'
			}
		};
	
	var productId = dom.productIdHidden.val(),	//商品ID
		pageCount = 10,
		pageId = 1;				//当前页码数
	
	var current = $('.comment-count .piece:first-child').attr('data-type');
	/*
	itemId 商品ID
	pageSize 每页记录数
	pageIndex 页数
	*/

	//点击显示更多事件
	dom.moreBtn.on(clickEvent,function(){
		queryComment()
	});

	var imgUrl = 'http://static.tongshuai.com/r/build/ts_h5/v1/img/pages/detail/headerPic.jpg';
	window.imgUrl = imgUrl;

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

	function queryComment(){
		var requestData = {
			'productId': productId,
			'pageId': ++pageId,
			'type':current
		};
		$('.viewMore').hide();
		$('.viewMoreloading').show();
		$.ajax({ 
			url: ajaxUrl.commentList.url,
			type: ajaxUrl.commentList.type,
			data: requestData,
			success:function(data){ 
				data = (data instanceof Object) ? data : JSON.parse(data);
				if(data && data.success && data.data){ 
					window.commentData = data.data;
					applyTemplate('commentScriptTemplate',dom.commentList);
					$('.viewMoreloading').hide();
					if(window.commentData.length>=pageCount){ 
						$('.viewMore').show();
					}
				}
			},
			error:function(){ 
			}
		});
	}

	function addComment(id,content,successcallback,errorcallback){ 
		var requestData = { 
			commentsId: id,
			replyContent: content
		};
		
		$.ajax({ 
			url:ajaxUrl.applyComment.url,
			type:ajaxUrl.applyComment.type,
			data: requestData,
			success:function(data){
				data = (data instanceof Object) ? data : JSON.parse(data);
				if(data.success){
					successcallback && successcallback(data);
				}
				else{ 
					alert('评论失败！');
				}
			},
			error:function(info){
				errorcallback && errorcallback(info);
			}
		});
	}

	function applyTemplate(templateId,el){ 
		var scriptTemplate = $('#'+templateId).html(),
			html = _.template(scriptTemplate),
			divEl = $('<div></div>').html(html);
		el.append(divEl.html());
	}

    $(document).on(clickEvent,'.reply',function(e){ 
    	if(window.isToLogin){ 
    		var islogin = window.isToLogin();
    		if(!islogin) return;
    	} 
    	var currentLi = $(e.target).closest('li');
   		var commentId = currentLi.attr('data-value');
   		if(commentId){ 
   			window.currentCommentId = commentId;
   			window.currentCommentLi = currentLi;
   			showCommentBox();	
   		}
	});

	dom.cancelBtn.on(clickEvent,function(){ 
		cancelCommentBox();
	});

	dom.replayBtn.on(clickEvent,function(){ 
		var commentId = window.currentCommentId,
			replyContent = $('#replyContentBox').val();
		replyContent = replyContent.replace(/(^\s*)|(\s*$)/g, "");
		if(replyContent===""){ 
			 layer.open({
			    content: '回复内容不能为空',
			    shadeClose: false,
			    btn: ['好的']
			});
			return;
		}
		addComment(commentId,replyContent,function(data){
			if(!window.currentCommentLi) return;
			var replayBox = $('.reply-box',window.currentCommentLi);
			if(replayBox.length){ 
				window.rptitem  = data.data;
				window.rptitem.showBox = false;
				var currentSpan = $('div.reply-box>p>span',window.currentCommentLi);
				var olEl = $('ol.box',window.currentCommentLi);
				if(currentSpan && olEl){ 
					var num = parseInt(currentSpan.html());
					currentSpan.html(++num);
					applyTemplate('commentRepeateTemplate',olEl);
				}
			}
			else{ 
				window.rptitem  = data.data;
				window.rptitem.showBox = true;
				applyTemplate('commentRepeateTemplate',window.currentCommentLi);
			}
			cancelCommentBox();
		});
	});

	var top = 0;
	function showCommentBox(){ 
		$('#replyContentBox').val('');
	    $(".doCommentContainer").toggleClass('active');
    	$(".doCommentContainer textarea").value = '';
    	top = $('body').scrollTop();
    	setTimeout(function(){ 
    		$('.commentSlider').hide();
    	},400);
	}

	function cancelCommentBox(){ 
	    $('.commentSlider').show();
	    window.closeComment = true;
    	setTimeout(function(){ 
    		$(".doCommentContainer").toggleClass('active');
    		if(top){ 
    			$('body').scrollTop(top);
    		}
    	},0);
	}

	
	$('.comment-count .piece').on(clickEvent,function(){ 
		$(this).addClass('active').siblings('.piece').removeClass('active')
		var type = $(this).attr('data-type');
		if(type===current) return;
		$('.comment-list>li').remove();
		current = type;
		pageId = 0;
		queryComment();
	});

}();