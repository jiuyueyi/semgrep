Component({
    options: {
        addGlobalClass: !0
    },
    properties: {
        title: {
            type: String,
            value: "提示"
        },
        leftType: {
            type: String,
            value: ""
        },
        rightType: {
            type: String,
            value: ""
        },
        leftText: {
            type: String,
            value: "取消"
        },
        rightText: {
            type: String,
            value: "确定"
        },
        extraClass: {
            type: String,
            value: ""
        },
        extraStyle: {
            type: String,
            value: ""
        },
        isGetUserInfoBtn: {
            type: Boolean,
            value: !1
        },
        isGetUserPhoneBtn: {
            type: Boolean,
            value: !1
        }
    },
    data: {},
    methods: {
        _handleLeftClick: function(e) {
            var t = e.currentTarget.dataset.type;
            this.triggerEvent("leftclick", {
                type: t
            });
        },
        _handleRightClick: function(e) {
            var t = e.currentTarget.dataset.type;
            this.triggerEvent("rightclick", {
                type: t
            });
        },
        _handleGetUserInfoClick: function(e) {
            this.triggerEvent("userinfoclick", e);
        },
        _handleGetPhoneNumberClick: function(e) {
            this.triggerEvent("userphoneclick", e);
        }
    }
});