var e = require("../../@babel/runtime/helpers/defineProperty");

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = require("../../utils/index"), a = require("../../consts/const"), i = require("../../consts/routes"), s = require("../../remotes/Best.LaiQu.WebApi.LqApi/smsCaptcha/getSmsCaptcha"), n = require("../../remotes/Best.LaiQu.NeighborWebApi/neighborAccount/getExpCompanyList"), o = require("../../remotes/Best.LaiQu.NeighborWebApi/neighborAccount/registerUser"), c = require("../../remotes/Best.LaiQu.NeighborWebApi/neighborAccount/registerWallet"), r = require("../../remotes/Best.LaiQu.NeighborWebApi/neighborAccount/getValidateCaptchaForMini"), h = require("../../remotes/index");

Page({
    _timer: 0,
    _waitTime: 59,
    _getWXPhoneData: {
        encryptedData: null,
        iv: null
    },
    data: {
        userName: "",
        mobile: "",
        smsCode: "",
        captchaTimer: "验证码",
        isCaptchaClick: !1,
        isRejectWXPhone: !1,
        isCaptchaShow: !1,
        expressCompanyList: [],
        selectedExps: [],
        sureSelectedExps: [],
        PIC_CAPTCHA_APPKEY: a.PIC_CAPTCHA_APPKEY,
        PIC_CAPTCHA_URL: i.default.PIC_CAPTCHA_URL,
        selectExpPop: !1,
        isGetWXPhone: !1,
        OSS_URL: i.OSS_URL,
        ticket: "",
        requestId: ""
    },
    onLoad: function() {
        this.getExpressList();
    },
    onUnload: function() {
        clearTimeout(this._timer);
    },
    getExpressList: function() {
        var e = this;
        wx.showLoading({
            title: "请求中..."
        }), n.default().then(function(t) {
            wx.hideLoading(), e.setData({
                expressCompanyList: t.data
            });
        });
    },
    getCaptchaNum: function() {
        var e = this.data, a = e.isCaptchaClick, i = e.mobile;
        if (!a) {
            if (!/^1\d{10}$/g.test(i)) return void t.noticeMsg("请输入正确的手机号");
            this.selectComponent("#captcha").show();
        }
    },
    handlePicCaptchaShow: function() {
        var e = this.data.isCaptchaShow;
        this.setData({
            isCaptchaShow: !e
        });
    },
    handlerVerify: function(e) {
        console.log(e), 0 === e.detail.ret && (this.setData({
            ticket: e.detail.ticket
        }), this.validateCaptchaForMini());
    },
    handlerReady: function() {
        console.log("验证码准备就绪");
    },
    validateCaptchaForMini: function() {
        var e = this;
        r.default({
            ticket: this.data.ticket
        }).then(function(t) {
            1 == t.code && (e.setData({
                requestId: t.data
            }), e.handleCaptchaSuccess());
        });
    },
    handleCaptchaSuccess: function(e) {
        var t = this, a = this.data, i = {
            mobile: a.mobile,
            requestId: a.requestId,
            type: "RegisterNeighbor"
        };
        this.setData({
            isCaptchaShow: !1
        }), wx.showLoading({
            title: "请求中..."
        }), s.default(i).then(function() {
            wx.hideLoading(), t.handleCountDown();
        });
    },
    handleCountDown: function() {
        this._waitTime < 0 ? (this._waitTime = 59, this.setData({
            captchaTimer: "重新发送",
            isCaptchaClick: !1
        }), clearTimeout(this._timer)) : (this.setData({
            captchaTimer: this._waitTime + "S",
            isCaptchaClick: !0
        }), this._waitTime--, this._timer = setTimeout(this.handleCountDown, 1e3));
    },
    handleInputChange: function(t) {
        var a = t.detail.value, i = t.currentTarget.dataset.type;
        if ("userName" === i) {
            var s = /[\u4e00-\u9fa5a-zA-Z]/g;
            a = a.match(s) ? a.match(s).join("") : "";
        }
        this.setData(e({}, i, a));
    },
    handleGetWXPhones: function(e) {
        if ("getPhoneNumber:ok" === e.detail.errMsg) {
            var t = e.detail, a = t.encryptedData, i = t.iv;
            this._getWXPhoneData = {
                encryptedData: a,
                iv: i
            }, this.setData({
                isRejectWXPhone: !1,
                isGetWXPhone: !0
            });
        } else this._getWXPhoneData = {
            encryptedData: null,
            iv: null
        }, this.setData({
            isRejectWXPhone: !0,
            isGetWXPhone: !1
        });
    },
    handleExpressPop: function() {
        this.setData({
            selectExpPop: !0
        });
    },
    handleCheckChange: function(e) {
        var t = e.detail.value, a = this.data.expressCompanyList, i = [];
        t.map(function(e) {
            i = i.concat(a.filter(function(t) {
                return e === t.expressCode;
            }));
        }), this.setData({
            selectedExps: i
        });
    },
    handlePopClose: function() {
        var e = this.data.sureSelectedExps;
        this.setData({
            selectedExps: e
        });
    },
    handleChangeExps: function() {
        var e = this.data.selectedExps;
        this.setData({
            sureSelectedExps: e,
            selectExpPop: !1
        });
    },
    handleRegister: function() {
        var e = this;
        wx.login({
            success: function(t) {
                wx.showLoading({
                    title: "请求中..."
                });
                var a = e.data, s = a.userName, n = a.sureSelectedExps, c = a.mobile, r = a.smsCode, h = a.isGetWXPhone, l = {
                    userName: s,
                    expCompanys: n,
                    wxCode: t.code
                };
                h ? (l.iv = e._getWXPhoneData.iv, l.encryptedData = e._getWXPhoneData.encryptedData) : (l.mobile = c, 
                l.smsCode = r), o.default(l).then(function(e) {
                    var t = e.data;
                    wx.setStorageSync("phone", t.phone), wx.setStorageSync("userName", t.userName), 
                    wx.setStorageSync("token", t.token), wx.setStorageSync("linkedExps", t.expressCompanies), 
                    wx.switchTab({
                        url: i.default.INDEX
                    });
                });
            }
        });
    },
    handleRegisterWallet: function() {
        var e = this;
        c.default().then(function(t) {
            if (wx.hideLoading(), h.isSuccess(t)) {
                var a = t.data;
                wx.setStorageSync("walletToken", a.walletToken), wx.setStorageSync("walletId", a.walletId), 
                wx.switchTab({
                    url: i.default.INDEX
                });
            } else wx.showModal({
                title: "提示",
                content: "钱包注册失败",
                showCancel: !0,
                cancelText: "返回登录页",
                confirmText: "重新注册",
                success: function(t) {
                    t.confirm ? e.handleRegisterWallet() : t.cancel && wx.navigateBack({
                        delta: 1
                    });
                }
            });
        });
    }
});