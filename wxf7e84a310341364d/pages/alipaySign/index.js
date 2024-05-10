var e = require("../../remotes/Best.LaiQu.NeighborWebApi/agreement/query"), t = require("../../remotes/Best.LaiQu.NeighborWebApi/agreement/signQrcode"), n = require("../../remotes/Best.LaiQu.NeighborWebApi/agreement/shareToken"), a = require("../../remotes/Best.LaiQu.NeighborWebApi/agreement/unsign"), o = require("../../utils/index");

Page({
    data: {
        linkModal: !1,
        Qrcode: "",
        shareToken: "",
        signObj: {}
    },
    onLoad: function(e) {
        this.searchStatus();
    },
    searchStatus: function() {
        var t = this;
        e.default({
            externalAgreementNo: wx.getStorageSync("neighborUserId")
        }).then(function(e) {
            t.setData({
                signObj: e.data
            });
        });
    },
    handlePopClose: function() {
        this.setData({
            linkModal: !1
        }), this.searchStatus();
    },
    copyText: function(e) {
        var t = e.currentTarget.dataset.zhitext;
        wx.setClipboardData({
            data: t
        });
    },
    searchSignQrcode: function() {
        var e = this;
        t.default({
            externalAgreementNo: wx.getStorageSync("neighborUserId")
        }).then(function(t) {
            e.setData({
                Qrcode: t.data.replace(/[\r\n]/g, "")
            });
        });
    },
    searchShareToken: function() {
        var e = this;
        n.default({
            externalAgreementNo: wx.getStorageSync("neighborUserId")
        }).then(function(t) {
            e.setData({
                shareToken: t.data
            });
        });
    },
    openModal: function() {
        this.searchSignQrcode(), this.searchShareToken(), this.setData({
            linkModal: !0
        });
    },
    unsignBtn: function() {
        var e = this;
        wx.showModal({
            title: "提示",
            content: "是否解除绑定?",
            success: function(t) {
                t.confirm && a.default({
                    externalAgreementNo: wx.getStorageSync("neighborUserId"),
                    alipayUserId: e.data.signObj.principalId
                }).then(function(e) {
                    1 === e.code && (o.noticeMsg("解约成功"), setTimeout(function() {
                        wx.navigateBack({
                            delta: 1
                        });
                    }, 1500));
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});