<template>
  <div>
    <div class="weui-msg">
      <div class="weui-msg__icon-area">
        <i v-bind:class="showClass"></i>
      </div>
      <div class="weui-msg__text-area">
        <h2 class="weui-msg__title we-small">{{showText}}</h2>

        <h2 class="weui-msg__title money">{{money}}</h2>
      </div>
    </div>
    <div class="weui-cells">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <p>订购卡号</p>
        </div>
        <div class="weui-cell__ft cardNo">{{cardNo}}</div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <p>订购套餐</p>
        </div>
        <div class="weui-cell__ft packagename">{{packagename}}</div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <p>订购进度</p>
        </div>
        <div class="weui-cell__ft packagename text-danger" v-if="cancel=='true'">{{showText}}</div>
        <div class="weui-cell__ft" v-if="cancel=='false'">
          <ul>
            <li class="weui-icon-">
              <span class="first">提交成功</span>
              <span class="addtime">{{addtime| formatDate}}</span>

              <div class="shuxian"></div>
            </li>
            <li class="weui-icon-">
              <span class="first">套餐订购中</span>
              <span class="nowtime">{{nowtime}}</span>
              <span class="end">预计订购一个小时会有结果</span>

              <div class="shuxian"></div>
            </li>
            <li class="weui-icon- load">
              <span class="first"></span>
              <span class="time"></span>
            </li>
          </ul>
        </div>
      </div>
      <div class="goPage" v-on:click="order">
        <div type="button" id="goRecharge" data-bind="1">完成</div>
      </div>
    </div>
  </div>
</template>

<script>
import c from "../index";

export default {
  data() {
    return {
      id: localStorage.getItem("id") ? localStorage.getItem("id") : 50,
      showClass:
        this.$route.query.type == "cancel"
          ? "weui-icon-cancel"
          : "weui-icon-success",
      showText: this.$route.query.type == "cancel" ? "未支付" : "套餐订购中",
      cancel: this.$route.query.type == "cancel" ? "true" : "false",
      money: sessionStorage.getItem("money") || localStorage.getItem("money"),
      cardNo:
        sessionStorage.getItem("cardNo") || localStorage.getItem("cardNo"),
      packagename:
        sessionStorage.getItem("packagename") ||
        localStorage.getItem("packagename"),
      addtime: sessionStorage.getItem("addtime"),
      nowtime: ""
    };
  },
  filters: {
    formatDate(time) {
      let timeArr = /\d{1,2}-\d{1,2} \d{1,2}:\d{1,2}/g.exec(time);
      if (!timeArr) {
        return "";
      } else {
        return timeArr[0];
      }
    }
  },
  methods: {
    getNowFormatDate: function() {
      var date = new Date();
      var seperator1 = "-";
      var seperator2 = ":";
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate =
        month +
        seperator1 +
        strDate +
        " " +
        date.getHours() +
        seperator2 +
        date.getMinutes();
      return currentdate;
    },
    order: function() {
      const _this = this;
      _this.$router.push({ path: "home" });
    },
    getNewData: function() {
      const _this = this;
      var url = c.javaWt + "client/v3/loginInfo";
      var data = {
        card: _this.cardNo,
        uid: _this.id
      };
      c.$post2(url, data, function(res) {
        if (res.status != 0) {
          $.toptip(res.message, 2000, "error");
          return;
        } else {
          _this.type = res.data.type;
          _this.amount = res.data.amount;
          sessionStorage.setItem("type", res.data.type);
          sessionStorage.setItem("iccid", res.data.iccid);
          sessionStorage.setItem("amount", _this.amount);
        }
      });
    }
  },
  created: function() {
    this.nowtime = this.getNowFormatDate();
    const _this = this;
    if (
      sessionStorage.getItem("pay") == "true" ||
      localStorage.getItem("ali") == "true" ||
      sessionStorage.getItem("active") == "true"
    ) {
      sessionStorage.setItem("pay", false);
      localStorage.setItem("ali", false);
      sessionStorage.setItem("active", false);
      _this.getNewData();
    }
  }
};
</script>
<style scoped>
.text-danger {
  color: red;
}
.weui-icon-success,
.weui-icon-cancel {
  font-size: 36px;
}

.load:before {
  color: rgb(153, 153, 153) !important;
}

.weui-msg__icon-area {
  margin-bottom: 10px;
}

.we-small {
  font-size: 14px !important;
}

span {
  font-size: 14px;
  text-align: right;
  line-height: 14px;
  white-space: nowrap;
}

.first {
  margin-right: 15px;
}

.end {
  float: right;
  font-size: 12px;
  margin-top: 6px;
}

li {
  list-style: none;
  padding: 0 0 10px 20px;
  position: relative;
  vertical-align: top;
  margin-top: 20px;
}

li:nth-last-child(3) {
  border-left: 0;
}

li:before {
  content: "\EA07";
  display: block;
  position: absolute;
  left: 0;
  top: 3px;
  color: #09bb07;
  margin-left: -9px !important;
  margin-right: 0 !important;
  font-size: 20px !important;
}

.weui-icon- {
  display: block;
}

ul {
  margin: 0 auto;
}

.weui-cell__ft {
  width: 60%;
}

.shuxian {
  width: 1px;
  background-color: #09bb07;
  height: 30px;
  display: inline-block;
  position: absolute;
  top: 22px;
  left: 0;
}

.active {
  background-color: #09bb07;
}

.goPage {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}

.body-margin {
  margin-bottom: 46px;
}

#goRecharge,
#nextRecharge {
  height: 46px;
  font-size: 15px;
  width: 100%;
  color: #fff;
  text-align: center;
  line-height: 46px;
  background-color: rgb(51, 166, 240);
}
</style>
