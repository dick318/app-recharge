<template>
    <div class="TotalContentBox">
        <!--头部提示内容-->
        <div class="Authentication-top">
            <div class="icon-left">
                    <span class="icon-zhuyi">
                    </span>
            </div>
            <div class="RightTip">
                尊敬的用户,为了贯彻工信部《电话用户真实身份信息登记规定》,请对您购买的流量卡进行实名认证。
            </div>
        </div>
        <!--认证部分-->
        <div class="Authentication-forms">
            <div class="ietmOBX">
                    <span class="name">
                        卡号
                    </span>
                <input class="text" id="kahao" placeholder="请输入购买的流量卡号" type="text" value="" v-model="kahao">
            </div>
            <div class="ietmOBX user-register-Pro hide">
                <div class="user-register" id="textinfo">
                </div>
            </div>
            <div class="ietmOBX">
                    <span class="name">
                        姓名
                    </span>
                <input class="text" id="username" placeholder="请输入真实姓名" type="text" v-model="username">
            </div>
            <div class="ietmOBX">
                    <span class="name">
                        手机号
                    </span>
                <input class="text" id="phone" placeholder="请输入本人手机号" type="text" v-model="phone">
            </div>
            <div class="ietmOBX" style="border: none;" v-if="!oldpsw">
                    <span class="name">
                        余额密码
                    </span>
                <input class="text" id="password" placeholder="请设置余额密码" type="text" v-model="password" v-on:blur="pass">
            </div>
        </div>
        <!--身份证上传部分-->
        <div class="UploadID-BOX">
            <div class="ietmOBX">
                    <span class="name">
                        身份证号
                    </span>
                <input class="text" id="ID" placeholder="请输入身份证号码" type="text" v-model="ID">
            </div>
            <div class="UploadID">
                    <span class="title">
                        上传身份证正反面照
                    </span>
                <div class="clearfix">
                    <div class="leftBOX box wx_pic" id="upload" @click="upload(1)">
                        <img alt="" class="img" v-bind:src="pic1">
                        <span class="icon-shagnchuan">
                                </span>
                        <span class="shangchuan">
                                    上传身份证正面
                                </span>
                    </div>
                    <div class="rightBOX box wx_pic" id="shangcuan" @click="upload(2)">
                        <img alt="" class="img" v-bind:src="pic2">
                        <span class="icon-shagnchuan">
                                </span>
                        <span class="shangchuan">
                                    上传身份证反面
                                </span>
                    </div>
                </div>
            </div>
            <!--上传手持身份证-->
            <div class="UploadID">
                    <span class="title">
                        上传手持身份证照
                    </span>
                <div class="leftBOX box borNo">
                    <img class="icon-cankao" src="../img/tuli.png"/>
                </div>
                <div class="rightBOX box wx_pic" id="shouci" @click="upload(3)">
                    <img alt="" class="img" v-bind:src="pic3">
                    <span class="icon-shagnchuan">
                            </span>
                    <span class="shangchuan">
                                上传手持身份证
                            </span>
                </div>
            </div>
            <!-- -->
            <div class="Authentication-footer" v-on:click="add">
                <p>
                    提交审核
                </p>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .TotalContentBox {
        background: #f0f1f3;
    }

    .Authentication-top {
        width: auto;
        background: #fdaa42;
        padding: 10px 0;
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

    .Authentication-top .icon-left {
        width: 30px;
        height: 40px;
        float: left;
        text-align: right;
        display: inline-block;
    }

    .hidden {
        display: none !important;
    }

    span.icon-zhuyi {
        color: #fff;
        font-size: 15px;
        margin-top: 3px;
        display: block;
        margin-right: 5px;
    }

    .Authentication-top .RightTip {
        display: inherit;
        color: rgb(255, 235, 218);
        font-size: 13px;
        font-family: 微软雅黑;
        margin-left: 30px;
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
        width: 70%;
        border-width: initial;
        border-style: none;
        border-color: initial;
        border-image: initial;
        background: rgb(255, 255, 255);
    }

    .user-register-Pro.hide {
        display: none;
    }

    .user-register {
        line-height: 40px;
        color: #de1c4d;
        font-size: 14px;
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

    .UploadID {
        width: 96%;
        margin: 0 auto;
    }

    .UploadID .title {
        font-family: "微软雅黑";
        font-size: 14px;
        margin-top: 8px;
        margin-bottom: 8px;
        display: block;
        color: #000;
    }

    .UploadID .box {
        width: 45%;
        height: 130px;
        display: inline-flex;
        border: 1px dashed #e7e7e7;
        position: relative;
        text-align: center;
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

    .wx_pic img {
        z-index: 999;
        width: 100%;
    }

    .updata_ img {
        position: absolute;
        top: 0;
        height: 100%;
        width: 100%;
        left: 0;
        z-index: 99999;
    }

    .updata_ img {
        z-index: 99;
    }

    img {
        max-width: 100%;
        border: 0;
        vertical-align: bottom;
    }

    .UploadID-BOX .icon-shagnchuan {
        width: 50px;
        height: 50px;
        text-align: center;
        line-height: 50px;
        font-size: 35px;
        position: absolute;
        left: 50%;
        margin-left: -25px;
        top: 50%;
        margin-top: -35px;
        color: #d5d9dc;
        z-index: 50;
    }

    .UploadID-BOX .shangchuan {
        left: 0;
        width: 100%;
        position: absolute;
        bottom: 21px;
        font-size: 14px;
        color: #d5d9dc;
    }

    .UploadID .rightBOX {
        float: right;
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

    .hidden {
        display: none !important;
    }

    .ietmOBX .success,
    .ietmOBX .danger {
        float: right;
        display: inline-block;
        line-height: 38px;
        font-size: 14px;
        font-family: 微软雅黑;
    }

    #password {
        width: 40%;
    }
</style>

<script>
    import c from "../index";
    import ap from "../js/alipayjsapi.min";
    import wx from "weixin-js-sdk";

    export default {
        data() {
            return {
                username: "",
                phone: "",
                kahao: sessionStorage.getItem("cardNo"),
                ID: "",
                password: "",
                oldpsw: sessionStorage.getItem("password"),
                pic1: "",
                pic2: "",
                pic3: "",
                text: "",
                id: ""
            };
        },
        methods: {
            upload: function (type) {
                const _this = this;
                const urlPrl = document.location.protocol + "//" + window.location.host;
                if(sessionStorage.getItem('alipay')=='true'){
                    ap.chooseImage(1, function(res){
                        c.$post(
                            "?r=wms/personal/upload-img",
                            {
                                uid: sessionStorage.getItem("id"),
                                mediaid: res.apFilePaths[0]
                            },
                            function (data) {
                                if (data.code == 0) {
                                    $.toptip(data.msg, 2000, "error");
                                    return
                                }
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
                            function (XMLHttpRequest, textStatus, errorThrown) {
                                alert("提交失败" + textStatus);
                            }
                        );
                    });
                }else{
                    wx.chooseImage({
                        count: 1, // 默认9
                        sizeType: ["compressed"], // 可以指定是原图还是压缩图，默认二者都有
                        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
                        success: function (res) {
                            var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                            wx.uploadImage({
                                localId: localIds.toString(), // 需要上传的图片的本地ID，由chooseImage接口获得
                                isShowProgressTips: 1, // 默认为1，显示进度提示
                                success: function (res) {
                                    c.$post(
                                        "?r=wms/personal/upload-img",
                                        {
                                            uid: sessionStorage.getItem("id"),
                                            mediaid: [res.serverId]
                                        },
                                        function (data) {
                                            if (data.code == 0) {
                                                $.toptip(data.msg, 2000, "error");
                                                return
                                            }
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
                                        function (XMLHttpRequest, textStatus, errorThrown) {
                                            alert("提交失败" + textStatus);
                                        }
                                    );
                                }
                            });
                        }
                    });
                }
            },
            pass: function () {
                const _this = this;
                if (!_this.password) {
                    $.toptip("请修改您的余额密码", 2000, "error");
                    return false;
                }
                c.$post(
                    "?r=wms/personal/change-password",
                    {newPassword: _this.password, oldPassword: "888888"},
                    function (res) {
                        if (res.code == 0) {
                            $.toptip(res.msg, 2000, "error");
                            return
                        }
                        if (res.code == 1) {
                            $.toptip("成功设置密码", 2000, "success");
                            _this.oldpsw = "true";
                        }
                    }
                );
            },
            add: function () {
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
                var reg = /^1[3|4|5|6|7|8][0-9]\d{4,8}$/;
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
                    function (res) {
                        $.hideLoading();
                        if (res.code == 1) {
                            _this.$router.push({path: "home"});
                        } else {
                            $.toptip(res.msg, 2000, "error");
                        }
                    }
                );
            }
        }
    };
</script>