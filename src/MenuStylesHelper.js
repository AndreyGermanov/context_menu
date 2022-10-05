/**
 * Extender class for `Menu` class, which extends it by methods
 * used to change styles of menu panel and menu items. All methods of
 * this class can be executed directly on `Menu` instance.
 * @param menu {Menu} Menu object to extend
 * @constructor
 */
function MenuStylesHelper(menu) {
    /**
     * Menu object to extend
     * @type {Menu}
     */
    this.menu = menu;

    /**
     * CSS class that used to style menu panel
     * @type {string}
     */
    this.panelCssClass = "";

    /**
     * CSS class name or names that used to style menu items DIV elements
     * @type {string}
     */
    this.itemCssClass = "";

    /**
     * CSS class name or names that used to style text of menu items
     * @type {string}
     */
    this.itemTextCssClass = "";

    /**
     * CSS class name or names that used to style images of menu items
     * @type {string}
     */
    this.itemImageCssClass = "";

    /**
     * CSS classes for concrete items by their IDs.
     * @type {object}
     */
    this.itemsCssClassesById = {};

    /**
     * @ignore
     * Method used to apply styles to menu panel and items
     * either from provided CSS classes or using default styles
     */
    this.setStyles = () => {
        if (!this.menu.panel) {
            return
        }
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

    /**
     * @ignore
     * Method used to apply styles to menu items and their parts
     * either from provided CSS classes or using default styles
     * @param item {object} Menu item object
     */
    this.setItemStyles = (item) => {
        this.setItemDivStyles(item);
        this.setItemSpanStyles(item);
        this.setItemImageStyles(item);
    }

    /**
     * @ignore
     * Method used to apply styles to menu items DIVs
     * either from provided CSS classes or using default styles
     * @param item {object} Menu item object
     */
    this.setItemDivStyles = (item) => {
        const itemDiv = this.menu.panel.querySelector("#"+item.id);
        if (!itemDiv) {
            return
        }
        if (this.itemsCssClassesById[item.id] && typeof(this.itemsCssClassesById[item.id]) == "object" &&
            this.itemsCssClassesById[item.id][ItemParts.ITEM]) {
            itemDiv.className = this.itemsCssClassesById[item.id][ItemParts.ITEM]
        } else if (this.itemCssClass) {
            itemDiv.className = this.itemCssClass || "";
        } else {
            itemDiv.className = "";
            itemDiv.style.display = 'flex';
            itemDiv.style.flexDirection = 'row';
            itemDiv.style.alignItems = 'center';
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
        itemDiv.style.whiteSpace = 'nowrap';
    }

    /**
     * @ignore
     * Method used to apply styles to text of menu items
     * either from provided CSS classes or using default styles
     * @param item {object} Menu item object
     */
    this.setItemSpanStyles = (item) => {
        const itemDiv = this.menu.panel.querySelector("#"+item.id);
        if (!itemDiv) {
            return
        }
        const span = itemDiv.querySelector("span");
        if (span) {
            if (this.itemsCssClassesById[item.id] && typeof(this.itemsCssClassesById[item.id]) == "object" &&
                this.itemsCssClassesById[item.id][ItemParts.TEXT]) {
                span.className = this.itemsCssClassesById[item.id][ItemParts.TEXT]
            } else if (this.itemTextCssClass) {
                span.className = this.itemTextCssClass;
            } else {
                span.className = "";
                span.style.color = "black";
            }
        }
    }

    /**
     * @ignore
     * Method used to apply styles to images of menu items
     * either from provided CSS classes or using default styles
     * @param item {object} Menu item object
     */
    this.setItemImageStyles = (item) => {
        const itemDiv = this.menu.panel.querySelector("#"+item.id);
        if (!itemDiv) {
            return
        }
        const img = itemDiv.querySelector("img");
        if (img) {
            if (this.itemsCssClassesById[item.id] && typeof (this.itemsCssClassesById[item.id]) == "object" &&
                this.itemsCssClassesById[item.id][ItemParts.IMAGE]) {
                img.className = this.itemsCssClassesById[item.id][ItemParts.IMAGE];
            } else if (this.itemImageCssClass) {
                img.className = this.itemImageCssClass;
            } else {
                img.className = "";
            }
        }
    }

    /**
     * Method used to override CSS class for menu panel
     * @param className {string} CSS class to apply
     */
    this.setPanelClass = (className=null) => {
        this.panelCssClass = className || "";
        this.menu.drawMenu();
    }

    /**
     * Method used to override CSS class for menu items
     * or only for menu item with specified `id`
     * @param className {string} CSS class to apply
     * @param id {string} ID of item or null
     */
    this.setItemClass = (className=null,id=null) => {
        if (id) {
            this.setClassForItem(id,ItemParts.ITEM, className);
            this.menu.drawMenu();
            return
        }
        this.itemCssClass = className || "";
        this.menu.drawMenu();
    }

    /**
     * Method used to override CSS class for text of menu items
     * or only for menu item with specified `id`
     * @param className {string} CSS class to apply
     * @param id {string} ID of item or null
     */
    this.setTextClass = (className=null,id=null) => {
        if (id) {
            this.setClassForItem(id,ItemParts.TEXT, className);
            this.menu.drawMenu();
            return
        }
        this.itemTextCssClass = className || "";
        this.menu.drawMenu();
    }

    /**
     * Method used to override CSS class for images of menu items
     * or only for menu item with specified `id`
     * @param className {string} CSS class to apply
     * @param id {string} ID of item or null
     */
    this.setImageClass = (className=null,id=null) => {
        if (id) {
            this.setClassForItem(id,ItemParts.IMAGE,className);
            this.menu.drawMenu();
            return
        }
        this.itemImageCssClass = className || "";
        this.menu.drawMenu();
    }

    /**
     * @ignore
     * Method that sets CSS classes for different parts of menu item with specified `id`
     * @param id {string} ID of menu item
     * @param classType {ItemParts} name of part to apply CSS class to: `item`, `text` or `image`
     * @param className
     */
    this.setClassForItem = (id,classType,className) => {
        if (!this.itemsCssClassesById[id] || typeof(this.itemsCssClassesById[id]) === "undefined") {
            this.itemsCssClassesById[id] = {};
        }
        this.itemsCssClassesById[id][classType] = className;
    }
}

/**
 * Enumeration of menu item parts using internally
 * to define CSS classes for different parts of menu item
 * @param div DIV element that contains menu item
 * @param text text inside menu item
 * @param image image inside menu item
 * @enum
 */
const ItemParts = {
    ITEM: "div",
    TEXT: "text",
    IMAGE: "image"
}

export default MenuStylesHelper;
