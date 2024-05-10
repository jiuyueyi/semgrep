Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../../index"), t = require("../../../utils/index");

exports.default = function(r, s, i) {
    return e.request(Object.assign({
        url: "NeighborServiceSite/UpdateExpressFee",
        onSuccess: s,
        method: "POST",
        data: {
            input: r
        }
    }, i)).then(function(r) {
        if (e.isSuccess(r)) return r;
        throw t.noticeMsg(r.msg || "请求失败"), r;
    });
};