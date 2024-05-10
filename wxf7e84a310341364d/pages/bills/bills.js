var e = require("../../@babel/runtime/helpers/defineProperty");

Object.defineProperty(exports, "__esModule", {
    value: !0
});

require("../../remotes/Best.LaiQu.NeighborWebApi/neighborWallet/getNeighborTraceList");

var t = require("../../remotes/Best.LaiQu.NeighborWebApi/neighborServiceSite/getSsNameCodeList"), i = require("../../utils/index"), a = (getApp(), 
require("moment")), r = require("../../remotes/Best.LaiQu.NeighborWebApi/bill/queryBill");

Page({
    data: {
        isFilterClick: !1,
        pages: 0,
        query: {
            tradeType: 3,
            payTimeBegin: "",
            payTimeEnd: "",
            serviceSiteCodes: [],
            page: 1,
            size: 20
        },
        page: 1,
        size: 10,
        serviceSites: [],
        today: "",
        neighborTraceList: [],
        neighborTraceSummary: null,
        DATE_BTNS: [ {
            dateType: "today",
            name: "今天"
        }, {
            dateType: "week",
            name: "本周"
        }, {
            dateType: "month",
            name: "本月"
        }, {
            dateType: "custom",
            name: "自定义时间"
        } ],
        sureFilterDateType: "custom",
        filterDateType: "custom",
        filterBeginDate: "",
        filterEndDate: "",
        filterServiceSiteCodes: [],
        filterTradeType: 3,
        billList: []
    },
    onLoad: function() {
        this.getCooperServiceSites(), this.handleReset(), this.searchBillList();
    },
    searchBillList: function(e) {
        var t = this, i = a().format("YYYY-MM-DD");
        r.default({
            startDate: this.data.query.payTimeBegin ? a(this.data.query.payTimeBegin).format("YYYY-MM-DD") : "2022-06-10",
            endDate: this.data.query.payTimeEnd ? a(this.data.query.payTimeEnd).format("YYYY-MM-DD") : i,
            size: this.data.size,
            page: this.data.page,
            serviceSiteCodes: this.data.query.serviceSiteCodes
        }).then(function(e) {
            t.setData({
                billList: 1 === t.data.query.page ? e.data : e.data.concat(t.data.billList)
            });
        });
    },
    getCooperServiceSites: function() {
        var e = this;
        t.default().then(function(t) {
            e.setData({
                serviceSites: t.data
            });
        });
    },
    handleDateChange: function(t) {
        var i = t.detail.value, a = t.currentTarget.dataset.type;
        this.setData(e({}, a, i));
    },
    handleFilterShow: function() {
        this.setData({
            isFilterClick: !0
        });
    },
    handleFilterClose: function() {
        var e = this.data, t = e.query, i = e.sureFilterDateType, r = a().subtract(30, "days").format("YYYY-MM-DD"), s = a().format("YYYY-MM-DD");
        this.setData({
            filterDateType: i,
            filterBeginDate: "custom" === i ? t.payTimeBegin : r,
            filterEndDate: "custom" === i ? t.payTimeEnd : s,
            filterServiceSiteCodes: t.serviceSiteCodes,
            filterTradeType: t.tradeType,
            isFilterClick: !1
        });
    },
    handleTimeFilter: function(e) {
        var t = e.currentTarget.dataset.dateType, i = this.data, r = i.filterDateType, s = i.filterBeginDate, l = i.filterEndDate, n = a().subtract(30, "days").format("YYYY-MM-DD"), d = a().format("YYYY-MM-DD");
        switch (r = t, t) {
          case "today":
            s = d, l = d;
            break;

          case "week":
            s = a().weekday(0).format("YYYY-MM-DD"), l = d;
            break;

          case "month":
            s = a().month(a().month()).startOf("month").format("YYYY-MM-DD"), l = d;
            break;

          case "custom":
            s = n, l = d;
        }
        this.setData({
            filterDateType: r,
            filterBeginDate: s,
            filterEndDate: l
        });
    },
    handleServiceSiteFilter: function(e) {
        var t = e.currentTarget.dataset.code, i = this.data.filterServiceSiteCodes;
        if (t) {
            var a = i.indexOf(t);
            a >= 0 ? i.splice(a, 1) : i.push(t);
        } else i = [];
        this.setData({
            filterServiceSiteCodes: i
        });
    },
    handleTradeTypeFilter: function(e) {
        var t = e.currentTarget.dataset.tradeType;
        this.setData({
            filterTradeType: t
        });
    },
    handleReset: function() {
        var e = this.data, t = e.query, i = e.filterServiceSiteCodes, r = a().subtract(30, "days").format("YYYY-MM-DD"), s = a().format("YYYY-MM-DD");
        t.payTimeBegin = r, t.payTimeEnd = s, t.page = 1, t.serviceSiteCodes = [], i = [], 
        t.tradeType = 3, this.setData({
            query: t,
            filterDateType: "custom",
            sureFilterDateType: "custom",
            filterBeginDate: r,
            filterEndDate: s,
            isFilterClick: !1,
            today: s,
            filterServiceSiteCodes: i,
            filterTradeType: 3
        }, this.searchBillList);
    },
    handleMakeSure: function() {
        var e = this.data, t = e.query, r = e.sureFilterDateType, s = e.filterDateType, l = e.filterBeginDate, n = e.filterEndDate, d = e.filterServiceSiteCodes, o = e.filterTradeType, c = a(l), u = a(n);
        c > u ? i.noticeMsg("开始日期不能大于结束日期") : u.diff(c, "days") > 30 ? i.noticeMsg("最多支持31天筛选") : (t.page = 1, 
        r = s, t.payTimeBegin = c, t.payTimeEnd = u, t.serviceSiteCodes = d, t.tradeType = o, 
        this.setData({
            query: t,
            sureFilterDateType: r,
            isFilterClick: !1
        }, this.searchBillList("search")));
    },
    onReachBottom: function() {
        this.data.page++, this.searchBillList();
    },
    goDetails: function(e) {
        var t = e.currentTarget.dataset.item;
        wx.navigateTo({
            url: "/pages/billDetailNew/index?id=" + t.billNumber
        });
    },
    onPullDownRefresh: function() {
        this.setData({
            page: 1,
            size: 10,
            billList: []
        }, this.handleMakeSure);
    }
});