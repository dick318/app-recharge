<template>
  <div class="TotalContentBox">
    <!--头部提示内容-->
    <div class="Authentication-top">换卡</div>
    <!--认证部分-->
    <div class="Authentication-forms">
      <div class="ietmOBX">
        <span class="name">原卡号</span>
        <input
          class="text"
          type="text"
          value
          placeholder="请输入原ICCID或者接入号"
          v-model.trim="form.oldcard"
          @blur="check"
          style="width:55%"
        >
        <span class="color-danger caption" :class="[activeClass, showClass]">{{showText}}</span>
      </div>
      <div class="ietmOBX">
        <span class="name">套餐</span>
        <input v-model.trim="form.packageName" class="text" type="text" value placeholder="请输入原套餐">
      </div>
      <div class="ietmOBX">
        <span class="name">姓名</span>
        <input class="text" type="text" placeholder="请与实名认证的保持一致" v-model.trim="form.uname">
      </div>
      <div class="ietmOBX">
        <span class="name">手机号码</span>
        <input class="text" type="text" placeholder="请与实名认证的保持一致" v-model.trim="form.phone">
      </div>
      <div class="ietmOBX">
        <span class="name">省市区</span>
        <input
          v-model="addressArr"
          class="text"
          type="text"
          placeholder="请选择地址"
          @focus="showAddress = !showAddress"
        >
        <vue-address v-model="showAddress" @on-select="handleOnSelect"/>
      </div>
      <div class="ietmOBX">
        <span class="name">详细地址</span>
        <input class="text" type="text" placeholder="请输入详细地址" v-model.trim="detailArea">
      </div>
      <div class="ietmOBX" v-show="pay">
        <span class="name">运费：</span>
        <input class="text" v-model="money" readonly style="color: red!important;">
      </div>
    </div>
    <!-- 提交 -->
    <div class="UploadID-BOX">
      <div class="ietmOBX">
        <label for="remake" class="remake">备注</label>
        <textarea
          name
          id="remake"
          v-model.trim="form.base"
          cols="30"
          rows="4"
          placeholder="代理商名下的卡换卡后还在代理商名下，如有其他需求，请填写备注。"
        ></textarea>
        <div class="text-center">注：换卡后新卡将会自动转入老卡对应的
          <br>代理商下面，老卡内的余额和剩余
          <br>流量也会自动转入新卡。
          <br>提交申请后7天未收到货，请联系客服。
        </div>
        <div class="Authentication-footer add" @click="add">
          <p>提交</p>
        </div>
        <div class="Authentication-footer list" @click="jump">
          <p>查询进度</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import c from "../index";
import VueAddress from "./vue-address/vue-address-native";

