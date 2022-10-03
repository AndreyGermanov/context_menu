export default function Menu(items,container,eventName=null) {
    this.panel = null;
    this.container = container;
    this.items = items;
    this.eventName = eventName || "contextmenu";

    this.cursorX = 0;
    this.cursorY = 0;
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
        this.items.forEach((item) => {
            const div = document.createElement("div");
            div.id = item.id;
            div.style.cursor = 'pointer';
            const span = document.createElement("span");
            span.innerHTML = item.title;
            div.appendChild(span);
            this.panel.appendChild(div);
        });
        const items = this.items.filter(item => item.image && typeof(item.image)!== "undefined");
        for (let item of items) {
            const img = new Image();
            const span = this.panel.querySelector("#"+item.id+" > span");
            img.style.display = 'none';
            img.src = item.image;
            img.addEventListener("load", () => {
                img.height = this.panel.querySelector("#"+item.id).clientHeight;
                img.style.verticalAlign = "middle";
                img.style.marginRight = "5px";
                img.style.display = '';
            })
            this.panel.querySelector("#"+item.id).insertBefore(img,span);
        }
        setTimeout(() => {
            this.panel.style.display = 'none';
        },1);

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
}
