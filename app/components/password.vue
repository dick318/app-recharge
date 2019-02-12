<template>
  <div class="TotalContentBox">
    <!--搜索开始-->
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell header_psw">
        <div class="weui-cell__hd">
          <label class="weui-label">初始密码为：</label>
        </div>
        <div class="weui-cell__bd weui-cell_primary">
          <input class="weui-input" value="888888" readonly>
        </div>
        <div class="weui-cell__ft">
          <i class="weui_icon_warn"></i>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label passLabel">旧密码：</label>
        </div>
        <div class="weui-cell__bd weui-cell_primary">
          <input class="weui-input" id="oldpsw" placeholder="请输入旧密码" v-model.trim="oldpsw">
        </div>
        <div class="weui-cell__ft">
          <i class="weui_icon_warn"></i>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label passLabel">新密码：</label>
        </div>
        <div class="weui-cell__bd weui-cell_primary">
          <input class="weui-input" id="newpsw1" placeholder="请输入新密码" type="password" v-model.trim="newpsw1">
        </div>
        <div class="weui-cell__ft">
          <i class="weui_icon_warn"></i>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label passLabel">确认新密码：</label>
        </div>
        <div class="weui-cell__bd weui-cell_primary">
          <input class="weui-input" id="newpsw2" placeholder="请重复输入新密码" type="password" v-model.trim="newpsw2">
        </div>
        <div class="weui-cell__ft">
          <i class="weui_icon_warn"></i>
        </div>
      </div>
    </div>
    <div class="weui-btn-area">
      <div class="weui-btn change" type="submit" @click="change">修改</div>
      <div class="weui-btn change" type="submit" @click="find">找回密码</div>
    </div>
    <!--搜索结束-->
  </div>
</template>

<script>
import c from "../index";
export default {
  data() {
    return {
      oldpsw: "",
      newpsw1: "",
      newpsw2: "",
      cardId:localStorage.getItem('cardId')
    };
  },
  methods: {
    find: function() {
      this.$router.push({ path: "find" });
    },
    change: function() {
      const _this = this;
      if (!_this.oldpsw) {
        $.toptip("请输入的旧密码", 2000, "error");
        return;
      }
      if (!_this.newpsw1 || !_this.newpsw2) {
        $.toptip("请输入新密码", 2000, "error");
        return;
      }
      if (_this.newpsw1 == _this.newpsw2) {
        $.showLoading();
        c.$post2(
          c.javaWt + "client/v3/changePwd",
          {
            cardId:_this.cardId,
            newPassword: _this.newpsw2,
            oldPassword: _this.oldpsw
          },
          function(res) {
            if (res.status == 0) {
              $.alert(res.message, function() {
                $.closeModal();
                _this.$router.push({ path: "home" });
              });
            } else {
              $.hideLoading();
              $.toptip(res.message, "error");
            }
          },
          function() {
            $.hideLoading();
            $.toptip("操作失败", "error");
          }
        );
      } else {
        $.toptip("两次输入的密码不一致", 2000, "error");
      }
    }
  }
};
</script>
<style scoped>
.header_psw {
  color: #757575 !important;
}
.weui-input {
  text-indent: 5px;
}
.passLabel {
  color: #2c2c2c;
}
.button.weui-btn,
input.weui-btn,
.weui-btn-area {
  z-index: 100;
}
.change {
  height: 40px;
  font-size: 15px;
  width: 100%;
  color: #fff;
  text-align: center;
  line-height: 40px;
  background-color: rgb(51, 166, 240);
}
::-webkit-input-placeholder {
  color: #a9a9a9 !important;
}
:-moz-placeholder {
  color: #a9a9a9 !important;
}
::-moz-placeholder {
  color: #a9a9a9 !important;
}
:-ms-input-placeholder {
  color: #a9a9a9 !important;
}
</style>
