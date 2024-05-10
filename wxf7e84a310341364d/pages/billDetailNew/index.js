var e = require("../../remotes/Best.LaiQu.NeighborWebApi/bill/queryBillDetail");

Page({
    data: {
        billDetail: {},
        lists: [ {
            label: "账单类型",
            field: "billType",
            status: !0
        }, {
            label: "快递入库日期",
            field: "billDate"
        }, {
            label: "代扣扣款时间",
            field: "paidTime"
        }, {
            label: "支付宝订单号",
            field: "tradeNo"
        }, {
            label: "业务订单号",
            field: "billNumber"
        }, {
            label: "包裹数",
            field: "instorageRecordList",
            link: "pkgNumber"
        } ]
    },
    onLoad: function(e) {
        var i = e.id;
        i && this.getBillDetail(i);
    },
    getBillDetail: function(i) {
        var l = this;
        e.default({
            billNumber: i
        }).then(function(e) {
            l.setData({
                billDetail: e.data
            });
        });
    },
    goDetail: function(e) {
        var i = e.currentTarget.dataset.item;
        "pkgNumber" === i.link && (console.log(i), wx.navigateTo({
            url: "/pages/pkgDetail/index?instorageRecordList=" + JSON.stringify(this.data.billDetail.instorageRecordList)
        }));
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});