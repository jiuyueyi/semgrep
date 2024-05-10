Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../../../utils/index"), t = require("../../../consts/routes"), s = require("../../index");

exports.default = function(r, u, i) {
    return s.request(Object.assign({
        url: "validate/checksms",
        onSuccess: u,
        method: "POST",
        data: {
            input: r
        },
        isWallet: !0,
        baseUrl: t.default.WALLET_URL
    }, i)).then(function(t) {
        if (t.success) return t;
        throw e.noticeMsg(t.message || "请求失败"), t;
    });
};