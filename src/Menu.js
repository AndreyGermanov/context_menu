import StylesHelper from "./MenuStylesHelper.js";
import EventsManager from "./EventsManager.js";
import {createEvent} from "./functions.js";

export default function Menu(items,container,eventType=null) {
    this.panel = null;
    this.container = container;
    this.items = items;
    this.event = eventType || "contextmenu";

    this.cursorX = 0;
    this.cursorY = 0;

    this.maxImageHeight = 0;

    this.subscriptions = {};

    this.init = () => {
        Object.assign(this,new StylesHelper(this));
        this.drawItems();
        this.container.addEventListener(this.event, (event) => {
            event.preventDefault();
            event.stopPropagation();
            event.cancelBubble = true;
            this.cursorX = event.pageX;
            this.cursorY = event.pageY;
            this.show();
            return false;
        });
        document.addEventListener("mouseup", (event) => {
            if (event.button!==2) {
                this.hide();
            }
        })
        return this;
    }

    this.drawItems = () => {
        this.removeAllEventListeners();
        try {
            document.body.removeChild(this.panel);
        } catch (err) {}
        this.panel = document.createElement("div");
        for (let item of this.items) {
            const div = document.createElement("div");
            div.id = item.id;
            div.style.cursor = 'pointer';
            const span = document.createElement("span");
            span.innerHTML = item.title;
            div.appendChild(span);
            this.panel.appendChild(div);
            for (let name of ["click","mouseover","mouseout","dblclick","mousedown","mouseup","mousemove"]) {
                div.addEventListener(name,(event) => {
                    EventsManager.emit(name,this,createEvent(event,{
                        target:this,cursorX:this.cursorX,cursorY:this.cursorY,itemId:item.id
                    }))
                    setTimeout(() => {
                        if (["click","mousedown","mouseup","dblclick"].indexOf(name) !== -1) {
                            this.hide();
                        }
                    },1)
                })

            }
        }
        document.body.appendChild(this.panel);
        this.setStyles();
        this.drawImages();
        setTimeout(() => {
            this.adjustImagesWidth(this.maxImageHeight);
            this.setStyles();
            this.panel.style.display = 'none';
        },10);
    }

    this.drawImages = () => {
        const imgItems = this.items.filter(item => item.image && typeof(item.image)!== "undefined");
        this.maxImageHeight = 0;
        let listeners = {};
        for (let item of imgItems) {
            const img = new Image();
            const span = this.panel.querySelector("#"+item.id+" > span");
            img.style.display = 'none';
            img.src = item.image;
            listeners[item.id] = () => {
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

    this.adjustImagesWidth = (maxSize) => {
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
        this.panel.style.left = this.cursorX +"px";
        this.panel.style.top = this.cursorY+"px";
        this.panel.style.zIndex = "10000";
        this.panel.style.display = '';
        this.panel.style.position = 'absolute';
    }

    this.hide = () => {
        this.panel.style.display = 'none';
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
    }
}
