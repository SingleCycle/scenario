define(function(require,exports,module){
	var G=require('getStyle');
	exports.move=function(obj,json,options){
		//考虑默认情况
		options=options || {};
		options.duration=options.duration || 700;
		options.easing=options.easing || 'ease-out';
		
		
		var count=Math.round(options.duration/30);
		
		var start={};
		var dis={};
		for(var name in json){
			start[name]=parseFloat(exports.getStyle(obj,name));
			if(isNaN(start[name])){
				switch(name){
					case 'left':
						start[name]=obj.offsetLeft;	
						break;
					case 'top':
						start[name]=obj.offsetTop;	
						break;
					case 'width':
						start[name]=obj.offsetWidth;
						break;
					case 'height':
						start[name]=obj.offsetHeight;
						break;
					//有数字地方写就行
					case 'marginLeft':
						start[name]=obj.offsetLeft;	
						break;
					case 'borderWidth':
						start[name]=0;	
						break;
					case 'fontSize':
						start[name]=16;
						break;
					case 'opacity':
						start[name]=1;
						break;
				}
			}
		
			dis[name]=json[name]-start[name];
		}
		
		var n=0;
		
		clearInterval(obj.timer);
		obj.timer=setInterval(function(){
			n++;
			
			for(var name in json){
				switch(options.easing){
					case 'linear':
						var a=n/count;
						var cur=start[name]+dis[name]*a;
						break;
					case 'ease-in':
						var a=n/count;
						var cur=start[name]+dis[name]*a*a*a;
						break;
					case 'ease-out':
						var a=1-n/count;
						var cur=start[name]+dis[name]*(1-a*a*a);
						break;
				}
				
				if(name=='opacity'){
					obj.style.opacity=cur;
					obj.style.filter='alpha(opacity:'+cur*100+')';
				}else{
					obj.style[name]=cur+'px';
				}
			}
			
			if(n==count){
				clearInterval(obj.timer);
				options.complete && options.complete();
			}
		},30);	
	};
	exports.getStyle=function(obj,name){
		return (obj.currentStyle || getComputedStyle(obj,false))[name];
	}
});