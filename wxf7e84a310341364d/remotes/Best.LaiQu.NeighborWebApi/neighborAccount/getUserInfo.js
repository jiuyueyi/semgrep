Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../../../utils/index"), t = require("../../index");

exports.default = function(r, s) {
    return t.request(Object.assign({
        url: "NeighborAccount/GetUserInfo",
        onSuccess: r,
        method: "POST"
    }, s)).then(function(r) {
        if (t.isSuccess(r)) return r;
        throw e.noticeMsg(r.msg || "请求失败"), r;
    });
};