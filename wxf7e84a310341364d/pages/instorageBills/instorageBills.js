Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../../remotes/Best.LaiQu.NeighborWebApi/neighborWallet/getInstorageReceiveList"), t = require("../../utils/index"), a = getApp();

Page({
    data: {
        isFilterClick: !1,
        pages: 0,
        query: {
            serviceSiteCode: "",
            billCode: "",
            tradeType: 4,
            payTimeBegin: "",
            payTimeEnd: "",
            expressCodeList: [],
            page: 1,
            size: 20
        },
        linkedExpressList: [],
        instorageTraceList: [],
        filterExpressCodes: []
    },
    onLoad: function(e) {
        var t = e.payTime, a = e.serviceSiteCode, i = this.data.query, s = wx.getStorageSync("linkedExps");
        i.serviceSiteCode = a, i.payTimeBegin = t / 1e3, i.payTimeEnd = i.payTimeBegin + 86399, 
        this.setData({
            linkedExpressList: s
        }), this.handleReset();
    },
    getInstorageBillRecords: function() {
        var a = this, i = this.data, s = i.query, r = i.instorageTraceList;
        wx.showLoading({
            title: "请求中..."
        }), e.default(s).then(function(e) {
            wx.hideLoading();
            var i = e.data, l = i.pages, o = i.total;
            r = 1 === s.page ? t.deepCopy(e.data.instorageTraceList) : r.concat(e.data.instorageTraceList), 
            a.setData({
                instorageTraceList: r,
                pages: l,
                total: o
            });
        });
    },
    handleFilterShow: function() {
        this.setData({
            isFilterClick: !0
        });
    },
    handleFilterClose: function() {
        var e = this.data.query;
        this.setData({
            filterExpressCodes: e.expressCodeList,
            isFilterClick: !1
        });
    },
    handleExpressFilter: function(e) {
        var t = e.currentTarget.dataset.code, a = this.data.filterExpressCodes;
        if (t) {
            var i = a.indexOf(t);
            i >= 0 ? a.splice(i, 1) : a.push(t);
        } else a = [];
        this.setData({
            filterExpressCodes: a
        });
    },
    handleReset: function() {
        var e = this.data, t = e.query, a = e.filterExpressCodes;
        t.page = 1, t.expressCodeList = [], a = [], t.tradeType = 4, this.setData({
            query: t,
            isFilterClick: !1,
            filterExpressCodes: a
        }, this.getInstorageBillRecords);
    },
    handleMakeSure: function() {
        var e = this.data, t = e.query, a = e.filterExpressCodes;
        t.page = 1, t.expressCodeList = a, t.billCode = "", this.selectComponent("#search")._handleClearInput(), 
        this.setData({
            query: t,
            isFilterClick: !1
        }, this.getInstorageBillRecords);
    },
    onReachBottom: function() {
        var e = this.data, t = e.pages, a = e.query;
        a.page < t && (a.page++, this.setData({
            query: a
        }, this.getInstorageBillRecords));
    },
    goDetails: function(e) {
        var t = e.currentTarget.dataset.index, i = this.data.instorageTraceList[t];
        a.globalData.billDetailData = i, wx.navigateTo({
            url: "/pages/billDetails/billDetails"
        });
    },
    handleSearch: function(e) {
        var t = e.detail.value, a = this.data.query;
        a.page = 1, a.billCode = t, this.setData({
            query: a
        }, this.getInstorageBillRecords);
    }
});