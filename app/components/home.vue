<template>
  <div class="TotalContentBox">
    <div class="weui-panel weui-panel_access top-info" v-if="!otherAid">
      <div class="weui-panel__bd top-info-content">
        <div class="weui-media-box weui-media-box_appmsg top-info-content">
          <div class="weui-media-box__hd logo_img">
            <img class="weui-media-box__thumb headimgurl" v-bind:src="headimgurl">
          </div>
          <div class="weui-media-box__bd logo_content">
            <p class="weui-media-box__desc">
              昵称：
              <span class="nickname">{{nickname}}</span>
            </p>
            <p class="weui-media-box__desc">
              卡号：
              <span class="tel" id="tel">{{cardNo}}</span>
            </p>
          </div>
          <div class="icon-qiehuan qiehaun" @click="qiehuan"></div>
        </div>
      </div>
    </div>
    <div class="weui-panel weui-panel_access top-info zhh" v-if="otherAid">
      <div class="weui-panel__bd top-info-content">
        <div class="weui-media-box weui-media-box_appmsg top-info-content">
          <div class="weui-media-box__hd logo_img">
            <img class="weui-media-box__thumb headimgurl" v-bind:src="headimgurl">
          </div>
          <div class="weui-media-box__bd logo_content">
            <p class="weui-media-box__desc">
              昵称：
              <span class="nickname">{{nickname}}</span>
            </p>
            <p class="weui-media-box__desc">
              卡号：
              <span class="tel" id="tel">{{cardNo}}</span>
            </p>
          </div>
          <div class="icon-qiehuan qiehaun" @click="qiehuan"></div>
        </div>
      </div>
    </div>
    <div class="weui-flex info-middle">
      <div class="clearfix weui-flex__item packageBox">
        <span class></span>
        账户余额：
        <span class="amount">{{amount}}</span>
        元
      </div>
      <div class="clearfix weui-flex__item packageBox">
        <span class></span>
        认证状态：
        <span class="real_status" @click="clickStatus">{{real_status}}</span>
      </div>
    </div>
    <div class="hengxian"></div>
    <!--九宫格列表开始-->
    <div class="weui-grids weui-panel">
      <div class="weui-grid js_grid detail" @click="info" v-show="aid!=2886">
        <div class="weui-grid__icon">
          <img src="../img/detail.png">
        </div>
        <p class="weui-grid__label">流量查询</p>
      </div>
      <div class="weui-grid js_grid" @click="order">
        <div class="weui-grid__icon">
          <img src="../img/order.png">
        </div>
        <p class="weui-grid__label">流量订购</p>
      </div>
      <div class="weui-grid js_grid record" @click="record">
        <div class="weui-grid__icon">
          <img src="../img/record.png">
        </div>
        <p class="weui-grid__label">消费记录</p>
      </div>
      <div class="weui-grid js_grid register" @click="clickStatus">
        <div class="weui-grid__icon">
          <img src="../img/register.png">
        </div>
        <p class="weui-grid__label">实名认证</p>
      </div>
      <div class="weui-grid js_grid recharge" @click="recharge" v-show="aid == null||aid=='null'">
        <div class="weui-grid__icon">
          <img src="../img/recharge.png">
        </div>
        <p class="weui-grid__label">余额充值</p>
      </div>

      <div class="weui-grid js_grid" @click="unbind" v-show="oid!=229">
        <div class="weui-grid__icon">
          <img src="../img/1204358.png">
        </div>
        <p class="weui-grid__label">电信机卡解绑</p>
      </div>
      <div class="weui-grid js_grid" @click="apn" v-if="id != 51">
        <div class="weui-grid__icon">
          <img src="../img/setting.png">
        </div>
        <p class="weui-grid__label">手机设置APN</p>
      </div>
      <div class="weui-grid js_grid password" @click="password">
        <div class="weui-grid__icon">
          <img src="../img/password.png">
        </div>
        <p class="weui-grid__label">修改密码</p>
      </div>
      <div class="weui-grid js_grid" @click="diagnose">
        <div class="weui-grid__icon">
          <img src="../img/unbind.png">
        </div>
        <p class="weui-grid__label">智能诊断</p>
      </div>
      <!--<div class="weui-grid js_grid cardActive hidden" @click="active">-->
      <!--<div class="weui-grid__icon">-->
      <!--<img src="../img/active.png"/>-->
      <!--</div>-->
      <!--<p class="weui-grid__label">-->
      <!--卡片激活-->
      <!--</p>-->
      <!--</div>-->
      <div class="weui-grid js_grid" @click="orderList" v-if="showMoreStatus">
        <div class="weui-grid__icon">
          <img src="../img/orderList.png">
        </div>
        <p class="weui-grid__label">我的订单</p>
      </div>
      <div class="weui-grid js_grid" @click="question" v-if="id != 51&&showMoreStatus">
        <div class="weui-grid__icon">
          <img src="../img/question.png">
        </div>
        <p class="weui-grid__label">常见问题</p>
      </div>
    </div>
    <div
      class="weui-cell weui-cell_link"
      style="text-align: center;padding: 5px 15px;"
      @click="showMore"
    >
      <div class="weui-cell__bd">
        {{showMoreStatus==true?'收起':'查看更多'}}
        <img
          src="../img/arrow.png"
          alt
          style="width: 10px;vertical-align: middle"
        >
      </div>
    </div>
    <div class="weui-panel weui-panel_access addEvent" v-if="id == 50">
      <div class="hengxian"></div>
      <Swiper ref="swiper" v-if="list.length>0">
        <Slide v-for="(item,index) in list" :key="index">
          <div class="weui-panel__bd">
            <a
              href="javascript:void(0);"
              class="weui-media-box weui-media-box_appmsg"
              @click="freeCard(item.id)"
            >
              <div class="weui-media-box__hd">
                <img class="weui-media-box__thumb" src="../img/freeCard.png">
              </div>
              <div class="weui-media-box__bd">
                <h4
                  class="weui-media-box__title"
                  style="color: orangered;font-size:16px;"
                >{{item.title}}</h4>
                <p class="weui-media-box__desc">{{item.describe}}</p>
              </div>
            </a>
          </div>
        </Slide>
      </Swiper>
    </div>
    <!--九宫格结束-->
    <!--页脚开始-->
  </div>
