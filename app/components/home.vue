<template>
    <div class="TotalContentBox">
        <div class="weui-panel weui-panel_access top-info">
            <div class="weui-panel__bd top-info-content">
                <div class="weui-media-box weui-media-box_appmsg top-info-content">
                    <div class="weui-media-box__hd logo_img">
                        <img class="weui-media-box__thumb headimgurl" v-bind:src="headimgurl">
                        </img>
                    </div>
                    <div class="weui-media-box__bd logo_content">
                        <p class="weui-media-box__desc">
                            昵称：
                            <span class="nickname">{{nickname}}
                                </span>
                        </p>
                        <p class="weui-media-box__desc">
                            卡号：
                            <span class="tel" id="tel">{{cardNo}}
                                </span>
                        </p>
                    </div>
                    <div class="icon-qiehuan qiehaun" @click="qiehuan">
                    </div>
                </div>
            </div>
        </div>
        <div class="weui-flex info-middle">
            <div class="clearfix weui-flex__item packageBox">
                    <span class="">
                    </span>
                账户余额：
                <span class="amount">{{amount}}
                    </span>
                元
            </div>
            <div class="clearfix weui-flex__item packageBox">
                    <span class="">
                    </span>
                认证状态：
                <span class="real_status " @click="clickStatus">{{real_status}}
                    </span>
            </div>
        </div>
        <div class="hengxian">
        </div>
        <!--九宫格列表开始-->
        <div class="weui-grids weui-panel">
            <div class="weui-grid js_grid detail" @click="info" v-show="aid!=2886">
                <div class="weui-grid__icon ">
                    <img src="../img/detail.png"/>
                </div>
                <p class="weui-grid__label">
                    流量查询
                </p>
            </div>
            <div class="weui-grid js_grid " @click="order">
                <div class="weui-grid__icon">
                    <img src="../img/order.png"/>
                </div>
                <p class="weui-grid__label">
                    流量订购
                </p>
            </div>
            <div class="weui-grid js_grid record" @click="record">
                <div class="weui-grid__icon ">
                    <img src="../img/record.png"/>
                </div>
                <p class="weui-grid__label">
                    消费记录
                </p>
            </div>
            <div class="weui-grid js_grid register" @click="clickStatus">
                <div class="weui-grid__icon">
                    <img src="../img/register.png"/>
                </div>
                <p class="weui-grid__label">
                    实名认证
                </p>
            </div>
            <div class="weui-grid js_grid recharge" @click="recharge" v-show="aid == null||aid=='null'">
                <div class="weui-grid__icon">
                    <img src="../img/recharge.png"/>
                </div>
                <p class="weui-grid__label">
                    余额充值
                </p>
            </div>
            <div class="weui-grid js_grid " @click="question" v-if="id != 51">
                <div class="weui-grid__icon">
                    <img src="../img/question.png"/>
                </div>
                <p class="weui-grid__label">
                    常见问题
                </p>
            </div>
            <div class="weui-grid js_grid " @click="apn" v-if="id != 51">
                <div class="weui-grid__icon">
                    <img src="../img/setting.png"/>
                </div>
                <p class="weui-grid__label">
                    手机设置APN
                </p>
            </div>
            <div class="weui-grid js_grid password" @click="password">
                <div class="weui-grid__icon">
                    <img src="../img/password.png"/>
                </div>
                <p class="weui-grid__label">
                    修改密码
                </p>
            </div>
            <div class="weui-grid js_grid " @click="diagnose">
                <div class="weui-grid__icon">
                    <img src="../img/unbind.png"/>
                </div>
                <p class="weui-grid__label">
                    智能诊断
                </p>
            </div>
            <div class="weui-grid js_grid cardActive hidden" @click="active">
                <div class="weui-grid__icon">
                    <img src="../img/active.png"/>
                </div>
                <p class="weui-grid__label">
                    卡片激活
                </p>
            </div>
        </div>

        <div class="weui-panel weui-panel_access addEvent">
            <div class="hengxian">
            </div>
            <div class="weui-panel__bd">
                <a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg" @click="freeCard">
                    <div class="weui-media-box__hd">
                        <img class="weui-media-box__thumb" src="../img/freeCard.png">
                    </div>
                    <div class="weui-media-box__bd">
                        <h4 class="weui-media-box__title">免费领取  VIP</h4>
                        <p class="weui-media-box__desc">现在你们只用支付10元邮费，就可以获得我们面值2000的购物影视卡。</p>
                    </div>
                </a>
            </div>
        </div>
        <!--九宫格结束-->
        <!--页脚开始-->
    </div>
