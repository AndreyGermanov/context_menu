import EventsManager from "./EventsManager.js";
import Menu, {MenuEvents} from "./Menu.js";

/**
 * Factory class for menus. Used to construct new context menus.
 * @constructor
 */
function Menus() {

    /**
     * Collection of all created menus
     * @type {array}
     */
    this.menus = [];

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

    EventsManager.subscribe(MenuEvents.CREATE, (event) => {
        if (this.menus.indexOf(event.target) === -1) {
            this.menus.push(event.target);
            event.target.id = this.menus.length;
        }
    })

    EventsManager.subscribe(MenuEvents.DESTROY, (event) => {
        if (this.menus.indexOf(event.target) !== -1) {
            this.menus.splice(this.menus.indexOf(event.target),1);
        }
    })

    EventsManager.subscribe(MenuEvents.SHOW, (event) => {
        this.menus.forEach(menu => {
            if (menu !== event.target) {
                menu.hide()
            }
        })
    })

    document.addEventListener("mouseup", (event) => {
        if (event.button!==2) {
            this.menus.forEach(menu => menu.hide())
        }
    })
}

export default new Menus();
