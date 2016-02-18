/**
 * @author: 
 * @date: 2015-07-29
 * @description:
 * @site:
 * @require: 
 */

!function(window, $, undefined) {

	var shareConfig = window['pageConfig'] && window['pageConfig']['share'],
		shareButton = $('#J_share');
	
	hdk.init("ehaier", function(mode) {

		var loginBtn = $('.user-loginbar .btn');

		loginBtn.length > 0 &&  loginBtn.on('click', function(event) {
			event.preventDefault();
			if( !hdk.user.isLogin ) {
				hdk.user.auth(function(status, data) {});
				return;
			}
		});
	});	

	// 在微信中隐藏返回箭头和分享按钮
	
	if ( H.UA.isWeixin ) {
		!H.UA.isHaier && $('.nav__back').hide();
	}

	// 图片延迟加载
	$(window).bind('load', function(){
		$('.lazyload').length > 0 &&
		$('.lazyload').lazyload({
			placeholder_data_img: 'http://static.tongshuai.com/wd/img/placeholder.png'
		});
	});

	var lmType = G('lmType');
	var lmData = null;
	var reUrl = '/v2/mstore/indexProductCate.html?storeId='+G('storeId').value;
	function queryLmData(){
		/*
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
		*/
		lmData = [
			{name:'全部',id:'0'},		
			{name:'冰箱',id:'2723'},
			{name:'洗衣机',id:'2725'},
			{name:'空调',id:'2729'},
			{name:'彩电',id:'2743'},
			{name:'热水器',id:'2741'},
			{name:'厨房电器',id:'2742'},
			{name:'生活家电',id:'2737'},
			{name:'冷柜',id:'2724'},
			{name:'家庭保健产品',id:'2736'},
			{name:'电脑',id:'2738'},
			{name:'数码',id:'2739'},
			{name:'手机',id:'2740'},
			{name:'水家电',id:'2774'},
			{name:'冰吧酒柜',id:'2726'},
			{name:'商用空调',id:'2811'},
			{name:'医疗冷柜',id:'2823'},
			{name:'套装',id:'2873'}
		];
		initLm();
	}
	function initLm(){
		if(!lmData) return;
		var type = lmType.getAttribute('data-id');
		if(type){
			lmData.forEach(function(item){
				item.checkedStr = (item.id===type?'checkbox--checked':'');
			});
		}

		var lmTemplate = ""
		+'<%data.forEach(function(item){%>'
        	+'<li class="item" data-id="<%=item.id%>" data-name="<%=item.name%>">'
				+'<span class="checkbox <%=item.checkedStr%>"></span><%=item.name%>'
			+'</li>'
		+'<%});%>';

		var lmFun = H.Template.template(lmTemplate);

		var typeList = G('typeList');
		typeList.innerHTML=lmFun(lmData);
		H.Event.tapClick(function(e){
			var $target = $(e.target).closest('.item');
			if(!$target.length) return;
			var id = $target.attr('data-id');
			lmType.setAttribute('data-name',$target.attr('data-name'));
			lmType.setAttribute('data-id',id);
			$target.parent().find('.checkbox').removeClass('checkbox--checked');
			$target.find('.checkbox').addClass('checkbox--checked');
			setTimeout(function(){
				lmSlider.hide();
				window.location.href = reUrl + '&productCateId=' + id;
			},500);
		},typeList);
	}
	queryLmData();
	
}(this, this.Zepto)
