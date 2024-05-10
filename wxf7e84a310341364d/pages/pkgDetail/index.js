Page({
    data: {
        instorageRecordList: []
    },
    onLoad: function(n) {
        this.setData({
            instorageRecordList: JSON.parse(n.instorageRecordList)
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});