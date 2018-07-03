<template>
    <div class="weui-tab body-margin">
        <div class="weui-navbar">
            <div class="weui-navbar__item " v-bind:href="'#'+ item.url" v-for="(item,key,index) in title"
                 @click="activeTitle(item,key,index)"
                 v-bind:class="[index==0 ? 'weui-bar__item--on' : '']">
                {{ item.title }}
                <hr class="active_hengxian" v-bind:class="[item.active==true?'':'hidden' ]">
            </div>
        </div>
        <div class="weui-tab__bd " id="template">

            <div id="tab1" class="weui-tab__bd-item  add weui-tab__bd-item--active" v-if="libArr.tab1.length>0">
                <div class="weui-panel__hd package_title"><span v-bind:class="[libArr.tab3.length>0 ? '' : 'hidden']">普通套餐：</span>
                </div>
                <div class="rechargeSingleMonthPage" v-for="(tab1, index) in libArr.tab1"
                     @click="active('tab1', index)">
                    <div class="content-renzheng content-renzheng_left "
                         v-bind:class="[tab1.active==true ? 'content_active' : '']">
                        <div class="content-dangqian content-dangqian_left">
                            <div class="content-dangqian-list">
                                <div class="packageInfo" style="margin: 5px 0;">
                                    <div class=" packagename titleBOX">{{tab1.name}}</div>
                                    <div style="color: #959595; font-size: 13px;" class="titleBOX left_info">
                                        {{tab1.text| formatText}}
                                    </div>
                                </div>
                            </div>
                            <div class="info_right">
                                <div class="right">
                                    <div class="right_price"><span class="saleAfter ">￥<span class="prices">{{tab1.price}}</span></span>
                                        <br> <span class="saleBefore ">￥<span>{{tab1.old_price}}</span></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="weui-tab__bd-item " id='tab2'
                 v-bind:class="[libArr.tab1.length>0 ? '' : 'weui-tab__bd-item--active']">
                <div class="weui-panel weui-panel_access" v-if="libArr.tab3.length>0">
                    <div class="weui-panel__hd package_title title_one"
                         v-bind:class="[libArr.tab3.length>0 ? '' : 'hidden']">推荐套餐：
                    </div>
                    <div class="weui-panel__bd " v-for="(tab1,key,index) in libArr.tab3">
                        <div @click="active('tab3', index)"
                             class="weui-media-box weui-media-box_appmsg package_content" style="height: auto;">
                            <div class="special">特惠
                                <div></div>
                            </div>
                            <div class="choose " v-bind:class="[tab1.active==true ? '' : 'hidden']">
                                <img src="../img/check.png" alt="">
                            </div>
                            <div class="weui-media-box__hd flow " v-bind:class="[tab1.flow == '∞' ? 'infinite' : '']">
                                {{tab1.flow}}
                            </div>
                            <div class="weui-media-box__bd" style="height: auto;">
                                <h4 class="weui-media-box__title">
                                    <span class="packagename">{{tab1.name}}</span>
                                    <span class="weui-media-box__desc">
                                              {{tab1.usetime}}
                                        </span>
                                </h4>
                                <div class="price" style="margin-top: 2px;"><span class="yuan">￥</span><span
                                        class="prices">{{tab1.price}}</span></div>
                                <p class="weui-media-box__desc old_price">￥{{tab1.old_price}}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="weui-panel weui-panel_access margin">
                    <div class="weui-panel__hd package_title"><span
                            v-bind:class="[libArr.tab3.length>0 ? '' : 'hidden']">普通套餐：</span></div>
                    <div class="weui-panel__bd " v-for="(tab1, index) in libArr.tab2">
                        <div href=""
                             class="weui-media-box weui-media-box_appmsg package_content" style="height: auto;"
                             @click="active('tab2', index)" v-bind:class="[tab1.active==true ? 'active' : '']">
                            <div class="special" v-if="tab1.sort == 88">推荐
                                <div></div>
                            </div>
                            <div class="choose " v-bind:class="[tab1.active==true ? '' : 'hidden']">
                                <img src="../img/check.png" alt="">
                            </div>
                            <div class="weui-media-box__hd flow " v-bind:class="[tab1.flow == '∞' ? 'infinite' : '']">
                                {{tab1.flow}}
                            </div>
                            <div class="weui-media-box__bd" style="height: auto;">
                                <h4 class="weui-media-box__title">
                                    <span class="packagename">{{tab1.name}}</span>
                                    <span class="weui-media-box__desc">
                                              {{tab1.usetime}}
                                        </span>
                                </h4>
                                <div class="price" style="margin-top: 2px;"><span class="yuan">￥</span><span
                                        class="prices">{{tab1.price}}</span></div>
                                <p class="weui-media-box__desc old_price">￥{{tab1.old_price}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="goPage" v-on:click="order">
            <div type="button" id="goRecharge">确认订购</div>
        </div>
    </div>
</template>
<style scoped>
    .add {
        margin-top: 0 !important;
    }

    .content-renzheng {
        padding-top: 10px;
        width: 100%;
        background: #ffffff;
        border-bottom: 1px solid #e7e7e8;
    }

    .content-dangqian_left {
        margin-top: 0 !important;
        padding-top: 0 !important;
    }

    .content-dangqian {
        padding: 1px 0;
        border-bottom: none;
        width: 90%;
        margin: 261px auto 5%;
    }

    .content-dangqian div {
        margin-left: 0;
    }

    .content-dangqian-list {
        position: relative;
    }

    .packageInfo {
        position: relative;
    }

    .content-dangqian .titleBOX {
        font-size: 14px;
        padding: 0;
        word-break: break-all;
    }

    .content-dangqian .left_info {
        width: 75%;
    }

    .right_price {
        white-space: nowrap;
        text-align: center;
    }

    .saleAfter {
        font-size: 15px;
        color: #32a3ef;
    }

    .saleBefore {
        font-size: 13px;
        color: #999;
        text-decoration: line-through;
    }

    .content_active {
        background: -webkit-linear-gradient(left, #31a5ee, #42d5ff) !important;
        color: #ffffff !important;
    }

    .content_active .content-renzheng-title,
    .content_active .left_info,
    .content_active .saleAfter,
    .content_active .saleBefore {
        color: #ffffff !important;
    }

    body {
        height: auto;
        font-family: Tahoma, Arial, Roboto, "Droid Sans", "Helvetica Neue",
        "Droid Sans Fallback", "Heiti SC", sans-self !important;
    }

    .weui-navbar {
        background-color: #ffffff;
    }

    .body-margin {
        margin-bottom: 46px;
    }

    .weui-navbar:after {
        border-bottom: none;
    }

    .weui-navbar__item:after {
        border-right: none;
    }

    .weui-navbar__item {
        color: #494949;
    }

    .weui-navbar__item.weui-bar__item--on {
        color: #32a4ef;
        background-color: #ffffff;
    }

    .weui-navbar__item {
        line-height: 24px;
        font-size: 14px;
        height: 24px;
    }

    .active_hengxian {
        width: 21px;
        margin: 2px auto;
        background: #42d0fe;
        height: 1px;
        border-radius: 3px;
        border: 1.5px solid #32a4ef;
    }

    .weui-navbar__item.weui-bar__item--on {
        font-size: 18px;
        border-top-width: 0 !important;
    }

    .rechargeSingleMonthPage ul li {
        height: 100%;
        padding: 10px 6px;
        background: #fff;
        border-bottom: 1px solid #e7e7e7;
    }

    .info {
        position: relative;
    }

    .info_right {
        position: absolute;
        top: 56px;
        right: 10%;
    }

    .rechargeSingleMonthPage ul li .right div {
        display: inline-block;
        width: 8em;
        text-align: right;
    }

    .rechargeSingleMonthPage ul li .left {
        line-height: 40px;
        color: #292929;
        text-indent: 5%;
        white-space: nowrap;
    }

    .rightArrow {
        line-height: 40px;
        vertical-align: top;
        position: relative;
        left: -2em;
    }

    .saleAfter {
        font-size: 15px;
        color: #56b3f2;
    }

    .saleBefore {
        font-size: 13px;
        color: #aaaaaa;
        text-decoration: line-through;
    }

    .info_left {
        width: 68%;
        margin: 0 2.5%;
        color: #aaaaaa;
    }

    .foot {
        font-size: 15px;
        width: 100%;
        padding: 18px 0;
        text-align: center;
        color: #fff;
        font-family: "微软雅黑";
        position: fixed;
        bottom: 0;
        background: -webkit-linear-gradient(left, #31a5ee, #42d5ff);
    }

    .addPack ul li {
        background: -webkit-linear-gradient(left, #31a5ee, #42d5ff) !important;
        color: #ffffff !important;
    }

    .addPack ul li .left,
    .addPack ul li .info_left,
    .addPack ul li .saleAfter,
    .addPack ul li .saleBefore {
        color: #ffffff !important;
    }

    .flow {
        background: #33a6f0;
        color: #ffffff;
        font-size: 15px !important;
        display: inline-block;
        text-align: center;
        letter-spacing: 1px;
        border-radius: 5px;
        width: 42px !important;
        height: 42px !important;
        line-height: 42px !important;
        margin-right: 20px !important;
        /*font-family: 'MicrosoftYaHei-Bold';*/
    }

    .flow.infinite {
        font-size: 30px !important;
        line-height: 38px !important;
    }

    .package_list div:nth-of-type(2) {
        display: inline-block;
    }

    .weui-media-box_appmsg .weui-media-box__bd {
        height: 42px;
    }

    h4 span.weui-media-box__desc,
    .weui-media-box__bd .price,
    .weui-media-box__bd .old_price {
        display: inline-block !important;
    }

    .weui-media-box__desc {
        color: #8f8f8f;
    }

    .weui-media-box__bd .price {
        color: #ff5252;
        font-size: 19px;
        height: 17px;
        line-height: 17px;
        margin-top: 8px;
    }

    .weui-media-box__title {
        height: 18px;
        line-height: 18px;
    }

    .weui-media-box__bd .price .yuan {
        font-size: 14px;
    }

    a.weui-media-box {
        height: 45px;
    }

    span.weui-media-box__desc {
        vertical-align: middle;
        line-height: 16px;
    }

    div.weui-media-box__desc {
        font-size: 14px;
        vertical-align: middle;
        line-height: 24px;
        margin-top: 2px;
    }

    .package_title {
        color: #33a6f0;
        background: #f0f1f3;
        margin-top: 0;
        font-size: 14px !important;
    }

    .price {
        color: red;
        font-weight: bold;
    }

    .old_price {
        text-decoration: line-through;
        margin-left: 8px;
        font-size: 12px;
    }

    .special {
        width: 18px;
        margin: 0 auto;
        line-height: 14px;
        text-align: center;
        font-size: 14px;
        position: absolute;
        top: 1px;
        right: 10px;
        background: #ff5252;
        color: #ffffff;
        padding-top: 10px;
        padding-left: 5px;
        padding-right: 5px;
    }

    .active .special {
        right: 9px;
        top: 0;
    }

    .choose {
        line-height: 10px;
        font-size: 15px;
        color: #ffffff;
        position: absolute;
        bottom: 0;
        right: 0;
        width: 0;
        height: 0;
        border-width: 15px;
        border-style: solid;
        border-color: transparent #31a6ee #31a6ee transparent;
    }

    .choose img {
        width: 13px !important;
    }

    .special div {
        position: absolute;
        left: 0;
        border-top: 8px solid #ff5252;
        border-right: 14px solid #ff5252;
        border-bottom: 10px solid #ffffff;
        border-left: 14px solid #ff5252;
    }

    .package_content {
        position: relative;
    }

    .active {
        border: 1px solid #33a6f0 !important;
        padding: 14px !important;
    }

    .margin {
        margin-top: 0 !important;
    }

    .title_one {
        /*margin-top: 12px;*/
    }

    .weui-navbar {
        width: 92%;
        padding: 0 4% 0 4%;
        position: fixed;
        height: 50px;
        left: 0;
        right: 0;
        top: 0;
    }

    .weui-panel__hd {
        padding-top: 10px !important;
    }

    .weui-media-box:before,
    .weui-panel__hd:after {
        left: 0 !important;
    }

    #template {
        position: fixed;
        padding-top: 0 !important;
        width: 100%;
        top: 50px;
        padding-bottom: 100px;
        overflow: scroll;
        -webkit-overflow-scrolling: touch;
    }

    .weui-toptips.bg-error.weui-toptips_visible {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
    }

    #weui-prompt-input {
        padding: 0 !important;
    }
</style>

<script>
    import c from "../index";

    export default {
        data() {
            return {
                libArr: {
                    tab1: [],
                    tab2: [],
                    tab3: []
                },
                title: {
                    tab1: [],
                    tab2: []
                },
                id: "",
                pid: sessionStorage.getItem("packageid"),
                price: "",
                packagename: "",
                flag: "",
                bindType: "",
                changeFlag: ""
            };
        },
        filters: {
            formatText(text) {
                if (!text) {
                    return `本套餐流量适用于国内2G/3G/4G网络流量（不含港澳台地区），当月开通一次到账，月底清零，次月从账户中扣取套餐费，可叠加。`;
                } else {
                    return text;
                }
            },
        },
        methods: {
            active: function (key, index) {
                const amount = sessionStorage.getItem("amount");
                for (let i in this.libArr) {
                    for (let item in this.libArr[i]) {
                        this.libArr[i][item].active = false;
                    }
                }
                this.libArr[key][index].active = !this.libArr[key][index].active;
                this.bindType = this.libArr[key][index].addType;
                this.id = this.libArr[key][index].id;
                this.price = this.libArr[key][index].price;
                this.packagename = this.libArr[key][index].name;
                if (amount != 0.0) {
                    if (this.price - amount <= 0) {
                        this.flag = "true";
                    } else {
                        this.flag = c.accSub(amount, this.price);
                    }
                } else {
                    this.flag = "false";
                }
            },
            activeTitle: function (item, key, index) {
                for (let i in this.title) {
                    this.title[i].active = false;
                }
                this.title[key].active = !this.title[key].active;
            },
            order: function () {
                if (sessionStorage.getItem('changeCardAlert') == 'self') {
                    $.alert('因运营商政策调整，<span class="weui-cell__bd" style="color: red"> 请联系卖家换卡</span>。</br>如果联系不到，请在酷易充留言换卡')
                    return false;
                }
                if (!this.id) {
                    $.toptip("请选择套餐", 2000, "error");
                    return false;
                }
                if (!this.price) {
                    $.toptip("获取套餐价格失败", 2000, "error");
                    return false;
                }
                if (!sessionStorage.getItem("cardNo")) {
                    $.toptip("获取卡号失败", 2000, "error");
                    return false;
                }

                this.add(0);
            },
            add: function (typeMonth) {
                $.showLoading();
                const _this = this;
                c.$post(
                    "?r=home/order/add",
                    {
                        type: typeMonth,
                        fid: sessionStorage.getItem("fid"),
                        sid: sessionStorage.getItem("sid"),
                        tid: sessionStorage.getItem("tid"),
                        money: this.price,
                        iccid: sessionStorage.getItem("iccid"),
                        packageid: this.id,
                        trade_type: 1,
                        cardid: sessionStorage.getItem("cardid"),
                        operatorid: sessionStorage.getItem("operatorid"),
                        uid: sessionStorage.getItem("id")
                    },
                    function (data) {
                        $.hideLoading();
                        if (data.code == 0) {
                            $.toptip(data.msg, 2000, "error");
                            return false;
                        }
                        var ids = data.data.id;
                        var orderID = data.data.orderID;
                        var aid = sessionStorage.getItem("aid");
                        sessionStorage.setItem("pay", "false");
                        sessionStorage.setItem("packagename", _this.packagename);
                        sessionStorage.setItem("order_type", "");
                        sessionStorage.setItem("flag", _this.flag);
                        sessionStorage.setItem("money", _this.price);
                        if (sessionStorage.getItem("changeCard") == "true") {
                            if (sessionStorage.getItem('alipay') != 'true') {
                                var code = sessionStorage.getItem('code');
                                if (code) {
                                    window.location.href = `http://wx.szcoolfish.com/coolfish/tpl/main/personal3/changeCard.html?ids=${ids}&id=50&code=${code}`
                                } else {
                                    window.location.href = `http://wx.szcoolfish.com/coolfish/tpl/main/personal3/changeCard.html?ids=${ids}&id=50`
                                }
                            } else {
                                $.alert("请在微信酷易充公众号申请。", "注意", function () {
                                });
                            }
                        } else {
                            if (data.data.link && aid != "null") {
                                window.location.href = data.data.link;
                            } else if (ids) {
                                window.location.href =
                                    document.location.protocol +
                                    "//" +
                                    window.location.host +
                                    "/coolfish/pay/index.bak.html?id=" +
                                    ids +
                                    "&flag=" +
                                    _this.flag +
                                    "&orderID=" +
                                    orderID;
                            }
                        }
                    }
                );
            }
        },
        beforeCreate: function () {
            $.showLoading();
            const _this = this;
            const operatorid = sessionStorage.getItem("operatorid");
            const lid = sessionStorage.getItem("lid");
            const cardNo = sessionStorage.getItem("cardNo");
            let cardPackage = 0;
            let lib = {
                tab1: [],
                tab2: [],
                tab3: []
            };
            let title = [];
            let tab1 = {title: "", url: "tab1", active: false};
            let tab2 = {title: "", url: "tab2", active: false};
            const changeType = sessionStorage.getItem("changeCard") == "true";
            //changeType是否换卡
            if (changeType) {
                $.confirm({
                    title: "注意",
                    text: "1",
                    onOK: function () {
                        psw();
                        _this.changeFlag = 1;
                    },
                    onCancel: function () {
                        _this.changeFlag = 0;
                    }
                });
                $("#goRecharge").text("换卡");
                if (sessionStorage.getItem('changeCardAlert') == 'self') {
                    $(".weui-dialog__bd").html(
                        '因运营商政策调整，<span class="weui-cell__bd" style="color: red"> 请联系卖家换卡</span>。</br>如果联系不到，请在酷易充留言换卡'
                    );
                } else {
                    $(".weui-dialog__bd").html(
                        '因运营商系统问题，需要换卡,订购套餐后，会陆续在<span class="weui-cell__bd" style="color: red"> 一周以内</span>发圆通包邮。'
                    );
                }

            } else {
                psw();
            }

            function psw() {
                if (
                    sessionStorage.getItem(cardNo) != "true" &&
                    sessionStorage.getItem("amount") > 0.0
                ) {
                    $.prompt({
                        title: "密码认证",
                        text: "为保障用户余额安全，余额订购套餐需输入卡片密码",
                        autoClose: false,
                        onOK: function (input) {
                            if (!input) {
                                $.toptip("请输入密码", 2000, "error");
                                return false;
                            }
                            c.$post(
                                "?r=wms/personal/validate-password",
                                {
                                    password: input
                                },
                                function (res) {
                                    if (res.code == 0) {
                                        $.toptip(res.msg, 2000, "error");
                                        psw();
                                    } else {
                                        sessionStorage.setItem(cardNo, "true");
                                        $.toptip(res.msg, 2000, "success");
                                    }
                                }
                            );
                        },
                        onCancel: function () {
                            _this.$router.push({path: "password"});
                        }
                    });
                    $("#weui-prompt-input").attr("placeholder", "请输入密码");
                    $(".weui-dialog__btn.default").text("忘记密码");
                    $(".weui-dialog__btn.primary").on("click", function () {
                        if (!$("#weui-prompt-input").val()) {
                            $.toptip("请输入密码", 2000, "error");
                            return false;
                        } else {
                            $.showLoading();
                            setTimeout(function () {
                                $.hideLoading();
                            }, 1000);
                        }
                    });
                }
            }

            function loadFlow(data) {
                if (data.is_infinite == 2) {
                    data.flow = "∞";
                } else if (data.flow / 1024 >= 1) {
                    data.flow = Math.floor(data.flow / 1024) + "G";
                } else {
                    data.flow = parseInt(data.flow) + "M";
                }
                if (data.usetime == 7) {
                    data.usetime = "当月7天有效";
                } else if (data.usetime == 30) {
                    data.usetime = "当月有效";
                } else {
                    data.usetime = data.usetime + "天有效";
                }
            }

            function loadCard(res, lib) {
                $.each(res.data, function (i, data) {
                    loadFlow(data);
                    data.active = false;
                    if (data.is_dis == 1) {
                        if (res.data[i].id != _this.pid && data.type == 1) {
                            lib["tab2"].push(res.data[i]);
                            if (sessionStorage.getItem("changeCard") == "true") {
                                tab2.title = "换卡套餐";
                            } else {
                                tab2.title = "叠加套餐";
                            }
                        } else if (res.data[i].id == _this.pid) {
                            lib["tab1"].push(res.data[i]);
                            tab1.title = "基本套餐";
                        }
                    } else {
                        var timestamp = Math.round(new Date().getTime() / 1e3);
                        if (timestamp < res.data[i].p_endtime) {
                            lib["tab3"].push(res.data[i]);
                        }
                    }
                });
                return lib;
            }

            //获取套餐
            c.$get("?r=wms/personal/get-card-package", function (res) {
                if (res.code == 0) {
                    cardPackage = 1;
                    $.toptip(res.msg, 2000, "error");
                    return;
                }
                if (!res.data.length) {
                    cardPackage = 1;
                    return;
                }
                loadCard(res, lib);
                if (tab1.title) {
                    title.push(tab1);
                }
                if (tab2.title) {
                    title.push(tab2);
                }
                _this.libArr = Object.assign({}, lib);
                if (title.length > 0) {
                    title[0].active = true;
                }
                _this.title = Object.assign({}, title);
                $.hideLoading();
            });
            //判定获取是否成功
            setTimeout(function () {
                if (cardPackage || title.length == 0) {
                    $.toptip("获取套餐失败", 2000, "error");
                    $.hideLoading();
                }
            }, 2500);
        }
    };
</script>