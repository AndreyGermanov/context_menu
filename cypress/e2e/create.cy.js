import {Menus} from "../../src/index.js";

describe('Menus in basic mode tests', () => {
  it('create', () => {
    cy.visit('http://localhost:5173/tests/index.html').then(() => {
      const div = document.createElement("div");
      div.style.position = "absolute";
      div.style.left = "100px";
      div.style.top = "50px";
      div.style.width = "100px";
      div.style.height = "100px";
      div.style.backgroundColor = "#cccccc";
      Cypress.$("#app").toArray()[0].appendChild(div);
      const menu = Menus.create([
          {id: "copy_shape", title: "Copy Shape"},
          {id: "add_point", title: "Add Point"},
          {id: "save_svg", title: "Save to SVG"}
      ],div);
      cy.wait(100).then(() => {
        assert.isNotNull(menu, "Should create context menu");
        assert.isDefined(menu.panel,"Should create menu panel");
        assert.isNotNull(menu.panel,"Should create menu panel");
        assert.equal(menu.panel.style.display,"none","Menu panel should be invisible by default");
        assert.equal(menu.panel.querySelectorAll("div").length,3,"Menu panel should have divs for each menu item");
        assert.isNotNull(menu.panel.querySelector("#copy_shape"),"Should contain element for first menu item");
        assert.isNotNull(menu.panel.querySelector("#add_point"),"Should contain element for second menu item");
        assert.isNotNull(menu.panel.querySelector("#save_svg"),"Should contain element for third menu item");
        assert.equal(menu.eventName,"contextmenu","Default trigger event should be right mouse click");
        menu.items[1].image = "http://localhost:5173:/tests/about.jpg";
        menu.drawItems();
        assert.isDefined(Cypress.$("#add_point  img"),"Should append <img> element when 'image' property of item specified");
        cy.get("#app > div").trigger("contextmenu").then(() => {
          assert.equal(menu.panel.style.display,'',"Should display context menu on right mouse click");
        })
      })
    })
  })
})
