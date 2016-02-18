!function(){
	function G(id){return document.getElementById(id)};
	var region = new TabRegion({
		container:'.slidebar_detail',
		url:'/v2/h5/item/getRegion.json',
		key:'regionName',
		children_key:'childs',
		ajaxFun:$.ajax,
		complateCallback:function(provinceObj,cityObj,areaObj){
			slider.hide(true);
			$('#addresstb').val(provinceObj.regionName+cityObj.regionName+areaObj.regionName);
			$('#provinceId').val(provinceObj.id);
			$('#cityId').val(cityObj.id);
			$('#areaId').val(areaObj.id);
		}
	});

	var slider = new SliderAside({
		showBtn:'#openAddressBtn',
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

	function check(){
		return true;
	}

	H.Event.tapClick(function(e){
		if(!check()) return;
		$('#form').submit();
	},$('#submitBtn')[0]);
	
	var setDefaultBtn = G('setDefaultBtn');
	if(setDefaultBtn){
		H.Event.tapClick(function(e){
			if($('#setDefaultBtn').hasClass('disabled')) return redirect();
			var params = {'addrId':G('addrId').value};
			$.ajax({
				url:'/v2/h5/shippingAddress/updateDefaultAddr.html',
				type:'get',
				data:params,
				success:function(data){
					if(data.success) {
						$('#setDefaultBtn').addClass('disabled');
						redirect();
					}
				},
				error:function(){
					alert('设置默认地址失败！');
					throw new Error('设置默认地址失败！');
				}
			});
		},setDefaultBtn);
	}

	function redirect(){
		window.location.href = '/v2/h5/order/pageInfo.html';
	}

	function check(){
		return H.Common.ValidateForm(G('form'),{
			memberRealName:{required:true,reg:/^.{1,20}$/},
			memberRealTel:{required:true,reg:/^1\d{10}$/},
			memberRealCode:{required:true,reg:/^\d{6}$/},
			addresstb:{required:true},
			memberRealAddress:{required:true,reg:/^.{5,100}$/}
		},G('errorTip'));
	}
}();