Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = require("../../consts/routes");

Component({
    options: {
        addGlobalClass: !0
    },
    properties: {
        serviceSiteData: {
            type: Object,
            value: {}
        }
    },
    data: {
        switchStaus: !1
    },
    methods: {
        _handleSwicth: function() {
            var t = this.data.switchStaus;
            this.setData({
                switchStaus: !t
            });
        },
        _goDetails: function() {
            var e = this.data.serviceSiteData, a = "".concat(t.default.COOPER_SERVICE_SITE_DETAILS, "?serviceSiteCode=").concat(e.serviceSiteCode);
            wx.navigateTo({
                url: a
            });
        }
    }
});