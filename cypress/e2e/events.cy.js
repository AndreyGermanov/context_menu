import {Menus} from "../../src/index.js";

describe('Events tests', () => {
  it('should pass default events', () => {
    cy.visit('http://localhost:5173/tests/index.html').then(() => {
      const div = document.createElement("div");
      div.style.position = "absolute";
      div.style.left = "100px";
      div.style.top = "50px";
      div.style.width = "100px";
      div.style.height = "100px";
      div.id="div1";
      div.style.backgroundColor = "#cccccc";
      Cypress.$("#app").toArray()[0].appendChild(div);
      const menu = Menus.create([
        {id: "copy_shape", title: "Copy Shape"},
        {id: "add_point", title: "Add Point"},
        {id: "save_svg", title: "Save to SVG"}
      ],div);
      let trigger1 = false;
      let trigger2 = false;
      let trigger3 = false;
      let trigger4 = false;
      let trigger5 = false;
      let trigger6 = false;
      menu.on("click", (event) => {
        assert.equal(event.owner,menu,"Should have menu object as an event owner");
        assert.equal(event.target,div,"Should have div element as an event target");
        assert.equal(event.cursorX,10,"Should save cursor X position oaf a moment when menu panel appeared");
        assert.equal(event.cursorY,10,"Should save cursor Y position oaf a moment when menu panel appeared");
        switch (event.itemId) {
          case "copy_shape":
            trigger1 = true;
            break;
          case "add_point":
            trigger2 = true;
            break;
          case "save_svg":
            trigger3 = true;
            break;
        }
      });
      menu.on("mouseover", (event) => {
        assert.equal(event.owner,menu,"Should have menu object as an event owner");
        assert.equal(event.target,div,"Should have div element as an event target");
        assert.equal(event.cursorX,10,"Should save cursor X position oaf a moment when menu panel appeared");
        assert.equal(event.cursorY,10,"Should save cursor Y position oaf a moment when menu panel appeared");
        switch (event.itemId) {
          case "copy_shape":
            trigger4 = true;
            break;
          case "add_point":
            trigger5 = true;
            break;
          case "save_svg":
            trigger6 = true;
            break;
        }
      });
      cy.get("#div1").trigger("contextmenu",{pageX:10,pageY:10});
      Cypress.$("#app").toArray()[0].appendChild(menu.panel);
      cy.wait(1000).then(() => {
        menu.show();
        cy.get("#copy_shape").click({force: true}).then(() => {
          assert.isTrue(trigger1,"Should react on click on first item");
          cy.wait(100).then(() => {
            assert.equal(menu.panel.style.display,'none',"Should hide menu after click on it");
            menu.show();
            cy.get("#add_point").click({force: true}).then(() => {
              assert.isTrue(trigger2,"Should react on click on second item");
              cy.wait(100).then(() => {
                assert.equal(menu.panel.style.display,'none',"Should hide menu after click on it");
                menu.show();
                cy.get("#save_svg").click({force: true}).then(() => {
                  assert.isTrue(trigger3, "Should react on click on third item");
                  cy.wait(100).then(() => {
                    assert.equal(menu.panel.style.display,'none',"Should hide menu after click on it");
                    menu.show();
                    cy.get("#copy_shape").trigger("mouseover",{force: true}).then(() => {
                      assert.isTrue(trigger4, "Should react on mouseover on first item");
                      assert.equal(menu.panel.style.display, '', "Should not hide menu after hover on it");
                      cy.get("#add_point").trigger("mouseover",{force: true}).then(() => {
                        assert.isTrue(trigger5, "Should react on mouseover on second item");
                        assert.equal(menu.panel.style.display, '', "Should not hide menu after click on it");
                        cy.get("#save_svg").trigger("mouseover",{force: true}).then(() => {
                          assert.isTrue(trigger6, "Should react on mouseover on third item");
                          assert.equal(menu.panel.style.display, '', "Should not hide menu after click on it");
                          menu.hide();
                        })
                      })
                    })
                  })
                })
              })
            })
          })
        })
      })
    });
  })
})
