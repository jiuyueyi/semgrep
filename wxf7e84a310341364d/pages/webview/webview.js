Page({
    data: {
        url: ""
    },
    onLoad: function(t) {
        var a = t.url;
        a = a ? decodeURIComponent(a) : "", this.setData({
            url: a
        });
    }
});