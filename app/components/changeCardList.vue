<template>
<pull-to :top-load-method="refresh" @top-state-change="stateChange" :bottom-load-method="loadmore" @bottom-state-change="stateChange">
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
    <div class="record">
      <!--列表开始-->
      <div id="template">
        <div class="weui-cells detail">
          <div class="weui-cell">
            <div class="weui-cell__bd">
              <p class="text-center info">原卡号</p>
            </div>
            <div class="weui-cell__bd">
              <p class="text-center info">时间</p>
            </div>
            <div class="weui-cell__bd">
              <p class="text-center">状态</p>
            </div>
          </div>
        </div>
        <div class="weui-cells margin_top" id="rows">
          <div class="weui-cell" v-for="(row, index) in rows" :key="index" @click="jump(row.id)">
            <div class="weui-cell__bd">
              <p class="text-center">
                <span class="money">{{row.oldcard}}</span>
              </p>
            </div>
            <div class="weui-cell__bd">
              <p class="text-center addtime">{{row.addtime| formatDate}}</p>
            </div>
            <div class="weui-cell__bd">
              <p class="text-center remarks">{{row.isTure| formatIsTure}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="content" :class="{ hidden: total > 0 }">
        <div class="weui-panel__bd">
          <div class="weui-media-box weui-media-box_appmsg">
            <div class="weui-media-box__bd">
              <h4 class="weui-media-box__title text-center wx-title">暂无换卡记录</h4>
            </div>
          </div>
        </div>
      </div>
      <!--列表结束-->
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
      rows: {},
      total: 1,
      iconLink: "",
      page: 1,
      flag: 0,
      loadDone: "",
      loading: false,
      cardId: localStorage.getItem("cardId"),
      uid: localStorage.getItem("id")
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
    },
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
  methods: {
    refresh(loaded) {
      this.page = 1;
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
          openid:sessionStorage.getItem('openid'),
          pageNo: _this.page,
          pageSize: 10
        },
        function(res) {
          if (loaded) {
            loaded("done");
          }
          if (res.status == 0) {
            _this.total = res.data.total;
            if (more) {
              if (res.data.total <= 10 * _this.page) {
                _this.flag = 1;
              }
              const rows = Object.values(_this.rows).concat(res.data.rows);
              _this.rows = Object.assign({}, rows);
            } else {
              _this.rows = Object.assign({}, res.data.rows);
            }
          } else {
            _this.total = 0;
            $.toptip(res.message, 2000, "error");
          }
        }
      );
    },
    loadmore(loaded) {
      const _this = this;
      let page = (_this.page += 1);
      if (_this.flag == 1) {
        loaded("done");
        return;
      }
      this.getList(loaded, "1");
    },
    jump(id) {
        this.$router.push(`/cardOrder?id=${id}`)
    }
  },
  created: function() {
    this.getList();
  }
};
</script>
<style scoped>
.detail {
  margin-top: 1.17647059em !important;
}

.vue-pull-to-wrapper {
  color: #4d4d4d;
  font-size: 14px;
  font-family: "Hiragino Sans GB", STHeiTi, "微软雅黑", Helvetica, sans-serif;
  background: #f0f1f3 !important;
}

.weui-cells {
  background-color: #fff;
  line-height: 1.47058824;
  font-size: 17px;
  overflow: hidden;
  position: relative;
}

.wx-title {
  text-align: center;
  font-size: 24px;
  color: #3cc51f;
  font-weight: 400;
  margin: 0 15%;
}

.record,
#template {
  font-size: 14px !important;
}

body {
  background: #f0f1f3;
}

.weui-cell__bd {
  word-wrap: break-word;
}
.weui-cell__bd:nth-child(1) {
  -webkit-box-flex: 2!important;
  -webkit-flex: 2!important;
  flex: 2!important;
}

.text-center {
  font-size: 14px !important;
  white-space: nowrap;
  text-align: center;
}

.info p span {
  margin: 0 5px 0 5px;
  color: #2471b4;
}

.margin_top {
  margin-top: 0;
}

#rows.weui-cells:before {
  border: none !important;
}

.remarks {
  white-space: normal !important;
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

.bottom-load-wrapper {
  line-height: 50px;
  text-align: center;
}
</style>
