<template>
    <div class="ReCharGe">
    <div class="money-header pr">
        <img alt="" src="../img/moneyIcon.png">
        <div class="tel">{{cardNo}}
        </div>
        <div class="amount">{{amount}}元
        </div>
    </div>
    <div class="content">
        <div class="wrap">
            <div class="title">
                账户充值
            </div>
            <div style="margin-bottom: 20px;margin-left: 15px;">
                请选择您想充值的额度
            </div>
            <ul>
                <li class="item" v-for="(item,index) in items" @click="active(item,index)"  v-bind:class="[item.active==true ? 'active' : '']">
                    {{item.money}}元
                    <br>
                    <span class="f13">
                        到账:{{item.amount}}元
                    </span>
                </li>
            </ul>
        </div>
    </div>
    <div class="goPage" v-on:click="order">
        <div id="goRecharge" type="button">
            确认订购
        </div>
    </div>
</div>
</template>
<style scoped>
.ReCharGe .money-header {
  padding-left: 5%;
  padding-top: 20px;
  padding-bottom: 20px;
  /* margin-bottom: 10px; */
  background: #3abef9;
  font-size: 15px;
  color: #fff;
}
.pr {
  position: relative;
}
.money-header div {
  margin-left: 45px;
  font-size: 15px;
}
.money-header.pr img {
  float: left;
}
.ReCharGe .content {
  height: -webkit-calc(100% - 105px);
  background: #fff;
  border-bottom: solid 1px #e6e6e6;
  padding-bottom: 10px;
  margin-bottom: 10px;
}
.money-header .icon-qiandaizi {
  position: absolute;
  left: 10px;
  font-size: 40px;
  top: -webkit-calc(50% - 20px);
}
.wrap ul {
  height: 120px;
  padding: 0 15px;
}
.wrap .title {
  color: #4d4d4d;
  font-size: 15px;
  height: 30px;
  line-height: 40px;
  text-indent: 15px;
}
.wrap .item {
  border: solid 1px #3abef9;
  color: #3abef9;
  width: -webkit-calc(33.333333% - 6.6666666666px);
  float: left;
  text-align: center;
  box-sizing: border-box;
  background: #fff;
  border-radius: 3px;
  height: 55px;
  font-size: 15px;
  margin-bottom: 10px;
  margin-right: 10px;
  padding-top: 5px;
}
.wrap .item:nth-child(3n) {
  margin-right: 0;
}
.wrap .item.active {
  background: #3abef9;
  color: #fff;
  border: none;
}
.goPage {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
#viewRechargeRecord {
  float: right;
  color: #32a4ed;
  margin-bottom: 10px;
}
input[type="button"],
input[type="submit"],
input[type="reset"] {
  -webkit-appearance: none;
}
#goRecharge {
  height: 52px;
  font-size: 15px;
  width: 100%;
  color: #fff;
  line-height: 52px;
  text-align: center;
  background-color: rgb(51, 166, 240);
}
input[type="text"],
input[type="button"] {
  outline: none;
  border: none;
  background: transparent;
}
fieldset,
img {
  border: 0;
}
.wrap {
  width: 100%;
  height: 100%;
}
</style>

<script>
import c from "../index";

export default {
  data() {
    return {
      amount: parseFloat(sessionStorage.getItem("amount")).toFixed(2),
      cardNo: sessionStorage.getItem("cardNo"),
      items: [
        { money: 30, amount: 30, active: false },
        { money: 50, amount: 50, active: false },
        { money: 100, amount: 100, active: false },
        { money: 200, amount: 200, active: false },
        { money: 300, amount: 300, active: false },
        { money: 500, amount: 500, active: false }
      ],
      money: ""
    };
  },
  methods: {
    active: function(item, index) {
      for (let i in this.items) {
        this.items[i].active = false;
      }
      this.items[index].active = true;
      this.money = this.items[index].money;
    },
    order: function() {
      const _this = this;
      if (!this.money) {
        $.toptip("请选择充值的额度", 2000, "error");
        return false;
      }
      if (!sessionStorage.getItem("cardNo")) {
        $.toptip("获取卡号失败", 2000, "error");
        return false;
      }
      $.showLoading();
      c.$post(
        "?r=home/order/add-account",
        {
          type: 0,
          count: 1,
          fid: sessionStorage.getItem("fid"),
          sid: sessionStorage.getItem("sid"),
          tid: sessionStorage.getItem("tid"),
          money: _this.money,
          iccid: sessionStorage.getItem("iccid"),
          trade_type: 1,
          cardid: sessionStorage.getItem("cardid"),
          operatorid: sessionStorage.getItem("operatorid"),
          uid: sessionStorage.getItem("id")
        },
        function(data) {
          $.hideLoading();
          if (data.code == 0) {
            $.toptip(data.msg, 2000, "error");
            return false;
          }
          var ids = data.data.id;
          var orderID = data.data.orderID;
          sessionStorage.setItem("pay", "false");
          sessionStorage.setItem("money", _this.money);
          if (ids) {
            window.location.href =
              document.location.protocol +
              "//" +
              window.location.host +
              "/coolfish/pay/index.bak.html?id=" +
              ids +
              "&order_type=account" +
              "&orderID=" +
              orderID +
              "&flag=false";
          }
        }
      );
    }
  }
};
</script>