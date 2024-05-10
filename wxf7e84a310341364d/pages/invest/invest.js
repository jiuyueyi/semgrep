Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../../remotes/Best.LaiQu.NeighborWebApi/neighborWallet/createNeighborRechargeOrder"), t = require("../../utils/index");

Page({
    data: {
        phone: ""
    },
    onLoad: function() {
        var e = wx.getStorageSync("phone") || "";
        this.setData({
            phone: e
        });
    },
    handleSubmitInvest: function(a) {
        var n = a.detail.value.totalFee;
        n <= 0 ? t.noticeMsg("充值金额必须大于0") : (wx.showLoading({
            title: "请求中..."
        }), wx.login({
            success: function(a) {
                if (a.code) {
                    var i = {
                        wxCode: a.code,
                        dealType: "WXWEB",
                        totalFee: n
                    };
                    e.default(i).then(function(e) {
                        wx.hideLoading();
                        var a = e.data.payStr, n = JSON.parse(a);
                        wx.requestPayment({
                            timeStamp: n.timestamp,
                            nonceStr: n.noncestr,
                            package: n.package,
                            signType: n.signtype,
                            paySign: n.paysign,
                            success: function() {
                                t.noticeMsg("充值成功", "none", 2e3, function() {
                                    wx.navigateBack({
                                        delta: 1
                                    });
                                });
                            },
                            fail: function() {
                                t.noticeMsg("充值失败");
                            }
                        });
                    });
                }
            }
        }));
    }
});