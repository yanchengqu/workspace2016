/**
 * @author: chenxiaoyong@ehaier.com
 * @date: 2015-02-27
 * @description: TS-PC orderSubmitPage
 * @required: jquery.js 
 */

/**
 * radiobox 控件
 */

! function (window, $, undefined) {

	var CLASS_CHECKED = 'checked';

	function RadioBox(element, all) {
		this.element    = element;
		this.all        = all;
		this.radioBox   = null;
		this.inputRadio = null;
		this.init();
	}

	RadioBox.prototype = {
		constructor: RadioBox,

		init: function() {
			var that  = this;
				that.radioBox = $(that.element),
				that.inputRadio = that.radioBox.find("input[type='radio']"); 

			if ( that.radioBox.hasClass(CLASS_CHECKED) ) {
				if ( that.inputRadio.length > 0 ) {
					that.inputRadio.attr('checked', 'true');
				}
			}
		},

		show: function() {
			var that  = this;
			if (!that.radioBox.hasClass(CLASS_CHECKED)) {
				that.radioBox.addClass(CLASS_CHECKED);
				that.inputRadio.attr('checked', 'true');
			} 
		},

		toggle: function () {
			var that  = this,
				name  = that.radioBox.data('name'),
				groupRadioBox = that.all.filter('.checked[data-name="' + name + '"]');
			if ( !name ) {
				that.show();
			} else {
				if ( that.radioBox.hasClass(CLASS_CHECKED) ) return;
				groupRadioBox.removeClass(CLASS_CHECKED)
					.find("input[type='radio']")
					.removeAttr('checked');
				that.show();
			}
		}

	};

	$.fn.radio = function ( option ) {
		var that = this;
	    return this.each(function () {
	      var $this = $(this), 
	      	  data = $this.data('radio');
	      if (!data) $this.data('radio', (data = new RadioBox(this, that)));
	      if (typeof option == 'string') data[option]();
	    })
  	}

  	$(function(){
  		$('.radiobox').radio();
		$(document).on('click', '.radiobox', function(){
			$(this).radio('toggle');
		});
  	});

}(this, this.jQuery);


/**
 * selectbox 控件
 */

! function (window, $, undefined) {

	var CLASS_SELECTED  = 'selected';

	function SelectBox(element, all) {
		this.element        = $(element);
		this.all            = all;
		this.input          = this.element.find('input[type="hidden"]');
		this.value          = null;
		this.title          = this.element.find('.selectbox__title');
		this.options        = this.element.find('.selectbox__option');
		this.selectedIndex  = null;
		this.selectedOption = null;
		this.init();
	}

	SelectBox.prototype = {

		constructor: SelectBox,

		init: function() {

			var that = this,
				flag = true,
				firstOption = that.options.eq(0);

			function assignment(index, value, option, html) {
				that.selectedIndex = index;
				that.input.val(value);
				that.selectedOption = option;
				that.title.html(html);
			}

			that.options.each(function(){
				var $this      = $(this),
					value      = $this.data('value'),
					index      = $this.index(),
					html       = $this.html(),
					isSelected = $this.data('selected');

				if ( isSelected ) {
					assignment(index, that.value = value, $this, html)
					$this.addClass(CLASS_SELECTED);
					flag = false;
					return;
				} 
			});

			if ( flag ) {
				assignment(firstOption.index(), that.value = firstOption.data('value'), firstOption, firstOption.html())
				firstOption.addClass(CLASS_SELECTED);
			}

			that.options.bind('click', function() {
				var $this      = $(this),
					$parent    = $this.parent(),
					value      = $this.data('value'),
					index      = $this.index(),
					html       = $this.html();

				if ( $this.hasClass(CLASS_SELECTED) ) return;
				$parent.find('.selected').removeClass(CLASS_SELECTED)
				$this.addClass(CLASS_SELECTED);
				assignment(index, that.value = value, $this, html)

			});

			$(document).on('click',function(){
	  			var selectBoxs = that.all,
	  				optionList = selectBoxs.find('.selectbox__inner');
	  			if ( selectBoxs.length > 0 ) {
	  				optionList.each(function(){
	  					var $this = $(this);
	  					if ( !$this.is(':hidden') ) {
	  						$this.hide();
	  					}
	  				});
	  			}
	  		});

		},

		toggle: function() {
			var that = this;
  			/*if ( that.all.length > 0 ) {
  				 that.all.each(function(){
  					var $this = $(this),
  						optionList = $this.find('.selectbox__inner');
  					if ( !optionList.is(':hidden') && ( this != that.element[0] ) ) {
  						optionList.hide();
  					}
  				});
  			}*/

  			var allSelectBoxs = $('.selectbox')

  			if ( allSelectBoxs.length > 0 ) {
  				 allSelectBoxs.each(function(){
  					var $this = $(this),
  						optionList = $this.find('.selectbox__inner');
  					if ( !optionList.is(':hidden') && ( this != that.element[0] ) ) {
  						optionList.hide();
  					}
  				});
  			}

			that.element
				.find('.selectbox__inner')
				.toggle();
		}

	}

	$.fn.select = function ( option ) {
		var that = this;
	    return this.each(function () {
	      var $this = $(this), 
	      	  data = $this.data('select');
	      if (!data) $this.data('select', (data = new SelectBox(this, that)));
	      if (typeof option == 'string') data[option]();
	    })
  	}

  	$(function(){
  		$('.selectbox').select();
		$(document).on('click', '.selectbox', function(){
			$(this).select('toggle');
			return false;
		});
  	});
	
}(this, this.jQuery);

