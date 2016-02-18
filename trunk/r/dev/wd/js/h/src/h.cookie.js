/**
 * @author: Brave
 * @email: u9648u6653u52c7@gmail.com
 * @date: 2014-08-01
 * 
 */

! function (window, document, undefined) {
	
	var Cookie = H.namespace('H.Cookie');
	
	/**
	 * @method set
	 * @namespace Cookie
	 * @param {String} name  
	 * @param {String} value 
	 * @param {string number date} expiredays 
	 * 字符串型表示天数 数字型表示秒数 日期型表示日期对象
	 * @param {String} path
	 * @param {String} domain 
	 * @param {Boolean} secure
	 * @return {Boolean}
	 */

	 Cookie.set = function (name, value, expiredays, path, domain, secure) {

		if (!name || /^(?:expires|max\-age|path|domain|secure)$/i.test(name)) { return false; }
		var expires = '',
			today = new Date();
		if (expiredays) {
			switch (expiredays.constructor) {
			case Number:
				 expires = expiredays === Infinity ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT' : '; max-age=' + expiredays;
				 break;
			case String:
				today.setDate(today.getDate() + expiredays*1);
				expires = '; expires=' + today.toUTCString();
				break;
			case Date:
				expires = '; expires=' + expiredays.toUTCString();
				break;
			}
		}
		document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value) + 
						  expires + 
						  (domain ? '; domain=' + domain : '') + 
					      (path ? '; path=' + path : '') + 
						  (secure ? '; secure' : '');
		return true; 
	 };
	
	/**
	 * @method get
	 * @namespace Cookie
	 * @param {String} name  
	 * @return {String}
	 *
	 */

	 Cookie.get = function (name) {
		
		return decodeURIComponent(
				document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + 
				encodeURIComponent(name).replace(/[\-\.\+\*]/g, '\\$&') +
				'\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || null;
	 };

	/**
	 * @method rm
	 * @namespace Cookie
	 * @param {String} name  
	 * @param {String} path
	 * @param {String} domain 
	 * @return {Boolean}
	 *
	 */

	 Cookie.rm = function (name, path, domain) {
		 
		if (!name || !this.has(name))  return false;     
		document.cookie = encodeURIComponent(name) + 
							'=; expires=Thu, 01 Jan 1970 00:00:00 GMT' + 
							( domain ? '; domain=' + domain : '') + 
							( path ? '; path=' + path : '');
		return true;
	 };
	
	/**
	 * @method has
	 * @namespace Cookie
	 * @param {String} name  
	 * @return {Boolean}
	 *
	 */

	 Cookie.has = function (name) {
		return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(name).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);	 
	 };
	
	/**
	 * cookie 记录的一次性操作
	 * @method once
	 * @namespace Cookie
	 * @param {String} name  
	 * @param {String} value 
	 * @param {string number date} expiredays ［可选］
	 * 字符串型表示天数 数字型表示秒数 日期型表示日期对象
	 * @param {String} path    ［可选］
	 * @param {String} domain  ［可选］
	 * @param {Boolean} secure ［可选］
	 * @param {Function} callback
	 * @return {Boolean}
	 *
	 */

	 Cookie.once = function (name, value, expiredays,path,domain, secure,  callback) {
		 var args = Array.prototype.slice.call(arguments),
			 name = args.shift(),
			 callback = args.pop();
		 if (this.has(name)) return false;
		 this.set(name, args[0], args[1], args[2], args[3], args[4]);
		 callback && typeof callback == 'function' &&  callback();
		 return true;	
	 };

}(window, document);

