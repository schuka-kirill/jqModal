/*
 * jqModal - Minimalist Modaling with jQuery
 *
 * Copyright (c) 2007 Brice Burgess <bhb@iceburg.net>, http://www.iceburg.net
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * $Version: 2007.02.23 +r7
 */
(function($) {
$.fn.jqm=function(o){
var _o = {
zIndex: 3000,
overlay: 50,
overlayClass: 'jqmOverlay',
closeClass: 'jqmClose',
trigger: '.jqModal',
ajax: false,
target: false,
modal: false,
onShow: false,
onHide: false,
onLoad: false
};
return this.each(function(){if(this._jqm)return; s++; this._jqm=s;
hash[s]={c:$.extend(_o, o),a:false,w:$(this).addClass('jqmID'+s),s:s};
if(_o.trigger)$(this).jqmAddTrigger(_o.trigger);
});}

$.fn.jqmAddClose=function(e){hs(this,e,'jqmHide'); return this;}
$.fn.jqmAddTrigger=function(e){hs(this,e,'jqmShow'); return this;}
$.fn.jqmShow=function(t){return this.each(function(){if(!hash[this._jqm].a)$.jqm.open(this._jqm,t)});}
$.fn.jqmHide=function(t){return this.each(function(){if(hash[this._jqm].a)$.jqm.close(this._jqm,t)});}

$.jqm = {
open:function(s,t){var h=hash[s];h.t=t;var c=h.c;var cc='.'+c.closeClass;h.a=true;
	var z=(/^\d+$/.test(h.w.css('z-index')))?h.w.css('z-index'):c.zIndex;if(z<3)z=5;h.w.css('z-index',z);
	var i=$('<iframe></iframe>').css({'z-index':z-2,opacity:0});
	var o=$('<div></div>').css({'z-index':z-1,opacity:c.overlay/100}).addClass(c.overlayClass);
	$([i[0],o[0]]).css({height:'100%',width:'100%',position:'fixed',left:0,top:0});

	if(c.modal) {if(ma.length == 0)mf('bind');ma.push(s);o.css('cursor','wait');}
	else if(c.overlay > 0)h.w.jqmAddClose(o);
	else o=(ie6)?$():false;

	if(ie6){$('html,body').css('height','100%');o.add(i[0]).css({position:'absolute'}).each(function(){for(y in {Top:1,Left:1})this.style.setExpression(y.toLowerCase(),"(_=(document.documentElement.scroll"+y+" || document.body.scroll"+y+"))+'px'");});}
	if(o)h.o=o.appendTo('body');

	if(c.ajax) {var r=c.target;r=(r)?(typeof r == 'string')?$(r,h.w):$(r):h.w;
		var u=c.ajax;u=(u.substr(0,1) == '@')?$(t).attr(u.substring(1)):u;
		r.load(u,function(){if(c.onLoad)c.onLoad.call(this,h);if(cc)h.w.jqmAddClose($(cc,h.w));f(h);});}
	else if(cc)h.w.jqmAddClose($(cc,h.w));

	(c.onShow)?c.onShow(h):h.w.show();f(h);return false;
},
close:function(s){var h=hash[s];h.a=false; 
	if(ma.length != 0){ma.pop();if(ma.length == 0)mf('unbind');}
	if(h.c.onHide)h.c.onHide(h);else{h.w.hide();if(h.o)h.o.remove();} return false;
}};
var s=0;
var hash={};
var ie6=$.browser.msie && typeof XMLHttpRequest == 'function';
var f=function(h){h.f=$(':input:visible',h.w)[0]||h.w[0];h.f.focus();}
var ma=[];
var mf=function(t){$()[t]("keypress",m)[t]("keydown",m)[t]("mousedown",m);};
var m=function(e) {var h=hash[ma[ma.length-1]];var r=(!$(e.target).parents('.jqmID'+h.s).length == 0);if(!r)h.f.focus();return r;};
var hs=function(w,e,y){var s=[];w.each(function(){s.push(this._jqm)});
	$(e).each(function(){if(this[y])$.extend(this[y],s);else{this[y]=s; $(this).click(function() {
	for(i in {jqmShow:1,jqmHide:1})for(s in this[i])hash[this[i][s]].w[i](this);return false;});}});};
})(jQuery);
