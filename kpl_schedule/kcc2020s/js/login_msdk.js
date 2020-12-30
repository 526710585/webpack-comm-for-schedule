class LoginMsg {
    constructor(obj) {
        this.source = ""; //用户来源 smoba_zhushou:营地 wzry:游戏 web:外部网站
        this.platid = null; //IOS:0 安卓:1
        this.loginMsg = {};

        this.init();
    }
    init() {
        let self = this;
        self.loginMsg = {};
        self.source = self.identifyEntrance();
        self.platid = self.isIos() ? 0 : 1;
        switch (self.source) {
            case "smoba_zhushou":
                self.zsInitLogin();
                break;
            case "wzry":
                self.yxInitLogin();
                break;
            case "web":
                self.webInitLogin();
                break;
            default:
                break;
        }
    }
    //区分用户来源
    identifyEntrance() {
        let self = this;
        let searchMsg = self.searchToJson();
        // if (self.hasMSDK() && (this.isMSDK() || this.isZS())) {
        if (self.hasMSDK()) {
            if (searchMsg && searchMsg.source == "smoba_zhushou") {
                return "smoba_zhushou"
            } else {
                return "wzry"
            }
            // } else if (self.hasMSDK() && (!this.isMSDK() && !this.isZS())){
            // self.reloadPage();
        } else {
            return "web"
        }
    }
    //MSDK浏览器
    isMSDK() {
        var ua = window.navigator.userAgent;
        return /MSDK\//.test(ua);
    }
    //是否在助手内
    isZS() {
        var ua = window.navigator.userAgent.toLowerCase();
        if (/gamehelper/i.test(ua)) {
            return true;
        } else {
            return false;
        }
    }
    //营地登录态初始化
    zsInitLogin() {
        let self = this;
        let searchMsg = self.searchToJson();
        let param =
            "&sig=" +
            searchMsg.sig +
            "&timestamp=" +
            searchMsg.timestamp +
            "&appid=" +
            searchMsg.appid +
            "&openid=" +
            searchMsg.openid +
            "&algorithm=" +
            searchMsg.algorithm +
            "&version=" +
            searchMsg.version +
            "&encode=" +
            searchMsg.encode;
        self.loginMsg = {
            openid: searchMsg.openid,
            platid: searchMsg.platid,
            roleid: searchMsg.roleid,
            partition: parseInt(searchMsg.partition),
            param: param,
            code: searchMsg.msdkencodeparam,
            sig: searchMsg.sig,
            timestamp: parseInt(searchMsg.timestamp),
            userid: searchMsg.userid,
            area: searchMsg.areaid,
            source: searchMsg.source,
            login_type: 1
        }
    }
    //游戏登录态初始化
    yxInitLogin() {
        let self = this;
        let searchMsg = self.searchToJson();
        let param =
            "&sig=" +
            searchMsg.sig +
            "&timestamp=" +
            searchMsg.timestamp +
            "&appid=" +
            searchMsg.appid +
            "&openid=" +
            searchMsg.openid +
            "&algorithm=" +
            searchMsg.algorithm +
            "&version=" +
            searchMsg.version +
            "&encode=" +
            searchMsg.encode;
        self.loginMsg = {
            openid: searchMsg.openid,
            platid: searchMsg.platid,
            roleid: searchMsg.roleid,
            partition: parseInt(searchMsg.partition),
            param: param,
            code: searchMsg.msdkencodeparam,
            sig: searchMsg.sig,
            timestamp: parseInt(searchMsg.timestamp),
            userid: searchMsg.userid,
            area: searchMsg.areaid,
            source: "",
            login_type: 1
        }
    }
    //WEB登录态初始化
    webInitLogin() {
        self = this;
        console.log("WEB登录态初始化");
    }
    //重新加载页面
    reloadPage() {
        location.href = location.href.replace(location.search, "");
    }
    //判断是否有msdk参数
    hasMSDK() {
        let self = this;
        let searchJsonMsg = self.searchToJson();
        if (searchJsonMsg && searchJsonMsg.partition && searchJsonMsg.areaid && searchJsonMsg.appid && searchJsonMsg.sig && searchJsonMsg.encode && searchJsonMsg.msdkencodeparam) {
            return true;
        } else {
            return false;
        }
    }
    //ios系统
    isIos() {
        var ua = window.navigator.userAgent.toLowerCase();
        return /iphone|ipod|ipad/i.test(ua);
    }
    // search参数转json
    searchToJson() {
        let url = location.search; // 获取当前浏览器的URL
        let param = {}; // 存储最终JSON结果对象
        url.replace(/([^?&]+)=([^?&]+)/g, function (s, v, k) {
            v = v.toLowerCase()
            v = v == "area" ? "areaid" : v;
            v = v == "serverid" ? "partition" : v;
            param[v] = decodeURIComponent(k);//解析字符为中文
            return k + '=' + v;
        });
        return param;
    }
}