</template>

<script>
import c from "../index";
import { Swiper, Slide } from "vue-swiper-component";
export default {
  data() {
    return {
      id: localStorage.getItem("id") ? localStorage.getItem("id") : 50,
      aid: sessionStorage.getItem("aid") || localStorage.getItem("aid"),
      type: sessionStorage.getItem("type"),
      oid: sessionStorage.getItem("operatorid"),
      cardNo: localStorage.getItem("cardNo"),
      amount: sessionStorage.getItem("amount"),
      otherAid: sessionStorage.getItem("otherAid") == "true",
      nickname:
        sessionStorage.getItem("nickname") || localStorage.getItem("nickname"),
      real_status: localStorage.getItem("real_status"),
      needFresh: sessionStorage.getItem("needFresh"),
      operator_type: localStorage.getItem("operator_type"),
      headimgurl:
        sessionStorage.getItem("headimgurl") ||
        localStorage.getItem("headimgurl"),
      showMoreStatus: false,
      list: [
        {
          id: "19",
          title: "儿童机器人，过年送礼好选择！",
          describe: "儿童成长机器人，酷易充粉丝专享，专享优惠价99元！"
        },
        // {
        //   id: "79",
        //   title: "购物影视卡大放送！",
        //   describe: "只用10元邮费享受2000元优惠的体验！赶快去发现更多的优惠吧！"
        // },
        {
          id: "80",
          title: "4G无线上网设备免费领",
          describe:
            "为了能让用户更方便的使用物联网卡，给用户带来更好的急速上网体验，4G无线上网卡免费送。"
        }
      ]
    };
  },
  components: {
    Swiper,
    Slide
  },
  methods: {
    clickStatus: function() {
      if (this.real_status == "已认证") {
        $.alert("你已经实名，无需再次实名。", "注意", function() {
          $.closeModal();
        });
      } else if (this.real_status == "认证中") {
        $.alert("你已提交实名，请等待实名审核。", "注意", function() {
          $.closeModal();
        });
      } else {
        this.$router.push({ path: "register" });
      }
    },
    prevSlideClick() {
      this.$refs.swiper.prevSlide();
    },
    nextSlideClick() {
      this.$refs.swiper.nextSlide();
    },
    slideToClick() {
      this.$refs.swiper.slideTo(2);
    },
    unbind: function() {
      if (this.operator_type == 2) {
        this.$router.push({ path: "diagnose", query: { type: 2 } });
      } else {
        $.alert("机卡解绑功能仅限电信卡使用。", "注意", function() {
          $.closeModal();
        });
      }
    },
    orderList: function() {
      if (sessionStorage.getItem("MicroMessenger") == "true") {
        sessionStorage.setItem("returnUrl", window.location.href);
        window.location.href = `http://wx.szcoolfish.com/coolfish/pay/?id=50#/my?id=50&type=1`;
      } else {
        $.alert("请在微信酷易充公众号查看。", "注意", function() {
          $.closeModal();
        });
      }
    },
    diagnose: function() {
      this.$router.push({ path: "diagnose" });
    },
    freeCard: function(id) {
      if (sessionStorage.getItem("MicroMessenger") == "true") {
        const seckillArr = [19];
        if (c.contains(seckillArr, +id)) {
          window.location.href = `http://wx.szcoolfish.com/coolfish/pay/?id=50#/detail?id=${id}&secReturnUrl=${
            window.location.href
          }`;
        } else {
          this.$router.push({ path: "view", query: { id, type: "pay" } });
        }
      } else {
        $.alert("请在微信酷易充公众号申请。", "注意", function() {
          $.closeModal();
        });
      }
    },
    showMore: function() {
      this.showMoreStatus = !this.showMoreStatus;
    },
    qiehuan: function() {
      if (this.aid && this.aid != "null") {
        this.$router.push({
          path: "bindCard",
          query: { id: this.id, aid: this.aid }
        });
      } else {
        this.$router.push({ path: "bindCard", query: { id: this.id } });
      }
    },
    recharge: function() {
      this.$router.push({ path: "recharge" });
    },
    info: function() {
      this.$router.push({ path: "info" });
    },
    record: function() {
      this.$router.push({ path: "record" });
    },
    active: function() {
      this.$router.push({ path: "active" });
    },
    password: function() {
      this.$router.push({ path: "password" });
    },
    keyJump: function(num1, num2) {
      const _this = this;
      if (_this.id == 50) {
        _this.$router.push({ path: "view", query: { id: num1 } });
      } else if (_this.id == 52) {
        _this.$router.push({ path: "view", query: { id: num2 } });
      }
    },
    question: function() {
      this.keyJump(50, 52);
    },
    apn: function() {
      this.keyJump(47, 54);
    },
    order: function() {
      const package_List = [1, 2, 3, 4, 6, 7];
      const _this = this;
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
        }
        _this.type = res.data.type;
        _this.amount = res.data.amount;
        sessionStorage.setItem("type", res.data.type);
        sessionStorage.setItem("amount", _this.amount);
      });
    },
    getWechatInfo: function() {
      const _this = this;
      let data = {};
      if (this.otherAid) {
        data = {
          uid: _this.$route.query.id || localStorage.getItem("id"),
          aid: localStorage.getItem("aid"),
          code: sessionStorage.getItem("code")
        };
      } else {
        data = {
          uid: _this.$route.query.id || localStorage.getItem("id"),
          openid: sessionStorage.getItem("openid")
        };
      }
      c.$post2(c.javaWt + "client/v3/wxInfo", data, function(res) {
        if (res.status != 0) {
          return;
        }
        _this.nickname = res.data.nickname;
        _this.headimgurl = res.data.headimgurl;
        sessionStorage.setItem("needFresh", "true");
        sessionStorage.setItem("openid", res.data.openid);
        localStorage.setItem("nickname", res.data.nickname);
        localStorage.setItem("headimgurl", res.data.headimgurl);
      });
    },
    getRealContent: function() {
      $(".weui-dialog__bd")
        .html(
          "" +
            '<div class="RightTip" style="font-size:14px;">' +
            '<span class="icon-zhuyi" style="color: #d89e5a;font-size:14px;"></span>' +
            "    尊敬的用户,为了贯彻工信部<br>《电话用户真实身份信息登记规定》,<br>请对您购买的流量卡进行实名认证。" +
            "</div>"
        )
        .css("padding", "0.8em");
      $(".weui-dialog__btn.primary").text("去认证");
    },
    alertRealSpecial: function() {
      const _this = this;
      $.alert("实名认证", "实名认证", function() {
        $.closeModal();
        if (
          sessionStorage.getItem("remarks") == 15 &&
          localStorage.getItem("operator_type") == 2
        ) {
          if (
            localStorage.getItem(sessionStorage.getItem("cardid")) != "true"
          ) {
            localStorage.setItem(sessionStorage.getItem("cardid"), "true");
            c.$post2(
              "http://wx.szcoolfish.com/seckill/tool/security",
              { phone: sessionStorage.getItem("iccid") },
              function(res) {
                if (res.status == 0) {
                  window.location.href =
                    "http://iotapp.iot.189.cn:9090/uapp/certifhtml/certif_entry.html?userCode=cprjJsxmj55oHb8oEZgTAw==&passWord=RUDELsIOyw/zG5NDz3HBgA==&phone=&accessNbr=" +
                    res.message;
                }
              }
            );
          } else {
            c.$post2(
              "http://120.79.150.124:8761/ctcc/realNameQueryIot",
              { cardId: sessionStorage.getItem("cardid") },
              function(res) {
                res = JSON.parse(res);
                if (res.resultCode != 0) {
                  localStorage.setItem(
                    sessionStorage.getItem("cardid"),
                    "true"
                  );
                  c.$post2(
                    "http://wx.szcoolfish.com/seckill/tool/security",
                    { phone: sessionStorage.getItem("iccid") },
                    function(res) {
                      if (res.status == 0) {
                        window.location.href =
                          "http://iotapp.iot.189.cn:9090/uapp/certifhtml/certif_entry.html?userCode=cprjJsxmj55oHb8oEZgTAw==&passWord=RUDELsIOyw/zG5NDz3HBgA==&phone=&accessNbr=" +
                          res.message;
                      }
                    }
                  );
                }
              }
            );
          }
        } else {
          _this.$router.push({ path: "register" });
        }
      });
    },
    alertRealNormal: function() {
      $.alert("实名认证", "实名认证", function() {
        $.closeModal();
        _this.$router.push({ path: "register" });
      });
    }
  },
  created: function() {
    const _this = this;
    if (this.otherAid) {
      this.list = [];
    }
    if (
      sessionStorage.getItem("pay") == "true" ||
      sessionStorage.getItem("active") == "true"
    ) {
      sessionStorage.setItem("pay", false);
      sessionStorage.setItem("active", false);
      _this.getNewData();
    }
    if (this.type == 4 && sessionStorage.getItem("changeCard") != "true") {
      $.alert("空卡套餐，请订购套餐后使用。", "注意", function() {
        $.closeModal();
        _this.$router.push({ path: "packagen" });
      });
    } else {
      if (
        sessionStorage.getItem("remarks") == 15 &&
        localStorage.getItem("operator_type") == 2 &&
        localStorage.getItem("real_status") != "已认证"
      ) {
        _this.alertRealSpecial();
        _this.getRealContent();
      } else if (
        sessionStorage.getItem("remarks") == 18 &&
        localStorage.getItem("real_status") != "已认证" &&
        localStorage.getItem("real_status") != "认证中"
      ) {
        _this.alertRealNormal();
        _this.getRealContent();
      }
    }
    if (sessionStorage.getItem("needFresh") != "true") {
      if (sessionStorage.getItem("MicroMessenger") == "true") {
        _this.getWechatInfo();
      }
    }
  }
};
</script>
<style scoped>
.weui-grids.weui-panel {
  margin-top: 0;
}

