/*!
 * jsModal - A pure JavaScript modal dialog engine v1.0d
 * http://jsmodal.com/
 *
 * Author: Henry Rune Tang Kai <henry@henrys.se>
 *
 * (c) Copyright 2013 Henry Tang Kai.
 *
 * License: http://www.opensource.org/licenses/mit-license.php
 *
 * Date: 2013-7-11
 */
export var Modal = function () {
  var c = {}, a = {}, d = document.createElement("div"), b = document.createElement("div"), f = document.createElement("div"), h = document.createElement("div"), k = document.createElement("div"), l, p;
  c.open = function (e) {
    a.width = e.width || "auto";
    a.height = e.height || "auto";
    a.lock = e.lock || !1;
    a.hideClose = e.hideClose || !1;
    a.draggable = e.draggable || !1;
    a.closeAfter = e.closeAfter || 0;
    a.closeCallback = e.closeCallback || !1;
    a.openCallback = e.openCallback || !1;
    a.hideOverlay = e.hideOverlay || !1;
    l = function () {
      c.center({})
    };
    e.content && !e.ajaxContent ? h.innerHTML = e.content : e.ajaxContent && !e.content ? (b.className = "modal-loading", c.ajax(e.ajaxContent, function (a) {
      h.innerHTML = a
    })) : h.innerHTML = "";
    b.style.width = a.width;
    b.style.height = a.height;
    c.center({});
    if (a.lock || a.hideClose)k.style.visibility = "hidden";
    a.hideOverlay || (d.style.visibility = "visible");
    b.style.visibility = "visible";
    document.onkeypress = function (b) {
      27 === b.keyCode && !0 !== a.lock && c.close()
    };
    k.onclick = function () {
      if (a.hideClose)return !1;
      c.close()
    };
    d.onclick = function () {
      if (a.lock)return !1;
      c.close()
    };
    window.addEventListener ? window.addEventListener("resize", l, !1) : window.attachEvent && window.attachEvent("onresize", l);
    a.draggable ? (f.style.cursor = "move", f.onmousedown = function (a) {
      c.drag(a);
      return !1
    }) : f.onmousedown = function () {
      return !1
    };
    0 < a.closeAfter && (p = window.setTimeout(function () {
      c.close()
    }, 1E3 * a.closeAfter));
    a.openCallback && a.openCallback()
  };
  c.drag = function (a) {
    var c = void 0 !== window.event ? window.event.clientX : a.clientX, m = void 0 !== window.event ? window.event.clientY : a.clientY, g = c - b.offsetLeft, d = m - b.offsetTop;
    document.onmousemove = function (a) {
      c = void 0 !== window.event ? window.event.clientX : a.clientX;
      m = void 0 !== window.event ? window.event.clientY : a.clientY;
      b.style.left = 0 < c - g ? c - g + "px" : 0;
      b.style.top = 0 < m - d ? m - d + "px" : 0;
      document.onmouseup = function () {
        window.document.onmousemove = null
      }
    }
  };
  c.ajax = function (a, c) {
    var d, g = !1, f = [function () {
      return new window.XMLHttpRequest
    }, function () {
      return new window.ActiveXObject("Msxml2.XMLHTTP.6.0")
    }, function () {
      return new window.ActiveXObject("Msxml2.XMLHTTP.3.0")
    }, function () {
      return new window.ActiveXObject("Msxml2.XMLHTTP")
    }];
    for (d = 0; d < f.length; d += 1) {
      try {
        g = f[d]()
      } catch (h) {
      }
      if (!1 !== g)break
    }
    g.open("GET", a, !0);
    g.onreadystatechange = function () {
      4 === g.readyState && (c(g.responseText), b.removeAttribute("class"))
    };
    g.send(null)
  };
  c.close = function () {
    h.innerHTML = "";
    d.setAttribute("style", "");
    d.style.cssText = "";
    d.style.visibility = "hidden";
    b.setAttribute("style", "");
    b.style.cssText = "";
    b.style.visibility = "hidden";
    f.style.cursor = "default";
    k.setAttribute("style", "");
    k.style.cssText = "";
    p && window.clearTimeout(p);
    a.closeCallback && a.closeCallback();
    window.removeEventListener ? window.removeEventListener("resize", l, !1) : window.detachEvent && window.detachEvent("onresize", l)
  };
  c.center = function (a) {
    var c = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight), f = Math.max(b.clientWidth, b.offsetWidth), g = Math.max(b.clientHeight, b.offsetHeight), h = 0, k = 0, l = 0, n = 0;
    "number" === typeof window.innerWidth ? (h = window.innerWidth, k = window.innerHeight) : document.documentElement && document.documentElement.clientWidth && (h = document.documentElement.clientWidth, k = document.documentElement.clientHeight);
    "number" === typeof window.pageYOffset ? (n = window.pageYOffset, l = window.pageXOffset) : document.body && document.body.scrollLeft ? (n = document.body.scrollTop, l = document.body.scrollLeft) : document.documentElement && document.documentElement.scrollLeft && (n = document.documentElement.scrollTop, l = document.documentElement.scrollLeft);
    a.horizontalOnly || (b.style.top = n + k / 2 - g / 2 + "px");
    b.style.left = l + h / 2 - f / 2 + "px";
    d.style.height = c + "px";
    d.style.width = "100%"
  };
  d.setAttribute("id", "modal-overlay");
  b.setAttribute("id", "modal-container");
  f.setAttribute("id", "modal-header");
  h.setAttribute("id", "modal-content");
  k.setAttribute("id", "modal-close");
  f.appendChild(k);
  b.appendChild(f);
  b.appendChild(h);
  d.style.visibility = "hidden";
  b.style.visibility = "hidden";
  window.addEventListener ? window.addEventListener("load", function () {
    document.body.appendChild(d);
    document.body.appendChild(b)
  }, !1) : window.attachEvent && window.attachEvent("onload", function () {
    document.body.appendChild(d);
    document.body.appendChild(b)
  });
  return c;
}();