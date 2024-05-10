var e = require("../../@babel/runtime/helpers/defineProperty");

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = require("../../remotes/Best.LaiQu.NeighborWebApi/neighborServiceSite/getSsStatisticInfo"), a = require("../../remotes/Best.LaiQu.NeighborWebApi/neighborServiceSite/getSsNameCodeList"), i = require("../../utils/index"), r = require("moment");

Page({
    data: {
        isFilterClick: !1,
        serviceSiteTableDatas: null,
        totalExpress: 0,
        totalPages: 0,
        totalFee: 0,
        serviceSites: [],
        today: "",
        query: {
            beginDateTime: "",
            endDateTime: "",
            serviceSiteCodes: [],
            currentPage: 1,
            pageSize: 50
        },
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
        filterServiceSiteCodes: []
    },
    onLoad: function(e) {
        var t = e.serviceSiteCode;
        this.getCooperServiceSites(), this.handleReset(t);
    },
    getCooperServiceSites: function() {
        var e = this;
        a.default().then(function(t) {
            e.setData({
                serviceSites: t.data
            });
        });
    },
    getCooperServiceSiteDatas: function() {
        var e = this, a = this.data, r = a.query, s = a.serviceSiteTableDatas;
        wx.showLoading({
            title: "请求中..."
        }), t.default(r).then(function(t) {
            wx.hideLoading(), wx.stopPullDownRefresh();
            var a = t.data, o = a.totalPage, n = a.totalExpress, l = a.totalFee, c = a.ssReceiveInfos;
            s = 1 === r.currentPage ? i.deepCopy(c) : s.concat(c), e.setData({
                serviceSiteTableDatas: s,
                totalPages: o,
                totalExpress: n,
                totalFee: l
            });
        });
    },
    handleDateChange: function(t) {
        var a = t.detail.value, i = t.currentTarget.dataset.type;
        this.setData(e({}, i, a));
    },
    handleFilterShow: function() {
        this.setData({
            isFilterClick: !0
        });
    },
    handleFilterClose: function() {
        var e = this.data, t = e.query, a = e.sureFilterDateType, i = r().subtract(30, "days").format("YYYY-MM-DD"), s = r().format("YYYY-MM-DD");
        this.setData({
            filterDateType: a,
            filterBeginDate: "custom" === a ? t.beginDateTime : i,
            filterEndDate: "custom" === a ? t.endDateTime : s,
            filterServiceSiteCodes: t.serviceSiteCodes,
            isFilterClick: !1
        });
    },
    handleTimeFilter: function(e) {
        var t = e.currentTarget.dataset.dateType, a = this.data, i = a.filterDateType, s = a.filterBeginDate, o = a.filterEndDate, n = r().subtract(30, "days").format("YYYY-MM-DD"), l = r().format("YYYY-MM-DD");
        switch (i = t, t) {
          case "today":
            s = l, o = l;
            break;

          case "week":
            s = r().weekday(1).format("YYYY-MM-DD"), o = l;
            break;

          case "month":
            s = r().month(r().month()).startOf("month").format("YYYY-MM-DD"), o = l;
            break;

          case "custom":
            s = n, o = l;
        }
        this.setData({
            filterDateType: i,
            filterBeginDate: s,
            filterEndDate: o
        });
    },
    handleServiceSiteFilter: function(e) {
        var t = e.currentTarget.dataset.code, a = this.data.filterServiceSiteCodes;
        if (t) {
            var i = a.indexOf(t);
            i >= 0 ? a.splice(i, 1) : a.push(t);
        } else a = [];
        this.setData({
            filterServiceSiteCodes: a
        });
    },
    handleReset: function(e) {
        var t = this.data, a = t.query, i = t.filterServiceSiteCodes, s = r().subtract(30, "days").format("YYYY-MM-DD"), o = r().format("YYYY-MM-DD");
        a.beginDateTime = s, a.endDateTime = o, a.currentPage = 1, a.serviceSiteCodes = [], 
        i = [], e && "string" == typeof e && (a.serviceSiteCodes.push(e), i.push(e)), this.setData({
            query: a,
            filterDateType: "custom",
            sureFilterDateType: "custom",
            filterBeginDate: s,
            filterEndDate: o,
            isFilterClick: !1,
            today: o,
            filterServiceSiteCodes: i
        }, this.getCooperServiceSiteDatas);
    },
    handleMakeSure: function() {
        var e = this.data, t = e.query, a = e.sureFilterDateType, s = e.filterDateType, o = e.filterBeginDate, n = e.filterEndDate, l = e.filterServiceSiteCodes, c = r(o), d = r(n);
        c > d ? i.noticeMsg("开始日期不能大于结束日期") : d.diff(c, "days") > 30 ? i.noticeMsg("最多支持31天筛选") : (t.currentPage = 1, 
        a = s, t.beginDateTime = o, t.endDateTime = n, t.serviceSiteCodes = l, this.setData({
            query: t,
            sureFilterDateType: a,
            isFilterClick: !1
        }, this.getCooperServiceSiteDatas));
    },
    onReachBottom: function() {
        var e = this.data, t = e.totalPages, a = e.query;
        a.currentPage < t && (a.currentPage++, this.setData({
            query: a
        }, this.getCooperServiceSiteDatas));
    },
    onPullDownRefresh: function() {
        this.setData(e({}, "query.currentPage", 1), this.handleMakeSure);
    }
});