Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../../../utils/index"), t = require("../../../consts/routes"), r = require("../../index");

exports.default = function(s, u) {
    return r.request(Object.assign({
        url: "NeighborAccount/checkStatus",
        onSuccess: s,
        method: "POST",
        isWallet: !0,
        baseUrl: t.default.BASE_URL
    }, u)).then(function(t) {
        if (t.succ) return t;
        throw e.noticeMsg(t.message || "请求失败"), t;
    });
};