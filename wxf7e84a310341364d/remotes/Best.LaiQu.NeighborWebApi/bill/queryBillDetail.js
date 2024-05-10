Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../../../utils/index"), t = require("../../index");

exports.default = function(i, r, n) {
    return t.request(Object.assign({
        url: "finance/billDetailed",
        onSuccess: r,
        method: "POST",
        data: {
            input: i
        }
    }, n)).then(function(i) {
        if (t.isSuccess(i)) return i;
        throw e.noticeMsg(i.msg || "请求失败"), i;
    });
};