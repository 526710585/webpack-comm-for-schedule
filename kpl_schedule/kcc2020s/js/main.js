var host = getValue("isprod") && getValue("isprod") == 1 ? 'https://app.tga.qq.com' : 'https://op.tga.qq.com/test'; //请求接口环境
var reportUrl = getValue("isprod") && getValue("isprod") == 1 ? "//report.tga.qq.com/app/tgatv_api/dataReport?appid=10013" : host+"/app/tgatv_api/dataReport?appid=10013";

var rank_url = host + '/openapi/tgabank/getTeamRank?appid=10005&sign=K8tjxlHDt7HHFSJTlxxZW4A%2BalA%3D'; // 排行榜请求接口
var match_results_url = host + '/openapi/tgabank/getSchedules?appid=10005&sign=K8tjxlHDt7HHFSJTlxxZW4A%2BalA%3D'; // 赛程请求接口

var INIT_NUM = getValue("curstage") && Number(getValue("curstage")) ? Number(getValue("curstage")) : 0; // 默认打开阶段
var SEASON_ID = 'KCC2020S'; // 赛季ID

var TAB_STATE = 0;

var miloLogin = new LoginMsg({}); //获取登录态

var TabClick_Num = 0;

// 选拔赛阶段vue
var XbsMatchList = new Vue({
    el: "#xbs-cont",
    data: {
        battle_list: [],
        rank_list: {},
        xbs_teamlist: ['KCC2020S_lgd', 'KCC2020S_estar', 'KCC2020S_we', 'KCC2020S_vg', 'KCC2020S_esg', 'KCC2020S_nova'],
        xbs_rank: ['KCC2020S_we', 'KCC2020S_vg', 'KCC2020S_estar', 'KCC2020S_qghappy', 'KCC2020S_lgd', 'KCC2020S_rng.m', 'KCC2020S_cw', 'KCC2020S_esg', 'KCC2020S_vsg', 'KCC2020S_nova']
    },
    computed: {
        // kpl赛区 第一轮赛程信息
        kpl_battle_list: function () {
            let self = this;
            if (self.battle_list.length == 0) return [];
            let kpl_list = [];
            kpl_list.push(self.battle_list[1]);
            kpl_list.push(self.battle_list[3]);
            return kpl_list;
        },
        // kplgt赛区 第一轮赛程信息
        kplgt_battle_list: function () {
            let self = this;
            if (self.battle_list.length == 0) return [];
            let kplgt_list = [];
            kplgt_list.push(self.battle_list[0]);
            kplgt_list.push(self.battle_list[2]);
            return kplgt_list;
        },
        // 选拔赛状态
        xbs_battle_state: function () {
            let self = this;
            let curtimestamp = Date.parse(new Date()) / 1000;
            return curtimestamp > 1593360000 || INIT_NUM > 0 ? true : false;
        },
        // 选拔赛第二轮 排行榜信息
        xbs_rank_list: function () {
            let self = this;
            if (JSON.stringify(self.rank_list) == "{}") return [];
            let xbs_list = [];
            // 确定排名
            if (self.xbs_rank.length > 0) {
                for (const team of self.xbs_rank) {
                    xbs_list.push(self.rank_list[team]);
                }
            } else {
                // 无最终排名状态
                let [...team_list] = self.xbs_teamlist;
                // 补齐第二轮战队
                for (const battle of self.battle_list) {
                    if (battle.match_state == 4) {
                        let lessteam = battle.host_score > battle.guest_score ? battle.guest_id : battle.host_id;
                        team_list.push(lessteam);
                    }
                }
                for (const team of team_list) {
                    xbs_list.push(self.rank_list[team]);
                }
                xbs_list.sort(function (a, b) {
                    var val1 = a.order;
                    var val2 = b.order;
                    if (val1 < val2) {
                        return -1;
                    } else if (val1 > val2) {
                        return 1;
                    } else {
                        return 0;
                    }
                });
            }

            if (xbs_list.length != 10) {
                let ddteam = {
                    logo: "",
                    lose: 0,
                    match_group: "A",
                    name: "待定",
                    net_points: 0,
                    order: 0,
                    points: 0,
                    process: 0,
                    teamid: "KCC2020S_dd",
                    win: 0,
                }
                for (let index = xbs_list.length; index < 10; index++) {
                    xbs_list.push(ddteam);
                }
            }
            return xbs_list;
        }
    },
    methods: {
        getBattleState(team, data) {
            let state = "";
            if (team == 1) {
                state = data.match_state == 4 ? data.host_score > data.guest_score ? "win" : "lose" : "";
            } else {
                state = data.match_state == 4 ? data.host_score < data.guest_score ? "win" : "lose" : "";
            }
            return state;
        },
        setRankStyle(index) {
            let self = this;
            let rank_style = self.xbs_battle_state ? index<4?"bg-d":"color-b" : "";
            return rank_style;
        }
    }
})

