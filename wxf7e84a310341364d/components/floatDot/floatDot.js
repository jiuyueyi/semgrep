Component({
    options: {
        addGlobalClass: !0
    },
    properties: {
        extraClass: {
            type: String,
            value: ""
        },
        extraStyle: {
            type: String,
            value: ""
        },
        xMinsValue: {
            type: Number,
            value: 64
        },
        yMinsValue: {
            type: Number,
            value: 120
        },
        disable: {
            type: Boolean,
            value: !1
        },
        pageType: {
            type: String,
            value: ""
        }
    },
    data: {
        windowWidth: null,
        windowHeight: null
    },
    lifetimes: {
        attached: function() {
            var e = wx.getSystemInfoSync(), t = e.windowWidth, i = e.windowHeight;
            this.setData({
                windowWidth: t,
                windowHeight: i
            });
        }
    },
    methods: {
        _handleClickDot: function(e) {
            var t = this.data, i = t.disable, a = t.pageType;
            if (i) return !1;
            this.triggerEvent("click", {
                type: a
            });
        }
    }
});