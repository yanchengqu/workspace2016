/**
 * @author: Brave
 * @email: u9648u6653u52c7@gmail.com
 * @date: 2014-08-01
 * 
 */

! function (window, document, undefined) {
	
	var UA = H.namespace('H.UA');
	
	var u = navigator.userAgent;

	UA.isWeixin = u.indexOf('MicroMessenger')  > -1;
	UA.isHaier  = u.indexOf('HAIER-APP-AGENT') > -1;

}(window, document);

