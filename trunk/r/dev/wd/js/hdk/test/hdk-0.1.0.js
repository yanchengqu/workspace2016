/*!
 * JavaScript Cookie v2.0.3
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		define(factory);
	} else if (typeof exports === 'object') {
		module.exports = factory();
	} else {
		var _OldCookies = window.Cookies;
		var api = window.Cookies = factory();
		api.noConflict = function () {
			window.Cookies = _OldCookies;
			return api;
		};
	}
}(function () {
	function extend () {
		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			var attributes = arguments[ i ];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function init (converter) {
		function api (key, value, attributes) {
			var result;

			// Write

			if (arguments.length > 1) {
				attributes = extend({
					path: '/'
				}, api.defaults, attributes);

				if (typeof attributes.expires === 'number') {
					var expires = new Date();
					expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
					attributes.expires = expires;
				}

				try {
					result = JSON.stringify(value);
					if (/^[\{\[]/.test(result)) {
						value = result;
					}
				} catch (e) {}

				value = encodeURIComponent(String(value));
				value = value.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);

				key = encodeURIComponent(String(key));
				key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
				key = key.replace(/[\(\)]/g, escape);

				return (document.cookie = [
					key, '=', value,
					attributes.expires && '; expires=' + attributes.expires.toUTCString(), // use expires attribute, max-age is not supported by IE
					attributes.path    && '; path=' + attributes.path,
					attributes.domain  && '; domain=' + attributes.domain,
					attributes.secure ? '; secure' : ''
				].join(''));
			}

			// Read

			if (!key) {
				result = {};
			}

			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling "get()"
			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var rdecode = /(%[0-9A-Z]{2})+/g;
			var i = 0;

			for (; i < cookies.length; i++) {
				var parts = cookies[i].split('=');
				var name = parts[0].replace(rdecode, decodeURIComponent);
				var cookie = parts.slice(1).join('=');

				if (cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					cookie = converter && converter(cookie, name) || cookie.replace(rdecode, decodeURIComponent);

					if (this.json) {
						try {
							cookie = JSON.parse(cookie);
						} catch (e) {}
					}

					if (key === name) {
						result = cookie;
						break;
					}

					if (!key) {
						result[name] = cookie;
					}
				} catch (e) {}
			}

			return result;
		}

		api.get = api.set = api;
		api.getJSON = function () {
			return api.apply({
				json: true
			}, [].slice.call(arguments));
		};
		api.defaults = {};

		api.remove = function (key, attributes) {
			api(key, '', extend(attributes, {
				expires: -1
			}));
		};

		api.withConverter = init;

		return api;
	}

	return init();
}));

/*
 * jQuery.Deferred stand alone.
 *
 */

/*!
 * jQuery JavaScript Library v1.8.3
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2012 jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: Tue Nov 13 2012 08:20:33 GMT-0500 (Eastern Standard Time)
 */
