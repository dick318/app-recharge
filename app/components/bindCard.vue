<template>
  <div id="bindCardPage" v-bind:class="[moreClass,baseClass]">
    <div class="logo">
      <img id="logo_img" class="otherImg" src="../img/logo_simple.png" v-if="type_logo === 'A'">
      <img id="logo_img" src="../img/Xlogo.png" v-if="type_logo === 'B'">
      <img id="logo_img" src="../img/baixun.png" v-if="type_logo === 'C'">
      <div class="icon-qiehuan llgt" v-if="type_logo === 'D'"></div>
      <div class="llgt_title" v-if="type_logo === 'D'">流量沟通100</div>
      <img id="logo_img" style="width: 33%;" v-if="type_logo === id" v-bind:src="imgUrl">
    </div>
    <div class="bindCardMain">
      <div class="cardNoArea">
        <label>卡号</label>
        <span class="icon-saoyisao" id="scanQRCode" @click="scanQRCode"></span>
        <div>
          <input
            id="card_no"
            placeholder="请输入流量卡号"
            type="text"
            v-model.lazy.trim="cardNo"
            @click="getList"
            @keyup.enter="doSomething"
          >
        </div>
      </div>
      <div id="FuzzySearch" class="FuzzySearch" v-if="FuzzySearch">
        <ul class="list">
          <li v-for="cardNo in cards" @click="getCard(cardNo)" :key="cardNo">
            {{ cardNo }}
            <i class="weui-icon-cancel" @click.stop="bindCardDel(cardNo)"></i>
          </li>
        </ul>
      </div>
      <input
        id="bindCard"
        v-bind:class="{ lyz: islyz }"
        type="button"
        value="查询"
        @click="doSomething"
      >
      <div class="tips">点击输入卡号右侧 "扫一扫" 图标，可直接扫码查询</div>
    </div>
  </div>
</template>

<script>
import c from "../index";
import wx from "weixin-js-sdk"; //微信jsdk
import jdyArr from "../js/jdy";
import ap from "../js/alipayjsapi.min";

