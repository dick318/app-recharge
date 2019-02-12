<template>
  <div
    class="wrap cardInfoPage "
    v-bind:class='[logoClass]'
  >
    <div class="cardInfo">
      <div class="basicInfo clearfix">
        <div class="basicInfoLeft">
          <img
            class="operator_log"
            src="../img/chinaMobile.png"
            v-if="operator_type == 1"
          >
          <img
            class="operator_log"
            src="../img/dianxin.png"
            v-if="operator_type == 2"
          >
          <img
            class="operator_log"
            src="../img/liantong.jpg"
            v-if="operator_type == 3"
          >
        </div>
        <div class="basicInfoRight">
          <ul class="list">
            <li id="cardNo">{{cardNo}}</li>
            <li class="daoqi">账户余额：
              <span
                id="lastMoney"
                style="font-size:16px;"
              >{{amount}}</span>元
            </li>
            <li>卡状态：
              <span id="cardStatus">{{cardstatus}} </span>
            </li>
            <li class="daoqi daoqi_">到期日期:
              <span>{{endtime}} </span>
            </li>
          </ul>
          <svg
            class="icon refresh"
            aria-hidden="true"
            @click="refresh"
            v-bind:class="[shuaxin]"
          >
            <use xlink:href="#icon-refresho"></use>
          </svg>
        </div>
      </div>
      <div class="fluxInfo">
        <div
          class="clearfix line1 flow "
          v-if="flow == 'show'"
        >
          <span class="last">剩余流量：</span>
          <span id="lastFlux">{{restflow}}
            <span class="unit">MB</span>
          </span>
        </div>
        <div
          class="clearfix line2 flow "
          v-if="flow == 'show'"
        >
          <div class="fl">
            <span>总流量：</span>
            <span id="sumFlux">{{sumflow}}</span>
          </div>
          <div class="fr">
            <span>已用：</span>
            <span id="usedFlux">{{useflow}}</span>
          </div>
        </div>
        <div
          class="clearfix line1"
          v-bind:class='[addClass]'
          v-if="time == 'show'"
        >
          <span
            class="shengyu last"
            v-bind:class='[addClass]'
          >倒计时:</span>
          <span
            class="fr"
            v-if="endShowTime =='show'"
          >已过期</span>
          <span
            class="fr"
            v-else
            id="colockbox1"
          >
            <span>
              <span class="day">{{day}}</span>天</span>
            <span>
              <span class="hour">{{hour}}</span>时</span>
            <span>
              <span class="minute">{{minute}}</span>分</span>
            <span>
              <span class="second">{{second}}</span>秒</span>
          </span>
        </div>
        <div
          class="clearfix line2  "
          v-bind:class='[addClass]'
          v-if="time == 'show'"
        >
          <span class="fl">
            <span>套餐到期时间：</span>
          </span>
          <span
            class="fr"
            id="endtime"
          >{{infinite_time}}</span>
        </div>
        <div
          class="clearfix line2  "
          v-bind:class='[addClass]'
          v-if="time == 'show'"
        >
          <span class="fl">
            <span>已用：</span>
          </span>
          <div class="fr">
            <span class="usedFlux">{{useflow}}</span>
          </div>
        </div>
      </div>
      <div class="hengxian"></div>
    </div>
    <div class="content-renzheng ">
      <div class="content-dangqian">
        <div class="content-dangqian-list">
          <div class="content-renzheng-title">当前套餐</div>
          <div
            class="packageInfo "
            style="margin: 5px 0;"
            v-for="flowlist in flowlists"
            :key="flowlist.id"
          >
            <div class=" packagename titleBOX">{{flowlist.packageName}}</div>
            <div>
              <span
                class="  titleBOX"
                v-if="ptime == 'show'"
              >{{flowlist.starttime}}~~{{flowlist.endtime}}</span>
            </div>
            <div class="duanhengxian"></div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="goPage"
      @click="order"
      v-if='showStatus'
    >
      <div
        id="goRecharge"
        type='button'
      >订购</div>
    </div>
  </div>
</template>
<style scoped>
.refresh {
  color: #32a3ef;
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 16px;
}
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
@keyframes shuaxin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
/*.shuaxin {*/
/*transition: 0.2s;*/
/*transform: rotate(180deg);*/
/*}*/

.shuaxin {
  transform: rotate(0deg);
  animation-name: shuaxin;
  animation-duration: 1.5s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}
.cardInfoPage {
  width: 100%;
  height: 100%;
}

.cardInfo {
  padding-bottom: 15px;
  position: absolute;
  width: 100%;
  background: #ffffff;
  top: 0;
  height: 260px;
}