// 小组赛vue
var XzsMatchList = new Vue({
    el: "#xzs-cont",
    data: {
        rank_list: {},
        xzs_teamlist: ['KCC2020S_ts', 'KCC2020S_gog', 'KCC2020S_xq', 'KCC2020S_jc', 'KCC2020S_emc', 'KCC2020S_rox', 'KCC2020S_ag', 'KCC2020S_mtg', 'KCC2020S_we', 'KCC2020S_vg', 'KCC2020S_qghappy', 'KCC2020S_estar'],
        group_a: ['KCC2020S_ts', 'KCC2020S_rox', 'KCC2020S_ag', 'KCC2020S_we', 'KCC2020S_qghappy', 'KCC2020S_estar'],
        group_b: ['KCC2020S_gog', 'KCC2020S_xq', 'KCC2020S_jc', 'KCC2020S_emc', 'KCC2020S_mtg', 'KCC2020S_vg']
    },
    computed: {
        // 小组赛 排行榜信息
        xzs_rank_list: function () {
            let self = this;
            if (JSON.stringify(self.rank_list) == "{}") return [];
            var groupData = {
                A: [],
                B: []
            };
            let [...team_list] = self.xzs_teamlist;
            for (const team of team_list) {
                let teamMsg = self.rank_list[team];
                if (self.group_a.includes(teamMsg.teamid)) {
                    groupData.A.push(teamMsg);
                }
                if (self.group_b.includes(teamMsg.teamid)) {
                    groupData.B.push(teamMsg);
                }
            }
            groupData.A.sort(this.compare('order'));
            groupData.B.sort(this.compare('order'));
            if (groupData.A.length != 6) {
                let ddteam = {
                    logo: "",
                    lose: 0,
                    match_group: "A",
                    name: "待定",
                    net_points: 0,
                    order: 0,
                    points: 0,
                    process: 0,
                    teamid: "KCC2020S_dd",
                    win: 0,
                }
                for (let index = groupData.A.length; index < 6; index++) {
                    groupData.A.push(ddteam);
                }
            }
            if (groupData.B.length != 6) {
                let ddteam = {
                    logo: "",
                    lose: 0,
                    match_group: "A",
                    name: "待定",
                    net_points: 0,
                    order: 0,
                    points: 0,
                    process: 0,
                    teamid: "KCC2020S_dd",
                    win: 0,
                }
                for (let index = groupData.B.length; index < 6; index++) {
                    groupData.B.push(ddteam);
                }
            }
            return groupData;
        },
        // 小组赛 状态
        xzs_battle_state: function () {
            let self = this;
            let curtimestamp = Date.parse(new Date()) / 1000;
            return curtimestamp > 1595692800 || INIT_NUM > 1 ? true : false;
        },
    },
    methods: {
        compare: function (name, minor) {
            return function (o, p, sortasc) {
                var a, b;
                if (o && p && typeof o === 'object' && typeof p === 'object') {
                    a = o[name];
                    b = p[name];
                    if (a === b) {
                        return typeof minor === 'function' ? minor(o, p, true) : 0;
                    }
                    if (sortasc) {
                        if (typeof a === typeof b) {
                            return a < b ? 1 : -1;
                        }
                        return typeof a < typeof b ? 1 : -1;
                    } else {
                        if (typeof a === typeof b) {
                            return a < b ? -1 : 1;
                        }
                        return typeof a < typeof b ? -1 : 1;
                    }
                } else {
                    thro("error");
                }
            }
        }
    }
})

