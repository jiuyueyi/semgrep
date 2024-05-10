Component({
    options: {
        addGlobalClass: !0
    },
    properties: {
        plaintext: Boolean,
        value: String,
        focus: Boolean,
        frameStyle: String,
        space: {
            type: Number,
            value: 6
        }
    },
    data: {
        _value: "",
        valueList: [],
        cursor: 99,
        isFocus: !1
    },
    lifetimes: {
        attached: function() {
            this.setData({
                isFocus: this.properties.focus,
                _value: this.properties.value
            }), this.init(), this.setCursorPosition();
        }
    },
    methods: {
        init: function() {
            var t = this.data._value;
            this.properties.plaintext || (t = t.replace(/./gim, "●")), this.setData({
                valueList: t.split("")
            });
        },
        setCursorPosition: function() {
            this.setData({
                cursor: this.data._value.length
            });
        },
        onClick: function() {
            this.setData({
                isFocus: !0
            });
        },
        loseFocus: function() {
            this.setData({
                isFocus: !1
            });
        },
        onInputChange: function(t) {
            var i = t.detail.value, s = this.properties.space;
            this.setData({
                _value: i
            }), this.triggerEvent("change", i), this.init(), i.length >= s && this.triggerEvent("finished", i);
        },
        onInputFocus: function() {
            this.setCursorPosition();
        },
        getValue: function() {
            var t = this.properties.space;
            return this.data._value.slice(0, t);
        },
        setValue: function(t) {
            null != t && (t = String(t), this.setData({
                _value: t
            }), this.init());
        }
    }
});