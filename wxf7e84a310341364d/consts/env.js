Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var e = wx.getAccountInfoSync(), t = {}, s = {
    develop: {
        BASE_URL: "https://uat-lq.jtexpress.com.cn/lq-neighbor-api/",
        CAPTCHA_ASE_URL: "https://uat-lqedi.jtexpress.com.cn/lq-edi-api/"
    },
    trial: {
        BASE_URL: "https://uat-lq.jtexpress.com.cn/lq-neighbor-api/",
        CAPTCHA_ASE_URL: "https://uat-lqedi.jtexpress.com.cn/lq-edi-api/"
    },
    release: {
        BASE_URL: "https://lq.jtexpress.com.cn/lq-neighbor-api/",
        CAPTCHA_ASE_URL: "https://lqedi.jtexpress.com.cn/lq-edi-api/"
    }
};

e.miniProgram.envVersion ? t = s[e.miniProgram.envVersion] : t = s.release;

var r = t;

exports.default = r;