export default {
  data() {
    return {
      aidArr: [5862, 5982, 5981],
      type_logo: "",
      baseClass: "kuyu",
      moreClass: "",
      islyz: "",
      loading: "",
      flag: "",
      imgUrl: "",
      cardNo: "",
      aid: this.$route.query.aid,
      id: this.$route.query.id,
      FuzzySearch: "",
      cards: [],
      bindList: [],
      code: "",
      url: "",
      data: ""
    };
  },
  methods: {
    bindCardDel(cardNo) {
      const _this = this;
      if (sessionStorage.getItem("MicroMessenger") != "true") {
        $.alert("请在微信公众号操作。", "注意", function() {
          $.closeModal();
        });
        return;
      }
      this.FuzzySearch = true;
      for (const v of _this.bindList) {
        if (v.card === cardNo) {
          c.$post2(
            c.javaWt + "client/v3/bindCardDel",
            {
              id: v.id
            },
            function(res) {
              if (res.status == 0) {
                const index = _this.bindList.indexOf(v);
                const index2 = _this.cards.indexOf(cardNo);
                _this.bindList.splice(index, 1);
                _this.cards.splice(index2, 1);
                const cardArr = _this.cards;
                sessionStorage.setItem("cardArr", cardArr.join(","));
              } else {
                $.toptip(res.message, 2000, "error");
              }
            }
          );
          break;
        }
      }
    },
    load: function(res) {
      const _this = this;
      sessionStorage.setItem("fid", res.data.fid);
      sessionStorage.setItem("sid", res.data.sid);
      sessionStorage.setItem("tid", res.data.tid);
      sessionStorage.setItem("zid", res.data.zid);
      sessionStorage.setItem("cardid", res.data.id);
      sessionStorage.setItem("type", res.data.type);
      sessionStorage.setItem("tel", res.data.tel);
      sessionStorage.setItem("remarks", res.data.remarks);
      sessionStorage.setItem("iccid", res.data.iccid);
      sessionStorage.setItem("packageid", res.data.packageid);
      sessionStorage.setItem("password", res.data.password);
      sessionStorage.setItem("amount", res.data.amount);
      sessionStorage.setItem(
        "card_type",
        res.data.cardType || res.data.card_type
      );
      sessionStorage.setItem("operatorid", res.data.operatorid);
      localStorage.setItem(
        "operator_type",
        res.data.operatorType || res.data.operator_type
      );
      localStorage.setItem(
        "package_type",
        res.data.packageType || res.data.package_type
      );
      if (sessionStorage.getItem("Alipay") == "true") {
        localStorage.setItem(
          "user_id",
          res.data.userInfo.alipay_user_info_share_response.user_id
        );
        localStorage.setItem(
          "headimgurl",
          res.data.userInfo.alipay_user_info_share_response.avatar
        );
        localStorage.setItem(
          "nickname",
          res.data.userInfo.alipay_user_info_share_response.nick_name
        );
      }
      _this.getRealStatus(res);
    },
    getRealStatus: function(res) {
      const _this = this;
      if (_this.aid == "agent") {
        _this.$router.push({ path: "info" });
        return false;
      }
      if (res.data.realStatus == 1 || res.data.real_status == 1) {
        c.$post2(
          c.javaWt + "client/v3/canReal",
          { cardid: res.data.id },
          function(res) {
            if (res.status == 0) {
              _this.confirm_self();
              localStorage.setItem("real_status", "未认证");
            } else {
              localStorage.setItem("real_status", "认证中");
              $.hideLoading();
              _this.$router.push({ path: "home" });
            }
          }
        );
      } else {
        localStorage.setItem("real_status", "已认证");
        if (+res.data.amount) {
          if (!res.data.password) {
            $.confirm(
              "你查询的卡还没修改余额密码，请先去修改余额密码",
              function() {
                $.hideLoading();
                $.closeModal();
                _this.$router.push({ path: "password" });
              },
              function() {
                $.hideLoading();
                $.closeModal();
                _this.$router.push({ path: "home" });
              }
            );
          } else {
            $.hideLoading();
            _this.$router.push({ path: "home" });
          }
        } else {
          $.hideLoading();
          _this.$router.push({ path: "home" });
        }
      }
    },
    keyup: function(event) {
      this.FuzzySearch = false;
    },
    confirm_self: function() {
      const _this = this;
      // var mustOid = [121, 123, 125, 168, 115];
      var mustAid = [1728];
      var mustZid = [166, 8];
      $.confirm({
        title: "实名认证",
        text: "1",
        onOK: function() {
          $.hideLoading();
          $.closeModal();
          _this.hasToReal();
        },
        onCancel: function() {
          $.closeModal();
          $.hideLoading();
          _this.cancleToReal(mustZid);
        }
      });
      _this.realContent(mustAid, mustZid);
    },
    realContent: function(mustAid, mustZid) {
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
      $(".weui-dialog__btn.default").text("下次再说");
      if (
        c.contains(mustAid, +sessionStorage.getItem("fid")) ||
        sessionStorage.getItem("remarks") == "21" ||
        sessionStorage.getItem("remarks") == "18"
      ) {
        $(".weui-dialog__btn.default").hide();
      }
      if (
        c.contains(mustZid, +sessionStorage.getItem("zid")) &&
        sessionStorage.getItem("type") != 4
      ) {
        $(".weui-dialog__btn.default").text("充值");
      }
    },
    hasToReal: function() {
      const _this = this;
      if (
        sessionStorage.getItem("remarks") == 15 &&
        localStorage.getItem("operator_type") == 2
      ) {
        if (localStorage.getItem(sessionStorage.getItem("cardid")) != "true") {
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
              }
            }
          );
        }
      } else {
        _this.$router.push({ path: "register" });
      }
    },
    cancleToReal: function(mustZid) {
      const _this = this;
      if (
        c.contains(mustZid, +sessionStorage.getItem("zid")) &&
        sessionStorage.getItem("type") != 4
      ) {
        const package_List = [1, 2, 3, 4, 6, 7];
        if (c.contains(package_List, +localStorage.getItem("package_type"))) {
          _this.$router.push({ path: "packagen" });
        } else {
          if (sessionStorage.getItem("type") == 1) {
            _this.$router.push({ path: "packagem" });
          } else {
            _this.$router.push({ path: "packagen" });
          }
        }
      } else {
        _this.$router.push({ path: "home" });
      }
    },
    scanQRCode: function() {
      var _this = this;
      if (navigator.userAgent.indexOf("Alipay") > -1) {
        ap.scan(
          {
            type: "bar"
          },
          function(res) {
            var result = res.code; // 当needResult 为 1 时，扫码返回的结果
            result = result.substring(result.indexOf(",") + 1);
            _this.cardNo = result;
            doSomething();
          }
        );
      } else if (sessionStorage.getItem("MicroMessenger") == "true") {
        wx.scanQRCode({
          needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
          scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
          success: function(res) {
            var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
            result = result.substring(result.indexOf(",") + 1);
            this.cardNo = result;
            doSomething();
          }
        });
      }
    },
    getCard: function(cardNo) {
      this.FuzzySearch = false;
      this.cardNo = cardNo;
    },
    getList: function() {
      this.FuzzySearch = true;
      var inputArea = document.getElementById("card_no");
      setInterval(function() {
        inputArea.scrollIntoView(false);
      }, 200);
    },
    getPostValue: function() {
      var _this = this;
      if (sessionStorage.getItem("Alipay") == "true") {
        this.code = _this.$route.query.auth_code;
        if (localStorage.getItem("code") == this.code) {
          this.url = c.urlPrefix + "?r=wms/personal/card-bind";
          this.data = {
            card: this.cardNo,
            uid: this.id
          };
        } else {
          this.url = c.urlPrefix + "?r=wms/personal/alipay-card-bind";
          this.data = {
            card: this.cardNo,
            uid: this.id,
            code: this.code
          };
        }
      } else {
        this.url = c.javaWt + "client/v3/loginInfo";
        this.data = {
          card: this.cardNo,
          uid: this.id
        };
      }
      localStorage.setItem("code", this.code);
    },
    setCard: function() {
      if (localStorage.getItem("localStorageCard")) {
        const localStorageCard = localStorage
          .getItem("localStorageCard")
          .split(",");
        if (!localStorageCard.find(n => n == this.cardNo)) {
          localStorageCard.unshift(this.cardNo);
        }
        localStorage.setItem("localStorageCard", localStorageCard.join(","));
      } else {
        localStorage.setItem("localStorageCard", this.cardNo);
      }
    },
    alertInfo: function(res) {
      const _this = this;
      if (res.data.remarks == 8 && cardNo != res.data.iccid) {
        $.alert("该卡需要用ICCID充值查询!", "注意", function() {
          _this.cardNo = "";
          $.closeModal();
        });
        $.hideLoading();
        return false;
      }
      if (res.data.remarks == 6) {
        $.alert(
          '<span class="weui-cell__bd" style="color: red">卡片已注销</span>。</br>，请确认是够能够提交换卡，具体问题请联系客服',
          "注意",
          function() {
            $.closeModal();
            _this.$router.push({ path: "changeCard" });
          }
        );
        $.hideLoading();
        return false;
      }
      if (
        res.data.remarks == 7 ||
        res.data.remarks == "换卡" ||
        res.data.remarks == "12"
      ) {
        $.alert(
          '因运营商政策调整，<span class="weui-cell__bd" style="color: red"> 请联系卖家换卡</span>。</br>如果联系不到，请在酷易充留言换卡',
          "注意",
          function() {
            $.closeModal();
            _this.$router.push({ path: "changeCard" });
          }
        );
        $.hideLoading();
        return false;
      }
      if (res.data.remarks == 9) {
        $.alert(
          '该卡因被运营商检测流量使用异常而被强制停机，<span class="weui-cell__bd" style="color: red"> 如有疑问请联系卖家</span>。</br>如果联系不到，请在酷易充留言换卡。',
          "注意",
          function() {
            $.closeModal();
          }
        );
        $.hideLoading();
        return false;
      }
      if (res.data.remarks == 10) {
        $.alert(
          '该卡被运营商检查未订购套餐使用流量而被销户，<span class="weui-cell__bd" style="color: red"> 有需要请重新购买新卡</span>。</br>如有疑问请在酷易充留言。',
          "注意",
          function() {
            $.closeModal();
          }
        );
        $.hideLoading();
        return false;
      }
      if (res.data.remarks == 13) {
        $.alert(
          "该物联网卡存在较大的安全风险，被相关公安机关指令关停，具体情况可以和广西电信反诈座席（18077107110，07715773665）进行沟通联系，如果要复开也是要联系广西电信反诈座席（18077107110，07715773665）",
          "注意",
          function() {
            $.closeModal();
          }
        );
        $.hideLoading();
        return false;
      }
      if (res.data.remarks == 16) {
        $.alert(
          "该卡已被运营商拆机，请勿充值。若已充值的，请找购卡方换卡处理。",
          "注意",
          function() {
            $.closeModal();
          }
        );
        $.hideLoading();
        return false;
      }
      if (res.data.remarks == 17) {
        $.alert(
          "因运营商系统升级，请申请换卡或和代理商换卡，本月流量可以使用至月底！",
          "注意",
          function() {
            $.closeModal();
            _this.$router.push({ path: "changeCard" });
          }
        );
        $.hideLoading();
        return false;
      }
      if (res.data.lifeCycle == 6 || res.data.life_cycle == 6) {
        $.confirm({
          title: "注意",
          text: "该卡为注销卡，不支持查询充值等功能，有问题请联系客服。",
          onOK: function() {
            $.closeModal();
            $.hideLoading();
          },
          onCancel: function() {
            $.closeModal();
            WeixinJSBridge.call("closeWindow");
            $.hideLoading();
          }
        });
        $(".weui-dialog__btn.default").text("联系客服");
        $.hideLoading();
        return false;
      }
      if (res.data.lifeCycle == 5 || res.data.life_cycle == 5) {
        $.confirm({
          title: "注意",
          text:
            "卡片检测为销号卡片，暂不支持查询充值等动能，有问题请联系客服人员；",
          onOK: function() {
            $.closeModal();
            $.hideLoading();
          },
          onCancel: function() {
            $.closeModal();
            WeixinJSBridge.call("closeWindow");
            $.hideLoading();
          }
        });
        $(".weui-dialog__btn.default").text("联系客服");
        $.hideLoading();
        return false;
      }
      if (res.data.cardType == 6 || res.data.card_type == 6) {
        $.confirm({
          title: "注意",
          text: "卡片已注销，请确认是否能够提交换卡，具体问题请联系客服。",
          onOK: function() {
            $.hideLoading();
            $.closeModal();
            _this.$router.push({ path: "changeCard" });
          },
          onCancel: function() {
            $.closeModal();
            WeixinJSBridge.call("closeWindow");
            $.hideLoading();
          }
        });
        $(".weui-dialog__btn.primary").text("换卡申请");
        $(".weui-dialog__btn.default").text("联系客服");
        $.hideLoading();
        return false;
      }
    },
    jumpInfo: function(res) {
      switch (+res.data.zid) {
        case 215:
          window.location.href =
            "http://www.iotm-m.com/m2mAuthorizeAPI?redirectUrl=/m2mWeixinAccountController/toNoLoginCardCz&response_type=code&scope=snsapi_base&state=wx3b8851d848da715e#wechat_redirect";
          return false;
          break;
        case 216:
          window.location.href = "https://wx.china-m2m.com/weixin/new_auth";
          return false;
          break;
        case 219:
          window.location.href =
            "http://qq.xjywuxian.com/kyhl-weixin-1.0/pages/weixin/userCard/userCard.html?cardNo=" +
            res.data.iccid +
            "&from=singlemessage";
          return false;
          break;
        case 217:
          if (res.data.operatorType == 1 || res.data.operator_type == 1) {
            window.location.href =
              "http://hzweixin.m-m10086.com/Html/Terminal/searchsims.aspx?accessname=huaz&mchId=10061540&iccid=" +
              res.data.tel +
              "&num_type=iccid";
          } else if (
            res.data.operatorType == 2 ||
            res.data.operator_type == 2
          ) {
            window.location.href = "http://www.szhuazheng.cn/cardInfo.html";
          } else if (
            res.data.operatorType == 3 ||
            res.data.operator_type == 3
          ) {
            window.location.href =
              "http://open.m-m10010.com/Html/Terminal/searchsims.aspx?mchId=1323974801&num_type=iccid&num=" +
              res.data.iccid +
              "&mobile=" +
              res.data.tel;
          }
          return false;
          break;
        case 218:
          break;
        default:
          break;
      }
    },
    firstCheck: function(res) {
      var _this = this;
      if (res.data.remarks == 20) {
        $.toptip("卡片不存在", 2000, "error");
        $.hideLoading();
        return false;
      }
      if (this.aid != "agent") {
        if (this.aid && this.aid != res.data.fid) {
          $.alert("该卡不属于该公众号。", "注意", function() {
            $.closeModal();
          });
          $.hideLoading();
          return false;
        }
      }
      if (this.aidArr.indexOf(+res.data.fid) !== -1) {
        sessionStorage.setItem("otherAid", false);
        $.alert("该卡不属于该公众号。", "注意", function() {
          $.closeModal();
        });
        $.hideLoading();
        return false;
      }
    },
    doSomething: function() {
      const cardNo = this.cardNo;
      let flag = this.flag;
      const _this = this;
      if (!cardNo) {
        $.toptip("请输入流量卡号", 2000, "error");
        return false;
      } else {
        _this.loading = "查询中...";
        if (flag == 1) {
          $.toptip(_this.loading, 2000, "success");
          return;
        }
        $.showLoading();
        $(".weui-toast_content").text(_this.loading);
        flag = 1;
        _this.getPostValue();
        c.$post2(_this.url, _this.data, function(res) {
          if (res.status == 0 || res.code == 1) {
            document.getElementById("bindCardPage").scrollIntoView(false);
            _this.firstCheck(res);
            if (sessionStorage.getItem("MicroMessenger") == "true") {
              c.$post2(
                c.javaWt + "client/v3/bindCard",
                {
                  openid: sessionStorage.getItem("openid"),
                  uid: localStorage.getItem("id"),
                  cardid: res.data.id,
                  card: res.data.iccid
                },
                function(res) {
                  if (res.status != 0) {
                    $.toptip(res.message, 2000, "error");
                  }
                }
              );
            }
            localStorage.setItem("cardNo", cardNo);
            localStorage.setItem("cardId", res.data.id);
            _this.setCard();
            _this.alertInfo(res)===false?'':
            _this.jumpInfo(res)===false?'':
            _this.load(res)
          } else {
            $.hideLoading();
            flag = 0;
            setTimeout(function() {
              $.toptip(res.message || res.msg, 2000, "error");
            }, 100);
            return false;
          }
          _this.loading = "查询";
        });
      }
    },
    getBindList() {
      const _this = this;
      if (!sessionStorage.getItem("cardArr")) {
        c.$post2(
          c.javaWt + "client/v3/bindList",
          {
            uid: _this.$route.query.id || localStorage.getItem("id"),
            openid: sessionStorage.getItem("openid")
          },
          function(res) {
            if (res.status != 0) {
              $.toptip(res.message, 2000, "error");
              return;
            }
            let i = 0;
            let cardArr = [];
            _this.bindList = res.data;
            for (let elem of res.data.values()) {
              i++;
              if (i < 6) {
                _this.cards.push(elem.card);
                cardArr.push(elem.card);
              }
            }
            sessionStorage.setItem("cardArr", cardArr.join(","));
          }
        );
      } else {
        let i = 0;
        const cardArr = sessionStorage.getItem("cardArr").split(",");
        for (let elem of cardArr) {
          i++;
          if (i < 6) {
            _this.cards.push(elem);
          }
        }
      }
    },
    getLogo: function() {
      if (this.id) {
        localStorage.setItem("id", this.id);
      }
      if (this.aid) {
        localStorage.setItem("aid", this.aid);
        if (this.aid == 125) {
          this.islyz = true;
          this.moreClass = "lyz";
          this.baseClass = "";
        }
        this.type_logo = "A";
      } else {
        localStorage.setItem("aid", null);
        if (this.id == 51) {
          this.type_logo = "C";
        } else if (this.id == 52) {
          this.type_logo = "D";
        } else if (this.id != 50) {
          this.type_logo = this.id;
          try {
            this.imgUrl = require(`../img/${this.$route.query.id}logo.png`);
          } catch (err) {
            this.type_logo = "B";
          }
        } else {
          this.type_logo = "B";
        }
      }
    },
    getConfig: function() {
      const _this = this;
      //配置jssdk
      c.$post2(
        c.javaWt + "client/v3/apicfg",
        {
          uid: _this.$route.query.id || localStorage.getItem("id"),
          url: document.location.href.split("#")[0]
        },
        function(data) {
          if (data.status == 0) {
            wx.config({
              appId: data.data.appId, // 必填，公众号的唯一标识
              timestamp: data.data.timestamp, // 必填，生成签名的时间戳
              nonceStr: data.data.nonceStr, // 必填，生成签名的随机串
              signature: data.data.sign, // 必填，签名，见附录1
              jsApiList: ["chooseImage", "scanQRCode", "uploadImage"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
          }
        }
      );
      if (!sessionStorage.getItem("openid")) {
        c.$post2(
          c.javaWt + "client/v3/openid",
          {
            uid: _this.$route.query.id || localStorage.getItem("id"),
            code: c.getUrlParam("code")
          },
          function(res) {
            if (res.status == 0) {
              sessionStorage.setItem("openid", res.data);
              _this.getBindList();
            }
          }
        );
      } else {
        _this.getBindList();
      }
    },
    getLocalCard: function() {
      const _this = this;
      if (localStorage.getItem("localStorageCard")) {
        let i = 0;
        const localStorageCard = localStorage
          .getItem("localStorageCard")
          .split(",");
        for (let elem of localStorageCard) {
          i++;
          if (i < 6) {
            _this.cards.push(elem);
          }
        }
      }
    }
  },
  beforeCreate: function() {
    const _this = this;
    if (navigator.userAgent.indexOf("Alipay") > -1) {
      sessionStorage.setItem("Alipay", "true");
      if (window.location.hash.indexOf("code") == -1) {
        // 转授权链接
        c.$post(
          "?r=home/setting/change-alipay-url",
          {
            url: document.location.href
          },
          function(res) {
            if (res.code == 0) {
              $.toptip(res.message, 2000, "error");
              return;
            }
            window.location.href = res.data.url;
          }
        );
      }
    } else if (navigator.userAgent.indexOf("MicroMessenger") > -1) {
      sessionStorage.setItem("MicroMessenger", "true");
      if (window.location.search.indexOf("code") == -1) {
        // 转授权链接
        c.$post2(
          c.javaWt + "client/v3/wxCodeUrl",
          {
            url: document.location.href,
            uid: _this.$route.query.id || localStorage.getItem("id"),
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
  created: function() {
    this.getLogo();
    if (
      window.location.search.indexOf("code") != -1 &&
      navigator.userAgent.indexOf("MicroMessenger") > -1
    ) {
      this.getConfig();
    } else {
      this.getLocalCard();
    }
  }
};
</script>
<style scoped>
.weui-icon-cancel {
  float: right;
  padding-right: 11px;
  padding-top: 3px;
}
::-webkit-input-placeholder {
  color: #fff;
}

:-moz-placeholder {
  color: #fff;
}

::-moz-placeholder {
  color: #fff;
}

:-ms-input-placeholder {
  color: #fff;
}

#bindCardPage {
  overflow: hidden;
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 1000;
}

#bindCardPage.kuyu {
  background: transparent url("../img/bg2.png");
  background-position: center;
  position: relative;
  height: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
}

.lyz#bindCardPage {
  background: #fe7a00;
}
.zsh#bindCardPage {
  background: #fcf9e3;
}

#bindCardPage .logo {
  padding: 17% 0 19%;
  text-align: center;
}

#bindCardPage .logo img {
  width: 22%;
}

