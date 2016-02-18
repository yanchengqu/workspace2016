/**
 * @author: chenxiaoyong@ehaier.com
 * @date: 2015-02-11
 * @description: Tab
 * @version: v0.1
 * @required: jquery.js
 */

!function (window, $,undefined) {
	
	var CLASS_HEADACTIVE = 'tab-head__item--active',
		CLASS_BODYACTIVE = 'tab-body__item--active',
		Tab = function(element) {
			this.element = element;
		};

	Tab.prototype = {
		constructor: Tab,
		show: function() {
			var $this   = $(this.element),
				$parent = $this.closest('.tab'),
				head    = $parent.find('.tab-head'),
				body    = $parent.find('.tab-body'),
				target  = body.find('.tab-body__item'),
				index   = $this.index();
			if ($this.hasClass(CLASS_HEADACTIVE)) return;
			head.find('.' + CLASS_HEADACTIVE).removeClass(CLASS_HEADACTIVE) &&
			body.find('.' + CLASS_BODYACTIVE).removeClass(CLASS_BODYACTIVE) &&
			$this.addClass(CLASS_HEADACTIVE);
			if ( index + 1 <= target.length ) {
				target.eq(index).addClass(CLASS_BODYACTIVE);
			} 
		}
	};

	 $.fn.tab = function ( option ) {
	    return this.each(function () {
	      var $this = $(this), 
	      	  data = $this.data('tab');
	      if (!data) $this.data('tab', (data = new Tab(this)));
	      if (typeof option == 'string') data[option]();
	    })
  	}

	$(function(){
		$(document).on('click', '.tab-head__item', function(){
			$(this).tab('show');
			return false;
		});
	});

	
}(this, this.jQuery);
