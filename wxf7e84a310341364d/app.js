App({
    globalData: {
        tradePassword: "",
        cooperServiceSiteDetails: null,
        billDetailData: null
    },
    onLaunch: function() {
        var n = this;
        if (wx.canIUse("getUpdateManager")) {
            var t = wx.getUpdateManager();
            t.onCheckForUpdate(function(e) {
                e.hasUpdate && wx.showModal({
                    title: "新版本更新提示",
                    content: "检测到新版本，是否下载新版本并重启小程序？",
                    success: function(e) {
                        e.confirm && n.downLoadAndUpdate(t);
                    }
                });
            });
        } else wx.showModal({
            title: "新版本更新提示",
            showCancel: !1,
            content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。",
            success: function() {
                wx.exitMiniProgram();
            }
        });
    },
    downloadAndUpdate: function(n) {
        wx.showLoading(), n.onUpdateReady(function() {
            wx.hideLoading(), wx.showModal({
                title: "新版本更新提示",
                content: "新版本已经准备好，是否重启应用？",
                success: function(t) {
                    t.confirm && n.applyUpdate();
                }
            });
        }), n.onUpdateFailed(function() {
            wx.hideLoading(), wx.showModal({
                title: "新版本更新提示",
                showCancel: !1,
                content: "新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟～",
                success: function() {
                    wx.exitMiniProgram();
                }
            });
        });
    }
});