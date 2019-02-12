<template>
  <div class="main viewPayMain">
    <h3
      class="title"
      v-if='id!=114'
    >{{title}}
    </h3>
    <div
      class="info"
      v-if='id!=114'
    >{{info}}
    </div>
    <img
      class="img"
      v-if='id!=114'
      v-bind:src="img"
    />
    <div
      class="body"
      v-html='body'
    >
    </div>
    <a
      v-if=" type== 'pay'"
      href="javascript:"
      class="weui-btn pay"
      @click="pay"
    >{{text}}</a>
  </div>
</template>

<script>
import c from "../index";

export default {
  data() {
    return {
      title: "",
      info: "",
      img: "",
      body: "",
      text:
        this.$route.query.id == 114
          ? "提交申请,免费申领"
          : this.$route.query.id == 79
          ? "支付10元"
          : "提交申请，开始支付",
      type: this.$route.query.type,
      id: this.$route.query.id
    };
  },
  methods: {
    onBridgeReady: function(data) {
      const _this = this;
      WeixinJSBridge.invoke("getBrandWCPayRequest", data, function(res) {
        if (res.err_msg == "get_brand_wcpay_request:ok") {
          c.$post2(
            "http://120.77.253.165:20010/cardTv/findInfoByOrder",
            {
              uid: localStorage.getItem("id"),
              orderid: data.orderid,
              obtainId: data.obtainId
            },
            function(res) {
              if (res.status == 1) {
                $.toptip(res.message, 2000, "error");
              } else {
                $.alert("支付成功，查看卡密！", "注意", function() {
                  $.closeModal();
                  _this.$router.push({ path: "home" });
                });
                $(".weui-dialog__bd")
                  .html(
                    `帐号：${
                      res.data.number
                    }<br>密码：${
                      res.data.password
                    }<br>以后可在我的订单里查看！<br></div>`
                  )
                  .css("padding", "0.8em");
              }
            },
            10000
          );
        }
      });
    },
    pay: function() {
      const _this = this;
      var url;
      switch (+this.id) {
        case 80:
          url =
            "http://wx.szcoolfish.com/coolfish/tpl/main/extend/shop4GWIFI.html?id=50";
          break;
        case 83:
          url =
            "http://wx.szcoolfish.com/coolfish/tpl/main/extend/shop.html?id=50";
          break;
        case 114:
          url =
            "https://m-eve.jd.com/tyk/activityInfo?channel=logisticscarry021&busiType=3";
          break;
        default:
          url = "";
          break;
      }
      if (this.id == 114) {
        c.$post2(
          "http://wx.szcoolfish.com/seckill/seckill/add/obtain",
          {
            seckillId: 20,
            uid: localStorage.getItem("id"),
            openid: sessionStorage.getItem("openid"),
            nickname: localStorage.getItem("nickname")
          },
          function(res) {
            if (res.status == 0) {
              window.open(url, "_self");
            } else {
              $.toptip(res.message, 2000, "error");
            }
          }
        );
      } else if (this.id == 79) {
        $.showLoading();
        var data = {
          uid: localStorage.getItem("id"),
          seckillId: 28,
          openid: sessionStorage.getItem("openid"),
          money: 0.01,
          pname: "影视卡"
        };
        c.$post2(
          "http://120.77.253.165:20010/obtain/seckillOrder/add",
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
        window.location.href = url;
      }
    }
  },
  beforeCreate: function() {
    const _this = this;
    if (this.$route.query.id != 114) {
      c.$post2(
        c.javaWt + "client/v3/autoReply",
        {
          id: this.$route.query.id
        },
        function(data) {
          if (data.status == 0) {
            _this.title = data.data.title;
            _this.info = data.data.info;
            _this.img = data.data.img;
            _this.body = data.data.content;
          } else {
            $.toptip(data.message, 2000, "error");
          }
        }
      );
    } else {
      if (c.getUrlParam("code")) {
        window.location.href =
          "http://wx.szcoolfish.com/coolfish/tpl/main/dist/index.html#/view?id=114&type=pay";
      } else {
        c.$post2(
          c.javaWt + "client/v3/autoReply",
          {
            id: this.$route.query.id
          },
          function(data) {
            if (data.status == 0) {
              _this.title = data.data.title;
              _this.info = data.data.info;
              _this.img = data.data.img;
              _this.body = data.data.content;
            } else {
              $.toptip(data.message, 2000, "error");
            }
          }
        );
      }
    }
  }
};
</script>
<style scoped>
.pay {
  background: #2398ff;
  position: fixed;
  bottom: 0;
  width: 100%;
}
.viewPayMain {
  width: 100%;
  margin-bottom: 46px;
}

.title {
  text-align: center;
}

.body >>> img,
img {
  margin: 0.2rem;
  box-sizing: border-box;
  max-width: calc(100% - 0.4rem) !important;
}

.body {
  padding: 0 2%;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
}
</style>