export default {
  beforeCreate: function() {
    const _this = this;
    if (navigator.userAgent.indexOf("MicroMessenger") > -1) {
      if (window.location.search.indexOf("code") == -1) {
        // 转授权链接
        c.$post2(
          c.javaWt + "client/v3/wxCodeUrl",
          {
            url: document.location.href,
            uid: _this.$route.query.id || localStorage.getItem("id") || 50,
            scope: "snsapi_userinfo"
          },
          function(res) {
            if (res.status != 0) {
              $.toptip(res.message, 2000, "error");
              return;
            }
            window.location.href = res.data;
          }
        );
      }
    }
  },
  data() {
    return {
      showAddress: false,
      form: {
        uid: this.$route.query.id || localStorage.getItem("id") || 50,
        oldcard: localStorage.getItem("cardNo"),
        packageName: "",
        uname: "",
        phone: "",
        address: "",
        base: "",
        openid: sessionStorage.getItem("openid"),
        nickname: ""
      },
      activeClass: "success",
      showClass: "hidden",
      showText: "验证通过",
      addressArr: [],
      address: "",
      detailArea: "",
      money: "10元",
      payArr: [7],
      pay: ""
    };
  },
  components: {
    VueAddress
  },
  created() {
    const _this = this;
    localStorage.setItem(
      "id",
      _this.$route.query.id || localStorage.getItem("id")
    );
    if (navigator.userAgent.indexOf("MicroMessenger") > -1) {
      if (!sessionStorage.getItem("openid")) {
        _this.getOpenid();
      } else {
        if (!_this.form.nickname) {
          _this.getNickName();
        }
      }
    } else {
      $.alert("请在微信公众号申请。", "注意", function() {
        $.closeModal();
      });
    }

    if (_this.form.oldcard) {
      _this.chcekCard();
    }
  },
  methods: {
    chcekCard() {
      const _this = this;
      _this.activeClass = "success";
      _this.showClass = "";
      _this.showText = "验证通过";
      if (_this.payArr.includes(+sessionStorage.getItem("remarks"))) {
        _this.pay = false;
      } else {
        _this.pay = true;
      }
    },
    getOpenid() {
      const _this = this;
      c.$post2(
        c.javaWt + "client/v3/openid",
        {
          uid: _this.$route.query.id || localStorage.getItem("id"),
          code: c.getUrlParam("code")
        },
        function(res) {
          if (res.status == 0) {
            sessionStorage.setItem("openid", res.data);
            _this.form.openid = res.data;
            let data = {
              uid: _this.$route.query.id || localStorage.getItem("id"),
              openid: sessionStorage.getItem("openid")
            };
            c.$post2(c.javaWt + "client/v3/wxInfo", data, function(res) {
              if (res.status != 0) {
                return;
              }
              _this.form.nickname = res.data.nickname;
            });
          }
        }
      );
    },
    getNickName() {
      const _this = this;
      let data = {
        uid: _this.$route.query.id || localStorage.getItem("id"),
        openid: sessionStorage.getItem("openid")
      };
      c.$post2(c.javaWt + "client/v3/wxInfo", data, function(res) {
        if (res.status != 0) {
          return;
        }
        _this.form.nickname = res.data.nickname;
      });
    },
    jump() {
      this.$router.push(`changeCardList`);
    },
    handleOnSelect(val) {
      if (val) {
        this.address = "";
        this.addressArr = [];
        for (let index = 0; index < val.length; index++) {
          const element = val[index];
          this.address =
            (this.address ? this.address + "," : this.address) + element.name;
          this.addressArr.push(element.name);
        }
      }
    },
    check() {
      if (!this.form.oldcard) {
        return;
      }
      const _this = this;
      c.$post2(
        c.javaWt + "client/v3/loginInfo",
        { card: _this.form.oldcard, uid: 50 },
        function(res) {
          if (res.status == 1) {
            _this.activeClass = "danger";
            _this.showClass = "";
            _this.showText = "验证失败";
          } else {
            _this.activeClass = "success";
            _this.showClass = "";
            _this.showText = "验证通过";
            if (_this.payArr.includes(+res.data.remarks)) {
              _this.pay = false;
            } else {
              _this.pay = true;
            }
          }
        }
      );
    },
    onBridgeReady: function(data) {
      const _this = this;
      WeixinJSBridge.invoke("getBrandWCPayRequest", data, function(res) {
        if (res.err_msg == "get_brand_wcpay_request:ok") {
          _this.$router.push(`changeCardList`);
        } else {
          $.toptip(res.message, 2000, "error");
        }
      });
    },
    add: function() {
      const _this = this;
      if (!this.form.oldcard) {
        $.toptip("请输入您的卡号", 2000, "error");
        return false;
      }
      if (this.activeClass == "danger" || !this.activeClass) {
        $.toptip("请输入正确的卡号", 2000, "error");
        return false;
      }
      if (!this.form.packageName) {
        $.toptip("请输入您的套餐", 2000, "error");
        return false;
      }
      //验证名字不为空&小于8位 通过
      if (!this.form.uname) {
        $.toptip("请输入您的名字", 2000, "error");
        return false;
      }
      //验证手机号
      if (!this.form.phone) {
        $.toptip("请输入手机号码", 2000, "error");
        return false;
      }
      var reg = /^1\d{10}$/;
      if (!reg.test(this.form.phone)) {
        $.toptip("手机号码格式不对!", 2000, "error");
        return false;
      }
      if (this.addressArr.length < 2) {
        $.toptip("请选择省市区", 2000, "error");
        return false;
      }
      if (!this.detailArea) {
        $.toptip("请输入详细地址", 2000, "error");
        return;
      }
      $.showLoading();
      let addresStr = this.addressArr;
      addresStr += this.detailArea ? "," + this.detailArea : this.detailArea;
      this.form.address = addresStr;
      c.$post2(
        "http://wx.szcoolfish.com/client/card/client/v3/saveCardReplace",
        this.form,
        function(res) {
          $.hideLoading();
          if (res.status == 0) {
            if (res.data) {
              _this.onBridgeReady(res.data);
            } else {
              _this.$router.push(`changeCardList`);
            }
          } else {
            $.toptip(res.message, 2000, "error");
          }
        }
      );
    }
  }
};
</script>
<style scoped>
.weui-dialog__bd {
  color: #4d4d4d !important;
}
.Authentication-footer.add,
.Authentication-footer.list {
  padding: 4px 0 !important;
}
.Authentication-footer.list {
  margin-bottom: 10px;
}
.success {
  color: #0bb20c !important;
}
.Authentication-top {
  text-align: center;
  background: #099fde;
  color: #fff;
  width: auto;
  padding: 10px 0;
}
.text-center {
  text-align: center;
  color: red;
}
.item {
  border: solid 1px #3abef9;
  color: #3abef9;
  text-align: center;
  box-sizing: border-box;
  background: #fff;
  border-radius: 3px;
  height: 55px;
  line-height: 55px;
  font-size: 15px;
  list-style: none;
  white-space: nowrap;
  width: 31%;
  display: inline-block;
  margin-top: 10px !important;
}
.ietmOBX input {
  height: calc(100% - 1px);
  color: rgb(0, 0, 0) !important;
}
.item.active {
  background: #3abef9;
  color: #fff;
  border: solid 1px #fff;
}
.item:nth-of-type(3n + 1) {
  margin-right: 1%;
  margin-left: 1%;
}
.item:nth-of-type(3n + 2) {
  margin: 0;
}
.item:nth-of-type(3n-1) {
  margin-right: 1%;
  margin-left: 1%;
}
.remake {
  width: 96%;
  margin: 0 auto;
  height: 40px;
  border-bottom: 1px solid #e7e7e7;
  background: #ffffff;
  display: inline-block;
  line-height: 40px;
}
#remake {
  line-height: 21px;
  width: calc(100% - 30px);
  resize: none;
  height: 106px;
  margin-bottom: 15px;
  padding: 10px 15px;
  -webkit-user-select: text;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  outline: 0;
  background-color: #fff;
  -webkit-appearance: none;
  font-size: 17px;
}