.basicInfo {
  color: #959595;
  font-size: 12px;
  width: 96%;
  margin: 0 auto;
  padding-bottom: 8px;
  padding-top: 2px;
  background: #ffffff;
  margin-top: 8px;
  position: relative;
}

.clearfix {
  zoom: 1;
}

.basicInfoLeft {
  margin-top: 0;
  width: 105px;
  height: 100px;
  float: left;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: relative;
  border: none;
}

.basicInfoLeft img {
  width: 100%;
  height: 100px;
  vertical-align: top;
}

.basicInfoRight {
  display: -webkit-box;
  font-size: 14px;
}

.basicInfoRight .list {
  color: #959595;
  margin-left: 15px;
  font-size: 12px;
}

#cardNo {
  font-size: 14px;
  padding: 8px 0 8px 0;
  color: #000;
}

.basicInfoRight .list li:not(#cardNo) {
  margin-top: 2px;
  margin-bottom: 2px;
}

#lastMoney,
#cardStatus,
#lastDay {
  color: #32a3ef;
}

.fluxInfo {
  width: 96%;
  height: 120px;
  background-repeat: no-repeat;
  background-size: 100% 100px;
  margin: 12px auto 0;
  background: -webkit-linear-gradient(left, #32a3ef, #43d4ff);
  border-radius: 6px;
  font-size: 14px;
}

.third.line1,
.third.line1 .fr,
.third.line2,
.third.line2 .fl,
.third.line2 .fr {
  height: 40px !important;
  line-height: 40px !important;
  margin-top: 0 !important;
}

.hidden {
  display: none !important;
}

.line1 {
  height: 50%;
  color: #ffffff;
}

.last {
  margin-top: 30px;
  display: inline-block;
  margin-left: 10px;
}

#lastFlux {
  display: inline-block;
  padding: 5px;
  text-align: right;
  margin: 0 auto;
  font-size: 36px;
  position: absolute;
  left: 46%;
  overflow: hidden;
  white-space: nowrap;
  margin-left: -50px;
}

.unit {
  font-size: 12px;
}

.line2 .fl {
  width: 45%;
  float: left;
  margin-top: 19px;
  margin-left: 10px;
  color: #ffffff;
  height: 22px;
  overflow: hidden;
  word-break: break-all;
}

.fl {
  margin-top: 30px;
  display: inline-block;
  margin-left: 10px;
}

.third.last {
  margin-top: 0 !important;
}

.line1 .fr {
  display: inline-block;
  padding: 5px;
  text-align: right;
  position: absolute;
  left: 50%;
  color: #ffffff;
  width: 190px;
  overflow: hidden;
  margin: 25px 0 0 -50px;
}

.line2 .fr {
  display: inline-block;
  padding: 5px;
  text-align: right;
  position: absolute;
  left: 50%;
  color: #ffffff;
  width: 190px;
  overflow: hidden;
  margin: 14px 0 0 -50px;
}

.third.line1.time .last {
  margin-top: 0 !important;
}

.content-renzheng {
  padding-top: 10px;
  width: 100%;
  background: #ffffff;
  border-bottom: 1px solid #e7e7e8;
}

.content-dangqian {
  padding: 1px 0;
  border-bottom: none;
  width: 96%;
  margin: 261px auto 50px;
}

.content-dangqian div {
  margin-left: 0;
}

.content-dangqian-list {
  position: relative;
}

.content-renzheng-title {
  font-size: 15px;
  color: #33a6f0;
  padding: 0;
  margin-top: 10px;
}

.packageInfo {
  position: relative;
}

.content-dangqian .titleBOX {
  font-size: 14px;
  padding: 0;
  word-break: break-all;
}

.content-dangqian div {
  margin-left: 0;
}

.duanhengxian:nth-last-of-type(1) {
  margin-bottom: 0 !important;
}

.duanhengxian {
  background: #f0f1f3;
  margin: 6px 0;
  height: 3px;
}

.kuyichong {
  background: #f0f1f3 url("../img/grayLogo.png") no-repeat center 90%;
}

.baixun {
  background: #f0f1f3 url("../img/logo_baixun.png") no-repeat center 80%;
  background-size: 50%;
}
</style>

<script>
import c from "../index";
import "../js/refresh";

