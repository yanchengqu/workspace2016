/**
 * @author: yangmingfang@ehaier.com
 * @date: 2015-02-06
 * @description: TS-PC buypage
 * @required: jquery.js swiper.js
 */


! function (window, $,undefined) {
	
	var Page = {
		mySwiper: function () {

			$('.swiper-container').swiper({
				simulateTouch: false,
				pagination: '.pagination',
				loop:true,
				grabCursor: true,
				paginationClickable: true,
				calculateHeight: true,
				onFirstInit: function(swiper) {
					var parent  = $('.region__detail--gallery'),
						prevBtn = parent.find('.arrow-left'),
						nextBtn = parent.find('.arrow-right');
					prevBtn.on('click', function(e) {
							e.preventDefault();
							swiper.swipePrev();
						});
					nextBtn.on('click', function(e) {
						 e.preventDefault();
						swiper.swipeNext();
					});
				}
			});
		}, 
		init: function(){
			this.mySwiper();
		},
		amountChange: function(){
			
		}
	};
	$(function () {		
		Page.init();
	});
}(this, this.jQuery);

$(function(){
	var productSku  = $('#sku'),
		goodId = $('#productId'),
		changeNum    = $('#number'),
		supplyAmount = $('#avaibleQty'),
		numbar       = $('.amount-wrap'),
		subBtn       = $('.amount-down',numbar),
		addBtn       = $('.amount-up',numbar),
		initRegion   = $('#regionName').val(),
		initRegionVal= initRegion.split(" "),
		regionId     = $('#regionId').val(),
		nostock      = $('#noStockPlaceOrder').val();

	changeNum.val('1');

	var avaibleQtyNumer = parseInt($('#avaibleQty').val() || 0);

	function depletionNum(num){
		var count = parseInt(num);
		if(count <= 1) {
			return;
		}
		changeNum.val(--count);
		changePrice(count);
	}

	function increasingNum(num){
		var count = parseInt(num);
		changeNum.val(++count);
		changePrice(count);
	}

	subBtn.on('click',function(e){
		e.preventDefault();
		if(typeof(regionId) == "undefined"){
			isHasGood(false);
			$(".ctrl-address").css('border-color','#ed1b23');
			return false;
		}
		var count = changeNum.val();
		count = /^[1-9]\d*$/.test(count) ? count : 0;
		depletionNum(count);
		//isHasGood(avaibleQtyNumer >= count);
		var sku = productSku.val(),
			getNumber = changeNum.val();
		
		$.ajax({ 
			url:'/pc/product/stock.html',
			data: {"sku":sku,"regionId":regionId,"number":getNumber},
			dataType: "json",
			success:function(data){ 
				data = (data instanceof Object) ? data : JSON.parse(data);
				if(data.success){
					var avaibleQty = parseInt(data.data.avaibleQty);

					avaibleQtyNumer = avaibleQty;

					var num = parseInt(changeNum.val());
					isHasGood(avaibleQty>=num);
				}
				else{ 
					//alert(data.message);
				}
			},
			error:function(info){
				//console.log("error");
			}
		});

	});

	addBtn.on('click',function(e){
		if(typeof(regionId) == "undefined"){
			isHasGood(false);
			$(".ctrl-address").css('border-color','#ed1b23');
			return false;
		}

		e.preventDefault();
		var count = changeNum.val();
		count = /^[1-9]\d*$/.test(count) ? count : 0;
		increasingNum(count);
		//isHasGood(avaibleQtyNumer >= count);
		var sku = productSku.val(),
			getNumber = changeNum.val();
		
		$.ajax({ 
			url:'/pc/product/stock.html',
			data: {"sku":sku,"regionId":regionId,"number":getNumber},
			dataType: "json",
			success:function(data){ 
				data = (data instanceof Object) ? data : JSON.parse(data);
				if(data.success){
					var avaibleQty = parseInt(data.data.avaibleQty);

					avaibleQtyNumer = avaibleQty;

					var num = parseInt(changeNum.val());
					//console.log(avaibleQtyNumer);
					isHasGood(avaibleQty>=num);
				}
				else{ 
					alert(data.message);
				}
			},
			error:function(info){
				//console.log("error");
			}
		});
	});

	function forbidenModify(event){
		event.preventDefault();
		return false;	
	}
	

	changeNum.on('paste',forbidenModify);
	changeNum.on('copy',forbidenModify);
	changeNum.on('cut',forbidenModify);

	changeNum.bind('keydown',function(e){
		e.preventDefault(); 
	});
	changeNum.attr('readOnly',true);
	
	function isHasGood(flag){ 
		var iystatus = $('.inven-status');
		
		$(".ctrl-address").css('border-color','#ddd');
		//var isNoneStyle = !hideStatus ? 'initial' : 'none';
		//iystatus.css('display', isNoneStyle);

		nostock = parseInt(nostock);
		//无库存下单，0:需要检查库存,1:不需要检查库存
		if(nostock){
			
			//1的时候不检查库存，直接显示有货

			iystatus.html('有货');
			$('#buyBtn').removeClass('mark-disabled').attr('disabled',false);

		} else {

			var value = flag ? '有货' : '无货';
			iystatus.html(value);

			if(flag){
				$('#buyBtn').removeClass('mark-disabled').attr('disabled',false);
			}else {
				$('#buyBtn').addClass('mark-disabled').attr('disabled',true);
			}

		}
	}

	function changePrice(num){ 
		
		var dlPrice = $('#tx_price').val();
		//$('#perPrice').val(dlPrice);
		
		var perPrice = parseFloat(dlPrice);
		var sum = num * perPrice;
		var tailPrice = sum.toFixed(2).split('.')[1];//四舍五入
		var priceSumStrOrg = parseInt(sum).toString();
		var priceSumStr = priceSumStrOrg.split('').reverse().join('').replace(/(\d{3})/g,'$1,').replace(/\,$/,'').split('').reverse().join('');
		$('.total-price').html(priceSumStr+'.'+tailPrice);
	}

	function initStatus(){
		isHasGood(parseInt($('#avaibleQty').val()) >= parseInt(changeNum.val()));

		$('.ctrl-address__title').html(initRegionVal[0] + '<span class="split-line">/</span>' + initRegionVal[1] + '<span class="split-line">/</span>' + initRegionVal[2]);
		
	}
	initStatus();
	changePrice(1);

	$('.ctrl-address').bind('address', function(event){
		
		var regionData = event.region,
			onRegionId = regionData.region,
			sku = productSku.val(),
			getNumber = changeNum.val();

		regionId = onRegionId;
		initRegion = regionData.regionName;

		if ( !onRegionId ) {
			
			isHasGood(false);
			$(".ctrl-address").css('border-color','#ed1b23');
			return;
		}
		
		//保存地址
		$.ajax({ 
			url:'/pc/region/setDefaultRegion.html',
			data: regionData,
			success:function(data){
				if(data.success){
					//console.log(data);
				}
			}
		});
		
		//库存状态
		$.ajax({ 
			url:'/pc/product/stock.html',
			data: {"sku":sku,"regionId":onRegionId,"number":getNumber},
			dataType: "json",
			success:function(data){ 
				data = (data instanceof Object) ? data : JSON.parse(data);
				if(data.success){
					var avaibleQty = parseInt(data.data.avaibleQty);
					avaibleQtyNumer = avaibleQty;
					var num = parseInt(changeNum.val());
					isHasGood(avaibleQty>=num);
				}
				else{ 
					alert(data.message);
				}
			},
			error:function(info){
				//console.log("error");
			}
		});

	});

	//提交
	$('#buyBtn').on('click', function(){
		if($(this).hasClass('mark-disabled')){
			return;
		}
		var productId = goodId.val(),
		    num = changeNum.val(),
			params = {"productId":productId,"num":num},
			action = "/pc/order/toSubmit.html";  
		
		var form = $('<form></form>');  // 创建Form 
		form.attr('action', action);  
		form.attr('method', 'post');   
		form.attr('target', '_self');  

		if(productId && num){ 
			$('body').append(form);
			for(var key in params){ 
				var my_input = $('<input type="hidden" />');  
				my_input.attr({'name': key,'value': params[key]}); 
				form.append(my_input);
			}
			// 提交表单  
			
			form.submit();
			
		}
	});

});


