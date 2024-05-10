Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../../../utils/index"), t = require("../../index");

exports.default = function(r, u, s) {
    return t.request(Object.assign({
        url: "agreement/query",
        onSuccess: u,
        method: "POST",
        data: {
            input: r
        }
    }, s)).then(function(r) {
        if (t.isSuccess(r)) return r;
        throw e.noticeMsg(r.msg || "请求失败"), r;
    });
};