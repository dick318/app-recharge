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
        <div class="weui-cells detail ">
          <div class="weui-cell ">
            <div class="weui-cell__bd info ">
              <p class="text-center ">卡号:
                <span class="amount">{{cardNo}}</span>
              </p>
            </div>
            <div class="weui-cell__bd info">
              <p class="text-center ">状态:
                <span class="sum">{{status}}</span>
              </p>
            </div>
          </div>
        </div>
        <div class="GoTop">
          <div type="button" id="goUnbind" @click="unbindCard" v-if="operator_type==2&&this.$route.query.type==2">机卡解绑</div>
          <div type="button" id="goReset" @click="recoverNet" v-if="this.$route.query.type!=2">恢复上网</div>
        </div>
        <div class="weui-cells detail ">
          <div class="weui-cell ">
            <div class="weui-cell__bd">
              <p class="text-center info">类型</p>
            </div>
            <div class="weui-cell__bd">
              <p class="text-center info">时间</p>
            </div>
            <div class="weui-cell__bd ">
              <p class="text-center ">结果</p>
            </div>
          </div>
        </div>
        <div class="weui-cells margin_top" id="rows">
          <div class="weui-cell" v-for="(row, index) in unbind" :key="index">
            <div class="weui-cell__bd ">
              <p class="text-center ">机卡解绑</p>
            </div>
            <div class="weui-cell__bd">
              <p class="text-center ">{{row.addtime| formatDate}}</p>
            </div>
            <div class="weui-cell__bd ">
              <p class="text-center remarks">{{row.status | formatStatus}}</p>
            </div>
          </div>
          <div class="weui-cell" v-for="(row, index) in recover"  :key="index">
            <div class="weui-cell__bd ">
              <p class="text-center ">{{row.type| formatType}}</p>
            </div>
            <div class="weui-cell__bd">
              <p class="text-center ">{{row.addtime| formatDate}}</p>
            </div>
            <div class="weui-cell__bd ">
              <p class="text-center remarks" @click="showMore(row)">
                {{row|formatResult}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="content " :class="{ hidden: recover_total != 0|| unbind_total !=0}">
        <div class="weui-panel__bd">
          <div class="weui-media-box weui-media-box_appmsg">
            <div class="weui-media-box__bd">
              <h4 class="weui-media-box__title text-center wx-title">暂无记录</h4>
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
<style scoped>
#goUnbind,
#goReset {
  flex: 1;
}

.GoTop {
  display: flex;
}

#goReset {
  border-left: 1px solid #fff;
}

#goUnbind,
#goReset {
  height: 50px;
  font-size: 15px;
  width: 100%;
  color: #fff;
  text-align: center;
  line-height: 50px;
  background-color: rgb(51, 166, 240);
}

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
  width: 33% !important;
  word-wrap: break-word;
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

<script>
import c from "../index";
import "../js/iconfont";
import PullTo from "vue-pull-to";

