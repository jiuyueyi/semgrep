Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../../../utils/index"), t = require("../../index");

exports.default = function(r, n, s) {
    return t.request(Object.assign({
        url: "agreement/unsign",
        onSuccess: n,
        method: "POST",
        data: {
            input: r
        }
    }, s)).then(function(r) {
        if (t.isSuccess(r)) return r;
        throw e.noticeMsg(r.msg || "请求失败"), r;
    });
};