/**
 * @author: chenxiaoyong@ehaier.com
 * @date: 2015-01-13
 * @description: TS Drawer
 * @required: iscroll.js && public.css && HTML structure
 */

! function(window, $, undefined) {

	var CLASS_LOCK   = 'lock-screen',
		transition   = {
			'-webkit-transition': 'all  0.5s 0.2s ease',
			'-moz-transition': 'all   0.5s 0.2s ease',
			'-ms-transition': 'all   0.5s 0.2s ease',
			'-o-transition': 'all   0.5s 0.2s ease',
			'transition': 'all   0.5s 0.2s ease' 
		};

	function Drawer(elem, direction, className) {
		this.elem          = elem;
		this.className     = className;
		this.direction     = direction;
		this.main          = $('#J_main');
		this.drawer        = $('#J_drawer');
		this.leftDrawer    = $('#J_drawerLeft');
		this.rightDrawer   = $('#J_drawerRight');
		this.navItems	   = $('.nav .nav__item');
		this.enableLock    = false;
		this.isOpen   	   = false;
		this.maskLayer     = $('<div class="mask-layer" style="margin-top: 2.4rem"></div');
		this.addEvent();
	}

	Drawer.prototype.constructor = Drawer;

	Drawer.prototype.addMaskLayer = function() {
		var $this = this;
		$this.main.append($this.maskLayer);		
	}

	Drawer.prototype.removeMaskLayer = function() {
		var $this = this;
		$this.maskLayer.remove();		
	}

	Drawer.prototype.addScrollEffect = function() {
		var $this = this;
		if ( window.IScroll ) {
			new IScroll('#J_drawerLeft', {
				// scrollbars: true,
				mouseWheel: true,
				interactiveScrollbars: true,
				shrinkScrollbars: 'scale',
				fadeScrollbars: true,
				click: true
			});
			new IScroll('#J_drawerRight', {
				// scrollbars: true,
				mouseWheel: true,
				interactiveScrollbars: true,
				shrinkScrollbars: 'scale',
				fadeScrollbars: true,
				click: true
			});
		}			
	}

	Drawer.prototype.addAnimation = function() {
		var $this = this;
		$this.main
			.css(transition)
			.css('left','0');
		$this.drawer
			.css(transition)
			.css('left','0');
	}

	Drawer.prototype.lockScreen = function() {
		var $this = this;
		document.addEventListener('touchmove',function(event){
			$this.enableLock && event.preventDefault();
		},false);
	}
	
	Drawer.prototype.addLock = function() {
		this.enableLock = true;
		$('body').addClass(CLASS_LOCK);
	}
	Drawer.prototype.removeLock = function() {
		this.enableLock = false;
		setTimeout(function(){
			$('body').removeClass(CLASS_LOCK);
		}, 700);
	}
	Drawer.prototype.swipeLeft = function() {
		var $this = this;
		$this.leftDrawer.hide();
		$this.rightDrawer.show();
		var	rightDrawerWidth = -1*this.rightDrawer.width() + 'px';
		if ( $this.isOpen ) return;
		$this.isOpen = true;
		$this.addLock() || $this.addMaskLayer()
		$this.main.css('left', rightDrawerWidth);

	}
	Drawer.prototype.swipeRight = function() {
		var $this = this;
		$this.leftDrawer.show();
		$this.rightDrawer.hide();
		var	leftDrawerWidth = $this.leftDrawer.width() + 'px';
		if ( $this.isOpen ) return;
		$this.isOpen = true;
		$this.addLock() ||  $this.addMaskLayer()
		$this.main.css('left', leftDrawerWidth);
	}

	Drawer.prototype.recovery = function() {
		var $this = this;
		$this.removeLock() || $this.removeMaskLayer() || ($this.isOpen = false)
		$this.main.css('left', 0);
	}

	Drawer.prototype.addEvent = function() {
		var $this = this;
		$this.addScrollEffect() ||$this.addAnimation() || $this.lockScreen()

		if ( 'left' == $this.direction ) {
			$($this.elem).on('click', function(event){
				event.stopPropagation();
				if ( !$this.isOpen ) {
					$this.swipeLeft();
				} else {
					$this.recovery();
				}
				if ( $this.className ) {
					$(this).parent().toggleClass($this.className);
				}
			});
			
		} else {
			$($this.elem).on('click', function(event){
				//阻止评论页面取消点击触发此效果
				if(window.closeComment){ 
					delete window.closeComment;
					return;
				}

				event.stopPropagation();
				if ( !$this.isOpen ) {
					$this.swipeRight();
				} else {
					$this.recovery();
				}
				if ( $this.className ) {
					$(this).parent().toggleClass($this.className);
				}
			});
		}

		$this.main.on('click', function() {
			if ( $this.isOpen ) {
				$($this.elem).parent().toggleClass($this.className);
				$this.recovery();
			}
		});

		$this.navItems.on('click',function(){ 
			$this.navItems.removeClass('active');
			$(this).addClass('active');
		});
	}


	/**
	 * [drawer description]
	 * @param  {String} direction ["left" or "right"]
	 * @param  {String} [className] [CSS className eg."nav-toggle"]
	 */
	
	$.fn.drawer = function(direction, className) {
		return this.each(function () {
	      var $this = $(this)
	        , data = $this.data('drawer');
	      if ( !data ) 
	      	$this.data('drawer', (data = new Drawer(this, direction, className)));
	    })
	}

	$(function(){
		$('#J_switch').drawer('right', 'nav-toggle');
	});

}(this, this.$);