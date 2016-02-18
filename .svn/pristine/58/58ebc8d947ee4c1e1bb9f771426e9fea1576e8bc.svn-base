/**
 * @author: 
 * @date: 2015-07-29
 * @description:
 * @site:
 * @require: 
 */

!function ($) {
	
	var SHOW_CLASS = 'dialog--show',
		MASK_CLASS = 'mask-layer',
		exp = 'Dialog' + (+new Date());

	
    var Dialog = function (element, options) {
        this.element = $(element);
		this.maskLayer = $('<div>').addClass(MASK_CLASS);
		this.options = options || {};
		this.isShown = false;
		this.init();
    };

    Dialog.prototype = {

        constructor: Dialog,
		
		init: function() {
			var that = this,
				$ele = that.element;
			this.put();
			this.maskLayer.click(function(){
				that.toggle();
			});	
			
			var actionDom  = $ele.find('[data-action]'),
				actionName = actionDom.length > 0 && actionDom.data('action');
			if ( actionName ) {
				actionDom.click(function(){
					that[actionName]();	
				});	
			}			
		},
		
        show: function() {
			var that = this;
			if ( this.isShown ) return;
			this.options.mask && this.addMaskLayer()
			this.element.addClass(SHOW_CLASS);
			this.isShown = true;
			this.unique();
			document.addEventListener('touchmove',function(event){
				that.isShown && event.preventDefault();
			},false);						
		},

        hide: function() {
			var that = this;			
			if ( !this.isShown ) return;
			this.options.mask && this.removeMaskLayer();
			this.element.removeClass(SHOW_CLASS);
			this.isShown = false;
			this.unique();
			document.addEventListener('touchmove',function(event){
				that.isShown && event.preventDefault();
			},false);
		},

        toggle: function() {
			return this[!this.isShown ? 'show' : 'hide']();
		},
		
		addMaskLayer: function() {
			this.maskLayer.appendTo('body');
			var bodyHeight = $('body').height(),
				viewHeight = $(window).height(),
				height     = bodyHeight > viewHeight ? bodyHeight : viewHeight;
			$('body').css({
				position: 'relative',
				height: height
			});
		},
		
		removeMaskLayer: function() {
			this.maskLayer.remove();
			$('body').css({
				position: '',
				height: ''
			});
		},
		
		cache: {},
		
		put: function() {
						
			var name     = this.options['name'],
				selector = this.options.selector,
				node     = this.cache[name];
				
			if ( !name ) return;
			
			!node && (
				node = this.cache[name] = {
					activeDialog: null,
					members: {}
				}
			)

			selector && ( node['members'][selector] = this )
		},

		unique: function() {

			var name      = this.options['name'],
				node      = this.cache[name],
				curDialog = node && node['activeDialog'];
				
			if ( !name ) return;
			
			if ( this.isShown ) {
				curDialog && curDialog.hide();
				node['activeDialog'] = this;
			} else {
				curDialog.hide(); 
				node['activeDialog'] = null;
			}
		}
	
    };
	
	Dialog.defaultOptions = {
		mask: false,
		toggle: true
	}; 

    $.fn.dialog = function(option) {
        this.each(function(){
			var $this = $(this);
                data  = $this.data('dialog'),
				options = $.extend({}, Dialog.defaultOptions, $this.data(), typeof option == 'object' && option);
		  
		  	if (!data) $this.data('dialog', (data = new Dialog(this, options)));
		  
		  	if (typeof option == 'string') { 
		  		data[option]();
			} else if (options.toggle) {
				data.toggle();
			}
			
		});
    };

    $(document).on('click.dialog.data-api', '[data-toggle="dialog"]', function (e) {
         var $this  = $(this),
             target = $($this.data('target'));
        target.dialog({
			name: exp,
			mask: true,
			selector: $this.data('target')
		});
    });
	
}(this.jQuery || this.Zepto);
