"use strict";
(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([
  [1673],
  {
    92952: function (c, t, e) {
      var i =
        (this && this.__extends) ||
        (function () {
          var c = function (t, e) {
            c =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (c, t) {
                  c.__proto__ = t;
                }) ||
              function (c, t) {
                for (var e in t) if (Object.prototype.hasOwnProperty.call(t, e)) c[e] = t[e];
              };
            return c(t, e);
          };
          return function (t, e) {
            if (typeof e !== "function" && e !== null)
              throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");
            c(t, e);
            function i() {
              this.constructor = t;
            }
            t.prototype = e === null ? Object.create(e) : ((i.prototype = e.prototype), new i());
          };
        })();
      var f =
        (this && this.__assign) ||
        function () {
          f =
            Object.assign ||
            function (c) {
              for (var t, e = 1, i = arguments.length; e < i; e++) {
                t = arguments[e];
                for (var f in t) if (Object.prototype.hasOwnProperty.call(t, f)) c[f] = t[f];
              }
              return c;
            };
          return f.apply(this, arguments);
        };
      var r =
        (this && this.__createBinding) ||
        (Object.create
          ? function (c, t, e, i) {
              if (i === undefined) i = e;
              var f = Object.getOwnPropertyDescriptor(t, e);
              if (!f || ("get" in f ? !t.__esModule : f.writable || f.configurable)) {
                f = {
                  enumerable: true,
                  get: function () {
                    return t[e];
                  },
                };
              }
              Object.defineProperty(c, i, f);
            }
          : function (c, t, e, i) {
              if (i === undefined) i = e;
              c[i] = t[e];
            });
      var s =
        (this && this.__exportStar) ||
        function (c, t) {
          for (var e in c) if (e !== "default" && !Object.prototype.hasOwnProperty.call(t, e)) r(t, c, e);
        };
      var a =
        (this && this.__values) ||
        function (c) {
          var t = typeof Symbol === "function" && Symbol.iterator,
            e = t && c[t],
            i = 0;
          if (e) return e.call(c);
          if (c && typeof c.length === "number")
            return {
              next: function () {
                if (c && i >= c.length) c = void 0;
                return { value: c && c[i++], done: !c };
              },
            };
          throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
        };
      var o =
        (this && this.__read) ||
        function (c, t) {
          var e = typeof Symbol === "function" && c[Symbol.iterator];
          if (!e) return c;
          var i = e.call(c),
            f,
            r = [],
            s;
          try {
            while ((t === void 0 || t-- > 0) && !(f = i.next()).done) r.push(f.value);
          } catch (a) {
            s = { error: a };
          } finally {
            try {
              if (f && !f.done && (e = i["return"])) e.call(i);
            } finally {
              if (s) throw s.error;
            }
          }
          return r;
        };
      Object.defineProperty(t, "__esModule", { value: true });
      t.AddCSS = t.CHTMLFontData = void 0;
      var n = e(30861);
      var l = e(60854);
      var d = e(86810);
      s(e(30861), t);
      var S = (function (c) {
        i(t, c);
        function t() {
          var t = (c !== null && c.apply(this, arguments)) || this;
          t.charUsage = new l.Usage();
          t.delimUsage = new l.Usage();
          return t;
        }
        t.charOptions = function (t, e) {
          return c.charOptions.call(this, t, e);
        };
        t.prototype.adaptiveCSS = function (c) {
          this.options.adaptiveCSS = c;
        };
        t.prototype.clearCache = function () {
          if (this.options.adaptiveCSS) {
            this.charUsage.clear();
            this.delimUsage.clear();
          }
        };
        t.prototype.createVariant = function (t, e, i) {
          if (e === void 0) {
            e = null;
          }
          if (i === void 0) {
            i = null;
          }
          c.prototype.createVariant.call(this, t, e, i);
          var f = this.constructor;
          this.variant[t].classes = f.defaultVariantClasses[t];
          this.variant[t].letter = f.defaultVariantLetters[t];
        };
        t.prototype.defineChars = function (e, i) {
          var f, r;
          c.prototype.defineChars.call(this, e, i);
          var s = this.variant[e].letter;
          try {
            for (var o = a(Object.keys(i)), n = o.next(); !n.done; n = o.next()) {
              var l = n.value;
              var d = t.charOptions(i, parseInt(l));
              if (d.f === undefined) {
                d.f = s;
              }
            }
          } catch (S) {
            f = { error: S };
          } finally {
            try {
              if (n && !n.done && (r = o.return)) r.call(o);
            } finally {
              if (f) throw f.error;
            }
          }
        };
        Object.defineProperty(t.prototype, "styles", {
          get: function () {
            var c = this.constructor;
            var t = f({}, c.defaultStyles);
            this.addFontURLs(t, c.defaultFonts, this.options.fontURL);
            if (this.options.adaptiveCSS) {
              this.updateStyles(t);
            } else {
              this.allStyles(t);
            }
            return t;
          },
          enumerable: false,
          configurable: true,
        });
        t.prototype.updateStyles = function (c) {
          var t, e, i, f;
          try {
            for (var r = a(this.delimUsage.update()), s = r.next(); !s.done; s = r.next()) {
              var n = s.value;
              this.addDelimiterStyles(c, n, this.delimiters[n]);
            }
          } catch (p) {
            t = { error: p };
          } finally {
            try {
              if (s && !s.done && (e = r.return)) e.call(r);
            } finally {
              if (t) throw t.error;
            }
          }
          try {
            for (var l = a(this.charUsage.update()), d = l.next(); !d.done; d = l.next()) {
              var S = o(d.value, 2),
                u = S[0],
                n = S[1];
              var h = this.variant[u];
              this.addCharStyles(c, h.letter, n, h.chars[n]);
            }
          } catch (B) {
            i = { error: B };
          } finally {
            try {
              if (d && !d.done && (f = l.return)) f.call(l);
            } finally {
              if (i) throw i.error;
            }
          }
          return c;
        };
        t.prototype.allStyles = function (c) {
          var t, e, i, f, r, s;
          try {
            for (var o = a(Object.keys(this.delimiters)), n = o.next(); !n.done; n = o.next()) {
              var l = n.value;
              var d = parseInt(l);
              this.addDelimiterStyles(c, d, this.delimiters[d]);
            }
          } catch (y) {
            t = { error: y };
          } finally {
            try {
              if (n && !n.done && (e = o.return)) e.call(o);
            } finally {
              if (t) throw t.error;
            }
          }
          try {
            for (var S = a(Object.keys(this.variant)), u = S.next(); !u.done; u = S.next()) {
              var h = u.value;
              var p = this.variant[h];
              var B = p.letter;
              try {
                for (var v = ((r = void 0), a(Object.keys(p.chars))), m = v.next(); !m.done; m = v.next()) {
                  var l = m.value;
                  var d = parseInt(l);
                  var k = p.chars[d];
                  if ((k[3] || {}).smp) continue;
                  if (k.length < 4) {
                    k[3] = {};
                  }
                  this.addCharStyles(c, B, d, k);
                }
              } catch (I) {
                r = { error: I };
              } finally {
                try {
                  if (m && !m.done && (s = v.return)) s.call(v);
                } finally {
                  if (r) throw r.error;
                }
              }
            }
          } catch (A) {
            i = { error: A };
          } finally {
            try {
              if (u && !u.done && (f = S.return)) f.call(S);
            } finally {
              if (i) throw i.error;
            }
          }
        };
        t.prototype.addFontURLs = function (c, t, e) {
          var i, r;
          try {
            for (var s = a(Object.keys(t)), o = s.next(); !o.done; o = s.next()) {
              var n = o.value;
              var l = f({}, t[n]);
              l.src = l.src.replace(/%%URL%%/, e);
              c[n] = l;
            }
          } catch (d) {
            i = { error: d };
          } finally {
            try {
              if (o && !o.done && (r = s.return)) r.call(s);
            } finally {
              if (i) throw i.error;
            }
          }
        };
        t.prototype.addDelimiterStyles = function (c, t, e) {
          var i = this.charSelector(t);
          if (e.c && e.c !== t) {
            i = this.charSelector(e.c);
            c[".mjx-stretched mjx-c" + i + "::before"] = { content: this.charContent(e.c) };
          }
          if (!e.stretch) return;
          if (e.dir === 1) {
            this.addDelimiterVStyles(c, i, e);
          } else {
            this.addDelimiterHStyles(c, i, e);
          }
        };
        t.prototype.addDelimiterVStyles = function (c, t, e) {
          var i = e.HDW;
          var f = o(e.stretch, 4),
            r = f[0],
            s = f[1],
            a = f[2],
            n = f[3];
          var l = this.addDelimiterVPart(c, t, "beg", r, i);
          this.addDelimiterVPart(c, t, "ext", s, i);
          var d = this.addDelimiterVPart(c, t, "end", a, i);
          var S = {};
          if (n) {
            var u = this.addDelimiterVPart(c, t, "mid", n, i);
            S.height = "50%";
            c["mjx-stretchy-v" + t + " > mjx-mid"] = {
              "margin-top": this.em(-u / 2),
              "margin-bottom": this.em(-u / 2),
            };
          }
          if (l) {
            S["border-top-width"] = this.em0(l - 0.03);
          }
          if (d) {
            S["border-bottom-width"] = this.em0(d - 0.03);
            c["mjx-stretchy-v" + t + " > mjx-end"] = { "margin-top": this.em(-d) };
          }
          if (Object.keys(S).length) {
            c["mjx-stretchy-v" + t + " > mjx-ext"] = S;
          }
        };
        t.prototype.addDelimiterVPart = function (c, t, e, i, f) {
          if (!i) return 0;
          var r = this.getDelimiterData(i);
          var s = (f[2] - r[2]) / 2;
          var a = { content: this.charContent(i) };
          if (e !== "ext") {
            a.padding = this.padding(r, s);
          } else {
            a.width = this.em0(f[2]);
            if (s) {
              a["padding-left"] = this.em0(s);
            }
          }
          c["mjx-stretchy-v" + t + " mjx-" + e + " mjx-c::before"] = a;
          return r[0] + r[1];
        };
        t.prototype.addDelimiterHStyles = function (c, t, e) {
          var i = o(e.stretch, 4),
            f = i[0],
            r = i[1],
            s = i[2],
            a = i[3];
          var n = e.HDW;
          this.addDelimiterHPart(c, t, "beg", f, n);
          this.addDelimiterHPart(c, t, "ext", r, n);
          this.addDelimiterHPart(c, t, "end", s, n);
          if (a) {
            this.addDelimiterHPart(c, t, "mid", a, n);
            c["mjx-stretchy-h" + t + " > mjx-ext"] = { width: "50%" };
          }
        };
        t.prototype.addDelimiterHPart = function (c, t, e, i, f) {
          if (!i) return;
          var r = this.getDelimiterData(i);
          var s = r[3];
          var a = { content: s && s.c ? '"' + s.c + '"' : this.charContent(i) };
          a.padding = this.padding(f, 0, -f[2]);
          c["mjx-stretchy-h" + t + " mjx-" + e + " mjx-c::before"] = a;
        };
        t.prototype.addCharStyles = function (c, t, e, i) {
          var f = i[3];
          var r = f.f !== undefined ? f.f : t;
          var s = "mjx-c" + this.charSelector(e) + (r ? ".TEX-" + r : "");
          c[s + "::before"] = {
            padding: this.padding(i, 0, f.ic || 0),
            content: f.c != null ? '"' + f.c + '"' : this.charContent(e),
          };
        };
        t.prototype.getDelimiterData = function (c) {
          return this.getChar("-smallop", c);
        };
        t.prototype.em = function (c) {
          return (0, d.em)(c);
        };
        t.prototype.em0 = function (c) {
          return (0, d.em)(Math.max(0, c));
        };
        t.prototype.padding = function (c, t, e) {
          var i = o(c, 3),
            f = i[0],
            r = i[1],
            s = i[2];
          if (t === void 0) {
            t = 0;
          }
          if (e === void 0) {
            e = 0;
          }
          return [f, s + e, r, t].map(this.em0).join(" ");
        };
        t.prototype.charContent = function (c) {
          return (
            '"' +
            (c >= 32 && c <= 126 && c !== 34 && c !== 39 && c !== 92
              ? String.fromCharCode(c)
              : "\\" + c.toString(16).toUpperCase()) +
            '"'
          );
        };
        t.prototype.charSelector = function (c) {
          return ".mjx-c" + c.toString(16).toUpperCase();
        };
        t.OPTIONS = f(f({}, n.FontData.OPTIONS), { fontURL: "js/output/chtml/fonts/tex-woff-v2" });
        t.JAX = "CHTML";
        t.defaultVariantClasses = {};
        t.defaultVariantLetters = {};
        t.defaultStyles = { "mjx-c::before": { display: "block", width: 0 } };
        t.defaultFonts = {
          "@font-face /* 0 */": { "font-family": "MJXZERO", src: 'url("%%URL%%/MathJax_Zero.woff") format("woff")' },
        };
        return t;
      })(n.FontData);
      t.CHTMLFontData = S;
      function u(c, t) {
        var e, i;
        try {
          for (var f = a(Object.keys(t)), r = f.next(); !r.done; r = f.next()) {
            var s = r.value;
            var o = parseInt(s);
            Object.assign(n.FontData.charOptions(c, o), t[o]);
          }
        } catch (l) {
          e = { error: l };
        } finally {
          try {
            if (r && !r.done && (i = f.return)) i.call(f);
          } finally {
            if (e) throw e.error;
          }
        }
        return c;
      }
      t.AddCSS = u;
    },
    60854: (c, t) => {
      Object.defineProperty(t, "__esModule", { value: true });
      t.Usage = void 0;
      var e = (function () {
        function c() {
          this.used = new Set();
          this.needsUpdate = [];
        }
        c.prototype.add = function (c) {
          var t = JSON.stringify(c);
          if (!this.used.has(t)) {
            this.needsUpdate.push(c);
          }
          this.used.add(t);
        };
        c.prototype.has = function (c) {
          return this.used.has(JSON.stringify(c));
        };
        c.prototype.clear = function () {
          this.used.clear();
          this.needsUpdate = [];
        };
        c.prototype.update = function () {
          var c = this.needsUpdate;
          this.needsUpdate = [];
          return c;
        };
        return c;
      })();
      t.Usage = e;
    },
    1673: function (c, t, e) {
      var i =
        (this && this.__extends) ||
        (function () {
          var c = function (t, e) {
            c =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (c, t) {
                  c.__proto__ = t;
                }) ||
              function (c, t) {
                for (var e in t) if (Object.prototype.hasOwnProperty.call(t, e)) c[e] = t[e];
              };
            return c(t, e);
          };
          return function (t, e) {
            if (typeof e !== "function" && e !== null)
              throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");
            c(t, e);
            function i() {
              this.constructor = t;
            }
            t.prototype = e === null ? Object.create(e) : ((i.prototype = e.prototype), new i());
          };
        })();
      var f =
        (this && this.__assign) ||
        function () {
          f =
            Object.assign ||
            function (c) {
              for (var t, e = 1, i = arguments.length; e < i; e++) {
                t = arguments[e];
                for (var f in t) if (Object.prototype.hasOwnProperty.call(t, f)) c[f] = t[f];
              }
              return c;
            };
          return f.apply(this, arguments);
        };
      Object.defineProperty(t, "__esModule", { value: true });
      t.TeXFont = void 0;
      var r = e(92952);
      var s = e(6382);
      var a = e(59316);
      var o = e(78451);
      var n = e(18018);
      var l = e(74141);
      var d = e(3785);
      var S = e(74868);
      var u = e(87434);
      var h = e(82621);
      var p = e(56979);
      var B = e(83356);
      var v = e(11211);
      var m = e(76316);
      var k = e(16651);
      var y = e(56755);
      var I = e(45491);
      var A = e(7598);
      var b = e(83085);
      var x = e(74681);
      var M = e(91611);
      var _ = e(56848);
      var H = e(74878);
      var D = e(99652);
      var R = e(39729);
      var E = e(82599);
      var C = e(6987);
      var O = (function (c) {
        i(t, c);
        function t() {
          return (c !== null && c.apply(this, arguments)) || this;
        }
        t.defaultCssFamilyPrefix = "MJXZERO";
        t.defaultVariantClasses = {
          normal: "mjx-n",
          bold: "mjx-b",
          italic: "mjx-i",
          "bold-italic": "mjx-b mjx-i",
          "double-struck": "mjx-ds mjx-b",
          fraktur: "mjx-fr",
          "bold-fraktur": "mjx-fr mjx-b",
          script: "mjx-sc mjx-i",
          "bold-script": "mjx-sc mjx-b mjx-i",
          "sans-serif": "mjx-ss",
          "bold-sans-serif": "mjx-ss mjx-b",
          "sans-serif-italic": "mjx-ss mjx-i",
          "sans-serif-bold-italic": "mjx-ss mjx-b mjx-i",
          monospace: "mjx-ty",
          "-smallop": "mjx-sop",
          "-largeop": "mjx-lop",
          "-size3": "mjx-s3",
          "-size4": "mjx-s4",
          "-tex-calligraphic": "mjx-cal mjx-i",
          "-tex-bold-calligraphic": "mjx-cal mjx-b",
          "-tex-mathit": "mjx-mit mjx-i",
          "-tex-oldstyle": "mjx-os",
          "-tex-bold-oldstyle": "mjx-os mjx-b",
          "-tex-variant": "mjx-var",
        };
        t.defaultVariantLetters = {
          normal: "",
          bold: "B",
          italic: "MI",
          "bold-italic": "BI",
          "double-struck": "A",
          fraktur: "FR",
          "bold-fraktur": "FRB",
          script: "SC",
          "bold-script": "SCB",
          "sans-serif": "SS",
          "bold-sans-serif": "SSB",
          "sans-serif-italic": "SSI",
          "sans-serif-bold-italic": "SSBI",
          monospace: "T",
          "-smallop": "S1",
          "-largeop": "S2",
          "-size3": "S3",
          "-size4": "S4",
          "-tex-calligraphic": "C",
          "-tex-bold-calligraphic": "CB",
          "-tex-mathit": "MI",
          "-tex-oldstyle": "C",
          "-tex-bold-oldstyle": "CB",
          "-tex-variant": "A",
        };
        t.defaultDelimiters = C.delimiters;
        t.defaultChars = {
          normal: p.normal,
          bold: o.bold,
          italic: S.italic,
          "bold-italic": a.boldItalic,
          "double-struck": n.doubleStruck,
          fraktur: d.fraktur,
          "bold-fraktur": l.frakturBold,
          script: I.script,
          "bold-script": y.scriptBold,
          "sans-serif": k.sansSerif,
          "bold-sans-serif": v.sansSerifBold,
          "sans-serif-italic": m.sansSerifItalic,
          "sans-serif-bold-italic": B.sansSerifBoldItalic,
          monospace: h.monospace,
          "-smallop": A.smallop,
          "-largeop": u.largeop,
          "-size3": D.texSize3,
          "-size4": R.texSize4,
          "-tex-calligraphic": x.texCalligraphic,
          "-tex-bold-calligraphic": b.texCalligraphicBold,
          "-tex-mathit": M.texMathit,
          "-tex-oldstyle": H.texOldstyle,
          "-tex-bold-oldstyle": _.texOldstyleBold,
          "-tex-variant": E.texVariant,
        };
        t.defaultStyles = f(f({}, r.CHTMLFontData.defaultStyles), {
          ".MJX-TEX": { "font-family": "MJXZERO, MJXTEX" },
          ".TEX-B": { "font-family": "MJXZERO, MJXTEX-B" },
          ".TEX-I": { "font-family": "MJXZERO, MJXTEX-I" },
          ".TEX-MI": { "font-family": "MJXZERO, MJXTEX-MI" },
          ".TEX-BI": { "font-family": "MJXZERO, MJXTEX-BI" },
          ".TEX-S1": { "font-family": "MJXZERO, MJXTEX-S1" },
          ".TEX-S2": { "font-family": "MJXZERO, MJXTEX-S2" },
          ".TEX-S3": { "font-family": "MJXZERO, MJXTEX-S3" },
          ".TEX-S4": { "font-family": "MJXZERO, MJXTEX-S4" },
          ".TEX-A": { "font-family": "MJXZERO, MJXTEX-A" },
          ".TEX-C": { "font-family": "MJXZERO, MJXTEX-C" },
          ".TEX-CB": { "font-family": "MJXZERO, MJXTEX-CB" },
          ".TEX-FR": { "font-family": "MJXZERO, MJXTEX-FR" },
          ".TEX-FRB": { "font-family": "MJXZERO, MJXTEX-FRB" },
          ".TEX-SS": { "font-family": "MJXZERO, MJXTEX-SS" },
          ".TEX-SSB": { "font-family": "MJXZERO, MJXTEX-SSB" },
          ".TEX-SSI": { "font-family": "MJXZERO, MJXTEX-SSI" },
          ".TEX-SC": { "font-family": "MJXZERO, MJXTEX-SC" },
          ".TEX-T": { "font-family": "MJXZERO, MJXTEX-T" },
          ".TEX-V": { "font-family": "MJXZERO, MJXTEX-V" },
          ".TEX-VB": { "font-family": "MJXZERO, MJXTEX-VB" },
          "mjx-stretchy-v mjx-c, mjx-stretchy-h mjx-c": {
            "font-family": "MJXZERO, MJXTEX-S1, MJXTEX-S4, MJXTEX, MJXTEX-A ! important",
          },
        });
        t.defaultFonts = f(f({}, r.CHTMLFontData.defaultFonts), {
          "@font-face /* 1 */": {
            "font-family": "MJXTEX",
            src: 'url("%%URL%%/MathJax_Main-Regular.woff") format("woff")',
          },
          "@font-face /* 2 */": {
            "font-family": "MJXTEX-B",
            src: 'url("%%URL%%/MathJax_Main-Bold.woff") format("woff")',
          },
          "@font-face /* 3 */": {
            "font-family": "MJXTEX-I",
            src: 'url("%%URL%%/MathJax_Math-Italic.woff") format("woff")',
          },
          "@font-face /* 4 */": {
            "font-family": "MJXTEX-MI",
            src: 'url("%%URL%%/MathJax_Main-Italic.woff") format("woff")',
          },
          "@font-face /* 5 */": {
            "font-family": "MJXTEX-BI",
            src: 'url("%%URL%%/MathJax_Math-BoldItalic.woff") format("woff")',
          },
          "@font-face /* 6 */": {
            "font-family": "MJXTEX-S1",
            src: 'url("%%URL%%/MathJax_Size1-Regular.woff") format("woff")',
          },
          "@font-face /* 7 */": {
            "font-family": "MJXTEX-S2",
            src: 'url("%%URL%%/MathJax_Size2-Regular.woff") format("woff")',
          },
          "@font-face /* 8 */": {
            "font-family": "MJXTEX-S3",
            src: 'url("%%URL%%/MathJax_Size3-Regular.woff") format("woff")',
          },
          "@font-face /* 9 */": {
            "font-family": "MJXTEX-S4",
            src: 'url("%%URL%%/MathJax_Size4-Regular.woff") format("woff")',
          },
          "@font-face /* 10 */": {
            "font-family": "MJXTEX-A",
            src: 'url("%%URL%%/MathJax_AMS-Regular.woff") format("woff")',
          },
          "@font-face /* 11 */": {
            "font-family": "MJXTEX-C",
            src: 'url("%%URL%%/MathJax_Calligraphic-Regular.woff") format("woff")',
          },
          "@font-face /* 12 */": {
            "font-family": "MJXTEX-CB",
            src: 'url("%%URL%%/MathJax_Calligraphic-Bold.woff") format("woff")',
          },
          "@font-face /* 13 */": {
            "font-family": "MJXTEX-FR",
            src: 'url("%%URL%%/MathJax_Fraktur-Regular.woff") format("woff")',
          },
          "@font-face /* 14 */": {
            "font-family": "MJXTEX-FRB",
            src: 'url("%%URL%%/MathJax_Fraktur-Bold.woff") format("woff")',
          },
          "@font-face /* 15 */": {
            "font-family": "MJXTEX-SS",
            src: 'url("%%URL%%/MathJax_SansSerif-Regular.woff") format("woff")',
          },
          "@font-face /* 16 */": {
            "font-family": "MJXTEX-SSB",
            src: 'url("%%URL%%/MathJax_SansSerif-Bold.woff") format("woff")',
          },
          "@font-face /* 17 */": {
            "font-family": "MJXTEX-SSI",
            src: 'url("%%URL%%/MathJax_SansSerif-Italic.woff") format("woff")',
          },
          "@font-face /* 18 */": {
            "font-family": "MJXTEX-SC",
            src: 'url("%%URL%%/MathJax_Script-Regular.woff") format("woff")',
          },
          "@font-face /* 19 */": {
            "font-family": "MJXTEX-T",
            src: 'url("%%URL%%/MathJax_Typewriter-Regular.woff") format("woff")',
          },
          "@font-face /* 20 */": {
            "font-family": "MJXTEX-V",
            src: 'url("%%URL%%/MathJax_Vector-Regular.woff") format("woff")',
          },
          "@font-face /* 21 */": {
            "font-family": "MJXTEX-VB",
            src: 'url("%%URL%%/MathJax_Vector-Bold.woff") format("woff")',
          },
        });
        return t;
      })((0, s.CommonTeXFontMixin)(r.CHTMLFontData));
      t.TeXFont = O;
    },
    59316: (c, t, e) => {
      Object.defineProperty(t, "__esModule", { value: true });
      t.boldItalic = void 0;
      var i = e(92952);
      var f = e(51091);
      t.boldItalic = (0, i.AddCSS)(f.boldItalic, {
        305: { f: "B" },
        567: { f: "B" },
        8260: { c: "/" },
        8710: { c: "\\394" },
        10744: { c: "/" },
      });
    },
    78451: (c, t, e) => {
      Object.defineProperty(t, "__esModule", { value: true });
      t.bold = void 0;
      var i = e(92952);
      var f = e(95746);
      t.bold = (0, i.AddCSS)(f.bold, {
        183: { c: "\\22C5" },
        305: { f: "" },
        567: { f: "" },
        697: { c: "\\2032" },
        8194: { c: "" },
        8195: { c: "" },
        8196: { c: "" },
        8197: { c: "" },
        8198: { c: "" },
        8201: { c: "" },
        8202: { c: "" },
        8213: { c: "\\2014" },
        8214: { c: "\\2225" },
        8215: { c: "_" },
        8226: { c: "\\2219" },
        8243: { c: "\\2032\\2032" },
        8244: { c: "\\2032\\2032\\2032" },
        8254: { c: "\\2C9" },
        8260: { c: "/" },
        8279: { c: "\\2032\\2032\\2032\\2032" },
        8407: { c: "\\2192", f: "VB" },
        8602: { c: "\\2190\\338" },
        8603: { c: "\\2192\\338" },
        8622: { c: "\\2194\\338" },
        8653: { c: "\\21D0\\338" },
        8654: { c: "\\21D4\\338" },
        8655: { c: "\\21D2\\338" },
        8708: { c: "\\2203\\338" },
        8710: { c: "\\394" },
        8716: { c: "\\220B\\338" },
        8740: { c: "\\2223\\338" },
        8742: { c: "\\2225\\338" },
        8769: { c: "\\223C\\338" },
        8772: { c: "\\2243\\338" },
        8775: { c: "\\2245\\338" },
        8777: { c: "\\2248\\338" },
        8802: { c: "\\2261\\338" },
        8813: { c: "\\224D\\338" },
        8814: { c: "<\\338" },
        8815: { c: ">\\338" },
        8816: { c: "\\2264\\338" },
        8817: { c: "\\2265\\338" },
        8832: { c: "\\227A\\338" },
        8833: { c: "\\227B\\338" },
        8836: { c: "\\2282\\338" },
        8837: { c: "\\2283\\338" },
        8840: { c: "\\2286\\338" },
        8841: { c: "\\2287\\338" },
        8876: { c: "\\22A2\\338" },
        8877: { c: "\\22A8\\338" },
        8930: { c: "\\2291\\338" },
        8931: { c: "\\2292\\338" },
        9001: { c: "\\27E8" },
        9002: { c: "\\27E9" },
        9653: { c: "\\25B3" },
        9663: { c: "\\25BD" },
        10072: { c: "\\2223" },
        10744: { c: "/", f: "BI" },
        10799: { c: "\\D7" },
        12296: { c: "\\27E8" },
        12297: { c: "\\27E9" },
      });
    },
    18018: (c, t, e) => {
      Object.defineProperty(t, "__esModule", { value: true });
      t.doubleStruck = void 0;
      var i = e(32249);
      Object.defineProperty(t, "doubleStruck", {
        enumerable: true,
        get: function () {
          return i.doubleStruck;
        },
      });
    },
    74141: (c, t, e) => {
      Object.defineProperty(t, "__esModule", { value: true });
      t.frakturBold = void 0;
      var i = e(92952);
      var f = e(45600);
      t.frakturBold = (0, i.AddCSS)(f.frakturBold, { 8260: { c: "/" } });
    },
    3785: (c, t, e) => {
      Object.defineProperty(t, "__esModule", { value: true });
      t.fraktur = void 0;
      var i = e(92952);
      var f = e(59534);
      t.fraktur = (0, i.AddCSS)(f.fraktur, { 8260: { c: "/" } });
    },
    74868: (c, t, e) => {
      Object.defineProperty(t, "__esModule", { value: true });
      t.italic = void 0;
      var i = e(92952);
      var f = e(14141);
      t.italic = (0, i.AddCSS)(f.italic, {
        47: { f: "I" },
        989: { c: "\\E008", f: "A" },
        8213: { c: "\\2014" },
        8215: { c: "_" },
        8260: { c: "/", f: "I" },
        8710: { c: "\\394", f: "I" },
        10744: { c: "/", f: "I" },
      });
    },
    87434: (c, t, e) => {
      Object.defineProperty(t, "__esModule", { value: true });
      t.largeop = void 0;
      var i = e(92952);
      var f = e(63969);
      t.largeop = (0, i.AddCSS)(f.largeop, {
        8214: { f: "S1" },
        8260: { c: "/" },
        8593: { f: "S1" },
        8595: { f: "S1" },
        8657: { f: "S1" },
        8659: { f: "S1" },
        8739: { f: "S1" },
        8741: { f: "S1" },
        9001: { c: "\\27E8" },
        9002: { c: "\\27E9" },
        9168: { f: "S1" },
        10072: { c: "\\2223", f: "S1" },
        10764: { c: "\\222C\\222C" },
        12296: { c: "\\27E8" },
        12297: { c: "\\27E9" },
      });
    },
    82621: (c, t, e) => {
      Object.defineProperty(t, "__esModule", { value: true });
      t.monospace = void 0;
      var i = e(92952);
      var f = e(58626);
      t.monospace = (0, i.AddCSS)(f.monospace, {
        697: { c: "\\2032" },
        913: { c: "A" },
        914: { c: "B" },
        917: { c: "E" },
        918: { c: "Z" },
        919: { c: "H" },
        921: { c: "I" },
        922: { c: "K" },
        924: { c: "M" },
        925: { c: "N" },
        927: { c: "O" },
        929: { c: "P" },
        932: { c: "T" },
        935: { c: "X" },
        8215: { c: "_" },
        8243: { c: "\\2032\\2032" },
        8244: { c: "\\2032\\2032\\2032" },
        8260: { c: "/" },
        8279: { c: "\\2032\\2032\\2032\\2032" },
        8710: { c: "\\394" },
      });
    },
    56979: (c, t, e) => {
      Object.defineProperty(t, "__esModule", { value: true });
      t.normal = void 0;
      var i = e(92952);
      var f = e(25190);
      t.normal = (0, i.AddCSS)(f.normal, {
        163: { f: "MI" },
        165: { f: "A" },
        174: { f: "A" },
        183: { c: "\\22C5" },
        240: { f: "A" },
        697: { c: "\\2032" },
        913: { c: "A" },
        914: { c: "B" },
        917: { c: "E" },
        918: { c: "Z" },
        919: { c: "H" },
        921: { c: "I" },
        922: { c: "K" },
        924: { c: "M" },
        925: { c: "N" },
        927: { c: "O" },
        929: { c: "P" },
        932: { c: "T" },
        935: { c: "X" },
        8192: { c: "" },
        8193: { c: "" },
        8194: { c: "" },
        8195: { c: "" },
        8196: { c: "" },
        8197: { c: "" },
        8198: { c: "" },
        8201: { c: "" },
        8202: { c: "" },
        8203: { c: "" },
        8204: { c: "" },
        8213: { c: "\\2014" },
        8214: { c: "\\2225" },
        8215: { c: "_" },
        8226: { c: "\\2219" },
        8243: { c: "\\2032\\2032" },
        8244: { c: "\\2032\\2032\\2032" },
        8245: { f: "A" },
        8246: { c: "\\2035\\2035", f: "A" },
        8247: { c: "\\2035\\2035\\2035", f: "A" },
        8254: { c: "\\2C9" },
        8260: { c: "/" },
        8279: { c: "\\2032\\2032\\2032\\2032" },
        8288: { c: "" },
        8289: { c: "" },
        8290: { c: "" },
        8291: { c: "" },
        8292: { c: "" },
        8407: { c: "\\2192", f: "V" },
        8450: { c: "C", f: "A" },
        8459: { c: "H", f: "SC" },
        8460: { c: "H", f: "FR" },
        8461: { c: "H", f: "A" },
        8462: { c: "h", f: "I" },
        8463: { f: "A" },
        8464: { c: "I", f: "SC" },
        8465: { c: "I", f: "FR" },
        8466: { c: "L", f: "SC" },
        8469: { c: "N", f: "A" },
        8473: { c: "P", f: "A" },
        8474: { c: "Q", f: "A" },
        8475: { c: "R", f: "SC" },
        8476: { c: "R", f: "FR" },
        8477: { c: "R", f: "A" },
        8484: { c: "Z", f: "A" },
        8486: { c: "\\3A9" },
        8487: { f: "A" },
        8488: { c: "Z", f: "FR" },
        8492: { c: "B", f: "SC" },
        8493: { c: "C", f: "FR" },
        8496: { c: "E", f: "SC" },
        8497: { c: "F", f: "SC" },
        8498: { f: "A" },
        8499: { c: "M", f: "SC" },
        8502: { f: "A" },
        8503: { f: "A" },
        8504: { f: "A" },
        8513: { f: "A" },
        8602: { f: "A" },
        8603: { f: "A" },
        8606: { f: "A" },
        8608: { f: "A" },
        8610: { f: "A" },
        8611: { f: "A" },
        8619: { f: "A" },
        8620: { f: "A" },
        8621: { f: "A" },
        8622: { f: "A" },
        8624: { f: "A" },
        8625: { f: "A" },
        8630: { f: "A" },
        8631: { f: "A" },
        8634: { f: "A" },
        8635: { f: "A" },
        8638: { f: "A" },
        8639: { f: "A" },
        8642: { f: "A" },
        8643: { f: "A" },
        8644: { f: "A" },
        8646: { f: "A" },
        8647: { f: "A" },
        8648: { f: "A" },
        8649: { f: "A" },
        8650: { f: "A" },
        8651: { f: "A" },
        8653: { f: "A" },
        8654: { f: "A" },
        8655: { f: "A" },
        8666: { f: "A" },
        8667: { f: "A" },
        8669: { f: "A" },
        8672: { f: "A" },
        8674: { f: "A" },
        8705: { f: "A" },
        8708: { c: "\\2203\\338" },
        8710: { c: "\\394" },
        8716: { c: "\\220B\\338" },
        8717: { f: "A" },
        8719: { f: "S1" },
        8720: { f: "S1" },
        8721: { f: "S1" },
        8724: { f: "A" },
        8737: { f: "A" },
        8738: { f: "A" },
        8740: { f: "A" },
        8742: { f: "A" },
        8748: { f: "S1" },
        8749: { f: "S1" },
        8750: { f: "S1" },
        8756: { f: "A" },
        8757: { f: "A" },
        8765: { f: "A" },
        8769: { f: "A" },
        8770: { f: "A" },
        8772: { c: "\\2243\\338" },
        8775: { c: "\\2246", f: "A" },
        8777: { c: "\\2248\\338" },
        8778: { f: "A" },
        8782: { f: "A" },
        8783: { f: "A" },
        8785: { f: "A" },
        8786: { f: "A" },
        8787: { f: "A" },
        8790: { f: "A" },
        8791: { f: "A" },
        8796: { f: "A" },
        8802: { c: "\\2261\\338" },
        8806: { f: "A" },
        8807: { f: "A" },
        8808: { f: "A" },
        8809: { f: "A" },
        8812: { f: "A" },
        8813: { c: "\\224D\\338" },
        8814: { f: "A" },
        8815: { f: "A" },
        8816: { f: "A" },
        8817: { f: "A" },
        8818: { f: "A" },
        8819: { f: "A" },
        8820: { c: "\\2272\\338" },
        8821: { c: "\\2273\\338" },
        8822: { f: "A" },
        8823: { f: "A" },
        8824: { c: "\\2276\\338" },
        8825: { c: "\\2277\\338" },
        8828: { f: "A" },
        8829: { f: "A" },
        8830: { f: "A" },
        8831: { f: "A" },
        8832: { f: "A" },
        8833: { f: "A" },
        8836: { c: "\\2282\\338" },
        8837: { c: "\\2283\\338" },
        8840: { f: "A" },
        8841: { f: "A" },
        8842: { f: "A" },
        8843: { f: "A" },
        8847: { f: "A" },
        8848: { f: "A" },
        8858: { f: "A" },
        8859: { f: "A" },
        8861: { f: "A" },
        8862: { f: "A" },
        8863: { f: "A" },
        8864: { f: "A" },
        8865: { f: "A" },
        8873: { f: "A" },
        8874: { f: "A" },
        8876: { f: "A" },
        8877: { f: "A" },
        8878: { f: "A" },
        8879: { f: "A" },
        8882: { f: "A" },
        8883: { f: "A" },
        8884: { f: "A" },
        8885: { f: "A" },
        8888: { f: "A" },
        8890: { f: "A" },
        8891: { f: "A" },
        8892: { f: "A" },
        8896: { f: "S1" },
        8897: { f: "S1" },
        8898: { f: "S1" },
        8899: { f: "S1" },
        8903: { f: "A" },
        8905: { f: "A" },
        8906: { f: "A" },
        8907: { f: "A" },
        8908: { f: "A" },
        8909: { f: "A" },
        8910: { f: "A" },
        8911: { f: "A" },
        8912: { f: "A" },
        8913: { f: "A" },
        8914: { f: "A" },
        8915: { f: "A" },
        8916: { f: "A" },
        8918: { f: "A" },
        8919: { f: "A" },
        8920: { f: "A" },
        8921: { f: "A" },
        8922: { f: "A" },
        8923: { f: "A" },
        8926: { f: "A" },
        8927: { f: "A" },
        8928: { f: "A" },
        8929: { f: "A" },
        8930: { c: "\\2291\\338" },
        8931: { c: "\\2292\\338" },
        8934: { f: "A" },
        8935: { f: "A" },
        8936: { f: "A" },
        8937: { f: "A" },
        8938: { f: "A" },
        8939: { f: "A" },
        8940: { f: "A" },
        8941: { f: "A" },
        8965: { c: "\\22BC", f: "A" },
        8966: { c: "\\2A5E", f: "A" },
        8988: { c: "\\250C", f: "A" },
        8989: { c: "\\2510", f: "A" },
        8990: { c: "\\2514", f: "A" },
        8991: { c: "\\2518", f: "A" },
        9001: { c: "\\27E8" },
        9002: { c: "\\27E9" },
        9168: { f: "S1" },
        9416: { f: "A" },
        9484: { f: "A" },
        9488: { f: "A" },
        9492: { f: "A" },
        9496: { f: "A" },
        9585: { f: "A" },
        9586: { f: "A" },
        9632: { f: "A" },
        9633: { f: "A" },
        9642: { c: "\\25A0", f: "A" },
        9650: { f: "A" },
        9652: { c: "\\25B2", f: "A" },
        9653: { c: "\\25B3" },
        9654: { f: "A" },
        9656: { c: "\\25B6", f: "A" },
        9660: { f: "A" },
        9662: { c: "\\25BC", f: "A" },
        9663: { c: "\\25BD" },
        9664: { f: "A" },
        9666: { c: "\\25C0", f: "A" },
        9674: { f: "A" },
        9723: { c: "\\25A1", f: "A" },
        9724: { c: "\\25A0", f: "A" },
        9733: { f: "A" },
        10003: { f: "A" },
        10016: { f: "A" },
        10072: { c: "\\2223" },
        10731: { f: "A" },
        10744: { c: "/", f: "I" },
        10752: { f: "S1" },
        10753: { f: "S1" },
        10754: { f: "S1" },
        10756: { f: "S1" },
        10758: { f: "S1" },
        10764: { c: "\\222C\\222C", f: "S1" },
        10799: { c: "\\D7" },
        10846: { f: "A" },
        10877: { f: "A" },
        10878: { f: "A" },
        10885: { f: "A" },
        10886: { f: "A" },
        10887: { f: "A" },
        10888: { f: "A" },
        10889: { f: "A" },
        10890: { f: "A" },
        10891: { f: "A" },
        10892: { f: "A" },
        10901: { f: "A" },
        10902: { f: "A" },
        10933: { f: "A" },
        10934: { f: "A" },
        10935: { f: "A" },
        10936: { f: "A" },
        10937: { f: "A" },
        10938: { f: "A" },
        10949: { f: "A" },
        10950: { f: "A" },
        10955: { f: "A" },
        10956: { f: "A" },
        12296: { c: "\\27E8" },
        12297: { c: "\\27E9" },
        57350: { f: "A" },
        57351: { f: "A" },
        57352: { f: "A" },
        57353: { f: "A" },
        57356: { f: "A" },
        57357: { f: "A" },
        57358: { f: "A" },
        57359: { f: "A" },
        57360: { f: "A" },
        57361: { f: "A" },
        57366: { f: "A" },
        57367: { f: "A" },
        57368: { f: "A" },
        57369: { f: "A" },
        57370: { f: "A" },
        57371: { f: "A" },
        119808: { c: "A", f: "B" },
        119809: { c: "B", f: "B" },
        119810: { c: "C", f: "B" },
        119811: { c: "D", f: "B" },
        119812: { c: "E", f: "B" },
        119813: { c: "F", f: "B" },
        119814: { c: "G", f: "B" },
        119815: { c: "H", f: "B" },
        119816: { c: "I", f: "B" },
        119817: { c: "J", f: "B" },
        119818: { c: "K", f: "B" },
        119819: { c: "L", f: "B" },
        119820: { c: "M", f: "B" },
        119821: { c: "N", f: "B" },
        119822: { c: "O", f: "B" },
        119823: { c: "P", f: "B" },
        119824: { c: "Q", f: "B" },
        119825: { c: "R", f: "B" },
        119826: { c: "S", f: "B" },
        119827: { c: "T", f: "B" },
        119828: { c: "U", f: "B" },
        119829: { c: "V", f: "B" },
        119830: { c: "W", f: "B" },
        119831: { c: "X", f: "B" },
        119832: { c: "Y", f: "B" },
        119833: { c: "Z", f: "B" },
        119834: { c: "a", f: "B" },
        119835: { c: "b", f: "B" },
        119836: { c: "c", f: "B" },
        119837: { c: "d", f: "B" },
        119838: { c: "e", f: "B" },
        119839: { c: "f", f: "B" },
        119840: { c: "g", f: "B" },
        119841: { c: "h", f: "B" },
        119842: { c: "i", f: "B" },
        119843: { c: "j", f: "B" },
        119844: { c: "k", f: "B" },
        119845: { c: "l", f: "B" },
        119846: { c: "m", f: "B" },
        119847: { c: "n", f: "B" },
        119848: { c: "o", f: "B" },
        119849: { c: "p", f: "B" },
        119850: { c: "q", f: "B" },
        119851: { c: "r", f: "B" },
        119852: { c: "s", f: "B" },
        119853: { c: "t", f: "B" },
        119854: { c: "u", f: "B" },
        119855: { c: "v", f: "B" },
        119856: { c: "w", f: "B" },
        119857: { c: "x", f: "B" },
        119858: { c: "y", f: "B" },
        119859: { c: "z", f: "B" },
        119860: { c: "A", f: "I" },
        119861: { c: "B", f: "I" },
        119862: { c: "C", f: "I" },
        119863: { c: "D", f: "I" },
        119864: { c: "E", f: "I" },
        119865: { c: "F", f: "I" },
        119866: { c: "G", f: "I" },
        119867: { c: "H", f: "I" },
        119868: { c: "I", f: "I" },
        119869: { c: "J", f: "I" },
        119870: { c: "K", f: "I" },
        119871: { c: "L", f: "I" },
        119872: { c: "M", f: "I" },
        119873: { c: "N", f: "I" },
        119874: { c: "O", f: "I" },
        119875: { c: "P", f: "I" },
        119876: { c: "Q", f: "I" },
        119877: { c: "R", f: "I" },
        119878: { c: "S", f: "I" },
        119879: { c: "T", f: "I" },
        119880: { c: "U", f: "I" },
        119881: { c: "V", f: "I" },
        119882: { c: "W", f: "I" },
        119883: { c: "X", f: "I" },
        119884: { c: "Y", f: "I" },
        119885: { c: "Z", f: "I" },
        119886: { c: "a", f: "I" },
        119887: { c: "b", f: "I" },
        119888: { c: "c", f: "I" },
        119889: { c: "d", f: "I" },
        119890: { c: "e", f: "I" },
        119891: { c: "f", f: "I" },
        119892: { c: "g", f: "I" },
        119894: { c: "i", f: "I" },
        119895: { c: "j", f: "I" },
        119896: { c: "k", f: "I" },
        119897: { c: "l", f: "I" },
        119898: { c: "m", f: "I" },
        119899: { c: "n", f: "I" },
        119900: { c: "o", f: "I" },
        119901: { c: "p", f: "I" },
        119902: { c: "q", f: "I" },
        119903: { c: "r", f: "I" },
        119904: { c: "s", f: "I" },
        119905: { c: "t", f: "I" },
        119906: { c: "u", f: "I" },
        119907: { c: "v", f: "I" },
        119908: { c: "w", f: "I" },
        119909: { c: "x", f: "I" },
        119910: { c: "y", f: "I" },
        119911: { c: "z", f: "I" },
        119912: { c: "A", f: "BI" },
        119913: { c: "B", f: "BI" },
        119914: { c: "C", f: "BI" },
        119915: { c: "D", f: "BI" },
        119916: { c: "E", f: "BI" },
        119917: { c: "F", f: "BI" },
        119918: { c: "G", f: "BI" },
        119919: { c: "H", f: "BI" },
        119920: { c: "I", f: "BI" },
        119921: { c: "J", f: "BI" },
        119922: { c: "K", f: "BI" },
        119923: { c: "L", f: "BI" },
        119924: { c: "M", f: "BI" },
        119925: { c: "N", f: "BI" },
        119926: { c: "O", f: "BI" },
        119927: { c: "P", f: "BI" },
        119928: { c: "Q", f: "BI" },
        119929: { c: "R", f: "BI" },
        119930: { c: "S", f: "BI" },
        119931: { c: "T", f: "BI" },
        119932: { c: "U", f: "BI" },
        119933: { c: "V", f: "BI" },
        119934: { c: "W", f: "BI" },
        119935: { c: "X", f: "BI" },
        119936: { c: "Y", f: "BI" },
        119937: { c: "Z", f: "BI" },
        119938: { c: "a", f: "BI" },
        119939: { c: "b", f: "BI" },
        119940: { c: "c", f: "BI" },
        119941: { c: "d", f: "BI" },
        119942: { c: "e", f: "BI" },
        119943: { c: "f", f: "BI" },
        119944: { c: "g", f: "BI" },
        119945: { c: "h", f: "BI" },
        119946: { c: "i", f: "BI" },
        119947: { c: "j", f: "BI" },
        119948: { c: "k", f: "BI" },
        119949: { c: "l", f: "BI" },
        119950: { c: "m", f: "BI" },
        119951: { c: "n", f: "BI" },
        119952: { c: "o", f: "BI" },
        119953: { c: "p", f: "BI" },
        119954: { c: "q", f: "BI" },
        119955: { c: "r", f: "BI" },
        119956: { c: "s", f: "BI" },
        119957: { c: "t", f: "BI" },
        119958: { c: "u", f: "BI" },
        119959: { c: "v", f: "BI" },
        119960: { c: "w", f: "BI" },
        119961: { c: "x", f: "BI" },
        119962: { c: "y", f: "BI" },
        119963: { c: "z", f: "BI" },
        119964: { c: "A", f: "SC" },
        119966: { c: "C", f: "SC" },
        119967: { c: "D", f: "SC" },
        119970: { c: "G", f: "SC" },
        119973: { c: "J", f: "SC" },
        119974: { c: "K", f: "SC" },
        119977: { c: "N", f: "SC" },
        119978: { c: "O", f: "SC" },
        119979: { c: "P", f: "SC" },
        119980: { c: "Q", f: "SC" },
        119982: { c: "S", f: "SC" },
        119983: { c: "T", f: "SC" },
        119984: { c: "U", f: "SC" },
        119985: { c: "V", f: "SC" },
        119986: { c: "W", f: "SC" },
        119987: { c: "X", f: "SC" },
        119988: { c: "Y", f: "SC" },
        119989: { c: "Z", f: "SC" },
        120068: { c: "A", f: "FR" },
        120069: { c: "B", f: "FR" },
        120071: { c: "D", f: "FR" },
        120072: { c: "E", f: "FR" },
        120073: { c: "F", f: "FR" },
        120074: { c: "G", f: "FR" },
        120077: { c: "J", f: "FR" },
        120078: { c: "K", f: "FR" },
        120079: { c: "L", f: "FR" },
        120080: { c: "M", f: "FR" },
        120081: { c: "N", f: "FR" },
        120082: { c: "O", f: "FR" },
        120083: { c: "P", f: "FR" },
        120084: { c: "Q", f: "FR" },
        120086: { c: "S", f: "FR" },
        120087: { c: "T", f: "FR" },
        120088: { c: "U", f: "FR" },
        120089: { c: "V", f: "FR" },
        120090: { c: "W", f: "FR" },
        120091: { c: "X", f: "FR" },
        120092: { c: "Y", f: "FR" },
        120094: { c: "a", f: "FR" },
        120095: { c: "b", f: "FR" },
        120096: { c: "c", f: "FR" },
        120097: { c: "d", f: "FR" },
        120098: { c: "e", f: "FR" },
        120099: { c: "f", f: "FR" },
        120100: { c: "g", f: "FR" },
        120101: { c: "h", f: "FR" },
        120102: { c: "i", f: "FR" },
        120103: { c: "j", f: "FR" },
        120104: { c: "k", f: "FR" },
        120105: { c: "l", f: "FR" },
        120106: { c: "m", f: "FR" },
        120107: { c: "n", f: "FR" },
        120108: { c: "o", f: "FR" },
        120109: { c: "p", f: "FR" },
        120110: { c: "q", f: "FR" },
        120111: { c: "r", f: "FR" },
        120112: { c: "s", f: "FR" },
        120113: { c: "t", f: "FR" },
        120114: { c: "u", f: "FR" },
        120115: { c: "v", f: "FR" },
        120116: { c: "w", f: "FR" },
        120117: { c: "x", f: "FR" },
        120118: { c: "y", f: "FR" },
        120119: { c: "z", f: "FR" },
        120120: { c: "A", f: "A" },
        120121: { c: "B", f: "A" },
        120123: { c: "D", f: "A" },
        120124: { c: "E", f: "A" },
        120125: { c: "F", f: "A" },
        120126: { c: "G", f: "A" },
        120128: { c: "I", f: "A" },
        120129: { c: "J", f: "A" },
        120130: { c: "K", f: "A" },
        120131: { c: "L", f: "A" },
        120132: { c: "M", f: "A" },
        120134: { c: "O", f: "A" },
        120138: { c: "S", f: "A" },
        120139: { c: "T", f: "A" },
        120140: { c: "U", f: "A" },
        120141: { c: "V", f: "A" },
        120142: { c: "W", f: "A" },
        120143: { c: "X", f: "A" },
        120144: { c: "Y", f: "A" },
        120172: { c: "A", f: "FRB" },
        120173: { c: "B", f: "FRB" },
        120174: { c: "C", f: "FRB" },
        120175: { c: "D", f: "FRB" },
        120176: { c: "E", f: "FRB" },
        120177: { c: "F", f: "FRB" },
        120178: { c: "G", f: "FRB" },
        120179: { c: "H", f: "FRB" },
        120180: { c: "I", f: "FRB" },
        120181: { c: "J", f: "FRB" },
        120182: { c: "K", f: "FRB" },
        120183: { c: "L", f: "FRB" },
        120184: { c: "M", f: "FRB" },
        120185: { c: "N", f: "FRB" },
        120186: { c: "O", f: "FRB" },
        120187: { c: "P", f: "FRB" },
        120188: { c: "Q", f: "FRB" },
        120189: { c: "R", f: "FRB" },
        120190: { c: "S", f: "FRB" },
        120191: { c: "T", f: "FRB" },
        120192: { c: "U", f: "FRB" },
        120193: { c: "V", f: "FRB" },
        120194: { c: "W", f: "FRB" },
        120195: { c: "X", f: "FRB" },
        120196: { c: "Y", f: "FRB" },
        120197: { c: "Z", f: "FRB" },
        120198: { c: "a", f: "FRB" },
        120199: { c: "b", f: "FRB" },
        120200: { c: "c", f: "FRB" },
        120201: { c: "d", f: "FRB" },
        120202: { c: "e", f: "FRB" },
        120203: { c: "f", f: "FRB" },
        120204: { c: "g", f: "FRB" },
        120205: { c: "h", f: "FRB" },
        120206: { c: "i", f: "FRB" },
        120207: { c: "j", f: "FRB" },
        120208: { c: "k", f: "FRB" },
        120209: { c: "l", f: "FRB" },
        120210: { c: "m", f: "FRB" },
        120211: { c: "n", f: "FRB" },
        120212: { c: "o", f: "FRB" },
        120213: { c: "p", f: "FRB" },
        120214: { c: "q", f: "FRB" },
        120215: { c: "r", f: "FRB" },
        120216: { c: "s", f: "FRB" },
        120217: { c: "t", f: "FRB" },
        120218: { c: "u", f: "FRB" },
        120219: { c: "v", f: "FRB" },
        120220: { c: "w", f: "FRB" },
        120221: { c: "x", f: "FRB" },
        120222: { c: "y", f: "FRB" },
        120223: { c: "z", f: "FRB" },
        120224: { c: "A", f: "SS" },
        120225: { c: "B", f: "SS" },
        120226: { c: "C", f: "SS" },
        120227: { c: "D", f: "SS" },
        120228: { c: "E", f: "SS" },
        120229: { c: "F", f: "SS" },
        120230: { c: "G", f: "SS" },
        120231: { c: "H", f: "SS" },
        120232: { c: "I", f: "SS" },
        120233: { c: "J", f: "SS" },
        120234: { c: "K", f: "SS" },
        120235: { c: "L", f: "SS" },
        120236: { c: "M", f: "SS" },
        120237: { c: "N", f: "SS" },
        120238: { c: "O", f: "SS" },
        120239: { c: "P", f: "SS" },
        120240: { c: "Q", f: "SS" },
        120241: { c: "R", f: "SS" },
        120242: { c: "S", f: "SS" },
        120243: { c: "T", f: "SS" },
        120244: { c: "U", f: "SS" },
        120245: { c: "V", f: "SS" },
        120246: { c: "W", f: "SS" },
        120247: { c: "X", f: "SS" },
        120248: { c: "Y", f: "SS" },
        120249: { c: "Z", f: "SS" },
        120250: { c: "a", f: "SS" },
        120251: { c: "b", f: "SS" },
        120252: { c: "c", f: "SS" },
        120253: { c: "d", f: "SS" },
        120254: { c: "e", f: "SS" },
        120255: { c: "f", f: "SS" },
        120256: { c: "g", f: "SS" },
        120257: { c: "h", f: "SS" },
        120258: { c: "i", f: "SS" },
        120259: { c: "j", f: "SS" },
        120260: { c: "k", f: "SS" },
        120261: { c: "l", f: "SS" },
        120262: { c: "m", f: "SS" },
        120263: { c: "n", f: "SS" },
        120264: { c: "o", f: "SS" },
        120265: { c: "p", f: "SS" },
        120266: { c: "q", f: "SS" },
        120267: { c: "r", f: "SS" },
        120268: { c: "s", f: "SS" },
        120269: { c: "t", f: "SS" },
        120270: { c: "u", f: "SS" },
        120271: { c: "v", f: "SS" },
        120272: { c: "w", f: "SS" },
        120273: { c: "x", f: "SS" },
        120274: { c: "y", f: "SS" },
        120275: { c: "z", f: "SS" },
        120276: { c: "A", f: "SSB" },
        120277: { c: "B", f: "SSB" },
        120278: { c: "C", f: "SSB" },
        120279: { c: "D", f: "SSB" },
        120280: { c: "E", f: "SSB" },
        120281: { c: "F", f: "SSB" },
        120282: { c: "G", f: "SSB" },
        120283: { c: "H", f: "SSB" },
        120284: { c: "I", f: "SSB" },
        120285: { c: "J", f: "SSB" },
        120286: { c: "K", f: "SSB" },
        120287: { c: "L", f: "SSB" },
        120288: { c: "M", f: "SSB" },
        120289: { c: "N", f: "SSB" },
        120290: { c: "O", f: "SSB" },
        120291: { c: "P", f: "SSB" },
        120292: { c: "Q", f: "SSB" },
        120293: { c: "R", f: "SSB" },
        120294: { c: "S", f: "SSB" },
        120295: { c: "T", f: "SSB" },
        120296: { c: "U", f: "SSB" },
        120297: { c: "V", f: "SSB" },
        120298: { c: "W", f: "SSB" },
        120299: { c: "X", f: "SSB" },
        120300: { c: "Y", f: "SSB" },
        120301: { c: "Z", f: "SSB" },
        120302: { c: "a", f: "SSB" },
        120303: { c: "b", f: "SSB" },
        120304: { c: "c", f: "SSB" },
        120305: { c: "d", f: "SSB" },
        120306: { c: "e", f: "SSB" },
        120307: { c: "f", f: "SSB" },
        120308: { c: "g", f: "SSB" },
        120309: { c: "h", f: "SSB" },
        120310: { c: "i", f: "SSB" },
        120311: { c: "j", f: "SSB" },
        120312: { c: "k", f: "SSB" },
        120313: { c: "l", f: "SSB" },
        120314: { c: "m", f: "SSB" },
        120315: { c: "n", f: "SSB" },
        120316: { c: "o", f: "SSB" },
        120317: { c: "p", f: "SSB" },
        120318: { c: "q", f: "SSB" },
        120319: { c: "r", f: "SSB" },
        120320: { c: "s", f: "SSB" },
        120321: { c: "t", f: "SSB" },
        120322: { c: "u", f: "SSB" },
        120323: { c: "v", f: "SSB" },
        120324: { c: "w", f: "SSB" },
        120325: { c: "x", f: "SSB" },
        120326: { c: "y", f: "SSB" },
        120327: { c: "z", f: "SSB" },
        120328: { c: "A", f: "SSI" },
        120329: { c: "B", f: "SSI" },
        120330: { c: "C", f: "SSI" },
        120331: { c: "D", f: "SSI" },
        120332: { c: "E", f: "SSI" },
        120333: { c: "F", f: "SSI" },
        120334: { c: "G", f: "SSI" },
        120335: { c: "H", f: "SSI" },
        120336: { c: "I", f: "SSI" },
        120337: { c: "J", f: "SSI" },
        120338: { c: "K", f: "SSI" },
        120339: { c: "L", f: "SSI" },
        120340: { c: "M", f: "SSI" },
        120341: { c: "N", f: "SSI" },
        120342: { c: "O", f: "SSI" },
        120343: { c: "P", f: "SSI" },
        120344: { c: "Q", f: "SSI" },
        120345: { c: "R", f: "SSI" },
        120346: { c: "S", f: "SSI" },
        120347: { c: "T", f: "SSI" },
        120348: { c: "U", f: "SSI" },
        120349: { c: "V", f: "SSI" },
        120350: { c: "W", f: "SSI" },
        120351: { c: "X", f: "SSI" },
        120352: { c: "Y", f: "SSI" },
        120353: { c: "Z", f: "SSI" },
        120354: { c: "a", f: "SSI" },
        120355: { c: "b", f: "SSI" },
        120356: { c: "c", f: "SSI" },
        120357: { c: "d", f: "SSI" },
        120358: { c: "e", f: "SSI" },
        120359: { c: "f", f: "SSI" },
        120360: { c: "g", f: "SSI" },
        120361: { c: "h", f: "SSI" },
        120362: { c: "i", f: "SSI" },
        120363: { c: "j", f: "SSI" },
        120364: { c: "k", f: "SSI" },
        120365: { c: "l", f: "SSI" },
        120366: { c: "m", f: "SSI" },
        120367: { c: "n", f: "SSI" },
        120368: { c: "o", f: "SSI" },
        120369: { c: "p", f: "SSI" },
        120370: { c: "q", f: "SSI" },
        120371: { c: "r", f: "SSI" },
        120372: { c: "s", f: "SSI" },
        120373: { c: "t", f: "SSI" },
        120374: { c: "u", f: "SSI" },
        120375: { c: "v", f: "SSI" },
        120376: { c: "w", f: "SSI" },
        120377: { c: "x", f: "SSI" },
        120378: { c: "y", f: "SSI" },
        120379: { c: "z", f: "SSI" },
        120432: { c: "A", f: "T" },
        120433: { c: "B", f: "T" },
        120434: { c: "C", f: "T" },
        120435: { c: "D", f: "T" },
        120436: { c: "E", f: "T" },
        120437: { c: "F", f: "T" },
        120438: { c: "G", f: "T" },
        120439: { c: "H", f: "T" },
        120440: { c: "I", f: "T" },
        120441: { c: "J", f: "T" },
        120442: { c: "K", f: "T" },
        120443: { c: "L", f: "T" },
        120444: { c: "M", f: "T" },
        120445: { c: "N", f: "T" },
        120446: { c: "O", f: "T" },
        120447: { c: "P", f: "T" },
        120448: { c: "Q", f: "T" },
        120449: { c: "R", f: "T" },
        120450: { c: "S", f: "T" },
        120451: { c: "T", f: "T" },
        120452: { c: "U", f: "T" },
        120453: { c: "V", f: "T" },
        120454: { c: "W", f: "T" },
        120455: { c: "X", f: "T" },
        120456: { c: "Y", f: "T" },
        120457: { c: "Z", f: "T" },
        120458: { c: "a", f: "T" },
        120459: { c: "b", f: "T" },
        120460: { c: "c", f: "T" },
        120461: { c: "d", f: "T" },
        120462: { c: "e", f: "T" },
        120463: { c: "f", f: "T" },
        120464: { c: "g", f: "T" },
        120465: { c: "h", f: "T" },
        120466: { c: "i", f: "T" },
        120467: { c: "j", f: "T" },
        120468: { c: "k", f: "T" },
        120469: { c: "l", f: "T" },
        120470: { c: "m", f: "T" },
        120471: { c: "n", f: "T" },
        120472: { c: "o", f: "T" },
        120473: { c: "p", f: "T" },
        120474: { c: "q", f: "T" },
        120475: { c: "r", f: "T" },
        120476: { c: "s", f: "T" },
        120477: { c: "t", f: "T" },
        120478: { c: "u", f: "T" },
        120479: { c: "v", f: "T" },
        120480: { c: "w", f: "T" },
        120481: { c: "x", f: "T" },
        120482: { c: "y", f: "T" },
        120483: { c: "z", f: "T" },
        120488: { c: "A", f: "B" },
        120489: { c: "B", f: "B" },
        120490: { c: "\\393", f: "B" },
        120491: { c: "\\394", f: "B" },
        120492: { c: "E", f: "B" },
        120493: { c: "Z", f: "B" },
        120494: { c: "H", f: "B" },
        120495: { c: "\\398", f: "B" },
        120496: { c: "I", f: "B" },
        120497: { c: "K", f: "B" },
        120498: { c: "\\39B", f: "B" },
        120499: { c: "M", f: "B" },
        120500: { c: "N", f: "B" },
        120501: { c: "\\39E", f: "B" },
        120502: { c: "O", f: "B" },
        120503: { c: "\\3A0", f: "B" },
        120504: { c: "P", f: "B" },
        120506: { c: "\\3A3", f: "B" },
        120507: { c: "T", f: "B" },
        120508: { c: "\\3A5", f: "B" },
        120509: { c: "\\3A6", f: "B" },
        120510: { c: "X", f: "B" },
        120511: { c: "\\3A8", f: "B" },
        120512: { c: "\\3A9", f: "B" },
        120513: { c: "\\2207", f: "B" },
        120546: { c: "A", f: "I" },
        120547: { c: "B", f: "I" },
        120548: { c: "\\393", f: "I" },
        120549: { c: "\\394", f: "I" },
        120550: { c: "E", f: "I" },
        120551: { c: "Z", f: "I" },
        120552: { c: "H", f: "I" },
        120553: { c: "\\398", f: "I" },
        120554: { c: "I", f: "I" },
        120555: { c: "K", f: "I" },
        120556: { c: "\\39B", f: "I" },
        120557: { c: "M", f: "I" },
        120558: { c: "N", f: "I" },
        120559: { c: "\\39E", f: "I" },
        120560: { c: "O", f: "I" },
        120561: { c: "\\3A0", f: "I" },
        120562: { c: "P", f: "I" },
        120564: { c: "\\3A3", f: "I" },
        120565: { c: "T", f: "I" },
        120566: { c: "\\3A5", f: "I" },
        120567: { c: "\\3A6", f: "I" },
        120568: { c: "X", f: "I" },
        120569: { c: "\\3A8", f: "I" },
        120570: { c: "\\3A9", f: "I" },
        120572: { c: "\\3B1", f: "I" },
        120573: { c: "\\3B2", f: "I" },
        120574: { c: "\\3B3", f: "I" },
        120575: { c: "\\3B4", f: "I" },
        120576: { c: "\\3B5", f: "I" },
        120577: { c: "\\3B6", f: "I" },
        120578: { c: "\\3B7", f: "I" },
        120579: { c: "\\3B8", f: "I" },
        120580: { c: "\\3B9", f: "I" },
        120581: { c: "\\3BA", f: "I" },
        120582: { c: "\\3BB", f: "I" },
        120583: { c: "\\3BC", f: "I" },
        120584: { c: "\\3BD", f: "I" },
        120585: { c: "\\3BE", f: "I" },
        120586: { c: "\\3BF", f: "I" },
        120587: { c: "\\3C0", f: "I" },
        120588: { c: "\\3C1", f: "I" },
        120589: { c: "\\3C2", f: "I" },
        120590: { c: "\\3C3", f: "I" },
        120591: { c: "\\3C4", f: "I" },
        120592: { c: "\\3C5", f: "I" },
        120593: { c: "\\3C6", f: "I" },
        120594: { c: "\\3C7", f: "I" },
        120595: { c: "\\3C8", f: "I" },
        120596: { c: "\\3C9", f: "I" },
        120597: { c: "\\2202" },
        120598: { c: "\\3F5", f: "I" },
        120599: { c: "\\3D1", f: "I" },
        120600: { c: "\\E009", f: "A" },
        120601: { c: "\\3D5", f: "I" },
        120602: { c: "\\3F1", f: "I" },
        120603: { c: "\\3D6", f: "I" },
        120604: { c: "A", f: "BI" },
        120605: { c: "B", f: "BI" },
        120606: { c: "\\393", f: "BI" },
        120607: { c: "\\394", f: "BI" },
        120608: { c: "E", f: "BI" },
        120609: { c: "Z", f: "BI" },
        120610: { c: "H", f: "BI" },
        120611: { c: "\\398", f: "BI" },
        120612: { c: "I", f: "BI" },
        120613: { c: "K", f: "BI" },
        120614: { c: "\\39B", f: "BI" },
        120615: { c: "M", f: "BI" },
        120616: { c: "N", f: "BI" },
        120617: { c: "\\39E", f: "BI" },
        120618: { c: "O", f: "BI" },
        120619: { c: "\\3A0", f: "BI" },
        120620: { c: "P", f: "BI" },
        120622: { c: "\\3A3", f: "BI" },
        120623: { c: "T", f: "BI" },
        120624: { c: "\\3A5", f: "BI" },
        120625: { c: "\\3A6", f: "BI" },
        120626: { c: "X", f: "BI" },
        120627: { c: "\\3A8", f: "BI" },
        120628: { c: "\\3A9", f: "BI" },
        120630: { c: "\\3B1", f: "BI" },
        120631: { c: "\\3B2", f: "BI" },
        120632: { c: "\\3B3", f: "BI" },
        120633: { c: "\\3B4", f: "BI" },
        120634: { c: "\\3B5", f: "BI" },
        120635: { c: "\\3B6", f: "BI" },
        120636: { c: "\\3B7", f: "BI" },
        120637: { c: "\\3B8", f: "BI" },
        120638: { c: "\\3B9", f: "BI" },
        120639: { c: "\\3BA", f: "BI" },
        120640: { c: "\\3BB", f: "BI" },
        120641: { c: "\\3BC", f: "BI" },
        120642: { c: "\\3BD", f: "BI" },
        120643: { c: "\\3BE", f: "BI" },
        120644: { c: "\\3BF", f: "BI" },
        120645: { c: "\\3C0", f: "BI" },
        120646: { c: "\\3C1", f: "BI" },
        120647: { c: "\\3C2", f: "BI" },
        120648: { c: "\\3C3", f: "BI" },
        120649: { c: "\\3C4", f: "BI" },
        120650: { c: "\\3C5", f: "BI" },
        120651: { c: "\\3C6", f: "BI" },
        120652: { c: "\\3C7", f: "BI" },
        120653: { c: "\\3C8", f: "BI" },
        120654: { c: "\\3C9", f: "BI" },
        120655: { c: "\\2202", f: "B" },
        120656: { c: "\\3F5", f: "BI" },
        120657: { c: "\\3D1", f: "BI" },
        120658: { c: "\\E009", f: "A" },
        120659: { c: "\\3D5", f: "BI" },
        120660: { c: "\\3F1", f: "BI" },
        120661: { c: "\\3D6", f: "BI" },
        120662: { c: "A", f: "SSB" },
        120663: { c: "B", f: "SSB" },
        120664: { c: "\\393", f: "SSB" },
        120665: { c: "\\394", f: "SSB" },
        120666: { c: "E", f: "SSB" },
        120667: { c: "Z", f: "SSB" },
        120668: { c: "H", f: "SSB" },
        120669: { c: "\\398", f: "SSB" },
        120670: { c: "I", f: "SSB" },
        120671: { c: "K", f: "SSB" },
        120672: { c: "\\39B", f: "SSB" },
        120673: { c: "M", f: "SSB" },
        120674: { c: "N", f: "SSB" },
        120675: { c: "\\39E", f: "SSB" },
        120676: { c: "O", f: "SSB" },
        120677: { c: "\\3A0", f: "SSB" },
        120678: { c: "P", f: "SSB" },
        120680: { c: "\\3A3", f: "SSB" },
        120681: { c: "T", f: "SSB" },
        120682: { c: "\\3A5", f: "SSB" },
        120683: { c: "\\3A6", f: "SSB" },
        120684: { c: "X", f: "SSB" },
        120685: { c: "\\3A8", f: "SSB" },
        120686: { c: "\\3A9", f: "SSB" },
        120782: { c: "0", f: "B" },
        120783: { c: "1", f: "B" },
        120784: { c: "2", f: "B" },
        120785: { c: "3", f: "B" },
        120786: { c: "4", f: "B" },
        120787: { c: "5", f: "B" },
        120788: { c: "6", f: "B" },
        120789: { c: "7", f: "B" },
        120790: { c: "8", f: "B" },
        120791: { c: "9", f: "B" },
        120802: { c: "0", f: "SS" },
        120803: { c: "1", f: "SS" },
        120804: { c: "2", f: "SS" },
        120805: { c: "3", f: "SS" },
        120806: { c: "4", f: "SS" },
        120807: { c: "5", f: "SS" },
        120808: { c: "6", f: "SS" },
        120809: { c: "7", f: "SS" },
        120810: { c: "8", f: "SS" },
        120811: { c: "9", f: "SS" },
        120812: { c: "0", f: "SSB" },
        120813: { c: "1", f: "SSB" },
        120814: { c: "2", f: "SSB" },
        120815: { c: "3", f: "SSB" },
        120816: { c: "4", f: "SSB" },
        120817: { c: "5", f: "SSB" },
        120818: { c: "6", f: "SSB" },
        120819: { c: "7", f: "SSB" },
        120820: { c: "8", f: "SSB" },
        120821: { c: "9", f: "SSB" },
        120822: { c: "0", f: "T" },
        120823: { c: "1", f: "T" },
        120824: { c: "2", f: "T" },
        120825: { c: "3", f: "T" },
        120826: { c: "4", f: "T" },
        120827: { c: "5", f: "T" },
        120828: { c: "6", f: "T" },
        120829: { c: "7", f: "T" },
        120830: { c: "8", f: "T" },
        120831: { c: "9", f: "T" },
      });
    },
    83356: (c, t, e) => {
      Object.defineProperty(t, "__esModule", { value: true });
      t.sansSerifBoldItalic = void 0;
      var i = e(92952);
      var f = e(47033);
      t.sansSerifBoldItalic = (0, i.AddCSS)(f.sansSerifBoldItalic, { 305: { f: "SSB" }, 567: { f: "SSB" } });
    },
    11211: (c, t, e) => {
      Object.defineProperty(t, "__esModule", { value: true });
      t.sansSerifBold = void 0;
      var i = e(92952);
      var f = e(94872);
      t.sansSerifBold = (0, i.AddCSS)(f.sansSerifBold, {
        8213: { c: "\\2014" },
        8215: { c: "_" },
        8260: { c: "/" },
        8710: { c: "\\394" },
      });
    },
    76316: (c, t, e) => {
      Object.defineProperty(t, "__esModule", { value: true });
      t.sansSerifItalic = void 0;
      var i = e(92952);
      var f = e(9255);
      t.sansSerifItalic = (0, i.AddCSS)(f.sansSerifItalic, {
        913: { c: "A" },
        914: { c: "B" },
        917: { c: "E" },
        918: { c: "Z" },
        919: { c: "H" },
        921: { c: "I" },
        922: { c: "K" },
        924: { c: "M" },
        925: { c: "N" },
        927: { c: "O" },
        929: { c: "P" },
        932: { c: "T" },
        935: { c: "X" },
        8213: { c: "\\2014" },
        8215: { c: "_" },
        8260: { c: "/" },
        8710: { c: "\\394" },
      });
    },
    16651: (c, t, e) => {
      Object.defineProperty(t, "__esModule", { value: true });
      t.sansSerif = void 0;
      var i = e(92952);
      var f = e(83366);
      t.sansSerif = (0, i.AddCSS)(f.sansSerif, {
        913: { c: "A" },
        914: { c: "B" },
        917: { c: "E" },
        918: { c: "Z" },
        919: { c: "H" },
        921: { c: "I" },
        922: { c: "K" },
        924: { c: "M" },
        925: { c: "N" },
        927: { c: "O" },
        929: { c: "P" },
        932: { c: "T" },
        935: { c: "X" },
        8213: { c: "\\2014" },
        8215: { c: "_" },
        8260: { c: "/" },
        8710: { c: "\\394" },
      });
    },
    56755: (c, t, e) => {
      Object.defineProperty(t, "__esModule", { value: true });
      t.scriptBold = void 0;
      var i = e(21616);
      Object.defineProperty(t, "scriptBold", {
        enumerable: true,
        get: function () {
          return i.scriptBold;
        },
      });
    },
    45491: (c, t, e) => {
      Object.defineProperty(t, "__esModule", { value: true });
      t.script = void 0;
      var i = e(24062);
      Object.defineProperty(t, "script", {
        enumerable: true,
        get: function () {
          return i.script;
        },
      });
    },
    7598: (c, t, e) => {
      Object.defineProperty(t, "__esModule", { value: true });
      t.smallop = void 0;
      var i = e(92952);
      var f = e(22578);
      t.smallop = (0, i.AddCSS)(f.smallop, {
        8260: { c: "/" },
        9001: { c: "\\27E8" },
        9002: { c: "\\27E9" },
        10072: { c: "\\2223" },
        10764: { c: "\\222C\\222C" },
        12296: { c: "\\27E8" },
        12297: { c: "\\27E9" },
      });
    },
    83085: (c, t, e) => {
      Object.defineProperty(t, "__esModule", { value: true });
      t.texCalligraphicBold = void 0;
      var i = e(92952);
      var f = e(70286);
      t.texCalligraphicBold = (0, i.AddCSS)(f.texCalligraphicBold, { 305: { f: "B" }, 567: { f: "B" } });
    },
    74681: (c, t, e) => {
      Object.defineProperty(t, "__esModule", { value: true });
      t.texCalligraphic = void 0;
      var i = e(57552);
      Object.defineProperty(t, "texCalligraphic", {
        enumerable: true,
        get: function () {
          return i.texCalligraphic;
        },
      });
    },
    91611: (c, t, e) => {
      Object.defineProperty(t, "__esModule", { value: true });
      t.texMathit = void 0;
      var i = e(24398);
      Object.defineProperty(t, "texMathit", {
        enumerable: true,
        get: function () {
          return i.texMathit;
        },
      });
    },
    56848: (c, t, e) => {
      Object.defineProperty(t, "__esModule", { value: true });
      t.texOldstyleBold = void 0;
      var i = e(20628);
      Object.defineProperty(t, "texOldstyleBold", {
        enumerable: true,
        get: function () {
          return i.texOldstyleBold;
        },
      });
    },
    74878: (c, t, e) => {
      Object.defineProperty(t, "__esModule", { value: true });
      t.texOldstyle = void 0;
      var i = e(41855);
      Object.defineProperty(t, "texOldstyle", {
        enumerable: true,
        get: function () {
          return i.texOldstyle;
        },
      });
    },
    99652: (c, t, e) => {
      Object.defineProperty(t, "__esModule", { value: true });
      t.texSize3 = void 0;
      var i = e(92952);
      var f = e(75431);
      t.texSize3 = (0, i.AddCSS)(f.texSize3, {
        8260: { c: "/" },
        9001: { c: "\\27E8" },
        9002: { c: "\\27E9" },
        12296: { c: "\\27E8" },
        12297: { c: "\\27E9" },
      });
    },
    39729: (c, t, e) => {
      Object.defineProperty(t, "__esModule", { value: true });
      t.texSize4 = void 0;
      var i = e(92952);
      var f = e(98278);
      t.texSize4 = (0, i.AddCSS)(f.texSize4, {
        8260: { c: "/" },
        9001: { c: "\\27E8" },
        9002: { c: "\\27E9" },
        12296: { c: "\\27E8" },
        12297: { c: "\\27E9" },
        57685: { c: "\\E153\\E152" },
        57686: { c: "\\E151\\E150" },
      });
    },
    82599: (c, t, e) => {
      Object.defineProperty(t, "__esModule", { value: true });
      t.texVariant = void 0;
      var i = e(92952);
      var f = e(90456);
      t.texVariant = (0, i.AddCSS)(f.texVariant, {
        1008: { c: "\\E009" },
        8463: { f: "" },
        8740: { c: "\\E006" },
        8742: { c: "\\E007" },
        8808: { c: "\\E00C" },
        8809: { c: "\\E00D" },
        8816: { c: "\\E011" },
        8817: { c: "\\E00E" },
        8840: { c: "\\E016" },
        8841: { c: "\\E018" },
        8842: { c: "\\E01A" },
        8843: { c: "\\E01B" },
        10887: { c: "\\E010" },
        10888: { c: "\\E00F" },
        10955: { c: "\\E017" },
        10956: { c: "\\E019" },
      });
    },
    30861: function (c, t, e) {
      var i =
        (this && this.__assign) ||
        function () {
          i =
            Object.assign ||
            function (c) {
              for (var t, e = 1, i = arguments.length; e < i; e++) {
                t = arguments[e];
                for (var f in t) if (Object.prototype.hasOwnProperty.call(t, f)) c[f] = t[f];
              }
              return c;
            };
          return i.apply(this, arguments);
        };
      var f =
        (this && this.__read) ||
        function (c, t) {
          var e = typeof Symbol === "function" && c[Symbol.iterator];
          if (!e) return c;
          var i = e.call(c),
            f,
            r = [],
            s;
          try {
            while ((t === void 0 || t-- > 0) && !(f = i.next()).done) r.push(f.value);
          } catch (a) {
            s = { error: a };
          } finally {
            try {
              if (f && !f.done && (e = i["return"])) e.call(i);
            } finally {
              if (s) throw s.error;
            }
          }
          return r;
        };
      var r =
        (this && this.__spreadArray) ||
        function (c, t, e) {
          if (e || arguments.length === 2)
            for (var i = 0, f = t.length, r; i < f; i++) {
              if (r || !(i in t)) {
                if (!r) r = Array.prototype.slice.call(t, 0, i);
                r[i] = t[i];
              }
            }
          return c.concat(r || Array.prototype.slice.call(t));
        };
      var s =
        (this && this.__values) ||
        function (c) {
          var t = typeof Symbol === "function" && Symbol.iterator,
            e = t && c[t],
            i = 0;
          if (e) return e.call(c);
          if (c && typeof c.length === "number")
            return {
              next: function () {
                if (c && i >= c.length) c = void 0;
                return { value: c && c[i++], done: !c };
              },
            };
          throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
        };
      Object.defineProperty(t, "__esModule", { value: true });
      t.FontData = t.NOSTRETCH = t.H = t.V = void 0;
      var a = e(34981);
      t.V = 1;
      t.H = 2;
      t.NOSTRETCH = { dir: 0 };
      var o = (function () {
        function c(c) {
          var t, e, o, n;
          if (c === void 0) {
            c = null;
          }
          this.variant = {};
          this.delimiters = {};
          this.cssFontMap = {};
          this.remapChars = {};
          this.skewIcFactor = 0.75;
          var l = this.constructor;
          this.options = (0, a.userOptions)((0, a.defaultOptions)({}, l.OPTIONS), c);
          this.params = i({}, l.defaultParams);
          this.sizeVariants = r([], f(l.defaultSizeVariants), false);
          this.stretchVariants = r([], f(l.defaultStretchVariants), false);
          this.cssFontMap = i({}, l.defaultCssFonts);
          try {
            for (var d = s(Object.keys(this.cssFontMap)), S = d.next(); !S.done; S = d.next()) {
              var u = S.value;
              if (this.cssFontMap[u][0] === "unknown") {
                this.cssFontMap[u][0] = this.options.unknownFamily;
              }
            }
          } catch (v) {
            t = { error: v };
          } finally {
            try {
              if (S && !S.done && (e = d.return)) e.call(d);
            } finally {
              if (t) throw t.error;
            }
          }
          this.cssFamilyPrefix = l.defaultCssFamilyPrefix;
          this.createVariants(l.defaultVariants);
          this.defineDelimiters(l.defaultDelimiters);
          try {
            for (var h = s(Object.keys(l.defaultChars)), p = h.next(); !p.done; p = h.next()) {
              var B = p.value;
              this.defineChars(B, l.defaultChars[B]);
            }
          } catch (m) {
            o = { error: m };
          } finally {
            try {
              if (p && !p.done && (n = h.return)) n.call(h);
            } finally {
              if (o) throw o.error;
            }
          }
          this.defineRemap("accent", l.defaultAccentMap);
          this.defineRemap("mo", l.defaultMoMap);
          this.defineRemap("mn", l.defaultMnMap);
        }
        c.charOptions = function (c, t) {
          var e = c[t];
          if (e.length === 3) {
            e[3] = {};
          }
          return e[3];
        };
        Object.defineProperty(c.prototype, "styles", {
          get: function () {
            return this._styles;
          },
          set: function (c) {
            this._styles = c;
          },
          enumerable: false,
          configurable: true,
        });
        c.prototype.createVariant = function (c, t, e) {
          if (t === void 0) {
            t = null;
          }
          if (e === void 0) {
            e = null;
          }
          var i = { linked: [], chars: t ? Object.create(this.variant[t].chars) : {} };
          if (e && this.variant[e]) {
            Object.assign(i.chars, this.variant[e].chars);
            this.variant[e].linked.push(i.chars);
            i.chars = Object.create(i.chars);
          }
          this.remapSmpChars(i.chars, c);
          this.variant[c] = i;
        };
        c.prototype.remapSmpChars = function (c, t) {
          var e, i, r, a;
          var o = this.constructor;
          if (o.VariantSmp[t]) {
            var n = o.SmpRemap;
            var l = [null, null, o.SmpRemapGreekU, o.SmpRemapGreekL];
            try {
              for (var d = s(o.SmpRanges), S = d.next(); !S.done; S = d.next()) {
                var u = f(S.value, 3),
                  h = u[0],
                  p = u[1],
                  B = u[2];
                var v = o.VariantSmp[t][h];
                if (!v) continue;
                for (var m = p; m <= B; m++) {
                  if (m === 930) continue;
                  var k = v + m - p;
                  c[m] = this.smpChar(n[k] || k);
                }
                if (l[h]) {
                  try {
                    for (
                      var y =
                          ((r = void 0),
                          s(
                            Object.keys(l[h]).map(function (c) {
                              return parseInt(c);
                            }),
                          )),
                        I = y.next();
                      !I.done;
                      I = y.next()
                    ) {
                      var m = I.value;
                      c[m] = this.smpChar(v + l[h][m]);
                    }
                  } catch (A) {
                    r = { error: A };
                  } finally {
                    try {
                      if (I && !I.done && (a = y.return)) a.call(y);
                    } finally {
                      if (r) throw r.error;
                    }
                  }
                }
              }
            } catch (b) {
              e = { error: b };
            } finally {
              try {
                if (S && !S.done && (i = d.return)) i.call(d);
              } finally {
                if (e) throw e.error;
              }
            }
          }
          if (t === "bold") {
            c[988] = this.smpChar(120778);
            c[989] = this.smpChar(120779);
          }
        };
        c.prototype.smpChar = function (c) {
          return [, , , { smp: c }];
        };
        c.prototype.createVariants = function (c) {
          var t, e;
          try {
            for (var i = s(c), f = i.next(); !f.done; f = i.next()) {
              var r = f.value;
              this.createVariant(r[0], r[1], r[2]);
            }
          } catch (a) {
            t = { error: a };
          } finally {
            try {
              if (f && !f.done && (e = i.return)) e.call(i);
            } finally {
              if (t) throw t.error;
            }
          }
        };
        c.prototype.defineChars = function (c, t) {
          var e, i;
          var f = this.variant[c];
          Object.assign(f.chars, t);
          try {
            for (var r = s(f.linked), a = r.next(); !a.done; a = r.next()) {
              var o = a.value;
              Object.assign(o, t);
            }
          } catch (n) {
            e = { error: n };
          } finally {
            try {
              if (a && !a.done && (i = r.return)) i.call(r);
            } finally {
              if (e) throw e.error;
            }
          }
        };
        c.prototype.defineDelimiters = function (c) {
          Object.assign(this.delimiters, c);
        };
        c.prototype.defineRemap = function (c, t) {
          if (!this.remapChars.hasOwnProperty(c)) {
            this.remapChars[c] = {};
          }
          Object.assign(this.remapChars[c], t);
        };
        c.prototype.getDelimiter = function (c) {
          return this.delimiters[c];
        };
        c.prototype.getSizeVariant = function (c, t) {
          if (this.delimiters[c].variants) {
            t = this.delimiters[c].variants[t];
          }
          return this.sizeVariants[t];
        };
        c.prototype.getStretchVariant = function (c, t) {
          return this.stretchVariants[this.delimiters[c].stretchv ? this.delimiters[c].stretchv[t] : 0];
        };
        c.prototype.getChar = function (c, t) {
          return this.variant[c].chars[t];
        };
        c.prototype.getVariant = function (c) {
          return this.variant[c];
        };
        c.prototype.getCssFont = function (c) {
          return this.cssFontMap[c] || ["serif", false, false];
        };
        c.prototype.getFamily = function (c) {
          return this.cssFamilyPrefix ? this.cssFamilyPrefix + ", " + c : c;
        };
        c.prototype.getRemappedChar = function (c, t) {
          var e = this.remapChars[c] || {};
          return e[t];
        };
        c.OPTIONS = { unknownFamily: "serif" };
        c.JAX = "common";
        c.NAME = "";
        c.defaultVariants = [
          ["normal"],
          ["bold", "normal"],
          ["italic", "normal"],
          ["bold-italic", "italic", "bold"],
          ["double-struck", "bold"],
          ["fraktur", "normal"],
          ["bold-fraktur", "bold", "fraktur"],
          ["script", "italic"],
          ["bold-script", "bold-italic", "script"],
          ["sans-serif", "normal"],
          ["bold-sans-serif", "bold", "sans-serif"],
          ["sans-serif-italic", "italic", "sans-serif"],
          ["sans-serif-bold-italic", "bold-italic", "bold-sans-serif"],
          ["monospace", "normal"],
        ];
        c.defaultCssFonts = {
          normal: ["unknown", false, false],
          bold: ["unknown", false, true],
          italic: ["unknown", true, false],
          "bold-italic": ["unknown", true, true],
          "double-struck": ["unknown", false, true],
          fraktur: ["unknown", false, false],
          "bold-fraktur": ["unknown", false, true],
          script: ["cursive", false, false],
          "bold-script": ["cursive", false, true],
          "sans-serif": ["sans-serif", false, false],
          "bold-sans-serif": ["sans-serif", false, true],
          "sans-serif-italic": ["sans-serif", true, false],
          "sans-serif-bold-italic": ["sans-serif", true, true],
          monospace: ["monospace", false, false],
        };
        c.defaultCssFamilyPrefix = "";
        c.VariantSmp = {
          bold: [119808, 119834, 120488, 120514, 120782],
          italic: [119860, 119886, 120546, 120572],
          "bold-italic": [119912, 119938, 120604, 120630],
          script: [119964, 119990],
          "bold-script": [120016, 120042],
          fraktur: [120068, 120094],
          "double-struck": [120120, 120146, , , 120792],
          "bold-fraktur": [120172, 120198],
          "sans-serif": [120224, 120250, , , 120802],
          "bold-sans-serif": [120276, 120302, 120662, 120688, 120812],
          "sans-serif-italic": [120328, 120354],
          "sans-serif-bold-italic": [120380, 120406, 120720, 120746],
          monospace: [120432, 120458, , , 120822],
        };
        c.SmpRanges = [
          [0, 65, 90],
          [1, 97, 122],
          [2, 913, 937],
          [3, 945, 969],
          [4, 48, 57],
        ];
        c.SmpRemap = {
          119893: 8462,
          119965: 8492,
          119968: 8496,
          119969: 8497,
          119971: 8459,
          119972: 8464,
          119975: 8466,
          119976: 8499,
          119981: 8475,
          119994: 8495,
          119996: 8458,
          120004: 8500,
          120070: 8493,
          120075: 8460,
          120076: 8465,
          120085: 8476,
          120093: 8488,
          120122: 8450,
          120127: 8461,
          120133: 8469,
          120135: 8473,
          120136: 8474,
          120137: 8477,
          120145: 8484,
        };
        c.SmpRemapGreekU = { 8711: 25, 1012: 17 };
        c.SmpRemapGreekL = { 977: 27, 981: 29, 982: 31, 1008: 28, 1009: 30, 1013: 26, 8706: 25 };
        c.defaultAccentMap = {
          768: "ˋ",
          769: "ˊ",
          770: "ˆ",
          771: "˜",
          772: "ˉ",
          774: "˘",
          775: "˙",
          776: "¨",
          778: "˚",
          780: "ˇ",
          8594: "⃗",
          8242: "'",
          8243: "''",
          8244: "'''",
          8245: "`",
          8246: "``",
          8247: "```",
          8279: "''''",
          8400: "↼",
          8401: "⇀",
          8406: "←",
          8417: "↔",
          8432: "*",
          8411: "...",
          8412: "....",
          8428: "⇁",
          8429: "↽",
          8430: "←",
          8431: "→",
        };
        c.defaultMoMap = { 45: "−" };
        c.defaultMnMap = { 45: "−" };
        c.defaultParams = {
          x_height: 0.442,
          quad: 1,
          num1: 0.676,
          num2: 0.394,
          num3: 0.444,
          denom1: 0.686,
          denom2: 0.345,
          sup1: 0.413,
          sup2: 0.363,
          sup3: 0.289,
          sub1: 0.15,
          sub2: 0.247,
          sup_drop: 0.386,
          sub_drop: 0.05,
          delim1: 2.39,
          delim2: 1,
          axis_height: 0.25,
          rule_thickness: 0.06,
          big_op_spacing1: 0.111,
          big_op_spacing2: 0.167,
          big_op_spacing3: 0.2,
          big_op_spacing4: 0.6,
          big_op_spacing5: 0.1,
          surd_height: 0.075,
          scriptspace: 0.05,
          nulldelimiterspace: 0.12,
          delimiterfactor: 901,
          delimitershortfall: 0.3,
          min_rule_thickness: 1.25,
          separation_factor: 1.75,
          extra_ic: 0.033,
        };
        c.defaultDelimiters = {};
        c.defaultChars = {};
        c.defaultSizeVariants = [];
        c.defaultStretchVariants = [];
        return c;
      })();
      t.FontData = o;
    },
    6382: function (c, t) {
      var e =
        (this && this.__extends) ||
        (function () {
          var c = function (t, e) {
            c =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (c, t) {
                  c.__proto__ = t;
                }) ||
              function (c, t) {
                for (var e in t) if (Object.prototype.hasOwnProperty.call(t, e)) c[e] = t[e];
              };
            return c(t, e);
          };
          return function (t, e) {
            if (typeof e !== "function" && e !== null)
              throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");
            c(t, e);
            function i() {
              this.constructor = t;
            }
            t.prototype = e === null ? Object.create(e) : ((i.prototype = e.prototype), new i());
          };
        })();
      var i =
        (this && this.__assign) ||
        function () {
          i =
            Object.assign ||
            function (c) {
              for (var t, e = 1, i = arguments.length; e < i; e++) {
                t = arguments[e];
                for (var f in t) if (Object.prototype.hasOwnProperty.call(t, f)) c[f] = t[f];
              }
              return c;
            };
          return i.apply(this, arguments);
        };
      var f =
        (this && this.__read) ||
        function (c, t) {
          var e = typeof Symbol === "function" && c[Symbol.iterator];
          if (!e) return c;
          var i = e.call(c),
            f,
            r = [],
            s;
          try {
            while ((t === void 0 || t-- > 0) && !(f = i.next()).done) r.push(f.value);
          } catch (a) {
            s = { error: a };
          } finally {
            try {
              if (f && !f.done && (e = i["return"])) e.call(i);
            } finally {
              if (s) throw s.error;
            }
          }
          return r;
        };
      var r =
        (this && this.__spreadArray) ||
        function (c, t, e) {
          if (e || arguments.length === 2)
            for (var i = 0, f = t.length, r; i < f; i++) {
              if (r || !(i in t)) {
                if (!r) r = Array.prototype.slice.call(t, 0, i);
                r[i] = t[i];
              }
            }
          return c.concat(r || Array.prototype.slice.call(t));
        };
      Object.defineProperty(t, "__esModule", { value: true });
      t.CommonTeXFontMixin = void 0;
      function s(c) {
        var t;
        return (
          (t = (function (c) {
            e(t, c);
            function t() {
              return (c !== null && c.apply(this, arguments)) || this;
            }
            t.prototype.getDelimiterData = function (c) {
              return this.getChar("-smallop", c) || this.getChar("-size4", c);
            };
            return t;
          })(c)),
          (t.NAME = "TeX"),
          (t.defaultVariants = r(
            r([], f(c.defaultVariants), false),
            [
              ["-smallop", "normal"],
              ["-largeop", "normal"],
              ["-size3", "normal"],
              ["-size4", "normal"],
              ["-tex-calligraphic", "italic"],
              ["-tex-bold-calligraphic", "bold-italic"],
              ["-tex-oldstyle", "normal"],
              ["-tex-bold-oldstyle", "bold"],
              ["-tex-mathit", "italic"],
              ["-tex-variant", "normal"],
            ],
            false,
          )),
          (t.defaultCssFonts = i(i({}, c.defaultCssFonts), {
            "-smallop": ["serif", false, false],
            "-largeop": ["serif", false, false],
            "-size3": ["serif", false, false],
            "-size4": ["serif", false, false],
            "-tex-calligraphic": ["cursive", true, false],
            "-tex-bold-calligraphic": ["cursive", true, true],
            "-tex-oldstyle": ["serif", false, false],
            "-tex-bold-oldstyle": ["serif", false, true],
            "-tex-mathit": ["serif", true, false],
          })),
          (t.defaultSizeVariants = ["normal", "-smallop", "-largeop", "-size3", "-size4", "-tex-variant"]),
          (t.defaultStretchVariants = ["-size4"]),
          t
        );
      }
      t.CommonTeXFontMixin = s;
    },
    51091: (c, t) => {
      Object.defineProperty(t, "__esModule", { value: true });
      t.boldItalic = void 0;
      t.boldItalic = {
        47: [0.711, 0.21, 0.894],
        305: [0.452, 0.008, 0.394, { sk: 0.0319 }],
        567: [0.451, 0.201, 0.439, { sk: 0.0958 }],
        8260: [0.711, 0.21, 0.894],
        8710: [0.711, 0, 0.958, { sk: 0.192 }],
        10744: [0.711, 0.21, 0.894],
      };
    },
    95746: (c, t) => {
      Object.defineProperty(t, "__esModule", { value: true });
      t.bold = void 0;
      t.bold = {
        33: [0.705, 0, 0.35],
        34: [0.694, -0.329, 0.603],
        35: [0.694, 0.193, 0.958],
        36: [0.75, 0.056, 0.575],
        37: [0.75, 0.056, 0.958],
        38: [0.705, 0.011, 0.894],
        39: [0.694, -0.329, 0.319],
        40: [0.75, 0.249, 0.447],
        41: [0.75, 0.249, 0.447],
        42: [0.75, -0.306, 0.575],
        43: [0.633, 0.131, 0.894],
        44: [0.171, 0.194, 0.319],
        45: [0.278, -0.166, 0.383],
        46: [0.171, 0, 0.319],
        47: [0.75, 0.25, 0.575],
        58: [0.444, 0, 0.319],
        59: [0.444, 0.194, 0.319],
        60: [0.587, 0.085, 0.894],
        61: [0.393, -0.109, 0.894],
        62: [0.587, 0.085, 0.894],
        63: [0.7, 0, 0.543],
        64: [0.699, 0.006, 0.894],
        91: [0.75, 0.25, 0.319],
        92: [0.75, 0.25, 0.575],
        93: [0.75, 0.25, 0.319],
        94: [0.694, -0.52, 0.575],
        95: [-0.01, 0.061, 0.575],
        96: [0.706, -0.503, 0.575],
        123: [0.75, 0.25, 0.575],
        124: [0.75, 0.249, 0.319],
        125: [0.75, 0.25, 0.575],
        126: [0.344, -0.202, 0.575],
        168: [0.695, -0.535, 0.575],
        172: [0.371, -0.061, 0.767],
        175: [0.607, -0.54, 0.575],
        176: [0.702, -0.536, 0.575],
        177: [0.728, 0.035, 0.894],
        180: [0.706, -0.503, 0.575],
        183: [0.336, -0.166, 0.319],
        215: [0.53, 0.028, 0.894],
        247: [0.597, 0.096, 0.894],
        305: [0.442, 0, 0.278, { sk: 0.0278 }],
        567: [0.442, 0.205, 0.306, { sk: 0.0833 }],
        697: [0.563, -0.033, 0.344],
        710: [0.694, -0.52, 0.575],
        711: [0.66, -0.515, 0.575],
        713: [0.607, -0.54, 0.575],
        714: [0.706, -0.503, 0.575],
        715: [0.706, -0.503, 0.575],
        728: [0.694, -0.5, 0.575],
        729: [0.695, -0.525, 0.575],
        730: [0.702, -0.536, 0.575],
        732: [0.694, -0.552, 0.575],
        768: [0.706, -0.503, 0],
        769: [0.706, -0.503, 0],
        770: [0.694, -0.52, 0],
        771: [0.694, -0.552, 0],
        772: [0.607, -0.54, 0],
        774: [0.694, -0.5, 0],
        775: [0.695, -0.525, 0],
        776: [0.695, -0.535, 0],
        778: [0.702, -0.536, 0],
        779: [0.714, -0.511, 0],
        780: [0.66, -0.515, 0],
        824: [0.711, 0.21, 0],
        8194: [0, 0, 0.5],
        8195: [0, 0, 0.999],
        8196: [0, 0, 0.333],
        8197: [0, 0, 0.25],
        8198: [0, 0, 0.167],
        8201: [0, 0, 0.167],
        8202: [0, 0, 0.083],
        8211: [0.3, -0.249, 0.575],
        8212: [0.3, -0.249, 1.15],
        8213: [0.3, -0.249, 1.15],
        8214: [0.75, 0.248, 0.575],
        8215: [-0.01, 0.061, 0.575],
        8216: [0.694, -0.329, 0.319],
        8217: [0.694, -0.329, 0.319],
        8220: [0.694, -0.329, 0.603],
        8221: [0.694, -0.329, 0.603],
        8224: [0.702, 0.211, 0.511],
        8225: [0.702, 0.202, 0.511],
        8226: [0.474, -0.028, 0.575],
        8230: [0.171, 0, 1.295],
        8242: [0.563, -0.033, 0.344],
        8243: [0.563, 0, 0.688],
        8244: [0.563, 0, 1.032],
        8254: [0.607, -0.54, 0.575],
        8260: [0.75, 0.25, 0.575],
        8279: [0.563, 0, 1.376],
        8407: [0.723, -0.513, 0.575],
        8463: [0.694, 0.008, 0.668, { sk: -0.0319 }],
        8467: [0.702, 0.019, 0.474, { sk: 0.128 }],
        8472: [0.461, 0.21, 0.74],
        8501: [0.694, 0, 0.703],
        8592: [0.518, 0.017, 1.15],
        8593: [0.694, 0.193, 0.575],
        8594: [0.518, 0.017, 1.15],
        8595: [0.694, 0.194, 0.575],
        8596: [0.518, 0.017, 1.15],
        8597: [0.767, 0.267, 0.575],
        8598: [0.724, 0.194, 1.15],
        8599: [0.724, 0.193, 1.15],
        8600: [0.694, 0.224, 1.15],
        8601: [0.694, 0.224, 1.15],
        8602: [0.711, 0.21, 1.15],
        8603: [0.711, 0.21, 1.15],
        8614: [0.518, 0.017, 1.15],
        8617: [0.518, 0.017, 1.282],
        8618: [0.518, 0.017, 1.282],
        8622: [0.711, 0.21, 1.15],
        8636: [0.518, -0.22, 1.15],
        8637: [0.281, 0.017, 1.15],
        8640: [0.518, -0.22, 1.15],
        8641: [0.281, 0.017, 1.15],
        8652: [0.718, 0.017, 1.15],
        8653: [0.711, 0.21, 1.15],
        8654: [0.711, 0.21, 1.15],
        8655: [0.711, 0.21, 1.15],
        8656: [0.547, 0.046, 1.15],
        8657: [0.694, 0.193, 0.703],
        8658: [0.547, 0.046, 1.15],
        8659: [0.694, 0.194, 0.703],
        8660: [0.547, 0.046, 1.15],
        8661: [0.767, 0.267, 0.703],
        8704: [0.694, 0.016, 0.639],
        8707: [0.694, 0, 0.639],
        8708: [0.711, 0.21, 0.639],
        8709: [0.767, 0.073, 0.575],
        8710: [0.698, 0, 0.958],
        8712: [0.587, 0.086, 0.767],
        8713: [0.711, 0.21, 0.767],
        8715: [0.587, 0.086, 0.767],
        8716: [0.711, 0.21, 0.767],
        8722: [0.281, -0.221, 0.894],
        8723: [0.537, 0.227, 0.894],
        8725: [0.75, 0.25, 0.575],
        8726: [0.75, 0.25, 0.575],
        8727: [0.472, -0.028, 0.575],
        8728: [0.474, -0.028, 0.575],
        8729: [0.474, -0.028, 0.575],
        8730: [0.82, 0.18, 0.958, { ic: 0.03 }],
        8733: [0.451, 0.008, 0.894],
        8734: [0.452, 0.008, 1.15],
        8736: [0.714, 0, 0.722],
        8739: [0.75, 0.249, 0.319],
        8740: [0.75, 0.249, 0.319],
        8741: [0.75, 0.248, 0.575],
        8742: [0.75, 0.248, 0.575],
        8743: [0.604, 0.017, 0.767],
        8744: [0.604, 0.016, 0.767],
        8745: [0.603, 0.016, 0.767],
        8746: [0.604, 0.016, 0.767],
        8747: [0.711, 0.211, 0.569, { ic: 0.063 }],
        8764: [0.391, -0.109, 0.894],
        8768: [0.583, 0.082, 0.319],
        8769: [0.711, 0.21, 0.894],
        8771: [0.502, 0, 0.894],
        8772: [0.711, 0.21, 0.894],
        8773: [0.638, 0.027, 0.894],
        8775: [0.711, 0.21, 0.894],
        8776: [0.524, -0.032, 0.894],
        8777: [0.711, 0.21, 0.894],
        8781: [0.533, 0.032, 0.894],
        8784: [0.721, -0.109, 0.894],
        8800: [0.711, 0.21, 0.894],
        8801: [0.505, 0, 0.894],
        8802: [0.711, 0.21, 0.894],
        8804: [0.697, 0.199, 0.894],
        8805: [0.697, 0.199, 0.894],
        8810: [0.617, 0.116, 1.15],
        8811: [0.618, 0.116, 1.15],
        8813: [0.711, 0.21, 0.894],
        8814: [0.711, 0.21, 0.894],
        8815: [0.711, 0.21, 0.894],
        8816: [0.711, 0.21, 0.894],
        8817: [0.711, 0.21, 0.894],
        8826: [0.585, 0.086, 0.894],
        8827: [0.586, 0.086, 0.894],
        8832: [0.711, 0.21, 0.894],
        8833: [0.711, 0.21, 0.894],
        8834: [0.587, 0.085, 0.894],
        8835: [0.587, 0.086, 0.894],
        8836: [0.711, 0.21, 0.894],
        8837: [0.711, 0.21, 0.894],
        8838: [0.697, 0.199, 0.894],
        8839: [0.697, 0.199, 0.894],
        8840: [0.711, 0.21, 0.894],
        8841: [0.711, 0.21, 0.894],
        8846: [0.604, 0.016, 0.767],
        8849: [0.697, 0.199, 0.894],
        8850: [0.697, 0.199, 0.894],
        8851: [0.604, 0, 0.767],
        8852: [0.604, 0, 0.767],
        8853: [0.632, 0.132, 0.894],
        8854: [0.632, 0.132, 0.894],
        8855: [0.632, 0.132, 0.894],
        8856: [0.632, 0.132, 0.894],
        8857: [0.632, 0.132, 0.894],
        8866: [0.693, 0, 0.703],
        8867: [0.693, 0, 0.703],
        8868: [0.694, 0, 0.894],
        8869: [0.693, 0, 0.894],
        8872: [0.75, 0.249, 0.974],
        8876: [0.711, 0.21, 0.703],
        8877: [0.75, 0.249, 0.974],
        8900: [0.523, 0.021, 0.575],
        8901: [0.336, -0.166, 0.319],
        8902: [0.502, 0, 0.575],
        8904: [0.54, 0.039, 1],
        8930: [0.711, 0.21, 0.894],
        8931: [0.711, 0.21, 0.894],
        8942: [0.951, 0.029, 0.319],
        8943: [0.336, -0.166, 1.295],
        8945: [0.871, -0.101, 1.323],
        8968: [0.75, 0.248, 0.511],
        8969: [0.75, 0.248, 0.511],
        8970: [0.749, 0.248, 0.511],
        8971: [0.749, 0.248, 0.511],
        8994: [0.405, -0.108, 1.15],
        8995: [0.392, -0.126, 1.15],
        9001: [0.75, 0.249, 0.447],
        9002: [0.75, 0.249, 0.447],
        9651: [0.711, 0, 1.022],
        9653: [0.711, 0, 1.022],
        9657: [0.54, 0.039, 0.575],
        9661: [0.5, 0.21, 1.022],
        9663: [0.5, 0.21, 1.022],
        9667: [0.539, 0.038, 0.575],
        9711: [0.711, 0.211, 1.15],
        9824: [0.719, 0.129, 0.894],
        9825: [0.711, 0.024, 0.894],
        9826: [0.719, 0.154, 0.894],
        9827: [0.719, 0.129, 0.894],
        9837: [0.75, 0.017, 0.447],
        9838: [0.741, 0.223, 0.447],
        9839: [0.724, 0.224, 0.447],
        10072: [0.75, 0.249, 0.319],
        10216: [0.75, 0.249, 0.447],
        10217: [0.75, 0.249, 0.447],
        10229: [0.518, 0.017, 1.805],
        10230: [0.518, 0.017, 1.833],
        10231: [0.518, 0.017, 2.126],
        10232: [0.547, 0.046, 1.868],
        10233: [0.547, 0.046, 1.87],
        10234: [0.547, 0.046, 2.126],
        10236: [0.518, 0.017, 1.833],
        10744: [0.711, 0.21, 0.894],
        10799: [0.53, 0.028, 0.894],
        10815: [0.686, 0, 0.9],
        10927: [0.696, 0.199, 0.894],
        10928: [0.697, 0.199, 0.894],
        12296: [0.75, 0.249, 0.447],
        12297: [0.75, 0.249, 0.447],
      };
    },
    6987: (c, t, e) => {
      Object.defineProperty(t, "__esModule", { value: true });
      t.delimiters = t.VSIZES = t.HDW3 = t.HDW2 = t.HDW1 = void 0;
      var i = e(30861);
      t.HDW1 = [0.75, 0.25, 0.875];
      t.HDW2 = [0.85, 0.349, 0.667];
      t.HDW3 = [0.583, 0.082, 0.5];
      t.VSIZES = [1, 1.2, 1.8, 2.4, 3];
      var f = { c: 47, dir: i.V, sizes: t.VSIZES };
      var r = { c: 175, dir: i.H, sizes: [0.5], stretch: [0, 175], HDW: [0.59, -0.544, 0.5] };
      var s = { c: 710, dir: i.H, sizes: [0.5, 0.556, 1, 1.444, 1.889] };
      var a = { c: 732, dir: i.H, sizes: [0.5, 0.556, 1, 1.444, 1.889] };
      var o = { c: 8211, dir: i.H, sizes: [0.5], stretch: [0, 8211], HDW: [0.285, -0.248, 0.5] };
      var n = { c: 8592, dir: i.H, sizes: [1], stretch: [8592, 8722], HDW: t.HDW3 };
      var l = { c: 8594, dir: i.H, sizes: [1], stretch: [0, 8722, 8594], HDW: t.HDW3 };
      var d = { c: 8596, dir: i.H, sizes: [1], stretch: [8592, 8722, 8594], HDW: t.HDW3 };
      var S = { c: 8612, dir: i.H, stretch: [8592, 8722, 8739], HDW: t.HDW3, min: 1.278 };
      var u = { c: 8614, dir: i.H, sizes: [1], stretch: [8739, 8722, 8594], HDW: t.HDW3 };
      var h = { c: 8656, dir: i.H, sizes: [1], stretch: [8656, 61], HDW: t.HDW3 };
      var p = { c: 8658, dir: i.H, sizes: [1], stretch: [0, 61, 8658], HDW: t.HDW3 };
      var B = { c: 8660, dir: i.H, sizes: [1], stretch: [8656, 61, 8658], HDW: t.HDW3 };
      var v = { c: 8722, dir: i.H, sizes: [0.778], stretch: [0, 8722], HDW: t.HDW3 };
      var m = { c: 8739, dir: i.V, sizes: [1], stretch: [0, 8739], HDW: [0.627, 0.015, 0.333] };
      var k = {
        c: 9180,
        dir: i.H,
        sizes: [0.778, 1],
        schar: [8994, 8994],
        variants: [5, 0],
        stretch: [57680, 57684, 57681],
        HDW: [0.32, 0.2, 0.5],
      };
      var y = {
        c: 9181,
        dir: i.H,
        sizes: [0.778, 1],
        schar: [8995, 8995],
        variants: [5, 0],
        stretch: [57682, 57684, 57683],
        HDW: [0.32, 0.2, 0.5],
      };
      var I = { c: 9182, dir: i.H, stretch: [57680, 57684, 57681, 57685], HDW: [0.32, 0.2, 0.5], min: 1.8 };
      var A = { c: 9183, dir: i.H, stretch: [57682, 57684, 57683, 57686], HDW: [0.32, 0.2, 0.5], min: 1.8 };
      var b = { c: 10216, dir: i.V, sizes: t.VSIZES };
      var x = { c: 10217, dir: i.V, sizes: t.VSIZES };
      var M = { c: 10502, dir: i.H, stretch: [8656, 61, 8739], HDW: t.HDW3, min: 1.278 };
      var _ = { c: 10503, dir: i.H, stretch: [8872, 61, 8658], HDW: t.HDW3, min: 1.278 };
      t.delimiters = {
        40: { dir: i.V, sizes: t.VSIZES, stretch: [9115, 9116, 9117], HDW: [0.85, 0.349, 0.875] },
        41: { dir: i.V, sizes: t.VSIZES, stretch: [9118, 9119, 9120], HDW: [0.85, 0.349, 0.875] },
        45: v,
        47: f,
        61: { dir: i.H, sizes: [0.778], stretch: [0, 61], HDW: t.HDW3 },
        91: { dir: i.V, sizes: t.VSIZES, stretch: [9121, 9122, 9123], HDW: t.HDW2 },
        92: { dir: i.V, sizes: t.VSIZES },
        93: { dir: i.V, sizes: t.VSIZES, stretch: [9124, 9125, 9126], HDW: t.HDW2 },
        94: s,
        95: o,
        123: { dir: i.V, sizes: t.VSIZES, stretch: [9127, 9130, 9129, 9128], HDW: [0.85, 0.349, 0.889] },
        124: { dir: i.V, sizes: [1], stretch: [0, 8739], HDW: [0.75, 0.25, 0.333] },
        125: { dir: i.V, sizes: t.VSIZES, stretch: [9131, 9130, 9133, 9132], HDW: [0.85, 0.349, 0.889] },
        126: a,
        175: r,
        710: s,
        713: r,
        732: a,
        770: s,
        771: a,
        818: o,
        8211: o,
        8212: o,
        8213: o,
        8214: {
          dir: i.V,
          sizes: [0.602, 1],
          schar: [0, 8741],
          variants: [1, 0],
          stretch: [0, 8741],
          HDW: [0.602, 0, 0.556],
        },
        8215: o,
        8254: r,
        8407: l,
        8592: n,
        8593: { dir: i.V, sizes: [0.888], stretch: [8593, 9168], HDW: [0.6, 0, 0.667] },
        8594: l,
        8595: { dir: i.V, sizes: [0.888], stretch: [0, 9168, 8595], HDW: [0.6, 0, 0.667] },
        8596: d,
        8597: { dir: i.V, sizes: [1.044], stretch: [8593, 9168, 8595], HDW: t.HDW1 },
        8606: { dir: i.H, sizes: [1], stretch: [8606, 8722], HDW: t.HDW3 },
        8608: { dir: i.H, sizes: [1], stretch: [0, 8722, 8608], HDW: t.HDW3 },
        8612: S,
        8613: { dir: i.V, stretch: [8593, 9168, 8869], HDW: t.HDW1, min: 1.555 },
        8614: u,
        8615: { dir: i.V, stretch: [8868, 9168, 8595], HDW: t.HDW1, min: 1.555 },
        8624: { dir: i.V, sizes: [0.722], stretch: [8624, 9168], HDW: t.HDW1 },
        8625: { dir: i.V, sizes: [0.722], stretch: [8625, 9168], HDW: t.HDW1 },
        8636: { dir: i.H, sizes: [1], stretch: [8636, 8722], HDW: t.HDW3 },
        8637: { dir: i.H, sizes: [1], stretch: [8637, 8722], HDW: t.HDW3 },
        8638: { dir: i.V, sizes: [0.888], stretch: [8638, 9168], HDW: t.HDW1 },
        8639: { dir: i.V, sizes: [0.888], stretch: [8639, 9168], HDW: t.HDW1 },
        8640: { dir: i.H, sizes: [1], stretch: [0, 8722, 8640], HDW: t.HDW3 },
        8641: { dir: i.H, sizes: [1], stretch: [0, 8722, 8641], HDW: t.HDW3 },
        8642: { dir: i.V, sizes: [0.888], stretch: [0, 9168, 8642], HDW: t.HDW1 },
        8643: { dir: i.V, sizes: [0.888], stretch: [0, 9168, 8643], HDW: t.HDW1 },
        8656: h,
        8657: { dir: i.V, sizes: [0.888], stretch: [8657, 8214], HDW: [0.599, 0, 0.778] },
        8658: p,
        8659: { dir: i.V, sizes: [0.888], stretch: [0, 8214, 8659], HDW: [0.6, 0, 0.778] },
        8660: B,
        8661: { dir: i.V, sizes: [1.044], stretch: [8657, 8214, 8659], HDW: [0.75, 0.25, 0.778] },
        8666: { dir: i.H, sizes: [1], stretch: [8666, 8801], HDW: [0.464, -0.036, 0.5] },
        8667: { dir: i.H, sizes: [1], stretch: [0, 8801, 8667], HDW: [0.464, -0.036, 0.5] },
        8722: v,
        8725: f,
        8730: {
          dir: i.V,
          sizes: t.VSIZES,
          stretch: [57345, 57344, 9143],
          fullExt: [0.65, 2.3],
          HDW: [0.85, 0.35, 1.056],
        },
        8739: m,
        8741: { dir: i.V, sizes: [1], stretch: [0, 8741], HDW: [0.627, 0.015, 0.556] },
        8968: { dir: i.V, sizes: t.VSIZES, stretch: [9121, 9122], HDW: t.HDW2 },
        8969: { dir: i.V, sizes: t.VSIZES, stretch: [9124, 9125], HDW: t.HDW2 },
        8970: { dir: i.V, sizes: t.VSIZES, stretch: [0, 9122, 9123], HDW: t.HDW2 },
        8971: { dir: i.V, sizes: t.VSIZES, stretch: [0, 9125, 9126], HDW: t.HDW2 },
        8978: k,
        8994: k,
        8995: y,
        9001: b,
        9002: x,
        9130: { dir: i.V, sizes: [0.32], stretch: [9130, 9130, 9130], HDW: [0.29, 0.015, 0.889] },
        9135: o,
        9136: { dir: i.V, sizes: [0.989], stretch: [9127, 9130, 9133], HDW: [0.75, 0.25, 0.889] },
        9137: { dir: i.V, sizes: [0.989], stretch: [9131, 9130, 9129], HDW: [0.75, 0.25, 0.889] },
        9140: { dir: i.H, stretch: [9484, 8722, 9488], HDW: t.HDW3, min: 1 },
        9141: { dir: i.H, stretch: [9492, 8722, 9496], HDW: t.HDW3, min: 1 },
        9168: {
          dir: i.V,
          sizes: [0.602, 1],
          schar: [0, 8739],
          variants: [1, 0],
          stretch: [0, 8739],
          HDW: [0.602, 0, 0.333],
        },
        9180: k,
        9181: y,
        9182: I,
        9183: A,
        9184: { dir: i.H, stretch: [714, 713, 715], HDW: [0.59, -0.544, 0.5], min: 1 },
        9185: { dir: i.H, stretch: [715, 713, 714], HDW: [0.59, -0.544, 0.5], min: 1 },
        9472: o,
        10072: m,
        10216: b,
        10217: x,
        10222: { dir: i.V, sizes: [0.989], stretch: [9127, 9130, 9129], HDW: [0.75, 0.25, 0.889] },
        10223: { dir: i.V, sizes: [0.989], stretch: [9131, 9130, 9133], HDW: [0.75, 0.25, 0.889] },
        10229: n,
        10230: l,
        10231: d,
        10232: h,
        10233: p,
        10234: B,
        10235: S,
        10236: u,
        10237: M,
        10238: _,
        10502: M,
        10503: _,
        10574: { dir: i.H, stretch: [8636, 8722, 8640], HDW: t.HDW3, min: 2 },
        10575: { dir: i.V, stretch: [8638, 9168, 8642], HDW: t.HDW1, min: 1.776 },
        10576: { dir: i.H, stretch: [8637, 8722, 8641], HDW: t.HDW3, min: 2 },
        10577: { dir: i.V, stretch: [8639, 9168, 8643], HDW: t.HDW1, min: 0.5 },
        10586: { dir: i.H, stretch: [8636, 8722, 8739], HDW: t.HDW3, min: 1.278 },
        10587: { dir: i.H, stretch: [8739, 8722, 8640], HDW: t.HDW3, min: 1.278 },
        10588: { dir: i.V, stretch: [8638, 9168, 8869], HDW: t.HDW1, min: 1.556 },
        10589: { dir: i.V, stretch: [8868, 9168, 8642], HDW: t.HDW1, min: 1.556 },
        10590: { dir: i.H, stretch: [8637, 8722, 8739], HDW: t.HDW3, min: 1.278 },
        10591: { dir: i.H, stretch: [8739, 8722, 8641], HDW: t.HDW3, min: 1.278 },
        10592: { dir: i.V, stretch: [8639, 9168, 8869], HDW: t.HDW1, min: 1.776 },
        10593: { dir: i.V, stretch: [8868, 9168, 8643], HDW: t.HDW1, min: 1.776 },
        12296: b,
        12297: x,
        65079: I,
        65080: A,
      };
    },
    32249: (c, t) => {
      Object.defineProperty(t, "__esModule", { value: true });
      t.doubleStruck = void 0;
      t.doubleStruck = {};
    },
    45600: (c, t) => {
      Object.defineProperty(t, "__esModule", { value: true });
      t.frakturBold = void 0;
      t.frakturBold = {
        33: [0.689, 0.012, 0.349],
        34: [0.695, -0.432, 0.254],
        38: [0.696, 0.016, 0.871],
        39: [0.695, -0.436, 0.25],
        40: [0.737, 0.186, 0.459],
        41: [0.735, 0.187, 0.459],
        42: [0.692, -0.449, 0.328],
        43: [0.598, 0.082, 0.893],
        44: [0.107, 0.191, 0.328],
        45: [0.275, -0.236, 0.893],
        46: [0.102, 0.015, 0.328],
        47: [0.721, 0.182, 0.593],
        48: [0.501, 0.012, 0.593],
        49: [0.489, 0, 0.593],
        50: [0.491, 0, 0.593],
        51: [0.487, 0.193, 0.593],
        52: [0.495, 0.196, 0.593],
        53: [0.481, 0.19, 0.593],
        54: [0.704, 0.012, 0.593],
        55: [0.479, 0.197, 0.593],
        56: [0.714, 0.005, 0.593],
        57: [0.487, 0.195, 0.593],
        58: [0.457, 0.012, 0.255],
        59: [0.458, 0.19, 0.255],
        61: [0.343, -0.168, 0.582],
        63: [0.697, 0.014, 0.428],
        91: [0.74, 0.13, 0.257],
        93: [0.738, 0.132, 0.257],
        94: [0.734, -0.452, 0.59],
        8216: [0.708, -0.411, 0.254],
        8217: [0.692, -0.394, 0.254],
        8260: [0.721, 0.182, 0.593],
        58113: [0.63, 0.027, 0.587],
        58114: [0.693, 0.212, 0.394, { ic: 0.014 }],
        58115: [0.681, 0.219, 0.387],
        58116: [0.473, 0.212, 0.593],
        58117: [0.684, 0.027, 0.393],
        58120: [0.679, 0.22, 0.981],
        58121: [0.717, 0.137, 0.727],
      };
    },
    59534: (c, t) => {
      Object.defineProperty(t, "__esModule", { value: true });
      t.fraktur = void 0;
      t.fraktur = {
        33: [0.689, 0.012, 0.296],
        34: [0.695, -0.432, 0.215],
        38: [0.698, 0.011, 0.738],
        39: [0.695, -0.436, 0.212],
        40: [0.737, 0.186, 0.389],
        41: [0.735, 0.187, 0.389],
        42: [0.692, -0.449, 0.278],
        43: [0.598, 0.082, 0.756],
        44: [0.107, 0.191, 0.278],
        45: [0.275, -0.236, 0.756],
        46: [0.102, 0.015, 0.278],
        47: [0.721, 0.182, 0.502],
        48: [0.492, 0.013, 0.502],
        49: [0.468, 0, 0.502],
        50: [0.474, 0, 0.502],
        51: [0.473, 0.182, 0.502],
        52: [0.476, 0.191, 0.502],
        53: [0.458, 0.184, 0.502],
        54: [0.7, 0.013, 0.502],
        55: [0.468, 0.181, 0.502],
        56: [0.705, 0.01, 0.502],
        57: [0.469, 0.182, 0.502],
        58: [0.457, 0.012, 0.216],
        59: [0.458, 0.189, 0.216],
        61: [0.368, -0.132, 0.756],
        63: [0.693, 0.011, 0.362],
        91: [0.74, 0.13, 0.278],
        93: [0.738, 0.131, 0.278],
        94: [0.734, -0.452, 0.5],
        8216: [0.708, -0.41, 0.215],
        8217: [0.692, -0.395, 0.215],
        8260: [0.721, 0.182, 0.502],
        58112: [0.683, 0.032, 0.497],
        58113: [0.616, 0.03, 0.498],
        58114: [0.68, 0.215, 0.333],
        58115: [0.679, 0.224, 0.329],
        58116: [0.471, 0.214, 0.503],
        58117: [0.686, 0.02, 0.333],
        58118: [0.577, 0.021, 0.334, { ic: 0.013 }],
        58119: [0.475, 0.022, 0.501, { ic: 0.013 }],
      };
    },
    14141: (c, t) => {
      Object.defineProperty(t, "__esModule", { value: true });
      t.italic = void 0;
      t.italic = {
        33: [0.716, 0, 0.307, { ic: 0.073 }],
        34: [0.694, -0.379, 0.514, { ic: 0.024 }],
        35: [0.694, 0.194, 0.818, { ic: 0.01 }],
        37: [0.75, 0.056, 0.818, { ic: 0.029 }],
        38: [0.716, 0.022, 0.767, { ic: 0.035 }],
        39: [0.694, -0.379, 0.307, { ic: 0.07 }],
        40: [0.75, 0.25, 0.409, { ic: 0.108 }],
        41: [0.75, 0.25, 0.409],
        42: [0.75, -0.32, 0.511, { ic: 0.073 }],
        43: [0.557, 0.057, 0.767],
        44: [0.121, 0.194, 0.307],
        45: [0.251, -0.18, 0.358],
        46: [0.121, 0, 0.307],
        47: [0.716, 0.215, 0.778],
        48: [0.665, 0.021, 0.511, { ic: 0.051 }],
        49: [0.666, 0, 0.511],
        50: [0.666, 0.022, 0.511, { ic: 0.04 }],
        51: [0.666, 0.022, 0.511, { ic: 0.051 }],
        52: [0.666, 0.194, 0.511],
        53: [0.666, 0.022, 0.511, { ic: 0.056 }],
        54: [0.665, 0.022, 0.511, { ic: 0.054 }],
        55: [0.666, 0.022, 0.511, { ic: 0.123 }],
        56: [0.666, 0.021, 0.511, { ic: 0.042 }],
        57: [0.666, 0.022, 0.511, { ic: 0.042 }],
        58: [0.431, 0, 0.307],
        59: [0.431, 0.194, 0.307],
        61: [0.367, -0.133, 0.767],
        63: [0.716, 0, 0.511, { ic: 0.04 }],
        64: [0.705, 0.011, 0.767, { ic: 0.022 }],
        91: [0.75, 0.25, 0.307, { ic: 0.139 }],
        93: [0.75, 0.25, 0.307, { ic: 0.052 }],
        94: [0.694, -0.527, 0.511, { ic: 0.017 }],
        95: [-0.025, 0.062, 0.511, { ic: 0.043 }],
        126: [0.318, -0.208, 0.511, { ic: 0.06 }],
        305: [0.441, 0.01, 0.307, { ic: 0.033 }],
        567: [0.442, 0.204, 0.332],
        768: [0.697, -0.5, 0],
        769: [0.697, -0.5, 0, { ic: 0.039 }],
        770: [0.694, -0.527, 0, { ic: 0.017 }],
        771: [0.668, -0.558, 0, { ic: 0.06 }],
        772: [0.589, -0.544, 0, { ic: 0.054 }],
        774: [0.694, -0.515, 0, { ic: 0.062 }],
        775: [0.669, -0.548, 0],
        776: [0.669, -0.554, 0, { ic: 0.045 }],
        778: [0.716, -0.542, 0],
        779: [0.697, -0.503, 0, { ic: 0.065 }],
        780: [0.638, -0.502, 0, { ic: 0.029 }],
        989: [0.605, 0.085, 0.778],
        8211: [0.285, -0.248, 0.511, { ic: 0.043 }],
        8212: [0.285, -0.248, 1.022, { ic: 0.016 }],
        8213: [0.285, -0.248, 1.022, { ic: 0.016 }],
        8215: [-0.025, 0.062, 0.511, { ic: 0.043 }],
        8216: [0.694, -0.379, 0.307, { ic: 0.055 }],
        8217: [0.694, -0.379, 0.307, { ic: 0.07 }],
        8220: [0.694, -0.379, 0.514, { ic: 0.092 }],
        8221: [0.694, -0.379, 0.514, { ic: 0.024 }],
        8260: [0.716, 0.215, 0.778],
        8463: [0.695, 0.013, 0.54, { ic: 0.022 }],
        8710: [0.716, 0, 0.833, { sk: 0.167 }],
        10744: [0.716, 0.215, 0.778],
      };
    },
    63969: (c, t) => {
      Object.defineProperty(t, "__esModule", { value: true });
      t.largeop = void 0;
      t.largeop = {
        40: [1.15, 0.649, 0.597],
        41: [1.15, 0.649, 0.597],
        47: [1.15, 0.649, 0.811],
        91: [1.15, 0.649, 0.472],
        92: [1.15, 0.649, 0.811],
        93: [1.15, 0.649, 0.472],
        123: [1.15, 0.649, 0.667],
        125: [1.15, 0.649, 0.667],
        710: [0.772, -0.565, 1],
        732: [0.75, -0.611, 1],
        770: [0.772, -0.565, 0],
        771: [0.75, -0.611, 0],
        8214: [0.602, 0, 0.778],
        8260: [1.15, 0.649, 0.811],
        8593: [0.6, 0, 0.667],
        8595: [0.6, 0, 0.667],
        8657: [0.599, 0, 0.778],
        8659: [0.6, 0, 0.778],
        8719: [0.95, 0.45, 1.278],
        8720: [0.95, 0.45, 1.278],
        8721: [0.95, 0.45, 1.444],
        8730: [1.15, 0.65, 1, { ic: 0.02 }],
        8739: [0.627, 0.015, 0.333],
        8741: [0.627, 0.015, 0.556],
        8747: [1.36, 0.862, 0.556, { ic: 0.388 }],
        8748: [1.36, 0.862, 1.084, { ic: 0.388 }],
        8749: [1.36, 0.862, 1.592, { ic: 0.388 }],
        8750: [1.36, 0.862, 0.556, { ic: 0.388 }],
        8896: [0.95, 0.45, 1.111],
        8897: [0.95, 0.45, 1.111],
        8898: [0.949, 0.45, 1.111],
        8899: [0.95, 0.449, 1.111],
        8968: [1.15, 0.649, 0.528],
        8969: [1.15, 0.649, 0.528],
        8970: [1.15, 0.649, 0.528],
        8971: [1.15, 0.649, 0.528],
        9001: [1.15, 0.649, 0.611],
        9002: [1.15, 0.649, 0.611],
        9168: [0.602, 0, 0.667],
        10072: [0.627, 0.015, 0.333],
        10216: [1.15, 0.649, 0.611],
        10217: [1.15, 0.649, 0.611],
        10752: [0.949, 0.449, 1.511],
        10753: [0.949, 0.449, 1.511],
        10754: [0.949, 0.449, 1.511],
        10756: [0.95, 0.449, 1.111],
        10758: [0.95, 0.45, 1.111],
        10764: [1.36, 0.862, 2.168, { ic: 0.388 }],
        12296: [1.15, 0.649, 0.611],
        12297: [1.15, 0.649, 0.611],
      };
    },
    58626: (c, t) => {
      Object.defineProperty(t, "__esModule", { value: true });
      t.monospace = void 0;
      t.monospace = {
        32: [0, 0, 0.525],
        33: [0.622, 0, 0.525],
        34: [0.623, -0.333, 0.525],
        35: [0.611, 0, 0.525],
        36: [0.694, 0.082, 0.525],
        37: [0.694, 0.083, 0.525],
        38: [0.622, 0.011, 0.525],
        39: [0.611, -0.287, 0.525],
        40: [0.694, 0.082, 0.525],
        41: [0.694, 0.082, 0.525],
        42: [0.52, -0.09, 0.525],
        43: [0.531, -0.081, 0.525],
        44: [0.14, 0.139, 0.525],
        45: [0.341, -0.271, 0.525],
        46: [0.14, 0, 0.525],
        47: [0.694, 0.083, 0.525],
        58: [0.431, 0, 0.525],
        59: [0.431, 0.139, 0.525],
        60: [0.557, -0.055, 0.525],
        61: [0.417, -0.195, 0.525],
        62: [0.557, -0.055, 0.525],
        63: [0.617, 0, 0.525],
        64: [0.617, 0.006, 0.525],
        91: [0.694, 0.082, 0.525],
        92: [0.694, 0.083, 0.525],
        93: [0.694, 0.082, 0.525],
        94: [0.611, -0.46, 0.525],
        95: [-0.025, 0.095, 0.525],
        96: [0.681, -0.357, 0.525],
        123: [0.694, 0.083, 0.525],
        124: [0.694, 0.082, 0.525],
        125: [0.694, 0.083, 0.525],
        126: [0.611, -0.466, 0.525],
        127: [0.612, -0.519, 0.525],
        160: [0, 0, 0.525],
        305: [0.431, 0, 0.525],
        567: [0.431, 0.228, 0.525],
        697: [0.623, -0.334, 0.525],
        768: [0.611, -0.485, 0],
        769: [0.611, -0.485, 0],
        770: [0.611, -0.46, 0],
        771: [0.611, -0.466, 0],
        772: [0.577, -0.5, 0],
        774: [0.611, -0.504, 0],
        776: [0.612, -0.519, 0],
        778: [0.619, -0.499, 0],
        780: [0.577, -0.449, 0],
        913: [0.623, 0, 0.525],
        914: [0.611, 0, 0.525],
        915: [0.611, 0, 0.525],
        916: [0.623, 0, 0.525],
        917: [0.611, 0, 0.525],
        918: [0.611, 0, 0.525],
        919: [0.611, 0, 0.525],
        920: [0.621, 0.01, 0.525],
        921: [0.611, 0, 0.525],
        922: [0.611, 0, 0.525],
        923: [0.623, 0, 0.525],
        924: [0.611, 0, 0.525],
        925: [0.611, 0, 0.525],
        926: [0.611, 0, 0.525],
        927: [0.621, 0.01, 0.525],
        928: [0.611, 0, 0.525],
        929: [0.611, 0, 0.525],
        931: [0.611, 0, 0.525],
        932: [0.611, 0, 0.525],
        933: [0.622, 0, 0.525],
        934: [0.611, 0, 0.525],
        935: [0.611, 0, 0.525],
        936: [0.611, 0, 0.525],
        937: [0.622, 0, 0.525],
        8215: [-0.025, 0.095, 0.525],
        8242: [0.623, -0.334, 0.525],
        8243: [0.623, 0, 1.05],
        8244: [0.623, 0, 1.575],
        8260: [0.694, 0.083, 0.525],
        8279: [0.623, 0, 2.1],
        8710: [0.623, 0, 0.525],
      };
    },
    25190: (c, t) => {
      Object.defineProperty(t, "__esModule", { value: true });
      t.normal = void 0;
      t.normal = {
        32: [0, 0, 0.25],
        33: [0.716, 0, 0.278],
        34: [0.694, -0.379, 0.5],
        35: [0.694, 0.194, 0.833],
        36: [0.75, 0.056, 0.5],
        37: [0.75, 0.056, 0.833],
        38: [0.716, 0.022, 0.778],
        39: [0.694, -0.379, 0.278],
        40: [0.75, 0.25, 0.389],
        41: [0.75, 0.25, 0.389],
        42: [0.75, -0.32, 0.5],
        43: [0.583, 0.082, 0.778],
        44: [0.121, 0.194, 0.278],
        45: [0.252, -0.179, 0.333],
        46: [0.12, 0, 0.278],
        47: [0.75, 0.25, 0.5],
        48: [0.666, 0.022, 0.5],
        49: [0.666, 0, 0.5],
        50: [0.666, 0, 0.5],
        51: [0.665, 0.022, 0.5],
        52: [0.677, 0, 0.5],
        53: [0.666, 0.022, 0.5],
        54: [0.666, 0.022, 0.5],
        55: [0.676, 0.022, 0.5],
        56: [0.666, 0.022, 0.5],
        57: [0.666, 0.022, 0.5],
        58: [0.43, 0, 0.278],
        59: [0.43, 0.194, 0.278],
        60: [0.54, 0.04, 0.778],
        61: [0.583, 0.082, 0.778],
        62: [0.54, 0.04, 0.778],
        63: [0.705, 0, 0.472],
        64: [0.705, 0.011, 0.778],
        65: [0.716, 0, 0.75],
        66: [0.683, 0, 0.708],
        67: [0.705, 0.021, 0.722],
        68: [0.683, 0, 0.764],
        69: [0.68, 0, 0.681],
        70: [0.68, 0, 0.653],
        71: [0.705, 0.022, 0.785],
        72: [0.683, 0, 0.75],
        73: [0.683, 0, 0.361],
        74: [0.683, 0.022, 0.514],
        75: [0.683, 0, 0.778],
        76: [0.683, 0, 0.625],
        77: [0.683, 0, 0.917],
        78: [0.683, 0, 0.75],
        79: [0.705, 0.022, 0.778],
        80: [0.683, 0, 0.681],
        81: [0.705, 0.193, 0.778],
        82: [0.683, 0.022, 0.736],
        83: [0.705, 0.022, 0.556],
        84: [0.677, 0, 0.722],
        85: [0.683, 0.022, 0.75],
        86: [0.683, 0.022, 0.75],
        87: [0.683, 0.022, 1.028],
        88: [0.683, 0, 0.75],
        89: [0.683, 0, 0.75],
        90: [0.683, 0, 0.611],
        91: [0.75, 0.25, 0.278],
        92: [0.75, 0.25, 0.5],
        93: [0.75, 0.25, 0.278],
        94: [0.694, -0.531, 0.5],
        95: [-0.025, 0.062, 0.5],
        96: [0.699, -0.505, 0.5],
        97: [0.448, 0.011, 0.5],
        98: [0.694, 0.011, 0.556],
        99: [0.448, 0.011, 0.444],
        100: [0.694, 0.011, 0.556],
        101: [0.448, 0.011, 0.444],
        102: [0.705, 0, 0.306, { ic: 0.066 }],
        103: [0.453, 0.206, 0.5],
        104: [0.694, 0, 0.556],
        105: [0.669, 0, 0.278],
        106: [0.669, 0.205, 0.306],
        107: [0.694, 0, 0.528],
        108: [0.694, 0, 0.278],
        109: [0.442, 0, 0.833],
        110: [0.442, 0, 0.556],
        111: [0.448, 0.01, 0.5],
        112: [0.442, 0.194, 0.556],
        113: [0.442, 0.194, 0.528],
        114: [0.442, 0, 0.392],
        115: [0.448, 0.011, 0.394],
        116: [0.615, 0.01, 0.389],
        117: [0.442, 0.011, 0.556],
        118: [0.431, 0.011, 0.528],
        119: [0.431, 0.011, 0.722],
        120: [0.431, 0, 0.528],
        121: [0.431, 0.204, 0.528],
        122: [0.431, 0, 0.444],
        123: [0.75, 0.25, 0.5],
        124: [0.75, 0.249, 0.278],
        125: [0.75, 0.25, 0.5],
        126: [0.318, -0.215, 0.5],
        160: [0, 0, 0.25],
        163: [0.714, 0.011, 0.769],
        165: [0.683, 0, 0.75],
        168: [0.669, -0.554, 0.5],
        172: [0.356, -0.089, 0.667],
        174: [0.709, 0.175, 0.947],
        175: [0.59, -0.544, 0.5],
        176: [0.715, -0.542, 0.5],
        177: [0.666, 0, 0.778],
        180: [0.699, -0.505, 0.5],
        183: [0.31, -0.19, 0.278],
        215: [0.491, -0.009, 0.778],
        240: [0.749, 0.021, 0.556],
        247: [0.537, 0.036, 0.778],
        305: [0.442, 0, 0.278, { sk: 0.0278 }],
        567: [0.442, 0.205, 0.306, { sk: 0.0833 }],
        697: [0.56, -0.043, 0.275],
        710: [0.694, -0.531, 0.5],
        711: [0.644, -0.513, 0.5],
        713: [0.59, -0.544, 0.5],
        714: [0.699, -0.505, 0.5],
        715: [0.699, -0.505, 0.5],
        728: [0.694, -0.515, 0.5],
        729: [0.669, -0.549, 0.5],
        730: [0.715, -0.542, 0.5],
        732: [0.668, -0.565, 0.5],
        768: [0.699, -0.505, 0],
        769: [0.699, -0.505, 0],
        770: [0.694, -0.531, 0],
        771: [0.668, -0.565, 0],
        772: [0.59, -0.544, 0],
        774: [0.694, -0.515, 0],
        775: [0.669, -0.549, 0],
        776: [0.669, -0.554, 0],
        778: [0.715, -0.542, 0],
        779: [0.701, -0.51, 0],
        780: [0.644, -0.513, 0],
        824: [0.716, 0.215, 0],
        913: [0.716, 0, 0.75],
        914: [0.683, 0, 0.708],
        915: [0.68, 0, 0.625],
        916: [0.716, 0, 0.833],
        917: [0.68, 0, 0.681],
        918: [0.683, 0, 0.611],
        919: [0.683, 0, 0.75],
        920: [0.705, 0.022, 0.778],
        921: [0.683, 0, 0.361],
        922: [0.683, 0, 0.778],
        923: [0.716, 0, 0.694],
        924: [0.683, 0, 0.917],
        925: [0.683, 0, 0.75],
        926: [0.677, 0, 0.667],
        927: [0.705, 0.022, 0.778],
        928: [0.68, 0, 0.75],
        929: [0.683, 0, 0.681],
        931: [0.683, 0, 0.722],
        932: [0.677, 0, 0.722],
        933: [0.705, 0, 0.778],
        934: [0.683, 0, 0.722],
        935: [0.683, 0, 0.75],
        936: [0.683, 0, 0.778],
        937: [0.704, 0, 0.722],
        8192: [0, 0, 0.5],
        8193: [0, 0, 1],
        8194: [0, 0, 0.5],
        8195: [0, 0, 1],
        8196: [0, 0, 0.333],
        8197: [0, 0, 0.25],
        8198: [0, 0, 0.167],
        8201: [0, 0, 0.167],
        8202: [0, 0, 0.1],
        8203: [0, 0, 0],
        8204: [0, 0, 0],
        8211: [0.285, -0.248, 0.5],
        8212: [0.285, -0.248, 1],
        8213: [0.285, -0.248, 1],
        8214: [0.75, 0.25, 0.5],
        8215: [-0.025, 0.062, 0.5],
        8216: [0.694, -0.379, 0.278],
        8217: [0.694, -0.379, 0.278],
        8220: [0.694, -0.379, 0.5],
        8221: [0.694, -0.379, 0.5],
        8224: [0.705, 0.216, 0.444],
        8225: [0.705, 0.205, 0.444],
        8226: [0.444, -0.055, 0.5],
        8230: [0.12, 0, 1.172],
        8242: [0.56, -0.043, 0.275],
        8243: [0.56, 0, 0.55],
        8244: [0.56, 0, 0.825],
        8245: [0.56, -0.043, 0.275],
        8246: [0.56, 0, 0.55],
        8247: [0.56, 0, 0.825],
        8254: [0.59, -0.544, 0.5],
        8260: [0.75, 0.25, 0.5],
        8279: [0.56, 0, 1.1],
        8288: [0, 0, 0],
        8289: [0, 0, 0],
        8290: [0, 0, 0],
        8291: [0, 0, 0],
        8292: [0, 0, 0],
        8407: [0.714, -0.516, 0.5],
        8450: [0.702, 0.019, 0.722],
        8459: [0.717, 0.036, 0.969, { ic: 0.272, sk: 0.333 }],
        8460: [0.666, 0.133, 0.72],
        8461: [0.683, 0, 0.778],
        8462: [0.694, 0.011, 0.576, { sk: -0.0278 }],
        8463: [0.695, 0.013, 0.54, { ic: 0.022 }],
        8464: [0.717, 0.017, 0.809, { ic: 0.137, sk: 0.333 }],
        8465: [0.686, 0.026, 0.554],
        8466: [0.717, 0.017, 0.874, { ic: 0.161, sk: 0.306 }],
        8467: [0.705, 0.02, 0.417, { sk: 0.111 }],
        8469: [0.683, 0.02, 0.722],
        8472: [0.453, 0.216, 0.636, { sk: 0.111 }],
        8473: [0.683, 0, 0.611],
        8474: [0.701, 0.181, 0.778],
        8475: [0.717, 0.017, 0.85, { ic: 0.037, sk: 0.194 }],
        8476: [0.686, 0.026, 0.828],
        8477: [0.683, 0, 0.722],
        8484: [0.683, 0, 0.667],
        8486: [0.704, 0, 0.722],
        8487: [0.684, 0.022, 0.722],
        8488: [0.729, 0.139, 0.602],
        8492: [0.708, 0.028, 0.908, { ic: 0.02, sk: 0.194 }],
        8493: [0.685, 0.024, 0.613],
        8496: [0.707, 0.008, 0.562, { ic: 0.156, sk: 0.139 }],
        8497: [0.735, 0.036, 0.895, { ic: 0.095, sk: 0.222 }],
        8498: [0.695, 0, 0.556],
        8499: [0.721, 0.05, 1.08, { ic: 0.136, sk: 0.444 }],
        8501: [0.694, 0, 0.611],
        8502: [0.763, 0.021, 0.667, { ic: 0.02 }],
        8503: [0.764, 0.043, 0.444],
        8504: [0.764, 0.043, 0.667],
        8513: [0.705, 0.023, 0.639],
        8592: [0.511, 0.011, 1],
        8593: [0.694, 0.193, 0.5],
        8594: [0.511, 0.011, 1],
        8595: [0.694, 0.194, 0.5],
        8596: [0.511, 0.011, 1],
        8597: [0.772, 0.272, 0.5],
        8598: [0.72, 0.195, 1],
        8599: [0.72, 0.195, 1],
        8600: [0.695, 0.22, 1],
        8601: [0.695, 0.22, 1],
        8602: [0.437, -0.06, 1],
        8603: [0.437, -0.06, 1],
        8606: [0.417, -0.083, 1],
        8608: [0.417, -0.083, 1],
        8610: [0.417, -0.083, 1.111],
        8611: [0.417, -0.083, 1.111],
        8614: [0.511, 0.011, 1],
        8617: [0.511, 0.011, 1.126],
        8618: [0.511, 0.011, 1.126],
        8619: [0.575, 0.041, 1],
        8620: [0.575, 0.041, 1],
        8621: [0.417, -0.083, 1.389],
        8622: [0.437, -0.06, 1],
        8624: [0.722, 0, 0.5],
        8625: [0.722, 0, 0.5],
        8630: [0.461, 0, 1],
        8631: [0.46, 0, 1],
        8634: [0.65, 0.083, 0.778],
        8635: [0.65, 0.083, 0.778],
        8636: [0.511, -0.23, 1],
        8637: [0.27, 0.011, 1],
        8638: [0.694, 0.194, 0.417],
        8639: [0.694, 0.194, 0.417],
        8640: [0.511, -0.23, 1],
        8641: [0.27, 0.011, 1],
        8642: [0.694, 0.194, 0.417],
        8643: [0.694, 0.194, 0.417],
        8644: [0.667, 0, 1],
        8646: [0.667, 0, 1],
        8647: [0.583, 0.083, 1],
        8648: [0.694, 0.193, 0.833],
        8649: [0.583, 0.083, 1],
        8650: [0.694, 0.194, 0.833],
        8651: [0.514, 0.014, 1],
        8652: [0.671, 0.011, 1],
        8653: [0.534, 0.035, 1],
        8654: [0.534, 0.037, 1],
        8655: [0.534, 0.035, 1],
        8656: [0.525, 0.024, 1],
        8657: [0.694, 0.194, 0.611],
        8658: [0.525, 0.024, 1],
        8659: [0.694, 0.194, 0.611],
        8660: [0.526, 0.025, 1],
        8661: [0.772, 0.272, 0.611],
        8666: [0.611, 0.111, 1],
        8667: [0.611, 0.111, 1],
        8669: [0.417, -0.083, 1],
        8672: [0.437, -0.064, 1.334],
        8674: [0.437, -0.064, 1.334],
        8704: [0.694, 0.022, 0.556],
        8705: [0.846, 0.021, 0.5],
        8706: [0.715, 0.022, 0.531, { ic: 0.035, sk: 0.0833 }],
        8707: [0.694, 0, 0.556],
        8708: [0.716, 0.215, 0.556],
        8709: [0.772, 0.078, 0.5],
        8710: [0.716, 0, 0.833],
        8711: [0.683, 0.033, 0.833],
        8712: [0.54, 0.04, 0.667],
        8713: [0.716, 0.215, 0.667],
        8715: [0.54, 0.04, 0.667],
        8716: [0.716, 0.215, 0.667],
        8717: [0.44, 0, 0.429, { ic: 0.027 }],
        8719: [0.75, 0.25, 0.944],
        8720: [0.75, 0.25, 0.944],
        8721: [0.75, 0.25, 1.056],
        8722: [0.583, 0.082, 0.778],
        8723: [0.5, 0.166, 0.778],
        8724: [0.766, 0.093, 0.778],
        8725: [0.75, 0.25, 0.5],
        8726: [0.75, 0.25, 0.5],
        8727: [0.465, -0.035, 0.5],
        8728: [0.444, -0.055, 0.5],
        8729: [0.444, -0.055, 0.5],
        8730: [0.8, 0.2, 0.833, { ic: 0.02 }],
        8733: [0.442, 0.011, 0.778],
        8734: [0.442, 0.011, 1],
        8736: [0.694, 0, 0.722],
        8737: [0.714, 0.02, 0.722],
        8738: [0.551, 0.051, 0.722],
        8739: [0.75, 0.249, 0.278],
        8740: [0.75, 0.252, 0.278, { ic: 0.019 }],
        8741: [0.75, 0.25, 0.5],
        8742: [0.75, 0.25, 0.5, { ic: 0.018 }],
        8743: [0.598, 0.022, 0.667],
        8744: [0.598, 0.022, 0.667],
        8745: [0.598, 0.022, 0.667],
        8746: [0.598, 0.022, 0.667],
        8747: [0.716, 0.216, 0.417, { ic: 0.055 }],
        8748: [0.805, 0.306, 0.819, { ic: 0.138 }],
        8749: [0.805, 0.306, 1.166, { ic: 0.138 }],
        8750: [0.805, 0.306, 0.472, { ic: 0.138 }],
        8756: [0.471, 0.082, 0.667],
        8757: [0.471, 0.082, 0.667],
        8764: [0.367, -0.133, 0.778],
        8765: [0.367, -0.133, 0.778],
        8768: [0.583, 0.083, 0.278],
        8769: [0.467, -0.032, 0.778],
        8770: [0.463, -0.034, 0.778],
        8771: [0.464, -0.036, 0.778],
        8772: [0.716, 0.215, 0.778],
        8773: [0.589, -0.022, 0.778],
        8775: [0.652, 0.155, 0.778],
        8776: [0.483, -0.055, 0.778],
        8777: [0.716, 0.215, 0.778],
        8778: [0.579, 0.039, 0.778],
        8781: [0.484, -0.016, 0.778],
        8782: [0.492, -0.008, 0.778],
        8783: [0.492, -0.133, 0.778],
        8784: [0.67, -0.133, 0.778],
        8785: [0.609, 0.108, 0.778],
        8786: [0.601, 0.101, 0.778],
        8787: [0.601, 0.102, 0.778],
        8790: [0.367, -0.133, 0.778],
        8791: [0.721, -0.133, 0.778],
        8796: [0.859, -0.133, 0.778],
        8800: [0.716, 0.215, 0.778],
        8801: [0.464, -0.036, 0.778],
        8802: [0.716, 0.215, 0.778],
        8804: [0.636, 0.138, 0.778],
        8805: [0.636, 0.138, 0.778],
        8806: [0.753, 0.175, 0.778],
        8807: [0.753, 0.175, 0.778],
        8808: [0.752, 0.286, 0.778],
        8809: [0.752, 0.286, 0.778],
        8810: [0.568, 0.067, 1],
        8811: [0.567, 0.067, 1],
        8812: [0.75, 0.25, 0.5],
        8813: [0.716, 0.215, 0.778],
        8814: [0.708, 0.209, 0.778],
        8815: [0.708, 0.209, 0.778],
        8816: [0.801, 0.303, 0.778],
        8817: [0.801, 0.303, 0.778],
        8818: [0.732, 0.228, 0.778],
        8819: [0.732, 0.228, 0.778],
        8820: [0.732, 0.228, 0.778],
        8821: [0.732, 0.228, 0.778],
        8822: [0.681, 0.253, 0.778],
        8823: [0.681, 0.253, 0.778],
        8824: [0.716, 0.253, 0.778],
        8825: [0.716, 0.253, 0.778],
        8826: [0.539, 0.041, 0.778],
        8827: [0.539, 0.041, 0.778],
        8828: [0.58, 0.153, 0.778],
        8829: [0.58, 0.154, 0.778],
        8830: [0.732, 0.228, 0.778],
        8831: [0.732, 0.228, 0.778],
        8832: [0.705, 0.208, 0.778],
        8833: [0.705, 0.208, 0.778],
        8834: [0.54, 0.04, 0.778],
        8835: [0.54, 0.04, 0.778],
        8836: [0.716, 0.215, 0.778],
        8837: [0.716, 0.215, 0.778],
        8838: [0.636, 0.138, 0.778],
        8839: [0.636, 0.138, 0.778],
        8840: [0.801, 0.303, 0.778],
        8841: [0.801, 0.303, 0.778],
        8842: [0.635, 0.241, 0.778],
        8843: [0.635, 0.241, 0.778],
        8846: [0.598, 0.022, 0.667],
        8847: [0.539, 0.041, 0.778],
        8848: [0.539, 0.041, 0.778],
        8849: [0.636, 0.138, 0.778],
        8850: [0.636, 0.138, 0.778],
        8851: [0.598, 0, 0.667],
        8852: [0.598, 0, 0.667],
        8853: [0.583, 0.083, 0.778],
        8854: [0.583, 0.083, 0.778],
        8855: [0.583, 0.083, 0.778],
        8856: [0.583, 0.083, 0.778],
        8857: [0.583, 0.083, 0.778],
        8858: [0.582, 0.082, 0.778],
        8859: [0.582, 0.082, 0.778],
        8861: [0.582, 0.082, 0.778],
        8862: [0.689, 0, 0.778],
        8863: [0.689, 0, 0.778],
        8864: [0.689, 0, 0.778],
        8865: [0.689, 0, 0.778],
        8866: [0.694, 0, 0.611],
        8867: [0.694, 0, 0.611],
        8868: [0.668, 0, 0.778],
        8869: [0.668, 0, 0.778],
        8872: [0.75, 0.249, 0.867],
        8873: [0.694, 0, 0.722],
        8874: [0.694, 0, 0.889],
        8876: [0.695, 0, 0.611],
        8877: [0.695, 0, 0.611],
        8878: [0.695, 0, 0.722],
        8879: [0.695, 0, 0.722],
        8882: [0.539, 0.041, 0.778],
        8883: [0.539, 0.041, 0.778],
        8884: [0.636, 0.138, 0.778],
        8885: [0.636, 0.138, 0.778],
        8888: [0.408, -0.092, 1.111],
        8890: [0.431, 0.212, 0.556],
        8891: [0.716, 0, 0.611],
        8892: [0.716, 0, 0.611],
        8896: [0.75, 0.249, 0.833],
        8897: [0.75, 0.249, 0.833],
        8898: [0.75, 0.249, 0.833],
        8899: [0.75, 0.249, 0.833],
        8900: [0.488, -0.012, 0.5],
        8901: [0.31, -0.19, 0.278],
        8902: [0.486, -0.016, 0.5],
        8903: [0.545, 0.044, 0.778],
        8904: [0.505, 0.005, 0.9],
        8905: [0.492, -0.008, 0.778],
        8906: [0.492, -0.008, 0.778],
        8907: [0.694, 0.022, 0.778],
        8908: [0.694, 0.022, 0.778],
        8909: [0.464, -0.036, 0.778],
        8910: [0.578, 0.021, 0.76],
        8911: [0.578, 0.022, 0.76],
        8912: [0.54, 0.04, 0.778],
        8913: [0.54, 0.04, 0.778],
        8914: [0.598, 0.022, 0.667],
        8915: [0.598, 0.022, 0.667],
        8916: [0.736, 0.022, 0.667],
        8918: [0.541, 0.041, 0.778],
        8919: [0.541, 0.041, 0.778],
        8920: [0.568, 0.067, 1.333],
        8921: [0.568, 0.067, 1.333],
        8922: [0.886, 0.386, 0.778],
        8923: [0.886, 0.386, 0.778],
        8926: [0.734, 0, 0.778],
        8927: [0.734, 0, 0.778],
        8928: [0.801, 0.303, 0.778],
        8929: [0.801, 0.303, 0.778],
        8930: [0.716, 0.215, 0.778],
        8931: [0.716, 0.215, 0.778],
        8934: [0.73, 0.359, 0.778],
        8935: [0.73, 0.359, 0.778],
        8936: [0.73, 0.359, 0.778],
        8937: [0.73, 0.359, 0.778],
        8938: [0.706, 0.208, 0.778],
        8939: [0.706, 0.208, 0.778],
        8940: [0.802, 0.303, 0.778],
        8941: [0.801, 0.303, 0.778],
        8942: [1.3, 0.03, 0.278],
        8943: [0.31, -0.19, 1.172],
        8945: [1.52, -0.1, 1.282],
        8965: [0.716, 0, 0.611],
        8966: [0.813, 0.097, 0.611],
        8968: [0.75, 0.25, 0.444],
        8969: [0.75, 0.25, 0.444],
        8970: [0.75, 0.25, 0.444],
        8971: [0.75, 0.25, 0.444],
        8988: [0.694, -0.306, 0.5],
        8989: [0.694, -0.306, 0.5],
        8990: [0.366, 0.022, 0.5],
        8991: [0.366, 0.022, 0.5],
        8994: [0.388, -0.122, 1],
        8995: [0.378, -0.134, 1],
        9001: [0.75, 0.25, 0.389],
        9002: [0.75, 0.25, 0.389],
        9136: [0.744, 0.244, 0.412],
        9137: [0.744, 0.244, 0.412],
        9168: [0.602, 0, 0.667],
        9416: [0.709, 0.175, 0.902],
        9484: [0.694, -0.306, 0.5],
        9488: [0.694, -0.306, 0.5],
        9492: [0.366, 0.022, 0.5],
        9496: [0.366, 0.022, 0.5],
        9585: [0.694, 0.195, 0.889],
        9586: [0.694, 0.195, 0.889],
        9632: [0.689, 0, 0.778],
        9633: [0.689, 0, 0.778],
        9642: [0.689, 0, 0.778],
        9650: [0.575, 0.02, 0.722],
        9651: [0.716, 0, 0.889],
        9652: [0.575, 0.02, 0.722],
        9653: [0.716, 0, 0.889],
        9654: [0.539, 0.041, 0.778],
        9656: [0.539, 0.041, 0.778],
        9657: [0.505, 0.005, 0.5],
        9660: [0.576, 0.019, 0.722],
        9661: [0.5, 0.215, 0.889],
        9662: [0.576, 0.019, 0.722],
        9663: [0.5, 0.215, 0.889],
        9664: [0.539, 0.041, 0.778],
        9666: [0.539, 0.041, 0.778],
        9667: [0.505, 0.005, 0.5],
        9674: [0.716, 0.132, 0.667],
        9711: [0.715, 0.215, 1],
        9723: [0.689, 0, 0.778],
        9724: [0.689, 0, 0.778],
        9733: [0.694, 0.111, 0.944],
        9824: [0.727, 0.13, 0.778],
        9825: [0.716, 0.033, 0.778],
        9826: [0.727, 0.162, 0.778],
        9827: [0.726, 0.13, 0.778],
        9837: [0.75, 0.022, 0.389],
        9838: [0.734, 0.223, 0.389],
        9839: [0.723, 0.223, 0.389],
        10003: [0.706, 0.034, 0.833],
        10016: [0.716, 0.022, 0.833],
        10072: [0.75, 0.249, 0.278],
        10216: [0.75, 0.25, 0.389],
        10217: [0.75, 0.25, 0.389],
        10222: [0.744, 0.244, 0.412],
        10223: [0.744, 0.244, 0.412],
        10229: [0.511, 0.011, 1.609],
        10230: [0.511, 0.011, 1.638],
        10231: [0.511, 0.011, 1.859],
        10232: [0.525, 0.024, 1.609],
        10233: [0.525, 0.024, 1.638],
        10234: [0.525, 0.024, 1.858],
        10236: [0.511, 0.011, 1.638],
        10731: [0.716, 0.132, 0.667],
        10744: [0.716, 0.215, 0.778],
        10752: [0.75, 0.25, 1.111],
        10753: [0.75, 0.25, 1.111],
        10754: [0.75, 0.25, 1.111],
        10756: [0.75, 0.249, 0.833],
        10758: [0.75, 0.249, 0.833],
        10764: [0.805, 0.306, 1.638, { ic: 0.138 }],
        10799: [0.491, -0.009, 0.778],
        10815: [0.683, 0, 0.75],
        10846: [0.813, 0.097, 0.611],
        10877: [0.636, 0.138, 0.778],
        10878: [0.636, 0.138, 0.778],
        10885: [0.762, 0.29, 0.778],
        10886: [0.762, 0.29, 0.778],
        10887: [0.635, 0.241, 0.778],
        10888: [0.635, 0.241, 0.778],
        10889: [0.761, 0.387, 0.778],
        10890: [0.761, 0.387, 0.778],
        10891: [1.003, 0.463, 0.778],
        10892: [1.003, 0.463, 0.778],
        10901: [0.636, 0.138, 0.778],
        10902: [0.636, 0.138, 0.778],
        10927: [0.636, 0.138, 0.778],
        10928: [0.636, 0.138, 0.778],
        10933: [0.752, 0.286, 0.778],
        10934: [0.752, 0.286, 0.778],
        10935: [0.761, 0.294, 0.778],
        10936: [0.761, 0.294, 0.778],
        10937: [0.761, 0.337, 0.778],
        10938: [0.761, 0.337, 0.778],
        10949: [0.753, 0.215, 0.778],
        10950: [0.753, 0.215, 0.778],
        10955: [0.783, 0.385, 0.778],
        10956: [0.783, 0.385, 0.778],
        12296: [0.75, 0.25, 0.389],
        12297: [0.75, 0.25, 0.389],
        57350: [0.43, 0.023, 0.222, { ic: 0.018 }],
        57351: [0.431, 0.024, 0.389, { ic: 0.018 }],
        57352: [0.605, 0.085, 0.778],
        57353: [0.434, 0.006, 0.667, { ic: 0.067 }],
        57356: [0.752, 0.284, 0.778],
        57357: [0.752, 0.284, 0.778],
        57358: [0.919, 0.421, 0.778],
        57359: [0.801, 0.303, 0.778],
        57360: [0.801, 0.303, 0.778],
        57361: [0.919, 0.421, 0.778],
        57366: [0.828, 0.33, 0.778],
        57367: [0.752, 0.332, 0.778],
        57368: [0.828, 0.33, 0.778],
        57369: [0.752, 0.333, 0.778],
        57370: [0.634, 0.255, 0.778],
        57371: [0.634, 0.254, 0.778],
        119808: [0.698, 0, 0.869],
        119809: [0.686, 0, 0.818],
        119810: [0.697, 0.011, 0.831],
        119811: [0.686, 0, 0.882],
        119812: [0.68, 0, 0.756],
        119813: [0.68, 0, 0.724],
        119814: [0.697, 0.01, 0.904],
        119815: [0.686, 0, 0.9],
        119816: [0.686, 0, 0.436],
        119817: [0.686, 0.011, 0.594],
        119818: [0.686, 0, 0.901],
        119819: [0.686, 0, 0.692],
        119820: [0.686, 0, 1.092],
        119821: [0.686, 0, 0.9],
        119822: [0.696, 0.01, 0.864],
        119823: [0.686, 0, 0.786],
        119824: [0.696, 0.193, 0.864],
        119825: [0.686, 0.011, 0.862],
        119826: [0.697, 0.011, 0.639],
        119827: [0.675, 0, 0.8],
        119828: [0.686, 0.011, 0.885],
        119829: [0.686, 0.007, 0.869],
        119830: [0.686, 0.007, 1.189],
        119831: [0.686, 0, 0.869],
        119832: [0.686, 0, 0.869],
        119833: [0.686, 0, 0.703],
        119834: [0.453, 0.006, 0.559],
        119835: [0.694, 0.006, 0.639],
        119836: [0.453, 0.006, 0.511],
        119837: [0.694, 0.006, 0.639],
        119838: [0.452, 0.006, 0.527],
        119839: [0.7, 0, 0.351, { ic: 0.101 }],
        119840: [0.455, 0.201, 0.575],
        119841: [0.694, 0, 0.639],
        119842: [0.695, 0, 0.319],
        119843: [0.695, 0.2, 0.351],
        119844: [0.694, 0, 0.607],
        119845: [0.694, 0, 0.319],
        119846: [0.45, 0, 0.958],
        119847: [0.45, 0, 0.639],
        119848: [0.452, 0.005, 0.575],
        119849: [0.45, 0.194, 0.639],
        119850: [0.45, 0.194, 0.607],
        119851: [0.45, 0, 0.474],
        119852: [0.453, 0.006, 0.454],
        119853: [0.635, 0.005, 0.447],
        119854: [0.45, 0.006, 0.639],
        119855: [0.444, 0, 0.607],
        119856: [0.444, 0, 0.831],
        119857: [0.444, 0, 0.607],
        119858: [0.444, 0.2, 0.607],
        119859: [0.444, 0, 0.511],
        119860: [0.716, 0, 0.75, { sk: 0.139 }],
        119861: [0.683, 0, 0.759, { sk: 0.0833 }],
        119862: [0.705, 0.022, 0.715, { ic: 0.045, sk: 0.0833 }],
        119863: [0.683, 0, 0.828, { sk: 0.0556 }],
        119864: [0.68, 0, 0.738, { ic: 0.026, sk: 0.0833 }],
        119865: [0.68, 0, 0.643, { ic: 0.106, sk: 0.0833 }],
        119866: [0.705, 0.022, 0.786, { sk: 0.0833 }],
        119867: [0.683, 0, 0.831, { ic: 0.057, sk: 0.0556 }],
        119868: [0.683, 0, 0.44, { ic: 0.064, sk: 0.111 }],
        119869: [0.683, 0.022, 0.555, { ic: 0.078, sk: 0.167 }],
        119870: [0.683, 0, 0.849, { ic: 0.04, sk: 0.0556 }],
        119871: [0.683, 0, 0.681, { sk: 0.0278 }],
        119872: [0.683, 0, 0.97, { ic: 0.081, sk: 0.0833 }],
        119873: [0.683, 0, 0.803, { ic: 0.085, sk: 0.0833 }],
        119874: [0.704, 0.022, 0.763, { sk: 0.0833 }],
        119875: [0.683, 0, 0.642, { ic: 0.109, sk: 0.0833 }],
        119876: [0.704, 0.194, 0.791, { sk: 0.0833 }],
        119877: [0.683, 0.021, 0.759, { sk: 0.0833 }],
        119878: [0.705, 0.022, 0.613, { ic: 0.032, sk: 0.0833 }],
        119879: [0.677, 0, 0.584, { ic: 0.12, sk: 0.0833 }],
        119880: [0.683, 0.022, 0.683, { ic: 0.084, sk: 0.0278 }],
        119881: [0.683, 0.022, 0.583, { ic: 0.186 }],
        119882: [0.683, 0.022, 0.944, { ic: 0.104 }],
        119883: [0.683, 0, 0.828, { ic: 0.024, sk: 0.0833 }],
        119884: [0.683, 0, 0.581, { ic: 0.182 }],
        119885: [0.683, 0, 0.683, { ic: 0.04, sk: 0.0833 }],
        119886: [0.441, 0.01, 0.529],
        119887: [0.694, 0.011, 0.429],
        119888: [0.442, 0.011, 0.433, { sk: 0.0556 }],
        119889: [0.694, 0.01, 0.52, { sk: 0.167 }],
        119890: [0.442, 0.011, 0.466, { sk: 0.0556 }],
        119891: [0.705, 0.205, 0.49, { ic: 0.06, sk: 0.167 }],
        119892: [0.442, 0.205, 0.477, { sk: 0.0278 }],
        119894: [0.661, 0.011, 0.345],
        119895: [0.661, 0.204, 0.412],
        119896: [0.694, 0.011, 0.521],
        119897: [0.694, 0.011, 0.298, { sk: 0.0833 }],
        119898: [0.442, 0.011, 0.878],
        119899: [0.442, 0.011, 0.6],
        119900: [0.441, 0.011, 0.485, { sk: 0.0556 }],
        119901: [0.442, 0.194, 0.503, { sk: 0.0833 }],
        119902: [0.442, 0.194, 0.446, { ic: 0.014, sk: 0.0833 }],
        119903: [0.442, 0.011, 0.451, { sk: 0.0556 }],
        119904: [0.442, 0.01, 0.469, { sk: 0.0556 }],
        119905: [0.626, 0.011, 0.361, { sk: 0.0833 }],
        119906: [0.442, 0.011, 0.572, { sk: 0.0278 }],
        119907: [0.443, 0.011, 0.485, { sk: 0.0278 }],
        119908: [0.443, 0.011, 0.716, { sk: 0.0833 }],
        119909: [0.442, 0.011, 0.572, { sk: 0.0278 }],
        119910: [0.442, 0.205, 0.49, { sk: 0.0556 }],
        119911: [0.442, 0.011, 0.465, { sk: 0.0556 }],
        119912: [0.711, 0, 0.869, { sk: 0.16 }],
        119913: [0.686, 0, 0.866, { sk: 0.0958 }],
        119914: [0.703, 0.017, 0.817, { ic: 0.038, sk: 0.0958 }],
        119915: [0.686, 0, 0.938, { sk: 0.0639 }],
        119916: [0.68, 0, 0.81, { ic: 0.015, sk: 0.0958 }],
        119917: [0.68, 0, 0.689, { ic: 0.12, sk: 0.0958 }],
        119918: [0.703, 0.016, 0.887, { sk: 0.0958 }],
        119919: [0.686, 0, 0.982, { ic: 0.045, sk: 0.0639 }],
        119920: [0.686, 0, 0.511, { ic: 0.062, sk: 0.128 }],
        119921: [0.686, 0.017, 0.631, { ic: 0.063, sk: 0.192 }],
        119922: [0.686, 0, 0.971, { ic: 0.032, sk: 0.0639 }],
        119923: [0.686, 0, 0.756, { sk: 0.0319 }],
        119924: [0.686, 0, 1.142, { ic: 0.077, sk: 0.0958 }],
        119925: [0.686, 0, 0.95, { ic: 0.077, sk: 0.0958 }],
        119926: [0.703, 0.017, 0.837, { sk: 0.0958 }],
        119927: [0.686, 0, 0.723, { ic: 0.124, sk: 0.0958 }],
        119928: [0.703, 0.194, 0.869, { sk: 0.0958 }],
        119929: [0.686, 0.017, 0.872, { sk: 0.0958 }],
        119930: [0.703, 0.017, 0.693, { ic: 0.021, sk: 0.0958 }],
        119931: [0.675, 0, 0.637, { ic: 0.135, sk: 0.0958 }],
        119932: [0.686, 0.016, 0.8, { ic: 0.077, sk: 0.0319 }],
        119933: [0.686, 0.016, 0.678, { ic: 0.208 }],
        119934: [0.686, 0.017, 1.093, { ic: 0.114 }],
        119935: [0.686, 0, 0.947, { sk: 0.0958 }],
        119936: [0.686, 0, 0.675, { ic: 0.201 }],
        119937: [0.686, 0, 0.773, { ic: 0.032, sk: 0.0958 }],
        119938: [0.452, 0.008, 0.633],
        119939: [0.694, 0.008, 0.521],
        119940: [0.451, 0.008, 0.513, { sk: 0.0639 }],
        119941: [0.694, 0.008, 0.61, { sk: 0.192 }],
        119942: [0.452, 0.008, 0.554, { sk: 0.0639 }],
        119943: [0.701, 0.201, 0.568, { ic: 0.056, sk: 0.192 }],
        119944: [0.452, 0.202, 0.545, { sk: 0.0319 }],
        119945: [0.694, 0.008, 0.668, { sk: -0.0319 }],
        119946: [0.694, 0.008, 0.405],
        119947: [0.694, 0.202, 0.471],
        119948: [0.694, 0.008, 0.604],
        119949: [0.694, 0.008, 0.348, { sk: 0.0958 }],
        119950: [0.452, 0.008, 1.032],
        119951: [0.452, 0.008, 0.713],
        119952: [0.452, 0.008, 0.585, { sk: 0.0639 }],
        119953: [0.452, 0.194, 0.601, { sk: 0.0958 }],
        119954: [0.452, 0.194, 0.542, { sk: 0.0958 }],
        119955: [0.452, 0.008, 0.529, { sk: 0.0639 }],
        119956: [0.451, 0.008, 0.531, { sk: 0.0639 }],
        119957: [0.643, 0.007, 0.415, { sk: 0.0958 }],
        119958: [0.452, 0.008, 0.681, { sk: 0.0319 }],
        119959: [0.453, 0.008, 0.567, { sk: 0.0319 }],
        119960: [0.453, 0.008, 0.831, { sk: 0.0958 }],
        119961: [0.452, 0.008, 0.659, { sk: 0.0319 }],
        119962: [0.452, 0.202, 0.59, { sk: 0.0639 }],
        119963: [0.452, 0.008, 0.555, { sk: 0.0639 }],
        119964: [0.717, 0.008, 0.803, { ic: 0.213, sk: 0.389 }],
        119966: [0.728, 0.026, 0.666, { ic: 0.153, sk: 0.278 }],
        119967: [0.708, 0.031, 0.774, { ic: 0.081, sk: 0.111 }],
        119970: [0.717, 0.037, 0.61, { ic: 0.128, sk: 0.25 }],
        119973: [0.717, 0.314, 1.052, { ic: 0.081, sk: 0.417 }],
        119974: [0.717, 0.037, 0.914, { ic: 0.29, sk: 0.361 }],
        119977: [0.726, 0.036, 0.902, { ic: 0.306, sk: 0.389 }],
        119978: [0.707, 0.008, 0.738, { ic: 0.067, sk: 0.167 }],
        119979: [0.716, 0.037, 1.013, { ic: 0.018, sk: 0.222 }],
        119980: [0.717, 0.017, 0.883, { sk: 0.278 }],
        119982: [0.708, 0.036, 0.868, { ic: 0.148, sk: 0.333 }],
        119983: [0.735, 0.037, 0.747, { ic: 0.249, sk: 0.222 }],
        119984: [0.717, 0.017, 0.8, { ic: 0.16, sk: 0.25 }],
        119985: [0.717, 0.017, 0.622, { ic: 0.228, sk: 0.222 }],
        119986: [0.717, 0.017, 0.805, { ic: 0.221, sk: 0.25 }],
        119987: [0.717, 0.017, 0.944, { ic: 0.187, sk: 0.278 }],
        119988: [0.716, 0.017, 0.71, { ic: 0.249, sk: 0.194 }],
        119989: [0.717, 0.016, 0.821, { ic: 0.211, sk: 0.306 }],
        120068: [0.696, 0.026, 0.718],
        120069: [0.691, 0.027, 0.884],
        120071: [0.685, 0.027, 0.832],
        120072: [0.685, 0.024, 0.663],
        120073: [0.686, 0.153, 0.611],
        120074: [0.69, 0.026, 0.785],
        120077: [0.686, 0.139, 0.552],
        120078: [0.68, 0.027, 0.668, { ic: 0.014 }],
        120079: [0.686, 0.026, 0.666],
        120080: [0.692, 0.027, 1.05],
        120081: [0.686, 0.025, 0.832],
        120082: [0.729, 0.027, 0.827],
        120083: [0.692, 0.218, 0.828],
        120084: [0.729, 0.069, 0.827],
        120086: [0.692, 0.027, 0.829],
        120087: [0.701, 0.027, 0.669],
        120088: [0.697, 0.027, 0.646, { ic: 0.019 }],
        120089: [0.686, 0.026, 0.831],
        120090: [0.686, 0.027, 1.046],
        120091: [0.688, 0.027, 0.719],
        120092: [0.686, 0.218, 0.833],
        120094: [0.47, 0.035, 0.5],
        120095: [0.685, 0.031, 0.513],
        120096: [0.466, 0.029, 0.389],
        120097: [0.609, 0.033, 0.499],
        120098: [0.467, 0.03, 0.401],
        120099: [0.681, 0.221, 0.326],
        120100: [0.47, 0.209, 0.504],
        120101: [0.688, 0.205, 0.521],
        120102: [0.673, 0.02, 0.279],
        120103: [0.672, 0.208, 0.281],
        120104: [0.689, 0.025, 0.389],
        120105: [0.685, 0.02, 0.28],
        120106: [0.475, 0.026, 0.767],
        120107: [0.475, 0.022, 0.527],
        120108: [0.48, 0.028, 0.489],
        120109: [0.541, 0.212, 0.5],
        120110: [0.479, 0.219, 0.489],
        120111: [0.474, 0.021, 0.389],
        120112: [0.478, 0.029, 0.443],
        120113: [0.64, 0.02, 0.333, { ic: 0.015 }],
        120114: [0.474, 0.023, 0.517],
        120115: [0.53, 0.028, 0.512],
        120116: [0.532, 0.028, 0.774],
        120117: [0.472, 0.188, 0.389],
        120118: [0.528, 0.218, 0.499],
        120119: [0.471, 0.214, 0.391],
        120120: [0.701, 0, 0.722],
        120121: [0.683, 0, 0.667],
        120123: [0.683, 0, 0.722],
        120124: [0.683, 0, 0.667],
        120125: [0.683, 0, 0.611],
        120126: [0.702, 0.019, 0.778],
        120128: [0.683, 0, 0.389],
        120129: [0.683, 0.077, 0.5],
        120130: [0.683, 0, 0.778],
        120131: [0.683, 0, 0.667],
        120132: [0.683, 0, 0.944],
        120134: [0.701, 0.019, 0.778],
        120138: [0.702, 0.012, 0.556],
        120139: [0.683, 0, 0.667],
        120140: [0.683, 0.019, 0.722],
        120141: [0.683, 0.02, 0.722],
        120142: [0.683, 0.019, 1],
        120143: [0.683, 0, 0.722],
        120144: [0.683, 0, 0.722],
        120172: [0.686, 0.031, 0.847],
        120173: [0.684, 0.031, 1.044],
        120174: [0.676, 0.032, 0.723],
        120175: [0.683, 0.029, 0.982],
        120176: [0.686, 0.029, 0.783],
        120177: [0.684, 0.146, 0.722],
        120178: [0.687, 0.029, 0.927],
        120179: [0.683, 0.126, 0.851],
        120180: [0.681, 0.025, 0.655],
        120181: [0.68, 0.141, 0.652],
        120182: [0.681, 0.026, 0.789, { ic: 0.017 }],
        120183: [0.683, 0.028, 0.786],
        120184: [0.683, 0.032, 1.239],
        120185: [0.679, 0.03, 0.983],
        120186: [0.726, 0.03, 0.976],
        120187: [0.688, 0.223, 0.977],
        120188: [0.726, 0.083, 0.976],
        120189: [0.688, 0.028, 0.978],
        120190: [0.685, 0.031, 0.978],
        120191: [0.686, 0.03, 0.79, { ic: 0.012 }],
        120192: [0.688, 0.039, 0.851, { ic: 0.02 }],
        120193: [0.685, 0.029, 0.982],
        120194: [0.683, 0.03, 1.235],
        120195: [0.681, 0.035, 0.849],
        120196: [0.688, 0.214, 0.984],
        120197: [0.677, 0.148, 0.711],
        120198: [0.472, 0.032, 0.603],
        120199: [0.69, 0.032, 0.59],
        120200: [0.473, 0.026, 0.464],
        120201: [0.632, 0.028, 0.589],
        120202: [0.471, 0.027, 0.472],
        120203: [0.687, 0.222, 0.388],
        120204: [0.472, 0.208, 0.595],
        120205: [0.687, 0.207, 0.615],
        120206: [0.686, 0.025, 0.331],
        120207: [0.682, 0.203, 0.332],
        120208: [0.682, 0.025, 0.464],
        120209: [0.681, 0.024, 0.337],
        120210: [0.476, 0.031, 0.921],
        120211: [0.473, 0.028, 0.654],
        120212: [0.482, 0.034, 0.609],
        120213: [0.557, 0.207, 0.604],
        120214: [0.485, 0.211, 0.596],
        120215: [0.472, 0.026, 0.46],
        120216: [0.479, 0.034, 0.523],
        120217: [0.648, 0.027, 0.393, { ic: 0.014 }],
        120218: [0.472, 0.032, 0.589, { ic: 0.014 }],
        120219: [0.546, 0.027, 0.604],
        120220: [0.549, 0.032, 0.918],
        120221: [0.471, 0.188, 0.459],
        120222: [0.557, 0.221, 0.589],
        120223: [0.471, 0.214, 0.461],
        120224: [0.694, 0, 0.667],
        120225: [0.694, 0, 0.667],
        120226: [0.705, 0.011, 0.639],
        120227: [0.694, 0, 0.722],
        120228: [0.691, 0, 0.597],
        120229: [0.691, 0, 0.569],
        120230: [0.704, 0.011, 0.667],
        120231: [0.694, 0, 0.708],
        120232: [0.694, 0, 0.278],
        120233: [0.694, 0.022, 0.472],
        120234: [0.694, 0, 0.694],
        120235: [0.694, 0, 0.542],
        120236: [0.694, 0, 0.875],
        120237: [0.694, 0, 0.708],
        120238: [0.715, 0.022, 0.736],
        120239: [0.694, 0, 0.639],
        120240: [0.715, 0.125, 0.736],
        120241: [0.694, 0, 0.646],
        120242: [0.716, 0.022, 0.556],
        120243: [0.688, 0, 0.681],
        120244: [0.694, 0.022, 0.688],
        120245: [0.694, 0, 0.667],
        120246: [0.694, 0, 0.944],
        120247: [0.694, 0, 0.667],
        120248: [0.694, 0, 0.667],
        120249: [0.694, 0, 0.611],
        120250: [0.46, 0.01, 0.481],
        120251: [0.694, 0.011, 0.517],
        120252: [0.46, 0.01, 0.444],
        120253: [0.694, 0.01, 0.517],
        120254: [0.461, 0.01, 0.444],
        120255: [0.705, 0, 0.306, { ic: 0.041 }],
        120256: [0.455, 0.206, 0.5],
        120257: [0.694, 0, 0.517],
        120258: [0.68, 0, 0.239],
        120259: [0.68, 0.205, 0.267],
        120260: [0.694, 0, 0.489],
        120261: [0.694, 0, 0.239],
        120262: [0.455, 0, 0.794],
        120263: [0.455, 0, 0.517],
        120264: [0.46, 0.01, 0.5],
        120265: [0.455, 0.194, 0.517],
        120266: [0.455, 0.194, 0.517],
        120267: [0.455, 0, 0.342],
        120268: [0.46, 0.01, 0.383],
        120269: [0.571, 0.01, 0.361],
        120270: [0.444, 0.01, 0.517],
        120271: [0.444, 0, 0.461],
        120272: [0.444, 0, 0.683],
        120273: [0.444, 0, 0.461],
        120274: [0.444, 0.204, 0.461],
        120275: [0.444, 0, 0.435],
        120276: [0.694, 0, 0.733],
        120277: [0.694, 0, 0.733],
        120278: [0.704, 0.011, 0.703],
        120279: [0.694, 0, 0.794],
        120280: [0.691, 0, 0.642],
        120281: [0.691, 0, 0.611],
        120282: [0.705, 0.011, 0.733],
        120283: [0.694, 0, 0.794],
        120284: [0.694, 0, 0.331],
        120285: [0.694, 0.022, 0.519],
        120286: [0.694, 0, 0.764],
        120287: [0.694, 0, 0.581],
        120288: [0.694, 0, 0.978],
        120289: [0.694, 0, 0.794],
        120290: [0.716, 0.022, 0.794],
        120291: [0.694, 0, 0.703],
        120292: [0.716, 0.106, 0.794],
        120293: [0.694, 0, 0.703],
        120294: [0.716, 0.022, 0.611],
        120295: [0.688, 0, 0.733],
        120296: [0.694, 0.022, 0.764],
        120297: [0.694, 0, 0.733],
        120298: [0.694, 0, 1.039],
        120299: [0.694, 0, 0.733],
        120300: [0.694, 0, 0.733],
        120301: [0.694, 0, 0.672],
        120302: [0.475, 0.011, 0.525],
        120303: [0.694, 0.01, 0.561],
        120304: [0.475, 0.011, 0.489],
        120305: [0.694, 0.011, 0.561],
        120306: [0.474, 0.01, 0.511],
        120307: [0.705, 0, 0.336, { ic: 0.045 }],
        120308: [0.469, 0.206, 0.55],
        120309: [0.694, 0, 0.561],
        120310: [0.695, 0, 0.256],
        120311: [0.695, 0.205, 0.286],
        120312: [0.694, 0, 0.531],
        120313: [0.694, 0, 0.256],
        120314: [0.469, 0, 0.867],
        120315: [0.468, 0, 0.561],
        120316: [0.474, 0.011, 0.55],
        120317: [0.469, 0.194, 0.561],
        120318: [0.469, 0.194, 0.561],
        120319: [0.469, 0, 0.372],
        120320: [0.474, 0.01, 0.422],
        120321: [0.589, 0.01, 0.404],
        120322: [0.458, 0.011, 0.561],
        120323: [0.458, 0, 0.5],
        120324: [0.458, 0, 0.744],
        120325: [0.458, 0, 0.5],
        120326: [0.458, 0.205, 0.5],
        120327: [0.458, 0, 0.476],
        120328: [0.694, 0, 0.667],
        120329: [0.694, 0, 0.667, { ic: 0.029 }],
        120330: [0.705, 0.01, 0.639, { ic: 0.08 }],
        120331: [0.694, 0, 0.722, { ic: 0.025 }],
        120332: [0.691, 0, 0.597, { ic: 0.091 }],
        120333: [0.691, 0, 0.569, { ic: 0.104 }],
        120334: [0.705, 0.011, 0.667, { ic: 0.063 }],
        120335: [0.694, 0, 0.708, { ic: 0.06 }],
        120336: [0.694, 0, 0.278, { ic: 0.06 }],
        120337: [0.694, 0.022, 0.472, { ic: 0.063 }],
        120338: [0.694, 0, 0.694, { ic: 0.091 }],
        120339: [0.694, 0, 0.542],
        120340: [0.694, 0, 0.875, { ic: 0.054 }],
        120341: [0.694, 0, 0.708, { ic: 0.058 }],
        120342: [0.716, 0.022, 0.736, { ic: 0.027 }],
        120343: [0.694, 0, 0.639, { ic: 0.051 }],
        120344: [0.716, 0.125, 0.736, { ic: 0.027 }],
        120345: [0.694, 0, 0.646, { ic: 0.052 }],
        120346: [0.716, 0.022, 0.556, { ic: 0.053 }],
        120347: [0.688, 0, 0.681, { ic: 0.109 }],
        120348: [0.694, 0.022, 0.688, { ic: 0.059 }],
        120349: [0.694, 0, 0.667, { ic: 0.132 }],
        120350: [0.694, 0, 0.944, { ic: 0.132 }],
        120351: [0.694, 0, 0.667, { ic: 0.091 }],
        120352: [0.694, 0, 0.667, { ic: 0.143 }],
        120353: [0.694, 0, 0.611, { ic: 0.091 }],
        120354: [0.461, 0.01, 0.481],
        120355: [0.694, 0.011, 0.517, { ic: 0.022 }],
        120356: [0.46, 0.011, 0.444, { ic: 0.055 }],
        120357: [0.694, 0.01, 0.517, { ic: 0.071 }],
        120358: [0.46, 0.011, 0.444, { ic: 0.028 }],
        120359: [0.705, 0, 0.306, { ic: 0.188 }],
        120360: [0.455, 0.206, 0.5, { ic: 0.068 }],
        120361: [0.694, 0, 0.517],
        120362: [0.68, 0, 0.239, { ic: 0.076 }],
        120363: [0.68, 0.204, 0.267, { ic: 0.069 }],
        120364: [0.694, 0, 0.489, { ic: 0.054 }],
        120365: [0.694, 0, 0.239, { ic: 0.072 }],
        120366: [0.455, 0, 0.794],
        120367: [0.454, 0, 0.517],
        120368: [0.461, 0.011, 0.5, { ic: 0.023 }],
        120369: [0.455, 0.194, 0.517, { ic: 0.021 }],
        120370: [0.455, 0.194, 0.517, { ic: 0.021 }],
        120371: [0.455, 0, 0.342, { ic: 0.082 }],
        120372: [0.461, 0.011, 0.383, { ic: 0.053 }],
        120373: [0.571, 0.011, 0.361, { ic: 0.049 }],
        120374: [0.444, 0.01, 0.517, { ic: 0.02 }],
        120375: [0.444, 0, 0.461, { ic: 0.079 }],
        120376: [0.444, 0, 0.683, { ic: 0.079 }],
        120377: [0.444, 0, 0.461, { ic: 0.076 }],
        120378: [0.444, 0.205, 0.461, { ic: 0.079 }],
        120379: [0.444, 0, 0.435, { ic: 0.059 }],
        120432: [0.623, 0, 0.525],
        120433: [0.611, 0, 0.525],
        120434: [0.622, 0.011, 0.525],
        120435: [0.611, 0, 0.525],
        120436: [0.611, 0, 0.525],
        120437: [0.611, 0, 0.525],
        120438: [0.622, 0.011, 0.525],
        120439: [0.611, 0, 0.525],
        120440: [0.611, 0, 0.525],
        120441: [0.611, 0.011, 0.525],
        120442: [0.611, 0, 0.525],
        120443: [0.611, 0, 0.525],
        120444: [0.611, 0, 0.525],
        120445: [0.611, 0, 0.525],
        120446: [0.621, 0.01, 0.525],
        120447: [0.611, 0, 0.525],
        120448: [0.621, 0.138, 0.525],
        120449: [0.611, 0.011, 0.525],
        120450: [0.622, 0.011, 0.525],
        120451: [0.611, 0, 0.525],
        120452: [0.611, 0.011, 0.525],
        120453: [0.611, 0.007, 0.525],
        120454: [0.611, 0.007, 0.525],
        120455: [0.611, 0, 0.525],
        120456: [0.611, 0, 0.525],
        120457: [0.611, 0, 0.525],
        120458: [0.439, 0.006, 0.525],
        120459: [0.611, 0.006, 0.525],
        120460: [0.44, 0.006, 0.525],
        120461: [0.611, 0.006, 0.525],
        120462: [0.44, 0.006, 0.525],
        120463: [0.617, 0, 0.525],
        120464: [0.442, 0.229, 0.525],
        120465: [0.611, 0, 0.525],
        120466: [0.612, 0, 0.525],
        120467: [0.612, 0.228, 0.525],
        120468: [0.611, 0, 0.525],
        120469: [0.611, 0, 0.525],
        120470: [0.436, 0, 0.525, { ic: 0.011 }],
        120471: [0.436, 0, 0.525],
        120472: [0.44, 0.006, 0.525],
        120473: [0.437, 0.221, 0.525],
        120474: [0.437, 0.221, 0.525, { ic: 0.02 }],
        120475: [0.437, 0, 0.525],
        120476: [0.44, 0.006, 0.525],
        120477: [0.554, 0.006, 0.525],
        120478: [0.431, 0.005, 0.525],
        120479: [0.431, 0, 0.525],
        120480: [0.431, 0, 0.525],
        120481: [0.431, 0, 0.525],
        120482: [0.431, 0.228, 0.525],
        120483: [0.431, 0, 0.525],
        120488: [0.698, 0, 0.869],
        120489: [0.686, 0, 0.818],
        120490: [0.68, 0, 0.692],
        120491: [0.698, 0, 0.958],
        120492: [0.68, 0, 0.756],
        120493: [0.686, 0, 0.703],
        120494: [0.686, 0, 0.9],
        120495: [0.696, 0.01, 0.894],
        120496: [0.686, 0, 0.436],
        120497: [0.686, 0, 0.901],
        120498: [0.698, 0, 0.806],
        120499: [0.686, 0, 1.092],
        120500: [0.686, 0, 0.9],
        120501: [0.675, 0, 0.767],
        120502: [0.696, 0.01, 0.864],
        120503: [0.68, 0, 0.9],
        120504: [0.686, 0, 0.786],
        120506: [0.686, 0, 0.831],
        120507: [0.675, 0, 0.8],
        120508: [0.697, 0, 0.894],
        120509: [0.686, 0, 0.831],
        120510: [0.686, 0, 0.869],
        120511: [0.686, 0, 0.894],
        120512: [0.696, 0, 0.831],
        120513: [0.686, 0.024, 0.958],
        120546: [0.716, 0, 0.75, { sk: 0.139 }],
        120547: [0.683, 0, 0.759, { sk: 0.0833 }],
        120548: [0.68, 0, 0.615, { ic: 0.106, sk: 0.0833 }],
        120549: [0.716, 0, 0.833, { sk: 0.167 }],
        120550: [0.68, 0, 0.738, { ic: 0.026, sk: 0.0833 }],
        120551: [0.683, 0, 0.683, { ic: 0.04, sk: 0.0833 }],
        120552: [0.683, 0, 0.831, { ic: 0.057, sk: 0.0556 }],
        120553: [0.704, 0.022, 0.763, { sk: 0.0833 }],
        120554: [0.683, 0, 0.44, { ic: 0.064, sk: 0.111 }],
        120555: [0.683, 0, 0.849, { ic: 0.04, sk: 0.0556 }],
        120556: [0.716, 0, 0.694, { sk: 0.167 }],
        120557: [0.683, 0, 0.97, { ic: 0.081, sk: 0.0833 }],
        120558: [0.683, 0, 0.803, { ic: 0.085, sk: 0.0833 }],
        120559: [0.677, 0, 0.742, { ic: 0.035, sk: 0.0833 }],
        120560: [0.704, 0.022, 0.763, { sk: 0.0833 }],
        120561: [0.68, 0, 0.831, { ic: 0.056, sk: 0.0556 }],
        120562: [0.683, 0, 0.642, { ic: 0.109, sk: 0.0833 }],
        120564: [0.683, 0, 0.78, { ic: 0.026, sk: 0.0833 }],
        120565: [0.677, 0, 0.584, { ic: 0.12, sk: 0.0833 }],
        120566: [0.705, 0, 0.583, { ic: 0.117, sk: 0.0556 }],
        120567: [0.683, 0, 0.667, { sk: 0.0833 }],
        120568: [0.683, 0, 0.828, { ic: 0.024, sk: 0.0833 }],
        120569: [0.683, 0, 0.612, { ic: 0.08, sk: 0.0556 }],
        120570: [0.704, 0, 0.772, { ic: 0.014, sk: 0.0833 }],
        120572: [0.442, 0.011, 0.64, { sk: 0.0278 }],
        120573: [0.705, 0.194, 0.566, { sk: 0.0833 }],
        120574: [0.441, 0.216, 0.518, { ic: 0.025 }],
        120575: [0.717, 0.01, 0.444, { sk: 0.0556 }],
        120576: [0.452, 0.022, 0.466, { sk: 0.0833 }],
        120577: [0.704, 0.204, 0.438, { ic: 0.033, sk: 0.0833 }],
        120578: [0.442, 0.216, 0.497, { sk: 0.0556 }],
        120579: [0.705, 0.01, 0.469, { sk: 0.0833 }],
        120580: [0.442, 0.01, 0.354, { sk: 0.0556 }],
        120581: [0.442, 0.011, 0.576],
        120582: [0.694, 0.012, 0.583],
        120583: [0.442, 0.216, 0.603, { sk: 0.0278 }],
        120584: [0.442, 0, 0.494, { ic: 0.036, sk: 0.0278 }],
        120585: [0.704, 0.205, 0.438, { sk: 0.111 }],
        120586: [0.441, 0.011, 0.485, { sk: 0.0556 }],
        120587: [0.431, 0.011, 0.57],
        120588: [0.442, 0.216, 0.517, { sk: 0.0833 }],
        120589: [0.442, 0.107, 0.363, { ic: 0.042, sk: 0.0833 }],
        120590: [0.431, 0.011, 0.571],
        120591: [0.431, 0.013, 0.437, { ic: 0.08, sk: 0.0278 }],
        120592: [0.443, 0.01, 0.54, { sk: 0.0278 }],
        120593: [0.442, 0.218, 0.654, { sk: 0.0833 }],
        120594: [0.442, 0.204, 0.626, { sk: 0.0556 }],
        120595: [0.694, 0.205, 0.651, { sk: 0.111 }],
        120596: [0.443, 0.011, 0.622],
        120597: [0.715, 0.022, 0.531, { ic: 0.035, sk: 0.0833 }],
        120598: [0.431, 0.011, 0.406, { sk: 0.0556 }],
        120599: [0.705, 0.011, 0.591, { sk: 0.0833 }],
        120600: [0.434, 0.006, 0.667, { ic: 0.067 }],
        120601: [0.694, 0.205, 0.596, { sk: 0.0833 }],
        120602: [0.442, 0.194, 0.517, { sk: 0.0833 }],
        120603: [0.431, 0.01, 0.828],
        120604: [0.711, 0, 0.869, { sk: 0.16 }],
        120605: [0.686, 0, 0.866, { sk: 0.0958 }],
        120606: [0.68, 0, 0.657, { ic: 0.12, sk: 0.0958 }],
        120607: [0.711, 0, 0.958, { sk: 0.192 }],
        120608: [0.68, 0, 0.81, { ic: 0.015, sk: 0.0958 }],
        120609: [0.686, 0, 0.773, { ic: 0.032, sk: 0.0958 }],
        120610: [0.686, 0, 0.982, { ic: 0.045, sk: 0.0639 }],
        120611: [0.702, 0.017, 0.867, { sk: 0.0958 }],
        120612: [0.686, 0, 0.511, { ic: 0.062, sk: 0.128 }],
        120613: [0.686, 0, 0.971, { ic: 0.032, sk: 0.0639 }],
        120614: [0.711, 0, 0.806, { sk: 0.192 }],
        120615: [0.686, 0, 1.142, { ic: 0.077, sk: 0.0958 }],
        120616: [0.686, 0, 0.95, { ic: 0.077, sk: 0.0958 }],
        120617: [0.675, 0, 0.841, { ic: 0.026, sk: 0.0958 }],
        120618: [0.703, 0.017, 0.837, { sk: 0.0958 }],
        120619: [0.68, 0, 0.982, { ic: 0.044, sk: 0.0639 }],
        120620: [0.686, 0, 0.723, { ic: 0.124, sk: 0.0958 }],
        120622: [0.686, 0, 0.885, { ic: 0.017, sk: 0.0958 }],
        120623: [0.675, 0, 0.637, { ic: 0.135, sk: 0.0958 }],
        120624: [0.703, 0, 0.671, { ic: 0.131, sk: 0.0639 }],
        120625: [0.686, 0, 0.767, { sk: 0.0958 }],
        120626: [0.686, 0, 0.947, { sk: 0.0958 }],
        120627: [0.686, 0, 0.714, { ic: 0.076, sk: 0.0639 }],
        120628: [0.703, 0, 0.879, { sk: 0.0958 }],
        120630: [0.452, 0.008, 0.761, { sk: 0.0319 }],
        120631: [0.701, 0.194, 0.66, { sk: 0.0958 }],
        120632: [0.451, 0.211, 0.59, { ic: 0.027 }],
        120633: [0.725, 0.008, 0.522, { sk: 0.0639 }],
        120634: [0.461, 0.017, 0.529, { sk: 0.0958 }],
        120635: [0.711, 0.202, 0.508, { ic: 0.013, sk: 0.0958 }],
        120636: [0.452, 0.211, 0.6, { sk: 0.0639 }],
        120637: [0.702, 0.008, 0.562, { sk: 0.0958 }],
        120638: [0.452, 0.008, 0.412, { sk: 0.0639 }],
        120639: [0.452, 0.008, 0.668],
        120640: [0.694, 0.013, 0.671],
        120641: [0.452, 0.211, 0.708, { sk: 0.0319 }],
        120642: [0.452, 0, 0.577, { ic: 0.031, sk: 0.0319 }],
        120643: [0.711, 0.201, 0.508, { sk: 0.128 }],
        120644: [0.452, 0.008, 0.585, { sk: 0.0639 }],
        120645: [0.444, 0.008, 0.682],
        120646: [0.451, 0.211, 0.612, { sk: 0.0958 }],
        120647: [0.451, 0.105, 0.424, { ic: 0.033, sk: 0.0958 }],
        120648: [0.444, 0.008, 0.686],
        120649: [0.444, 0.013, 0.521, { ic: 0.089, sk: 0.0319 }],
        120650: [0.453, 0.008, 0.631, { sk: 0.0319 }],
        120651: [0.452, 0.216, 0.747, { sk: 0.0958 }],
        120652: [0.452, 0.201, 0.718, { sk: 0.0639 }],
        120653: [0.694, 0.202, 0.758, { sk: 0.128 }],
        120654: [0.453, 0.008, 0.718],
        120655: [0.71, 0.017, 0.628, { ic: 0.029, sk: 0.0958 }],
        120656: [0.444, 0.007, 0.483, { sk: 0.0639 }],
        120657: [0.701, 0.008, 0.692, { sk: 0.0958 }],
        120658: [0.434, 0.006, 0.667, { ic: 0.067 }],
        120659: [0.694, 0.202, 0.712, { sk: 0.0958 }],
        120660: [0.451, 0.194, 0.612, { sk: 0.0958 }],
        120661: [0.444, 0.008, 0.975],
        120662: [0.694, 0, 0.733],
        120663: [0.694, 0, 0.733],
        120664: [0.691, 0, 0.581],
        120665: [0.694, 0, 0.917],
        120666: [0.691, 0, 0.642],
        120667: [0.694, 0, 0.672],
        120668: [0.694, 0, 0.794],
        120669: [0.716, 0.022, 0.856],
        120670: [0.694, 0, 0.331],
        120671: [0.694, 0, 0.764],
        120672: [0.694, 0, 0.672],
        120673: [0.694, 0, 0.978],
        120674: [0.694, 0, 0.794],
        120675: [0.688, 0, 0.733],
        120676: [0.716, 0.022, 0.794],
        120677: [0.691, 0, 0.794],
        120678: [0.694, 0, 0.703],
        120680: [0.694, 0, 0.794],
        120681: [0.688, 0, 0.733],
        120682: [0.715, 0, 0.856],
        120683: [0.694, 0, 0.794],
        120684: [0.694, 0, 0.733],
        120685: [0.694, 0, 0.856],
        120686: [0.716, 0, 0.794],
        120782: [0.654, 0.01, 0.575],
        120783: [0.655, 0, 0.575],
        120784: [0.654, 0, 0.575],
        120785: [0.655, 0.011, 0.575],
        120786: [0.656, 0, 0.575],
        120787: [0.655, 0.011, 0.575],
        120788: [0.655, 0.011, 0.575],
        120789: [0.676, 0.011, 0.575],
        120790: [0.654, 0.011, 0.575],
        120791: [0.654, 0.011, 0.575],
        120802: [0.678, 0.022, 0.5],
        120803: [0.678, 0, 0.5],
        120804: [0.677, 0, 0.5],
        120805: [0.678, 0.022, 0.5],
        120806: [0.656, 0, 0.5],
        120807: [0.656, 0.021, 0.5],
        120808: [0.677, 0.022, 0.5],
        120809: [0.656, 0.011, 0.5],
        120810: [0.678, 0.022, 0.5],
        120811: [0.677, 0.022, 0.5],
        120812: [0.715, 0.022, 0.55],
        120813: [0.716, 0, 0.55],
        120814: [0.716, 0, 0.55],
        120815: [0.716, 0.022, 0.55],
        120816: [0.694, 0, 0.55],
        120817: [0.694, 0.022, 0.55],
        120818: [0.716, 0.022, 0.55],
        120819: [0.695, 0.011, 0.55],
        120820: [0.715, 0.022, 0.55],
        120821: [0.716, 0.022, 0.55],
        120822: [0.621, 0.01, 0.525],
        120823: [0.622, 0, 0.525],
        120824: [0.622, 0, 0.525],
        120825: [0.622, 0.011, 0.525],
        120826: [0.624, 0, 0.525],
        120827: [0.611, 0.01, 0.525],
        120828: [0.622, 0.011, 0.525],
        120829: [0.627, 0.01, 0.525],
        120830: [0.621, 0.01, 0.525],
        120831: [0.622, 0.011, 0.525],
      };
    },
    47033: (c, t) => {
      Object.defineProperty(t, "__esModule", { value: true });
      t.sansSerifBoldItalic = void 0;
      t.sansSerifBoldItalic = { 305: [0.458, 0, 0.256], 567: [0.458, 0.205, 0.286] };
    },
    94872: (c, t) => {
      Object.defineProperty(t, "__esModule", { value: true });
      t.sansSerifBold = void 0;
      t.sansSerifBold = {
        33: [0.694, 0, 0.367],
        34: [0.694, -0.442, 0.558],
        35: [0.694, 0.193, 0.917],
        36: [0.75, 0.056, 0.55],
        37: [0.75, 0.056, 1.029],
        38: [0.716, 0.022, 0.831],
        39: [0.694, -0.442, 0.306],
        40: [0.75, 0.249, 0.428],
        41: [0.75, 0.25, 0.428],
        42: [0.75, -0.293, 0.55],
        43: [0.617, 0.116, 0.856],
        44: [0.146, 0.106, 0.306],
        45: [0.273, -0.186, 0.367],
        46: [0.146, 0, 0.306],
        47: [0.75, 0.249, 0.55],
        58: [0.458, 0, 0.306],
        59: [0.458, 0.106, 0.306],
        61: [0.407, -0.094, 0.856],
        63: [0.705, 0, 0.519],
        64: [0.704, 0.011, 0.733],
        91: [0.75, 0.25, 0.343],
        93: [0.75, 0.25, 0.343],
        94: [0.694, -0.537, 0.55],
        95: [-0.023, 0.11, 0.55],
        126: [0.344, -0.198, 0.55],
        305: [0.458, 0, 0.256],
        567: [0.458, 0.205, 0.286],
        768: [0.694, -0.537, 0],
        769: [0.694, -0.537, 0],
        770: [0.694, -0.537, 0],
        771: [0.694, -0.548, 0],
        772: [0.66, -0.56, 0],
        774: [0.694, -0.552, 0],
        775: [0.695, -0.596, 0],
        776: [0.695, -0.595, 0],
        778: [0.694, -0.538, 0],
        779: [0.694, -0.537, 0],
        780: [0.657, -0.5, 0],
        8211: [0.327, -0.24, 0.55],
        8212: [0.327, -0.24, 1.1],
        8213: [0.327, -0.24, 1.1],
        8215: [-0.023, 0.11, 0.55],
        8216: [0.694, -0.443, 0.306],
        8217: [0.694, -0.442, 0.306],
        8220: [0.694, -0.443, 0.558],
        8221: [0.694, -0.442, 0.558],
        8260: [0.75, 0.249, 0.55],
        8710: [0.694, 0, 0.917],
      };
    },
    9255: (c, t) => {
      Object.defineProperty(t, "__esModule", { value: true });
      t.sansSerifItalic = void 0;
      t.sansSerifItalic = {
        33: [0.694, 0, 0.319, { ic: 0.036 }],
        34: [0.694, -0.471, 0.5],
        35: [0.694, 0.194, 0.833, { ic: 0.018 }],
        36: [0.75, 0.056, 0.5, { ic: 0.065 }],
        37: [0.75, 0.056, 0.833],
        38: [0.716, 0.022, 0.758],
        39: [0.694, -0.471, 0.278, { ic: 0.057 }],
        40: [0.75, 0.25, 0.389, { ic: 0.102 }],
        41: [0.75, 0.25, 0.389],
        42: [0.75, -0.306, 0.5, { ic: 0.068 }],
        43: [0.583, 0.083, 0.778],
        44: [0.098, 0.125, 0.278],
        45: [0.259, -0.186, 0.333],
        46: [0.098, 0, 0.278],
        47: [0.75, 0.25, 0.5, { ic: 0.1 }],
        48: [0.678, 0.022, 0.5, { ic: 0.049 }],
        49: [0.678, 0, 0.5],
        50: [0.678, 0, 0.5, { ic: 0.051 }],
        51: [0.678, 0.022, 0.5, { ic: 0.044 }],
        52: [0.656, 0, 0.5, { ic: 0.021 }],
        53: [0.656, 0.022, 0.5, { ic: 0.055 }],
        54: [0.678, 0.022, 0.5, { ic: 0.048 }],
        55: [0.656, 0.011, 0.5, { ic: 0.096 }],
        56: [0.678, 0.022, 0.5, { ic: 0.054 }],
        57: [0.677, 0.022, 0.5, { ic: 0.045 }],
        58: [0.444, 0, 0.278],
        59: [0.444, 0.125, 0.278],
        61: [0.37, -0.13, 0.778, { ic: 0.018 }],
        63: [0.704, 0, 0.472, { ic: 0.064 }],
        64: [0.705, 0.01, 0.667, { ic: 0.04 }],
        91: [0.75, 0.25, 0.289, { ic: 0.136 }],
        93: [0.75, 0.25, 0.289, { ic: 0.064 }],
        94: [0.694, -0.527, 0.5, { ic: 0.033 }],
        95: [-0.038, 0.114, 0.5, { ic: 0.065 }],
        126: [0.327, -0.193, 0.5, { ic: 0.06 }],
        305: [0.444, 0, 0.239, { ic: 0.019 }],
        567: [0.444, 0.204, 0.267, { ic: 0.019 }],
        768: [0.694, -0.527, 0],
        769: [0.694, -0.527, 0, { ic: 0.063 }],
        770: [0.694, -0.527, 0, { ic: 0.033 }],
        771: [0.677, -0.543, 0, { ic: 0.06 }],
        772: [0.631, -0.552, 0, { ic: 0.064 }],
        774: [0.694, -0.508, 0, { ic: 0.073 }],
        775: [0.68, -0.576, 0],
        776: [0.68, -0.582, 0, { ic: 0.04 }],
        778: [0.693, -0.527, 0],
        779: [0.694, -0.527, 0, { ic: 0.063 }],
        780: [0.654, -0.487, 0, { ic: 0.06 }],
        913: [0.694, 0, 0.667],
        914: [0.694, 0, 0.667, { ic: 0.029 }],
        915: [0.691, 0, 0.542, { ic: 0.104 }],
        916: [0.694, 0, 0.833],
        917: [0.691, 0, 0.597, { ic: 0.091 }],
        918: [0.694, 0, 0.611, { ic: 0.091 }],
        919: [0.694, 0, 0.708, { ic: 0.06 }],
        920: [0.715, 0.022, 0.778, { ic: 0.026 }],
        921: [0.694, 0, 0.278, { ic: 0.06 }],
        922: [0.694, 0, 0.694, { ic: 0.091 }],
        923: [0.694, 0, 0.611],
        924: [0.694, 0, 0.875, { ic: 0.054 }],
        925: [0.694, 0, 0.708, { ic: 0.058 }],
        926: [0.688, 0, 0.667, { ic: 0.098 }],
        927: [0.716, 0.022, 0.736, { ic: 0.027 }],
        928: [0.691, 0, 0.708, { ic: 0.06 }],
        929: [0.694, 0, 0.639, { ic: 0.051 }],
        931: [0.694, 0, 0.722, { ic: 0.091 }],
        932: [0.688, 0, 0.681, { ic: 0.109 }],
        933: [0.716, 0, 0.778, { ic: 0.065 }],
        934: [0.694, 0, 0.722, { ic: 0.021 }],
        935: [0.694, 0, 0.667, { ic: 0.091 }],
        936: [0.694, 0, 0.778, { ic: 0.076 }],
        937: [0.716, 0, 0.722, { ic: 0.047 }],
        8211: [0.312, -0.236, 0.5, { ic: 0.065 }],
        8212: [0.312, -0.236, 1, { ic: 0.065 }],
        8213: [0.312, -0.236, 1, { ic: 0.065 }],
        8215: [-0.038, 0.114, 0.5, { ic: 0.065 }],
        8216: [0.694, -0.471, 0.278, { ic: 0.058 }],
        8217: [0.694, -0.471, 0.278, { ic: 0.057 }],
        8220: [0.694, -0.471, 0.5, { ic: 0.114 }],
        8221: [0.694, -0.471, 0.5],
        8260: [0.75, 0.25, 0.5, { ic: 0.1 }],
        8710: [0.694, 0, 0.833],
      };
    },
    83366: (c, t) => {
      Object.defineProperty(t, "__esModule", { value: true });
      t.sansSerif = void 0;
      t.sansSerif = {
        33: [0.694, 0, 0.319],
        34: [0.694, -0.471, 0.5],
        35: [0.694, 0.194, 0.833],
        36: [0.75, 0.056, 0.5],
        37: [0.75, 0.056, 0.833],
        38: [0.716, 0.022, 0.758],
        39: [0.694, -0.471, 0.278],
        40: [0.75, 0.25, 0.389],
        41: [0.75, 0.25, 0.389],
        42: [0.75, -0.306, 0.5],
        43: [0.583, 0.082, 0.778],
        44: [0.098, 0.125, 0.278],
        45: [0.259, -0.186, 0.333],
        46: [0.098, 0, 0.278],
        47: [0.75, 0.25, 0.5],
        58: [0.444, 0, 0.278],
        59: [0.444, 0.125, 0.278],
        61: [0.37, -0.13, 0.778],
        63: [0.704, 0, 0.472],
        64: [0.704, 0.011, 0.667],
        91: [0.75, 0.25, 0.289],
        93: [0.75, 0.25, 0.289],
        94: [0.694, -0.527, 0.5],
        95: [-0.038, 0.114, 0.5],
        126: [0.327, -0.193, 0.5],
        305: [0.444, 0, 0.239],
        567: [0.444, 0.205, 0.267],
        768: [0.694, -0.527, 0],
        769: [0.694, -0.527, 0],
        770: [0.694, -0.527, 0],
        771: [0.677, -0.543, 0],
        772: [0.631, -0.552, 0],
        774: [0.694, -0.508, 0],
        775: [0.68, -0.576, 0],
        776: [0.68, -0.582, 0],
        778: [0.694, -0.527, 0],
        779: [0.694, -0.527, 0],
        780: [0.654, -0.487, 0],
        913: [0.694, 0, 0.667],
        914: [0.694, 0, 0.667],
        915: [0.691, 0, 0.542],
        916: [0.694, 0, 0.833],
        917: [0.691, 0, 0.597],
        918: [0.694, 0, 0.611],
        919: [0.694, 0, 0.708],
        920: [0.716, 0.021, 0.778],
        921: [0.694, 0, 0.278],
        922: [0.694, 0, 0.694],
        923: [0.694, 0, 0.611],
        924: [0.694, 0, 0.875],
        925: [0.694, 0, 0.708],
        926: [0.688, 0, 0.667],
        927: [0.715, 0.022, 0.736],
        928: [0.691, 0, 0.708],
        929: [0.694, 0, 0.639],
        931: [0.694, 0, 0.722],
        932: [0.688, 0, 0.681],
        933: [0.716, 0, 0.778],
        934: [0.694, 0, 0.722],
        935: [0.694, 0, 0.667],
        936: [0.694, 0, 0.778],
        937: [0.716, 0, 0.722],
        8211: [0.312, -0.236, 0.5],
        8212: [0.312, -0.236, 1],
        8213: [0.312, -0.236, 1],
        8215: [-0.038, 0.114, 0.5],
        8216: [0.694, -0.471, 0.278],
        8217: [0.694, -0.471, 0.278],
        8220: [0.694, -0.471, 0.5],
        8221: [0.694, -0.471, 0.5],
        8260: [0.75, 0.25, 0.5],
        8710: [0.694, 0, 0.833],
      };
    },
    21616: (c, t) => {
      Object.defineProperty(t, "__esModule", { value: true });
      t.scriptBold = void 0;
      t.scriptBold = {};
    },
    24062: (c, t) => {
      Object.defineProperty(t, "__esModule", { value: true });
      t.script = void 0;
      t.script = {};
    },
    22578: (c, t) => {
      Object.defineProperty(t, "__esModule", { value: true });
      t.smallop = void 0;
      t.smallop = {
        40: [0.85, 0.349, 0.458],
        41: [0.85, 0.349, 0.458],
        47: [0.85, 0.349, 0.578],
        91: [0.85, 0.349, 0.417],
        92: [0.85, 0.349, 0.578],
        93: [0.85, 0.349, 0.417],
        123: [0.85, 0.349, 0.583],
        125: [0.85, 0.349, 0.583],
        710: [0.744, -0.551, 0.556],
        732: [0.722, -0.597, 0.556],
        770: [0.744, -0.551, 0],
        771: [0.722, -0.597, 0],
        8214: [0.602, 0, 0.778],
        8260: [0.85, 0.349, 0.578],
        8593: [0.6, 0, 0.667],
        8595: [0.6, 0, 0.667],
        8657: [0.599, 0, 0.778],
        8659: [0.6, 0, 0.778],
        8719: [0.75, 0.25, 0.944],
        8720: [0.75, 0.25, 0.944],
        8721: [0.75, 0.25, 1.056],
        8730: [0.85, 0.35, 1, { ic: 0.02 }],
        8739: [0.627, 0.015, 0.333],
        8741: [0.627, 0.015, 0.556],
        8747: [0.805, 0.306, 0.472, { ic: 0.138 }],
        8748: [0.805, 0.306, 0.819, { ic: 0.138 }],
        8749: [0.805, 0.306, 1.166, { ic: 0.138 }],
        8750: [0.805, 0.306, 0.472, { ic: 0.138 }],
        8896: [0.75, 0.249, 0.833],
        8897: [0.75, 0.249, 0.833],
        8898: [0.75, 0.249, 0.833],
        8899: [0.75, 0.249, 0.833],
        8968: [0.85, 0.349, 0.472],
        8969: [0.85, 0.349, 0.472],
        8970: [0.85, 0.349, 0.472],
        8971: [0.85, 0.349, 0.472],
        9001: [0.85, 0.35, 0.472],
        9002: [0.85, 0.35, 0.472],
        9168: [0.602, 0, 0.667],
        10072: [0.627, 0.015, 0.333],
        10216: [0.85, 0.35, 0.472],
        10217: [0.85, 0.35, 0.472],
        10752: [0.75, 0.25, 1.111],
        10753: [0.75, 0.25, 1.111],
        10754: [0.75, 0.25, 1.111],
        10756: [0.75, 0.249, 0.833],
        10758: [0.75, 0.249, 0.833],
        10764: [0.805, 0.306, 1.638, { ic: 0.138 }],
        12296: [0.85, 0.35, 0.472],
        12297: [0.85, 0.35, 0.472],
      };
    },
    70286: (c, t) => {
      Object.defineProperty(t, "__esModule", { value: true });
      t.texCalligraphicBold = void 0;
      t.texCalligraphicBold = {
        65: [0.751, 0.049, 0.921, { ic: 0.068, sk: 0.224 }],
        66: [0.705, 0.017, 0.748, { sk: 0.16 }],
        67: [0.703, 0.02, 0.613, { sk: 0.16 }],
        68: [0.686, 0, 0.892, { sk: 0.0958 }],
        69: [0.703, 0.016, 0.607, { ic: 0.02, sk: 0.128 }],
        70: [0.686, 0.03, 0.814, { ic: 0.116, sk: 0.128 }],
        71: [0.703, 0.113, 0.682, { sk: 0.128 }],
        72: [0.686, 0.048, 0.987, { sk: 0.128 }],
        73: [0.686, 0, 0.642, { ic: 0.104, sk: 0.0319 }],
        74: [0.686, 0.114, 0.779, { ic: 0.158, sk: 0.192 }],
        75: [0.703, 0.017, 0.871, { sk: 0.0639 }],
        76: [0.703, 0.017, 0.788, { sk: 0.16 }],
        77: [0.703, 0.049, 1.378, { sk: 0.16 }],
        78: [0.84, 0.049, 0.937, { ic: 0.168, sk: 0.0958 }],
        79: [0.703, 0.017, 0.906, { sk: 0.128 }],
        80: [0.686, 0.067, 0.81, { ic: 0.036, sk: 0.0958 }],
        81: [0.703, 0.146, 0.939, { sk: 0.128 }],
        82: [0.686, 0.017, 0.99, { sk: 0.0958 }],
        83: [0.703, 0.016, 0.696, { ic: 0.025, sk: 0.16 }],
        84: [0.72, 0.069, 0.644, { ic: 0.303, sk: 0.0319 }],
        85: [0.686, 0.024, 0.715, { ic: 0.056, sk: 0.0958 }],
        86: [0.686, 0.077, 0.737, { ic: 0.037, sk: 0.0319 }],
        87: [0.686, 0.077, 1.169, { ic: 0.037, sk: 0.0958 }],
        88: [0.686, 0, 0.817, { ic: 0.089, sk: 0.16 }],
        89: [0.686, 0.164, 0.759, { ic: 0.038, sk: 0.0958 }],
        90: [0.686, 0, 0.818, { ic: 0.035, sk: 0.16 }],
        305: [0.452, 0.008, 0.394, { sk: 0.0319 }],
        567: [0.451, 0.201, 0.439, { sk: 0.0958 }],
      };
    },
    57552: (c, t) => {
      Object.defineProperty(t, "__esModule", { value: true });
      t.texCalligraphic = void 0;
      t.texCalligraphic = {
        65: [0.728, 0.05, 0.798, { ic: 0.021, sk: 0.194 }],
        66: [0.705, 0.022, 0.657, { sk: 0.139 }],
        67: [0.705, 0.025, 0.527, { sk: 0.139 }],
        68: [0.683, 0, 0.771, { sk: 0.0833 }],
        69: [0.705, 0.022, 0.528, { ic: 0.036, sk: 0.111 }],
        70: [0.683, 0.032, 0.719, { ic: 0.11, sk: 0.111 }],
        71: [0.704, 0.119, 0.595, { sk: 0.111 }],
        72: [0.683, 0.048, 0.845, { sk: 0.111 }],
        73: [0.683, 0, 0.545, { ic: 0.097, sk: 0.0278 }],
        74: [0.683, 0.119, 0.678, { ic: 0.161, sk: 0.167 }],
        75: [0.705, 0.022, 0.762, { sk: 0.0556 }],
        76: [0.705, 0.022, 0.69, { sk: 0.139 }],
        77: [0.705, 0.05, 1.201, { sk: 0.139 }],
        78: [0.789, 0.05, 0.82, { ic: 0.159, sk: 0.0833 }],
        79: [0.705, 0.022, 0.796, { sk: 0.111 }],
        80: [0.683, 0.057, 0.696, { ic: 0.037, sk: 0.0833 }],
        81: [0.705, 0.131, 0.817, { sk: 0.111 }],
        82: [0.682, 0.022, 0.848, { sk: 0.0833 }],
        83: [0.705, 0.022, 0.606, { ic: 0.036, sk: 0.139 }],
        84: [0.717, 0.068, 0.545, { ic: 0.288, sk: 0.0278 }],
        85: [0.683, 0.028, 0.626, { ic: 0.061, sk: 0.0833 }],
        86: [0.683, 0.052, 0.613, { ic: 0.045, sk: 0.0278 }],
        87: [0.683, 0.053, 0.988, { ic: 0.046, sk: 0.0833 }],
        88: [0.683, 0, 0.713, { ic: 0.094, sk: 0.139 }],
        89: [0.683, 0.143, 0.668, { ic: 0.046, sk: 0.0833 }],
        90: [0.683, 0, 0.725, { ic: 0.042, sk: 0.139 }],
      };
    },
    24398: (c, t) => {
      Object.defineProperty(t, "__esModule", { value: true });
      t.texMathit = void 0;
      t.texMathit = {
        65: [0.716, 0, 0.743],
        66: [0.683, 0, 0.704],
        67: [0.705, 0.021, 0.716],
        68: [0.683, 0, 0.755],
        69: [0.68, 0, 0.678],
        70: [0.68, 0, 0.653],
        71: [0.705, 0.022, 0.774],
        72: [0.683, 0, 0.743],
        73: [0.683, 0, 0.386],
        74: [0.683, 0.021, 0.525],
        75: [0.683, 0, 0.769],
        76: [0.683, 0, 0.627],
        77: [0.683, 0, 0.897],
        78: [0.683, 0, 0.743],
        79: [0.704, 0.022, 0.767],
        80: [0.683, 0, 0.678],
        81: [0.704, 0.194, 0.767],
        82: [0.683, 0.022, 0.729],
        83: [0.705, 0.022, 0.562],
        84: [0.677, 0, 0.716],
        85: [0.683, 0.022, 0.743],
        86: [0.683, 0.022, 0.743],
        87: [0.683, 0.022, 0.999],
        88: [0.683, 0, 0.743],
        89: [0.683, 0, 0.743],
        90: [0.683, 0, 0.613],
        97: [0.442, 0.011, 0.511],
        98: [0.694, 0.011, 0.46],
        99: [0.441, 0.01, 0.46],
        100: [0.694, 0.011, 0.511],
        101: [0.442, 0.01, 0.46],
        102: [0.705, 0.204, 0.307],
        103: [0.442, 0.205, 0.46],
        104: [0.694, 0.011, 0.511],
        105: [0.656, 0.01, 0.307],
        106: [0.656, 0.204, 0.307],
        107: [0.694, 0.011, 0.46],
        108: [0.694, 0.011, 0.256],
        109: [0.442, 0.011, 0.818],
        110: [0.442, 0.011, 0.562],
        111: [0.442, 0.011, 0.511],
        112: [0.442, 0.194, 0.511],
        113: [0.442, 0.194, 0.46],
        114: [0.442, 0.011, 0.422],
        115: [0.442, 0.011, 0.409],
        116: [0.626, 0.011, 0.332],
        117: [0.441, 0.011, 0.537],
        118: [0.443, 0.01, 0.46],
        119: [0.443, 0.011, 0.664],
        120: [0.442, 0.011, 0.464],
        121: [0.441, 0.205, 0.486],
        122: [0.442, 0.011, 0.409],
      };
    },
    20628: (c, t) => {
      Object.defineProperty(t, "__esModule", { value: true });
      t.texOldstyleBold = void 0;
      t.texOldstyleBold = {
        48: [0.46, 0.017, 0.575],
        49: [0.461, 0, 0.575],
        50: [0.46, 0, 0.575],
        51: [0.461, 0.211, 0.575],
        52: [0.469, 0.194, 0.575],
        53: [0.461, 0.211, 0.575],
        54: [0.66, 0.017, 0.575],
        55: [0.476, 0.211, 0.575],
        56: [0.661, 0.017, 0.575],
        57: [0.461, 0.21, 0.575],
        65: [0.751, 0.049, 0.921, { ic: 0.068, sk: 0.224 }],
        66: [0.705, 0.017, 0.748, { sk: 0.16 }],
        67: [0.703, 0.02, 0.613, { sk: 0.16 }],
        68: [0.686, 0, 0.892, { sk: 0.0958 }],
        69: [0.703, 0.016, 0.607, { ic: 0.02, sk: 0.128 }],
        70: [0.686, 0.03, 0.814, { ic: 0.116, sk: 0.128 }],
        71: [0.703, 0.113, 0.682, { sk: 0.128 }],
        72: [0.686, 0.048, 0.987, { sk: 0.128 }],
        73: [0.686, 0, 0.642, { ic: 0.104, sk: 0.0319 }],
        74: [0.686, 0.114, 0.779, { ic: 0.158, sk: 0.192 }],
        75: [0.703, 0.017, 0.871, { sk: 0.0639 }],
        76: [0.703, 0.017, 0.788, { sk: 0.16 }],
        77: [0.703, 0.049, 1.378, { sk: 0.16 }],
        78: [0.84, 0.049, 0.937, { ic: 0.168, sk: 0.0958 }],
        79: [0.703, 0.017, 0.906, { sk: 0.128 }],
        80: [0.686, 0.067, 0.81, { ic: 0.036, sk: 0.0958 }],
        81: [0.703, 0.146, 0.939, { sk: 0.128 }],
        82: [0.686, 0.017, 0.99, { sk: 0.0958 }],
        83: [0.703, 0.016, 0.696, { ic: 0.025, sk: 0.16 }],
        84: [0.72, 0.069, 0.644, { ic: 0.303, sk: 0.0319 }],
        85: [0.686, 0.024, 0.715, { ic: 0.056, sk: 0.0958 }],
        86: [0.686, 0.077, 0.737, { ic: 0.037, sk: 0.0319 }],
        87: [0.686, 0.077, 1.169, { ic: 0.037, sk: 0.0958 }],
        88: [0.686, 0, 0.817, { ic: 0.089, sk: 0.16 }],
        89: [0.686, 0.164, 0.759, { ic: 0.038, sk: 0.0958 }],
        90: [0.686, 0, 0.818, { ic: 0.035, sk: 0.16 }],
      };
    },
    41855: (c, t) => {
      Object.defineProperty(t, "__esModule", { value: true });
      t.texOldstyle = void 0;
      t.texOldstyle = {
        48: [0.452, 0.022, 0.5],
        49: [0.453, 0, 0.5],
        50: [0.453, 0, 0.5],
        51: [0.452, 0.216, 0.5],
        52: [0.464, 0.194, 0.5],
        53: [0.453, 0.216, 0.5],
        54: [0.665, 0.022, 0.5],
        55: [0.463, 0.216, 0.5],
        56: [0.666, 0.021, 0.5],
        57: [0.453, 0.216, 0.5],
        65: [0.728, 0.05, 0.798, { ic: 0.021, sk: 0.194 }],
        66: [0.705, 0.022, 0.657, { sk: 0.139 }],
        67: [0.705, 0.025, 0.527, { sk: 0.139 }],
        68: [0.683, 0, 0.771, { sk: 0.0833 }],
        69: [0.705, 0.022, 0.528, { ic: 0.036, sk: 0.111 }],
        70: [0.683, 0.032, 0.719, { ic: 0.11, sk: 0.111 }],
        71: [0.704, 0.119, 0.595, { sk: 0.111 }],
        72: [0.683, 0.048, 0.845, { sk: 0.111 }],
        73: [0.683, 0, 0.545, { ic: 0.097, sk: 0.0278 }],
        74: [0.683, 0.119, 0.678, { ic: 0.161, sk: 0.167 }],
        75: [0.705, 0.022, 0.762, { sk: 0.0556 }],
        76: [0.705, 0.022, 0.69, { sk: 0.139 }],
        77: [0.705, 0.05, 1.201, { sk: 0.139 }],
        78: [0.789, 0.05, 0.82, { ic: 0.159, sk: 0.0833 }],
        79: [0.705, 0.022, 0.796, { sk: 0.111 }],
        80: [0.683, 0.057, 0.696, { ic: 0.037, sk: 0.0833 }],
        81: [0.705, 0.131, 0.817, { sk: 0.111 }],
        82: [0.682, 0.022, 0.848, { sk: 0.0833 }],
        83: [0.705, 0.022, 0.606, { ic: 0.036, sk: 0.139 }],
        84: [0.717, 0.068, 0.545, { ic: 0.288, sk: 0.0278 }],
        85: [0.683, 0.028, 0.626, { ic: 0.061, sk: 0.0833 }],
        86: [0.683, 0.052, 0.613, { ic: 0.045, sk: 0.0278 }],
        87: [0.683, 0.053, 0.988, { ic: 0.046, sk: 0.0833 }],
        88: [0.683, 0, 0.713, { ic: 0.094, sk: 0.139 }],
        89: [0.683, 0.143, 0.668, { ic: 0.046, sk: 0.0833 }],
        90: [0.683, 0, 0.725, { ic: 0.042, sk: 0.139 }],
      };
    },
    75431: (c, t) => {
      Object.defineProperty(t, "__esModule", { value: true });
      t.texSize3 = void 0;
      t.texSize3 = {
        40: [1.45, 0.949, 0.736],
        41: [1.45, 0.949, 0.736],
        47: [1.45, 0.949, 1.044],
        91: [1.45, 0.949, 0.528],
        92: [1.45, 0.949, 1.044],
        93: [1.45, 0.949, 0.528],
        123: [1.45, 0.949, 0.75],
        125: [1.45, 0.949, 0.75],
        710: [0.772, -0.564, 1.444],
        732: [0.749, -0.61, 1.444],
        770: [0.772, -0.564, 0],
        771: [0.749, -0.61, 0],
        8260: [1.45, 0.949, 1.044],
        8730: [1.45, 0.95, 1, { ic: 0.02 }],
        8968: [1.45, 0.949, 0.583],
        8969: [1.45, 0.949, 0.583],
        8970: [1.45, 0.949, 0.583],
        8971: [1.45, 0.949, 0.583],
        9001: [1.45, 0.95, 0.75],
        9002: [1.45, 0.949, 0.75],
        10216: [1.45, 0.95, 0.75],
        10217: [1.45, 0.949, 0.75],
        12296: [1.45, 0.95, 0.75],
        12297: [1.45, 0.949, 0.75],
      };
    },
    98278: (c, t) => {
      Object.defineProperty(t, "__esModule", { value: true });
      t.texSize4 = void 0;
      t.texSize4 = {
        40: [1.75, 1.249, 0.792],
        41: [1.75, 1.249, 0.792],
        47: [1.75, 1.249, 1.278],
        91: [1.75, 1.249, 0.583],
        92: [1.75, 1.249, 1.278],
        93: [1.75, 1.249, 0.583],
        123: [1.75, 1.249, 0.806],
        125: [1.75, 1.249, 0.806],
        710: [0.845, -0.561, 1.889, { ic: 0.013 }],
        732: [0.823, -0.583, 1.889],
        770: [0.845, -0.561, 0, { ic: 0.013 }],
        771: [0.823, -0.583, 0],
        8260: [1.75, 1.249, 1.278],
        8730: [1.75, 1.25, 1, { ic: 0.02 }],
        8968: [1.75, 1.249, 0.639],
        8969: [1.75, 1.249, 0.639],
        8970: [1.75, 1.249, 0.639],
        8971: [1.75, 1.249, 0.639],
        9001: [1.75, 1.248, 0.806],
        9002: [1.75, 1.248, 0.806],
        9115: [1.154, 0.655, 0.875],
        9116: [0.61, 0.01, 0.875],
        9117: [1.165, 0.644, 0.875],
        9118: [1.154, 0.655, 0.875],
        9119: [0.61, 0.01, 0.875],
        9120: [1.165, 0.644, 0.875],
        9121: [1.154, 0.645, 0.667],
        9122: [0.602, 0, 0.667],
        9123: [1.155, 0.644, 0.667],
        9124: [1.154, 0.645, 0.667],
        9125: [0.602, 0, 0.667],
        9126: [1.155, 0.644, 0.667],
        9127: [0.899, 0.01, 0.889],
        9128: [1.16, 0.66, 0.889],
        9129: [0.01, 0.899, 0.889],
        9130: [0.29, 0.015, 0.889],
        9131: [0.899, 0.01, 0.889],
        9132: [1.16, 0.66, 0.889],
        9133: [0.01, 0.899, 0.889],
        9143: [0.935, 0.885, 1.056],
        10216: [1.75, 1.248, 0.806],
        10217: [1.75, 1.248, 0.806],
        12296: [1.75, 1.248, 0.806],
        12297: [1.75, 1.248, 0.806],
        57344: [0.625, 0.014, 1.056],
        57345: [0.605, 0.014, 1.056, { ic: 0.02 }],
        57680: [0.12, 0.213, 0.45, { ic: 0.01 }],
        57681: [0.12, 0.213, 0.45, { ic: 0.024 }],
        57682: [0.333, 0, 0.45, { ic: 0.01 }],
        57683: [0.333, 0, 0.45, { ic: 0.024 }],
        57684: [0.32, 0.2, 0.4, { ic: 0.01 }],
        57685: [0.333, 0, 0.9, { ic: 0.01 }],
        57686: [0.12, 0.213, 0.9, { ic: 0.01 }],
      };
    },
    90456: (c, t) => {
      Object.defineProperty(t, "__esModule", { value: true });
      t.texVariant = void 0;
      t.texVariant = {
        710: [0.845, -0.561, 2.333, { ic: 0.013 }],
        732: [0.899, -0.628, 2.333],
        770: [0.845, -0.561, 0, { ic: 0.013 }],
        771: [0.899, -0.628, 0],
        1008: [0.434, 0.006, 0.667, { ic: 0.067 }],
        8463: [0.695, 0.013, 0.54, { ic: 0.022 }],
        8592: [0.437, -0.064, 0.5],
        8594: [0.437, -0.064, 0.5],
        8652: [0.514, 0.014, 1],
        8708: [0.86, 0.166, 0.556],
        8709: [0.587, 0, 0.778],
        8722: [0.27, -0.23, 0.5],
        8726: [0.43, 0.023, 0.778],
        8733: [0.472, -0.028, 0.778],
        8739: [0.43, 0.023, 0.222],
        8740: [0.43, 0.023, 0.222, { ic: 0.018 }],
        8741: [0.431, 0.023, 0.389],
        8742: [0.431, 0.024, 0.389, { ic: 0.018 }],
        8764: [0.365, -0.132, 0.778],
        8776: [0.481, -0.05, 0.778],
        8808: [0.752, 0.284, 0.778],
        8809: [0.752, 0.284, 0.778],
        8816: [0.919, 0.421, 0.778],
        8817: [0.919, 0.421, 0.778],
        8840: [0.828, 0.33, 0.778],
        8841: [0.828, 0.33, 0.778],
        8842: [0.634, 0.255, 0.778],
        8843: [0.634, 0.254, 0.778],
        8872: [0.694, 0, 0.611],
        8901: [0.189, 0, 0.278],
        8994: [0.378, -0.122, 0.778],
        8995: [0.378, -0.143, 0.778],
        9651: [0.575, 0.02, 0.722],
        9661: [0.576, 0.019, 0.722],
        10887: [0.801, 0.303, 0.778],
        10888: [0.801, 0.303, 0.778],
        10955: [0.752, 0.332, 0.778],
        10956: [0.752, 0.333, 0.778],
      };
    },
    86810: (c, t) => {
      Object.defineProperty(t, "__esModule", { value: true });
      t.px = t.emRounded = t.em = t.percent = t.length2em = t.MATHSPACE = t.RELUNITS = t.UNITS = t.BIGDIMEN = void 0;
      t.BIGDIMEN = 1e6;
      t.UNITS = { px: 1, in: 96, cm: 96 / 2.54, mm: 96 / 25.4 };
      t.RELUNITS = { em: 1, ex: 0.431, pt: 1 / 10, pc: 12 / 10, mu: 1 / 18 };
      t.MATHSPACE = {
        veryverythinmathspace: 1 / 18,
        verythinmathspace: 2 / 18,
        thinmathspace: 3 / 18,
        mediummathspace: 4 / 18,
        thickmathspace: 5 / 18,
        verythickmathspace: 6 / 18,
        veryverythickmathspace: 7 / 18,
        negativeveryverythinmathspace: -1 / 18,
        negativeverythinmathspace: -2 / 18,
        negativethinmathspace: -3 / 18,
        negativemediummathspace: -4 / 18,
        negativethickmathspace: -5 / 18,
        negativeverythickmathspace: -6 / 18,
        negativeveryverythickmathspace: -7 / 18,
        thin: 0.04,
        medium: 0.06,
        thick: 0.1,
        normal: 1,
        big: 2,
        small: 1 / Math.sqrt(2),
        infinity: t.BIGDIMEN,
      };
      function e(c, e, i, f) {
        if (e === void 0) {
          e = 0;
        }
        if (i === void 0) {
          i = 1;
        }
        if (f === void 0) {
          f = 16;
        }
        if (typeof c !== "string") {
          c = String(c);
        }
        if (c === "" || c == null) {
          return e;
        }
        if (t.MATHSPACE[c]) {
          return t.MATHSPACE[c];
        }
        var r = c.match(/^\s*([-+]?(?:\.\d+|\d+(?:\.\d*)?))?(pt|em|ex|mu|px|pc|in|mm|cm|%)?/);
        if (!r) {
          return e;
        }
        var s = parseFloat(r[1] || "1"),
          a = r[2];
        if (t.UNITS.hasOwnProperty(a)) {
          return (s * t.UNITS[a]) / f / i;
        }
        if (t.RELUNITS.hasOwnProperty(a)) {
          return s * t.RELUNITS[a];
        }
        if (a === "%") {
          return (s / 100) * e;
        }
        return s * e;
      }
      t.length2em = e;
      function i(c) {
        return (100 * c).toFixed(1).replace(/\.?0+$/, "") + "%";
      }
      t.percent = i;
      function f(c) {
        if (Math.abs(c) < 0.001) return "0";
        return c.toFixed(3).replace(/\.?0+$/, "") + "em";
      }
      t.em = f;
      function r(c, t) {
        if (t === void 0) {
          t = 16;
        }
        c = (Math.round(c * t) + 0.05) / t;
        if (Math.abs(c) < 0.001) return "0em";
        return c.toFixed(3).replace(/\.?0+$/, "") + "em";
      }
      t.emRounded = r;
      function s(c, e, i) {
        if (e === void 0) {
          e = -t.BIGDIMEN;
        }
        if (i === void 0) {
          i = 16;
        }
        c *= i;
        if (e && c < e) c = e;
        if (Math.abs(c) < 0.1) return "0";
        return c.toFixed(1).replace(/\.0$/, "") + "px";
      }
      t.px = s;
    },
  },
]);
