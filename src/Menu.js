import StylesHelper from "./MenuStylesHelper.js";
import EventsManager from "./EventsManager.js";
import {createEvent} from "./functions.js";

export default function Menu(items,container,eventType=null) {
    this.panel = null;
    this.container = container;
    this.items = items;
    this.event = eventType || "contextmenu";
    this.listeners = {};
    this.origEvent = null;
    this.cursorX = 0;
    this.cursorY = 0;

    this.maxImageHeight = 0;

    this.subscriptions = {};

    this.init = () => {
        Object.assign(this,new StylesHelper(this));
        this.drawItems();
        this.container.addEventListener(this.event, (event) => {
            this.onEvent(event);
            return false;
        });
        document.addEventListener("mouseup", (event) => {
            if (event.button!==2) {
                this.hide();
            }
        })
        return this;
    }

    this.onEvent = (event) => {
        this.origEvent = event;
        event.preventDefault();
        event.stopPropagation();
        event.cancelBubble = true;
        this.cursorX = event.pageX;
        this.cursorY = event.pageY;
        this.show();
    }

    this.drawItems = () => {
        this.removeAllEventListeners();
        try {
            document.body.removeChild(this.panel);
        } catch (err) {}
        this.panel = document.createElement("div");
        this.panel.style.visibility = 'hidden';
        const overflowY = document.body.style.overflowY;
        document.body.style.overflowY = 'clip';
        for (let item of this.items) {
            const div = document.createElement("div");
            div.id = item.id;
            div.style.cursor = 'pointer';
            const span = document.createElement("span");
            span.innerHTML = item.title;
            div.appendChild(span);
            this.panel.appendChild(div);
        }
        document.body.appendChild(this.panel);
        this.setStyles();
        this.drawImages();
        this.setItemsEventListeners();
        setTimeout(() => {
            this.adjustImagesWidth(this.maxImageHeight);
            this.setStyles();
            if (this.panel) {
                this.panel.style.display = 'none';
                this.panel.style.visibility = 'visible';
                document.body.style.overflowY = overflowY;
            }
        },100);
    }

    this.drawImages = () => {
        if (!this.panel) {
            return
        }
        const imgItems = this.items.filter(item => item.image && typeof(item.image)!== "undefined");
        this.maxImageHeight = 0;
        let listeners = {};
        for (let item of imgItems) {
            const img = new Image();
            const span = this.panel.querySelector("#"+item.id+" > span");
            img.style.display = 'none';
            img.src = item.image;
            listeners[item.id] = () => {
                if (!this.panel) {
                    return
                }
                img.height = this.panel.querySelector("#" + item.id).clientHeight;
                if (img.height > this.maxImageHeight) {
                    this.maxImageHeight = img.height;
                }
                img.style.verticalAlign = "middle";
                img.style.marginRight = "5px";
                img.style.display = '';
                img.removeEventListener("load", listeners[item.id]);
            }
            img.addEventListener("load",listeners[item.id]);
            this.panel.querySelector("#"+item.id).insertBefore(img,span);
        }
    }

    this.setItemsEventListeners = () => {
        for (let name of ["click","mouseover","mouseout","dblclick","mousedown","mouseup","mousemove"]) {
            for (let item of this.items) {
                this.listeners[name+"_"+item.id] = (event) => {
                    EventsManager.emit(name, this, createEvent(event, {
                        container: this.container, cursorX: this.cursorX, cursorY: this.cursorY, itemId: item.id
                    }))
                    setTimeout(() => {
                        if (["click", "mousedown", "mouseup", "dblclick"].indexOf(name) !== -1) {
                            this.hide();
                        }
                    }, 100)
                };
                this.panel.querySelector("#"+item.id).addEventListener(name, this.listeners[name+"_"+item.id])
            }
        }
    }
    this.adjustImagesWidth = (maxSize) => {
        if (!this.panel) {
            return
        }
        for (let img of this.panel.querySelectorAll("img")) {
            const canvas = document.createElement("canvas");
            canvas.width = maxSize;
            canvas.height = maxSize;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img,Math.round(maxSize/2-img.width/2),0,img.width,img.height);
            img.src = canvas.toDataURL();
        }
    }

    this.show = () => {
        if (!this.panel) {
            return
        }
        let left = this.cursorX;
        let top = this.cursorY;
        this.panel.style.left = left +"px";
        this.panel.style.top = top+"px";
        this.panel.style.zIndex = "10000";
        this.panel.style.display = '';
        this.panel.style.position = 'absolute';
        if (left+this.panel.clientWidth > window.innerWidth) {
            left = window.innerWidth - this.panel.clientWidth - 10;
            this.panel.style.left = left +"px";
        }
        if (this.origEvent.clientY+this.panel.clientHeight > window.innerHeight) {
            top = top - (window.innerHeight + this.panel.clientHeight-20) + this.origEvent.clientY;
            this.panel.style.top = top +"px";
        }
    }

    this.hide = () => {
        if (this.panel) {
            this.panel.style.display = 'none';
        }
    }

    this.addItem = (id,title,image=null) => {
        const item = {id,title};
        if (image) {
            item.image = image;
        }
        this.items.push(item);
        this.drawItems();
    }

    this.removeItem = (id) => {
        this.items.splice(this.items.findIndex(item => item.id === id),1);
        this.drawItems();
    }

    this.findItemById = (id) => Array.from(this.panel.querySelectorAll("div")).find(item => item.id === id);

    this.setId = (id) => this.panel.id = id;

    /**
     * @ignore
     * Uniform method that used to add event handler of specified type to this object.
     * @param eventName {string} Name of event
     * @param handler {function} Function that used as an event handler
     * @returns {function} Pointer to added event handler. Should be used to remove event listener later.
     */
    this.addEventListener = (eventName,handler) => {
        if (typeof(this.subscriptions[eventName]) === "undefined") {
            this.subscriptions[eventName] = [];
        }
        const listener = EventsManager.subscribe(eventName, (event) => {
            if (event.target === this) {
                handler(event)
            }
        });
        this.subscriptions[eventName].push(listener);
        return listener;
    }

    /**
     * @ignore
     * Uniform method that used to remove event handler, that previously added
     * to this object.
     * @param eventName {string} Name of event to remove listener from
     * @param listener {function} Pointer to event listener, that added previously.
     * It was returned from [addEventListener](#ResizeBox+addEventListener) method.
     */
    this.removeEventListener = (eventName,listener) => {
        if (this.subscriptions[eventName] && typeof(this.subscriptions[eventName]) !== "undefined") {
            this.subscriptions[eventName].splice(this.subscriptions[eventName].indexOf(listener), 1);
        }
        EventsManager.unsubscribe(eventName,listener)
    }

    this.on = (eventName,handler) => {
        this.addEventListener(eventName, handler)
    }

    this.off = (eventName,handler) => {
        this.removeEventListener(eventName, handler);
    }

    this.removeAllEventListeners = () => {
        for (let eventName in this.subscriptions) {
            for (let handler of this.subscriptions[eventName]) {
                EventsManager.unsubscribe(eventName,handler);
            }
        }
        this.subscriptions = {};
        if (!this.panel) {
            return
        }
        for (let listener in this.listeners) {
            const [name,id] = listener.split("_");
            const div = this.panel.querySelector("#"+id);
            if (div) {
                div.removeEventListener(name, this.listeners[listener]);
            }
        }
    }

    this.destroy = () => {
        this.removeAllEventListeners();
        this.items = [];
        this.container = null;
        try {
            document.body.removeChild(this.panel);
        } catch (err) {}
        if (this.panel) {
            this.panel.innerHTML = "";
        }
        this.panel = null;
    }
}
