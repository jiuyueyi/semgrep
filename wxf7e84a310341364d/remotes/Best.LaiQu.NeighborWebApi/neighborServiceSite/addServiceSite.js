Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../../index");

exports.default = function(t, r, i) {
    return e.request(Object.assign({
        url: "NeighborServiceSite/AddServiceSite",
        onSuccess: r,
        method: "POST",
        data: {
            input: t
        }
    }, i));
};