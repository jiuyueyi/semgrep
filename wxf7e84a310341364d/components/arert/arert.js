Component({
    options: {
        addGlobalClass: !0
    },
    properties: {
        placement: {
            type: String,
            value: "center"
        },
        visible: {
            type: Boolean,
            value: !1
        },
        mask: {
            type: Boolean,
            value: !0
        },
        maskClosable: {
            type: Boolean,
            value: !0
        },
        extraStyle: {
            type: String,
            value: ""
        },
        animationMask: {
            type: Object,
            value: null
        },
        maskStyles: {
            type: String,
            value: ""
        }
    },
    data: {},
    methods: {
        _triggerMask: function() {
            var e = this, t = this.data, a = t.maskClosable, l = t.visible;
            a && this.setData({
                visible: !l
            }, function() {
                e.triggerEvent("trigger", {
                    visible: l
                });
            });
        },
        _handleTouchMove: function() {}
    }
});