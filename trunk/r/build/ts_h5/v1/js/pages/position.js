!function(t,o){function e(t){var e=document.getElementById(t),n=e.offsetTop||parseInt(getComputedStyle(e).height),i=document.documentElement.scrollTop||document.body.scrollTop;n>=i?(e.style.position="relative",o(".listContainer .comment-box").css("margin-top","1.5rem"),o(".listContainer .rule-box").css("margin-top","0rem"),o(".listContainer .summary-box").css("margin-top","0rem"),o(".listContainer .service-box").css("margin-top","0rem")):(e.style.position="fixed",o(".listContainer .comment-box").css("margin-top","3.8rem"),o(".listContainer .rule-box").css("margin-top","2.3rem"),o(".listContainer .summary-box").css("margin-top","2.3rem"),o(".listContainer .service-box").css("margin-top","2.3rem"))}o(t).on("scroll",function(){e("details-box")});var n="ontouchstart"in t?"touchstart":"mousedown",i="ontouchstart"in t?"touchstart":"click";o(".summary-box,.rule-box,.comment-list,.service-box").on(n,function(){if(o(".details-box.active").length){var t=o("#details-box h2");t.next().hide(),t.trigger(i)}})}(this,this.$);