#bindCardPage .logo .otherImg {
  padding-top: 35% !important;
  width: 63%;
}

.bindCardMain {
  width: 96%;
  margin: 0 auto;
}

.cardNoArea {
  padding-bottom: 8px;
  border-bottom: 1px solid #d4d4d4;
}

.cardNoArea label {
  float: left;
  color: #fff;
  line-height: 25px;
}

#cardNo::-webkit-input-placeholder {
  color: #fff;
}

/* 使用webkit内核的浏览器 */
#cardNo:-moz-placeholder {
  color: #fff;
}

/* Firefox版本4-18 */
#cardNo::-moz-placeholder {
  color: #fff;
}

/* Firefox版本19+ */
#cardNo:-ms-input-placeholder {
  color: #fff;
}

/* IE浏览器 */
.cardNoArea span {
  float: right;
}

#scanQRCode {
  width: 20px;
  height: 20px;
  font-size: 20px;
  color: #fff;
}

.FuzzySearch {
  width: 100%;
}

.FuzzySearch .list {
  box-shadow: 1px 2px 10px rgba(0, 0, 0, 0.2);
  margin: 0 2%;
}

.FuzzySearch .list li {
  padding: 5px 0;
  margin-left: 13%;
  font-size: 14px;
  line-height: 30px;
  color: #ffffff;
}

.cardNoArea div {
  margin: 0 40px 0 60px;
}

#card_no {
  font-size: 14px;
  color: #fff;
  width: 100%;
  height: 25px;
  line-height: 25px;
}

#bindCard {
  display: block;
  width: 100%;
  height: 40px;
  color: #fff;
  font-size: 14px !important;
  margin: 30px auto 0;
  text-align: center;
  border-radius: 4px;
  background: -webkit-linear-gradient(left, #32a3ef, #43d4ff);
}

#bindCard.lyz {
  background: -webkit-linear-gradient(left, #f9be87, #ef9440);
}

.tips {
  font-size: 10px;
  margin-top: 16px;
  text-align: center;
  color: #fff;
}
</style>

