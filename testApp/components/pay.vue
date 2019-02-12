<template>
  <div class="wrap">
    <img src="../img/logo.jpg" class="center-block" v-if="type_logo === 'A'" />
    <img src="../img/wechat.jpg" class="center-block" v-if="type_logo === 'B'" />
    <div class="text-center num">
      <span id="">{{money}}</span>元</div>
    <div class="text">
      <div class="text-left">订单编号：
        <span id="">{{orderID}}</span>
      </div>
      <div class="text-left">订单类型：
        <span id="">{{payType}}</span>
      </div>
    </div>
    <button id="pay" class="btn btn-block btn-success text-center">{{payText}}</button>
  </div>
</template>
<style scoped>
.wrap {
  margin: 20% 0 0 0;
}
.center-block {
  display: block;
  margin-right: auto;
  margin-left: auto;
}
img {
  width: 40%;
  vertical-align: middle;
  border: 0;
}

.num {
  color: black;
  font-size: 34px;
  margin: 10% 0;
  font-family: "é»‘ä½“";
  font-weight: bold;
}
.text div {
  margin-bottom: 6%;
  padding-left: 10%;
}
#pay {
  margin-top: 8%;
  height: 40px;
  font-size: 16px;
}
.btn:focus,
.btn:active:focus,
.btn.active:focus,
.btn.focus,
.btn:active.focus,
.btn.active.focus {
  outline: none;
}
.text-left {
  text-align: left;
}
.text-center {
  text-align: center;
}
.text {
  font-size: 16px;
  color: rgb(51, 51, 51);
}
.btn-success:hover {
  color: #fff;
  background-color: #449d44;
  border-color: #398439;
}
.btn-success {
  color: #fff;
  background-color: #5cb85c;
  border-color: #4cae4c;
}

.btn {
  display: inline-block;
  padding: 6px 12px;
  margin-bottom: 0;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.42857143;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-image: none;
  border: 1px solid transparent;
  border-radius: 4px;
}
.btn-block {
  display: block;
  width: 94%;
  margin: 0 auto;
}
</style>

<script>
import c from "../index";
export default {
  data() {
    return {
      payText: "",
      payType: "",
      type_logo: "",
      flag: sessionStorage.getItem("flag"),
      uid: sessionStorage.getItem("id"),
      aid: sessionStorage.getItem("aid"),
      orderID: sessionStorage.getItem("orderID"),
      money: sessionStorage.getItem("money"),
      openid: sessionStorage.getItem("openid")
    };
  },
  created: function() {
    if (this.uid == 50 && this.aid == null) {
      this.type_logo = "A";
      this.payType = "酷易充支付";
    } else {
      this.type_logo = "B";
      this.payType = "微信支付";
    }
    if (this.flag == "true") {
      this.payText = "余额支付";
      sessionStorage.setItem("payMoney", "true");
    } else if (this.flag != "false" && this.flag != null && this.flag != "") {
      this.payText = "微信支付  " + this.flag + "元";
      sessionStorage.setItem("payMoney", flag);
    } else {
      this.payText = "微信支付";
      sessionStorage.setItem("payMoney", 0);
    }
  }
};
</script>