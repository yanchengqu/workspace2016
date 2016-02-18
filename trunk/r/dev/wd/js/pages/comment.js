!function(){ 
	
	function getLocationParams() {
		var arr = !!location.search.slice(1) ? 
					location.search.slice(1).split('&'): [],
			tmp = {},
			i   = 0,
			len = arr.length;
		if ( !!len ) {
			for ( i; i < len; i++ ) {
				var data = arr[i].split('=');
				tmp[data[0]] = data[1];
			}
		}
		return tmp;
	}

	var url = getLocationParams()['page'];
	
	if ( url ) {
		var pageConfig = window['pageConfig'] = window.pageConfig || {},
			backConfig = pageConfig['back'] = H.isObject(pageConfig['back']) || {};
		backConfig['url'] =  url === 'app_home' ? '#appHome' : false;
	}

	var hdkMode = null;	
	hdk.init("ehaier", function(mode){hdkMode = mode;});

	function G(id){return document.getElementById(id)};
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
			commentList : $('#J_comment .comment'),
			cancelBtn : $('#cancelBtn'),
			replayBtn : $('#replayBtn')
		},
	 	productId = dom.productIdHidden.val(),	//商品ID
		pageCount = 5,							//总数
		pageId = 1,								//当前页码数
		ajaxUrl = { 
			commentList:{ 
				url:'/v2/h5/item/productComment/'+productId+'.json',
				type:'get'
			},
			applyComment:{ 
				url:'/v2/h5/item/commentReply.json',
				type:'post'
			}
		};
		
	var current = $('#J_comment .bar .list__item:first-child').data('type');

	//点击显示更多事件
	dom.moreBtn.on(clickEvent,function(){
		queryComment()
	});

	function updateTime(time){
		if(!time) return "";
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

	//分页查询评论
	function queryComment(){
		var requestData = {
			'productId': productId,
			'pageIndex': ++pageId,
			'commentType':parseInt(current),
			'pageSize':pageCount
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

	//添加评论
	function addComment(id,content,successcallback,errorcallback){ 
		var requestData = { 
			commentId: id,
			commentReply: content
		};
		
		$.ajax({ 
			url:ajaxUrl.applyComment.url,
			type:ajaxUrl.applyComment.type,
			data: requestData,
			success:function(data){
				data = (data instanceof Object) ? data : JSON.parse(data);
				if(data.success){
					//successcallback && successcallback(data);
					$("#return").data('dialog').hide();
					alert('评论成功！');
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
			html = H.Template.template(scriptTemplate),
			divEl = $('<div></div>').html(html);
		el.append(divEl.html());
	}

	//点击回复
    $(document).on(clickEvent,'[data-toggle="dialogCustom"]',function(e){ 
		
		var $this  = $(this),
			$target = $($this.data('target'));

    	if( !hdk.user.isLogin ) {
			hdk.user.auth(function(status, data) {});
			return;
		}

    	var item = $this.closest('.item');
   		var commentId = item.data('value');

   		if(commentId){ 
   			window.currentCommentId = commentId;
   			// window.currentCommentLi = currentLi;
   		}
		
		$target.dialog();
	});

	//回复评论js
	dom.replayBtn.on(clickEvent,function(){ 
		var commentId = window.currentCommentId,
			replyContent = $('#replyContentBox').val();
		replyContent = replyContent.replace(/(^\s*)|(\s*$)/g, "");
		if(replyContent===""){
			alert('请输入回复内容!');
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
			$("#return").data('dialog').hide();
		});
	});

	//评论菜单
	
	$('#J_comment .bar .list__item').on('click', function(event) { 
		event.preventDefault();
		var $this = $(this);
		$this.addClass('cur')
			 .siblings('.list__item').removeClass('cur');
		var type = $this.data('type');
		if( type === current ) return;
		$('#J_comment .comment').empty();
		current = type;
		pageId = 0;
		queryComment();
	});

	//显示主菜单
	
	$('.subnav').on('click',function(evt) { 
		var $this    = $(this),
			itemBody = $this.find('.item-body'),
			iconTip  = $this.find('.fes-chevron-up');
        itemBody.toggleClass('hide');
		iconTip.toggleClass('fes-chevron-down');
    });

	var map = {
		promos: '#promos',
		list: '#list',
		commentSlider: '#J_comment'
	};

	$('.subnav .item-body a').on('click', function(event) {
		event.preventDefault();
		var $this   = $(this),
			target  = $this.data('target').slice(1),
			$target = $(map[target]);
		if ( !$target.hasClass('hide') ) return;
		$target.removeClass('hide');
		$.each(map, function(key, value){
			 ( key != target ) && $(value).addClass('hide')
		});
	});

	var shareBtn = document.querySelector('.nav__share');
	var shareConfig = window['pageConfig'] && window['pageConfig']['share'];
	shareConfig['link'] == '' && ( shareConfig['link'] = location.href )
	if(shareBtn){
		H.Event.tapClick(function(){
			var shareConfig = window['pageConfig'] && window['pageConfig']['share'];
			if(hdkMode==='native' && shareConfig){
				hdk.widget.share(shareConfig, function(status){});				
			}
		},shareBtn);
	H.UA.isWeixin && shareButton.hide();
	}

	hdk.init("ehaier", function(mode) {
		if ( H.UA.isWeixin ) {
			hdk.wechat.setupShare(shareConfig, function (status, type, data) {});
		}
	});	
	
	// 图片延迟加载
	$(window).bind('load', function(){
		$('.lazyload').length > 0 &&
		$('.lazyload').lazyload({
			placeholder_data_img: 'http://static.tongshuai.com/wd/img/placeholder.png'
		});
	});
	
}();
