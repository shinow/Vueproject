
!function (s, t) {
    "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? module.exports = t() : s.Interval = t()
}(this, function () {
    "use strict";

    function s(s, t, i, e) {
        var n, o;
        if ("function" == typeof s) return t || (t = 1e3), i || (i = 0), n = (new Date).getTime(), o = function () {
            var e, u;
            e = (new Date).getTime() - n, u = t - e % t, this.pass = Math.floor(e / t) + 1, this.surplus = i - this.pass, setTimeout(function () {
                return this._stop ? void 0 : !1 === s.call(this, this.pass, this.surplus) ? void this.stop() : i && !this.surplus ? void this.stop() : void o()
            }.bind(this), u)
        }.bind(this), this.stop = function () {
            this._stop = !0
        }, this.pass = 0, this.surplus = i - this.pass, e && s.call(this, this.pass, this.surplus), o(0), this
    }

    return s
});