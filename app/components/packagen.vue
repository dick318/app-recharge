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
            <div class="weui-tab__bd-item " v-bind:class="[index==0 ? 'weui-tab__bd-item--active' : '']"
                 v-for="(item,key, index) in libArr" v-bind:id="key" v-if="item.length>0">
                <div class="weui-panel weui-panel_access" v-if="libArr.tab5.length>0">
                    <div class="weui-panel__hd package_title title_one"
                         v-bind:class="[libArr.tab5.length>0 ? '' : 'hidden']">推荐套餐：
                    </div>
                    <div class="weui-panel__bd " v-for="tab1 in libArr.tab5">
                        <div class="weui-media-box weui-media-box_appmsg package_content" style="height: auto;"
                             @click="active(key, index)">
                            <div class="special">特惠
                                <div></div>
                            </div>
                            <div class="choose hidden">
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
                                <div class="weui-media-box__desc" v-if="tab1.is_infinite == '2'"
                                     style="font-size:12px ; display: block">
                                    {{tab1.text}}
                                </div>
                                <div class="price" style="margin-top: 2px;"><span class="yuan">￥</span><span
                                        class="prices">{{tab1.price}}</span></div>
                                <p class="weui-media-box__desc old_price">￥{{tab1.old_price}}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="weui-panel weui-panel_access margin">
                    <div class="weui-panel__hd package_title"><span
                            v-bind:class="[libArr.tab5.length>0 ? '' : 'hidden']">普通套餐：</span></div>
                    <div class="weui-panel__bd " v-for="(tab1, index) in item">
                        <div href=""
                             class="weui-media-box weui-media-box_appmsg package_content" style="height: auto;"
                             @click="active(key, index)" v-bind:class="[tab1.active==true ? 'active' : '']">
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
                                <div class="weui-media-box__desc" v-if="tab1.is_infinite == '2'"
                                     style="font-size:12px ; display: block">
                                    {{tab1.text}}
                                </div>
                                <div class="price" style="margin-top: 2px;"><span class="yuan">￥</span><span
                                        class="prices">{{tab1.price}}</span></div>
                                <p class="weui-media-box__desc old_price">￥{{tab1.old_price}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="goPage" v-on:click="order">
                <!-- <div type="button" id="nextRecharge" class="hidden">订购次月</div> -->
                <div type="button" id="goRecharge">确认订购</div>
            </div>
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
        font-size: 14px !important;
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
        font-size: 16px;
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
</style>

<script>
    import c from "../index";

    export default {
        data() {
            return {
                libArr: {
                    tab1: [],
                    tab2: [],
                    tab3: [],
                    tab4: [],
                    tab5: []
                },
                title: {
                    tab1: [],
                    tab2: [],
                    tab3: [],
                    tab4: []
                },
                id: "",
                aid: sessionStorage.getItem("aid"),
                price: "",
                packagename: "",
                flag: "",
                bindType: ""
            };
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
                if (this.bindType == 2) {
                    this.addType();
                } else {
                    this.add(0);
                }
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
                        sessionStorage.setItem("pay", "false");
                        sessionStorage.setItem("packagename", _this.packagename);
                        sessionStorage.setItem("order_type", "");
                        sessionStorage.setItem("flag", _this.flag);
                        sessionStorage.setItem("money", _this.price);
                        if (data.data.link && _this.aid != null) {
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
                );
            },
            addType: function () {
                const _this = this;
                const lidArr = [24, 32, 33];
                $.confirm({
                    title: "请选择生效时间",
                    text: "1",
                    onOK: function () {
                        var type = $.trim(
                            $(".activeType")
                                .find("p")
                                .data("bind")
                        );
                        const lid = sessionStorage.getItem("lid");
                        const operator_type = sessionStorage.getItem("operator_type");
                        if (!type) {
                            $.toptip("请选择生效时间", 2000, "error");
                            _this.addType();
                            return false;
                        }
                        if (type == 1) {
                            if (c.contains(lidArr, +lid)) {
                                _this.add(3);
                            } else {
                                _this.add(1);
                            }
                        } else if (type == 2) {
                            _this.add(2);
                        }
                    }
                });
                $(".weui-dialog__bd").html(
                    '<div class=" weui-cells_radio" style="padding-left: 30px;">' +
                    '      <label class="weui-cell weui-check__label" for="x11">' +
                    '        <div class="weui-cell__bd">' +
                    '          <p data-bind="1" style="color: #4d4d4d;">立即生效</p>' +
                    "        </div>" +
                    '        <div class="weui-cell__ft" style="width: 24px;">' +
                    '          <input type="radio" class="weui-check" name="radio1" id="x11">' +
                    '          <span class="weui-icon-checked"></span>' +
                    "        </div>" +
                    "      </label>" +
                    '      <label class="weui-cell weui-check__label" for="x12">' +
                    '        <div class="weui-cell__bd">' +
                    '          <p data-bind="2"  style="color: #4d4d4d;">次月生效</p>' +
                    "        </div>" +
                    '        <div class="weui-cell__ft" style="width: 24px;">' +
                    '          <input type="radio" name="radio1" class="weui-check" id="x12">\n' +
                    '          <span class="weui-icon-checked"></span>' +
                    "        </div>" +
                    "      </label>" +
                    "    </div>"
                );
                $(".weui-check__label").click(function () {
                    $(this)
                        .addClass("activeType")
                        .siblings()
                        .removeClass("activeType");
                });
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
                tab3: [],
                tab4: [],
                tab5: []
            };
            let title = [];
            let tab1 = {title: "", url: "tab1", active: false};
            let tab2 = {title: "", url: "tab2", active: false};
            let tab3 = {title: "", url: "tab3", active: false};
            let tab4 = {title: "", url: "tab4", active: false};
            const nextType = [123, 125, 137, 140, 143, 145, 152, 153, 159, 167];
            const order = [168];
            //大小流量池
            const allType = [113, 118, 127, 141, 142, 154];
            //30天
            const lid_next = [22, 23, 31, 24, 34];
            //套餐分类，大小流量池
            const lid_free = [24, 33, 32];
            //套餐分类，随意叠
            const lid_all = [32];
            const lid_speed = [31];
            //套餐分类，随意订，增加时长
            const lid_add = [35];
            //套餐分类，电信30元无限量套餐
            const delay = [188, 184];
            //延迟生效供应商
            const type = c.contains(lid_next, +lid) || lid == 24;

            //type为真时三列固定，多月，叠加，否为月季半年年。
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

            psw();

            function loadFlow(data) {
                if (type) {
                    if (data.is_infinite == 2) {
                        if (data.usetime == 30) {
                            data.tabNo = 1;
                        } else {
                            data.tabNo = 2;
                        }
                        data.flow = "∞";
                    } else if (data.flow / 1024 >= 1) {
                        if (data.usetime == 30 && data.base == 1) {
                            data.tabNo = 3;
                        } else if (data.usetime > 30 && data.base == 1) {
                            data.tabNo = 2;
                            data.is_infinite = 2;
                        } else {
                            data.tabNo = 1;
                            data.is_infinite = 2;
                        }
                        data.flow = Math.floor(data.flow / 1024) + "G";
                    } else {
                        if (data.usetime == 30 && data.base == 1) {
                            data.tabNo = 3;
                        } else if (data.usetime == 30 && data.base == 2) {
                            data.tabNo = 1;
                            data.is_infinite = 2;
                        }
                        data.flow = parseInt(data.flow) + "M";
                    }
                } else {
                    if (data.is_infinite == 2) {
                        data.flow = "∞";
                    } else if (data.flow / 1024 >= 1) {
                        data.flow = Math.floor(data.flow / 1024) + "G";
                    } else {
                        data.flow = parseInt(data.flow) + "M";
                    }
                }
                if(c.contains(lid_add, +lid)){
                    data.usetime = "(" + data.usetime + "天有效" + ")";
                }else if (data.usetime == 7) {
                    data.usetime = "(" + "当月7天有效" + ")";
                } else if (data.usetime == 30) {
                    if (operatorid == 105 || c.contains(allType, +operatorid)) {
                        data.usetime = "(" + "30天有效" + ")";
                    } else if (
                        c.contains(nextType, +operatorid) ||
                        c.contains(lid_speed, +lid)
                    ) {
                        data.usetime = "";
                    } else {
                        data.usetime = "(" + "当月有效" + ")";
                    }
                } else {
                    data.usetime = "(" + data.usetime + "天有效" + ")";
                }
            }

            function loadCard(res, lib) {
                $.each(res.data, function (i, data) {
                    loadFlow(data);
                    data.active = false;
                    data.addType = 1;
                    if (data.is_dis == 1) {
                        if (type) {
                            switch (data.tabNo) {
                                case 1:
                                    lib["tab1"].push(res.data[i]);
                                    tab1.title = "固定套餐";
                                    if (
                                        sessionStorage.getItem("type") == 4 ||
                                        lid == 24
                                    ) {
                                        data.addType = 2;
                                    }
                                    break;
                                case 2:
                                    lib["tab2"].push(res.data[i]);
                                    tab2.title = "普通多月套餐";
                                    break;
                                case 3:
                                    lib["tab3"].push(res.data[i]);
                                    tab3.title = "叠加套餐";
                                    break;
                                default:
                                    break;
                            }
                        }
                    } else {
                        lib["tab5"].push(res.data[i]);
                    }
                });
                return lib;
            }

            //对套餐进行分类
            function loadType(res, lib) {
                $.each(res.data, function (i, data) {
                    loadFlow(data);
                    data.active = false;
                    data.addType = 1;
                    if (data.is_dis == 1) {
                        switch (data.type) {
                            case "1":
                                lib["tab1"].push(res.data[i]);
                                if (operatorid == 160 || c.contains(lid_all, +lid)) {
                                    data.addType = 2;
                                    tab1.title = "移动小王卡";
                                } else if(c.contains(lid_add, +lid)){
                                    tab1.title = "限时不限量套餐";
                                }
                                else{
                                    tab1.title = "月套餐";
                                }
                                if (c.contains(lid_speed, +lid) && type == 4) {
                                    data.addType = 2;
                                }
                                if (c.contains(lid_free, +lid)) {
                                    data.addType = 2;
                                }
                                break;
                            case "4":
                                lib["tab1"].push(res.data[i]);
                                tab1.title = "月套餐";
                                break;
                            //月包叠加包
                            case "2":
                                lib["tab2"].push(res.data[i]);
                                tab2.title = "季包";
                                break;
                            //季包
                            case "5":
                                lib["tab3"].push(res.data[i]);
                                tab3.title = "半年包";
                                break;
                            //半年
                            case "3":
                                lib["tab4"].push(res.data[i]);
                                tab4.title = "年包";
                                //年包
                                break;
                            default:
                                break;
                        }
                    } else {
                        var timestamp = Math.round(new Date().getTime() / 1e3);
                        if (timestamp < res.data[i].p_endtime) {
                            lib["tab5"].push(res.data[i]);
                        }
                    }
                });
                return lib;
            }

            //获取普通套餐
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

                if (type) {
                    loadCard(res, lib);
                } else {
                    loadType(res, lib);
                }
                if (tab1.title) {
                    title.push(tab1);
                } else {
                    delete lib.tab1;
                }
                if (tab2.title) {
                    title.push(tab2);
                } else {
                    delete lib.tab2;
                }
                if (tab3.title) {
                    title.push(tab3);
                } else {
                    delete lib.tab3;
                }
                if (tab4.title) {
                    title.push(tab4);
                } else {
                    delete lib.tab4;
                }
                _this.libArr = Object.assign({}, lib);
                title[0].active = true;
                _this.title = Object.assign({}, title);
                $.hideLoading();
            });
            //判定获取是否成功
            setTimeout(function () {
                if (cardPackage) {
                    $.toptip("获取套餐失败", 2000, "error");
                    $.hideLoading();
                }
            }, 4000);
        }
    };
</script>