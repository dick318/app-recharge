<template>
    <div id="bindCardPage" v-bind:class='[moreClass,baseClass]'>
        <div class="logo">
            <img id="logo_img" class="otherImg" src="../img/logo_simple.png" v-if="type_logo === 'A'">
            <img id="logo_img" src="../img/Xlogo.png" v-if="type_logo === 'B'">
            <img id="logo_img" src="../img/baixun.png" v-if="type_logo === 'C'">
            <div class="icon-qiehuan llgt" v-if="type_logo === 'D'"></div>
            <div class="llgt_title" v-if="type_logo === 'D'">流量沟通100</div>
        </div>
        <div class="bindCardMain">
            <div class="cardNoArea">
                <label>
                    卡号
                </label>
                <span class="icon-saoyisao" id="scanQRCode" @click="scanQRCode">
                    </span>
                <div>
                    <input id="card_no" placeholder="请输入流量卡号" type="text" v-model.lazy.trim="cardNo" @click="getList"
                           @keyup="keyup" @keyup.enter="doSomething"/>
                </div>
            </div>
            <div class="FuzzySearch" v-if='FuzzySearch'>
                <ul class="list">
                    <li v-for='cardNo in cards' @click='getCard(cardNo)'>
                        {{ cardNo }}
                    </li>
                </ul>
            </div>
            <input id="bindCard" v-bind:class="{ lyz: islyz }" type="button" value='查询' @click="doSomething"/>
            <div class="tips">
                点击输入卡号右侧 "扫一扫" 图标，可直接扫码查询
            </div>
        </div>
    </div>
</template>
<style scoped>
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