/**
 * Consignee Manage 
 */

!function (windowm, $, undefined) {


	var CM = {

		setDefaultConsignee: function(id, fn) {
			var that = this,
				url  = '/pc/order/address/setDefault.html';

			$.ajax({
				url: url,
				type: 'POST',
				dataType: 'json',
				data: {memberAddressId: id}
			})
			.done(function(data) {
				typeof fn === 'function' && fn(data);
			})
			.fail(function() {
				console.log("error");
			});
			
		},

		updateConsignee: function(data, fn) {
			var that = this,
				url = '/pc/order/address/update.html';

			$.ajax({
				url: url,
				type: 'POST',
				dataType: 'json',
				data: data
			})
			.done(function(data) {
				typeof fn === 'function' && fn(data);
				
			})
			.fail(function() {
				console.log("error");
			});

		},

		removeConsignee: function(id, fn) {
			var that = this,
				url = '/pc/order/address/delete.html';

			if ( !confirm('确认删除该收件人信息吗？') ) return;

			$.ajax({
				url: url,
				type: 'POST',
				dataType: 'json',
				data: {memberAddressId: id}
			})
			.done(function(data) {
				typeof fn === 'function' && fn(data);
			})
			.fail(function() {
				console.log("error");
			});

		},

		addConsignee: function(data, fn) {
			var that = this,
				url = '/pc/order/address/add.html';

			$.ajax({
				url: url,
				type: 'POST',
				dataType: 'json',
				data: data
			})
			.done(function(data) {
				typeof fn === 'function' && fn(data);				
			})
			.fail(function() {
				console.log("error");
			});
		},

		/**
		 * 业务逻辑
		 */

		init: function() {

			var 
			CLASS_CUR     = 'consignee-list__item--active',
			that          = this,
			
			/**
			* 0代表回填模式，1   =>update, 2=>add,默认回填模式
			*/
			
			mode          = 0, 
			editItem      = null,    
			root          = $('#J_CM'),
			form          = root.find('#J_AE'),
			saveBtn       = root.find('#J_save'),
			consigneeRoot = root.find('.consignee-list');
			
			function destroyConsigneeWindow() {
				root.hide();
			}

			/**
			 * 表单重置
			 */

			function resetForm () {
				form[0].reset();
				form.find('.ctrl-address__title').html('');
				form.find('input,textarea').val('');
				form.find('.help-inline').empty();
			}

			function getTemplateString() {

				var html = [];
				
				html.push('<div class="consignee-list__item J_consigneeItem">');
				html.push('<div class="consignee">');
				html.push('<input type="radio" name="cur" value="0">');
				html.push('<div class="consignee__inner">');
				html.push('<div class="consignee--name"></div>');
				html.push('<div class="consignee--tel"></div>');
				html.push('<br>');
				html.push('<div class="consignee--region"></div>');
				html.push('<div class="consignee--address"></div>');
				html.push('</div>');
				html.push('</div>');
				html.push('<div class="consignee-list__item--action">');
				html.push('<a class="J_setDefault" href="javascript:;">设为默认地址</a>');
				html.push('<a class="J_edit" href="javascript:;">编辑</a>');
				html.push('<a class="J_delete" href="javascript:;">删除</a>');
				html.push('</div>');
				html.push('</div>');

				return html.join('');

			}

			/**
			 * 收件人管理选项点击效果
			 */
			
			root.on('click', '.J_consigneeItem', function() {

				var $this = $(this),
					radio = $this.find('input[name="cur"]');

				root.find('.J_consigneeItem').each(function(){

					var $element = $(this),
						radio    = $element.find('input[name="cur"]');

					if ( radio.is(':checked') && this != $this[0] ) {
						if ( +radio.val() == 0 ) {
							$element.removeClass(CLASS_CUR);
						} else {
							form.length > 0 && form.hide(); 
						}
						radio.removeAttr('checked');
					}

				});

				if ( +radio.val() == 0 ) {
					$this.addClass(CLASS_CUR),
					mode = 0;
				} else {
					form.length > 0 && form.show() && resetForm(); 
					mode = 2;
				}

				radio.attr('checked', true);

			})
			.on('click', 'input[name="cur"]', function() {

				var $this  = $(this),
					$parent = $this.closest('.J_consigneeItem');

				setTimeout(function(){
					$parent.trigger('click');
				}, 0);

				return false;

			});

			/**
			 * 默认收件人置顶
			 */

			function topConsigneeItem() {

				root.find('.consignee-list__item').each(function() {

					var $element = $(this),
						$parent  = $element.parent(),
						data     = $element.data('consignee'),
						isDefaultAddress = +data['defaultFlag'];

						if ( !!isDefaultAddress ) {
							$element.trigger('click');		
							$element.prependTo($parent);
							return false;
						}
				});

			}

			topConsigneeItem();			

			/**
			 * 设置默认地址
			 */
			
			root.on('click', '.J_setDefault', function() {

				var $this            = $(this),
					data             = $this.closest('.consignee-list__item').data('consignee'),
					addressID        = data['memberAddressId'],
					isDefaultAddress = +data['defaultFlag'];

				if ( !!isDefaultAddress ) return;

				addressID && that.setDefaultConsignee(addressID, function(res) {

					if ( !res.success ) return;

					root.find('.consignee-list__item').each(function() {

						var $element = $(this),
							data     = $element.data('consignee'),
							isDefaultAddress = +data['defaultFlag'];

						!!isDefaultAddress && ( data['defaultFlag'] = 0 )

					});

					data['defaultFlag'] = 1;
					topConsigneeItem();
				});

				return false;
			});

			/**
			 * 编辑地址
			 */
			
			root.on('click', '.J_edit', function() {

				var $this   = $(this),
					$parent = $this.closest('.consignee-list__item'),
					data    = $parent.data('consignee');
				root.find('.consignee-manage__new--head')
					.trigger('click');
				form.find('input[name="memberAddressId"]')
					.val(data['memberAddressId']);
				form.find('input[name="contacter"]')
					.val(data['contacter']);
				form.find('input[name="mobile"]')
					.val(data['mobile']);
				form.find('input[name="provinceId"]')
					.val(data['provinceId']);
				form.find('input[name="cityId"]')
					.val(data['cityId']);
				form.find('input[name="regionId"]')
					.val(data['regionId']);
				form.find('input[name="regionName"]')
					.val(data['regionName']);
				form.find('.ctrl-address__title')
					.html(data['regionName'].split(' ').join('<span class="split-line">/</span>'));
				form.find('textarea[name="address"]')
					.val(data['address']);
				
				mode = 1;
				editItem = $parent;
				return false;
			});

			/**
			 * 删除地址
			 */
			
			root.on('click', '.J_delete', function(evt) {

				var $this     = $(this),
					$parent   = $this.closest('.consignee-list__item'),
					data      = $parent.data('consignee'),
					addressID = data['memberAddressId'];

				addressID && that.removeConsignee(addressID, function(res) {

					var e = null;
					if ( res.success ) {

						e = $.Event('removeConsignee', {
								addressID: addressID
							});

						root.trigger(e);
						$parent.remove();
					} else {
						alert(res.message);
					}

				});

				return false;
			});

			// 字段校验


			form.find('input[type="text"], textarea, .ctrl-address')
			.bind('verify', function(){
				
				var $this       = $(this),
					value       = $.trim( $this.val() ),
					controlName = $this.attr('name'),
					helpElement = $this.closest('.controls').find('.help-inline');

				if ( 'contacter' == controlName ) {
					
					if ( '' == value ) {
						helpElement.html('收件人不能为空！');
						$this.data('isPassed', false);
						return false;
					} else if ( !/^[A-Za-z0-9\u4e00-\u9fa5]+$/.test(value) ) {
						helpElement.html('请填写合法的收件人姓名！');
						$this.data('isPassed', false);
						return false;
					} 

				} else if ( 'mobile' == controlName ) {

					if ( '' == value ) {
						helpElement.html('手机号码不能为空！');
						$this.data('isPassed', false);
						return false;
					} else if ( !/^0?(13|14|15|18)[0-9]{9}$/.test(value) ) {
						helpElement.html('请填写合法的手机号码！');
						$this.data('isPassed', false);
						return false;
					} 
					
				} else if ( 'address' == controlName ) {

					if ( '' == value ) {
						helpElement.html('详细地址不能为空！');
						$this.data('isPassed', false);
						return false;
					} else if ( !/^[A-Za-z0-9_()（）\#\-\u4e00-\u9fa5]+$/.test(value) ) {
						helpElement.html('请填写合法的地址！');
						$this.data('isPassed', false);
						return false;
					} 
					
				} else if ( $this.hasClass('ctrl-address') ) {

					if ( !($this.find('input[name="provinceId"]').val() 
						&& $this.find('input[name="cityId"]').val() 
						&& $this.find('input[name="regionId"]').val()
						&& $this.find('input[name="regionName"]').val() )
					   ) {
						helpElement.html('请选择完整的区域信息！');
						$this.data('isPassed', false);
						return false;
					}

				}			

				!helpElement.is(':empty') && helpElement.empty();
				$this.data('isPassed', true);

			});
			
			// 校验事件绑定
			
			form.find('input[type="text"], textarea')
			.bind('blur', function() {
					var $this = $(this);
					$this.trigger('verify');
			});

			
			form.find('.ctrl-address')
				.bind('address', function(event) {

					var $this        = $(this),
						data         = event['region'],
						inputProvice = $this.find('[input[name="provinceId"]'),
						inputCity    = $this.find('[input[name="cityId"]'),
						inputRegion  = $this.find('[input[name="regionId"]'),
						inputRN      = $this.find('[input[name="regionName"]');

					inputProvice.val(data['province']), 
					inputCity.val(data['city']),    
					inputRegion.val(data['region']),  
					inputRN.val(data['regionName']); 
					$this.trigger('verify')
			});

			/**
			 * 保存收货人信息
			 */
			
			saveBtn.on('click', function() {

				var e = null;
				var field = form.find('input[type="text"], textarea, .ctrl-address'),
					canSubmit = true;

				if ( 0 == mode ) {

					root.find('.consignee-list__item').each(function(index, el) {
						
						var $element = $(this),
							data     = $element.data('consignee'),
							radio    = $element.find('input[name="cur"]');

						if ( radio.is(':checked') ) {

							e = $.Event('saveConsignee', {
								consignee: data
							});

							root.trigger(e);
						}

					});

					destroyConsigneeWindow();
					return;
				}

				// 表单校验
		
				field.trigger('verify');
				field.each(function(index, el) {
					var $this = $(this);
					if ( !$this.data('isPassed') ) return canSubmit = false;

				});

				if ( !canSubmit ) return;

				// 编辑地址处理
				
				if ( 1 == mode ) {					

					that.updateConsignee(form.serialize(), function(data) {
						if ( !data.success ) return;
						data = data['data'];
						e = $.Event('saveConsignee', {
								consignee: data
							});

						root.trigger(e);

						// 刷新数据
						editItem.data('consignee', data)
							.find('.consignee--name').html(data['contacter'])
							.end().find('.consignee--tel').html(data['contacter'])
							.end().find('.consignee--region').html(data['regionName'])
							.end().find('.consignee--address').html(data['address'])
							.end().trigger('click');
						resetForm();
						destroyConsigneeWindow();

					});

					return;

				}

				// 新增地址处理

				if ( 2 == mode ) {

					that.addConsignee(form.serialize(), function(data) {
						if ( !data.success ) return;
						data = data['data'];
						e = $.Event('saveConsignee', {
								consignee: data
							});

						root.trigger(e);

						// 刷新数据
						var newConsignee = $(getTemplateString()).prependTo(consigneeRoot)
							.data('consignee', data)
							.find('.consignee--name').html(data['contacter'])
							.end().find('.consignee--tel').html(data['contacter'])
							.end().find('.consignee--region').html(data['regionName'])
							.end().find('.consignee--address').html(data['address'])
							.end().trigger('click');

						if ( consigneeRoot.find('consignee-list__item').length == 1 ) {
							topConsigneeItem();		
						}

						resetForm();
						destroyConsigneeWindow();
					
					});

					return;
				}

			});

		}
	
	};

	// window.CM = CM;
	
	$(function(){CM.init();});

}(this, this.jQuery);


/**
 * Page Business
 */

!function(window, $, undefined) {


	var Page = {

		root: (function(){
			var root = $('#J_root');
			return root.length > 0 ? root : null;
		}()),

		submitOrder: function(data, fn) {

			var that = this,
				url = '/pc/order/submit.html';

			$.ajax({
				url: url,
				type: 'POST',
				dataType: 'json',
				data: data
			})
			.done(function(data) {
				typeof fn === 'function' && fn(data);				
			})
			.fail(function() {
				console.log("error");
			});

		},

		getDatetimeAndPay: function(data, fn) {

			var that = this,
				url = '/pc/order/getPayAndDate.html';

			$.ajax({
				url: url,
				type: 'POST',
				dataType: 'json',
				data: data
			})
			.done(function(data) {
				typeof fn === 'function' && fn(data);				
			})
			.fail(function() {
				console.log("error");
			});

		},

		init: function() {

			var that            = this,
				CM              = that.root.find('#J_CM'),
				consigneeRoot   = that.root.find('#J_consignee'),
				payRoot         = that.root.find('#J_pay'),
				deliveryRoot    = that.root.find('#J_delivery'),
				invoiceRoot     = that.root.find('#J_invoice'),
				remarkRoot      = that.root.find('#J_remark'),
				listRoot        = that.root.find('#J_list'),
				tCode           = that.root.find('#J_tCode'),
				modifyBtn       = that.root.find('#J_modify'),
				orderForm       = that.root.find('#J_orderForm'),
				submitBtn       = that.root.find('#J_submit'),
				orderAmount     = that.root.find('.order--amount'),
				num             = orderForm.find('input[name="number"]').val(),
				memberAddressId = orderForm.find('input[name="memberAddressId"]').val(),
				skuId           = window.pageConfig && window.pageConfig['skuId'],
				regionId        = window.pageConfig && window.pageConfig['regionId'];


			// 初始化支付方式和配送时间

			function initDatetimeAndPayway ( data ) {

				if ( !data.success ) return;

				var 
					payList      = data['data']['payList'],
					datetimeList = data['data']['resShippingList'];


				if ( payList.length > 0  ) {

					payRoot.find('.controls-group').html('');

					$.each(payList, function(index, val) {

						var data     = val,
							radioBox = $('<div class="radiobox" data-name="payway">' +val['paymentName'] + '</div>')
									.data('payWay', val)
									.appendTo(payRoot.find('.controls-group'));

						if ( index == 0 ) {
							radioBox.addClass('checked');
							payRoot.find('input[name="paymentCode"]').val(val['paymentCode']);
							payRoot.find('input[name="paymentName"]').val(val['paymentName']);
							val['paymentCode'] == 'cod' 
								? payRoot.find('input[name="isCod"]').val(1) 
								: payRoot.find('input[name="isCod"]').val(0); 
						}

					});

				}

				if ( datetimeList.length > 0  ) {

					deliveryRoot.find('#J_date .selectbox__inner').html('');
					deliveryRoot.find('#J_time .selectbox__inner').html('');

					$.each(datetimeList, function(index, val) {

						var data = val,
							dateSelectOption = [];
						dateSelectOption.push('<li class="selectbox__option"' + ' data-value="' + val['day'] + '">');
						dateSelectOption.push('<div class="order-deliveryTime--date">' + val['day'] + '</div>');	
						dateSelectOption.push('<div class="order-deliveryTime--day">' + val['weekDay'].slice(-4, -1) + '</div>');					
						dateSelectOption.push('</li>');					
						dateSelectOption = dateSelectOption.join('');
						$(dateSelectOption).data('dateTime', val)
							.appendTo(deliveryRoot.find('#J_date .selectbox__inner'));
					});
				}

				deliveryRoot.find('#J_date').removeData('select').select();
				deliveryRoot.find('#J_date .selectbox__option:first')
					.trigger('click.time');
				$('.radiobox').radio();
			};

			// 支付方式点击效果

			payRoot.on('click', '.radiobox', function(event) {
				
				var $this = $(this),
					data  = $this.data('payWay');

				if ( !data ) return;

				payRoot.find('input[name="paymentCode"]').val(data['paymentCode']);
				payRoot.find('input[name="paymentName"]').val(data['paymentName']);
				data['paymentCode'] == 'cod' 
					? payRoot.find('input[name="isCod"]').val(1) 
					: payRoot.find('input[name="isCod"]').val(0); 

			});

			// 配送日期点击联动效果

			deliveryRoot.find('#J_date').on('click.time', '.selectbox__option', function(event) {

				var $this = $(this),
					data  = $this.data('dateTime');

				if ( !data ) return;

				data = data['timePeriod'];

				// 容错
				data = typeof data == 'string' ? $.parseJSON(data) : data;

				deliveryRoot.find('#J_time .selectbox__inner').html('');

				$.each(data, function(index, val) {

					var timeSelectOption = [],
						t                = {
							'090000': '上午',
							'130000': '下午',
							'180000': '晚上'
						};

					timeSelectOption.push('<li class="selectbox__option"' + ' data-value="' + val['key'] + '">');
					timeSelectOption.push('<div class="order-deliveryTime--time">' + val['value'] + '</div>');
					timeSelectOption.push('<div class="order-deliveryTime--12">' + t[val['key']] + '</div>');					
					timeSelectOption.push('</li>');					
					timeSelectOption = timeSelectOption.join('');
					$(timeSelectOption).appendTo(deliveryRoot.find('#J_time .selectbox__inner'));
				});
				deliveryRoot.find('#J_time').removeData('select').select();
			});


			// 收货人信息“修改”点击效果

			modifyBtn.bind('click', function() {

				var $this            = $(this),
					consigneeInner   = consigneeRoot.find('.order-consignee__inner'),
					consigneeManage  = consigneeRoot.find('#J_CM');

				if ( !consigneeInner.is(':hidden') )  {
					consigneeInner.hide();
					consigneeManage.show();
				} else {
					consigneeInner.show();
					consigneeManage.hide();
				}

			});

			// 保存收货人信息事件处理
			
			$(document).bind('saveConsignee', function(event) {
				
				var consignee = event['consignee'],
					memberAddressId = consignee['memberAddressId'],
					regionId        = consignee['regionId'];

				if ( !!memberAddressId ) {
					orderForm.find('input[name="memberAddressId"]').val(memberAddressId);
					consigneeRoot.find('.order-consignee--name').html(consignee['contacter']);
					consigneeRoot.find('.order-consignee--tel').html(consignee['mobile']);
					consigneeRoot.find('.order-consignee--region').html(consignee['regionName']);
					consigneeRoot.find('.order-consignee--address').html(consignee['address']);
					modifyBtn.trigger('click');
				}

				orderForm.is(':hidden') && orderForm.show()
				submitBtn.closest('.order-submit').is(':hidden') && submitBtn.closest('.order-submit').show()

				that.getDatetimeAndPay(
					{sku: skuId, regionId: regionId, num: num},
					function(data) {
					initDatetimeAndPayway(data);	
				
				});

			});

			// 删除收货人事件处理

			$(document).bind('removeConsignee', function(event){

				var addressId              = event['addressID'],
					memberAddressIdControl = orderForm.find('input[name="memberAddressId"]'),
					memberAddressId        = memberAddressIdControl.val();
				( addressId == memberAddressId ) && ( memberAddressIdControl.val('') )					

			});

			// 页面初始化

			that.getDatetimeAndPay(
				{sku: skuId, regionId: regionId, num: num},
				function(data) {
				initDatetimeAndPayway(data);	
			
			});
			
			if ( !memberAddressId ) {
				modifyBtn.trigger('click');

				// 展开“使用新地址”
				CM.find('.consignee-manage__new--head')
					.trigger('click');

				orderForm.hide(), submitBtn.closest('.order-submit').hide();

			}

			// 获取散列表形式的表单数据
			

			/**
			 * [getHash description]
			 * @param  {Array} input  serializeArray()后的数据
			 * @return {[type]}       [description]
			 */
			
			function getHash( input ){ 

				var data={}; 
				
				$.each(input, function(index, val) { 

					if( data[val['name']] ) { 
						data[val['name']] = data[val['name']] + "," + val['value']; 
					}else{ 
						data[val['name']] = val['value']; 
					} 

				}); 

				return data; 
			} 

			// 增值税发票校验
			
			invoiceRoot.find('input[type="text"]:not(.invoice-consignee input)')
			.bind('verify', function(){

				var $this       = $(this),
					value       = $.trim( $this.val() ),
					controlName = $this.attr('name'),
					helpElement = $this.closest('.controls').find('.help-inline');

				if ( 'companyName' == controlName ) {

					if ( '' == value ) {
						helpElement.html('公司名称不能为空！');
						$this.data('isPassed', false);
						return false;
					}

				} else if ( 'taxPayerNumber' == controlName ) {

					if ( '' == value ) {
						helpElement.html('纳税人识别号不能为空！');
						$this.data('isPassed', false);
						return false;
					} else if (!/^([a-zA-Z0-9]){15,20}$/.test(value)) {
						helpElement.html('税纳税识别号错误，请检查!');
						$this.data('isPassed', false);
						return false;
					}

				} else if ( 'registerAddress' == controlName ) {

					if ( '' == value ) {
						helpElement.html('注册地址不能为空！');
						$this.data('isPassed', false);
						return false;
					}

				} else if ( 'registerPhone' == controlName ) {

					if ( '' == value ) {
						helpElement.html('注册电话不能为空！');
						$this.data('isPassed', false);
						return false;
					}

				} else if ( 'bankName' == controlName ) {

					if ( '' == value ) {
						helpElement.html('开户银行不能为空！');
						$this.data('isPassed', false);
						return false;
					}


				} else if ( 'bankCardNo' == controlName ) {

					if ( '' == value ) {
						helpElement.html('开户帐号不能为空！');
						$this.data('isPassed', false);
						return false;
					}

				}

				!helpElement.is(':empty') && helpElement.empty();
				$this.data('isPassed', true);

			});

			invoiceRoot.find('input[type="text"]:not(.invoice-consignee input)')
				.bind('blur', function(){
					var $this = $(this);
					$this.trigger('verify');
				});
			
			// 优惠券校验
			
			function checkTcode() {

				var xhr   = null,
					timer = null;

				tCode.find('input[name="tCode"]')
				.bind('keyup paste', function(){

					var $this = $(this),
						val   = $this.val(),
						len   = val.length,
						tcodeM = orderAmount.find('.tcode-m');

					timer && clearTimeout(timer), xhr && xhr.abort();
					
					if ( $.trim(val).length <= 0 ) {
						tCode.find('.help-inline').empty();
						return;
					}

					timer = setTimeout(function(){

						xhr = $.ajax({
							url: '/pc/order/getCoupons.html',
							data: {sku:skuId, tCode: val},
						})
						.done(function(data) {

							if ( !data.success ) {
								tCode.find('.help-inline').html('您的优惠券不可用。');
								$this.data('isPassed', false);
							} else {

								tCode.find('.help-inline').empty();
								
								if ( tcodeM.length > 0 ) {
									tcodeM.html(' - ￥' + data['data']['couponValue']);
								} else {
									$('<em>', {
										'class': 'tcode-m',
										'text': ' - ￥' + data['data']['couponValue']
									}).appendTo(orderAmount);
								}
								$this.data('isPassed', true);
							}


						})
						.fail(function() {
							console.log("error");
						});

					}, 500);

				});
			}

			checkTcode();

			// 订单数据校验

			function verify(data) {

				var orderData = getHash(data);
				var canSubmit = true;

				if ( !$.trim(orderData['memberAddressId']) ) {

					$('#J_CM').is(':hidden') && modifyBtn.trigger('click')
					$(window).scrollTop(0);
					return false;
				} 

				if ( orderData['memberInvoiceType'] == 0 ) {

					if ( !$.trim(orderData['memberInvoiceTitle']) ) {
						orderForm.find('input[name="memberInvoiceTitle"]').val('');
					}

				} else if ( orderData['memberInvoiceType'] == 1 ) {


					invoiceRoot
						.find('input[type="text"]:not(.invoice-consignee input)')
						.trigger('verify')
						.each(function(){
							var $this = $(this);
							if ( !$this.data('isPassed') ) return canSubmit = false;
						});

					if ( !canSubmit ) { 
						$(window).scrollTop($('#J_invoice').offset().top);
						return false;
					}
				}

				if ( $.trim(orderData['tCode']) !='' ) {

					if ( !tCode.find('input[name="tCode"]').data('isPassed') ) {
						tCode.find('input[name="tCode"]').focus();
						return false;
					}
				}

				if ( !$.trim(orderData['remark']) ) {
					orderForm.find('input[name="remark"]').val('');
				}

				return orderData;
			}

			// 提交订单
			
			orderForm.submit(function(event) {

				var $this = $(this),
					data  = $this.serializeArray();

				if ( !(verify( data )) ) return false;

			});

			submitBtn.bind('click', function() {
				orderForm.submit();
			});

		}


	};

	$(function(){Page.init();});

}(this, this.jQuery);