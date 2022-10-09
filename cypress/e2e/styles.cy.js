import {Menus} from "../../src/index.js";
describe('Context Menu styles tests', () => {
  it('should correctly apply css classes', () => {
    cy.visit('http://localhost:5173/tests/index.html').then(() => {
      const div = Cypress.$("#app").toArray()[0];
      const menu = Menus.create([
        {id:"item1",title:"Item 1",image:"img1"},
        {id:"item2",title:"Item 2",image:"img2"}
      ],div);
      //menu.show();
      menu.setPanelClass("panel");
      menu.drawMenu()
      cy.wait(100).then(() => {
        assert.equal(menu.panel.className,"panel","Should assign class to menu panel");
        assert.equal(menu.panel.style.borderWidth,0,"Should remove default style")
        menu.setPanelClass(null);
        menu.drawMenu()
        cy.wait(100).then(() => {
          assert.equal(menu.panel.className,"","Should remove class from menu panel");
          assert.equal(menu.panel.style.borderWidth,"1px","Should return default style back")
          menu.setItemClass("item");
          menu.drawMenu()
          cy.wait(100).then(() => {
            let divs = menu.panel.querySelectorAll("div[id]");
            for (let div of divs) {
              assert.equal(div.className,"item","Item should have a class")
              assert.equal(div.style.paddingLeft,"","Should remove default style");
            }
            menu.setItemClass(null);
            menu.drawMenu()
            cy.wait(100).then(() => {
              divs = menu.panel.querySelectorAll("div[id]");
              for (let div of divs) {
                assert.equal(div.className,"","Should remove class from item");
                assert.equal(div.style.paddingLeft,"3px","Should return back default style");
              }
              menu.setTextClass("text")
              menu.drawMenu()
              let spans = menu.panel.querySelectorAll("span")
              cy.wait(100).then(() => {
                for (let span of spans) {
                  assert.equal(span.className, "text", "Should add class to text of item");
                }
                menu.setTextClass("")
                menu.drawMenu()
                spans = menu.panel.querySelectorAll("span")
                cy.wait(100).then(() => {
                  for (let span of spans) {
                    assert.equal(span.className, "", "Should remove class from text of item");
                  }
                  menu.setImageClass("image")
                  menu.drawMenu()
                  spans = menu.panel.querySelectorAll("img")
                  cy.wait(100).then(() => {
                    for (let span of spans) {
                      assert.equal(span.className, "image", "Should add class to image of item");
                    }
                    menu.setImageClass("")
                    menu.drawMenu()
                    spans = menu.panel.querySelectorAll("img")
                    cy.wait(100).then(() => {
                      for (let span of spans) {
                        assert.equal(span.className, "", "Should remove class from image of item");
                      }
                      menu.setItemClass("item","item1");
                      menu.drawMenu()
                      cy.wait(100).then(() => {
                        let div = menu.panel.querySelector("#item1");
                        assert.equal(div.className,"item","Should set class to specified item");
                        div = menu.panel.querySelector("#item2");
                        assert.equal(div.className,"","Should not set class to other items");
                        menu.setItemClass("","item1");
                        menu.drawMenu()
                        cy.wait(100).then(() => {
                          let div = menu.panel.querySelector("#item1");
                          assert.equal(div.className,"","Should set class to specified item");
                          menu.setTextClass("text","item1");
                          menu.drawMenu()
                          cy.wait(100).then(() => {
                            let div = menu.panel.querySelector("#item1");
                            let span = div.querySelector("span");
                            assert.equal(span.className,"text","Should set text class of specified item");
                            div = menu.panel.querySelector("#item2");
                            span = div.querySelector("span");
                            assert.equal(span.className,"","Should not set text class of other items");
                            menu.setTextClass("","item1");
                            menu.drawMenu()
                            cy.wait(100).then(() => {
                              let div = menu.panel.querySelector("#item1");
                              let span = div.querySelector("span");
                              assert.equal(span.className, "", "Should remove text class of specified item");
                              menu.setImageClass("img","item1");
                              menu.drawMenu()
                              cy.wait(100).then(() => {
                                let div = menu.panel.querySelector("#item1");
                                let img = div.querySelector("img");
                                assert.equal(img.className,"img","Should set image class of specified item");
                                div = menu.panel.querySelector("#item2");
                                img = div.querySelector("img");
                                assert.equal(img.className,"","Should not set image class of other items");
                                menu.setImageClass("","item1");
                                menu.drawMenu()
                                cy.wait(100).then(() => {
                                  let div = menu.panel.querySelector("#item1");
                                  let img = div.querySelector("img");
                                  assert.equal(img.className, "", "Should remove text class of specified item");
                                });
                              });
                            });
                          });
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
    })
  })
})
