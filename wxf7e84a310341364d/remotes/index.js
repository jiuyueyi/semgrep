Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../consts/routes"), t = require("../utils/index");

function o() {
    return {
        "content-type": "application/json",
        Authorization: "Bearer ".concat(wx.getStorageSync("token")),
        "X-PackageName": "NeighborWallet",
        "X-Auth-Type": 2,
        "X-Auth-Token": "".concat(wx.getStorageSync("walletToken"))
    };
}

function r(e) {
    var t = {};
    if ((e = e.input) && "[object Object]" === Object.prototype.toString.call(e)) for (var o in e) t[o] = "[object Object]" === Object.prototype.toString.call(e[o]) ? JSON.stringify(e[o]) : e[o]; else t = JSON.stringify(e);
    return t;
}

exports.getHeader = o, exports.request = function(n) {
    var a = Object.assign({}, n, {
        url: (n.baseUrl || e.default.BASE_URL) + n.url,
        data: n.data ? r(n.data) : null,
        header: o()
    });
    return n.isWallet && (a.header["content-type"] = "application/x-www-form-urlencoded"), 
    new Promise(function(o, r) {
        wx.request(Object.assign({}, a, {
            success: function(t) {
                if (403 === t.statusCode) return wx.hideLoading(), void wx.showModal({
                    title: "下线通知",
                    content: "用户信息已失效，请重新登录",
                    showCancel: !1,
                    success: function(t) {
                        t.confirm && (wx.removeStorageSync("token"), wx.removeStorageSync("phone"), wx.removeStorageSync("userName"), 
                        wx.removeStorageSync("walletToken"), wx.removeStorageSync("walletId"), wx.removeStorageSync("linkedExps"), 
                        wx.redirectTo({
                            url: e.default.LOGIN
                        }));
                    }
                });
                t.data ? o(t.data) : r(t);
            },
            fail: function() {
                t.noticeMsg("网络请求失败，请重试");
            }
        }));
    });
}, exports.isSuccess = function(e) {
    return 1 === e.code;
};