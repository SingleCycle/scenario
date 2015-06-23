define(function(require,exports,module){
	var pub = require('public');
	var M = require('move');
	
	//分类查询
	exports.showGrand = function(){
		var oShowGrand = document.getElementById('showGrand');
		oShowGrand.onmouseover = function(){
			var oClassifyList= pub.getEleByClass(this,'classify-list')[0];
			oClassifyList.style.display = "block";
		}	
		oShowGrand.onmouseout = function(){
			var oClassifyList= pub.getEleByClass(this,'classify-list')[0];
			oClassifyList.style.display = "none";
		}	
	};
	//轮播图
	exports.bannerSlidr = function(){
		var slidernum = 0;//记录轮播图下标 
		var oBannerSlider = document.getElementById('bannerSlider');
		var oBannerUl = pub.getEleByClass(oBannerSlider,'baner-img')[0];
		var aBannerLi = oBannerUl.children;
		var oOl = pub.getEleByClass(oBannerSlider,'banner-num')[0];
		var aBtn = oOl.children;
		var timer = null;
		function play(){
			timer = setInterval(function(){
				for(var i = 0;i<aBtn.length;i++){
						aBtn[i].className= "";
					}
					slidernum++;
					if(slidernum>=aBannerLi.length){
						slidernum = 0;
					}
					aBtn[slidernum].className= 'active';
					M.move(oBannerUl,{top:-slidernum*aBannerLi[0].offsetHeight});
			},3000)
		}
		play();
		for(var i = 0;i<aBtn.length;i++){
			(function(index){
				aBtn[i].onmouseover = function(){
					for(var i = 0;i<aBtn.length;i++){
						aBtn[i].className= "";
					}
					aBtn[index].className= 'active';
					slidernum = index;
					M.move(oBannerUl,{top:-index*aBannerLi[0].offsetHeight});
				};
			})(i)
		}
		oBannerSlider.onmouseover = function(){
			clearInterval(timer);
		};
		oBannerSlider.onmouseout = function(){
			play();
		};

	};
	
	
	// exports.tab = function(){
	// 	//for(var i = 0;i<)
	// };
	

})