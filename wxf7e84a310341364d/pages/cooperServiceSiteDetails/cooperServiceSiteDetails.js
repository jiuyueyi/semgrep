Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../../consts/routes"), t = require("../../remotes/Best.LaiQu.NeighborWebApi/neighborServiceSite/cancelSsCooperation"), i = require("../../remotes/Best.LaiQu.NeighborWebApi/neighborServiceSite/getServiceSiteDetail"), o = require("../../utils/index"), a = getApp();

Page({
    _serviceSiteCode: "",
    data: {
        serviceSiteData: null
    },
    onLoad: function(e) {
        var t = e.serviceSiteCode;
        this._serviceSiteCode = t;
    },
    onShow: function() {
        this.getDetailsResult();
    },
    getDetailsResult: function() {
        var e = this;
        wx.showLoading({
            title: "请求中..."
        }), i.default({
            serviceSiteCode: this._serviceSiteCode
        }).then(function(t) {
            wx.hideLoading(), e.setData({
                serviceSiteData: t.data
            });
        });
    },
    handleCancel: function() {
        var e = this;
        wx.showModal({
            title: "提示",
            content: "是否确认取消合作服务点",
            showCancel: !0,
            cancelText: "关闭",
            cancelColor: "#000000",
            confirmText: "取消合作",
            confirmColor: "#F83C29",
            success: function(t) {
                t.confirm && e.handleCancelCooper();
            }
        });
    },
    handleCancelCooper: function() {
        var e = this.data.serviceSiteData.serviceSiteCode;
        t.default({
            serviceSiteCode: e
        }).then(function() {
            o.noticeMsg("取消成功", "none", 2e3, function() {
                setTimeout(function() {
                    wx.navigateBack({
                        delta: 1
                    });
                }, 1e3);
            });
        });
    },
    goEditPage: function() {
        var t = this.data.serviceSiteData;
        a.globalData.cooperServiceSiteDetails = JSON.stringify(t), wx.navigateTo({
            url: "".concat(e.default.ADD_COOPER_SERVICE_SITE, "?isEdit=1")
        });
    }
});