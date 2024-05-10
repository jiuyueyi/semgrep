var e = require("../../@babel/runtime/helpers/defineProperty");

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = require("../../utils/index"), i = require("../../consts/const"), o = require("../../consts/routes"), a = require("../../remotes/Best.LaiQu.WebApi.LqApi/smsCaptcha/getSmsCaptcha"), n = require("../../remotes/Best.LaiQu.NeighborWebApi/neighborAccount/modifyPhone"), s = require("../../remotes/Best.LaiQu.NeighborWebApi/neighborAccount/verifyOrigPhone"), r = require("../../remotes/Best.LaiQu.NeighborWebApi/wallet/checksms"), c = require("../../remotes/Best.LaiQu.NeighborWebApi/wallet/getSetPswCaptcha"), h = require("../../remotes/Best.LaiQu.NeighborWebApi/neighborAccount/getValidateCaptchaForMini"), u = {
    CHECK_OLD_PHONE: 1,
    CHANGE_PHONE: 2,
    CHANGE_PASSWORD: 3
};

Page({
    _timer: 0,
    _waitTime: 59,
    data: {
        oldPhone: "",
        mobile: "",
        smsCode: "",
        captchaTimer: "验证码",
        isCaptchaClick: !1,
        isCaptchaShow: !1,
        PIC_CAPTCHA_APPKEY: i.PIC_CAPTCHA_APPKEY,
        PIC_CAPTCHA_URL: o.default.PIC_CAPTCHA_URL,
        submitType: u.CHECK_OLD_PHONEa,
        ticket: "",
        requestId: ""
    },
    onLoad: function(e) {
        var t = e.title, i = e.phone, o = e.submitType, a = e.oldMobile;
        t = t || "", i = i || "", o = Number(o) || 1, wx.setNavigationBarTitle({
            title: t
        }), this.setData({
            oldPhone: i,
            submitType: o,
            oldMobile: a
        });
    },
    handleInputChange: function(t) {
        var i = t.detail.value, o = t.currentTarget.dataset.type;
        this.setData(e({}, o, i));
    },
    getCaptchaNum: function() {
        var e = this.data, i = e.isCaptchaClick, o = e.mobile, a = e.oldPhone, n = /^1\d{10}$/g;
        if (!i) {
            if (!n.test(o) && !n.test(a)) return void t.noticeMsg("请输入正确的手机号");
            this.handlePicCaptchaShow();
        }
    },
    validateCaptchaForMini: function() {
        var e = this;
        h.default({
            ticket: this.ticket
        }).then(function(t) {
            1 == t.code && (e.requestId = t.data, e.handleCaptchaSuccess());
        });
    },
    handlePicCaptchaShow: function() {
        this.selectComponent("#captcha").show();
    },
    handlerVerify: function(e) {
        console.log(e), 0 === e.detail.ret && (this.ticket = e.detail.ticket, this.validateCaptchaForMini());
    },
    handlerReady: function() {
        console.log("验证码准备就绪");
    },
    handlerClose: function(e) {
        e && e.detail.ret && 2 === e.detail.ret ? console.log("点击了关闭按钮，验证码弹框准备关闭") : console.log("验证完成，验证码弹框准备关闭");
    },
    handlerError: function(e) {
        console.log(e.detail.errMsg);
    },
    handleCaptchaSuccess: function(e) {
        var t = this, i = this.data, o = i.mobile, n = i.oldPhone, s = i.submitType, r = {
            mobile: o || n,
            requestId: this.requestId,
            type: 2 === s ? "NeighborChangePhone" : "NeighborVerifyOrigPhone"
        };
        this.setData({
            isCaptchaShow: !1
        }), wx.showLoading({
            title: "请求中..."
        }), s !== u.CHANGE_PASSWORD ? a.default(r).then(function() {
            wx.hideLoading(), t.handleCountDown();
        }) : c.default({
            request: {
                validCodeType: 1
            }
        }).then(function() {
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
    handleOpenFile: function() {
        var e = encodeURIComponent(i.CANT_GET_CAPTCHA_HELP);
        wx.navigateTo({
            url: "".concat(o.default.WEBVIEW, "?url=").concat(e)
        });
    },
    handleSubmit: function() {
        var e = this.data, i = e.mobile, a = e.smsCode, c = e.oldPhone, h = e.submitType, l = e.oldMobile;
        console.log({
            submitType: h
        });
        var d = {
            smsCode: a
        };
        switch (wx.showLoading({
            title: "请求中..."
        }), h) {
          case u.CHECK_OLD_PHONE:
            s.default(d).then(function() {
                wx.hideLoading(), t.noticeMsg("校验成功", "none", 2e3, function() {
                    setTimeout(function() {
                        return wx.redirectTo({
                            url: "".concat(o.default.PHONE_CAPTCHA, "?title=更换手机号&submitType=2&oldMobile=").concat(c)
                        });
                    }, 1e3);
                });
            });
            break;

          case u.CHANGE_PHONE:
            d.mobile = i, d.oldMobile = l, n.default(d).then(function() {
                wx.hideLoading(), t.noticeMsg("修改成功", "none", 2e3, function() {
                    setTimeout(function() {
                        return wx.navigateBack({
                            delta: 1
                        });
                    }, 1e3);
                });
            });
            break;

          case u.CHANGE_PASSWORD:
            var C = {
                validCodeType: 1,
                code: a,
                phoneNumber: c
            };
            r.default({
                request: C
            }).then(function() {
                wx.hideLoading(), t.noticeMsg("校验成功", "none", 2e3, function() {
                    setTimeout(function() {
                        return wx.redirectTo({
                            url: "".concat(o.default.SET_TRADE_PASSWORD, "?forgetPswCode=").concat(a)
                        });
                    }, 1e3);
                });
            });
        }
    }
});