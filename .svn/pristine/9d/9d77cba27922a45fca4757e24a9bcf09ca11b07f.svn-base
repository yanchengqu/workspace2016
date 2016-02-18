/**
 * @author: chenxiaoyong@ehaier.com
 * @date: 2015-02-11
 * @description: 地址控件
 * @required: jquery.js && jquery.tab.js
 * @version: v0.1
 */

!function (window, $, undefined) {
	
	var html = [];
	html.push('<div class="mod-address">');
	html.push('<div class="tab">');
	html.push('<ul class="tab-head clearfix">');
	html.push('<li class="tab-head__item tab-head__item--active mod-address--province">省份</li>');
	html.push('<li class="tab-head__item mod-address--city">城市</li>');
	html.push('<li class="tab-head__item mod-address--district">区县</li>');
	html.push('</ul>');
	html.push('<div class="tab-body">');
	html.push('<div class="tab-body__item tab-body__item--active mod-address__province">');
	html.push('</div>');
	html.push('<div class="tab-body__item mod-address__city">');
	html.push('</div>');
	html.push('<div class="tab-body__item mod-address__district">');
	html.push('</div>');
	html.push('</div>');
	html.push('</div>');
	html.push('</div>');
	html = html.join('');
	

	function Address (element) {
		this.addressCtrl = $(element);
		this.acceptor = this.addressCtrl.find('.ctrl-address__title');
		this.window   = null;
		this.data     = null;
		this.init();
	}; 

	Address.prototype = {
		constuctor: Address,

		init: function() {
			var that = this;
			that.createWindow();
			that.request();

			$(document).on('click',function(){

				var modAddress = that.window;
				if ( modAddress.length > 0 ) {
					if ( !modAddress.is(':hidden') ) {
						that.hideWindow();
					}
				}

			});

		},

		createWindow: function() {
			var that = this;
			that.window = $(html)
				.css({
					position: 'absolute',
					left: -500
				})
				.appendTo('body');
		},

		positionWindow: function() {
			var that = this,
				addressCtrl = that.addressCtrl,
				/* 向上一个像素压住border-bottom  */
				addressCtrlHeight = addressCtrl.outerHeight() - 1,
				addressCtrlOffset = addressCtrl.offset();
			that.window.css({
				left: addressCtrlOffset.left,
				top: addressCtrlOffset.top + addressCtrlHeight
			});
		},

		hideWindow: function() {
			var that = this;
			that.window.css('left', -500)
		},

		cache: function(data) {
			var that = this;
				that.data = data;
		},

		renderWindow: function(data) {

			if ( !data.success ) return false;

			var that    = this,
				tabs     = that.window.find('.tab-head__item'),
				province = that.window.find('.mod-address__province'),
				city     = that.window.find('.mod-address__city'),
				district = that.window.find('.mod-address__district'),
				buffer   = {},
				temp     = [];
			/**
			 * @render 渲染模板并绑定数据
			 * @param  {Array} data      
			 * @param  {DOM} container 
			 */
			
			function render (data, container) {
				if ( !(data && container) ) return;
				var i = 0,
					length = data.length;
				container.html('');
				for ( i; i < length; i++ ) {
					$('<a href="javascript:;"></a>')
						.html(data[i].name)
						.data('area', data[i])
						.appendTo(container);
				}
			}

			/**
			 * @method  activate 激活选中以及切换tab页
			 */
			
			function activate(element) {
				var $ele    = $(element),
					$parent = $ele.parent(),
					index   = $parent.index() + 1;
				if ( $ele.hasClass('current') ) return;
				$parent.find('.current').removeClass('current');
				$ele.addClass('current');
				if ( !$parent.hasClass('mod-address__district') ) {
					$ele.trigger('render');
					tabs.eq(index).trigger('click');
				}
				if ( $parent.hasClass('mod-address__province') ) {
					district.html('')
				}
			}

			/**
			 * @method bakcFill 城市信息回填和城市数据保存
			 * 
			 */
			
			function backFill(element) {
				var $ele    = $(element),
					$parent = $ele.parent();
				if ( $parent.hasClass('mod-address__province') ) {
					temp.length = 0;
					buffer      = {};
					temp.push($ele.html());
					that.acceptor.html(temp.join(''));
					buffer['province'] = $ele.data('area')['id'];

				} else if ( $parent.hasClass('mod-address__city') ) {
					temp.length = 1;
					buffer['region'] && ( delete buffer['regionId'] );
					buffer['regionName'] && ( delete buffer['regionName'] );
					temp.push($ele.html());
					that.acceptor.html(temp.join('<span class="split-line">/</span>'));
					buffer['city'] = $ele.data('area')['id'];

				} else if ( $parent.hasClass('mod-address__district') ) {
					temp.length = 2;
					temp.push($ele.html());
					that.acceptor.html(temp.join('<span class="split-line">/</span>'));
					buffer['region'] = $ele.data('area')['id'];
					buffer['regionName'] = temp.join(' ');
				}
			}



			render(data.data, province); 

			// 自定义事件
			
			province.on('render', 'a', function() {
				var $this = $(this),
					data  = $this.data('area')['children'];
				render(data, city);
			});

			city.on('render', 'a', function() {
				var $this = $(this),
					data  = $this.data('area')['children'];
				render(data, district);
			});

			//  基本业务处理
			
			province.on('click', 'a', function() {
				var $this = $(this),
					e     = null;
				if ( !$this.hasClass('current') ) {
					activate(this);
					backFill(this);
				}
				// 触发自定义事件
			    e = $.Event("address", {region: buffer});
			    that.addressCtrl.trigger(e);
			    return false;
			});

			city.on('click', 'a', function() {
				var $this = $(this),
					e     = null;
				if ( !$this.hasClass('current') ) {
					activate(this);
					backFill(this);
				}
				// 触发自定义事件
			    e = $.Event("address", {region: buffer});
			    that.addressCtrl.trigger(e);
			    return false;
			});

			district.on('click', 'a', function(){
				var $this = $(this),
					e     = null;
				if ( !$this.hasClass('current') ) {
					activate(this);
					backFill(this);
				}
				// 触发自定义事件
			    e = $.Event("address", {region: buffer});
			    that.addressCtrl.trigger(e)
				that.hideWindow();
				return false;
			});

		},

		request: function() {
			var that = this,
				url  = '/pc/region/regionTree.html?pid=2345';
				// url  = 'http://www.ehaier.com/outRegionJson';

			if ( that.data ) {
				that.renderWindow(that.data)
			} else {
				$.ajax({
					url: url,
					cache: true,
					dataType: "json",
					success: function(data){
						that.renderWindow(data);
						that.cache(data);
					},
					error: function() {
						console.log('省市区信息加载失败');
					}
				});

			}
		}
	}
	
	$.fn.address = function ( option ) {
		return this.each(function () {
			var $this = $(this), 
				data  = $this.data('address');
			if (!data) $this.data('address', (data = new Address(this)));
			if (typeof option == 'string') data[option]();
		})
	}


	$(function(){
		// 控件提前加载地址数据
		$('.ctrl-address').address();
		$(document).on('click', '.ctrl-address', function() {
			$(this).address('positionWindow');
			return false;
		});
	});   

}(this, this.jQuery);
