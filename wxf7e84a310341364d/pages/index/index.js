Object.defineProperty(exports, "__esModule", {
    value: !0
});

require("../../remotes/Best.LaiQu.NeighborWebApi/wallet/getUserInfo");

var e = require("../../remotes/Best.LaiQu.NeighborWebApi/neighborServiceSite/getSsListSummery"), t = require("../../consts/routes"), a = require("../../remotes/Best.LaiQu.NeighborWebApi/wallet/getUserStatus"), r = require("../../remotes/Best.LaiQu.NeighborWebApi/agreement/query"), i = require("moment"), s = require("../../remotes/Best.LaiQu.NeighborWebApi/bill/queryBill");

getApp();

Page({
    data: {
        userName: "",
        walletInfo: null,
        serviceSitesSummeryData: null,
        linkModal: !0,
        billList: [],
        signObj: {},
        newUserModal: !1,
        oldUserModal: !1
    },
    onShow: function() {
        var e = wx.getStorageSync("userName");
        this.setData({
            userName: e
        }), this.getCooperatedServiceSites(), this.setData({
            oldUserModal: !1,
            newUserModal: !1
        }), this.searchStatus(), this.searchBillList();
    },
    searchStatus: function() {
        var e = this;
        r.default({
            externalAgreementNo: wx.getStorageSync("neighborUserId")
        }).then(function(t) {
            e.setData({
                signObj: t.data
            }), t.data.code && "40004" === t.data.code && a.default().then(function(t) {
                "boolean" == typeof t.data && e.setData({
                    oldUserModal: !t.data,
                    newUserModal: t.data
                });
            });
        });
    },
    moreBill: function(e) {
        var a = e.currentTarget.dataset.url;
        wx.navigateTo({
            url: t.default[a]
        });
    },
    closeModal: function() {
        this.setData({
            linkModal: !1
        }), wx.navigateTo({
            url: t.default.ALIPAYWITHHOLD
        });
    },
    goDetails: function(e) {
        var t = e.currentTarget.dataset.item;
        wx.navigateTo({
            url: "/pages/billDetailNew/index?id=" + t.billNumber
        });
    },
    searchBillList: function() {
        var e = this, t = i().subtract(90, "days").format("YYYY-MM-DD"), a = i().format("YYYY-MM-DD"), r = t;
        new Date("2022-06-01").getTime() > new Date(t).getTime() && (r = "2022-06-01"), 
        s.default({
            startDate: r,
            endDate: a,
            size: 3,
            page: 1
        }).then(function(t) {
            e.setData({
                billList: t.data
            });
        });
    },
    getCooperatedServiceSites: function() {
        var t = this;
        wx.showLoading({
            title: "请求中..."
        }), e.default().then(function(e) {
            wx.hideLoading(), t.setData({
                serviceSitesSummeryData: e.data
            });
        });
    },
    goToOtherPage: function(e) {
        var a = e.currentTarget.dataset.url;
        console.log(a), wx.navigateTo({
            url: t.default[a]
        });
    }
});