.order {
  background-color: #ff9a14;
}
.TotalContentBox {
  background: #f0f1f3;
}

input[type="button"],
input[type="submit"],
input[type="reset"] {
  -webkit-appearance: none;
}
.weui-toast {
  top: 50%;
  margin-left: 0;
}

.hidden {
  display: none !important;
}

.Authentication-forms {
  width: 100%;
  margin: 0 auto;
  background: #fff;
  border-bottom: 1px solid #e7e7e7;
}

.TotalContentBox .name {
  width: 25%;
  display: inline-block;
  line-height: 38px;
  font-size: 14px;
  font-family: 微软雅黑;
  color: rgb(0, 0, 0);
}

.TotalContentBox .text {
  font-family: 微软雅黑;
  color: rgb(213, 217, 220);
  width: 70%;
  border-width: initial;
  border-style: none;
  border-color: initial;
  border-image: initial;
  background: rgb(255, 255, 255);
}

.UploadID-BOX {
  width: 100%;
  margin-top: 10px;
  background: #fff;
  padding-bottom: 10px;
}

.TotalContentBox .ietmOBX {
  width: 96%;
  margin: 0 auto;
  height: 40px;
  border-bottom: 1px solid #e7e7e7;
  background: #ffffff;
}

.clearfix {
  clear: both;
}

select,
textarea,
input {
  -webkit-user-select: auto;
  -webkit-box-shadow: none;
  box-shadow: none;
  -webkit-appearance: none;
  border-radius: 0;
  -webkit-border-radius: 0;
  text-rendering: auto;
  color: initial;
  letter-spacing: normal;
  word-spacing: normal;
  text-transform: none;
  text-indent: 0;
  text-shadow: none;
  display: inline-block;
  text-align: start;
  margin: 0;
  font: 13.3333px Arial;
  outline: none;
}

.Authentication-footer {
  width: 96%;
  text-align: center;
  font-size: 16px;
  color: rgb(255, 255, 255);
  font-family: 微软雅黑;
  padding: 11px 0;
  margin: 20px auto 0;
  background: rgb(50, 163, 239);
  border-radius: 6px;
}
</style>
