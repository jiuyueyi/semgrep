Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../../../utils/index"), s = require("../../../consts/routes"), t = require("../../index");

exports.default = function(r, u, i) {
    return t.request(Object.assign({
        url: "user/updatepasswd",
        onSuccess: u,
        method: "POST",
        data: {
            input: r
        },
        isWallet: !0,
        baseUrl: s.default.WALLET_URL
    }, i)).then(function(s) {
        if (s.success) return s;
        throw e.noticeMsg(s.message || "请求失败"), s;
    });
};