var shineLandscape = {
    eve: null,
    shineHtml: null,
    shineCss: '@keyframes Shine_landscapeAni{0%{transform:rotate(-90deg);}30%{transform:rotate(-90deg);}70%{transform:rotate(0deg);}100%{transform:rotate(0deg);}}@-webkit-keyframes Shine_landscapeAni{0%{transform:rotate(-90deg);}30%{transform: rotate(-90deg);}70%{transform:rotate(0deg);}100%{transform:rotate(0deg);}}.shine_landscape{width:100%;height:100%;background:#32373b;position:fixed;left:0;top:0;z-index:99999;display:none;text-align:center;}.shine_landscape_box{position:relative;margin-left:auto;margin-right:auto;top:50%;transform:translateY(-50%);-webkit-transform:translateY(-50%);}.shine_landscape img{-webkit-animation:Shine_landscapeAni 1.5s ease infinite alternate;width:auto; animation:Shine_landscapeAni 1.5s ease infinite alternate;}.shine_landscape span{font-size:18px;display:block;color:#ffd40a;text-align:center;width:100%;padding-top:5px;line-height:2;}',
    init: function (e) {
        this.eve = { direction: 'y', postStr: '竖', img: 'https://ossweb-img.qq.com/images/js/landscape/landscape.png', imgWidth: '128px', bgColor: '#32373b', txt: '', zIndex: 99999, txtColor: '#ffd40a', txtSize: '18px', initBack: '', changeDirection: '', callback: '' };
        this.eve = this.extend(this.eve, e);
        this.eve.direction === 'x' ? this.eve.postStr = '横' : this.eve.postStr;
        if (e) { !e.txt ? this.eve.txt = '为了更好的体验，请将手机/平板' + this.eve.postStr + '过来' : this.eve.txt }
        else { this.eve.txt = '为了更好的体验，请将手机/平板' + this.eve.postStr + '过来' }

        this.shineHtml = '<div class="shine_landscape" id="Shine_landscape" style="background-color:' + this.eve.bgColor + ';z-index:' + this.eve.zIndex + '"><div class="shine_landscape_box"><img src="' + this.eve.img + '" style="width: ' + this.eve.imgWidth + '"><span style="color:' + this.eve.txtColor + ';font-size:' + this.eve.txtSize + '">' + this.eve.txt + '</span></div></div>';
        var Shine_landscape_dom = document.getElementById('Shine_landscape'),
            _pos = null;
        var elm = document.createElement('div');
        elm.id = '______shineLandscape';
        if (!Shine_landscape_dom) { document.body.appendChild(elm) }
        var __shine = document.getElementById('______shineLandscape');
        if (__shine) { __shine.innerHTML = this.shineHtml }
        var cssElmId = document.getElementById('shine_landscape_css');
        if (!cssElmId) {
            var cssElm = document.createElement('style');
            cssElm.id = '______shine_landscape_css';
            document.head.appendChild(cssElm);
            var __shine_css = document.getElementById('______shine_landscape_css');
            if (__shine_css) { __shine_css.innerHTML = this.shineCss }
        }
        var evt = "onorientationchange" in window ? "orientationchange" : "resize";
        window.addEventListener(evt, function (_pos) {
            _pos = shineLandscape.orientationFun();
            orientation(_pos);
            if (typeof shineLandscape.eve.changeDirection === 'function') shineLandscape.eve.changeDirection(_pos);
        });
        window.addEventListener('load', function (_pos) {
            _pos = shineLandscape.orientationFun();
            orientation(_pos);
            if (typeof shineLandscape.eve.initBack === 'function') shineLandscape.eve.initBack(_pos);
        });
        function orientation(_pos) {
            if (!_pos) {
                if (shineLandscape.eve.direction === 'x') {
                    document.documentElement.clientWidth > document.documentElement.clientHeight ? document.getElementById('Shine_landscape').style.display = 'none' : document.getElementById('Shine_landscape').style.display = 'block'
                } else {
                    document.documentElement.clientWidth < document.documentElement.clientHeight ? document.getElementById('Shine_landscape').style.display = 'none' : document.getElementById('Shine_landscape').style.display = 'block'
                }
            } else {
                _pos === shineLandscape.eve.direction ? document.getElementById('Shine_landscape').style.display = 'none' : document.getElementById('Shine_landscape').style.display = 'block'
            }
        }
    },
    //横屏提示
    orientationFun: function () {
        if (window.orientation === 180 || window.orientation === 0) {
            //竖屏
            if (typeof this.eve.curDirectionY === 'function') this.eve.curDirectionY();
            return 'y'
        }
        if (window.orientation === 90 || window.orientation === -90) {
            //横屏
            if (typeof this.eve.curDirectionX === 'function') this.eve.curDirectionX();
            return 'x'
        }
    },
    //复制对象、扩展对象
    extend: function (o) {
        for (var i = 1, len = arguments.length; i < len; i++) {
            var source = arguments[i];
            for (var prop in source) {
                o[prop] = source[prop];
            }
        }
        return o
    }
};

//设置电视台的h5页面标题
function setPageTitle(title) {
    if (typeof (TGAJSReceiver) != 'undefined') {
        TGAJSReceiver.setPageTitle(title);
    }
}