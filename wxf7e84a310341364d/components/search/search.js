Component({
    options: {
        addGlobalClass: !0
    },
    properties: {
        position: {
            type: String,
            value: "absolute"
        },
        top: {
            type: String,
            value: "0"
        },
        placeholder: {
            type: String,
            value: "请输入关键字查询"
        }
    },
    data: {
        inputVal: ""
    },
    methods: {
        _handleClearInput: function() {
            this.setData({
                inputVal: ""
            });
        },
        _handleInputChange: function(t) {
            var a = this, e = t.detail.value;
            this.setData({
                inputVal: e
            }, function() {
                e || a._handleSearch({
                    detail: {
                        value: e
                    }
                });
            });
        },
        _handleSearch: function(t) {
            var a = t.detail.value, e = this.data.inputVal;
            a = a || e, this.triggerEvent("search", {
                value: a
            });
        }
    }
});