<script>
    import c from "../index";
    import wx from "weixin-js-sdk"; //微信jsdk
    import "../js/jquery.cookie";
    import jdyArr from "../js/jdy";
    import ap from "../js/alipayjsapi.min";
    export default {
        data() {
            return {
                type_logo: "",
                baseClass: "kuyu",
                moreClass: "",
                islyz: "",
                loading: "",
                flag: "",
                cardNo: "",
                aid: this.$route.query.aid,
                id: this.$route.query.id,
                FuzzySearch: "",
                cards: []
            };
        },
        methods: {
            load: function (res) {
                const _this = this;
                sessionStorage.setItem("fid", res.data.fid);
                sessionStorage.setItem("sid", res.data.sid);
                sessionStorage.setItem("tid", res.data.tid);
                sessionStorage.setItem("zid", res.data.zid);
                sessionStorage.setItem("lid", res.data.lid);
                sessionStorage.setItem("cardid", res.data.id);
                sessionStorage.setItem("type", res.data.type);
                sessionStorage.setItem("tel", res.data.tel);
                sessionStorage.setItem("iccid", res.data.iccid);
                sessionStorage.setItem("packageid", res.data.packageid);
                sessionStorage.setItem("password", res.data.password);
                sessionStorage.setItem("amount", res.data.amount);
                sessionStorage.setItem("card_type", res.data.card_type);
                sessionStorage.setItem("operatorid", res.data.operatorid);
                sessionStorage.setItem("operator_type", res.data.operator_type);
                if(sessionStorage.getItem('alipay')=='true'){
                    sessionStorage.setItem("nickname", res.data.userInfo.alipay_user_info_share_response.nick_name);
                    sessionStorage.setItem("headimgurl", res.data.userInfo.alipay_user_info_share_response.avatar);
                }
                var time = 1513267200;
                //换卡供应商
                var changeType = [114, 121, 129];
                var changeEmpty = [89, 115, 184, 188, 207];
                var operatorid = res.data.operatorid;
                var zid = res.data.zid;
                //换卡供应商账号
                var zidArr = [3,165];

                var timestamp = Date.parse(res.data.addtime) / 1000;
                   //换卡弹框
                var alertArr = [125,546,1766]

                if (c.contains(changeType, operatorid)) {
                    sessionStorage.setItem("changeCard", true);
                } else if (c.contains(zidArr, zid)) {
                    if(zid==165){
                        if (c.contains(alertArr, res.data.fid)) {
                            sessionStorage.setItem("changeCardAlert", 'self');
                        }else{
                            sessionStorage.setItem("changeCardAlert", null);
                        }
                    }
                    sessionStorage.setItem("changeCard", true);
                } else if (operatorid == 105 && timestamp < time) {
                    sessionStorage.setItem("changeCard", true);
                } else if (c.contains(changeEmpty, +res.data.operatorid) && res.data.type == 4) {
                    sessionStorage.setItem("changeCard", true);
                } else if (operatorid == 113) {
                    if (!c.contains(jdyArr, +res.data.tel)) {
                        sessionStorage.setItem("changeCard", true);
                    } else {
                        sessionStorage.setItem("changeCard", false);
                    }
                } else {
                    sessionStorage.setItem("changeCard", false);
                }
                if (res.data.real_status == 1) {
                    this.confirm_self();
                    sessionStorage.setItem("real_status", "未认证");
                } else {
                    sessionStorage.setItem("real_status", "已认证");
                    if (+res.data.amount) {
                        if (!res.data.password) {
                            $.confirm(
                                "你查询的卡还没修改余额密码，请先去修改余额密码",
                                function () {
                                    $.hideLoading();
                                    _this.$router.push({path: "password"});
                                },
                                function () {
                                    $.hideLoading();
                                    _this.$router.push({path: "home"});
                                }
                            );
                        } else {
                            $.hideLoading();
                            _this.$router.push({path: "home"});
                        }
                    } else {
                        $.hideLoading();
                        _this.$router.push({path: "home"});
                    }
                }
            },
            keyup: function (event) {
                this.FuzzySearch = false;
            },
            confirm_self: function () {
                //必须实名
                // var mustOid = [121, 123, 125, 168, 115];
                var mustAid = [1728];
                // var mustZid = [17];
                const _this = this;
                $.confirm({
                    title: "实名认证",
                    text: "1",
                    onOK: function () {
                        $.hideLoading();
                        _this.$router.push({path: "register"});
                    },
                    onCancel: function () {
                        $.hideLoading();
                        _this.$router.push({path: "home"});
                    }
                });
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
                if (c.contains(mustAid, +sessionStorage.getItem('fid'))
                ) {
                    $(".weui-dialog__btn.default").hide();
                } else {
                }
                $(".weui-dialog__btn.default").text("下次再说");

            },
            scanQRCode: function () {
                if(sessionStorage.getItem('alipay')=='true'){
                    var _this = this
                    ap.scan({
                        type: 'bar'
                    },function(res){
                        var result = res.code; // 当needResult 为 1 时，扫码返回的结果
                        result = result.substring(result.indexOf(",") + 1);
                        _this.cardNo = result;
                        doSomething();
                    });
                }else{
                    wx.scanQRCode({
                        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                        scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                        success: function (res) {
                            var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                            result = result.substring(result.indexOf(",") + 1);
                            this.cardNo = result;
                            doSomething();
                        }
                    });
                }
            },
            getCard: function (cardNo) {
                this.FuzzySearch = false;
                this.cardNo = cardNo;
            },
            getList: function () {
                this.FuzzySearch = true;
            },
            doSomething: function () {
                const cardNo = this.cardNo;
                const id = this.id;
                const aid = this.aid;
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
                    var arr = [],
                        cookArr = [];
                    if ($.cookie("kahao")) {
                        cookArr = $.cookie("kahao").split(",");
                    }
                    arr.push(cardNo);
                    var b = arr.concat(cookArr);
                    if (c.unique3(b).length > 5) {
                        b.pop();
                    }
                    $.cookie("kahao", c.unique3(b));
                    var url =''
                    if(sessionStorage.getItem('alipay')=='true'){
                          url = '?r=wms/personal/alipay-card-bind'
                    }else{
                        url =  "?r=wms/personal/card-bind"
                    }
                    c.$post(
                        url,
                        {
                            card: cardNo,
                            uid: sessionStorage.getItem("id"),
                            code: sessionStorage.getItem('alipay')!='true'?c.getUrlParam("code"):_this.$route.query.auth_code
                        },
                        function (res) {
                            if (res.code == 1) {
                                sessionStorage.setItem("cardNo", _this.cardNo);

                                if(res.data.card_type ==6){
                                    if (c.contains([5,6,9], res.data.zid)) {
                                        $.alert('因运营商政策调整，<span class="weui-cell__bd" style="color: red"> 请联系卖家换卡</span>。</br>如果联系不到，请在酷易充留言换卡', "注意", function() {
                                        });
                                    }else{
                                        $.alert("该卡为注销卡，请勿充值查询!", "注意", function() {
                                        });
                                    }
                                    $.hideLoading();
                                    return
                                }
                                if (sessionStorage.getItem("id") == res.data.uid) {
                                    _this.load(res);
                                } else {
                                    c.$get("?r=wms/personal/get-card", function (res) {
                                        if (res.code == 0) {
                                            $.hideLoading();
                                            $.toptip(res.msg, 2000, "error");
                                        } else {
                                            _this.load(res);
                                        }
                                    });
                                }
                                flag = 0;
                            } else {
                                $.hideLoading();
                                flag = 0;
                                $.toptip(res.msg, 2000, "error");
                                return false;
                            }
                            _this.loading = "查询";
                        }
                    );
                }
            }
        },
        beforeCreate: function () {
            const _this = this;
            if(navigator.userAgent.indexOf('Alipay') > -1){
               sessionStorage.setItem('alipay','true')
                if (window.location.hash.indexOf("code") == -1) {
                    // 转授权链接
                    c.$post(
                        "?r=home/setting/change-alipay-url",
                        {
                            url: document.location.href,
                            // id: _this.$route.query.id || sessionStorage.getItem("id")
                        },
                        function (res) {
                            if (res.code == 0) {
                                $.toptip(res.msg, 2000, "error");
                                return;
                            }
                            window.location.href = res.data.url;
                        }
                    );
                }
            }else if(navigator.userAgent.indexOf('MicroMessenger') > -1){
                if (window.location.search.indexOf("code") == -1) {
                    // 转授权链接
                    c.$post(
                        "?r=home/setting/change-url",
                        {
                            url: document.location.href,
                            id: _this.$route.query.id || sessionStorage.getItem("id")
                        },
                        function (res) {
                            if (res.code == 0) {
                                $.toptip(res.msg, 2000, "error");
                                return;
                            }
                            window.location.href = res.data.url;
                        }
                    );
                }
            }
        },
        created: function () {
            sessionStorage.setItem("code", c.getUrlParam("code"));
            if (this.id) {
                sessionStorage.setItem("id", this.id);
            }
            if (this.aid) {
                sessionStorage.setItem("aid", this.aid);
                if (this.aid == 125) {
                    this.islyz = true;
                    this.moreClass = "lyz";
                    this.baseClass = "";
                }
                this.type_logo = "A";
            } else {
                if (this.id == 51) {
                    this.type_logo = "C";
                } else if (this.id == 52) {
                    this.type_logo = "D";
                } else {
                    this.type_logo = "B";
                }
            }
            if (window.location.search.indexOf("code") != -1&&navigator.userAgent.indexOf('MicroMessenger') > -1) {
                const _this = this;
                //配置jssdk
                c.$post(
                    "/?r=home/setting/get-jsapi-conf",
                    {
                        uid: _this.$route.query.id || sessionStorage.getItem("id"),
                        url: document.location.href
                    },
                    function (data) {
                        wx.config({
                            appId: data.data.appId, // 必填，公众号的唯一标识
                            timestamp: data.data.timestamp, // 必填，生成签名的时间戳
                            nonceStr: data.data.nonceStr, // 必填，生成签名的随机串
                            signature: data.data.signature, // 必填，签名，见附录1
                            jsApiList: ["chooseImage", "scanQRCode", "uploadImage"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                        });
                    }
                );
                if (!sessionStorage.getItem('cardArr')) {
                    c.$post(
                        "?r=wms/personal/get-all-card",
                        {
                            id: _this.$route.query.id || sessionStorage.getItem("id"),
                            code: c.getUrlParam("code")
                        },
                        function (res) {
                            if (res.code == 0) {
                                $.toptip(res.msg, 2000, "error");
                                return;
                            }
                            let i = 0;
                            let cardArr = [];
                            for (let elem of res.data.values()) {
                                i++;
                                if (i < 6) {
                                    _this.cards.push(elem.card);
                                    cardArr.push(elem.card)
                                }
                            }
                            sessionStorage.setItem('cardArr', cardArr.join(','))
                        }
                    );
                }else{
                    let i = 0;
                    const cardArr = sessionStorage.getItem('cardArr').split(',')
                    for (let elem of cardArr) {
                        i++;
                        if (i < 6) {
                            _this.cards.push(elem);
                        }
                    }
                }
            }
        }
    };
</script> 