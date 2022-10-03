export default function Menu(items,container,eventName=null) {
    this.panel = null;
    this.container = container;
    this.items = items;
    this.eventName = eventName || "contextmenu";

    this.cursorX = 0;
    this.cursorY = 0;

    this.maxImageHeight = 0;

    this.init = () => {
        this.panel = document.createElement("div");
        this.drawItems();
        this.container.addEventListener(this.eventName, (event) => {
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
        document.body.appendChild(this.panel);
        return this;
    }

    this.drawItems = () => {
        this.panel.innerHTML = "";
        for (let item of this.items) {
            const div = document.createElement("div");
            div.id = item.id;
            div.style.cursor = 'pointer';
            const span = document.createElement("span");
            span.innerHTML = item.title;
            div.appendChild(span);
            this.panel.appendChild(div);
        }
        this.drawImages();
        setTimeout(() => {
            this.adjustImagesWidth(this.maxImageHeight);
            this.panel.style.display = 'none';
        },100);
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
}
