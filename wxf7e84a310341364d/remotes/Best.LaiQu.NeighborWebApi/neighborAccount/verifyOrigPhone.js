Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../../index"), t = require("../../../utils/index");

exports.default = function(r, i, u) {
    return e.request(Object.assign({
        url: "NeighborAccount/VerifyOrigPhone",
        onSuccess: i,
        method: "POST",
        data: {
            input: r
        }
    }, u)).then(function(r) {
        if (e.isSuccess(r)) return r;
        throw t.noticeMsg(r.msg || "请求失败"), r;
    });
};