(function (window, undefined) {
	// Save a reference to some core methods
	var core_push = Array.prototype.push,
		core_slice = Array.prototype.slice,
		core_indexOf = Array.prototype.indexOf,
		core_toString = Object.prototype.toString,
		core_hasOwn = Object.prototype.hasOwnProperty,
		core_trim = String.prototype.trim,
		core_rspace = /\s+/,
		class2type = [],
	// Map over Deferred in case of overwrite
		_Deferred = window.Deferred,
	// Map over the $ in case of overwrite
		_$ = window.$,

		/**** actually Deferred isnt called as a function, but i decided to mantain it,
		 to keep the code as much untouched as possible ***/

			// Define a local copy of Deferred
		Deferred = function (selector) {

			//alert us that this is an special version
			if (selector)
				throw "This is the stand alone version of Deferred.Deferred there isn't support for selectors, use Deferred.noConflict() and include a complete Deferred";
			// The Deferred object is actually just the init constructor 'enhanced'
			return new Deferred.fn.init();
		};

	Deferred.fn = Deferred.prototype = {
		constructor: Deferred,
		init: function () {
			return this;
		},
		each: function (callback, args) {
			return Deferred.each(this, callback, args);
		}
	};

	Deferred.extend = Deferred.fn.extend = function () {
		var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {},
			i = 1,
			length = arguments.length,
			deep = false;

		// Handle a deep copy situation
		if (typeof target === "boolean") {
			deep = target;
			target = arguments[1] || {};
			// skip the boolean and the target
			i = 2;
		}

		// Handle case when target is a string or something (possible in deep copy)
		if (typeof target !== "object" && !Deferred.isFunction(target)) {
			target = {};
		}

		// extend Deferred itself if only one argument is passed
		if (length === i) {
			target = this;
			--i;
		}

		for (; i < length; i++) {
			// Only deal with non-null/undefined values
			if ((options = arguments[i]) != null) {
				// Extend the base object
				for (name in options) {
					src = target[name];
					copy = options[name];

					// Prevent never-ending loop
					if (target === copy) {
						continue;
					}

					// Recurse if we're merging plain objects or arrays
					if (deep && copy && (Deferred.isPlainObject(copy) || (copyIsArray = Deferred.isArray(copy)))) {
						if (copyIsArray) {
							copyIsArray = false;
							clone = src && Deferred.isArray(src) ? src : [];

						} else {
							clone = src && Deferred.isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						target[name] = Deferred.extend(deep, clone, copy);

						// Don't bring in undefined values
					} else if (copy !== undefined) {
						target[name] = copy;
					}
				}
			}
		}

		// Return the modified object
		return target;
	};

	var optionsCache = {};

	function createOptions(options) {
		var object = optionsCache[options] = {};
		Deferred.each(options.split(core_rspace), function (_, flag) {
			object[flag] = true;
		});
		return object;
	}


	Deferred.extend({
		noConflict: function (deep) {
			if (window.$ === Deferred) {
				window.$ = _$;
			}

			if (deep && window.Deferred === Deferred) {
				window.Deferred = _Deferred;
			}

			return Deferred;
		},
		inArray: function (elem, arr, i) {
			var len;

			if (arr) {
				if (core_indexOf) {
					return core_indexOf.call(arr, elem, i);
				}

				len = arr.length;
				i = i ? i < 0 ? Math.max(0, len + i) : i : 0;

				for (; i < len; i++) {
					// Skip accessing in sparse arrays
					if (i in arr && arr[i] === elem) {
						return i;
					}
				}
			}

			return -1;
		},
		type: function (obj) {
			return obj == null ? String(obj) : class2type[core_toString.call(obj)] || "object";
		},
		isFunction: function (obj) {
			return Deferred.type(obj) === "function";
		},
		each: function (obj, callback, args) {
			var name, i = 0,
				length = obj.length,
				isObj = length === undefined || Deferred.isFunction(obj);

			if (args) {
				if (isObj) {
					for (name in obj) {
						if (callback.apply(obj[name], args) === false) {
							break;
						}
					}
				} else {
					for (; i < length;) {
						if (callback.apply(obj[i++], args) === false) {
							break;
						}
					}
				}

				// A special, fast, case for the most common use of each
			} else {
				if (isObj) {
					for (name in obj) {
						if (callback.call(obj[name], name, obj[name]) === false) {
							break;
						}
					}
				} else {
					for (; i < length;) {
						if (callback.call(obj[i], i, obj[i++]) === false) {
							break;
						}
					}
				}
			}

			return obj;
		}

	});


	// Populate the class2type map
	Deferred.each("Boolean Number String Function Array Date RegExp Object".split(" "), function (i, name) {
		class2type["[object " + name + "]"] = name.toLowerCase();
	});


	Deferred.Callbacks = function (options) {

		// Convert options from String-formatted to Object-formatted if needed
		// (we check in cache first)
		options = typeof options === "string" ? (optionsCache[options] || createOptions(options)) : Deferred.extend({}, options);

		var // Last fire value (for non-forgettable lists)
			memory,
		// Flag to know if list was already fired
			fired,
		// Flag to know if list is currently firing
			firing,
		// First callback to fire (used internally by add and fireWith)
			firingStart,
		// End of the loop when firing
			firingLength,
		// Index of currently firing callback (modified by remove if needed)
			firingIndex,
		// Actual callback list
			list = [],
		// Stack of fire calls for repeatable lists
			stack = !options.once && [],
		// Fire callbacks
			fire = function (data) {
				memory = options.memory && data;
				fired = true;
				firingIndex = firingStart || 0;
				firingStart = 0;
				firingLength = list.length;
				firing = true;
				for (; list && firingIndex < firingLength; firingIndex++) {
					if (list[firingIndex].apply(data[0], data[1]) === false && options.stopOnFalse) {
						memory = false; // To prevent further calls using add
						break;
					}
				}
				firing = false;
				if (list) {
					if (stack) {
						if (stack.length) {
							fire(stack.shift());
						}
					} else if (memory) {
						list = [];
					} else {
						self.disable();
					}
				}
			},
		// Actual Callbacks object
			self = {
				// Add a callback or a collection of callbacks to the list
				add: function () {
					if (list) {
						// First, we save the current length
						var start = list.length;
						(function add(args) {
							Deferred.each(args, function (_, arg) {
								var type = Deferred.type(arg);
								if (type === "function") {
									if (!options.unique || !self.has(arg)) {
										list.push(arg);
									}
								} else if (arg && arg.length && type !== "string") {
									// Inspect recursively
									add(arg);
								}
							});
						})(arguments);
						// Do we need to add the callbacks to the
						// current firing batch?
						if (firing) {
							firingLength = list.length;
							// With memory, if we're not firing then
							// we should call right away
						} else if (memory) {
							firingStart = start;
							fire(memory);
						}
					}
					return this;
				},
				// Remove a callback from the list
				remove: function () {
					if (list) {
						Deferred.each(arguments, function (_, arg) {
							var index;
							while ((index = Deferred.inArray(arg, list, index)) > -1) {
								list.splice(index, 1);
								// Handle firing indexes
								if (firing) {
									if (index <= firingLength) {
										firingLength--;
									}
									if (index <= firingIndex) {
										firingIndex--;
									}
								}
							}
						});
					}
					return this;
				},
				// Control if a given callback is in the list
				has: function (fn) {
					return Deferred.inArray(fn, list) > -1;
				},
				// Remove all callbacks from the list
				empty: function () {
					list = [];
					return this;
				},
				// Have the list do nothing anymore
				disable: function () {
					list = stack = memory = undefined;
					return this;
				},
				// Is it disabled?
				disabled: function () {
					return !list;
				},
				// Lock the list in its current state
				lock: function () {
					stack = undefined;
					if (!memory) {
						self.disable();
					}
					return this;
				},
				// Is it locked?
				locked: function () {
					return !stack;
				},
				// Call all callbacks with the given context and arguments
				fireWith: function (context, args) {
					args = args || [];
					args = [context, args.slice ? args.slice() : args];
					if (list && (!fired || stack)) {
						if (firing) {
							stack.push(args);
						} else {
							fire(args);
						}
					}
					return this;
				},
				// Call all the callbacks with the given arguments
				fire: function () {
					self.fireWith(this, arguments);
					return this;
				},
				// To know if the callbacks have already been called at least once
				fired: function () {
					return !!fired;
				}
			};

		return self;
	};

	Deferred.extend({
		create: function (func) {
			var tuples = [
					// action, add listener, listener list, final state
					["resolve", "done", Deferred.Callbacks("once memory"), "resolved"],
					["reject", "fail", Deferred.Callbacks("once memory"), "rejected"],
					["notify", "progress", Deferred.Callbacks("memory")]
				],
				state = "pending",
				promise = {
					state: function () {
						return state;
					},
					always: function () {
						deferred.done(arguments).fail(arguments);
						return this;
					},
					then: function (/* fnDone, fnFail, fnProgress */) {
						var fns = arguments;
						return Deferred.Deferred(function (newDefer) {
							Deferred.each(tuples, function (i, tuple) {
								var action = tuple[0],
									fn = fns[i];
								// deferred[ done | fail | progress ] for forwarding actions to
								// newDefer
								deferred[tuple[1]](Deferred.isFunction(fn) ?
									function () {
										var returned = fn.apply(this, arguments);
										if (returned && Deferred.isFunction(returned.promise)) {
											returned.promise().done(newDefer.resolve).fail(newDefer.reject).progress(newDefer.notify);
										} else {
											newDefer[action + "With"](this === deferred ? newDefer : this, [returned]);
										}
									} : newDefer[action]);
							});
							fns = null;
						}).promise();
					},
					// Get a promise for this deferred
					// If obj is provided, the promise aspect is added to the object
					promise: function (obj) {
						return obj != null ? Deferred.extend(obj, promise) : promise;
					}
				},
				deferred = {};

			// Keep pipe for back-compat
			promise.pipe = promise.then;

			// Add list-specific methods
			Deferred.each(tuples, function (i, tuple) {
				var list = tuple[2],
					stateString = tuple[3];

				// promise[ done | fail | progress ] = list.add
				promise[tuple[1]] = list.add;

				// Handle state
				if (stateString) {
					list.add(function () {
						// state = [ resolved | rejected ]
						state = stateString;

						// [ reject_list | resolve_list ].disable; progress_list.lock
					}, tuples[i ^ 1][2].disable, tuples[2][2].lock);
				}

				// deferred[ resolve | reject | notify ] = list.fire
				deferred[tuple[0]] = list.fire;
				deferred[tuple[0] + "With"] = list.fireWith;
			});

			// Make the deferred a promise
			promise.promise(deferred);

			// Call given func if any
			if (func) {
				func.call(deferred, deferred);
			}

			// assign id
			promise.id = deferred.id = new Date().getTime() + Math.floor((Math.random() - 0.5) * 100);

			// All done!
			return deferred;
		},

		// Deferred helper
		when: function (subordinate /* , ..., subordinateN */) {
			var i = 0,
				resolveValues = core_slice.call(arguments),
				length = resolveValues.length,

			// the count of uncompleted subordinates
				remaining = length !== 1 || (subordinate && Deferred.isFunction(subordinate.promise)) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use
			// that.
				deferred = remaining === 1 ? subordinate : Deferred.Deferred(),

			// Update function for both resolve and progress values
				updateFunc = function (i, contexts, values) {
					return function (value) {
						contexts[i] = this;
						values[i] = arguments.length > 1 ? core_slice.call(arguments) : value;
						if (values === progressValues) {
							deferred.notifyWith(contexts, values);
						} else if (!(--remaining)) {
							deferred.resolveWith(contexts, values);
						}
					};
				},

				progressValues, progressContexts, resolveContexts;

			// add listeners to Deferred subordinates; treat others as resolved
			if (length > 1) {
				progressValues = new Array(length);
				progressContexts = new Array(length);
				resolveContexts = new Array(length);
				for (; i < length; i++) {
					if (resolveValues[i] && Deferred.isFunction(resolveValues[i].promise)) {
						resolveValues[i].promise().done(updateFunc(i, resolveContexts, resolveValues)).fail(deferred.reject).progress(updateFunc(i, progressContexts, progressValues));
					} else {
						--remaining;
					}
				}
			}

			// if we're not waiting on anything, resolve the master
			if (!remaining) {
				deferred.resolveWith(resolveContexts, resolveValues);
			}

			return deferred.promise();
		}
	});

	// Expose Deferred to the global object
	window.Deferred = Deferred;

})(window);

/**
 * 基本工具函数
 *
 * Partially copied from jQuery
 */
utils = {

	type: function (obj) {

		if (obj == null) {
			return obj + "";
		}
		// Support: Android<4.0 (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function"
			? "object" : typeof obj;
	},

	inArray: function (elem, arr, i) {
		return arr == null ? -1 : indexOf.call(arr, elem, i);
	},

	isFunction: function (obj) {
		return utils.type(obj) === "function";
	},

	isPlainObject: function (obj) {

		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - DOM nodes
		// - window
		if (type(obj) !== "object" || obj.nodeType || utils.isWindow(obj)) {
			return false;
		}

		//if (obj.constructor && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
		//	return false;
		//}

		// If the function hasn't returned already, we're confident that
		// |obj| is a plain object, created by {} or constructed with new Object
		return true;
	},

	isWindow: function (obj) {
		return obj != null && obj === obj.window;
	},

	extend: function () {
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[0] || {},
			i = 1,
			length = arguments.length,
			deep = false;

		// Handle a deep copy situation
		if (typeof target === "boolean") {
			deep = target;

			// Skip the boolean and the target
			target = arguments[i] || {};
			i++;
		}

		// Handle case when target is a string or something (possible in deep copy)
		if (typeof target !== "object" && !utils.isFunction(target)) {
			target = {};
		}

		// Extend itself if only one argument is passed
		if (i === length) {
			target = this;
			i--;
		}

		for (; i < length; i++) {
			// Only deal with non-null/undefined values
			if ((options = arguments[i]) != null) {
				// Extend the base object
				for (name in options) {
					src = target[name];
					copy = options[name];

					// Prevent never-ending loop
					if (target === copy) {
						continue;
					}

					// Recurse if we're merging plain objects or arrays
					if (deep && copy && ( utils.isPlainObject(copy) ||
						(copyIsArray = Array.isArray(copy)) )) {

						if (copyIsArray) {
							copyIsArray = false;
							clone = src && Array.isArray(src) ? src : [];

						} else {
							clone = src && utils.isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						target[name] = extend(deep, clone, copy);

						// Don't bring in undefined values
					} else if (copy !== undefined) {
						target[name] = copy;
					}
				}
			}
		}

		// Return the modified object
		return target;
	},

	detectOS: function () {
		var sUserAgent = navigator.userAgent;
		var isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows");
		var isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel");
		if (isMac) return "macos";
		var isUnix = (navigator.platform == "X11") && !isWin && !isMac;
		if (isUnix) return "unix";
		var isLinux = (String(navigator.platform).indexOf("Linux") > -1);
		if (isLinux) return "linux";
		if (isWin) return "windows";
		return "unknown";
	},

	detectBrowser: function () {
		if (navigator.userAgent.indexOf('MicroMessenger') > 0) {
			return 'wechat';
		}

		return 'browser';
	}

};

/**
 * Haier Develop Kit
 *
 */
hdk = {

	initialized: false,

	/**
	 * TRUE:支持native runtime, FALSE:不支持native runtime
	 */
	support: false,

	/**
	 * 模式: browser native
	 */
	mode: null,

	/**
	 * String 初始化状态
	 */
	status: null,

	/**
	 * 系统名称: android, ios, macos, linux, windows
	 */
	osName: null,

	/**
	 * 系统版本号
	 */
	osVersion: null,

	/**
	 * native方法绑定, 目前支持android和iOS. 其他模式下为空
	 * <ul>
	 * <li>android 通过WebView#addJavascriptInterface()方法实现绑定.</li>
	 * <li>iOS</li>
	 * </ul>
	 */
	binding: {},

	config: {},

	/**
	 * 日志. 日志默认使用console.log()输出. 在Android WebView内会自动输出到logcat.
	 */
	log: {
		/**
		 * TRUE:输出日志, FALSE:不输出日志
		 */
		enabled: false,

		/**
		 * 使用window.alert()输出日志. 在无法查看系统内部日志的情况下使用.
		 */
		useAlert: false,

		/**
		 * 打印INFO日志
		 */
		info: function () {
			var msg = '';
			for (var i in arguments) { msg += arguments[i] + ' '}
			if (this.enabled) { if (this.useAlert) alert('[INFO] ' + msg); else console.info(msg) }
		},

		/**
		 * 打印WARN日志
		 */
		warn: function () {
			var msg = '';
			for (var i in arguments) { msg += arguments[i] + ' '}
			if (this.enabled) { if (this.useAlert) alert('[WARN] ' + msg); else console.warn(msg) }
		},

		/**
		 * 打印ERROR日志
		 */
		error: function () {
			var msg = '';
			for (var i in arguments) { msg += arguments[i] + ' '}
			if (this.enabled) { if (this.useAlert) alert('[ERROR] ' + msg); else console.error(msg) }
		}
	},

	modules: {},

	/**
	 * 扩展module, 初始化完成后可通过hdk.[module名称]使用模块的方法
	 *
	 * @param name module名称
	 * @param m Object module实现
	 */
	module: function (name, m) {

		this.modules[name] = m;
	},

	/**
	 * 初始化hdk.初始化完成后可以使用hdk.[module名称]调用各个模块的方法
	 *
	 * @param appId 轻应用的唯一id
	 * @param callback 初始化结束后的回调函数
	 */
	init: function (appId, callback) {

		var completed = function () {

			//document.removeEventListener("DOMContentLoaded", completed, false);
			window.removeEventListener("load", completed, false);

			if (hdk.initialized) return;

			setTimeout(function () {
				hdk.log.info("initializing HDK:", "appId=" + appId);

				var modules = ['all']; // hack
				if (modules.length == 1 && modules[0] == 'all') {

					modules.splice(0, 1);
					for (var mm in hdk.modules) {
						modules.push(mm);
					}
				}

				hdk.binding.runtime = window.jsbinding_runtime;
				for (var i in modules) {
					var name = modules[i];
					hdk.binding[name] = window['jsbinding_' + name];
				}


				hdk.initialized = true;

				if (hdk.binding.runtime == undefined) {

					hdk.log.info('native runtime not found');
					hdk.support = false;
					hdk.mode = utils.detectBrowser();
					hdk.osName = utils.detectOS();
					hdk.osVersion = "";

				} else {

					var ret = hdk.binding.runtime.initialize(appId, modules);
					var obj = JSON.parse(ret);
					obj.support = true;
					obj.mode = 'native';

					utils.extend(hdk, obj);
				}

				// BEGIN config
				hdk.config.webApi = {};
				hdk.config.webApi.host = 'http://m.ehaier.com';
				// END config

				// BEGIN load modules
				hdk.log.info("init modules: " + modules);
				for (var i in modules) {

					var m = modules[i];
					var mod = {};
					mod[m] = hdk.modules[m];

					if (mod[m]) {
						utils.extend(hdk, mod);
						if ((typeof hdk[m].init) == 'function')
							hdk[m].init();
					} else {
						hdk.log.error('Unknown module: ' + m);
					}
				}

				// END load modules
				hdk.status = 'SUCCESS';
				hdk.log.info("HDK initialized successfully.");
				callback(hdk.mode);
			}, 0);
		};

		if (document.readyState === "complete") {
			setTimeout(completed, 0);
		} else {
			//document.addEventListener("DOMContentLoaded", completed, false);
			window.addEventListener("load", completed, false);
		}
	},

	closeView: function () {
		try {
			hdk.binding.runtime.goClose();
		} catch (e) {
			hdk.log.error("hdk.closeView unsupported");
		}
	},

	pendingResults: {},

	/**
	 * 由本地Framework调用返回结果
	 * @param id    结果id
	 * @param status 结果状态
	 * @param jsonData 额外的数据(JSON字符串形式)
	 */
	fireResult: function (id, status, jsonData) {

		if (hdk.pendingResults.hasOwnProperty(id)) {

			var deferred = hdk.pendingResults[id];
			var finalData = deferred.data == null ? {} : deferred.data;
			if (jsonData != null && jsonData != '') {
				utils.extend(finalData, JSON.parse(jsonData));
			}
			deferred.resolve(status, finalData);
			delete hdk.pendingResults[id];

		} else {

			hdk.log.warn("Pending result id=" + id + " not found.");
		}
	}

};

// AMD support
if (typeof define === 'function' && define.amd) define(hdk);

/**
 * HDK module: 设备
 */
hdk.module('device', {

	init: function () {
		navigator.vibrate =
			navigator.vibrate
			|| navigator.webkitVibrate
			|| navigator.mozVibrate
			|| navigator.msVibrate;

		if (navigator.vibrate)
			hdk.log.info("browser supports vibrate API");
		else
			hdk.log.info("browser does not support vibrate API");
	},

	/**
	 * 摇一摇
	 * @param timeout 超时时间(ms)
	 * @param callback 回调
	 */
	shake: function (timeout, callback) {


		var deferred = Deferred.create();
		deferred.always(callback);

		if (hdk.support) {
			hdk.binding.device.shake(deferred.id, timeout);
			hdk.pendingResults[deferred.id] = deferred;

		} else {
			if (window.DeviceMotionEvent) {

				var last_update = 0;
				var x = y = z = last_x = last_y = last_z = 0;

				var handled = false;
				var handler = function (evt) {

					var acceleration = evt.accelerationIncludingGravity;
					var curTime = new Date().getTime();
					if ((curTime - last_update) > 100) {
						var diffTime = curTime - last_update;
						last_update = curTime;
						x = acceleration.x;
						y = acceleration.y;
						z = acceleration.z;
						var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;

						if (speed > 3000) {
							handled = true;

							if (navigator.vibrate) navigator.vibrate(500);

							deferred.resolve('SUCCESS');
							window.removeEventListener('devicemotion', handler);

						}
						last_x = x;
						last_y = y;
						last_z = z;
					}
				};
				window.addEventListener('devicemotion', handler, false);
				setTimeout(function () {
					window.removeEventListener('devicemotion', handler);
					if (!handled) {
						deferred.reject('TIMEOUT');
					}
				}, timeout);

			} else {
				deferred.reject('UNSUPPORTED');
			}
		}
	},

	/**
	 * 获取网络状态类型
	 * @param callback
	 */
	network: function (callback) {

		if (hdk.support) {
			var ret = hdk.binding.device.getNetWorkType();
			callback(ret);
			return true;
		} else {
			hdk.log.warn('hdk.device.network not supported in web mode');
			return false;
		}
	}
	,

	/**
	 * 异步调用扫描二维码需要返回结果
	 *
	 * @param callback
	 */
	scanQRCode: function (callback) {

		var deferred = Deferred.create();
		deferred.always(callback);

		if (hdk.support) {
			hdk.pendingResults[deferred.id] = deferred;
			hdk.binding.device.scanQRCode(deferred.id);
		} else {
			hdk.log.warn('hdk.device.scanQRCode not supported in web mode');
			deferred.reject('UNSUPPORTED');
		}
	}
	,

	/**
	 * 异步调用获取位置返回结果
	 *
	 * @param callback
	 */
	requireLocation: function (callback) {

		var deferred = Deferred.create();
		deferred.always(callback);

		if (hdk.support) {
			hdk.pendingResults[deferred.id] = deferred;
			hdk.binding.device.getLocation(deferred.id);
		} else {
			hdk.log.warn('hdk.device.getLocation not supported in web mode');
			deferred.reject('UNSUPPORTED');
		}
	}

});

/**
 * HDK module: 支付
 */
hdk.module('event', {

	defaultEventHandlers: {},

	eventHandlers: {},

	init: function () {

		hdk.event.defaultEventHandlers['backButtonClicked'] = function () { window.history.go(-1);}
	},

	fireEvent: function (event, jsonData) {
		var handler = hdk.event.eventHandlers[event];
		var defaultHandler = hdk.event.defaultEventHandlers[event];
		if (handler)
			handler(jsonData);
		else if (defaultHandler) {
			defaultHandler(jsonData);
		}
	},

	on: function (event, handler) {
		hdk.event.eventHandlers[event] = handler;
	}

});

/**
 * HDK module: 支付
 */
hdk.module('pay', {

	/**
	 * 异步调用本地支付SDK进行支付
	 * @param method
	 * @param order
	 * @param callback
	 * @returns {boolean}
	 */
	create: function (method, order, callback) {

		var deferred = Deferred.create();
		deferred.always(callback);

		if (hdk.support) {

			var valid = true;
			valid &= order.hasOwnProperty('orderNo');
			valid &= order.hasOwnProperty('title');
			valid &= order.hasOwnProperty('desc');
			valid &= order.hasOwnProperty('amount');

			if (!valid) {
				hdk.log.error('order is missing some property');
				deferred.reject('ERROR', order);
			} else {

				deferred.data = order;

				hdk.pendingResults[deferred.id] = deferred;

				hdk.binding.pay.create(
					deferred.id, method, order.orderNo, order.title, order.desc, order.amount);
			}

		} else {
			hdk.log.error("only work in native mode");
			deferred.reject('UNSUPPORTED', order);
		}
	}

});

/**
 * module: 用户
 */
hdk.module('user', {

	init: function () {
		//WEB widget url

		hdk.config.webApi.host = 'http://mtest.ehaier.com';
		hdk.config.webApi.pathLogin = '/v2/platform/web/widget/login.html';
		hdk.config.webApi.pathRegister = '/v2/platform/web/widget/register.html';
		hdk.config.webApi.pathResetPassword = '/v2/platform/web/widget/retrievePasswd.html';
		hdk.config.webApi.logout = '/v2/platform/web/member/logout.json';

		hdk.user.isLogin = false;
		hdk.user.info = undefined;

		if (hdk.mode == 'native') { // 根据原生信息判断是否登录

			if (hdk.loginData && hdk.loginData != "") {
				hdk.user.isLogin = true;
				hdk.user.info = JSON.parse(hdk.loginData);
				Cookies.set(hdk.user.info.sessionKey, hdk.user.info.sessionValue,
					{expires: 14, path: '/'});
				Cookies.set('hdk_user', JSON.stringify(hdk.loginData), {expires: 14, path: '/'});
			} else {
				hdk.log.info('native is not logged in. remove cookies');
				Cookies.remove('hdk_user', {path: '/'});
			}

		} else { // 根据 cookie 'hdk_user'判断是否登录
			var value = Cookies.get('hdk_user');
			if (value != undefined) {
				hdk.user.isLogin = true;
				hdk.user.info = JSON.parse(value);
			}
		}

	},

	/**
	 * 异步调用本地登录界面. 该方法可以在browser模式下使用.
	 *
	 * @param callback
	 */
	auth: function (callback) {

		var deferred = Deferred.create();
		deferred.always(function (status, data) {

			if (status === 'SUCCESS') {
				if (data && data.sessionKey && data.sessionValue) { //登录成功
					Cookies.set(data.sessionKey, data.sessionValue, {expires: 14, path: '/'});
					Cookies.set('hdk_user', JSON.stringify(data), {expires: 14, path: '/'});
					callback('SUCCESS', data);
				} else {
					callback('ERROR', data);
				}
			} else {
				callback(status, data);
			}
		});

		if (hdk.support) {

			hdk.pendingResults[deferred.id] = deferred;
			hdk.binding.user.auth(deferred.id);

		} else {
			var array = [];
			array.push(window.location.href);
			Cookies.set('hdk_url_from', JSON.stringify(array), {expires: 1, path: '/'});
			window.location.href = hdk.config.webApi.host + hdk.config.webApi.pathLogin;
		}
	},

	/**
	 * 异步调用本地注册界面. 该方法可以在browser模式下使用.
	 *
	 * @param callback
	 */
	register: function (callback) {

		var deferred = Deferred.create();
		deferred.always(callback);

		if (hdk.support) {

			hdk.pendingResults[deferred.id] = deferred;
			hdk.binding.user.register(deferred.id);

		} else {
			var array = [];
			array.push(window.location.href);
			Cookies.set('hdk_url_from', JSON.stringify(array), {expires: 1, path: '/'});
			window.location.href = hdk.config.webApi.host + hdk.config.webApi.pathRegister;
		}
	}
	,

	/**
	 * 异步调用本地找回密码界面. 该方法可以在browser模式下使用.
	 *
	 * @param callback
	 */
	resetPassword: function (callback) {

		var deferred = Deferred.create();
		deferred.always(callback);

		if (hdk.support) {

			hdk.pendingResults[deferred.id] = deferred;
			hdk.binding.user.resetPassword(deferred.id);

		} else {
			var array = [];
			array.push(window.location.href);
			Cookies.set('hdk_url_from', JSON.stringify(array), {expires: 1, path: '/'});
			window.location.href = hdk.config.webApi.host + hdk.config.webApi.pathResetPassword;
		}
	}
	,

	/**
	 * 退出登录
	 * @param callback
	 */
	logout: function (callback) {

		var deferred = Deferred.create();
		deferred.always(function (status, data) {

			if (status === 'SUCCESS') {
				//Cookies.remove(hdk.user.info.sessionKey, {path: '/'});
				Cookies.remove('hdk_user', {path: '/'});
				hdk.user.isLogin = false;
				hdk.user.info = undefined;
			}
			callback(status, data);
		});

		if (hdk.support) {

			hdk.pendingResults[deferred.id] = deferred;
			hdk.binding.user.logout(deferred.id);

		} else {
			if (hdk.user.info) {
				var sessionId = hdk.user.info.sessionValue;
				var ajax;
				if (window.ActiveXObject) {
					ajax = new ActiveXObject("Microsoft.XMLHTTP");
				} else if (window.XMLHttpRequest) {
					ajax = new XMLHttpRequest();
				}

				ajax.open("GET", hdk.config.webApi.host
					+ hdk.config.webApi.logout
					+ "?sessionId=" + sessionId);
				ajax.setRequestHeader("Authorization", "open the gate");
				ajax.send(null);
				ajax.onreadystatechange = function () {
					if (ajax.readyState == 4) {

						if (ajax.status == 200) {
							var res = JSON.parse(ajax.responseText);
							if (res.success && res.data) {
								deferred.resolve('SUCCESS', res);
							} else {
								deferred.reject('ERROR', res);
							}
						}
					}
				}
			}

		}
	}

	/**
	 * 我的海尔
	 * @returns {boolean}
	 */
//my: function () {
//	if (hdk.support) {
//		hdk.binding.user.my();
//		return true;
//	} else return false;
//},

	/**
	 * 获取用户信息
	 */
//userInfo: function (callback) {
//	if (hdk.support) {
//		var ret = JSON.parse(hdk.binding.user.userInfo());
//		callback(ret);
//	} else return false;
//}

})
;

/**
 * HDK module: 微信
 */
hdk.module('wechat', {
	
	init: function () {
		
		hdk.log.info("initialize module: wechat");
		// 初始化参数
		hdk.config.wechat = {};
		hdk.config.wechat.debug = false;
		hdk.config.wechat.jsApiList = [
			'onMenuShareTimeline',
			'onMenuShareAppMessage',
			'onMenuShareQQ',
			'onMenuShareWeibo',
			'onMenuShareQZone',
			'showMenuItems',
			'hideMenuItems'
		];
		
		hdk.config.webApi.wechatSign = '/v2/platform/web/wechat/config';
		
		if (hdk.mode != 'wechat') {
			hdk.log.warn('HDK not in wechat MODE');
			return;
		}

		if (typeof wx != 'object') {
			hdk.log.error('wx library not found');
			return;
		}

		//向服务端请求微信sdk必要数据
		var ajax;
		if (window.ActiveXObject) {
			ajax = new ActiveXObject("Microsoft.XMLHTTP");
		} else if (window.XMLHttpRequest) {
			ajax = new XMLHttpRequest();
		}

		ajax.open("POST", hdk.config.webApi.host + hdk.config.webApi.wechatSign);
		ajax.setRequestHeader("Authorization", "open the gate");
		ajax.send(window.location.href.split('#')[0]);
		ajax.onreadystatechange = function () {
			if (ajax.readyState == 4) {
				if (ajax.status == 200) {
					var res = JSON.parse(ajax.responseText);
					if (typeof res == 'object' && res.success && res.data) {

						wx.config({
							debug: hdk.config.wechat.debug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
							appId: res.data.appId, // 必填，公众号的唯一标识
							timestamp: res.data.timestamp, // 必填，生成签名的时间戳
							nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
							signature: res.data.signature,// 必填，签名，见附录1
							jsApiList: hdk.config.wechat.jsApiList
						});

					} else {
						hdk.log.error('Failed to get wechat sign');
					}
				}
			}
		}
	},
	

	/**
	 * 设置分享参数
	 * @param config
	 * @param callback
	 */
	setupShare: function (config, callback) {
		
		if (hdk.mode != 'wechat') {
			hdk.log.error("only work in wechat mode");
			return;
		}
		
		// 调微信sdk
		if (typeof wx != 'object') {
			hdk.log.error("wx js-sdk not found");
			return;
		}
		
		wx.ready(function () {
			wx.onMenuShareTimeline({
				title: config.title,
				desc: config.content,
				link: config.link,
				imgUrl: config.imgUrl,
				trigger: function (res) {},
				success: function (res) {
					callback('SUCCESS', 'onMenuShareTimeline', res);
				},
				cancel: function (res) {
					callback('CANCELLED', 'onMenuShareTimeline', res);
				},
				fail: function (res) {
					callback('ERROR', 'onMenuShareTimeline', res);
				}
			});
			wx.onMenuShareAppMessage({
				title: config.title,
				desc: config.content,
				link: config.link,
				imgUrl: config.imgUrl,
				trigger: function (res) { },
				success: function (res) {
					callback('SUCCESS', 'onMenuShareAppMessage', res);
				},
				cancel: function (res) {
					callback('CANCELLED', 'onMenuShareAppMessage', res);
				},
				fail: function (res) {
					callback('ERROR', 'onMenuShareAppMessage', res);
				}
			});
			wx.onMenuShareQQ({
				title: config.title,
				desc: config.content,
				link: config.link,
				imgUrl: config.imgUrl,
				trigger: function (res) { },
				success: function (res) {
					callback('SUCCESS', 'onMenuShareQQ', res);
				},
				cancel: function (res) {
					callback('CANCELLED', 'onMenuShareQQ', res);
				},
				fail: function (res) {
					callback('ERROR', 'onMenuShareQQ', res);
				}
			});
			wx.onMenuShareWeibo({
				title: config.title,
				desc: config.content,
				link: config.link,
				imgUrl: config.imgUrl,
				trigger: function (res) { },
				success: function (res) {
					callback('SUCCESS', 'onMenuShareWeibo', res);
				},
				cancel: function (res) {
					callback('CANCELLED', 'onMenuShareWeibo', res);
				},
				fail: function (res) {
					callback('ERROR', 'onMenuShareWeibo', res);
				}
			});
			wx.onMenuShareQZone({
				title: config.title,
				desc: config.content,
				link: config.link,
				imgUrl: config.imgUrl,
				trigger: function (res) { },
				success: function (res) {
					callback('SUCCESS', 'onMenuShareQZone', res);
				},
				cancel: function (res) {
					callback('CANCELLED', 'onMenuShareQZone', res);
				},
				fail: function (res) {
					callback('ERROR', 'onMenuShareQZone', res);
				}
			});
		});
	},
	
	allowShare: function (enabled) {

		if (hdk.mode != 'wechat') {
			hdk.log.error("only allowed in wechat mode");
			return;
		}

		if (typeof wx != 'object') {
			hdk.log.error("wx js-sdk not found");
			return;
		}

		var list = [
			"menuItem:share:appMessage",
			"menuItem:share:timeline",
			"menuItem:share:qq",
			"menuItem:share:weiboApp",
			"menuItem:favorite",
			"menuItem:share:facebook",
			"menuItem:share:QZone"
		];

		wx.ready(function () {
			if (enabled) {
				wx.showMenuItems({menuList: list});
			} else {
				wx.hideMenuItems({menuList: list});
			}
		});
	}
	
});

/**
 * HDK module: 控件
 */
hdk.module('widget', {

	dialog: {

		/**
		 * 弹出只有一个按钮的提示框
		 *
		 * @param message 消息主体
		 * @param alertCallback 回调函数
		 * @param title 标题(只对原生模式生效)
		 * @param buttonName 按钮名称(只对原生模式生效)
		 */
		alert: function (message, alertCallback, title, buttonName) {

			title = title == null ? "" : title;
			buttonName = buttonName == null ? "确定" : buttonName;
			if (hdk.support) hdk.binding.widget.dialog_alert(message, title, buttonName);
			else alert(message);
			alertCallback();
		},

		/**
		 * 弹出确认框
		 *
		 * @param message 消息主体
		 * @param confirmCallback 回调
		 * @param title 标题(只对原生模式生效)
		 * @param buttonLabels [确认按钮,取消按钮] 按钮名称(只对原生模式生效)
		 */
		confirm: function (message, confirmCallback, title, buttonLabels) {

			var ret;
			if (hdk.support) ret = hdk.binding.widget.dialog_confirm(message, title, buttonLabels);
			else ret = confirm(message);
			confirmCallback(ret);
		},

		/**
		 * 弹出允许用户输入文本的输入框
		 *
		 * @param message 消息主体
		 * @param promptCallback 回调
		 * @param title 标题(只对原生模式生效)
		 * @param buttonLabels [确认按钮,取消按钮] 按钮名称(只对原生模式生效)
		 * @param defaultText 输入框默认文本
		 */
		prompt: function (message, promptCallback, title, buttonLabels, defaultText) {

			var value;
			if (hdk.support) {
				value = hdk.binding.widget.dialog_prompt(message, title, buttonLabels, defaultText);
			}
			else
				value = prompt(message, defaultText);

			var ret = value != null;

			promptCallback(ret, value);
		}
	},

	/**
	 * 异步调用本地界面选择并上传图片
	 *
	 * @param url  http上传接口
	 * @param callback 回调
	 * @param partName
	 * @param queryParams
	 */
	uploadImage: function (url, callback, partName, queryParams) {

		var deferred = Deferred.create();
		deferred.always(callback);

		if (hdk.support) {

			hdk.pendingResults[deferred.id] = deferred;

			if (partName === undefined) {
				partName = 'file';
			}
			if (queryParams === undefined) {
				queryParams = {};
			}
			hdk.binding.widget.upload(deferred.id, 'image', url, partName, JSON.stringify(queryParams));

		} else {

			deferred.reject('UNSUPPORTED');
		}
	},

	/**
	 * 异步调用本地界面选择省市区
	 *
	 * @param level
	 * @param callback
	 */
	openAreaChooser: function (level, callback) {

		var deferred = Deferred.create();
		deferred.always(callback);

		if (hdk.support) {

			hdk.pendingResults[deferred.id] = deferred;
			hdk.binding.widget.openAreaChooser(deferred.id, level);

		} else {

			deferred.reject('UNSUPPORTED');
		}
	},

	/**
	 * 分享
	 * @param config
	 * @param callback
	 */
	share: function (config, callback) {

		var deferred = Deferred.create();
		deferred.always(callback);

		if (hdk.support) { // 支持原生

			var valid = config.hasOwnProperty('title')
				&& config.hasOwnProperty('content')
				&& config.hasOwnProperty('link')
				&& config.hasOwnProperty('imgUrl');

			if (!valid) {

				hdk.log.error('config is missing some property');
				deferred.reject('ERROR');

			} else {

				hdk.pendingResults[deferred.id] = deferred;
				hdk.binding.widget.share(
					deferred.id, config.title, config.content, config.link, config.imgUrl);
			}

		} else { // 不支持原生

			hdk.log.error("only work in native mode");
			deferred.reject('UNSUPPORTED');
		}
	}

});
