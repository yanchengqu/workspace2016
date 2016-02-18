!function(){
	var submitBtn = G('submit');
	var form = G('form');
	var nameEl = G('wdName');
	var closeBtn = G('closeBtn');

	H.Event.tapClick(function(){
		if(!check()) return;
		form.submit();
	},submitBtn);

	H.Event.tapClick(function(){
		nameEl.value = '';
	},closeBtn);

	nameEl.addEventListener('input',function(){
		$(submitBtn).toggleClass('active',!!nameEl.value.length);	
	})

	function check(){
		return H.Common.ValidateForm(form,{
			wdName:{required:true,reg:/^.{1,20}$/}
		},G('errorTip'));
	}

}();