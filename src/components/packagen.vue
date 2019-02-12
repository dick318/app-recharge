<template>
  <div class="weui-tab body-margin">
    <div class="weui-navbar">
      <div
        class="weui-navbar__item"
        v-bind:href="'#'+ item.url"
        v-for="(item,key,index) in title"
        :key="index"
        @click="activeTitle(item,key,index)"
        v-bind:class="[index==0 ? 'weui-bar__item--on' : '']"
      >
        {{ item.title }}
        <hr class="active_hengxian" v-bind:class="[item.active==true?'':'hidden' ]">
      </div>
    </div>
    <div class="weui-tab__bd" id="template">
      <div
        class="weui-tab__bd-item"
        v-bind:class="[index==0 ? 'weui-tab__bd-item--active' : '']"
        v-for="(item,key, index) in libArr"
        v-bind:id="key"
        :key="index"
        v-if="item.length>0"
      >
        <div class="weui-panel weui-panel_access" v-if="libArr.tab5.length>0">
          <div
            class="weui-panel__hd package_title title_one"
            v-bind:class="[libArr.tab5.length>0 ? '' : 'hidden']"
          >推荐套餐：</div>
          <div class="weui-panel__bd" v-for="tab1 in libArr.tab5">
            <div
              class="weui-media-box weui-media-box_appmsg package_content"
              style="height: auto;"
              @click="active(key, index)"
            >
              <div class="special">特惠
                <div></div>
              </div>
              <div class="choose hidden">
                <img src="../img/check.png" alt>
              </div>
              <div
                class="weui-media-box__hd flow"
                v-bind:class="[tab1.flow == '∞' ? 'infinite' : '']"
              >{{tab1.flow}}</div>
              <div class="weui-media-box__bd" style="height: auto;">
                <h4 class="weui-media-box__title">
                  <span class="packagename">{{tab1.name}}</span>
                  <span class="weui-media-box__desc">{{tab1.usetime}}</span>
                </h4>
                <div
                  class="weui-media-box__desc"
                  v-if="tab1.isInfinite == '2'"
                  style="font-size:12px ; display: block"
                >{{tab1.text}}</div>
                <div class="price" style="margin-top: 2px;">
                  <span class="yuan">￥</span>
                  <span class="prices">{{tab1.price}}</span>
                </div>
                <p class="weui-media-box__desc old_price">￥{{tab1.oldPrice}}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="weui-panel weui-panel_access margin">
          <div class="weui-panel__hd package_title">
            <span v-bind:class="[libArr.tab5.length>0 ? '' : 'hidden']">普通套餐：</span>
          </div>
          <div class="weui-panel__bd" v-for="(tab1, index) in item" :key="index">
            <div
              href
              class="weui-media-box weui-media-box_appmsg package_content"
              style="height: auto;"
              @click="active(key, index)"
              v-bind:class="[tab1.active==true ? 'active' : '']"
            >
              <div class="special" v-if="tab1.sort == 88">推荐
                <div></div>
              </div>
              <div class="choose" v-bind:class="[tab1.active==true ? '' : 'hidden']">
                <img src="../img/check.png" alt>
              </div>
              <div
                class="weui-media-box__hd flow"
                v-bind:class="[tab1.flow == '∞' ? 'infinite' : '']"
              >{{tab1.flow}}</div>
              <div class="weui-media-box__bd" style="height: auto;">
                <h4 class="weui-media-box__title">
                  <span class="packagename">{{tab1.name}}</span>
                  <span class="weui-media-box__desc">{{tab1.usetime}}</span>
                </h4>
                <div
                  class="weui-media-box__desc"
                  v-if="tab1.isInfinite == '2'"
                  style="font-size:12px ; display: block"
                >{{tab1.text}}</div>
                <div class="price" style="margin-top: 2px;">
                  <span class="yuan">￥</span>
                  <span class="prices">{{tab1.price}}</span>
                </div>
                <p class="weui-media-box__desc old_price">￥{{tab1.oldPrice}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="goPage" v-on:click="order">
        <!-- <div type="button" id="nextRecharge" class="hidden">订购次月</div> -->
        <div type="button" id="goRecharge">确认订购</div>
      </div>
    </div>
    <div class="hidden">
      <div class="weui-cells weui-cells_form" id="checkMobile">
        <div class="weui-cell weui-cell_vcode">
          <!-- <div class="weui-cell__hd">
            <label class="weui-label">验证码</label>
          </div>-->
          <div class="weui-cell__bd">
            <input class="weui-input" v-model="code" placeholder="请输入验证码">
          </div>
          <div class="weui-cell__ft">
            <img class="weui-vcode-img" @click="getCaptcha" :src="img">
          </div>
        </div>
        <div class="weui-cell weui-cell_vcode">
          <!-- <div class="weui-cell__hd">
            <label class="weui-label">手机号</label>
          </div>-->
          <div class="weui-cell__bd" id="mobile">
            <input class="weui-input" v-model="mobile" type="tel" placeholder="请输入手机号">
          </div>
          <div class="weui-cell__ft">
            <button class="weui-vcode-btn" @click="countDown">{{content}}</button>
          </div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <input class="weui-input" v-model="mobileCode" type="tel" placeholder="请输入手机验证码">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import c from "../index";

export default {
  data() {
    return {
      libArr: {
        tab1: [],
        tab2: [],
        tab3: [],
        tab4: [],
        tab5: []
      },
      title: {
        tab1: [],
        tab2: [],
        tab3: [],
        tab4: []
      },
      lib: {
        tab1: [],
        tab2: [],
        tab3: [],
        tab4: [],
        tab5: []
      },
      titleArr: [],
      tab1: { title: "", url: "tab1", active: false },
      tab2: { title: "", url: "tab2", active: false },
      tab3: { title: "", url: "tab3", active: false },
      tab4: { title: "", url: "tab4", active: false },
      allType: [113, 118, 127, 141, 142, 154],
      lid_next: [22, 23, 24, 31, 32, 33, 34],
      package_next: [1, 2, 4, 6, 7],
      lid_free: [24, 33, 32],
      lid_all: [32],
      lid_speed: [31],
      lid_add: [35],
      type: "",
      timer: "",
      id: "",
      aid: sessionStorage.getItem("aid") || localStorage.getItem("aid"),
      price: "",
      packagename: "",
      flag: "",
      bindType: "",
      cardId: localStorage.getItem("cardId"),
      packageType: localStorage.getItem("package_type"),
      content: "发送验证码",
      totalTime: 60,
      canClick: true, //添加canClick
      img: "",
      code: "",
      mobile: "",
      mobileCode: "",
      mobileCheckHtml: "",
      checkMobileStatus: false,
      operatorid: sessionStorage.getItem("operatorid"),
      lid: sessionStorage.getItem("lid"),
      package_type: localStorage.getItem("package_type"),
      cardNo: localStorage.getItem("cardNo"),
      cardPackage: 0,
    };
  },
  mounted() {
    this.mobileCheckHtml = $("#checkMobile");
  },
  methods: {
    getType: function() {
      this.type =
        c.contains(this.lid_next, +this.lid) ||
        this.lid == 24 ||
        c.contains(this.package_next, +this.package_type);
    },
    active: function(key, index) {
      const amount = sessionStorage.getItem("amount");
      for (let i in this.libArr) {
        for (let item in this.libArr[i]) {
          this.libArr[i][item].active = false;
        }
      }
      this.libArr[key][index].active = !this.libArr[key][index].active;
      this.bindType = this.libArr[key][index].addType;
      this.id = this.libArr[key][index].id;
      this.price = this.libArr[key][index].price;
      this.packagename = this.libArr[key][index].name;
      if (amount != 0.0) {
        if (this.price - amount <= 0) {
          this.flag = "true";
        } else {
          this.flag = c.accSub(amount, this.price);
        }
      } else {
        this.flag = "false";
      }
    },
    activeTitle: function(item, key, index) {
      for (let i in this.title) {
        this.title[i].active = false;
      }
      this.title[key].active = !this.title[key].active;
    },
    countDown() {
      if (!this.canClick) return; //改动的是这两行代码
      if (!this.code) {
        $.toptip("请输入验证码", 2000, "error");
        return false;
      }
      if (!this.mobile) {
        $.toptip("请输入手机号码", 2000, "error");
        return false;
      }
      var reg = /^1\d{10}$/;
      if (!reg.test(this.mobile)) {
        $.toptip("手机号码格式不对!", 2000, "error");
        return false;
      }
      this.canClick = false;
      this.getBindPhoneCode();
      this.content = this.totalTime + "s后发送";
      let clock = window.setInterval(() => {
        this.totalTime--;
        this.content = this.totalTime + "s后发送";
        if (this.totalTime < 0) {
          window.clearInterval(clock);
          this.content = "发送验证码";
          this.totalTime = 60;
          this.canClick = true; //这里重新开启
        }
      }, 1000);
    },
    getCaptcha() {
      const _this = this;
      c.$post2(
        c.javaWt + "/client/v3/getBindCode",
        { cardId: _this.cardId },
        function(res) {
          if (res.status == 0) {
            _this.img = res.data.img;
          } else {
            $.toptip(res.message, 2000);
          }
        }
      );
    },
    getBindPhoneCode() {
      const _this = this;
      c.$post2(
        c.javaWt + "/client/v3/getBindPhoneCode",
        { cardId: _this.cardId, mobile: _this.mobile, code: _this.code },
        function(res) {
          if (res.status != 0) {
            _this.getCaptcha();
            $.toptip(res.message, 2000);
          }
        }
      );
    },
    showHtml() {
      $(".weui-dialog__bd").html(this.mobileCheckHtml);
    },
    clearData() {
      this.code = "";
      this.mobile = "";
      this.mobileCode = "";
    },
    checkMobile: function() {
      $.showLoading();
      const _this = this;
      var inputArea = document.getElementById("mobile");
      var timer = setInterval(function() {
        if (inputArea) {
          inputArea.scrollIntoView(false);
        } else {
          clearInterval(timer);
        }
      }, 200);
      c.$post2(
        c.javaWt + "/client/v3/bindPhoneStatus",
        { cardId: _this.cardId },
        function(res) {
          if (res.status == 0) {
            _this.checkMobileStatus = false;
            $.confirm({
              title: "绑定手机",
              text: "1",
              onOK: function() {
                if (!_this.code) {
                  $.toptip("请输入验证码", 2000, "error");
                  return false;
                }
                if (!_this.mobile) {
                  $.toptip("请输入手机号码", 2000, "error");
                  return false;
                }
                var reg = /^1\d{10}$/;
                if (!reg.test(_this.mobile)) {
                  $.toptip("手机号码格式不对!", 2000, "error");
                  return false;
                }
                if (!_this.mobileCode) {
                  $.toptip("请输入手机验证码", 2000, "error");
                  return false;
                }
                $.showLoading();
                c.$post2(
                  c.javaWt + "/client/v3/bindPhone",
                  { cardId: _this.cardId, msgCode: _this.mobileCode },
                  function(res) {
                    $.hideLoading();
                    if (res.status == 0) {
                      _this.checkMobileStatus = true;
                      $.closeModal();
                      _this.order();
                    } else {
                      $.toptip(res.message, 2000, "error");
                      _this.mobileCode = "";
                    }
                  }
                );
              },
              onCancel: function() {
                $.closeModal();
                $.hideLoading();
                _this.clearData();
              }
            });
            _this.getCaptcha();
            _this.showHtml();
          } else {
            _this.checkMobileStatus = true;
            $.closeModal();
            $.hideLoading();
            _this.order();
          }
        }
      );
    },
    order: function() {
      const _this = this;
      if (
        sessionStorage.getItem("zid") == 230 &&
        this.checkMobileStatus == false
      ) {
        this.checkMobile();
        return false;
      }
      if (!this.id) {
        $.toptip("请选择套餐", 2000, "error");
        return false;
      }
      if (!this.price) {
        $.toptip("获取套餐价格失败", 2000, "error");
        return false;
      }
      if (!localStorage.getItem("cardNo") || sessionStorage.getItem("cardNo")) {
        $.toptip("获取卡号失败", 2000, "error");
        return false;
      }
      if (sessionStorage.getItem("remarks") == 19) {
        $.alert(
          "因运营商系统数据变更，该卡暂不支持本月激活或者复机使用，充值将会在次月生效。",
          "注意",
          function() {
            $.closeModal();
            _this.add(2);
          }
        );
      } else {
        if (this.bindType == 2) {
          this.addType();
        } else {
          this.add(0);
        }
      }
    },
    onBridgeReady: function(data) {
      const _this = this;
      WeixinJSBridge.invoke("getBrandWCPayRequest", data, function(res) {
        if (res.err_msg == "get_brand_wcpay_request:ok") {
          sessionStorage.setItem("pay", "true");
          _this.$router.push({ path: "order" });
          // 使用以上方式判断前端返回,微信团队郑重提示：
          //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
        }
      });
    },
    wxPay: function(typeMonth) {
      const _this = this;
      var data = {
        cardNo: sessionStorage.getItem("iccid"),
        packageId: _this.id,
        count: 1,
        type: typeMonth,
        uid: localStorage.getItem("id"),
        code: localStorage.getItem("code"),
        openid: sessionStorage.getItem("openid"),
        did: 0,
        nickname: localStorage.getItem("nickname")
      };
      if (
        localStorage.getItem("aid") &&
        localStorage.getItem("aid") != "null"
      ) {
        delete data.code;
        delete data.openid;
        data.aid = localStorage.getItem("aid");
        c.$post2(
          c.javaPre + "/wxpay/pay/v1/agentWxPayPreOrder",
          data,
          function(res) {
            $.hideLoading();
            if (res.status == 0) {
              sessionStorage.setItem("href", window.location.href);
              sessionStorage.setItem("orderKey", res.data.orderKey);
              window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${
                res.data.appid
              }&redirect_uri=http%3A%2F%2Fwx.szcoolfish.com%2Fcoolfish%2Fagent_pay%2FjavaAgentPay2.html&response_type=code&scope=snsapi_base#wechat_redirect`;
            } else {
              $.toptip(res.message, 2000);
            }
          },
          10000
        );
      } else if (_this.flag == "true") {
        $.alert("余额支付，立即扣费", "注意", function() {
          $.closeModal();
          c.$post2(
            c.javaPre + "/alipay/pay/v1/accountPay",
            data,
            function(res) {
              $.hideLoading();
              if (res.status == 0) {
                sessionStorage.setItem("pay", "true");
                _this.$router.push({ path: "order" });
              } else {
                $.toptip(res.message, 2000);
              }
            },
            10000
          );
        });
      } else if (_this.flag == "false") {
        c.$post2(
          c.javaPre + "/wxpay/pay/v1/getPayForm",
          // "http://wx.szcoolfish.com/plat/wxpay/pay/v1/getPayForm",
          data,
          function(res) {
            $.hideLoading();
            if (res.status == 1) {
              $.toptip(res.message, 2000, "error");
            } else {
              _this.onBridgeReady(res.data);
            }
          },
          10000
        );
      } else {
        data.money = _this.flag;
        $.alert(
          `扣除余额，微信支付<span style="color: red">${_this.flag}</span>`,
          "注意",
          function() {
            $.closeModal();
            c.$post2(
              c.javaPre + "/wxpay/pay/v1/accountAndPlatPay",
              data,
              function(res) {
                $.hideLoading();
                if (res.status == 1) {
                  $.toptip(res.message, 2000, "error");
                } else {
                  _this.onBridgeReady(res.data);
                }
              },
              10000
            );
          }
        );
      }
    },
    aliPay: function(typeMonth) {
      const _this = this;
      localStorage.setItem("ali", "true");
      var data = {
        cardNo: sessionStorage.getItem("iccid"),
        packageId: _this.id,
        count: 1,
        type: typeMonth,
        uid: localStorage.getItem("id"),
        openid: localStorage.getItem("user_id"),
        did: 0
      };
      if (_this.flag == "true") {
        $.alert("余额支付，立即扣费", "注意", function() {
          $.closeModal();
          c.$post2(
            c.javaPre + "/alipay/pay/v1/accountPay",
            data,
            function(res) {
              $.hideLoading();
              if (res.status == 0) {
                window.location.href = "index.html#/order";
              } else {
                $.toptip(res.message, 2000);
              }
            },
            10000
          );
        });
      } else if (_this.flag == "false") {
        c.$post2(
          c.javaPre + "/alipay/pay/v1/getPayForm",
          data,
          function(res) {
            $.hideLoading();
            if (res.status == 1) {
              $.toptip(res.message, 2000, "error");
            } else {
              document.write(res);
            }
          },
          10000
        );
      } else {
        data.money = _this.flag;
        data.payWay = "aliPay";
        $.alert(
          `扣除余额，支付宝支付<span style="color: red">${_this.flag}</span>`,
          "注意",
          function() {
            $.closeModal();
            c.$post2(
              c.javaPre + "/alipay/pay/v1/accountAndPlatPay",
              data,
              function(res) {
                $.hideLoading();
                if (res.status == 1) {
                  $.toptip(res.message, 2000, "error");
                } else {
                  document.write(res);
                }
              },
              10000
            );
          }
        );
      }
    },
    add: function(typeMonth) {
      const _this = this;
      if (
        sessionStorage.getItem("otherAid") == "true" &&
        sessionStorage.getItem("MicroMessenger") != "true"
      ) {
        $.alert("请在微信公众号支付。", "注意", function() {
          $.closeModal();
        });
        return;
      }
      $.showLoading();
      localStorage.setItem("money", _this.price);
      localStorage.setItem("packagename", _this.packagename);
      if (sessionStorage.getItem("MicroMessenger") == "true") {
        _this.wxPay(typeMonth);
      } else {
        _this.aliPay(typeMonth);
      }
    },
    addType: function() {
      const _this = this;
      const lidArr = [24, 32, 33];
      $.confirm({
        title: "请选择生效时间",
        text: "1",
        onOK: function() {
          var type = $.trim(
            $(".activeType")
              .find("p")
              .data("bind")
          );
          const lid = sessionStorage.getItem("lid");
          const operator_type = localStorage.getItem("operator_type");
          if (!type) {
            $.toptip("请选择生效时间", 2000, "error");
            return false;
          }
          $.closeModal();
          if (type == 1) {
            if (c.contains(lidArr, +lid)) {
              _this.add(3);
            } else {
              _this.add(1);
            }
          } else if (type == 2) {
            _this.add(2);
          }
        },
        onCancel: function() {
          $.closeModal();
        }
      });
      _this.getRadioHtml();
      _this.getRadio();
    },
    getRadioHtml() {
      $(".weui-dialog__bd").html(
        '<div class=" weui-cells_radio" style="padding-left: 30px;">' +
          '      <label class="weui-cell weui-check__label first" for="x11">' +
          '        <div class="weui-cell__bd">' +
          '          <p data-bind="1" style="color: #4d4d4d;">立即生效（本月）</p>' +
          "        </div>" +
          '        <div class="weui-cell__ft" style="width: 24px;">' +
          '          <input type="radio" class="weui-check" name="radio1" id="x11">' +
          '          <span class="weui-icon-checked"></span>' +
          "        </div>" +
          "      </label>" +
          '      <label class="weui-cell weui-check__label second" for="x12">' +
          '        <div class="weui-cell__bd">' +
          '          <p data-bind="2"  style="color: #4d4d4d;">次月生效（下月）</p>' +
          "        </div>" +
          '        <div class="weui-cell__ft" style="width: 24px;">' +
          '          <input type="radio" name="radio1" class="weui-check" id="x12">\n' +
          '          <span class="weui-icon-checked"></span>' +
          "        </div>" +
          "      </label>" +
          "    </div>"
      );
    },
    getRadio: function() {
      c.$get2("http://wx.szcoolfish.com/plat/common/v1/gettime", function(res) {
        var nowData = res.data;
        var y = new Date(nowData).getFullYear();
        var m = new Date(nowData).getMonth() + 1;
        var m2 = new Date(nowData).getDate() > 26 ? m + 1 : m;
        m2 = m < 10 ? "0" + m : m;
        var endTime2 = `${y}-${m2}-${24} 00:00:00`;
        var endTime = `${y}-${m < 10 ? "0" + m : m}-${25} 00:00:00`;
        if (
          (Date.parse(new Date(nowData)) > Date.parse(endTime) &&
            sessionStorage.getItem("type") != 2) ||
          (Date.parse(new Date(nowData)) > Date.parse(endTime2) &&
            sessionStorage.getItem("type") == 2)
        ) {
          $(".second")
            .click()
            .addClass("activeType")
            .siblings()
            .removeClass("activeType");
        } else {
          $(".first")
            .click()
            .addClass("activeType")
            .siblings()
            .removeClass("activeType");
        }
      });
      $(".weui-check__label").click(function() {
        $(this)
          .addClass("activeType")
          .siblings()
          .removeClass("activeType");
      });
    },
    getWxInfo: function() {
      const aidArr = [5862, 5982];
      let data = {};
      if (c.contains(aidArr, +localStorage.getItem("aid"))) {
        data = {
          uid: localStorage.getItem("id"),
          openid: sessionStorage.getItem("openid"),
          aid: localStorage.getItem("aid"),
          code: sessionStorage.getItem("code")
        };
      } else {
        data = {
          uid: localStorage.getItem("id"),
          openid: sessionStorage.getItem("openid")
        };
      }
      c.$post2(c.javaWt + "client/v3/wxInfo", data, function(res) {
        if (res.status != 0) {
          $.toptip(res.message, 2000, "error");
          return;
        }
        localStorage.setItem("nickname", res.data.nickname);
        sessionStorage.setItem("needFresh", "true");
        sessionStorage.setItem("openid", res.data.openid);
      });
    },
    psw: function() {
      const _this = this;
      if (
        sessionStorage.getItem(this.cardNo) != "true" &&
        sessionStorage.getItem("amount") > 0.0
      ) {
        $.confirm({
          title: "密码认证",
          text: "1",
          onOK: function() {
            let input = $("#weui-prompt-input").val();
            if (!input) {
              $.toptip("请输入密码", 2000, "error");
              return false;
            }
            c.$post2(
              c.javaWt + "client/v3/authPwd",
              {
                id: _this.cardId,
                password: input
              },
              function(res) {
                if (res.status != 0) {
                  $.toptip(res.message, 2000, "error");
                } else {
                  $.closeModal();
                  sessionStorage.setItem(_this.cardNo, "true");
                  $.toptip(res.message, 2000, "success");
                }
              },
              function() {}
            );
          },
          onCancel: function() {
            $.closeModal();
            _this.$router.push({ path: "password" });
          }
        });
        var inputArea = document.getElementById("weui-prompt-input");
        var timer = setInterval(function() {
          if (inputArea) {
            inputArea.scrollIntoView(false);
          } else {
            clearInterval(timer);
          }
        }, 200);
        $(".weui-dialog__bd").html(
          `<p class="weui-prompt-text">为保障用户余额安全，余额订购套餐需输入卡片密码</p><input type="text" class="weui-input weui-prompt-input" id="weui-prompt-input" value="" placeholder="请输入密码">`
        );
        $("#weui-prompt-input").attr("placeholder", "请输入密码");
        $(".weui-dialog__btn.default").text("忘记密码");
      }
    },

    loadFlow: function(data) {
      const _this = this;
      if (_this.type) {
        if (data.isInfinite == 2) {
          if (data.usetime == 30) {
            data.tabNo = 1;
          } else {
            data.tabNo = 2;
          }
          data.flow = "∞";
        } else if (data.flow / 1024 >= 1) {
          if (data.usetime == 30 && data.base == 1) {
            data.tabNo = 3;
          } else if (data.usetime > 30 && data.base == 1) {
            data.tabNo = 2;
            data.isInfinite = 2;
          } else {
            if (data.usetime == 1 && data.base == 1 && data.stackable == 2) {
              data.tabNo = 3;
              data.isInfinite = 2;
            } else if (
              data.usetime == 1 &&
              data.base == 2 &&
              data.stackable == 1
            ) {
              data.tabNo = 1;
              data.isInfinite = 2;
            } else {
              data.tabNo = 1;
              data.isInfinite = 2;
            }
          }
          data.flow = Math.floor(data.flow / 1024) + "G";
        } else {
          if (data.usetime == 30 && data.base == 1) {
            data.tabNo = 3;
          } else if (data.usetime == 30 && data.base == 2) {
            data.tabNo = 1;
            data.isInfinite = 2;
          }
          data.flow = parseInt(data.flow) + "M";
        }
      } else {
        if (data.isInfinite == 2) {
          data.flow = "∞";
        } else if (data.flow / 1024 >= 1) {
          data.flow = Math.floor(data.flow / 1024) + "G";
        } else {
          data.flow = parseInt(data.flow) + "M";
        }
      }
      if (c.contains(_this.lid_add, +_this.lid) || _this.package_type == 3) {
        data.usetime = "(" + data.usetime + "天有效" + ")";
      } else if (data.usetime == 7) {
        data.usetime = "(" + "当月7天有效" + ")";
      } else if (data.usetime == 30) {
        if (_this.operatorid == 105 || c.contains(_this.allType, +_this.operatorid)) {
          data.usetime = "(" + "30天有效" + ")";
        } else if (_this.type) {
          if (_this.package_type == 6) {
            data.usetime = "(" + data.usetime + "天有效" + ")";
          } else {
            data.usetime = "";
          }
        } else {
          data.usetime = "(" + "当月有效" + ")";
        }
      } else {
        data.usetime = "(" + data.usetime + "天有效" + ")";
      }
    },

    loadCard: function(res, lib) {
      const _this = this
      $.each(res.data, function(i, data) {
        _this.loadFlow(data);
        data.active = false;
        data.addType = 1;
        if (data.isDis == 1) {
          if (_this.type) {
            switch (data.tabNo) {
              case 1:
                _this.lib["tab1"].push(res.data[i]);
                _this.tab1.title = "固定套餐";
                if (
                  sessionStorage.getItem("type") == 4 ||
                  localStorage.getItem("package_type") == 1
                ) {
                  if (localStorage.getItem("package_type") != 6) {
                    data.addType = 2;
                  }
                }
                break;
              case 2:
                _this.lib["tab2"].push(res.data[i]);
                _this.tab2.title = "普通多月套餐";
                break;
              case 3:
                _this.lib["tab3"].push(res.data[i]);
                _this.tab3.title = "叠加套餐";
                break;
              default:
                break;
            }
          }
        } else {
          _this.lib["tab5"].push(res.data[i]);
        }
      });
      return lib;
    },

    //对套餐进行分类
    loadType: function(res, lib) {
      const _this = this
      $.each(res.data, function(i, data) {
        _this.loadFlow(data);
        data.active = false;
        data.addType = 1;
        if (data.isDis == 1) {
          switch (data.type) {
            case 1:
              _this.lib["tab1"].push(res.data[i]);
              if (c.contains(_this.lid_all, +_this.lid)) {
                data.addType = 2;
                _this.tab1.title = "移动小王卡";
              } else if (c.contains(_this.lid_add, +_this.lid)) {
                _this.tab1.title = "限时不限量套餐";
              } else {
                _this.tab1.title = "月套餐";
              }
              if (c.contains(_this.lid_speed, +_this.lid) && sessionStorage.getItem("type") == 4) {
                data.addType = 2;
              }
              if (c.contains(_this.lid_free, +_this.lid)) {
                data.addType = 2;
              }
              break;
            case 4:
              _this.lib["tab1"].push(res.data[i]);
              _this.tab1.title = "月套餐";
              break;
            case 6:
              _this.lib["tab1"].push(res.data[i]);
              _this.tab1.title = "月套餐";
              break;
            //月包叠加包
            case 2:
              _this.lib["tab2"].push(res.data[i]);
              _this.tab2.title = "季包";
              break;
            //季包
            case 5:
              _this.lib["tab3"].push(res.data[i]);
              _this.tab3.title = "半年包";
              break;
            //半年
            case 3:
              _this.lib["tab4"].push(res.data[i]);
              _this.tab4.title = "年包";
              //年包
              break;
            default:
              break;
          }
        } else {
          var timestamp = Math.round(new Date().getTime() / 1e3);
          if (timestamp < res.data[i].p_endtime) {
            _this.lib["tab5"].push(res.data[i]);
          }
        }
      });
      return lib;
    },
    getPackage: function() {
      const _this = this
      //获取普通套餐
      c.$post2(
        c.javaWt + "/client/v3/opkgList",
        {
          cardNo: localStorage.getItem("cardNo"),
          uid: localStorage.getItem("id")
        },
        function(res) {
          if (res.status != 0 || res.data.length == 0) {
            _this.cardPackage = 1;
            $.toptip(res.message || "获取套餐失败", 2000, "error");
            $.hideLoading();
            return;
          }
          if (_this.type) {
            //池卡月套餐类型
            _this.loadCard(res, _this.lib);
          } else {
            //长周期类型
            _this.loadType(res, _this.lib);
          }
          if (_this.tab1.title) {
            _this.titleArr.push(_this.tab1);
          } else {
            delete _this.lib.tab1;
          }
          if (_this.tab2.title) {
            _this.titleArr.push(_this.tab2);
          } else {
            delete _this.lib.tab2;
          }
          if (_this.tab3.title) {
            _this.titleArr.push(_this.tab3);
          } else {
            delete _this.lib.tab3;
          }
          if (_this.tab4.title) {
            _this.titleArr.push(_this.tab4);
          } else {
            delete _this.lib.tab4;
          }
          _this.libArr = Object.assign({}, _this.lib);
          // title[0].active = true;
          _this.title = Object.assign({}, _this.titleArr);
          $.hideLoading();
        }
      );
    }
  },
  created: function() {
    const _this = this;
    if (sessionStorage.getItem("needFresh") != "true") {
      if (sessionStorage.getItem("MicroMessenger") == "true") {
        _this.getWxInfo();
      }
    }
    $.showLoading();
    _this.psw();
    _this.getType();
    _this.getPackage()
  }
};
</script>
<style scoped>
.add {
  margin-top: 0 !important;
}

.content-renzheng {
  padding-top: 10px;
  width: 100%;
  background: #ffffff;
  border-bottom: 1px solid #e7e7e8;
}

.content-dangqian_left {
  margin-top: 0 !important;
  padding-top: 0 !important;
}

.content-dangqian {
  padding: 1px 0;
  border-bottom: none;
  width: 90%;
  margin: 261px auto 5%;
}

.content-dangqian div {
  margin-left: 0;
}

.content-dangqian-list {
  position: relative;
}

.packageInfo {
  position: relative;
}

.content-dangqian .titleBOX {
  font-size: 14px;
  padding: 0;
  word-break: break-all;
}

.content-dangqian .left_info {
  width: 75%;
}

.right_price {
  white-space: nowrap;
  text-align: center;
}

.saleAfter {
  font-size: 15px;
  color: #32a3ef;
}

.saleBefore {
  font-size: 13px;
  color: #999;
  text-decoration: line-through;
}

.content_active {
  background: -webkit-linear-gradient(left, #31a5ee, #42d5ff) !important;
  color: #ffffff !important;
}

.content_active .content-renzheng-title,
.content_active .left_info,
.content_active .saleAfter,
.content_active .saleBefore {
  color: #ffffff !important;
}

body {
  height: auto;
  font-family: Tahoma, Arial, Roboto, "Droid Sans", "Helvetica Neue",
    "Droid Sans Fallback", "Heiti SC", sans-self !important;
}

.weui-navbar {
  background-color: #ffffff;
}

.body-margin {
  margin-bottom: 46px;
}

.weui-navbar:after {
  border-bottom: none;
}

.weui-navbar__item:after {
  border-right: none;
}

.weui-navbar__item {
  color: #494949;
}

.weui-navbar__item.weui-bar__item--on {
  color: #32a4ef;
  background-color: #ffffff;
}

.weui-navbar__item {
  line-height: 24px;
  font-size: 14px;
  height: 24px;
}

.active_hengxian {
  width: 21px;
  margin: 2px auto;
  background: #42d0fe;
  height: 1px;
  border-radius: 3px;
  border: 1.5px solid #32a4ef;
}

.weui-navbar__item.weui-bar__item--on {
  font-size: 18px;
  border-top-width: 0 !important;
}

.rechargeSingleMonthPage ul li {
  height: 100%;
  padding: 10px 6px;
  background: #fff;
  border-bottom: 1px solid #e7e7e7;
}

.info {
  position: relative;
}

.info_right {
  position: absolute;
  top: 56px;
  right: 10%;
}

.rechargeSingleMonthPage ul li .right div {
  display: inline-block;
  width: 8em;
  text-align: right;
}

.rechargeSingleMonthPage ul li .left {
  line-height: 40px;
  color: #292929;
  text-indent: 5%;
  white-space: nowrap;
}

.rightArrow {
  line-height: 40px;
  vertical-align: top;
  position: relative;
  left: -2em;
}

.saleAfter {
  font-size: 15px;
  color: #56b3f2;
}

.saleBefore {
  font-size: 13px;
  color: #aaaaaa;
  text-decoration: line-through;
}

.info_left {
  width: 68%;
  margin: 0 2.5%;
  color: #aaaaaa;
}

.foot {
  font-size: 15px;
  width: 100%;
  padding: 18px 0;
  text-align: center;
  color: #fff;
  font-family: "微软雅黑";
  position: fixed;
  bottom: 0;
  background: -webkit-linear-gradient(left, #31a5ee, #42d5ff);
}

.addPack ul li {
  background: -webkit-linear-gradient(left, #31a5ee, #42d5ff) !important;
  color: #ffffff !important;
}

.addPack ul li .left,
.addPack ul li .info_left,
.addPack ul li .saleAfter,
.addPack ul li .saleBefore {
  color: #ffffff !important;
}

.flow {
  background: #33a6f0;
  color: #ffffff;
  font-size: 14px !important;
  display: inline-block;
  text-align: center;
  letter-spacing: 1px;
  border-radius: 5px;
  width: 42px !important;
  height: 42px !important;
  line-height: 42px !important;
  margin-right: 20px !important;
  /*font-family: 'MicrosoftYaHei-Bold';*/
}

.flow.infinite {
  font-size: 30px !important;
  line-height: 38px !important;
}

.package_list div:nth-of-type(2) {
  display: inline-block;
}

.weui-media-box_appmsg .weui-media-box__bd {
  height: 42px;
}

h4 span.weui-media-box__desc,
.weui-media-box__bd .price,
.weui-media-box__bd .old_price {
  display: inline-block !important;
}

.weui-media-box__desc {
  color: #8f8f8f;
}

.weui-media-box__bd .price {
  color: #ff5252;
  font-size: 19px;
  height: 17px;
  line-height: 17px;
  margin-top: 8px;
}

.weui-media-box__title {
  height: 18px;
  line-height: 18px;
}

.weui-media-box__bd .price .yuan {
  font-size: 14px;
}

a.weui-media-box {
  height: 45px;
}

span.weui-media-box__desc {
  font-size: 16px;
  vertical-align: middle;
  line-height: 16px;
}

div.weui-media-box__desc {
  font-size: 14px;
  vertical-align: middle;
  line-height: 24px;
  margin-top: 2px;
}

.package_title {
  color: #33a6f0;
  background: #f0f1f3;
  margin-top: 0;
  font-size: 14px !important;
}

.price {
  color: red;
  font-weight: bold;
}

.old_price {
  text-decoration: line-through;
  margin-left: 8px;
  font-size: 12px;
}

.special {
  width: 18px;
  margin: 0 auto;
  line-height: 14px;
  text-align: center;
  font-size: 14px;
  position: absolute;
  top: 1px;
  right: 10px;
  background: #ff5252;
  color: #ffffff;
  padding-top: 10px;
  padding-left: 5px;
  padding-right: 5px;
}

.active .special {
  right: 9px;
  top: 0;
}

.choose {
  line-height: 10px;
  font-size: 15px;
  color: #ffffff;
  position: absolute;
  bottom: 0;
  right: 0;
  width: 0;
  height: 0;
  border-width: 15px;
  border-style: solid;
  border-color: transparent #31a6ee #31a6ee transparent;
}

.choose img {
  width: 13px !important;
}

.special div {
  position: absolute;
  left: 0;
  border-top: 8px solid #ff5252;
  border-right: 14px solid #ff5252;
  border-bottom: 10px solid #ffffff;
  border-left: 14px solid #ff5252;
}

.package_content {
  position: relative;
}

.active {
  border: 1px solid #33a6f0 !important;
  padding: 14px !important;
}

.margin {
  margin-top: 0 !important;
}

.weui-navbar {
  width: 92%;
  padding: 0 4% 0 4%;
  position: fixed;
  height: 50px;
  left: 0;
  right: 0;
  top: 0;
}

.weui-panel__hd {
  padding-top: 10px !important;
}

.weui-media-box:before,
.weui-panel__hd:after {
  left: 0 !important;
}

#template {
  position: fixed;
  padding-top: 0 !important;
  width: 100%;
  top: 50px;
  padding-bottom: 100px;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
}
</style>