.addEvent {
  margin-top: 0;
  margin-bottom: 10px;
}

.TotalContentBox .weui-panel:before {
  height: 0 !important;
  border-top: none !important;
}

.top-info {
  height: 160px;
  width: 100%;
  background-color: #ffffff;
  background: url("../img/bg2.png");
  background-size: contain;
}
.top-info.zhh {
  background-color: #ffffff;
  margin-top: 0;
  background: -webkit-linear-gradient(left, #fcf0b3, #ffdf71) !important;
}
.zhh >>> .weui-media-box__desc,
.zhh >>> .icon-qiehuan.qiehaun {
  color: #000 !important;
}
input[type="button"],
input[type="submit"],
input[type="reset"] {
  -webkit-appearance: none;
}

.top-info-content {
  height: 100%;
  padding-left: 0 !important;
}

.weui-media-box_appmsg.top-info-content {
  height: -webkit-calc(100% - 30px);
}

.packageBox {
  text-align: center;
  line-height: 30px;
  padding: 5px;
  white-space: nowrap;
  font-size: 14px;
}

.packageBox:nth-of-type(1) {
  border-right: 1px solid #ebebeb;
}

.price,
.real_status {
  color: #ffa200;
}

.weui-media-box__desc {
  font-size: 14px !important;
}

.logo_content p:nth-of-type(1) {
  width: 100%;
  height: 23px;
  line-height: 23px;
  font-size: 14px !important;
  color: white;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.logo_content p {
  color: #fff;
  margin: 10px 24px;
  white-space: nowrap;
  overflow: visible;
}

.qiehaun {
  color: #ffffff;
  float: right;
  position: absolute;
  top: 25%;
  right: 10%;
}

.logo_img {
  height: 80px !important;
  width: 80px !important;
  margin-left: 20px;
}

.info-middle {
  height: 40px;
  background: #ffffff;
  color: #2c2c2c;
}

.logo_img img {
  height: 86px !important;
  width: 86px !important;
  border-radius: 50%;
}

img {
  max-width: 100%;
  border: 0;
  vertical-align: bottom;
}

#tel {
  white-space: nowrap;
}

.amount {
  color: #2471b4;
}

.hengxian {
  background: #f0f1f3;
  height: 6px;
}

.weui-grid__icon {
  width: 40px;
  height: 40px;
}

.hidden {
  display: none !important;
}
</style>
