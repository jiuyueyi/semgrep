Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../../index");

exports.default = function(r, t) {
    return e.request(Object.assign({
        url: "neighboraccount/registerwallet",
        onSuccess: r,
        method: "POST"
    }, t));
};