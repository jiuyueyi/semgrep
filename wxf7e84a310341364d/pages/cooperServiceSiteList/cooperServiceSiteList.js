Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../../consts/routes"), t = require("../../remotes/Best.LaiQu.NeighborWebApi/neighborServiceSite/getCooperationSsList");

getApp();

Page({
    data: {
        serviceSitesData: null
    },
    onShow: function() {
        this.getCooperServiceSitesList();
    },
    getCooperServiceSitesList: function() {
        var e = this;
        wx.showLoading({
            title: "请求中..."
        }), t.default().then(function(t) {
            wx.hideLoading(), wx.stopPullDownRefresh(), e.setData({
                serviceSitesData: t.data
            });
        });
    },
    goToOtherPage: function(t) {
        var i = t.currentTarget.dataset.url || t.detail.type;
        wx.navigateTo({
            url: e.default[i]
        });
    },
    onPullDownRefresh: function() {
        this.getCooperServiceSitesList();
    }
});