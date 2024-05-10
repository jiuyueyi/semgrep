Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../../index"), r = require("../../../utils/index");

exports.default = function(t, s) {
    return e.request(Object.assign({
        url: "neighborservicesite/applyautopayorder",
        onSuccess: t,
        method: "POST"
    }, s)).then(function(t) {
        if (e.isSuccess(t)) return t;
        throw r.noticeMsg(t.msg || "请求失败"), t;
    });
};