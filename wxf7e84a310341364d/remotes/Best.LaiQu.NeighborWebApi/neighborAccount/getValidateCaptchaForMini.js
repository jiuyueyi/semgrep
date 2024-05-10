Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../../index"), t = require("../../../utils/index"), r = require("../../../consts/routes");

exports.default = function(s, i, u) {
    return console.log(r), e.request(Object.assign({
        url: "mini/validateCaptchaForMini",
        onSuccess: i,
        method: "POST",
        data: {
            input: s
        },
        baseUrl: r.default.CAPTCHA_ASE_URL
    }, u)).then(function(r) {
        if (e.isSuccess(r)) return r;
        throw t.noticeMsg(r.msg || "请求失败"), r;
    });
};