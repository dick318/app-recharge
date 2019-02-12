<template>
<pull-to :top-load-method="refresh" @top-state-change="stateChange" @bottom-state-change="stateChange">
    <template slot="top-block" slot-scope="props">
      <div class="top-load-wrapper" :class="{'hidden':loadDone}">
        <svg class="icon" :class="{
                'icon-arrow': props.state === 'trigger',
                'icon-loading': props.state === 'loading'
             }" aria-hidden="true">
          <use :xlink:href="iconLink"></use>
        </svg>
        {{ props.stateText }}
      </div>
    </template>
  <div class="weui-msg">
    <div class="weui-msg__icon-area">
      <img src="../img/card.png" alt>
    </div>
    <div class="weui-msg__text-area">
      <h1 class="weui-msg__title">我的换卡</h1>
    </div>
    <div class="content" v-if='!form.oldcard'>
        <div class="weui-panel__bd">
          <div class="weui-media-box weui-media-box_appmsg">
            <div class="weui-media-box__bd">
              <h4 class="weui-media-box__title text-center wx-title">暂无换卡详情</h4>
            </div>
          </div>
        </div>
      </div>
    <div class="weui-form-preview__hd " v-if="form.orderID">
      <label class="weui-form-preview__label">订单号</label>
      <span class="weui-form-preview__value">{{form.orderID}}</span>
    </div>
    <div class="weui-form-preview__hd " v-if="form.oldcard">
      <label class="weui-form-preview__label">老卡号</label>
      <span class="weui-form-preview__value">{{form.oldcard}}</span>
    </div> 
     <div class="weui-form-preview__hd " v-if="form.newcard">
      <label class="weui-form-preview__label">新卡号</label>
      <span class="weui-form-preview__value">{{form.newcard}}</span>
    </div>
    <div class="weui-form-preview__hd " v-if="form.uname">
      <label class="weui-form-preview__label">收件人</label>
      <span class="weui-form-preview__value">{{form.uname}}</span>
    </div>
    <div class="weui-form-preview__hd" v-if="form.address">
      <label class="weui-form-preview__label">收货地址</label>
      <span class="weui-form-preview__value">
        {{form.address}}
      </span>
    </div>
    <div class="weui-form-preview__hd" v-if="form.addtime">
      <label class="weui-form-preview__label">创建时间</label>
      <span class="weui-form-preview__value">{{form.addtime}}</span>
    </div>
    <div class="weui-form-preview__hd" v-if="form.isTure">
      <label class="weui-form-preview__label">状态</label>
      <span class="weui-form-preview__value">{{form.isTure|formatIsTure}}</span>
    </div>
    <div class="weui-form-preview__hd " v-if="form.reason">
      <label class="weui-form-preview__label">失败原因</label>
      <span class="weui-form-preview__value">{{form.reason}}</span>
    </div>
    <div class="weui-form-preview__hd " v-if="form.tracking">
      <label class="weui-form-preview__label">快递单号</label>
      <span class="weui-form-preview__value Cnumber">{{form.tracking}}</span>
    </div>
    <div class="weui-msg__opr-area" @click="jump" v-if="form.tracking">
      <p class="weui-btn-area">
        <a href="javascript:;" class="weui-btn weui-btn_primary">查询物流</a>
      </p>
    </div>
  </div>
    <template slot="bottom-block" slot-scope="props">
      <div class="bottom-load-wrapper" :class="{'hidden':loadDone==true}">
        <svg class="icon" :class="{
                'icon-arrow': props.state === 'trigger',
                'icon-loading': props.state === 'loading'
             }" aria-hidden="true">
          <use :xlink:href="iconLink"></use>
        </svg>
        {{ props.stateText }}
      </div>
    </template>
  </pull-to>
