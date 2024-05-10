Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../../../utils/index"), s = require("../../../consts/routes"), r = require("../../index");

exports.default = function(t, u) {
    return r.request(Object.assign({
        url: "user/info",
        onSuccess: t,
        method: "POST",
        isWallet: !0,
        baseUrl: s.default.WALLET_URL
    }, u)).then(function(s) {
        if (s.success) return s;
        throw e.noticeMsg(s.message || "请求失败"), s;
    });
};