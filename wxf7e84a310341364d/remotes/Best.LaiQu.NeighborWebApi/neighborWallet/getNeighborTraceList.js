Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../../index"), r = require("../../../utils/index");

exports.default = function(t, s, i) {
    return e.request(Object.assign({
        url: "NeighborWallet/GetNeighborTraceList",
        onSuccess: s,
        method: "POST",
        data: {
            input: t
        }
    }, i)).then(function(t) {
        if (e.isSuccess(t)) return t;
        throw wx.stopPullDownRefresh(), r.noticeMsg(t.errorMsg || "请求失败"), t;
    });
};