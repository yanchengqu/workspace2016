/**
 * @author: Brave
 * @email: u9648u6653u52c7@gmail.com
 * @date: 2014-08-04
 * 
 */

! function (window, document, undefined) {
	
	var User = H.namespace('H.User');

	function getUserStatus () {

		var status = null;

		if ( H.Cookie.has('dev_ehaier_loginstate') ) {
			status = H.Cookie.get('dev_ehaier_loginstate');
		} else if ( H.Cookie.has('mtest_ehaier_loginstate') ) {
			status = H.Cookie.get('mtest_ehaier_loginstate');
		} else if (  H.Cookie.has('m_ehaier_loginstate') ) {
			status = H.Cookie.get('m_ehaier_loginstate');
		} else {
			return false;
		}

		if ( status == 'true' ) {
		 	return true;
		} else {
		 	return false;
		}
	}

	User.isLogin = getUserStatus();
	
	User.login = function(){
		if ( !User.isLogin ) {						
			if ( H.UA.isHaier && window['hdk'] ) {
				hdk.user.auth(function(status, data) {

				});
			} else  {
				// 返回站点首页
				window.location.href="/";
			}
		}
	};

	User.refresh = function() {
		User.isLogin = getUserStatus();
	};


}(window, document);

