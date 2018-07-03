<template>
    <div class="weui-cells weui-cells_form">
    <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">卡号</label></div>
        <div class="weui-cell__bd">
            <input class="weui-input" type="text" id="cardNo" placeholder="请输入卡号" v-model="cardNo">
        </div>
    </div>
<div  class="weui-btn  conf" v-on:click="active">确认激活</div>
</div>
</template>
<style scoped>
.weui-cells:before {
  border-top: none;
}
.weui-cells_form.weui-cells {
  margin-top: 20%;
}
.conf {
  margin-top: 10%;
  background-color: rgb(51, 166, 240);
}
.weui-btn {
  border-radius: 0 !important;
}
.weui-btn:after {
  border: none;
}
input[type="button"],
input[type="submit"],
input[type="reset"] {
  -webkit-appearance: none;
}
</style>

<script>
import c from "../index";

export default {
  data() {
    return {
      cardNo: sessionStorage.getItem("cardNo")
    };
  },
  methods: {
    active: function() {
      const _this = this;
      if (!_this.cardNo) {
        $.toptip("请输入卡号", 2000, "error");
        return;
      }
      $.showLoading();
      c.$post(
        "?r=wms/personal/add-activate-card",
        { card: _this.cardNo, uid: sessionStorage.getItem("id") },
        function(res) {
          $.hideLoading();
          if (res.code == 1) {
            sessionStorage.setItem("cardNo", cardNo);
          } else {
            flag = 0;
            $.toptip(res.msg, 2000, "error");
          }
        }
      );
    }
  }
};
</script>