function c() {
  this.subscriptions = {}, this.subscribe = (n, t) => {
    if (typeof n == "string")
      return this.subscribeToEvent(n, t);
    if (typeof n == "object") {
      for (let e of n)
        this.subscribeToEvent(e, t);
      return t;
    }
    return null;
  }, this.subscribeToEvent = (n, t) => ((typeof this.subscriptions[n] > "u" || !this.subscriptions[n]) && (this.subscriptions[n] = []), typeof this.subscriptions[n].find((e) => e === t) < "u" ? null : (this.subscriptions[n].push(t), t)), this.emit = (n, t, e = null) => {
    if ((!e || typeof e != "object") && (e = {}), e.type = n, e.target = t, typeof this.subscriptions[n] < "u" && this.subscriptions[n] && this.subscriptions[n].length) {
      for (let s of this.subscriptions[n])
        s(e);
      return !0;
    }
    return !1;
  }, this.unsubscribe = (n, t) => {
    let e = !1;
    if (typeof n == "string")
      this.unsubscribeFromEvent(n, t) && (e = !0);
    else if (typeof n == "object")
      for (let s of n)
        this.unsubscribeFromEvent(s, t) && (e = !0);
    return e;
  }, this.unsubscribeFromEvent = (n, t) => {
    if (typeof this.subscriptions[n] > "u" || !this.subscriptions[n])
      return !1;
    const e = this.subscriptions[n].indexOf(t);
    return e !== -1 ? (this.subscriptions[n].splice(e, 1), !0) : !1;
  }, this.clear = () => {
    this.subscriptions = {};
  };
}
const h = new c();
function d(n) {
  this.menu = n, this.panelCssClass = "", this.itemCssClass = "", this.itemTextCssClass = "", this.itemImageCssClass = "", this.itemsCssClassesById = {}, this.setStyles = () => {
    if (!!this.menu.panel) {
      this.panelCssClass ? this.menu.panel.className = this.panelCssClass : (this.menu.panel.style.padding = "3px", this.menu.panel.style.borderStyle = "solid", this.menu.panel.style.borderColor = "#dddddd", this.menu.panel.style.borderWidth = "1px", this.menu.panel.style.backgroundColor = "#eeeeee", this.menu.panel.className = "");
      for (let t of this.menu.items)
        this.setItemStyles(t);
    }
  }, this.setItemStyles = (t) => {
    this.setItemDivStyles(t), this.setItemSpanStyles(t), this.setItemImageStyles(t);
  }, this.setItemDivStyles = (t) => {
    const e = this.menu.panel.querySelector("#" + t.id);
    !e || (e.style.display = "flex", e.style.flexDirection = "row", e.style.alignItems = "center", this.itemsCssClassesById[t.id] && typeof this.itemsCssClassesById[t.id] == "object" && this.itemsCssClassesById[t.id][o.ITEM] ? e.className = this.itemsCssClassesById[t.id][o.ITEM] : this.itemCssClass ? e.className = this.itemCssClass || "" : (e.className = "", e.style.paddingTop = "2px", e.style.paddingLeft = "3px", e.style.paddingRight = "3px", e.addEventListener("mouseover", () => {
      e.style.backgroundColor = "#0066CC", e.style.color = "white";
    }), e.addEventListener("mouseout", () => {
      e.style.backgroundColor = "transparent", e.style.color = "black";
    })), e.style.whiteSpace = "nowrap");
  }, this.setItemSpanStyles = (t) => {
    const e = this.menu.panel.querySelector("#" + t.id);
    if (!e)
      return;
    const s = e.querySelector("span");
    s && (this.itemsCssClassesById[t.id] && typeof this.itemsCssClassesById[t.id] == "object" && this.itemsCssClassesById[t.id][o.TEXT] ? s.className = this.itemsCssClassesById[t.id][o.TEXT] : this.itemTextCssClass ? s.className = this.itemTextCssClass : (s.className = "", s.style.color = "black"));
  }, this.setItemImageStyles = (t) => {
    const e = this.menu.panel.querySelector("#" + t.id);
    if (!e)
      return;
    const s = e.querySelector("img");
    s && (this.itemsCssClassesById[t.id] && typeof this.itemsCssClassesById[t.id] == "object" && this.itemsCssClassesById[t.id][o.IMAGE] ? s.className = this.itemsCssClassesById[t.id][o.IMAGE] : this.itemImageCssClass ? s.className = this.itemImageCssClass : s.className = "");
  }, this.setPanelClass = (t = null) => {
    this.panelCssClass = t || "";
  }, this.setItemClass = (t = null, e = null) => {
    if (e) {
      this.setClassForItem(e, o.ITEM, t);
      return;
    }
    this.itemCssClass = t || "";
  }, this.setTextClass = (t = null, e = null) => {
    if (e) {
      this.setClassForItem(e, o.TEXT, t);
      return;
    }
    this.itemTextCssClass = t || "";
  }, this.setImageClass = (t = null, e = null) => {
    if (e) {
      this.setClassForItem(e, o.IMAGE, t);
      return;
    }
    this.itemImageCssClass = t || "";
  }, this.setClassForItem = (t, e, s) => {
    (!this.itemsCssClassesById[t] || typeof this.itemsCssClassesById[t] > "u") && (this.itemsCssClassesById[t] = {}), this.itemsCssClassesById[t][e] = s;
  };
}
const o = {
  ITEM: "div",
  TEXT: "text",
  IMAGE: "image"
}, p = (n, t = {}) => {
  const e = {};
  for (let s in n)
    s !== "type" && s !== "target" && (e[s] = n[s]);
  return Object.keys(t).forEach((s) => {
    e[s] = t[s];
  }), e;
};
function f(n, t, e = null) {
  this.panel = null, this.container = t, this.items = n, this.event = e || "contextmenu", this.listeners = {}, this.origEvent = null, this.cursorX = 0, this.cursorY = 0, this.overflowY = "", this.maxImageHeight = 0, this.subscriptions = {}, this.init = () => (Object.assign(this, new d(this)), this.container.addEventListener(this.event, (s) => (this.onEvent(s), !1)), h.emit(a.CREATE, this, { owner: this }), this), this.onEvent = (s) => {
    this.origEvent = s, s.preventDefault(), s.stopPropagation(), s.cancelBubble = !0, this.cursorX = s.pageX, this.cursorY = s.pageY, this.show();
  }, this.drawMenu = () => {
    try {
      document.body.removeChild(this.panel);
    } catch {
    }
    this.panel = document.createElement("div"), document.body.appendChild(this.panel);
    for (let s of this.items) {
      if (this.panel.querySelector("#" + s.id))
        continue;
      const i = document.createElement("div");
      i.id = s.id, i.style.cursor = "pointer";
      const l = document.createElement("span");
      l.innerHTML = s.title, i.appendChild(l), this.panel.appendChild(i);
    }
    this.setStyles(), this.drawImages(), this.setStyles(), this.setItemsEventListeners(), this.panel.style.display = "none";
  }, this.drawImages = () => {
    if (!this.panel)
      return;
    const s = this.items.filter((i) => i.image && typeof i.image < "u");
    this.maxImageHeight = 0;
    for (let i of s) {
      const l = new Image();
      if (!this.panel)
        continue;
      const r = this.panel.querySelector("#" + i.id + " > span");
      if (l.style.display = "none", l.src = i.image, !this.panel)
        return;
      const u = document.createElement("div");
      u.style.marginRight = "5px", u.style.display = "flex", u.style.flexDirection = "row", u.style.justifyContent = "center", u.style.alignItems = "center", l.height = this.panel.querySelector("#" + i.id).clientHeight, l.height > this.maxImageHeight && (this.maxImageHeight = l.height), l.style.verticalAlign = "middle", l.style.display = "", u.appendChild(l), this.panel.querySelector("#" + i.id + " div") || this.panel.querySelector("#" + i.id).insertBefore(u, r);
    }
    this.adjustImagesWidth();
  }, this.setItemsEventListeners = () => {
    for (let s of ["click", "mouseover", "mouseout", "dblclick", "mousedown", "mouseup", "mousemove"])
      this.setListenersForMouseEvent(s);
  }, this.setListenersForMouseEvent = (s) => {
    for (let i of this.items)
      this.setListenerForItem(s, i);
  }, this.setListenerForItem = (s, i) => {
    const l = (r) => {
      !this.origEvent || (h.emit(s, this.origEvent.target, p(r, {
        container: this.container,
        owner: this,
        cursorX: this.cursorX,
        cursorY: this.cursorY,
        itemId: i.id
      })), setTimeout(() => {
        ["click", "mousedown", "mouseup", "dblclick"].indexOf(s) !== -1 && r.button !== 2 && this.hide();
      }, 100));
    };
    this.listeners[s + "_" + i.id] = l, this.panel.querySelector("#" + i.id).addEventListener(s, l);
  }, this.adjustImagesWidth = () => {
    if (!this.panel)
      return;
    let s = 0;
    for (let i of this.items)
      this.panel.querySelector("#" + i.id).clientHeight > s && (s = this.panel.querySelector("#" + i.id).clientHeight);
    for (let i of this.panel.querySelectorAll("img"))
      i.parentNode.style.width = s + "px", i.parentNode.style.height = s + "px";
  }, this.show = () => {
    if (!this.container || (h.emit(a.SHOW, this, { owner: this }), this.drawMenu(), !this.panel))
      return;
    this.panel.style.display = "";
    let s = this.cursorX, i = this.cursorY;
    this.panel.style.left = s + "px", this.panel.style.top = i + "px", this.panel.style.zIndex = "10000", this.panel.style.position = "absolute", s + this.panel.clientWidth > window.innerWidth && (s = window.innerWidth - this.panel.clientWidth - 10, this.panel.style.left = s + "px"), this.origEvent && this.origEvent.clientY + this.panel.clientHeight > window.innerHeight && (i = i - (window.innerHeight + this.panel.clientHeight - 20) + this.origEvent.clientY, this.panel.style.top = i + "px");
  }, this.hide = () => {
    this.panel && (this.panel.style.display = "none");
  }, this.addItem = (s, i, l = null) => {
    const r = { id: s, title: i };
    l && (r.image = l), this.items.push(r);
  }, this.removeItem = (s) => {
    const i = this.items.findIndex((l) => l.id === s);
    i !== -1 && this.items.splice(i, 1);
  }, this.findItemById = (s) => Array.from(this.panel.querySelectorAll("div")).find((i) => i.id === s), this.setId = (s) => this.panel.id = s, this.addEventListener = (s, i) => {
    typeof this.subscriptions[s] > "u" && (this.subscriptions[s] = []);
    const l = h.subscribe(s, (r) => {
      r.owner === this && i(r);
    });
    return this.subscriptions[s].push(l), l;
  }, this.removeEventListener = (s, i) => {
    this.subscriptions[s] && typeof this.subscriptions[s] < "u" && this.subscriptions[s].splice(this.subscriptions[s].indexOf(i), 1), h.unsubscribe(s, i);
  }, this.on = (s, i) => this.addEventListener(s, i), this.off = (s, i) => {
    this.removeEventListener(s, i);
  }, this.removeAllEventListeners = () => {
    for (let s in this.subscriptions)
      for (let i of this.subscriptions[s])
        h.unsubscribe(s, i);
    if (this.subscriptions = {}, !!this.panel)
      for (let s in this.listeners) {
        const [i, l] = s.split("_"), r = this.panel.querySelector("#" + l);
        r && r.removeEventListener(i, this.listeners[s]);
      }
  }, this.destroy = () => {
    this.removeAllEventListeners(), this.items = [], this.container = null;
    try {
      document.body.removeChild(this.panel);
    } catch {
    }
    this.panel && (this.panel.innerHTML = ""), this.panel = null, h.emit(a.DESTROY, this, { owner: this });
  };
}
const a = {
  CREATE: "create",
  DESTROY: "destroy",
  SHOW: "show"
};
function m() {
  this.menus = [], this.create = (n, t, e) => new f(n, t, e).init(), h.subscribe(a.CREATE, (n) => {
    this.menus.indexOf(n.target) === -1 && (this.menus.push(n.target), n.target.id = this.menus.length);
  }), h.subscribe(a.DESTROY, (n) => {
    this.menus.indexOf(n.target) !== -1 && this.menus.splice(this.menus.indexOf(n.target), 1);
  }), h.subscribe(a.SHOW, (n) => {
    this.menus.forEach((t) => {
      t !== n.target && t.hide();
    });
  }), document.addEventListener("mouseup", (n) => {
    n.button !== 2 && this.menus.forEach((t) => t.hide());
  });
}
const y = new m();
try {
  window.Menus = y;
} catch {
}
export {
  y as Menus
};
