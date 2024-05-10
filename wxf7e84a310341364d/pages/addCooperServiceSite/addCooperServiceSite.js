var e = require("../../@babel/runtime/helpers/defineProperty");

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = require("../../consts/routes"), i = require("../../remotes/index"), n = require("../../remotes/Best.LaiQu.NeighborWebApi/neighborServiceSite/addServiceSite"), o = require("../../utils/index"), a = require("../../consts/errorCode"), s = require("../../remotes/Best.LaiQu.NeighborWebApi/wallet/checkTradePassword"), r = require("../../remotes/Best.LaiQu.NeighborWebApi/wallet/openWalletAutoPay"), u = require("../../remotes/Best.LaiQu.NeighborWebApi/neighborServiceSite/applyAutoPayOrder"), c = require("../../remotes/Best.LaiQu.NeighborWebApi/neighborServiceSite/updateExpressFee"), d = require("md5"), l = getApp();

Page({
    _tradePsw: "",
    _inputComponent: null,
    data: {
        serviceSiteCode: "",
        ssRegisterPhone: "",
        expressFees: [],
        tradePswInputPop: !1,
        isEdit: !1,
        isWalletPayPop: !1
    },
    onLoad: function(e) {
        var t = this, i = e.isEdit;
        i = Boolean(i) || !1;
        var n = l.globalData.cooperServiceSiteDetails;
        this._inputComponent = this.selectComponent("#inputFrame");
        var o = n ? JSON.parse(n) : null, a = o ? o.serviceSiteCode : "", s = o ? o.ssRegisterPhone : "", r = o ? o.expressFeeDtos : [];
        this.setData({
            isEdit: i,
            serviceSiteCode: a,
            ssRegisterPhone: s,
            expressFees: r
        }, function() {
            i && t.selectComponent("#addExp")._handleEditInitData();
        });
    },
    onHide: function() {
        this._inputComponent.loseFocus();
    },
    onUnload: function() {
        l.globalData.cooperServiceSiteDetails = null;
    },
    handleLineDataChange: function(e) {
        var t = e.detail.lineDatas;
        this.setData({
            expressFees: t
        });
    },
    handleInputChange: function(t) {
        var i = t.currentTarget.dataset.type, n = t.detail.value;
        if ("serviceSiteCode" === i) {
            var o = /[a-zA-Z0-9]/g;
            n = n.match(o) ? n.match(o).join("") : "";
        }
        this.setData(e({}, i, n));
    },
    handleSubmitClick: function() {
        this.data.expressFees.every(function(e) {
            return e.fee ? !(e.fee <= 0) || (o.noticeMsg("《".concat(e.expCompanyName, "》代扣费用不能为0")), 
            !1) : (o.noticeMsg("请输入《".concat(e.expCompanyName, "》代扣费用")), !1);
        }) && this.getAddResult();
    },
    handleInputFinshed: function(e) {
        var t = this;
        console.log(e);
        var i = e.detail;
        wx.showLoading({
            title: "请求中..."
        });
        var n = wx.getStorageSync("walletId"), a = d("".concat(n).concat(i)).toUpperCase();
        s.default({
            request: {
                password: a
            }
        }).then(function() {
            wx.hideLoading(), o.noticeMsg("校验成功", "none", 2e3, function() {
                t._tradePsw = a, setTimeout(function() {
                    t._inputComponent.loseFocus(), t.setData({
                        tradePswInputPop: !1
                    }, t.getAddResult);
                }, 1e3);
            });
        });
    },
    handleForgetPsw: function() {
        var e = wx.getStorageSync("phone"), i = "".concat(t.default.PHONE_CAPTCHA, "?phone=").concat(e, "&title=校验手机号&submitType=3");
        this._inputComponent.loseFocus(), this.setData({
            tradePswInputPop: !1
        }, function() {
            return wx.navigateTo({
                url: i
            });
        });
    },
    getAddResult: function() {
        var e = this;
        wx.showLoading({
            title: "请求中..."
        });
        var t = this.data, a = t.ssRegisterPhone, s = t.serviceSiteCode, r = t.expressFees;
        t.isEdit ? c.default({
            serviceSiteCode: s,
            expressFeeInputs: r
        }).then(function() {
            wx.hideLoading(), o.noticeMsg("修改成功", "none", 2e3, function() {
                setTimeout(function() {
                    wx.navigateBack({
                        delta: 1
                    });
                }, 1e3);
            });
        }) : n.default({
            ssRegisterPhone: a,
            serviceSiteCode: s,
            expressFees: r
        }).then(function(t) {
            wx.hideLoading(), i.isSuccess(t) ? o.noticeMsg("添加成功", "none", 2e3, function() {
                setTimeout(function() {
                    wx.navigateBack({
                        delta: 1
                    });
                }, 1e3);
            }) : e.handleSubmitError(t.code, t.msg);
        });
    },
    handleSubmitError: function(e, t) {
        switch (e) {
          case a.WALLET_REPLACE_UNOPEN:
            this.setData({
                isWalletPayPop: !0
            });
            break;

          case a.SERVICE_SITES_WALLET_UNOPEN:
          case a.SERVICE_SITES_WALLET_ABBINDEN:
          case a.SERVICE_SITES_INPUT_UNOPEN:
            var i = e === a.SERVICE_SITES_INPUT_UNOPEN ? "服务点尚未开通代收服务" : e === a.SERVICE_SITES_WALLET_UNOPEN ? "服务点尚未开通钱包" : "服务点钱包被禁用", n = e === a.SERVICE_SITES_INPUT_UNOPEN ? "服务点开通路径：来取APP-我的-代收服务" : e === a.SERVICE_SITES_WALLET_UNOPEN ? "服务点开通路径：来取APP-我的-来取钱包" : "该服务点钱包被禁用，无法添加合作，请联系服务点确认钱包状态";
            wx.showModal({
                title: i,
                content: n,
                showCancel: !1,
                confirmText: "知道了",
                confirmColor: "#F83C29"
            });
            break;

          default:
            o.noticeMsg(t);
        }
    },
    getAuthPayId: function() {
        var e = this;
        wx.showLoading({
            title: "请求中..."
        }), u.default().then(function(t) {
            wx.hideLoading();
            var i = t.result.applicationId;
            e.setData({
                isWalletPayPop: !1
            }, function() {
                return e.getOpenAutoPayResult(i);
            });
        });
    },
    getOpenAutoPayResult: function(e) {
        var t = this;
        wx.showLoading({
            title: "请求中..."
        }), r.default({
            req: {
                applicationId: e,
                tradePassword: this._tradePsw
            }
        }).then(function() {
            wx.hideLoading(), o.noticeMsg("开通成功", "none", 2e3, function() {
                setTimeout(t.getAddResult, 1e3);
            });
        });
    },
    handleWalletPayPopClose: function() {
        this.setData({
            isWalletPayPop: !1
        });
    }
});