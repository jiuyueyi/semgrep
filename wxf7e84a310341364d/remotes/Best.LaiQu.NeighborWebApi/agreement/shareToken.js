Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../../../utils/index"), t = require("../../index");

exports.default = function(r, s, n) {
    return t.request(Object.assign({
        url: "agreement/shareToken",
        onSuccess: s,
        method: "POST",
        data: {
            input: r
        }
    }, n)).then(function(r) {
        if (t.isSuccess(r)) return r;
        throw e.noticeMsg(r.msg || "请求失败"), r;
    });
};