Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../../../utils/index"), t = require("../../../consts/routes"), r = require("../../index");

exports.default = function(s, u, i) {
    return r.request(Object.assign({
        url: "autoPay/application/confirm",
        onSuccess: u,
        method: "POST",
        data: {
            input: s
        },
        isWallet: !0,
        baseUrl: t.default.WALLET_URL
    }, i)).then(function(t) {
        if (t.success) return t;
        throw e.noticeMsg(t.message || "请求失败"), t;
    });
};