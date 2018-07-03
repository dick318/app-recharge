<template>
    <div class="TotalContentBox">
    <!--头部提示内容-->
    <div class="Authentication-top">
        换卡
    </div>
    <!--认证部分-->
    <div class="Authentication-forms">
        <div class="ietmOBX">
            <span class="name">原卡号</span>
            <input id="oldcard" class="text" type="text" value="" placeholder="请输入原ICCID或者接入号" v-model="oldcard">
        </div>
        <div class="ietmOBX">
            <span class="name">套餐</span>
            <input id="package" class="text" type="text" value="" placeholder="请输入原套餐" v-model="package">
        </div>
        <div class="ietmOBX">
            <span class="name">姓名</span>
            <input id="uname" class="text" type="text" placeholder="请与实名认证的保持一致" v-model="uname">
        </div>
        <div class="ietmOBX">
            <span class="name">手机号码</span>
            <input id="phone" class="text" type="text" placeholder="请与实名认证的保持一致" v-model="phone">
        </div>
        <div class="ietmOBX">
            <span class="name">省市区</span>
        </div>
        <div class="ietmOBX">
            <span class="name">详细地址</span>
            <input id="detailArea" class="text" type="text" placeholder="请输入详细地址" v-model="detailArea">
        </div>
    </div>
    <!-- 身份证上传部分 -->
    <div class="UploadID-BOX">
        <div class="ietmOBX">
            <label for="remake" class="remake">备注</label>
            <textarea name="" id="remake" cols="30" rows="4" placeholder="如有其他需求，请填写备注。" v-model="base"></textarea>
            <div class="text-center">
                提交申请后30天未收到货，请联系客服。
            </div>
            <div class="Authentication-footer add">
                <p>提交</p>
            </div>
        </div>

    </div>
            <v-distpicker  ></v-distpicker>

</div>
</template>
<style scoped>
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

<script>
import c from "../index";
import VDistpicker from 'v-distpicker'
export default {
  data() {
    return {
      uid: sessionStorage.getItem("id"),
      uname: "",
      phone: "",
      oldcard: "",
      orderID: "",
      address: "",
      detailArea:"",
      base: "",
      package: "",
      code: ""
    };
  },
  components: { VDistpicker },
  methods: {
  
    upload: function(type) {
      const _this = this;
      const urlPrl = document.location.protocol + "//" + window.location.host;
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ["compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
          wx.uploadImage({
            localId: localIds.toString(), // 需要上传的图片的本地ID，由chooseImage接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: function(res) {
              c.$post(
                "?r=wms/personal/upload-img",
                {
                  uid: sessionStorage.getItem("id"),
                  mediaid: [res.serverId]
                },
                function(data) {
                  let picPath = data.data[0]; //picPath 取得图片的路径
                  if (type == 1) {
                    _this.pic1 = urlPrl + picPath;
                  }
                  if (type == 2) {
                    _this.pic2 = urlPrl + picPath;
                  }
                  if (type == 3) {
                    _this.pic3 = urlPrl + picPath;
                  }
                },
                function(XMLHttpRequest, textStatus, errorThrown) {
                  alert("提交失败" + textStatus);
                }
              );
            }
          });
        }
      });
    },
    pass: function() {
      const _this = this;
      if (!_this.password) {
        $.toptip("请修改您的余额密码", 2000, "error");
        return false;
      }
      c.$post(
        "?r=wms/personal/change-password",
        { newPassword: _this.password, oldPassword: "888888" },
        function(res) {
          if (res.code == 1) {
            $.toptip("成功设置密码", 2000, "success");
            _this.oldpsw = "true";
          }
        }
      );
    },
    add: function() {
      const _this = this;
      if (!_this.kahao) {
        $.toptip("请输入您的卡号", 2000, "error");
        return false;
      }
      //验证名字不为空&小于8位 通过
      if (!_this.username) {
        $.toptip("请输入您的名字", 2000, "error");
        return false;
      }
      //验证手机号
      if (!_this.phone) {
        $.toptip("请输入手机号码", 2000, "error");
        return false;
      }
      var reg = /^1[3|4|5|7|8][0-9]\d{4,8}$/;
      if (!reg.test(_this.phone)) {
        $.toptip("手机号码格式不对!", 2000, "error");
        return false;
      }
      //验证余额密码
      if (!_this.oldpsw) {
        $.toptip("请修改您的余额密码!", 2000, "error");
        return false;
      }
      //验证身份证
      if (!_this.ID) {
        $.toptip("请输入您身份证!", 2000, "error");
        return false;
      }
      if (!/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(_this.ID)) {
        $.toptip("请输入正确的身份证!", 2000, "error");
        return false;
      }
      if (!_this.pic1 || !_this.pic2 || !_this.pic3) {
        return $.toptip("请上传图片!", 2000, "error");
      }
      $.showLoading();
      var url = "?r=wms/personal/update-celebrity";
      c.$post(
        url,
        {
          name: _this.username,
          phone: _this.phone,
          card: _this.kahao,
          cardNo: _this.ID,
          pic1: _this.pic1,
          pic2: _this.pic2,
          pic3: _this.pic3
        },
        function(res) {
          $.hideLoading();
          if (res.code == 1) {
            _this.$router.push({ path: "home" });
          } else {
            $.toptip(res.msg, 2000, "error");
          }
        }
      );
    }
  }
};
</script>