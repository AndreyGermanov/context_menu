export default function MenuStylesHelper(menu) {
    this.menu = menu;

    this.panelCssClass = "";
    this.itemCssClass = "";
    this.itemTextCssClass = "";
    this.itemImageCssClass = "";
    this.itemsCssClassesById = {};

    this.setStyles = () => {
        if (!this.panelCssClass) {
            this.menu.panel.style.padding = "3px";
            this.menu.panel.style.borderStyle = "solid";
            this.menu.panel.style.borderColor = "#dddddd";
            this.menu.panel.style.borderWidth = "1px";
            this.menu.panel.style.backgroundColor = "#eeeeee";
            this.menu.panel.className = "";
        } else {
            this.menu.panel.className = this.panelCssClass;
        }
        for (let item of this.menu.items) {
            this.setItemStyles(item);
        }
    }

    this.setItemStyles = (item) => {
        this.setItemDivStyles(item);
        this.setItemSpanStyles(item);
        this.setItemImageStyles(item);
    }

    this.setItemDivStyles = (item) => {
        const itemDiv = this.menu.panel.querySelector("#"+item.id);
        if (!itemDiv) {
            return
        }
        if (this.itemsCssClassesById[item.id] && typeof(this.itemsCssClassesById[item.id]) == "object" &&
            this.itemsCssClassesById[item.id]["item"]) {
            itemDiv.className = this.itemsCssClassesById[item.id]["item"]
        } else if (this.itemCssClass) {
            itemDiv.className = this.itemCssClass || "";
        } else {
            itemDiv.className = "";
            itemDiv.style.paddingTop = "2px";
            itemDiv.style.paddingLeft = "3px";
            itemDiv.style.paddingRight = "3px";
            itemDiv.addEventListener("mouseover", () => {
                itemDiv.style.backgroundColor = "#0066CC";
                itemDiv.style.color = "white";
            })
            itemDiv.addEventListener("mouseout", () => {
                itemDiv.style.backgroundColor = "transparent";
                itemDiv.style.color = "black";
            })
        }
    }

    this.setItemSpanStyles = (item) => {
        const itemDiv = this.menu.panel.querySelector("#"+item.id);
        if (!itemDiv) {
            return
        }
        const span = itemDiv.querySelector("span");
        if (span) {
            if (this.itemsCssClassesById[item.id] && typeof(this.itemsCssClassesById[item.id]) == "object" &&
                this.itemsCssClassesById[item.id]["text"]) {
                span.className = this.itemsCssClassesById[item.id]["text"]
            } else if (this.itemTextCssClass) {
                span.className = this.itemTextCssClass;
            } else {
                span.className = "";
            }
        }
    }

    this.setItemImageStyles = (item) => {
        const itemDiv = this.menu.panel.querySelector("#"+item.id);
        if (!itemDiv) {
            return
        }
        const img = itemDiv.querySelector("img");
        if (img) {
            if (this.itemsCssClassesById[item.id] && typeof (this.itemsCssClassesById[item.id]) == "object" &&
                this.itemsCssClassesById[item.id]["image"]) {
                img.className = this.itemsCssClassesById[item.id]["image"];
            } else if (this.itemImageCssClass) {
                img.className = this.itemImageCssClass;
            } else {
                img.className = "";
            }
        }
    }

    this.setPanelClass = (className=null) => {
        this.panelCssClass = className || "";
        this.menu.drawItems();
    }

    this.setItemClass = (className=null,id=null) => {
        if (id) {
            this.setClassForItem(id,"item",className);
            this.menu.drawItems();
            return
        }
        this.itemCssClass = className || "";
        this.menu.drawItems();
    }

    this.setTextClass = (className=null,id=null) => {
        if (id) {
            this.setClassForItem(id,"text",className);
            this.menu.drawItems();
            return
        }
        this.itemTextCssClass = className || "";
        this.menu.drawItems();
    }

    this.setImageClass = (className=null,id=null) => {
        if (id) {
            this.setClassForItem(id,"image",className);
            this.menu.drawItems();
            return
        }
        this.itemImageCssClass = className || "";
        this.menu.drawItems();
    }

    this.setClassForItem = (id,classType,className) => {
        if (!this.itemsCssClassesById[id] || typeof(this.itemsCssClassesById[id]) === "undefined") {
            this.itemsCssClassesById[id] = {};
        }
        this.itemsCssClassesById[id][classType] = className;
    }
}
