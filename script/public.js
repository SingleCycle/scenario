define(function(require,exports,module){
	module.exports = {
		//通过classname获取对象
		getEleByClass:function(obj,classname){
			var result = [];
			var aEle = obj.getElementsByTagName('*');
			for(var i = 0;i<aEle.length;i++){
				var aClass = aEle[i].className.split(' ');
				for(var j = 0;j<aClass.length;j++){
					if(this.findinArr(aClass,classname)){
							result.push(aEle[i]);
					}
				}
			}
			return result;
		},
		//在数组中找
		findinArr:function(arr,classname){
			for(var i = 0;i<arr.length;i++){
				if(arr[i] == classname){
					return true;
				}
			}
			return false;
		}
	}
})