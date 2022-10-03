import {Menus} from "../../src/index.js";

describe('Menu API tests', () => {
  it('addItem', () => {
    cy.visit('http://localhost:5173/tests/index.html').then(() => {
      const menu = Menus.create([],Cypress.$("#app").toArray()[0],"contextmenu");
      cy.wait(100).then(() => {
        assert.equal(menu.panel.querySelectorAll("div").length,0,"Should be empty menu without items");
        menu.addItem("item1","Item 1","http://localhost:5173/tests/about.jpg");
        cy.wait(100).then(() => {
          assert.equal(menu.panel.querySelectorAll("div").length,1,"Should be empty menu without items");
        })
      });
    });
  })
  it('removeItem', () => {
    cy.visit('http://localhost:5173/tests/index.html').then(() => {
      const menu = Menus.create([],Cypress.$("#app").toArray()[0],"contextmenu");
      cy.wait(100).then(() => {
        assert.equal(menu.panel.querySelectorAll("div").length,0,"Should be empty menu without items");
        menu.addItem("item1","Item 1","http://localhost:5173/tests/about.jpg");
        cy.wait(100).then(() => {
          assert.equal(menu.panel.querySelectorAll("div").length,1,"Should be empty menu without items");
          menu.removeItem("item1");
          cy.wait(100).then(() => {
            assert.equal(menu.panel.querySelectorAll("div").length, 0, "Should be empty menu without items");
          });
        })
      });
    });
  })
  it("findItemById", () => {
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
      const item = menu.findItemById("add_point");
      assert.isDefined(item,"Item should be defined");
      assert.isNotNull(item,"Item should be not null");
      assert.equal(item.id,"add_point","Item should have correct id");
      assert.equal(item.tagName, "DIV", "Should be node of 'DIV' type")
    });
  })

})