export default {
  data() {
    return {
      unbind: {},
      recover: {},
      row: {},
      recover_total: 0,
      unbind_total: 0,
      cardNo: localStorage.getItem("cardNo"),
      operator_type: localStorage.getItem("operator_type"),
      type: 1,
      status: "",
      iconLink: "",
      recover_page: 1,
      unbind_page: 1,
      recover_flag: 0,
      unbind_flag: 0,
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
    formatStatus(status) {
      if (status == 1 || status == 2) {
        return "已提交";
      }
      if (status == 3) {
        return "已处理";
      }
    },
    formatType(type) {
      var str;
      if (type == 1) {
        str = "停机";
      }
      if (type == 2) {
        str = "恢复上网";
      }
      if (type == 3) {
        str = "单独断网";
      }
      if (type == 4) {
        str = "单独复网";
      }
      if (type == 5) {
        str = "GPRS关机";
      }
      if (type == 6) {
        str = "GPRS开机";
      }
      return str;
    },
    formatResult(str) {
      if (str.remarks) {
        if (str.remarks.split(" ").length == 2) {
          return str.remarks.split(" ")[1];
        } else {
          return str.remarks;
        }
      } else {
        str = str.result;
        var str_length = 0;
        var str_len = 0;
        var str_cut = new String();
        str = str
          .replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi, "")
          .replace(/<[^>]+?>/g, "")
          .replace(/\s+/g, " ")
          .replace(/ /g, " ")
          .replace(/>/g, " ");
        str = str ? str : [];
        str_len = str.length;
        for (var i = 0; i < str_len; i++) {
          var a = str.charAt(i);
          str_length++;
          if (escape(a).length > 4) {
            //中文字符的长度经编码之后大于4
            str_length++;
          }
          str_cut = str_cut.concat(a);
          if (str_length >= 12) {
            str_cut = str_cut.concat("...");
            return str_cut;
          }
        }
        //如果给定字符串小于指定长度，则返回源字符串；
        if (str_length < 12) {
          return str;
        }
      }
    }
  },
  components: {
    PullTo
  },
  methods: {
    showMore(result) {
      if (result.remarks) {
        if (result.remarks.split(" ").length == 2) {
          $.toast(
            result.remarks
              .split(" ")[1]
              .replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi, "")
              .replace(/<[^>]+?>/g, "")
              .replace(/\s+/g, " ")
              .replace(/ /g, " ")
              .replace(/>/g, " "),
            "text"
          );
        } else {
          $.toast(
            result.remarks
              .replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi, "")
              .replace(/<[^>]+?>/g, "")
              .replace(/\s+/g, " ")
              .replace(/ /g, " ")
              .replace(/>/g, " "),
            "text"
          );
        }
      } else {
        $.toast(
          result.result
            .replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi, "")
            .replace(/<[^>]+?>/g, "")
            .replace(/\s+/g, " ")
            .replace(/ /g, " ")
            .replace(/>/g, " "),
          "text"
        );
      }
    },
    recoverNet() {
      const _this = this;
      var m = new Date().getMonth() + 1;
      var y = new Date().getFullYear();
      var endTime = `${y}-${m < 10 ? "0" + m : m}-${25} 00:00:00`;
      var nowData = "";
      var endTime2;
      c.$get2("https://quan.suning.com/getSysTime.do", function(res) {
        nowData = JSON.parse(res).sysTime2;
        m = new Date(nowData).getDate() > 26 ? m + 1 : m;
        m = m < 10 ? "0" + m : m;
        endTime2 = `${y}-${m}-${28} 00:00:00`;
      });
      if (
        (Date.parse(new Date(nowData)) > Date.parse(endTime) &&
          sessionStorage.getItem("type") != 2 &&
          _this.operator_type != 3) ||
        (Date.parse(new Date(nowData)) > Date.parse(endTime2) &&
          sessionStorage.getItem("type") != 2 &&
          _this.operator_type == 3)
      ) {
        $.confirm(
          "25号以后恢复上网需订购次月套餐，</br>订购后最迟一小时后恢复上网，若是还不能使用请联系客服。",
          "注意",
          function() {
            $.showLoading();
            const package_List = [1, 2, 3, 4,6,7];
            if (sessionStorage.getItem("changeCard") == "true") {
              _this.$router.push({ path: "packagem" });
              return;
            }
            if (
              c.contains(package_List, +localStorage.getItem("package_type"))
            ) {
              _this.$router.push({ path: "packagen" });
            } else {
              if (sessionStorage.getItem("type") == 1) {
                _this.$router.push({ path: "packagem" });
              } else {
                _this.$router.push({ path: "packagen" });
              }
            }
          }
        );
      } else {
        $.confirm(
          "确定恢复上网？</br>提交申请后最迟三个小时恢复上网。",
          "注意",
          function() {
            $.showLoading();
            c.$post2(
              c.javaWt + "client/v3/smartOpen",
              { cardId: _this.cardId },
              function(res) {
                $.hideLoading();
                if (res.status != 0) {
                  $.toptip(res.message, 2000, "error");
                  return;
                }
                _this.getCardSimstate();
                _this.getCardInfo();
                $.toptip(res.message, 2000, "success");
              }
            );
          }
        );
      }
    },
    unbindCard() {
      const _this = this;
      $.confirm(
        "一个月内只允许解绑两次，请谨慎操作！</br>系统会在30分钟内重置机卡绑定信息,</br><span style='color: red'>申请解绑30分钟后请重启一下设备。</span>",
        "注意",
        function() {
          $.showLoading();
          c.$post2(
            c.javaWt + "client/v3/reRecord",
            { cardId: _this.cardId },
            function(res) {
              $.hideLoading();
              if (res.status != 0) {
                $.toptip(res.message, 2000, "error");
                return;
              }
              _this.getCtccuUntie();
              $.toptip(res.message, 2000, "success");
            }
          );
        }
      );
    },
    getCardInfo() {
      let _this = this;
      c.$post2(
        c.javaWt + "client/v3/status",
        { cardId: _this.cardId },
        function(res) {
          if (res.status != 0) {
            $.toptip(res.message, 2000, "error");
            return;
          }
          if (res.data.single == 0 && res.data.single) {
            _this.status = "断网";
          } else {
            if (
              res.data.cardStatus == "正常" ||
              res.data.cardStatus == "在用"
            ) {
              _this.status = res.data.cardStatus;
            } else {
              _this.status = res.data.cardStatus;
            }
          }
        },
        function() {
          $.toptip("操作失败", "error");
        }
      );
    },
    getCardSimstate(loaded, more) {
      let _this = this;
      if (_this.$route.query.type != 2) {
        c.$post2(
          c.javaWt + "client/v3/statusList",
          {
            uid: _this.uid,
            cardId: _this.cardId,
            pageNo: _this.recover_page,
            pageSize: 10
          },
          function(res) {
            if (loaded) {
              loaded("done");
            }
            if (res.status != 0) {
              _this.recover_total = 0;
              $.toptip(res.message, 2000, "error");
              return;
            } else {
              _this.recover_total = res.data.total;
              if (+res.data.total <= 10 * _this.recover_page) {
                _this.recover_flag = 1;
              }
              if (more) {
                const rows = Object.values(_this.recover).concat(res.data.rows);
                _this.recover = Object.assign({}, rows);
              } else {
                $.hideLoading();

                _this.recover = Object.assign({}, res.data.rows);
              }
            }
          }
        );
      }
    },
    getCtccuUntie(loaded, more) {
      let _this = this;
      if (_this.operator_type == 2 && _this.$route.query.type == 2) {
        c.$post2(
          c.javaWt + "client/v3/untieList",
          {
            uid: _this.uid,
            cardid: _this.cardId,
            pageNo: _this.unbind_page,
            pageSize: 10
          },
          function(res) {
            if (loaded) {
              loaded("done");
            }
            if (res.status != 0) {
              _this.unbind_total = 0;
              $.toptip(res.message, 2000, "error");
              return;
            } else {
              _this.unbind_total = res.data.total;
              if (+res.data.total <= 10 * _this.unbind_page) {
                _this.unbind_flag = 1;
              }
              if (more) {
                const rows = Object.values(_this.unbind).concat(res.data.rows);
                _this.unbind = Object.assign({}, rows);
              } else {
                $.hideLoading();
                _this.unbind = Object.assign({}, res.data.rows);
              }
            }
          }
        );
      }
    },
    refresh(loaded) {
      this.recover_page = 1;
      this.unbind_page = 1;
      this.recover_flag = 0;
      this.unbind_flag = 0;
      this.getCtccuUntie(loaded);
      this.getCardSimstate(loaded);
      this.getCardInfo(loaded);
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
    loadmore(loaded) {
      if (this.$route.query.type == 2 && this.unbind_flag == 1) {
        loaded("done");
        return;
      } else {
        this.unbind_page += 1;
        this.getCtccuUntie(loaded, 1);
      }
      if (!this.$route.query.type && this.recover_flag == 1) {
        loaded("done");
        return;
      } else {
        this.recover_page += 1;
        this.getCardSimstate(loaded, 1);
      }
    }
  },
  created: function() {
    $.showLoading();
    const _this = this;
    _this.getCardInfo();
    if (_this.$route.query.type != 2) {
      this.getCardSimstate();
    }
    if (
      localStorage.getItem("operator_type") == 2 &&
      _this.$route.query.type == 2
    ) {
      this.getCtccuUntie();
    }
  }
};
</script>
