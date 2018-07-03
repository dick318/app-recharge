<template>
<div>
    <div class="weui-msg">
        <div class="weui-msg__icon-area"><i class="weui-icon-success"></i>
        </div>
        <div class="weui-msg__text-area">
             <h2 class="weui-msg__title we-small">套餐订购中</h2>
 
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
                <p>订单号</p>
            </div>
            <div class="weui-cell__ft orderID">{{orderID}}</div>
        </div>
        <div class="weui-cell">
            <div class="weui-cell__bd">
                <p>订购进度</p>
            </div>
            <div class="weui-cell__ft">
                <ul>
                    <li class="weui-icon-"> <span class="first">提交成功</span><span class="addtime">{{addtime| formatDate}}</span>
 
                        <div class="shuxian"></div>
                    </li>
                    <li class="weui-icon-"> <span class="first">套餐订购中</span><span class="nowtime">{{nowtime}}</span>
 <span class="end">预计订购一个小时会有结果</span>
 
                        <div class="shuxian"></div>
                    </li>
                    <li class="weui-icon- load"><span class="first"></span><span class="time"></span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="goPage"  v-on:click="order">
            <div type="button" id="goRecharge" data-bind="1">完成</div>
        </div>
    </div>
</div>
</template>
<style scoped>
.weui-icon-success {
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

<script>
import c from "../index";
import { formatDate } from "../js/date";

export default {
  data() {
    return {
      money: sessionStorage.getItem("money"),
      cardNo: sessionStorage.getItem("cardNo"),
      packagename: sessionStorage.getItem("packagename"),
      addtime: sessionStorage.getItem("addtime"),
      nowtime: "",
      orderID: sessionStorage.getItem("orderID")
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
    }
  },
  created: function() {
    this.nowtime = this.getNowFormatDate();
    const _this = this;
    if (
      sessionStorage.getItem("pay") == "true" ||
      sessionStorage.getItem("active") == "true"
    ) {
      sessionStorage.setItem("pay", false);
      sessionStorage.setItem("active", false);
      c.$get("?r=wms/personal/get-card", function(res) {
        if (res.code == 0) {
          $.toptip(res.msg, 2000, "error");
        } else {
          _this.type = res.data.type;
          _this.amount = res.data.amount;
          sessionStorage.setItem("type", res.data.type);
          sessionStorage.setItem("amount", _this.amount);
        }
      });
    } 
  }
};
</script>