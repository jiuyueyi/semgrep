Object.defineProperty(exports, "__esModule", {
    value: !0
});

var a = getApp();

Page({
    data: {
        details: null
    },
    onLoad: function() {
        var t = a.globalData.billDetailData;
        this.setData({
            details: t
        });
    }
});