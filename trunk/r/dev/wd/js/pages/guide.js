/**
 * @author: 
 * @date: 2015-07-29
 * @description:
 * @site:
 * @require: 
 */

!function(window, $, undefined) {

	var $location = window.location;
	
	var shareConfig = window['pageConfig'] && window['pageConfig']['share'];

	// 轮播图
	var mySwiper = new Swiper('.swiper-container', {
			resizeReInit: true,
			onFirstInit: function(swiper) {
				$(swiper.container).find('img').height(swiper.height);
			}
		});
	
	// 业务逻辑 
	hdk.init("ehaier", function(){
		if ( H.UA.isWeixin ) {
			hdk.wechat.setupShare(shareConfig, function (status, type, data) {});
		}
	});

	$('#J_tap img').bind('click', function() {
		if ( hdk.user.isLogin ) {
			$location.href = "/v2/mstore/wdApply.html";
		} else {
			hdk.user.auth(function(status, data) {
				if ( 'SUCCESS' == status ) {
					$location.href = "/v2/mstore/entrance.html";
				} 
			});
		}
	}); 
	
	document.addEventListener('touchmove', function(event){
		event.preventDefault();
	});

}(this, this.Zepto)
