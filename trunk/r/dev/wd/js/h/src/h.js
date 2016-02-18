/**
 * @author: Brave
 * @email: u9648u6653u52c7@gmail.com
 * @date: 2014-08-01
 *
 */

! function (window, document, undefined) {
	
	/**
	 * @module H
	 */

	var $root = window,
		$doc  = document,
		$location = $root.location;

	var H = {

		version: '1.0.0',
		
		/**
		 * namespace
		 * @method namespace
		 * @param {String}
		 * @return {Object} 自定义的命名空间
		 */

		namespace: function (ns_string) {
			
			var parts = ns_string.split('.'),
				parent = H,
				i = 0;
			if (parts[0] === 'H') {
				parts.shift();
			}

			for (i; i < parts.length; i++) {
				
				if (typeof parent[parts[i]] === 'undefined') {
					parent[parts[i]] = {};
				}
				parent = parent[parts[i]];
			}
			
			return parent;
		},

		/**
		 * @method varType
		 * @param {}
		 * @return {String} 变量类型
		 */

		varType: function (input) {
			var type = /^\[object\s+(\w*)\]$/.exec((this.toString.call(input)).toLowerCase());				
			return type ? type[1] : type; 
		},

		/**
		 * @method isString
		 * @param {}
		 * @return {Boolean}
		 */

		isString: function (input) {
			return typeof input === 'string';
		},
		
		/**
		 * @method isNumber
		 * @param {}
		 * @return {Boolean}
		 */

		isNumber: function (input) {
			return typeof input === 'number';
		},

		/**
		 * @method isBoolean
		 * @param {}
		 * @return {Boolean}
		 */

		isBoolean: function (input) {
			return this.varType(input) === 'boolean';
		},

		/**
		 * @method isUndefined
		 * @param {}
		 * @return {Boolean}
		 */

		isUndefined: function (input) {
			return input === void 0;
		},
		/**
		 * @method isNull
		 * @param {}
		 * @return {Boolean}
		 */

		isNull: function (input) {
			return this.varType(input) == 'null';
		},
		/**
		 * @method isFunction
		 * @param {}
		 * @return {Boolean}
		 */

		isFunction: function (input) {
			return this.varType(input) === 'function';
		},

		
		/**
		 * @method isarray
		 * @param {}
		 * @return {Boolean}
		 */

		isArray: Array.isArray || function (input) {
			return this.varType(input) === 'array';
		},

		/**
		 * @method isRegExp
		 * @param {}
		 * @return {Boolean}
		 */

		isRegExp: function (input) {
			return this.varType(input) === 'regexp';
		},
		/**
		 * @method isObject
		 * @param {}
		 * @return {Boolean}
		 */

		isObject: function (input) {
			return this.varType(input) === 'object';
		},

		/**
		 * @method isDate
		 * @param {}
		 * @return {Boolean}
		 */

		isDate: function (input) {
			return this.varType(input) === 'date';
		},

		/**
		 * 暂时使用内置函数
		 * @method isNaN
		 * @param {}
		 * @return {Boolean}
		 */

		isNaN: isNaN || function (input) {
			return !this.isNumber(input) && input != +input;
		},
		
		/**
		 * 判断数组或者散列表是否含有数据
		 * @method isEmpty
		 * @param {}
		 * @return {Boolean}
		 */

		isEmpty: function (input) {
			
			if (this.isNull(input)) return true;

			if (this.isArray(input) || this.isString(input)) return input.length == 0;

			if (this.isObject(input)) {
				for (var i in input) {
					if (this.has(input,i)) {
						return false;
					}
				}
			}
			
			return true;
		},

		/**
		 * 判断两个数组或者散列表是否含有相同数据
		 * @method isEqual
		 * @param {}
		 * @return {Boolean}
		 */

		isEqual: function (origin, target) {

		},

		/**
		 * 判断是否是DOM节点
		 * @method isDom
		 * @param {}
		 * @return {Boolean}
		 */

		isDom: function (input) {
			return !!(input && input.nodeType === 1);
		},

		/**
		 * 判断数组或散列表是否含有某个key
		 * @method has
		 * @param {Object}
		 * @param {String}
		 * @return {Boolean}
		 */

		has: function (hash, key) {
			return this.hasOwnProperty.call(hash, key);
		},

		/**
		 * @method toString
		 */

		toString: (function () {
			if ($root.toString && typeof $root.toString === 'function') {
				return $root.toString;
			}
			return Object.prototype.toString;
		})(),

		/**
		 * @method hasOwnProperty
		 */

		hasOwnProperty: (function () {
			if ($root.hasOwnProperty && typeof $root.hasOwnProperty === 'function') {
				return $root.hasOwnProperty;
			}
			return Object.prototype.hasOwnProperty;
		})(),

		/**
		 * 过滤掉字符串左边的空格
		 * @method ltrim
		 * @param {String}
		 * @return {String}
		 */

		ltrim: function (input) {
			if (this.isString(input)) {
				return input.replace(/(^\s*)/, '');
			}
		},

		/**
		 * 过滤掉字符串右边的空格
		 * @method ltrim
		 * @param {String}
		 * @return {String}
		 */

		rtrim: function (input) {
			if (this.isString(input)) {
				return input.replace(/(\s*$)/, '');
			}
		},

		/**
		 * 过滤掉字符串两边的空格
		 * @method trim 
		 * @param {String}
		 * @return {String}
		 */

		trim: function (input) {
			if (this.isString(input)) {
				return input.replace(/(^\s*)|(\s*$)/g, '');
			}
		},

		/**
		 * @method each 
		 * @param {Array,Object}
		 * @param {Function}
		 * @param {Object} 
		 * @return {Object}
		 */

		each: function (list, iterator, context) {
			var i = 0,
				length = null;
			if (this.isArray(list)) {
				length = list.length;
				for (i; i < length; i++) {
					if (iterator.call(context,list[i], i, list) === false) {
						break;
					}
				}
			}
			if (this.isObject(list)) {
				for (i in list) {
					if (this.has(list, i)) {
						if (iterator.call(context,list[i], i, list) === false) {
							break;
						}
					}
				}	
			}
			
			return list;
		},
		/**
		 * 
		 * @method merge 
		 * @param {Object}
		 * @param {Object}
		 * @return {Object}
		 */

		merge: function (origin, target) {
			if (!this.isObject(origin)) return origin;
			this.each(target,function (value, key) {
				origin[key] = value;
			});
			return origin;
		},

		/**
		 * 
		 * @method clone 
		 * @param {Object}
		 * @return {Object}
		 */

		clone: function (obj) {
			return this.isObject(obj) ? this.merge({},obj) : obj;
		},

		/**
		 * 
		 * @method indexOf 
		 * @param {Array}
		 * @param {String,Number}
		 * @param {Number}
		 * @return {Number}
		 */

		indexOf: (function () {
			var nativeIndexOf =  Array.prototype.indexOf;
			if ( nativeIndexOf ) {
				return function (array, item, fromIndex) {
					return nativeIndexOf.call(array, item, fromIndex)	
				}
			}
			return function (array, item, fromIndex) {
				var i = +fromIndex || 0,
					length = array && array.length;
				if ( !this.isArray(array) || length === 0 || Math.abs(i) > length) return -1;
				i = Math.max(i >= 0 ? i : length - Math.abs(i), 0)
				while ( i < length ) {					
					if (array[i] === item) return i;
					i++;
				}
				return -1;
			} 

		})(),

		/**
		 * 
		 * @method lastIndexoF 
		 * @param {Array}
		 * @param {String,Number}
		 * @param {Number}
		 * @return {Number}
		 */

		lastIndexOf: (function () {
			var nativeLastIndexOf =  Array.prototype.lastIndexOf;
			if ( nativeLastIndexOf ) {
				return function (array, item, fromIndex) {
					return nativeLastIndexOf.call(array, item, fromIndex ? fromIndex : array.length-1)	
				}
			}
			return function (array, item, fromIndex) {
				var i = +fromIndex || 1,
					length = array && array.length;
				if ( !this.isArray(array) || length === 0 || Math.abs(i) > length) return -1;
				i = Math.max(i > 1 ? i : length - Math.abs(i), 0);
				while ( i >=0 ) {					
					if (array[i] === item) return i;
					i--;
				}
				return -1;
			} 
		})(),

		noConflict: function (deep) {
			$root._ = void 0;
			if (deep) {
				$root.H = void 0;
			}
			return H;
		}
	};

	$root.H = $root._ = H;


}(window, document); 
