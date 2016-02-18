
window.onload=function(){ 

	var G = function(id){ 
		return document.getElementById(id);
	}

	if (!Array.prototype.map) {
	  Array.prototype.map = function(fun /*, thisp*/){
	    var len = this.length;
	    if (typeof fun != "function")
	      throw new TypeError(); 
	     var res = new Array(len);
	    var thisp = arguments[1];
	    for (var i = 0; i < len; i++)
	    {
	      if (i in this)
	        res[i] = fun.call(thisp, this[i], i, this);
	    } 
	     return res;
	  };
	}

	var addressObj = new Address(),
		orderObj = new Order(),
		ordProductObj = new OrdProduct();
	
	//ajax请求地址信息
	var base = 'http://static.tongshuai.com';
	var ajaxUrl = {
		region: { 
			url: '/mobile/region/regionTree.html?pid=2345',
			type:'post'
		}, 
		paylis: { 
			url:'/mobile/order/getPayAndDate.html',
			type:'post'
		},
		pay:{ 
			url:'/mobile/order/submit.html',
			type:'post'
		},
		paySuccess:{ 
			url:'/mobile/order/success.html',
			type:'post'
		},
		tCode:{ 
			url:'/mobile/order/getCoupons.html',
			type:'post'
		}
	}

	var province_Sel = G('province_Sel'),
		city_sel =  G('city_sel'),
		area_sel = G('area_sel');

	var payType_taobao = G('alipaymobileBtn'),
		payType_cod = G('codBtn'),
		payType_umspay = G('umspayBtn'),
		paymentCode = G('paymentCode'),
		paymentName = G('paymentName');


	//sku
	var sku = G('sku').value,
		num = parseInt(G('numberHidden').value);

	
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

	function queryReserveTimePeriod(value,data){ 
		for(var i=0,l=data.length;i<l;i++){ 
			var item  = data[i];
			if(item.day==value) return item.timePeriod;
		}
	}

	//加载地区信息
	var region = new junRegion({ 
		requestOnlyOne : true,
		provinceUrl :ajaxUrl.region.url,
		provinceSel:province_Sel,
		citySel:city_sel,
		areaSel:area_sel,
		dataKey:'data',
		key:'name',
		value:'id',
		areaChangeCallback:function(value){ 
			if(!value) return;
			var mdata = {
				'sku':sku,
				'regionId':value,
				'num' : num
			};
			$.ajax({ 
				url:ajaxUrl.paylis.url,
				type:ajaxUrl.paylis.type,
				data: mdata,
				success:function(data){ 
					var reserveDateSel = G('reserveDateSel');
					data = (data instanceof Object) ? data : JSON.parse(data);
					if(!data.success) return;
					var resShippingList = data.data.resShippingList;
					if(resShippingList.length){
						var defaultObj = resShippingList[0],
							day = defaultObj.day;
						
						var copy_resShippingList = JSON.parse(JSON.stringify(resShippingList));
						for(var ri=0,l=copy_resShippingList.length;ri<l;ri++){ 
							var ritem = copy_resShippingList[ri];
							ritem.weekDay = ritem.day;
						}

						region.initCommonSelect(reserveDateSel,copy_resShippingList,'weekDay','day','-请选择-',day);


						reserveDateSel.onchange=function(){ 
							var value = this.value;
							var data = queryReserveTimePeriod(value,resShippingList);
							if(data){ 
								data = (data instanceof Object) ? data : JSON.parse(data);
								var reserveTimePeriodSel = G('reserveTimePeriodSel');
								if(data && data.length && reserveTimePeriodSel){ 
									var obj = data[0];
									region.initCommonSelect(reserveTimePeriodSel,data,'value','key','-请选择-',obj.key);
								}
							}
						}

						reserveDateSel.onchange();
					}
					var payTypeData = data.data.payList,
						payType_taobao_paymentCode = payType_taobao.getAttribute('data-value'),
						payType_cod_paymentCode = payType_cod.getAttribute('data-value'),
						payType_umspay_paymentCode = payType_umspay.getAttribute('data-value'),
						hasTaobao = false,
						hasCod = false;
						hasUmspay = false;
					if(payTypeData){ 
						for(var i=0,l=payTypeData.length;i<l;i++){ 
							var item = payTypeData[i];
							if(item.paymentCode==payType_taobao_paymentCode) hasTaobao=true;
							if(item.paymentCode==payType_cod_paymentCode) hasCod=true;
							if(item.paymentCode==payType_umspay_paymentCode) hasUmspay = true;
						}
					}
					payType_taobao.style.display=hasTaobao? "block" : "none";
					payType_cod.style.display=hasCod ? "block" : "none";
					payType_umspay.style.display = hasUmspay ? "block" : "none";
					if(payTypeData.length===1){
						if(hasTaobao){							
							payType_taobao.className='bdRadius active';
							paymentCode.value = payType_taobao.getAttribute('data-value');
							paymentName.value = payType_taobao.getAttribute('data-key');
						}
						if(hasCod){ 
							payType_cod.className='bdRadius active';
							paymentCode.value=payType_cod.getAttribute('data-value');
							paymentName.value = payType_cod.getAttribute('data-key');
						}
						if(hasUmspay){ 
							payType_umspay.className='bdRadius active';
							paymentCode.value=payType_umspay.getAttribute('data-value');
							paymentName.value = payType_umspay.getAttribute('data-key');	
						}
					}
				},
				error:function(info){
					console.dir(info); 
				}
			});
		},
		initData : getRegionInitData(),
		ajaxFun:$.ajax
	});

	var linkAddr = 	document.querySelector(".linkAddr");
	EventObj.tapClick(showAddress,linkAddr);

	function showAddress () {
		var sliderAddr = document.querySelector(".sliderAddr");
		if(sliderAddr){ 
			sliderAddr.className="sliderAddr active";
			for(var i=0,items=sliderAddr.children,l=items.length;i<l;i++){ 
				var item = items[i];
				(function(item){ 
					EventObj.tapClick(function(){ 
						var activeEl = sliderAddr.querySelector('section.active');
						if(activeEl !==item){
							if(activeEl) activeEl.className="";
							item.className="active";
						}
						var addressDataStr = item.getAttribute('data-address');
						if(addressDataStr){ 
							var addressData = JSON.parse(addressDataStr);
							addressObj.update(addressData);
						}
						startPonter = null;
						setTimeout(function(){ 
							sliderAddr.className="sliderAddr";
						},500);
					},item);
				})(item);
			}
		}
	}

	//添加付款方式点击事件
	function payType_taobao_click() { 
		payType_taobao.className="bdRadius active";
		payType_cod.className = "bdRadius";
		payType_umspay.className="bdRadius";
		paymentCode.value = payType_taobao.getAttribute('data-value');
		paymentName.value = payType_taobao.getAttribute('data-key');
	} 

	function payType_cod_click () { 
		payType_cod.className="bdRadius active";
		payType_umspay.className="bdRadius";
		payType_taobao.className="bdRadius";
		paymentCode.value=payType_cod.getAttribute('data-value');
		paymentName.value = payType_cod.getAttribute('data-key');
	}

	function payType_umspay_click(){
		payType_umspay.className="bdRadius active";
		payType_cod.className="bdRadius";
		payType_taobao.className="bdRadius";
		paymentCode.value=payType_umspay.getAttribute('data-value');
		paymentName.value = payType_umspay.getAttribute('data-key');	
	}

	function addPayTypeClick(){ 
		EventObj.tapClick(payType_taobao_click,payType_taobao);
		EventObj.tapClick(payType_cod_click,payType_cod);
		EventObj.tapClick(payType_umspay_click,payType_umspay);	
	}

	addPayTypeClick();
	
	function getSelectText(sel){ 
		if(sel) return sel.options[sel.selectedIndex].text;
	}

	function setValue(obj,selector,dataFiledKey,callback){ 
		var inputs = document.querySelectorAll(selector);
		for(var i=0,l=inputs.length;i<l;i++){ 
			var input = inputs[i],
				filed = input.getAttribute(dataFiledKey),
				value = input.value;
			if(filed && obj.hasOwnProperty(filed)){ 
				obj[filed] = value;
			}
		}
		callback && callback(obj);
	}

	var checkInfor={ 
		contacter:{ 
			errorMsg:'姓名不正确！',
			reg:/^[\u4e00-\u9fa5a-zA-Z]+$/
		},
		mobile:{ 
			errorMsg:'手机号不正确！',
			reg:/^0?(13|15|17|18|14)[0-9]{9}$/
		},
		address:{ 
			errorMsg:'地址不正确！',
			reg:/^\s*([\u4e00-\u9fa5a-zA-Z0-9_()（）-\s])+\s*$/
		},
		provinceId:{ 
			errorMsg:'请选择省份！',
			reg:/[^0]/
		},
		cityId:{ 
			errorMsg:'请选择城市！',
			reg:/[^0]/
		},
		regionId:{ 
			errorMsg:'请选择县/市！',
			reg:/[^0]/
		},
		paymentCode:{ 
			errorMsg:'请选择支付方式！',
			reg:/^(alipaymobile)|(cod)|(umspay)$/
		},
		reserveDate:{ 
			errorMsg:'请选择配送日期！',
			reg:/[^0]/
		},
		reserveTimePeriod:{ 
			errorMsg:'请选择配送时间！',
			reg:/[^0]/
		},
		memberInvoiceTitle:{ 
			errorMsg:'发票格式不正确！',
			reg:/^\s*([\u4e00-\u9fa5a-zA-Z0-9_()（）-])*\s*$/
		},
		remark:{ 
			errorMsg:'订单备注信息格式不正确！',
			reg:/^\s*([\u4e00-\u9fa5a-zA-Z0-9_()（）-])*\s*$/
		},
		tCode:{ 
			errorMsg:'',
			reg:/^[\s\S]*$/
		}
	}

	function checkForm(obj,selector,dataFiledKey,callback){ 
		var inputs = document.querySelectorAll(selector);
		for(var i=0,l=inputs.length;i<l;i++){ 
			var input = inputs[i],
				filed = input.getAttribute(dataFiledKey),
				value = input.value,
				checkItem = checkInfor[filed];
				if(checkItem){ 
					var reg = checkItem.reg,
						flg = reg.test(value);
						if(!flg){ 
							var errorMsg = checkInfor[filed].errorMsg;
							layer.open({
							    content: errorMsg,
							    shadeClose: false,
							    fixed:false,
							    top:(document.documentElement.clientHeight-200)/2,
							    btn: ['好的']
							});
							return false;
						}
				}
				
		}
		return true;
	}

	function reSetValue(obj,selector,dataFiledKey,item,callback){ 
		var inputs = document.querySelectorAll(selector);
		for(var i=0,l=inputs.length;i<l;i++){ 
			var input = inputs[i];
			var filed = input.getAttribute(dataFiledKey);
			if(obj.hasOwnProperty(filed)){ 
				var value = obj[filed];
				input.value = value;
				if(item.hasOwnProperty(filed)){ 
					item[filed] = value;
				}
			}
		}
		callback && callback(obj);
	}

	function Address(contacter,mobile,provinceId,cityId,regionId,regionName,address){ 
		this.contacter = contacter;
		this.mobile = mobile;
		this.provinceId = provinceId;
		this.cityId = cityId;
		this.regionId = regionId;
		this.regionName = regionName;
		this.address = address;
	}

	Address.prototype.init=function(){ 
		setValue(this,'.link-box .data_input','data-filed',function(obj){
			obj.regionName = getSelectText(province_Sel) + getSelectText(city_sel) + getSelectText(area_sel);
		});
	}

	Address.prototype.check=function(){ 
		return checkForm(this,'.link-box .data_input','data-filed');
	}

	Address.prototype.update=function(obj){
		var self = this;
		reSetValue(obj,'.link-box .data_input','data-filed',this,function(obj){
			province_Sel.onchange();
			if(obj.cityId){ 
				city_sel.value = obj.cityId;
				city_sel.onchange();
			}
			if(obj.regionId){ 
				area_sel.value = obj.regionId;
				area_sel.onchange();
			}
			if(obj.memberAddressId){ 
				self.memberAddressId = obj.memberAddressId;
			}
		});
	}

	function Order(paymentCode,paymentName,isCod,deliveryType,reserveDate,reserveTimePeriod,memberInvoiceTitle,remark){ 
		this.paymentCode = paymentCode;
		this.paymentName = paymentName;
		this.isCod = isCod;
		this.deliveryType = deliveryType || 1;	//配送方式暂定为1
		this.reserveDate = reserveDate;
		this.reserveTimePeriod = reserveTimePeriod;
		this.memberInvoiceTitle = memberInvoiceTitle;
		this.remark = remark;
	}

	Order.prototype.init=function(){ 
		setValue(this,'.deliverTime .data_input,.payMode .data_input,.companyBill .data_input','data-filed',function(obj){
			obj.isCod = (obj.paymentCode == payType_cod.getAttribute('data-value')) ? 1 : 0;
		});
	}
	Order.prototype.check=function(){ 
		return checkForm(this,'.deliverTime .data_input,.payMode .data_input,.companyBill .data_input','data-filed');
	}
	function OrdProduct(number,productId,tCode){ 
		this.number = number;
		this.productId = productId;
		this.tCode = tCode;
	}

	OrdProduct.prototype.init=function(){ 
		setValue(this,'.productList .data_input,.tCodeSection .data_input','data-filed');
	}

	function submitOrder(address,order,ordProduct){ 
		this.address = address;
		this.order = order;
		this.ordProduct = ordProduct;
	}

	function dealData(data,hasPoint){ 
		var obj = {};
		for(var key in data){ 
			var item = data[key];
			for(var mkey in item){ 
				var okey = hasPoint ? key+'.'+mkey : mkey;
				obj[okey] = item[mkey];
			}
		}
		return obj;
	}

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


	//tCode
	var tCodeEl = G('tCode'),
		totalPriceEl = G('totalPrice');
	function queryCoupon(callback){ 
		var tCode = tCodeEl.value;
		if(!tCode.replace(/(^\s*)|(\s*$)/,'')) return;
		var mData = {'sku':sku,'tCode':tCode};
		$.ajax({ 
			url:ajaxUrl.tCode.url,
			type:ajaxUrl.tCode.type,
			data:mData,
			success:function(returnData){ 
				if(returnData && returnData.success && returnData.data){ 
					var couponValue = returnData.data.couponValue;
					if(couponValue){ 
						var originPrice = parseFloat(totalPriceEl.getAttribute('data-org-value'));
						var lastPrice = originPrice - parseFloat(couponValue);
						totalPriceEl.setAttribute('data-value',lastPrice);
						updatePrice('.showPricelb');
						callback(true,tCode);
						return;
					}
				}
				callback(false);
			},
			error:function(){ 
				callback(false);
			}
		});
	}

	var tCodeSuccess = true;
	var tCodeValue = '';
	var checkTCodeBtn = G('checkTCode');
	EventObj.tapClick(function() { 
		queryCoupon(function(isSuccess,value){ 
			tCodeSuccess = isSuccess;
			tCodeValue = value || '';
			var errorMsg = tCodeSuccess?"优惠券使用成功":"优惠券使用失败";
			layer.open({
			    content: errorMsg,
			    shadeClose: false,
			    fixed:false,
			    top:(document.documentElement.clientHeight-200)/2,
			    btn: ['好的']
			});
			if(!tCodeSuccess) { 
				tCodeEl.value='';
				var originPrice = parseFloat(totalPriceEl.getAttribute('data-org-value'));
				totalPriceEl.setAttribute('data-value',originPrice);
				updatePrice('.showPricelb');
			}
		});
	},checkTCodeBtn);

	var submitBtn = G('submitBtn');
	EventObj.tapClick(function() { 
		if(addressObj.check() && orderObj.check()){
			addressObj.init();
			orderObj.init();
			ordProductObj.init();
			ordProductObj.tCode = tCodeValue;
			var submitOrderObj = new submitOrder(addressObj,orderObj,ordProductObj);
			submit(submitOrderObj);
		}
	},submitBtn);


	function submit(mdata){ 
		var tData = JSON.parse(JSON.stringify(mdata));
		tData = dealData(tData,false);
		openPage(ajaxUrl.pay.url,ajaxUrl.pay.type,tData);
	}

}