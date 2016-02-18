/**
 * @author: 
 * @date: 2015-07-29
 * @description:
 * @site:
 * @require: 
 */

!function(window, $, undefined) {

	var $location = window.location;

	$(function(){
		
		var bodyHeight = $('body').height(),
			viewHeight = $(window).height(),
			height     = bodyHeight > viewHeight ? bodyHeight : viewHeight;
		$('body').css('height', height);

		var region = new TabRegion({
			container:'.slidebar_detail',
			url:'/v2/mstore/getRegion.html',
			key: 'regionName',
			children_key : 'childs',
			ajaxFun:$.ajax,
			complateCallback:function(provinceObj,cityObj,areaObj){
				slider.hide(true);
				$('#openAddressBtn').val(provinceObj.regionName+cityObj.regionName+areaObj.regionName);
				$('#provinceId').val(provinceObj.id);
				$('#cityId').val(cityObj.id);
				$('#regionId').val(areaObj.id);
			}
		});

		var slider = new SliderAside({
			sliderSelector:'.region_slidebar',
			showBtn:'#openAddressBtn',
			preHideCallback:function(){
				return region.back();
			},
			preShowCallback:function(){
				region.reset();
			}
		});

		var lmSlider = new SliderAside({
			sliderSelector:'.lm_slidebar',
			showBtn:'#lmType',
			preHideCallback:function(){
			},
			preShowCallback:function(){
				initLm();
			}			
		});

		var lmType = G('lmType');
		var lmData = null;
		function queryLmData(){
			$.ajax({
				url:'/v2/mstore/getMemberType.html',
				type:'get',
				success:function(data){
					if(data && data.data) {
						lmData = data.data;
						initLm();
					}
				}
			});
			//lmData = {"data":[{"dictionary_display_value":"服务兵","dictionary_db_value":"1"},{"dictionary_display_value":"设计师","dictionary_db_value":"2"},{"dictionary_display_value":"家电直销员","dictionary_db_value":"3"},{"dictionary_display_value":"创业青年","dictionary_db_value":"4"},{"dictionary_display_value":"妇女帮","dictionary_db_value":"5"},{"dictionary_display_value":"社区","dictionary_db_value":"6"},{"dictionary_display_value":"大学生","dictionary_db_value":"7"},{"dictionary_display_value":"创客","dictionary_db_value":"8"},{"dictionary_display_value":"其他","dictionary_db_value":"9"}]}.data;
			initLm();
		}
		function initLm(){
			if(!lmData) return;
			var type = lmType.value;
			if(type){
				lmData.forEach(function(item){
					item.checkedStr = (item.dictionary_display_value===type?'checkbox--checked':'');
				});
			}

			var lmTemplate = ""
			+'<%data.forEach(function(item){%>'
	        	+'<li class="item" data-value="<%=item.dictionary_db_value%>" data-text="<%=item.dictionary_display_value%>">'
					+'<span class="checkbox <%=item.checkedStr%>"></span><%=item.dictionary_display_value%>'
				+'</li>'
			+'<%});%>';

			var lmFun = H.Template.template(lmTemplate);

			var typeList = G('typeList');
			typeList.innerHTML=lmFun(lmData);
			H.Event.tapClick(function(e){
				var $target = $(e.target).closest('.item');
				if(!$target.length) return;
				lmType.value = $target.attr('data-text');
				G('lmtypeValue').value = $target.attr('data-value');
				$target.parent().find('.checkbox').removeClass('checkbox--checked');
				$target.find('.checkbox').addClass('checkbox--checked');
				setTimeout(function(){
					lmSlider.hide();
				},100);
			},typeList);
		}
		queryLmData();

		/*
		var validator = new FormValidator('form', [{
		    name: 'memberRealName',
		    rules: 'required'
		}, {
		    name: 'regionName',
		    rules: 'required'
		}, {
		    name: 'address',
		    rules: 'required'
		}, {
		    name: 'storeName',
		    rules: 'required'
		}], function(errors, event) {

			$('#form').find('input[type="text"]').removeClass('error');

		    if ( errors.length > 0) {
			    for ( var i = errors.length - 1; i >=0; i-- ) {
			    	$(errors[i]['element'])
			    	.attr('placeholder', errors[i]['message'])
			    	.addClass('error');
			    }
		    }

		});
		validator.setMessage('required', '必填项');
		*/

		function check(){
			return H.Common.ValidateForm(G('form'),{
				memberRealName:{required:true,reg:/^.{1,20}$/},
				openAddressBtn:{required:true,reg:/^.{2,50}$/},
				address:{required:true,reg:/^.{2,50}$/},
				storeName:{required:true,reg:/^.{1,20}$/},
				lmType:{required:true,reg:/^.{2,20}$/}
			},G('errorTip'));
		}		

		var subBtn = document.querySelector('.btn');
		if(subBtn){
			H.Event.tapClick(function(){
				if(!check()) return;
				$('#form').submit();
			},subBtn);
		}

	});

}(this, this.Zepto)
