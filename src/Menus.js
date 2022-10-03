import Menu from "./Menu.js";

function Menus() {

    this.create = (items,container,eventName) => {
        return new Menu(items,container,eventName).init();
    }
}

export default new Menus();
