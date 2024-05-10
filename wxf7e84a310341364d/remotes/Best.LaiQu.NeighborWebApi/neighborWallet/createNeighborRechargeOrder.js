Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../../index"), r = require("../../../utils/index");

exports.default = function(t, i, s) {
    return e.request(Object.assign({
        url: "NeighborWallet/CreateNeighborRechargeOrder",
        onSuccess: i,
        method: "POST",
        data: {
            input: t
        }
    }, s)).then(function(t) {
        if (e.isSuccess(t)) return t;
        throw r.noticeMsg(t.errorMsg || "请求失败"), t;
    });
};