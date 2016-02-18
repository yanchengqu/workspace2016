!function(win){
	var decreaseDom = G('decrease'),
		numDom = G('num'),
		increaseDom = G('increase');

	var formEl = G('form'),
		stockEl = G('stockStatus');

	var sku = G('sku').value,
		productPrice = parseInt(G('productPrice').value||0),
		productId = G('productId').value;

	var addBasketBtn = G('addBasket'),
		buyNowBtn = G('buyNow');

	var totalPriceEl = G('totalPrice');

	var wdprice = G('wdprice').getAttribute('data-value');

	var urlObj = {
		add:'/v2/h5/cart/list.html',
		buy:'/v2/h5/order/pageInfo.html',
		addAjax:'/v2/h5/cart/add.json',
		skuAjax:'/v2/h5/item/checkStock.json',
	};

	var canSubmit = false;

	//图片滚动
	new Swiper("#J_buySwiper",{
        pagination: ".pagination",
        loop: !0,
        grabCursor: !0,
        paginationClickable: !0
    });

	//价格格式化
	H.Common.updatePrice('.price',true);

	//地址选择
	var regionUrl = "/v2/h5/item/getRegion.json";
	var region = new TabRegion({
		container:'.slidebar_detail',
		url:regionUrl,
		key:'regionName',
		children_key:'childs',
		ajaxFun:$.ajax,
		complateCallback:function(provinceObj,cityObj,areaObj){
			slider.hide(true);
			$('#regionInput').val([provinceObj.regionName,cityObj.regionName,areaObj.regionName].join(' '));
			$('#provinceId').val(provinceObj.id);
			$('#cityId').val(cityObj.id);
			$('#areaId').val(areaObj.id);
			checkStock();
		}
	});
	//右边滑出层
	var slider = new SliderAside({
		showBtn:'#regionInput',
		showCallback:function(){
			//alert('show');
		},
		hideCallback:function(){
			//alert('hide');
		},
		preHideCallback:function(){
			return region.back();
		},
		preShowCallback:function(){
			region.reset();
		}
	});

	function checkStock(){
		var provinceId = G('provinceId').value;
		var cityId = G('cityId').value;
		var areaId = G('areaId').value;
		var pcrName = G('regionInput').value;
		var number = parseInt(numDom.value);
		var params = {
			sku:sku,
			prodId:productId,
			regionId:areaId,
			number:number,
			provinceId:provinceId,
			cityId:cityId,
			pcrName:pcrName
		};
		$.ajax({
			type:'get',
			url:urlObj.skuAjax,
			data:params,
			success:function(data){
				if(data.success && data.data.hasStock){
					setStockText(true);
					$('.tips').html((data.data.isSupportCOD?'货到付款，':'')+data.data.expectTime);
					return;
				}
				setStockText(false);
			},
			error:function(info){
				throw new Error('检查库存失败！');
			}
		});
	}

	//开始就检查库存
	checkStock();

	function addToBasket(){
		var number = parseInt(numDom.value);
		var params = {productId:productId,number:number};
		$.ajax({
			type:'get',
			url:urlObj.addAjax,
			data:params,
			success:function(data){
				if(data.success){
					window.location.href = urlObj.add;
					return;	
				}
				alert('添加失败！');
			},
			error:function(info){
				alert('添加失败！')
				throw new Error('检查库存失败！');
			}
		});		
	}

	//设置是否有货的文本
	function setStockText(hasStock){
		stockEl.innerHTML = hasStock ? '有货' : '无货';	
		$(addBasketBtn).toggleClass('disabled',!hasStock);
		$(buyNowBtn).toggleClass('disabled',!hasStock);
		canSubmit = hasStock && !!wdprice;
	}

	function updateProductPrice(){
		var number = getNumber();
		var totalPrice = number * productPrice;
		totalPriceEl.setAttribute('data-value',totalPrice);
		totalPriceEl.innerHTML = H.Common.resetPrice(totalPrice,true);
	}

	function getNumber(){
		return /^[1-9]\d*$/.test(numDom.value) ? parseInt(numDom.value) : 1;
	}

	function addEvents(dom,arr){
		for(var i=0,l=arr.length;i<l;i++){
			dom.addEventListener(arr[i],preventDefault);
		}
		var body = document.body;
		body.onselectstart = body.onpaste = body.oncopy = body.oncut = 'return false;';		
	}

	function preventDefault(e){
		e.preventDefault();
		return false;
	}

	addEvents(numDom,['keydown','keyup','paste']);

	H.Event.tapClick(function(e){
		var value = getNumber();
		if(value<=1){
			numDom.value = value;
			return;
		} 
		numDom.value = value - 1;
		updateProductPrice();
	},decreaseDom);

	H.Event.tapClick(function(e){
		var value = getNumber();
		if(value>999){
			numDom.value = value;
			return;
		}
		numDom.value = value + 1;
		updateProductPrice();
	},increaseDom);

	H.Event.tapClick(function(e,dom){
		if(!check()) return;
		addToBasket();
	},addBasketBtn);

	H.Event.tapClick(function(e,dom){
		if(!H.Common.checklogin()) return;
		if(!check()) return;
		var number = parseInt(numDom.value);
		window.location.href = urlObj.buy + '?productIds=' + productId + '&numbers=' + number;
	},buyNowBtn);

	function check(){
		if(!canSubmit) {
			console.log('无货或无微价！');
			return;
		}
		if(!G('regionInput').value){
			alert('请选择地址');
			return;
		}
		return true;
	}

}(this);