export default {
  data() {
    return {
      amount: sessionStorage.getItem("amount"),
      operator_type: localStorage.getItem("operator_type"),
      cardNo: localStorage.getItem("cardNo"),
      id: localStorage.getItem("id"),
      showStatus:true,
      logoClass:
        sessionStorage.getItem("id") == 50
          ? "kuyichong"
          : this.id == 51
          ? "baixun"
          : "",
      useflow: "",
      addClass: "",
      restflow: "",
      sumflow: "",
      shuaxin: "",
      day: "",
      hour: "",
      minute: "",
      second: "",
      flow: "",
      time: "",
      endShowTime: "",
      endtime: "",
      cardstatus: "",
      flowlists: "",
      packagename: "",
      ptime: "",
      timer: ""
    };
  },
  methods: {
    refresh: function() {
      this.shuaxin = "shuaxin";
      const _this = this;
      _this.get_info();
    },
    order: function() {
      const _this = this;
      const package_List = [1, 2, 3, 4, 6, 7];
      if (sessionStorage.getItem("changeCard") == "true") {
        _this.$router.push({ path: "packagem" });
        return;
      }
      if (c.contains(package_List, +localStorage.getItem("package_type"))) {
        _this.$router.push({ path: "packagen" });
      } else {
        if (sessionStorage.getItem("type") == 1) {
          _this.$router.push({ path: "packagem" });
        } else {
          _this.$router.push({ path: "packagen" });
        }
      }
    },
    get_info: function() {
      $.showLoading();
      const _this = this;
      c.$post2(
        c.javaWt + "client/v3/flow",
        { cardId: localStorage.getItem("cardId") },
        function(res) {
          _this.shuaxin = "";
          if (res.status == 0) {
            var cardstatus;
            switch (+res.data.cardStatus) {
              case 1:
                cardstatus = "待激活";
                break;
              case 2:
                cardstatus = "正常";
                break;
              case 3:
                cardstatus = "单向停机";
                break;
              case 4:
                cardstatus = "停机";
                break;
              case 5:
                cardstatus = "预销号";
                break;
              case 6:
                cardstatus = "销号";
                break;
              case 7:
                cardstatus = "过户";
                break;
              case 8:
                cardstatus = "休眠";
                break;
              case 9:
                cardstatus = "未知状态";
                break;
              case 10:
                cardstatus = "可测试期";
                break;
              case 11:
                cardstatus = "测试期未激活";
                break;
              case 13:
                cardstatus = "用户拆机";
                break;
              default:
                cardstatus = "未知状态";
                break;
            }
            _this.cardstatus = cardstatus;
            if (res.data.infiniteTime) {
              _this.time = "show";
              _this.infinite_time = res.data.infiniteTime;
              _this.addClass = "third";
              var arr = _this.infinite_time.split(/[- : \/]/),
                end_time = new Date(
                  arr[0],
                  arr[1] - 1,
                  arr[2],
                  arr[3],
                  arr[4],
                  arr[5]
                ).getTime(),
                sys_second = (end_time - new Date().getTime()) / 1000;
              if (_this.timer) {
                clearInterval(_this.timer);
              }
              _this.timer = setInterval(function() {
                if (sys_second > 1) {
                  sys_second -= 1;
                  var day = Math.floor(sys_second / 3600 / 24);
                  var hour = Math.floor((sys_second / 3600) % 24);
                  var minute = Math.floor((sys_second / 60) % 60);
                  var second = Math.floor(sys_second % 60);
                  _this.day = day;
                  _this.hour = hour < 10 ? "0" + hour : hour;
                  _this.minute = minute < 10 ? "0" + minute : minute;
                  _this.second = second < 10 ? "0" + second : second;
                } else {
                  clearInterval(timer);
                  _this.flow = "show";
                  _this.time = "";
                }
              }, 1000);
            } else {
              _this.flow = "show";
            }
            _this.ptime = "show";
            _this.flowlists = res.data.flowList;
            _this.sumflow = res.data.sumFlow;
            _this.useflow = res.data.useFlow;
            _this.restflow = res.data.restFlow.replace("M", "");
            _this.endtime = res.data.endtime;
            $.hideLoading();
          } else {
            $.hideLoading();
            $.toptip(res.message, 2000, "error");
          }
        },
        // 10000,
        function() {
          $.hideLoading();
          $.toptip("请求超时", 2000, "error");
        }
      );
    }
  },
  // filters: {
  //     formatDate(time) {
  //         let timeArr = /\d{1,2}-\d{1,2} \d{1,2}:\d{1,2}/g.exec(time);
  //         if (!timeArr) {
  //             return "";
  //         } else {
  //             return timeArr[0];
  //         }
  //     }
  // },
  created: function() {
    this.get_info();
    if(localStorage.getItem("aid")=='agent'){
      this.showStatus = false
    }
  }
};
</script>
