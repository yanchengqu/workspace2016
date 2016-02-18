/**
 * @author: zjliu
 * @email: zjliu2015@gmail.com
 * @date: 2015-08-21
 * 
 */
!function(win,doc){
	if(!win.H) return;
 	var lazyload = H.namespace('H.LazyLoad');
 	function init(callback){
 		var $win = $(win),$doc=$(doc),isOK=true;
 		win.addEventListener('scroll',function(){
			if(!isOK) return; isOK=false;
			var scrollTop = $win.scrollTop(),
				scrollHeight = $doc.height(),
				windowHeight = $win.height();
			if(scrollTop+windowHeight===scrollHeight){
				callback && callback();
			}
			isOK=true;
 		});
	}
	lazyload.init = init;
}(this,document);