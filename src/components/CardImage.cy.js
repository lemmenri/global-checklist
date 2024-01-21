import * as React from "react";
import "tailwindcss/tailwind.css";
import "../App.css";
import CardImage from "./CardImage";

const className = "rounded-[9px] w-40 shadow-dark shadow-md";
const src =
  "https://c1.scryfall.com/file/scryfall-cards/normal/front/7/1/716c415e-5eb8-4644-ac64-5ba7c3f0ea65.jpg?1626103831";
const alt = "Arid Mesa-mh2";

it("Card Image", () => {
  cy.mount(<CardImage className={className} src={src} alt={alt} />);
  cy.get("#loading > svg").should("not.exist");
  cy.get("img")
    .should("have.attr", "alt", alt)
    .and(
      "have.css",
      "box-shadow",
      "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgb(4, 42, 51) 0px 4px 6px -1px, rgb(4, 42, 51) 0px 2px 4px -2px"
    );
});

it("Card Image - Loading image", () => {
  cy.mount(<CardImage />);
  cy.get("#loading > svg").should("be.visible");
  cy.get("#loading > p").should("contain.text", "Loading...");
});
