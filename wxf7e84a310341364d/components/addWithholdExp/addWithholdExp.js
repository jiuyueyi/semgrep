Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../../utils/index"), s = require("../../consts/routes"), t = "";

Component({
    options: {
        addGlobalClass: !0
    },
    properties: {
        lineDatas: {
            type: Array,
            value: []
        }
    },
    data: {
        visible: !1,
        expressCompanyList: [],
        selectedExps: [],
        OSS_URL: s.OSS_URL
    },
    lifetimes: {
        attached: function() {
            var e = wx.getStorageSync("linkedExps");
            this.setData({
                expressCompanyList: e
            });
        }
    },
    methods: {
        _handleEditInitData: function() {
            var s = this.data.lineDatas, t = wx.getStorageSync("linkedExps"), a = e.deepCopy(t);
            t.map(function(e) {
                s.map(function(s) {
                    if (s.expressCode === e.expressCode) {
                        var t = a.findIndex(function(s) {
                            return s.expressCode === e.expressCode;
                        });
                        a.splice(t, 1);
                    }
                });
            }), this.setData({
                expressCompanyList: a
            });
        },
        _handleAddLinePop: function(e) {
            t = e.currentTarget.dataset.expressCode || "", this.setData({
                visible: !0
            });
        },
        _handleRadioChange: function(e) {
            var s = e.detail.value, t = this.data, a = t.expressCompanyList, n = t.selectedExps;
            n = a.filter(function(e) {
                return e.expressCode === s;
            })[0] || null, this.setData({
                selectedExps: n
            });
        },
        _handleUpdateLine: function() {
            if (t) this._handleChangeLineExp(); else {
                var e = this.data, s = e.selectedExps, a = e.lineDatas, n = e.expressCompanyList, i = n.findIndex(function(e) {
                    return e.expressCode === s.expressCode;
                });
                a.push(s), n.splice(i, 1), this.triggerEvent("linechange", {
                    lineDatas: a
                }), this.setData({
                    lineDatas: a,
                    expressCompanyList: n,
                    visible: !1,
                    selectedExps: []
                });
            }
        },
        _handleDeleteLine: function(e) {
            var s = e.currentTarget.dataset.expressCode, t = this.data, a = t.lineDatas, n = t.expressCompanyList, i = a.findIndex(function(e) {
                return e.expressCode === s;
            }), p = {
                expressCode: a[i].expressCode,
                expCompanyName: a[i].expCompanyName
            };
            n.unshift(p), a.splice(i, 1), this.triggerEvent("linechange", {
                lineDatas: a
            }), this.setData({
                lineDatas: a,
                expressCompanyList: n
            });
        },
        _handleChangeLineExp: function() {
            var e = this.data, s = e.lineDatas, a = e.expressCompanyList, n = e.selectedExps, i = s.findIndex(function(e) {
                return e.expressCode === t;
            }), p = a.findIndex(function(e) {
                return e.expressCode === n.expressCode;
            }), r = {
                expressCode: s[i].expressCode,
                expCompanyName: s[i].expCompanyName
            };
            a.splice(p, 1), a.unshift(r), s[i].expressCode = n.expressCode, s[i].expCompanyName = n.expCompanyName, 
            t = "", this.triggerEvent("linechange", {
                lineDatas: s
            }), this.setData({
                lineDatas: s,
                expressCompanyList: a,
                visible: !1,
                selectedExps: []
            });
        },
        _handlePopClose: function() {
            t = "", this.setData({
                visible: !1,
                selectedExps: []
            });
        },
        _handleInputChange: function(e) {
            var s = e.detail.value, t = e.currentTarget.dataset.index, a = this.data.lineDatas, n = /^\d+(?:\.\d{0,2})?/g;
            (s = s.match(n) ? s.match(n).join("") : "") > 10 && (s = 10), a[t].fee = s, this.triggerEvent("linechange", {
                lineDatas: a
            }), this.setData({
                lineDatas: a
            });
        }
    }
});