</template>
<style scoped>
    .weui-grids.weui-panel{
        margin-top: 0;
    }
    .addEvent{
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

<script>
    import c from "../index";

    export default {
        data() {
            return {
                id: sessionStorage.getItem("id"),
                aid: sessionStorage.getItem("aid"),
                type: sessionStorage.getItem("type"),
                cardNo: sessionStorage.getItem("cardNo"),
                amount: sessionStorage.getItem("amount"),
                nickname: sessionStorage.getItem("nickname"),
                real_status: sessionStorage.getItem("real_status"),
                needFresh: sessionStorage.getItem("needFresh"),
                operator_type: sessionStorage.getItem("operator_type"),
                headimgurl: sessionStorage.getItem("headimgurl")
            };
        },
        methods: {
            clickStatus: function () {
                if (this.real_status == "已认证") {
                    $.alert("你已经实名，无需再次实名。", "注意", function () {
                    });
                } else {
                    this.$router.push({path: "register"});
                }
            },
            diagnose: function () {
                this.$router.push({path: "diagnose"});
            },
            freeCard: function () {
                if(sessionStorage.getItem('alipay')!='true'){
                    var code = sessionStorage.getItem('code');
                    if(code){
                        window.location.href = `http://wx.szcoolfish.com/coolfish/tpl/main/extend/shopGWK.html?id=50&code=${code}`
                    }else{
                        window.location.href = `http://wx.szcoolfish.com/coolfish/tpl/main/extend/shopGWK.html?id=50`
                    }
                }else{
                    $.alert("请在微信酷易充公众号申请。", "注意", function () {
                    });
                }
            },
            qiehuan: function () {
                this.$router.push({path: "bindCard", query: {id: this.id,aid:this.aid}});
            },
            recharge: function () {
                this.$router.push({path: "recharge"});
            },
            info: function () {
                this.$router.push({path: "info"});
            },
            record: function () {
                this.$router.push({path: "record"});
            },
            active: function () {
                this.$router.push({path: "active"});
            },
            password: function () {
                this.$router.push({path: "password"});
            },
            keyJump: function (num1, num2) {
                const _this = this;
                if (_this.id == 50) {
                    _this.$router.push({path: "view", query: {id: num1}});
                } else if (_this.id == 52) {
                    _this.$router.push({path: "view", query: {id: num2}});
                }
            },
            question: function () {
                this.keyJump(50, 52);
            },
            apn: function () {
                this.keyJump(47, 54);
            },
            order: function () {
                const lid_list = [22, 23, 24, 30, 31, 32, 33, 34];
                const _this = this;
                if (sessionStorage.getItem("changeCard") == "true") {
                    _this.$router.push({path: "packagem"});
                    return;
                }
                if (c.contains(lid_list, +sessionStorage.getItem("lid"))) {
                    _this.$router.push({path: "packagen"});
                    return;
                }
                if (sessionStorage.getItem("type") == 1) {
                    _this.$router.push({path: "packagem"});
                } else {
                    _this.$router.push({path: "packagen"});
                }
            },
            fresh: function () {
                c.$get("?r=wms/personal/get-wx-info", function (res) {
                    if (res.code == 0) {
                        return;
                    }
                    sessionStorage.setItem("needFresh", "true");
                    sessionStorage.setItem("openid", res.data.openid);
                    sessionStorage.setItem("nickname", res.data.nickname);
                    sessionStorage.setItem("headimgurl", res.data.headimgurl);
                });
            }
        },
        created: function () {
            const _this = this;
            if (
                sessionStorage.getItem("pay") == "true" ||
                sessionStorage.getItem("active") == "true"
            ) {
                sessionStorage.setItem("pay", false);
                sessionStorage.setItem("active", false);
                c.$get("?r=wms/personal/get-card", function (res) {
                    if (res.code == 0) {
                        $.toptip(res.msg, 2000, "error");
                        return;
                    }
                    _this.type = res.data.type;
                    _this.amount = res.data.amount;
                    sessionStorage.setItem("type", res.data.type);
                    sessionStorage.setItem("amount", _this.amount);
                });
            }
            if (this.type == 4 && sessionStorage.getItem("changeCard") != "true") {
                $.alert("空卡套餐，请订购套餐后使用。", "注意", function () {
                    _this.$router.push({path: "packagen"});
                });
            }
            if (sessionStorage.getItem("needFresh") != "true") {
                if(sessionStorage.getItem('alipay')!='true'){
                    c.$get("?r=wms/personal/get-wx-info", function (res) {
                        if (res.code == 0) {
                            return;
                        }
                        _this.nickname = res.data.nickname;
                        _this.headimgurl = res.data.headimgurl;
                        sessionStorage.setItem("needFresh", "true");
                        sessionStorage.setItem("openid", res.data.openid);
                        sessionStorage.setItem("nickname", res.data.nickname);
                        sessionStorage.setItem("headimgurl", res.data.headimgurl);
                    });
                }
            }
        }
    };
</script>