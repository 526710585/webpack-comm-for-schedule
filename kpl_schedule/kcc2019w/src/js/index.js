import '../style.css';

$(() => {
  const base_url = 'https://app.tga.qq.com';
  const rank_url = `${base_url}/openapi/tgabank/getKplTeamRank?appid=10005&sign=K8tjxlHDt7HHFSJTlxxZW4A%2BalA%3D`;
  const match_results_url = `${base_url}/openapi/tgabank/getSchedules?appid=10005&sign=K8tjxlHDt7HHFSJTlxxZW4A%2BalA%3D`;

  const FILTER_LIST = [
    'KCC2019W_ag',
    'KCC2019W_qghappy',
    'KCC2019W_jc',
    'KCC2019W_slt',
    'KCC2019W_gog',
    'KCC2019W_rox'];

  const COUNTRY_OBJ = {
    // 中国
    KCC2019W_xq: 'flag_icon1.jpg',
    KCC2019W_estar: 'flag_icon1.jpg',
    KCC2019W_hero: 'flag_icon1.jpg',
    KCC2019W_rw: 'flag_icon1.jpg',
    KCC2019W_ts: 'flag_icon1.jpg',
    // 香港
    KCC2019W_cw: 'flag_icon3.jpg',
    // 澳门
    KCC2019W_emc: 'flag_icon4.jpg',
    // 欧盟
    KCC2019W_nova: 'flag_icon6.jpg',
  };

  const IMG_LIST = {
    KCC2019W_nova: '//imgcache-1251786003.image.myqcloud.com/media/gzhoss/image/20190828/46143084ad0d5fa37b4fa9c393646000.png',
  };

  const MATCH_MATCHING_LIST = [1, 2, 0, 3, 4, 5, 6];// 比赛匹配列表


  const getData = {
    init() {
      this.bindEvents();
      this.renderMatch();
      this.renderRank();
      this.isIPhoneX();
    },
    bindEvents() {
      // 切换
      $('.sc_nav li').click(function () {
        $(this).addClass('on')
          .siblings()
          .removeClass('on');
        $('.match_main').eq($(this).index())
          .show()
          .siblings()
          .hide();
      });
    },
    getRankFun(seasonid, stage) {
      return new Promise((resolve, reject) => {
        $.ajax({
          type: 'GET',
          url: rank_url,
          data: {
            seasonid,
            stage,
          },
          dataType: 'json',
          success(res) {
            if (res.result != 0) {
              reject();
            }
            resolve(res.data);
          },
          error: (err) => {
            reject(err);
          },
        });
      });
    },
    // renderRank:async function () {
    //     var data = await this.getRankFun('KCC2019W', 'xbs');
    //     data = this.replaceImg(data);
    //     data = this.objSort(data, "order");
    //     data = this.filterTeam(data);
    //     var html = template('rankTemplate',{data});
    //     $('.rank_list').html(html);
    // },
    objSort(obj, str) {
      const arr = [];
      for (const i in obj) {
        arr.push(obj[i]);
      }
      arr.sort((a, b) => a[str] - b[str]);
      return arr;
    },
    isIPhoneX(fn) {
      const u = navigator.userAgent;
      const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
      if (isIOS) {
        if (screen.height == 812 && screen.width == 375) {
          // 是iphoneX
          $('.sc_main').addClass('iphoneX');
        }
      }
    },
    filterTeam(arr) {
      const newArr =  arr.filter(item => FILTER_LIST.indexOf(item.teamid) == -1);
      return newArr;
    },
    replaceImg(obj) {
      for (const key in IMG_LIST) {
        const imgUrl = IMG_LIST[key];
        obj[key].logo = imgUrl;
      }
      return obj;
    },
    getMatchFun(seasonid, begin_time, end_time) {
      return new Promise((resolve, reject) => {
        $.ajax({
          url: match_results_url,
          data: {
            seasonid,
            begin_time,
            end_time,
          },
          type: 'GET',
          dataType: 'json',
          success(res) {
            if (res.result != 0) {
              reject();
            }
            resolve(res.data);
          },
          error(err) {
            reject(err);
          },
        });
      });
    },
    async renderMatch() {
      const matchData = await this.getMatchFun('KCC2019W', '1577289600', '1578153600');// 使用时间戳获取数据
      $('.out_list').forEach((item, index) => {
        const dataIndex = MATCH_MATCHING_LIST[index];
        const data = matchData[dataIndex];
        const html = template('matchTemplate', { data, index });
        $(item).html(html);
      });
    },
  };
  getData.init();
});
