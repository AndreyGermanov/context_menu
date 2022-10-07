import StylesHelper from "./MenuStylesHelper.js";
import EventsManager from "./EventsManager.js";
import {blobToDataURL, createEvent} from "./functions.js";

/**
 * Context menu panel object.
 * @param items {array} Array of menu items. Each item is an object with a following fields:
 * `id` - unique ID of menu item.
 * `title` - Text of menu of item
 * `image` - URL of image, displayed on the left side of menu item (optional)
 * @param container {HTMLElement} HTML element to which this menu belongs
 * @param eventType {string} Name of event on HTML element that triggers the menu to appear
 * (by default `contextmenu`, triggers when user do right mouse click on element)
 * @constructor
 */
function Menu(items,container,eventType=null) {
    /**
     * Menu panel element
     * @type {HTMLDivElement}
     */
    this.panel = null;

    /**
     * Event on HTML element that triggers the menu to appear
     * @type {HTMLElement}
     */
    this.container = container;

    /**
     * Array of menu items. Each item is an object with a following fields:
     * `id` - unique ID of menu item.
     * `title` - Text of menu of item
     * `image` - URL of image, displayed on the left side of menu item (optional)
     * @type {Array}
     */
    this.items = items;

    /**
     * Name of event on HTML element that triggers the menu to appear
     * (by default `contextmenu`, triggers when user do right mouse click on element)
     * @type {string}
     */
    this.event = eventType || "contextmenu";

    /**
     * @ignore
     * All registered listeners of mouse events on menu items HTML elements.
     * keys of object are event types (like 'click', 'mouseover', 'mouseout')
     * values of object are arrays of functions. Each function is one of event listeners,
     * registered for this event
     * @type {array}
     */
    this.listeners = {};

    /**
     * @ignore
     * Original event object which triggered on `container` element when menu appeared
     * @type {Event}
     */
    this.origEvent = null;

    /**
     * Mouse cursor X position in a moment when event to show menu triggered
     * @type {number}
     */
    this.cursorX = 0;

    /**
     * Mouse cursor Y position in a moment when event to show menu triggered
     * @type {number}
     */
    this.cursorY = 0;

    /**
     * @ignore
     * Temporary value of body overflowY style before menu appeared.
     * Used for internal reasons.
     * @type {string}
     */
    this.overflowY = "";

    /**
     * @ignore
     * The maximum height of all images of menu items. Used to
     * calculate correct width for image of items
     * @type {number}
     */
    this.maxImageHeight = 0;

    /**
     * @ignore
     * List of subscribers, that subscribed to events, emitted by
     * this menu. This is an object, that consists of array
     * of event handlers of each event. Each handler is a function
     * that called when event of specified type emitted by
     * this shape
     * @type {object}
     */
    this.subscriptions = {};

    /**
     * Method constructs and initializes menu, based on
     * settings, provided in constructor
     * @returns {Menu} this menu object
     */
    this.init = () => {
        Object.assign(this,new StylesHelper(this));
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

    /**
     * @ignore
     * Method executed when event that should show menu triggers on `container` element
     * @param event {Event} Event object
     */
    this.onEvent = (event) => {
        this.origEvent = event;
        event.preventDefault();
        event.stopPropagation();
        event.cancelBubble = true;
        this.cursorX = event.pageX;
        this.cursorY = event.pageY;
        this.show();
    }

    /**
     * @ignore
     * Method used to construct menu HTML element with it items
     */
    this.drawMenu = () => {
        return new Promise(async(resolve) => {
            try {
                document.body.removeChild(this.panel);
            } catch (err) {}
            this.panel = document.createElement("div");
            this.panel.style.visibility = 'hidden';
            if (!this.overflowY && document.body.style.overflowY !== "clip") {
                this.overflowY = document.body.style.overflowY;
            }
            document.body.style.overflowY = 'clip';
            document.body.appendChild(this.panel);
            for (let item of this.items) {
                if (this.panel.querySelector("#"+item.id)) {
                    continue;
                }
                const div = document.createElement("div");
                div.id = item.id;
                div.style.cursor = 'pointer';
                const span = document.createElement("span");
                span.innerHTML = item.title;
                div.appendChild(span);
                this.panel.appendChild(div);
            }
            this.setStyles();
            await this.drawImages();
            setTimeout(() => {
                this.setItemsEventListeners();
                this.adjustImagesWidth(this.maxImageHeight);
                this.setStyles();
                if (this.panel) {
                    this.panel.style.display = 'none';
                    this.panel.style.visibility = 'visible';
                    document.body.style.overflowY = this.overflowY;
                    resolve()
                }
            },100)
        })
    }

    /**
     * @ignore
     * Method used to inject images to menu items
     * while constructing them
     */
    this.drawImages = async() => {
        if (!this.panel) {
            return
        }
        const imgItems = this.items.filter(item => item.image && typeof(item.image)!== "undefined");
        this.maxImageHeight = 0;
        let listeners = {};
        for (let item of imgItems) {
            const img = new Image();
            if (!this.panel) {
                continue;
            }
            const span = this.panel.querySelector("#"+item.id+" > span");
            img.style.display = 'none';
            const url = await blobToDataURL(await (await fetch(item.image)).blob());
            img.src = url;
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
            try {
                if (!this.panel.querySelector("#"+item.id+" img")) {
                    this.panel.querySelector("#" + item.id).insertBefore(img, span);
                }
            } catch (err) {}
        }
    }

    /**
     * @ignore
     * Method used to set up event listening functions for all menu items.
     * It forwards these events to all `subscribers`, connected to the menu object
     */
    this.setItemsEventListeners = () => {
        for (let name of ["click","mouseover","mouseout","dblclick","mousedown","mouseup","mousemove"]) {
            for (let item of this.items) {
                this.listeners[name+"_"+item.id] = (event) => {
                    if (!this.origEvent) {
                        return
                    }
                    EventsManager.emit(name, this.origEvent.target, createEvent(event, {
                        container: this.container, owner:this, cursorX: this.cursorX, cursorY: this.cursorY, itemId: item.id
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

    /**
     * @ignore
     * Internal method that used to adjust image size to match size of menu item text
     * and correct width to respect aspect ratio and align all items correctly
     * @param maxSize {number} Maximum width or height of image
     */
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

    /**
     * Method shows menu
     */
    this.show = async() => {
        await this.drawMenu();
        if (!this.panel) {
            return
        }
        let left = this.cursorX;
        let top = this.cursorY;
        this.panel.style.left = left +"px";
        this.panel.style.top = top+"px";
        this.panel.style.zIndex = "10000";
        this.panel.style.display = '';
        this.panel.style.visibility = 'visible';
        this.panel.style.position = 'absolute';
        if (left+this.panel.clientWidth > window.innerWidth) {
            left = window.innerWidth - this.panel.clientWidth - 10;
            this.panel.style.left = left +"px";
        }
        if (this.origEvent && this.origEvent.clientY+this.panel.clientHeight > window.innerHeight) {
            top = top - (window.innerHeight + this.panel.clientHeight-20) + this.origEvent.clientY;
            this.panel.style.top = top +"px";
        }
    }

    /**
     * Method hides menu
     */
    this.hide = () => {
        if (this.panel) {
            this.panel.style.display = 'none';
        }
    }

    /**
     * Method used to dynamically add item to menu
     * @param id {string} Unique ID of item
     * @param title {string} Text of menu item
     * @param image {string} URL of menu item image (optional)
     */
    this.addItem = (id,title,image=null) => {
        const item = {id,title};
        if (image) {
            item.image = image;
        }
        this.items.push(item);
        this.drawMenu();
    }

    /**
     * Method used to remove menu item
     * @param id {string} ID of item to remove
     */
    this.removeItem = (id) => {
        this.items.splice(this.items.findIndex(item => item.id === id),1);
        this.drawMenu();
    }

    /**
     * Method used to return HTML node of menu item by ID
     * @param id {string} ID of menu item
     * @returns {HTMLDivElement} DIV html element of menu item
     */
    this.findItemById = (id) => Array.from(this.panel.querySelectorAll("div")).find(item => item.id === id);

    /**
     * Method used to set unique ID of this menu panel.
     * @param id {string} ID to set
     */
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
            if (event.owner === this) {
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

    /**
     * Method used to subscribe to menu item event.
     * @param eventName {string} Name of event to subscribe (click, mouseover, mouseout or other)
     * @param handler {function} Handler function that will execute on event. Function receives `event` argument
     * which is a standard MouseEvent with all properties and in addition, contains the following important fields:
     * `itemId` - ID of menu item that triggered this event, `cursorX` - X position of mouse cursor on container in a
     * moment the menu appeared, `cursorY` - Y position of mouse cursor on container in a moment the menu appeared.
     * @returns {function} Returns a created listener object which can be used later to unsubscribe from this event
     */
    this.on = (eventName,handler) => {
        return this.addEventListener(eventName, handler)
    }

    /**
     * Method used to unsubscribe from menu item event
     * @param eventName {string} name of event to unsubscribe, (click, mouseover, mouseout or other)
     * @param handler {function} event handler to remove from subscriptions, that previously returned by `on` function
     */
    this.off = (eventName,handler) => {
        this.removeEventListener(eventName, handler);
    }

    /**
     * Method used to unsubscribe from all events, previously subscribed using `on` or `addEventListener`
     * methods
     */
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

    /**
     * Method used to destroy menu: removes all subscriptions
     * and menu panel element from DOM.
     */
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

export default Menu;
