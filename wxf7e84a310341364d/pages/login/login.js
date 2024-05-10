Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../../utils/index"), t = require("../../consts/errorCode"), o = require("../../remotes/Best.LaiQu.NeighborWebApi/neighborAccount/login"), n = require("../../consts/routes"), i = require("../../remotes/index");

Page({
    data: {
        phoneCode: ""
    },
    onLoad: function() {
        (wx.getStorageSync("token") || null) && wx.switchTab({
            url: n.default.INDEX
        });
    },
    getPhoneNumber: function(e) {
        e.detail.code && (this.setData({
            phoneCode: e.detail.code
        }), this.handleLogin());
    },
    handleLogin: function() {
        var e = this;
        wx.login({
            success: function(t) {
                e.handleWXLogin(t.code);
            }
        });
    },
    handleWXLogin: function(a) {
        wx.showLoading({
            title: "请求中..."
        }), o.default({
            wxCode: a,
            mobile: this.data.phoneCode
        }).then(function(o) {
            if (wx.hideLoading(), i.isSuccess(o)) {
                var a = o.data;
                wx.setStorageSync("phone", a.phone || ""), wx.setStorageSync("userName", a.userName), 
                wx.setStorageSync("token", a.token), wx.setStorageSync("walletToken", a.walletToken), 
                wx.setStorageSync("walletId", a.walletId), wx.setStorageSync("linkedExps", a.expressCompanies), 
                wx.setStorageSync("neighborUserId", a.neighborUserId), wx.switchTab({
                    url: n.default.INDEX
                });
            } else {
                if (o.code === t.USER_NOT_EXIT) return void wx.navigateTo({
                    url: n.default.REGISTER
                });
                e.noticeMsg(o.msg);
            }
        });
    },
    handleLoginToast: function() {
        wx.showModal({
            title: "登录说明",
            showCancel: !1,
            content: "1.该小程序仅供邻里驿站内部使用，不对外开放;2.该小程序需要用户微信登录账号，绑定手机，获取用户充值记录等；"
        });
    }
});