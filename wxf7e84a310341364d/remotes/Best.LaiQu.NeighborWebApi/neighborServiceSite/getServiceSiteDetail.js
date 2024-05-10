Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../../index"), t = require("../../../utils/index");

exports.default = function(i, r, s) {
    return e.request(Object.assign({
        url: "NeighborServiceSite/GetServiceSiteDetail",
        onSuccess: r,
        method: "POST",
        data: {
            input: i
        }
    }, s)).then(function(i) {
        if (e.isSuccess(i)) return i;
        throw t.noticeMsg(i.msg || "请求失败"), i;
    });
};