// 淘汰赛vue
var TtsMatchList = new Vue({
    el: "#tts-cont",
    data: {
        tts_teamlist: [],
        onefourfinal_list:[],
        semifinal_list:[],
        finals_list:{},
    },
    methods: {
        transformDate: function (time, format = 'MM月DD日 hh:mm') {
            if (!time) return "时间待定";
            var year = time.substr(0, 4),
                month = time.substr(5, 2),
                day = time.substr(8, 2),
                hour = time.substr(11, 2),
                min = time.substr(14, 2),
                sec = time.substr(17, 2);
            var newTime = format.replace(/YY/g, year)
                .replace(/MM/g, month)
                .replace(/DD/g, day)
                .replace(/hh/g, hour)
                .replace(/mm/g, min)
                .replace(/ss/g, sec);
            return newTime;
        }
    }
})

class Main {
    constructor() {
        this.init();
    }
    init() { //初始化页面
        let self = this;
        TGAJSMethods.setPageTitle("2020王者荣耀世界冠军杯");
        self.tab('data-type', 'data-type-c', INIT_NUM);
        self.bindEvent();
        self.AgainstPlanViewReport(INIT_NUM+1);
        console.log('修复IOS标题');
    }
    bindEvent() {
        let self = this;
        $(".xzstab").on('click', function () {
            let cur = $(this).attr("data-type");
            if (!cur) {
                self.showToast("xzsToast");
            }
        });
        $(".ttstab").on('click', function () {
            let cur = $(this).attr("data-type");
            if (!cur) {
                self.showToast("ttsToast");
            }
        });
        $(".wzsz").on('click', function () {
            TGDialogS("wzsz");
            self.AgainstPlanTabClickReport(4);
        });
        $(".dia-close").on('click', function () {
            closeDialog();
        });
    }
    // tab(t, c, init) { //tab切换
    //     let self = this;
    //     $(document).on('click', '[' + t + ']', function () {
    //         if (TAB_STATE == 0) {
    //             TAB_STATE = 1;
    //             var cur = $(this).attr(t);
    //             $('[' + t + ']').removeClass('cur');
    //             $(this).addClass('cur');

    //             $('[' + c + ']').each(function (i, el) {
    //                 if ($(el).attr(c) == cur) {
    //                     $(el).css('display', 'block');
    //                 } else {
    //                     $(el).css('display', 'none');
    //                 }
    //             })
    //             // 初始化tab信息
    //             self.initData(cur-1);                
    //         }

