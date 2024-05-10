Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.formatTime = function(t) {
    var o = t.getFullYear(), r = t.getMonth() + 1, n = t.getDate(), i = t.getHours(), c = t.getMinutes(), s = t.getSeconds();
    return [ o, r, n ].map(e).join("/") + " " + [ i, c, s ].map(e).join(":");
};

var e = function(e) {
    var t = e.toString();
    return t[1] ? t : "0" + t;
};

exports.noticeMsg = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "网络异常.", t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "none", o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 3e3, r = arguments.length > 3 ? arguments[3] : void 0;
    wx.showToast({
        title: e,
        icon: t,
        duration: o,
        mask: !0,
        success: function() {
            r && r();
        }
    });
}, exports.deepCopy = function(e) {
    var t, o, r = "_deepCopy";
    if (e && e[r]) throw new Error("attempted deep copy of cyclic object");
    if (e && e.constructor === Object) {
        for (o in t = {}, e[r] = !0, e) o !== r && (t[o] = exports.deepCopy(e[o]));
        return delete e[r], t;
    }
    if (e && e.constructor === Array) {
        for (t = [], e[r] = !0, o = 0; o < e.length; o++) t.push(exports.deepCopy(e[o]));
        return delete e[r], t;
    }
    return e;
};