</template>
<script>
import c from "../index";
import "../js/iconfont";
import PullTo from "vue-pull-to";
export default {
  data() {
    return {
      id:this.$route.query.id,
      uid:localStorage.getItem("id")||50,
      iconLink: "",
      loadDone: "",
      loading: false,
      form: {
        orderID: '',
        oldcard: "",
        newcard: "",
        uname: "",
        address: "",
        addtime: "",
        operate: "",
        reason: "",
        Cname: "",
        tracking: ""
      }
    };
  },
  filters: {
    formatIsTure(isTure) {
      if (isTure == 1) {
        return "待处理";
      }
      if (isTure == 2) {
        return "已处理";
      }
      if (isTure == 3) {
        return "未通过";
      }
    }
  },
  components: {
    PullTo
  },
  created() {
    this.getList()
  },
  methods: {
    refresh(loaded) {
      this.getList(loaded);
    },
    stateChange(state) {
      this.loadDone = false;
      if (state === "pull" || state === "trigger") {
        this.iconLink = "#icon-arrow-bottom";
      } else if (state === "loading") {
        this.iconLink = "#icon-loading";
      } else if (state === "loaded-done") {
        this.iconLink = "#icon-finish";
        setTimeout(function() {
          this.loadDone = true;
        }, 300);
      }
    },
     getList(loaded, more) {
      const _this = this;
      c.$post2(
        "http://wx.szcoolfish.com/client/card/client/v3/listCardReplace",
        {
          uid: _this.uid,
          id:_this.id,
          openid:sessionStorage.getItem('openid')
        },
        function(res) {
          if (loaded) {
            loaded("done");
          }
          if (res.status == 0) {
             _this.form = Object.assign({}, res.data.rows[0]);
          } else {
            $.toptip(res.message, 2000, "error");
          }
        }
      );
    },
    jump() {
       var num= this.form.tracking.replace(/[^0-9]/ig,"")
      location.href =
        "https://m.kuaidi100.com/index_all.html?type=yuantong&postid=" +num;
    }
  }
};
</script>
<style scoped>
.weui-msg {
    padding-top: 36px;
    text-align: center;
}
.weui-msg__icon-area {
    margin-bottom: 0!important;
}
.weui-msg__icon-area img {
    width: 94px!important;
}
.weui-msg__text-area {
    margin-bottom: 25px;
    padding: 0 20px;
}
.weui-msg__title {
    margin-bottom: 5px;
    font-weight: 400;
    font-size: 20px;
}
.weui-form-preview__hd {
    padding-top: 0!important;
    padding-bottom: 0!important;
    line-height: 34px;
    position: relative;
    padding: 10px 15px;
    text-align: right;
    line-height: 2.5em;
}
.weui-form-preview__label {
    float: left;
    margin-right: 1em;
    min-width: 4em;
    color: #999;
    text-align: justify;
    text-align-last: justify;
}
.weui-form-preview__hd .weui-form-preview__value {
    font-style: normal;
    font-size: 16px!important;
    display: block;
    overflow: hidden;
    word-break: normal;
    word-wrap: break-word;
}
.weui-msg__opr-area {
    margin-bottom: 25px;
}
.weui-btn-area {
    margin: 1.17647059em 15px .3em;
}
.weui-btn_primary {
    background-color: #1aad19;
}
.weui-btn {
    position: relative;
    display: block;
    margin-left: auto;
    margin-right: auto;
    padding-left: 14px;
    padding-right: 14px;
    box-sizing: border-box;
    font-size: 18px;
    text-align: center;
    text-decoration: none;
    color: #fff;
    line-height: 2.55555556;
    border-radius: 5px;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    overflow: hidden;
}
.wx-title {
  text-align: center;
  font-size: 24px;
  color: #3cc51f;
  font-weight: 400;
  margin: 0 15%;
}
.top-load-wrapper {
  line-height: 50px;
  text-align: center;
}

.icon-arrow {
  transition: 0.2s;
  transform: rotate(180deg);
}

.icon-loading {
  transform: rotate(0deg);
  animation-name: loading;
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

@keyframes loading {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
