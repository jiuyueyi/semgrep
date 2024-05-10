Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../../remotes/Best.LaiQu.NeighborWebApi/neighborAccount/getUserInfo"), t = require("../../remotes/Best.LaiQu.NeighborWebApi/neighborAccount/getExpCompanyList"), a = require("../../remotes/Best.LaiQu.NeighborWebApi/neighborAccount/updateUserName"), n = require("../../remotes/Best.LaiQu.NeighborWebApi/neighborAccount/updateUserExps"), o = require("../../remotes/Best.LaiQu.NeighborWebApi/wallet/checkTradePassword"), s = require("../../utils/index"), i = require("../../consts/routes"), r = require("../../consts/const"), u = require("md5"), p = getApp();

Page({
    _inputComponent: null,
    data: {
        personalData: null,
        selectExpPop: !1,
        expressCompanyList: [],
        expressCompanies: [],
        hasPaymentCode: !1,
        tradePswInputPop: !1,
        changeNamePop: !1,
        changeNameValue: "",
        OSS_URL: i.OSS_URL
    },
    onLoad: function() {
        this._inputComponent = this.selectComponent("#inputFrame");
    },
    onShow: function() {
        var e = this.data.expressCompanyList, t = wx.getStorageSync("hasPaymentCode") || null;
        this.setData({
            hasPaymentCode: t
        }), this.getPersonalData(), e && 0 !== e.length || this.getExpressList();
    },
    getPersonalData: function() {
        var t = this;
        wx.showLoading({
            title: "请求中..."
        }), e.default().then(function(e) {
            wx.hideLoading(), wx.setStorageSync("phone", e.data.phone), wx.setStorageSync("userName", e.data.userName), 
            wx.setStorageSync("linkedExps", e.data.expressCompanies), t.setData({
                personalData: e.data
            });
        });
    },
    getExpressList: function() {
        var e = this;
        wx.showLoading({
            title: "请求中..."
        }), t.default().then(function(t) {
            wx.hideLoading(), e.setData({
                expressCompanyList: t.data
            });
        });
    },
    handleChangeNamePop: function() {
        var e = this.data.personalData.userName;
        this.setData({
            changeNamePop: !0,
            changeNameValue: e
        });
    },
    handleInputChange: function(e) {
        var t = e.detail.value, a = /[\u4e00-\u9fa5a-zA-Z]/g;
        t = t.match(a) ? t.match(a).join("") : "", this.setData({
            changeNameValue: t
        });
    },
    handleChangeName: function() {
        var e = this, t = this.data.changeNameValue;
        t ? (wx.showLoading({
            title: "请求中..."
        }), a.default({
            userName: t
        }).then(function() {
            wx.hideLoading(), s.noticeMsg("修改成功", "none", 3e3, function() {
                setTimeout(function() {
                    return e.setData({
                        changeNamePop: !1
                    }, e.getPersonalData);
                }, 2e3);
            });
        })) : s.noticeMsg("姓名不能为空");
    },
    handleChangeExps: function() {
        var e = this, t = this.data.expressCompanies;
        n.default({
            expressCompanies: t
        }).then(function() {
            wx.hideLoading(), e.setData({
                selectExpPop: !1
            }, function() {
                return s.noticeMsg("修改成功", "none", 3e3, function() {
                    setTimeout(e.getPersonalData, 2e3);
                });
            });
        });
    },
    handleOpenFile: function() {
        var e = encodeURIComponent(r.HELP_URL);
        wx.navigateTo({
            url: "".concat(i.default.WEBVIEW, "?url=").concat(e)
        });
    },
    handleCheckChange: function(e) {
        var t = e.detail.value, a = this.data.expressCompanyList, n = [];
        t.map(function(e) {
            n = n.concat(a.filter(function(t) {
                return e === t.expressCode;
            }));
        }), this.setData({
            expressCompanies: n
        });
    },
    handleExpressPop: function() {
        var e = this.data.personalData.expressCompanies;
        this.setData({
            selectExpPop: !0,
            expressCompanies: e
        });
    },
    handlePopClose: function() {
        this.setData({
            expressCompanies: [],
            changeNamePop: !1
        });
    },
    handelSetPsw: function() {
        if (this.data.hasPaymentCode) return this._inputComponent.setValue(""), this._inputComponent.onClick(), 
        void this.setData({
            tradePswInputPop: !0
        });
        var e = i.default.SET_TRADE_PASSWORD;
        wx.navigateTo({
            url: e
        });
    },
    handleInputFinshed: function(e) {
        var t = this, a = e.detail, n = i.default.SET_TRADE_PASSWORD;
        wx.showLoading({
            title: "请求中..."
        });
        var r = wx.getStorageSync("walletId");
        o.default({
            request: {
                password: u("".concat(r).concat(a)).toUpperCase()
            }
        }).then(function() {
            wx.hideLoading(), s.noticeMsg("校验成功", "none", 2e3, function() {
                setTimeout(function() {
                    p.globalData.tradePassword = a, t._inputComponent.loseFocus(), t.setData({
                        tradePswInputPop: !1
                    }, function() {
                        return wx.navigateTo({
                            url: n
                        });
                    });
                }, 1e3);
            });
        });
    },
    handleForgetPsw: function() {
        var e = this.data.personalData, t = "".concat(i.default.PHONE_CAPTCHA, "?phone=").concat(e.phone, "&title=校验手机号&submitType=3");
        this._inputComponent.loseFocus(), this.setData({
            tradePswInputPop: !1
        }, function() {
            return wx.navigateTo({
                url: t
            });
        });
    },
    onTabItemTap: function() {
        this._inputComponent.loseFocus(), this.setData({
            selectExpPop: !1,
            tradePswInputPop: !1,
            changeNamePop: !1
        });
    }
});