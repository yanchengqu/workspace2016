/**
 * @author: chenxiaoyong@ehaier.com
 * @date: 2015-01-13
 * @description: TS homepage
 */

! function (window, $,undefined) {
	
	var Page = {
		hideBar : function () {			
				setTimeout(function(){ window.scrollTo(0, 1); }, 100);				
		},
		bootSwiper: function () {
			var slideSwiper = new Swiper('#J_buySwiper',{
				pagination: '.pagination',
				loop:true,
				grabCursor: true,
				paginationClickable: true,
				calculateHeight: true
			  });
		},		
		init: function () {
			this.hideBar();
			this.bootSwiper();
		}
	};
	
	$(function () {		
		Page.init();
	});
}(this, $)

window.onload=function(){ 

	var G = function(id){ 
		return document.getElementById(id);
	}
	
	var province_Sel = G('province_Sel'),
	city_sel =  G('city_sel'),
	area_sel = G('area_sel');

	var numberBar = $('#numberBar'),
		subBtn = $('.sub',numberBar),
		numBtn = $('.num',numberBar),
		addBtn = $('.add',numberBar);

	function stopModify(event){ 
		event.preventDefault();
		return false;		
	}

	numBtn.on('paste',stopModify);
	numBtn.on('copy',stopModify);
	numBtn.on('cut',stopModify);

	//商品库存数量
	var avaibleQtyNumer = parseInt($('#avaibleQty').val() || 0);

	function getSelectText(sel){ 
		if(sel) return sel.options[sel.selectedIndex].text;
	}

	//得到省市区初使化信息
	function getRegionInitData(){ 
		var obj={};
		var pid = province_Sel.getAttribute('data-value'),
			cid = city_sel.getAttribute('data-value'),
			aid = area_sel.getAttribute('data-value');

		if(pid!='0'){ 
			obj.pid = pid;
			if(cid!='0'){ 
				obj.cid = cid;
				if(aid!='0'){ 
					obj.aid = aid;
				}
			}
		}
		return obj;
	}

	var regionUrl = '/mobile/region/regionTree.html?pid=2345';
	var region = new junRegion({ 
		requestOnlyOne : true,
		provinceUrl :regionUrl,
		provinceSel:province_Sel,
		citySel:city_sel,
		areaSel:area_sel,
		dataKey:'data',
		key:'name',
		value:'id',
		provinceChangeCallback:function(value){ 
			setHasGood(false,true);
		},
		cityChangeCallback:function(value){ 
			setHasGood(false,true);
		},
		areaChangeCallback:function(value){ 
			value = parseInt(value);
			if(value && value!='0'){
				setDefaultRegion();
				queryHasGood(function(data){ 
					var avaibleQty = parseInt(data.data.avaibleQty);
					avaibleQtyNumer = avaibleQty;
					var num = parseInt(numBtn.val());
					setHasGood(avaibleQty>=num);
				});
			}
			setHasGood(false);
		},
		initData : getRegionInitData(),
		ajaxFun:$.ajax
	});

	function setDefaultRegion(){ 
		var regionName = [getSelectText(province_Sel),getSelectText(city_sel),getSelectText(area_sel)].join(' ');
		var mdata = {
			'province':province_Sel.value,
			'city':city_sel.value,
			'region':area_sel.value,
			'regionName': regionName
		}
		$.ajax({ 
			url:'/mobile/region/setDefaultRegion.html',
			type:'post',
			data: mdata
		});
	}

	function queryHasGood(successcallback,errorcallback){ 
		var mdata = { 
			sku: G('sku').value,
			regionId : area_sel.value,
			number: parseInt(numBtn.val())
		}
		$.ajax({ 
			url:'/mobile/product/stock.html',
			type:'get',
			data: mdata,
			success:function(data){ 
				data = (data instanceof Object) ? data : JSON.parse(data);
				if(data.success){ 
					successcallback && successcallback(data);
				}
				else{ 
					errorcallback && errorcallback(data);
				}
			},
			error:function(info){
				errorcallback && errorcallback(info);
			}
		});
	}

	function isDoQuery(){ 
		return parseInt(G('sku').value) && rea_sel.value && rea_sel.value!='0';
	}

	var noStockPlaceOrderEl = G('noStockPlaceOrder');
	function setHasGood(flag,hideStatus){ 
		if(noStockPlaceOrderEl && ~~noStockPlaceOrderEl.value){ 
			flag = true;
			hideStatus = null;
		}
		var lb = G('statuslb');
		var value = flag ? '有货' : '无货';
		lb.innerHTML = value;
		lb.style.display= !hideStatus ? 'block' : 'none';
		$('#submitBtn').toggleClass('Disabled',!flag);
	}

	numBtn.bind('keydown',function(e){
		e.preventDefault(); 
		/*
		var keyCode = parseInt(e.keyCode);
		if(keyCode<48 || keyCode>57) e.preventDefault();
		if(!(/^[1,9]+(\d+)?$/.test(this.value))) e.preventDefault();
		*/
	});

	EventObj.tapClick(function(){ 
		var count = numBtn.val();
			count = /^[1-9]\d*$/.test(count) ? count : 0;
		var value = parseInt(count);
		if(value<=1) return;
		numBtn.val(--value);
		changePrice(value);
	},subBtn[0]);

	EventObj.tapClick(function(){ 
		var count = numBtn.val();
			count = /^[1-9]\d*$/.test(count) ? count : 0;
		var value = parseInt(count);
		numBtn.val(++value);
		changePrice(value);
	},addBtn[0]);

	EventObj.tapClick(function(dom){ 
		if($(dom).hasClass('Disabled')) return;
		var subUrl = "/mobile/order/toSubmit.html";
		var productId = $('#productId').val();
		var num = numBtn.val();
		if(productId && num){ 
			openPage(subUrl,'post',{"productId":productId,"num":num});
		}
	},G('submitBtn'))

	function changePrice(num){ 
		var price = parseFloat($('#tx_price').val());
		var sum = num * price;
		var tailPrice = sum.toFixed(2).split('.')[1];
		var priceSumStrOrg = parseInt(sum).toString();
		var priceSumStr = priceSumStrOrg.split('').reverse().join('').replace(/(\d{3})/g,'$1,').replace(/\,$/,'').split('').reverse().join('');
		$('#pricelb').html('¥'+priceSumStr+'.'+tailPrice);

		var aid = area_sel.value;
		setHasGood(num<=avaibleQtyNumer && aid && aid!='0');
	}
	
	changePrice(1);

	function initStatus(){ 
		var aid = area_sel.value;
		if(aid=='0'){
			/*
			var num = parseInt(numBtn.val());
			var avaibleQty = parseInt($('#avaibleQty').val() || 0);
			setHasGood(avaibleQty>=num,);
			*/
			setHasGood(false,true);
		}
	}
	initStatus();

	function resetPrice(price){ 
		var sum = parseFloat(price),
			tailPrice = sum.toFixed(2).split('.')[1],
			priceSumStrOrg = parseInt(sum).toString(),
			priceSumStr = priceSumStrOrg.split('').reverse().join('').replace(/(\d{3})/g,'$1,').replace(/\,$/,'').split('').reverse().join('');
		return '&yen;'+priceSumStr+'.'+tailPrice;
	}
	function updatePrice(selector){ 
		var elements = document.querySelectorAll(selector);
		for(var i=0,l=elements.length;i<l;i++){ 
			var el = elements[i];
			var value = el.getAttribute('data-value');
			if(value){ 
				var priceSumStr = resetPrice(value);
				el.innerHTML = priceSumStr;
			}
		}
	}

	updatePrice('.showPricelb');
}