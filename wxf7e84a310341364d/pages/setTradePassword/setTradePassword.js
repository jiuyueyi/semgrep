var e = require("../../@babel/runtime/helpers/defineProperty");

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = require("../../remotes/Best.LaiQu.NeighborWebApi/wallet/setTradePassword"), a = require("../../utils/index"), s = require("md5"), o = getApp();

Page({
    _forgetPswCode: !1,
    data: {
        password: "",
        secondPsw: "",
        isPswVisible: !1,
        isSecondPswVisible: !1,
        hasPaymentCode: !1
    },
    onLoad: function(e) {
        var t = e.forgetPswCode, a = wx.getStorageSync("hasPaymentCode");
        this._forgetPswCode = t || "", this.setData({
            hasPaymentCode: a
        }, function() {
            var e = a ? "修改交易密码" : "设置交易密码";
            wx.setNavigationBarTitle({
                title: e
            });
        });
    },
    handlePasswordVisible: function(t) {
        var a = t.currentTarget.dataset, s = a.visibleType, o = a.visibleValue;
        this.setData(e({}, s, !o));
    },
    handleInputChange: function(t) {
        var a = t.detail.value, s = t.currentTarget.dataset.type;
        a = a.replace(/[^\d.]/g, ""), this.setData(e({}, s, a));
    },
    handleSubmit: function() {
        var e = this.data, t = e.password, i = e.secondPsw, r = e.hasPaymentCode;
        if (/^\d{6}$/g.test(t)) if (t === i) {
            var n = wx.getStorageSync("walletId"), d = {
                walletUserId: n,
                newTradePassword: s("".concat(n).concat(t)).toUpperCase()
            };
            if (wx.showLoading({
                title: "请求中..."
            }), this._forgetPswCode) return d.code = this._forgetPswCode, void this.getSetPswResult(d);
            r && (d.oldTradePassword = s("".concat(n).concat(o.globalData.tradePassword)).toUpperCase()), 
            this.getSetPswResult(d);
        } else a.noticeMsg("两次密码不一致，请重新输入"); else a.noticeMsg("密码格式错误，交易密码为6位数字");
    },
    getSetPswResult: function(e) {
        t.default({
            param: e
        }).then(function() {
            wx.hideLoading(), a.noticeMsg("操作成功", "none", 2e3, function() {
                wx.setStorageSync("hasPaymentCode", !0), setTimeout(function() {
                    return wx.navigateBack({
                        delta: 1
                    });
                }, 1e3);
            });
        });
    }
});