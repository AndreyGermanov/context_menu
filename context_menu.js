function d() {
  this.subscriptions = {}, this.subscribe = (n, s) => {
    if (typeof n == "string")
      return this.subscribeToEvent(n, s);
    if (typeof n == "object") {
      for (let e of n)
        this.subscribeToEvent(e, s);
      return s;
    }
    return null;
  }, this.subscribeToEvent = (n, s) => ((typeof this.subscriptions[n] > "u" || !this.subscriptions[n]) && (this.subscriptions[n] = []), typeof this.subscriptions[n].find((e) => e === s) < "u" ? null : (this.subscriptions[n].push(s), s)), this.emit = (n, s, e = null) => {
    if ((!e || typeof e != "object") && (e = {}), e.type = n, e.target = s, typeof this.subscriptions[n] < "u" && this.subscriptions[n] && this.subscriptions[n].length) {
      for (let r of this.subscriptions[n])
        r(e);
      return !0;
    }
    return !1;
  }, this.unsubscribe = (n, s) => {
    let e = !1;
    if (typeof n == "string")
      this.unsubscribeFromEvent(n, s) && (e = !0);
    else if (typeof n == "object")
      for (let r of n)
        this.unsubscribeFromEvent(r, s) && (e = !0);
    return e;
  }, this.unsubscribeFromEvent = (n, s) => {
    if (typeof this.subscriptions[n] > "u" || !this.subscriptions[n])
      return !1;
    const e = this.subscriptions[n].indexOf(s);
    return e !== -1 ? (this.subscriptions[n].splice(e, 1), !0) : !1;
  }, this.clear = () => {
    this.subscriptions = {};
  };
}
const o = new d();
function p(n) {
  this.menu = n, this.panelCssClass = "", this.itemCssClass = "", this.itemTextCssClass = "", this.itemImageCssClass = "", this.itemsCssClassesById = {}, this.setStyles = () => {
    if (!!this.menu.panel) {
      this.panelCssClass ? this.menu.panel.className = this.panelCssClass : (this.menu.panel.style.padding = "3px", this.menu.panel.style.borderStyle = "solid", this.menu.panel.style.borderColor = "#dddddd", this.menu.panel.style.borderWidth = "1px", this.menu.panel.style.backgroundColor = "#eeeeee", this.menu.panel.className = "");
      for (let s of this.menu.items)
        this.setItemStyles(s);
    }
  }, this.setItemStyles = (s) => {
    this.setItemDivStyles(s), this.setItemSpanStyles(s), this.setItemImageStyles(s);
  }, this.setItemDivStyles = (s) => {
    const e = this.menu.panel.querySelector("#" + s.id);
    !e || (e.style.display = "flex", e.style.flexDirection = "row", e.style.alignItems = "center", this.itemsCssClassesById[s.id] && typeof this.itemsCssClassesById[s.id] == "object" && this.itemsCssClassesById[s.id][u.ITEM] ? e.className = this.itemsCssClassesById[s.id][u.ITEM] : this.itemCssClass ? e.className = this.itemCssClass || "" : (e.className = "", e.style.paddingTop = "2px", e.style.paddingLeft = "3px", e.style.paddingRight = "3px", e.addEventListener("mouseover", () => {
      e.style.backgroundColor = "#0066CC", e.style.color = "white";
    }), e.addEventListener("mouseout", () => {
      e.style.backgroundColor = "transparent", e.style.color = "black";
    })), e.style.whiteSpace = "nowrap");
  }, this.setItemSpanStyles = (s) => {
    const e = this.menu.panel.querySelector("#" + s.id);
    if (!e)
      return;
    const r = e.querySelector("span");
    r && (this.itemsCssClassesById[s.id] && typeof this.itemsCssClassesById[s.id] == "object" && this.itemsCssClassesById[s.id][u.TEXT] ? r.className = this.itemsCssClassesById[s.id][u.TEXT] : this.itemTextCssClass ? r.className = this.itemTextCssClass : (r.className = "", r.style.color = "black"));
  }, this.setItemImageStyles = (s) => {
    const e = this.menu.panel.querySelector("#" + s.id);
    if (!e)
      return;
    const r = e.querySelector("img");
    r && (this.itemsCssClassesById[s.id] && typeof this.itemsCssClassesById[s.id] == "object" && this.itemsCssClassesById[s.id][u.IMAGE] ? r.className = this.itemsCssClassesById[s.id][u.IMAGE] : this.itemImageCssClass ? r.className = this.itemImageCssClass : r.className = "");
  }, this.setPanelClass = (s = null) => {
    this.panelCssClass = s || "";
  }, this.setItemClass = (s = null, e = null) => {
    if (e) {
      this.setClassForItem(e, u.ITEM, s);
      return;
    }
    this.itemCssClass = s || "";
  }, this.setTextClass = (s = null, e = null) => {
    if (e) {
      this.setClassForItem(e, u.TEXT, s);
      return;
    }
    this.itemTextCssClass = s || "";
  }, this.setImageClass = (s = null, e = null) => {
    if (e) {
      this.setClassForItem(e, u.IMAGE, s);
      return;
    }
    this.itemImageCssClass = s || "";
  }, this.setClassForItem = (s, e, r) => {
    (!this.itemsCssClassesById[s] || typeof this.itemsCssClassesById[s] > "u") && (this.itemsCssClassesById[s] = {}), this.itemsCssClassesById[s][e] = r;
  };
}
const u = {
  ITEM: "div",
  TEXT: "text",
  IMAGE: "image"
}, f = (n, s = {}) => {
  const e = {};
  for (let r in n)
    r !== "type" && r !== "target" && (e[r] = n[r]);
  return Object.keys(s).forEach((r) => {
    e[r] = s[r];
  }), e;
};
function m(n, s, e = null, r = {}) {
  this.panel = null, this.container = s, this.items = n, this.event = e || "contextmenu", this.options = r, this.listeners = {}, this.origEvent = null, this.cursorX = 0, this.cursorY = 0, this.overflowY = "", this.maxImageHeight = 0, this.subscriptions = {}, this.init = () => (Object.assign(this, new p(this)), this.listener = (t) => (this.onEvent(t), !1), this.container.addEventListener(this.event, this.listener), o.emit(c.CREATE, this, { owner: this }), this), this.onEvent = (t) => {
    if (this.options.customHandler && typeof (this.options.customHandler === "function")) {
      this.options.customHandler(this, t);
      return;
    }
    this.origEvent = t, t.preventDefault(), t.stopPropagation(), t.cancelBubble = !0, this.cursorX = t.pageX, this.cursorY = t.pageY, this.show();
  }, this.drawMenu = () => {
    try {
      document.body.removeChild(this.panel);
    } catch {
    }
    this.panel = document.createElement("div"), document.body.appendChild(this.panel);
    for (let t of this.items) {
      if (this.panel.querySelector("#" + t.id))
        continue;
      const i = document.createElement("div");
      i.id = t.id, i.style.cursor = "pointer";
      const l = document.createElement("span");
      l.innerHTML = t.title, i.appendChild(l), this.panel.appendChild(i);
    }
    this.setStyles(), this.drawImages(), this.setStyles(), this.setItemsEventListeners(), this.panel.style.display = "none";
  }, this.drawImages = () => {
    if (!this.panel)
      return;
    const t = this.items.filter((i) => i.image && typeof i.image < "u");
    this.maxImageHeight = 0;
    for (let i of t) {
      const l = new Image();
      if (!this.panel)
        continue;
      const h = this.panel.querySelector("#" + i.id + " > span");
      if (l.style.display = "none", l.src = i.image, !this.panel)
        return;
      const a = document.createElement("div");
      a.style.marginRight = "5px", a.style.display = "flex", a.style.flexDirection = "row", a.style.justifyContent = "center", a.style.alignItems = "center", l.height = this.panel.querySelector("#" + i.id).clientHeight, l.height > this.maxImageHeight && (this.maxImageHeight = l.height), l.style.verticalAlign = "middle", l.style.display = "", a.appendChild(l), this.panel.querySelector("#" + i.id + " div") || this.panel.querySelector("#" + i.id).insertBefore(a, h);
    }
    this.adjustImagesWidth();
  }, this.setItemsEventListeners = () => {
    for (let t of ["click", "mouseover", "mouseout", "dblclick", "mousedown", "mouseup", "mousemove"])
      this.setListenersForMouseEvent(t);
  }, this.setListenersForMouseEvent = (t) => {
    for (let i of this.items)
      this.setListenerForItem(t, i);
  }, this.setListenerForItem = (t, i) => {
    const l = (h) => {
      !this.origEvent || (o.emit(t, this.origEvent.target, f(h, {
        container: this.container,
        owner: this,
        cursorX: this.cursorX,
        cursorY: this.cursorY,
        itemId: i.id
      })), setTimeout(() => {
        ["click", "mousedown", "mouseup", "dblclick"].indexOf(t) !== -1 && h.button !== 2 && this.hide();
      }, 100));
    };
    this.listeners[t + "_" + i.id] = l, this.panel.querySelector("#" + i.id).addEventListener(t, l);
  }, this.adjustImagesWidth = () => {
    if (!this.panel)
      return;
    let t = 0;
    for (let i of this.items)
      this.panel.querySelector("#" + i.id).clientHeight > t && (t = this.panel.querySelector("#" + i.id).clientHeight);
    for (let i of this.panel.querySelectorAll("img"))
      i.parentNode.style.width = t + "px", i.parentNode.style.height = t + "px";
  }, this.show = () => {
    if (!this.container || (o.emit(c.SHOW, this, { owner: this }), this.drawMenu(), !this.panel))
      return;
    this.panel.style.display = "";
    let t = this.cursorX, i = this.cursorY;
    this.panel.style.left = t + "px", this.panel.style.top = i + "px", this.panel.style.zIndex = "10000", this.panel.style.position = "absolute", t + this.panel.clientWidth > window.innerWidth && (t = window.innerWidth - this.panel.clientWidth - 10, this.panel.style.left = t + "px"), this.origEvent && this.origEvent.clientY + this.panel.clientHeight > window.innerHeight && (i = window.innerHeight - this.panel.clientHeight - 10, this.panel.style.top = i + "px");
  }, this.hide = () => {
    this.panel && (this.panel.style.display = "none");
  }, this.addItem = (t, i, l = null) => {
    const h = { id: t, title: i };
    l && (h.image = l), this.items.push(h);
  }, this.removeItem = (t) => {
    const i = this.items.findIndex((l) => l.id === t);
    i !== -1 && this.items.splice(i, 1);
  }, this.findItemById = (t) => Array.from(this.panel.querySelectorAll("div")).find((i) => i.id === t), this.setId = (t) => this.panel.id = t, this.addEventListener = (t, i) => {
    typeof this.subscriptions[t] > "u" && (this.subscriptions[t] = []);
    const l = o.subscribe(t, (h) => {
      h.owner === this && i(h);
    });
    return this.subscriptions[t].push(l), l;
  }, this.removeEventListener = (t, i) => {
    this.subscriptions[t] && typeof this.subscriptions[t] < "u" && this.subscriptions[t].splice(this.subscriptions[t].indexOf(i), 1), o.unsubscribe(t, i);
  }, this.on = (t, i) => this.addEventListener(t, i), this.off = (t, i) => {
    this.removeEventListener(t, i);
  }, this.removeAllEventListeners = () => {
    for (let t in this.subscriptions)
      for (let i of this.subscriptions[t])
        o.unsubscribe(t, i);
    if (this.container && this.container.removeEventListener(this.event, this.listener), this.subscriptions = {}, !!this.panel)
      for (let t in this.listeners) {
        const [i, l] = t.split("_"), h = this.panel.querySelector("#" + l);
        h && h.removeEventListener(i, this.listeners[t]);
      }
  }, this.destroy = () => {
    this.removeAllEventListeners(), this.items = [], this.container = null;
    try {
      document.body.removeChild(this.panel);
    } catch {
    }
    this.panel && (this.panel.innerHTML = ""), this.panel = null, o.emit(c.DESTROY, this, { owner: this });
  };
}
const c = {
  CREATE: "create",
  DESTROY: "destroy",
  SHOW: "show"
};
function y() {
  this.menus = [], this.create = (n, s, e = "contextmenu", r = {}) => new m(n, s, e, r).init(), o.subscribe(c.CREATE, (n) => {
    this.menus.indexOf(n.target) === -1 && (this.menus.push(n.target), n.target.id = this.menus.length);
  }), o.subscribe(c.DESTROY, (n) => {
    this.menus.indexOf(n.target) !== -1 && this.menus.splice(this.menus.indexOf(n.target), 1);
  }), o.subscribe(c.SHOW, (n) => {
    this.menus.forEach((s) => {
      s !== n.target && s.hide();
    });
  }), document.addEventListener("mouseup", (n) => {
    n.button !== 2 && this.menus.forEach((s) => s.hide());
  });
}
const C = new y();
try {
  window.Menus = C;
} catch {
}
export {
  C as Menus
};
