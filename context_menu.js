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
    !e || (this.itemsCssClassesById[t.id] && typeof this.itemsCssClassesById[t.id] == "object" && this.itemsCssClassesById[t.id][h.ITEM] ? e.className = this.itemsCssClassesById[t.id][h.ITEM] : this.itemCssClass ? e.className = this.itemCssClass || "" : (e.className = "", e.style.display = "flex", e.style.flexDirection = "row", e.style.alignItems = "center", e.style.paddingTop = "2px", e.style.paddingLeft = "3px", e.style.paddingRight = "3px", e.addEventListener("mouseover", () => {
      e.style.backgroundColor = "#0066CC", e.style.color = "white";
    }), e.addEventListener("mouseout", () => {
      e.style.backgroundColor = "transparent", e.style.color = "black";
    })), e.style.whiteSpace = "nowrap");
  }, this.setItemSpanStyles = (t) => {
    const e = this.menu.panel.querySelector("#" + t.id);
    if (!e)
      return;
    const s = e.querySelector("span");
    s && (this.itemsCssClassesById[t.id] && typeof this.itemsCssClassesById[t.id] == "object" && this.itemsCssClassesById[t.id][h.TEXT] ? s.className = this.itemsCssClassesById[t.id][h.TEXT] : this.itemTextCssClass ? s.className = this.itemTextCssClass : (s.className = "", s.style.color = "black"));
  }, this.setItemImageStyles = (t) => {
    const e = this.menu.panel.querySelector("#" + t.id);
    if (!e)
      return;
    const s = e.querySelector("img");
    s && (this.itemsCssClassesById[t.id] && typeof this.itemsCssClassesById[t.id] == "object" && this.itemsCssClassesById[t.id][h.IMAGE] ? s.className = this.itemsCssClassesById[t.id][h.IMAGE] : this.itemImageCssClass ? s.className = this.itemImageCssClass : s.className = "");
  }, this.setPanelClass = (t = null) => {
    this.panelCssClass = t || "", this.menu.drawMenu();
  }, this.setItemClass = (t = null, e = null) => {
    if (e) {
      this.setClassForItem(e, h.ITEM, t), this.menu.drawMenu();
      return;
    }
    this.itemCssClass = t || "", this.menu.drawMenu();
  }, this.setTextClass = (t = null, e = null) => {
    if (e) {
      this.setClassForItem(e, h.TEXT, t), this.menu.drawMenu();
      return;
    }
    this.itemTextCssClass = t || "", this.menu.drawMenu();
  }, this.setImageClass = (t = null, e = null) => {
    if (e) {
      this.setClassForItem(e, h.IMAGE, t), this.menu.drawMenu();
      return;
    }
    this.itemImageCssClass = t || "", this.menu.drawMenu();
  }, this.setClassForItem = (t, e, s) => {
    (!this.itemsCssClassesById[t] || typeof this.itemsCssClassesById[t] > "u") && (this.itemsCssClassesById[t] = {}), this.itemsCssClassesById[t][e] = s;
  };
}
const h = {
  ITEM: "div",
  TEXT: "text",
  IMAGE: "image"
};
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
const o = new c(), p = (n, t = {}) => {
  const e = {};
  for (let s in n)
    s !== "type" && s !== "target" && (e[s] = n[s]);
  return Object.keys(t).forEach((s) => {
    e[s] = t[s];
  }), e;
}, m = (n) => new Promise((t) => {
  const e = new FileReader();
  e.onload = function(s) {
    t(s.target.result);
  }, e.readAsDataURL(n);
});
function f(n, t, e = null) {
  this.panel = null, this.container = t, this.items = n, this.event = e || "contextmenu", this.listeners = {}, this.origEvent = null, this.cursorX = 0, this.cursorY = 0, this.overflowY = "", this.maxImageHeight = 0, this.subscriptions = {}, this.init = () => (Object.assign(this, new d(this)), this.container.addEventListener(this.event, (s) => (this.onEvent(s), !1)), document.addEventListener("mouseup", (s) => {
    s.button !== 2 && this.hide();
  }), this), this.onEvent = (s) => {
    this.origEvent = s, s.preventDefault(), s.stopPropagation(), s.cancelBubble = !0, this.cursorX = s.pageX, this.cursorY = s.pageY, this.show();
  }, this.drawMenu = () => new Promise(async (s) => {
    try {
      document.body.removeChild(this.panel);
    } catch {
    }
    this.panel = document.createElement("div"), this.panel.style.visibility = "hidden", !this.overflowY && document.body.style.overflowY !== "clip" && (this.overflowY = document.body.style.overflowY), document.body.style.overflowY = "clip", document.body.appendChild(this.panel);
    for (let i of this.items) {
      if (this.panel.querySelector("#" + i.id))
        continue;
      const l = document.createElement("div");
      l.id = i.id, l.style.cursor = "pointer";
      const r = document.createElement("span");
      r.innerHTML = i.title, l.appendChild(r), this.panel.appendChild(l);
    }
    this.setStyles(), await this.drawImages(), setTimeout(() => {
      this.setItemsEventListeners(), this.adjustImagesWidth(this.maxImageHeight), this.setStyles(), this.panel && (this.panel.style.display = "none", this.panel.style.visibility = "visible", document.body.style.overflowY = this.overflowY, s());
    }, 100);
  }), this.drawImages = async () => {
    if (!this.panel)
      return;
    const s = this.items.filter((l) => l.image && typeof l.image < "u");
    this.maxImageHeight = 0;
    let i = {};
    for (let l of s) {
      const r = new Image(), a = this.panel.querySelector("#" + l.id + " > span");
      r.style.display = "none";
      const u = await m(await (await fetch(l.image)).blob());
      r.src = u, i[l.id] = () => {
        !this.panel || (r.height = this.panel.querySelector("#" + l.id).clientHeight, r.height > this.maxImageHeight && (this.maxImageHeight = r.height), r.style.verticalAlign = "middle", r.style.marginRight = "5px", r.style.display = "", r.removeEventListener("load", i[l.id]));
      }, r.addEventListener("load", i[l.id]);
      try {
        this.panel.querySelector("#" + l.id + " img") || this.panel.querySelector("#" + l.id).insertBefore(r, a);
      } catch {
      }
    }
  }, this.setItemsEventListeners = () => {
    for (let s of ["click", "mouseover", "mouseout", "dblclick", "mousedown", "mouseup", "mousemove"])
      for (let i of this.items)
        this.listeners[s + "_" + i.id] = (l) => {
          !this.origEvent || (o.emit(s, this.origEvent.target, p(l, {
            container: this.container,
            owner: this,
            cursorX: this.cursorX,
            cursorY: this.cursorY,
            itemId: i.id
          })), setTimeout(() => {
            ["click", "mousedown", "mouseup", "dblclick"].indexOf(s) !== -1 && this.hide();
          }, 100));
        }, this.panel.querySelector("#" + i.id).addEventListener(s, this.listeners[s + "_" + i.id]);
  }, this.adjustImagesWidth = (s) => {
    if (!!this.panel)
      for (let i of this.panel.querySelectorAll("img")) {
        const l = document.createElement("canvas");
        l.width = s, l.height = s, l.getContext("2d").drawImage(i, Math.round(s / 2 - i.width / 2), 0, i.width, i.height), i.src = l.toDataURL();
      }
  }, this.show = async () => {
    if (await this.drawMenu(), !this.panel)
      return;
    let s = this.cursorX, i = this.cursorY;
    this.panel.style.left = s + "px", this.panel.style.top = i + "px", this.panel.style.zIndex = "10000", this.panel.style.display = "", this.panel.style.visibility = "visible", this.panel.style.position = "absolute", s + this.panel.clientWidth > window.innerWidth && (s = window.innerWidth - this.panel.clientWidth - 10, this.panel.style.left = s + "px"), this.origEvent && this.origEvent.clientY + this.panel.clientHeight > window.innerHeight && (i = i - (window.innerHeight + this.panel.clientHeight - 20) + this.origEvent.clientY, this.panel.style.top = i + "px");
  }, this.hide = () => {
    this.panel && (this.panel.style.display = "none");
  }, this.addItem = (s, i, l = null) => {
    const r = { id: s, title: i };
    l && (r.image = l), this.items.push(r), this.drawMenu();
  }, this.removeItem = (s) => {
    this.items.splice(this.items.findIndex((i) => i.id === s), 1), this.drawMenu();
  }, this.findItemById = (s) => Array.from(this.panel.querySelectorAll("div")).find((i) => i.id === s), this.setId = (s) => this.panel.id = s, this.addEventListener = (s, i) => {
    typeof this.subscriptions[s] > "u" && (this.subscriptions[s] = []);
    const l = o.subscribe(s, (r) => {
      r.owner === this && i(r);
    });
    return this.subscriptions[s].push(l), l;
  }, this.removeEventListener = (s, i) => {
    this.subscriptions[s] && typeof this.subscriptions[s] < "u" && this.subscriptions[s].splice(this.subscriptions[s].indexOf(i), 1), o.unsubscribe(s, i);
  }, this.on = (s, i) => this.addEventListener(s, i), this.off = (s, i) => {
    this.removeEventListener(s, i);
  }, this.removeAllEventListeners = () => {
    for (let s in this.subscriptions)
      for (let i of this.subscriptions[s])
        o.unsubscribe(s, i);
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
    this.panel && (this.panel.innerHTML = ""), this.panel = null;
  };
}
function y() {
  this.create = (n, t, e) => new f(n, t, e).init();
}
const b = new y();
try {
  window.Menus = b;
} catch {
}
export {
  b as Menus
};
