Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../../index");

exports.default = function(t, r, u) {
    return e.request(Object.assign({
        url: "NeighborAccount/LoginNew",
        onSuccess: r,
        method: "POST",
        data: {
            input: t
        }
    }, u));
};