    //     });
    //     if (typeof init != "number") return;
    //     $('[' + t + ']').eq(init).click();
    // }
    tab(t,c,init,cb){ 
        let self = this;
        var func = function(cur){
            $('['+t+']').removeClass('cur');
            $('['+t+'="'+ cur +'"]').addClass('cur');

            $('['+c+']').each(function(i,el){
                if($(el).attr(c) == cur){
                    $(el).css('display','block');
                }else{
                    $(el).css('display','none');
                }
            });
            self.initData(cur-1);
            typeof cb == "function" && cb(cur)
        };
        $(document).on('click','['+t+']',function(){
            var cur = $(this).attr(t);
            func(cur);
        });
        if(typeof init != "number") return;
        // $('['+t+']').eq(init).click();
        func(init);
    }
    initData(init) { // 初始化tab信息
        let self = this;
        switch (init) {
            case 0:
                // 选拔赛阶段
                self.initXbsData();
                break;
            case 1:
                // 小组赛阶段
                self.initXzsData();
                break;
            case 2:
                // 淘汰赛阶段
                self.initTtsData();
                break;
            default:
                break;
        }
        self.AgainstPlanTabClickReport(init+1);
    }
    async initXbsData() {
        // 获取选拔赛数据
        let self = this;
        let xbs_one = await self.getJhsBattle(SEASON_ID, 'xbs1');
        let xbs_two = await self.getTeamStandings(SEASON_ID, 'xbs');
        XbsMatchList.battle_list = xbs_one;
        XbsMatchList.rank_list = xbs_two;
        $(".xbs-cont").css('display', 'block');
        TAB_STATE = 0;
    }
    async initXzsData() {
        // 获取小组赛数据
        let self = this;
        let xzs_rank_list = await self.getTeamStandings(SEASON_ID, 'xzs');
        XzsMatchList.rank_list = xzs_rank_list;
        $(".xzs-cont").css('display', 'block');
        TAB_STATE = 0;
    }
    async initTtsData() {
        // 获取淘汰赛数据
        let self = this;
        let tts_rank_list = await self.getJhsBattle(SEASON_ID, 'tts');
        TtsMatchList.onefourfinal_list = tts_rank_list;
        let bjs_rank_list = await self.getJhsBattle(SEASON_ID, 'bjs');
        TtsMatchList.semifinal_list = bjs_rank_list;
        let zjs_rank_list = await self.getJhsBattle(SEASON_ID, 'zjs');
        TtsMatchList.finals_list = zjs_rank_list[0];
        $(".tts-cont").css('display', 'block');
        TAB_STATE = 0;
    }
    /**
     * 战队积分榜单
     */
    getTeamStandings(seasonid, stage) {
        var self = this;
        return new Promise((resolve, reject) => {
            self.ajaxGet(rank_url, {}, {
                seasonid: seasonid,
                stage: stage
            }).then(
                response => {
                    response.result == 0 ? resolve(response.data) : resolve([]);
                },
                err => {
                    reject(err);
                }
            );
        });
    }
    /**
     * 战队赛程
     */
    getJhsBattle(seasonid, stage) {
        let self = this;
        return new Promise((resolve, reject) => {
            self.ajaxGet(match_results_url, {}, {
                seasonid: seasonid,
                stage: stage
            }).then(
                response => {
                    response.result == 0 ? resolve(response.data) : resolve([]);
                },
                err => {
                    reject(err);
                }
            );
        });
    }

    // 2020KCC对阵图查看 数据上报
    AgainstPlanViewReport(tabId) {
        var self = this;
        var loginMsg = miloLogin.loginMsg;
        var mobileData = getMobileData();
        var gameid = miloLogin.source=="web"? "wzry" : miloLogin.source;
        var dataReportUrl = reportUrl + '&client_type=13&client_ver=webh5&seq=' + 1 + '&token=8ecb531483801b49a4dfeb021f959786&uid=' + loginMsg.roleid + '&model=' + mobileData.model + '&os_ver=' + mobileData.os_ver + '&area_id=' + loginMsg.area;
        var dataValue = "WZRY-" + loginMsg.roleid + '|' + mobileData.client_type_report + '|' + loginMsg.partition + '|' + self.getNowDate() + '|' + loginMsg.openid + '|' + gameid + '|' + tabId;
        //上报一次
        dataReport(dataReportUrl, '2020KCCAgainstPlanView_wzry', dataValue);
    }

    // 2020KCC对阵图tab切换 数据上报
    AgainstPlanTabClickReport(tabId) {
        var self = this;
        var loginMsg = miloLogin.loginMsg;
        var mobileData = getMobileData();
        TabClick_Num++;
        var gameid = miloLogin.source=="web"? "wzry" : miloLogin.source;
        var dataReportUrl = reportUrl + '&client_type=13&client_ver=webh5&seq=' + TabClick_Num + '&token=8ecb531483801b49a4dfeb021f959786&uid=' + loginMsg.roleid + '&model=' + mobileData.model + '&os_ver=' + mobileData.os_ver + '&area_id=' + loginMsg.area;
        var dataValue = "WZRY-" + loginMsg.roleid + '|' + mobileData.client_type_report + '|' + loginMsg.partition + '|' + self.getNowDate() + '|' + loginMsg.openid + '|' + gameid + '|' + tabId;
        //上报一次
        dataReport(dataReportUrl, '2020KCCAgainstPlanTabClick_wzry', dataValue);            
    }

    // 封装get请求
    ajaxGet(url, baseData, data = {}) {
        if (baseData != null) { data = Object.assign(baseData, data) };
        return new Promise((resolve, reject) => {
            $.ajax({
                url,
                type: "get",
                data: data,
                dataType: 'json',
                success: function (res) {
                    resolve(res);
                },
                error: function (err) {
                    reject(err);
                }
            });
        });
    }

