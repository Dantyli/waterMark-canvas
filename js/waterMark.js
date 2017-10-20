/*
 Dantyli 2017-10-20
 * */
window.onload = function() {
	function isSupport() { //思路一:添加属性判断是否支持
		var inp = document.createElement('input');
		inp.setAttribute('type', 'color');
		if (inp.type !== 'text') {
			alert('支持type=color'); //safari判断失效
		}
	}
	function myBrowser() { //思路二:根据浏览器区分
		var userAgent = window.navigator.userAgent;
		if (userAgent.indexOf('Opera') > -1) {
			return 'op';
		} else if (userAgent.indexOf('Firefox') > -1) {
			return 'ff';
		} else if (userAgent.indexOf('Chrome') > -1) {
			return 'ch';
		} else if (userAgent.indexOf('Safari') > -1) {
			return 'sa';
		} else {
			return 'ie';
		}
	}
	var cP = document.querySelector('#colorPicker');
	var sColor = document.querySelector('.selectCo');
	var myBrowser = myBrowser();
	var isSupport = true;
	var shyImg = new Image();
	shyImg.src = 'img/dantyli.png';//水印图片
	if (myBrowser == 'ie' || myBrowser == 'sa') {
		cP.setAttribute('readonly', 'readonly');
		isSupport = false;
	} else {
		cP.setAttribute('type', 'color');
		sColor.setAttribute('disabled', 'disabled');
	}
	document.querySelector('#upload').addEventListener('change', function() {
		var me = this;
		var fontSi = document.getElementsByClassName('selectSi')[0].value;
		var fontCo = isSupport ? cP.value : sColor.value;
		var shy = document.getElementById('shy').value;
		if (me.value) {
			var img = new Image();
			var getUrl = function(blob) {
				return window[window.webkitURL ? 'webkitURL' : 'URL']['createObjectURL'](blob);
			}
			img.src = getUrl(this.files[0]);
			img.onload = function() {
				var canvas = document.createElement("canvas");
				canvas.width = img.width * 0.6; //压缩比例0.6
				canvas.height = img.height * 0.6;
				var ctx = canvas.getContext("2d");
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				ctx.drawImage(img, 0, 0, canvas.width, canvas.height); //image转换为canvas
				ctx1 = canvas.getContext("2d"); //增加新图层
				ctx1.globalAlpha = '0.6'; //默认不透明度0.6
				//添加水印内容
				ctx1.font = fontSi;
				ctx1.fillStyle = fontCo;
				ctx1.fillText(shy, img.width * 0.3, img.height * 0.3);
				ctx.drawImage(shyImg, canvas.width * 0.8, canvas.height * 0.8, canvas.width * 0.1, canvas.width * 0.1);
				imgs = new Image()
				imgs.src = canvas.toDataURL("image/png"); //canvas内容提取为图片
				document.getElementsByClassName('show')[0].appendChild(imgs);
				document.querySelector('#download').setAttribute('href',imgs.src);
			}
		}
	})
}