import Menu from "./Menu.js";

/**
 * Factory class for menus. Used to construct new context menus.
 * @constructor
 */
function Menus() {

    /**
     * Method used to create new context menu
     * @param items {array} Items to include to menu. Each item is an object with fields:
     * `id` - ID of menu item, `title` - text of menu item, `image` - URL of image of menu item (optional)
     * @param container {HTMLElement} HTML element to which this menu belongs
     * @param eventName {string} Name of event which should be triggered on `container` to display this menu. By
     * default `contextmenu`, so, menu will appear when right mouse click on it. Could be any other mouse event
     * like `click`, `mouseover`, `mousedown` or others.
     * @returns {Menu} Constructed [Menu](#Menu) object.
     */
    this.create = (items,container,eventName) => {
        return new Menu(items,container,eventName).init();
    }
}

export default new Menus();