    // 封装post请求
    ajaxPost(url, baseData, data = {}) {
        if (baseData != null) { data = Object.assign(baseData, data) };
        return new Promise((resolve, reject) => {
            $.ajax({
                url,
                type: "post",
                xhrFields: {
                    withCredentials: true // 跨域请求传递cookie
                },
                data: JSON.stringify(data),
                success: function (res) {
                    resolve(res);
                },
                error: function (err) {
                    reject(err);
                }
            });
        });
    }

    //显示弹窗
    showToast(classname) {
        let self = this;
        if (self.setshowTime != null) {
            $(".toast").hide();
            clearTimeout(self.setshowTime);
        }
        $("." + classname).show();
        self.setshowTime = setTimeout(function () {
            $("." + classname).hide();
        }, 3000)
    }

    // 获取当前时间
    getNowDate() {
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var day = now.getDate();

        var hour = now.getHours();
        var minute = now.getMinutes();
        var second = now.getSeconds();

        month = month < 10 ? "0" + month : month;
        day = day < 10 ? "0" + day : day;
        hour = hour < 10 ? "0" + hour : hour;
        minute = minute < 10 ? "0" + minute : minute;
        second = second < 10 ? "0" + second : second;

        return (
            year +
            "-" +
            month +
            "-" +
            day +
            " " +
            hour +
            ":" +
            minute +
            ":" +
            second
        );
    }
};

var main = new Main();

//获取url中的参数
function getValue(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
}

function TGDialogS(e) {
    // 利用milo库引入dialog组件
    need("biz.dialog", function (Dialog) {
        Dialog.show({
            id: e,
            bgcolor: '#000', //弹出“遮罩”的颜色，格式为"#FF6600"，可修改，默认为"#fff"
            opacity: 80 //弹出“遮罩”的透明度，格式为｛10-100｝，可选
        });
    });
}

function closeDialog() {
    // 利用milo库引入dialog组件
    need("biz.dialog", function (Dialog) {
        Dialog.hide();
    });
}

//上报参数
function dataReport(url, key, value) {
    $.ajax({
        url: url,
        type: 'POST',
        data: JSON.stringify([{
            key: key,
            value: value
        }]),
        dataType: 'json',
        headers: {
            'Content-Type': 'application/json'
        },
        success: function (data) {
            console.log(data)
        },
        error: function (e) {
            console.log(e)
        }
    });
}

function getCellOS() {
    //判断数组中是否包含某字符串
    Array.prototype.contains = function(needle) {
        for (i in this) {
        if (this[i].indexOf(needle) > 0) return i;
        }
        return -1;
    };
    var device_type = navigator.userAgent; //获取userAgent信息
    var md = new MobileDetect(device_type); //初始化mobile-detect
    var os = md.os(); //获取系统

    var model = "";
    if (os == "iOS") {
        //ios系统的处理
        os = md.os() + " " + md.version("iPhone");
        model = md.mobile();
    } else if (os == "AndroidOS") {
        //Android系统的处理
        os = md.os().replace("OS", " ") + md.version("Android");
        var sss = device_type.split(";");
        var i = sss.contains("Build/");
        if (i > -1) {
        model = sss[i].substring(0, sss[i].indexOf("Build/"));
        }
    }

    return { os: os, model: model };
    //alert(os + "---" + model);//打印系统版本和手机型号
}
function getMobileData() {
    //设备信息
    var platid = 1;
    var cellModel = getCellOS(); //获取手机信息
    var model = cellModel && cellModel.os ? cellModel.os : "";
    var os_ver = cellModel && cellModel.model ? cellModel.model : "";
    if (os_ver.toLowerCase() == "ipad" || os_ver.toLowerCase() == "iphone") {
        platid = 0;
    }
    var client_type = platid == 1 ? 8 : 9; //1与8 = Android  0与9 = iOS
    var client_type_report = platid == 1 ? 14 : 15; //1与14 = Android  0与15 = iOS
    return {
        model: model,
        os_ver: os_ver,
        platid: platid,
        client_type: client_type,
        client_type_report: client_type_report
    };
}