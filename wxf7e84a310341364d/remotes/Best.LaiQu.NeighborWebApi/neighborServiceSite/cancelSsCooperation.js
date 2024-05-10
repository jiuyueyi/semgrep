Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../../index"), t = require("../../../utils/index");

exports.default = function(r, i, s) {
    return e.request(Object.assign({
        url: "NeighborServiceSite/CancelSsCooperation",
        onSuccess: i,
        method: "POST",
        data: {
            input: r
        }
    }, s)).then(function(r) {
        if (e.isSuccess(r)) return r;
        throw t.noticeMsg(r.msg || "请求失败"), r;
    });
};