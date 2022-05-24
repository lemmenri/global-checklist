import React, { useState, useEffect } from "react";
import { convertLanguageData, getSet } from "../../scripts/ScryfallQueries";
import { defaultCardData } from "../../testdata/CardData";
import { defaultOtherLanguagesList } from "../../testdata/OtherLanguagesList";
import Accordion from "../Accordion";
import AddToCollection from "../AddToCollection";
import Condition from "../Condition";
import { ExternalLink } from "../ExternalLink";
import Language from "../Language";
import { Loading } from "../Loading";
import SetCard from "../SetCard";
import SimpleToggle from "../Toggle";
import { groupedCardData } from "../../testdata/GroupedCardData";
import SearchResultListItem from "../SearchResultListItem";
import SearchCombobox from "../SearchCombobox";
import { cardNames } from "../../testdata/CardnameData";
import CardImage from "../CardImage";
import Header from "../Header";
import Footer from "../Footer";
import NotFoundPage from "./NotFoundPage";
import HomePage from "./HomePage";
import SetsPage from "./SetsPage";
import SearchPage from "./SearchPage";
import ImportExportPage from "./ImportExportPage";
import CollectedListItem from "../CollectedListItem";
import CollectedList from "../CollectedList";
import { collectedCardData } from "../../testdata/CollectedCardsData";

export default function DesignSystemPage() {
  document.title = "MTG Library - Design System";

  const [exampleSetCardData, setExampleSetCardData] = useState(undefined);
  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    getSet("aer").then((res) => {
      setExampleSetCardData(res);
    });
  }, []);

  return (
    <div className="p-4 sm:p-8 flex-grow bg-light">
      <h1 className="display">Design System</h1>
      <Accordion title={<h2 className="h1">Atoms</h2>}>
        <Accordion title={<h3 className="h2">Text</h3>}>
          <p>Display:</p>
          <p className="display mx-4">Welcome to MTG Library</p>
          <p>H1:</p>
          <p className="h1 mx-4">Welcome to MTG Library</p>
          <p>H2:</p>
          <p className="h2 mx-4">Welcome to MTG Library</p>
        </Accordion>
        <Accordion title={<h3 className="h2">Colors</h3>}>
          <p>Interface Colors</p>
          <div className="flex flex-wrap">
            <div className="m-2">
              <p className="text-sm">Primary:</p>
              <div className="h-6 w-24 bg-primary border border-dark"></div>
            </div>
            <div className="m-2">
              <p className="text-sm">Light:</p>
              <div className="h-6 w-24 bg-light border border-dark"></div>
            </div>
            <div className="m-2">
              <p className="text-sm">Dark:</p>
              <div className="h-6 w-24 bg-dark border border-light"></div>
            </div>
          </div>

          <p>Condition Colors</p>
          <div className="flex flex-wrap">
            <div className="m-2">
              <p className="text-sm">Mint:</p>
              <div className="h-6 w-24 bg-MT border border-dark"></div>
            </div>
            <div className="m-2">
              <p className="text-sm">Near Mint:</p>
              <div className="h-6 w-24 bg-NM border border-dark"></div>
            </div>
            <div className="m-2">
              <p className="text-sm">Excelent:</p>
              <div className="h-6 w-24 bg-EX border border-dark"></div>
            </div>
            <div className="m-2">
              <p className="text-sm">Good:</p>
              <div className="h-6 w-24 bg-GD border border-dark"></div>
            </div>
            <div className="m-2">
              <p className="text-sm">Light Played:</p>
              <div className="h-6 w-24 bg-LP border border-dark"></div>
            </div>
            <div className="m-2">
              <p className="text-sm">Played:</p>
              <div className="h-6 w-24 bg-PL border border-dark"></div>
            </div>
            <div className="m-2">
              <p className="text-sm">Poor:</p>
              <div className="h-6 w-24 bg-PO border border-dark"></div>
            </div>
          </div>

          <p>Collection Colors</p>
          <div className="flex flex-wrap">
            <div className="m-2">
              <p className="text-sm">Collected:</p>
              <div className="h-6 w-24 bg-collected border border-dark"></div>
            </div>
          </div>
        </Accordion>
        <Accordion title={<h3 className="h2">Labels</h3>}>
          <p>Language</p>
          <div className="w-8">
            <Language language={"en"} />
          </div>
          <p>Condition</p>
          <div className="flex flex-wrap space-x-2">
            <Condition condition={"MT"} />
            <Condition condition={"NM"} />
            <Condition condition={"EX"} />
            <Condition condition={"GD"} />
            <Condition condition={"LP"} />
            <Condition condition={"PL"} />
            <Condition condition={"PO"} />
          </div>
        </Accordion>
        <Accordion title={<h3 className="h2">Card Image</h3>}>
          <CardImage
            className="rounded-[9px] w-40 shadow-dark shadow-md"
            src="https://c1.scryfall.com/file/scryfall-cards/normal/front/7/1/716c415e-5eb8-4644-ac64-5ba7c3f0ea65.jpg?1626103831"
            alt="Arid Mesa-mh2"
          />
        </Accordion>
      </Accordion>

      <Accordion title={<h2 className="h1">Molecules</h2>}>
        <Accordion title={<h3 className="h2">Button</h3>}>
          <button className="btn">Click me!</button>
        </Accordion>
        <Accordion title={<h3 className="h2">Toggle</h3>}>
          <SimpleToggle
            name={"toggle"}
            label={"Toggle"}
            onToggle={() => {
              setToggle(!toggle);
            }}
          />
        </Accordion>
        <Accordion title={<h3 className="h2">Search Combobox</h3>}>
          <SearchCombobox
            itemList={cardNames}
            id="cardnameSearch"
            placeholder="Search cards..."
          />
        </Accordion>
        <Accordion title={<h3 className="h2">Loading</h3>}>
          <Loading />
        </Accordion>
        <Accordion title={<h3 className="h2">External Link</h3>}>
          <ExternalLink
            href="https://scryfall.com/card/sld/176/birds-of-paradise?utm_source=api"
            externalParty="Scryfall"
            imageLocation={"https://assets.scryfall.com/favicon.ico"}
          />
        </Accordion>
      </Accordion>

      <Accordion title={<h2 className="h1">Organisms</h2>}>
        <Accordion title={<h3 className="h2">Header</h3>}>
          <Header />
        </Accordion>
        <Accordion title={<h3 className="h2">Footer</h3>}>
          <Footer />
        </Accordion>
        <Accordion title={<h3 className="h2">Set Card</h3>}>
          {exampleSetCardData && <SetCard set={exampleSetCardData} />}
        </Accordion>
        <Accordion title={<h3 className="h2">Add To Collection</h3>}>
          <AddToCollection
            card={defaultCardData}
            languages={convertLanguageData(defaultOtherLanguagesList)}
          />
        </Accordion>
        <Accordion title={<h3 className="h2">Collected List</h3>}>
          <CollectedList collected={collectedCardData} />
        </Accordion>
        <Accordion title={<h3 className="h2">Collected List Item</h3>}>
          <CollectedListItem
            id="716c415e-5eb8-4644-ac64-5ba7c3f0ea65"
            finish="etched"
            quantity={3}
            condition="NM"
            language="EN"
          />
        </Accordion>
        <Accordion title={<h3 className="h2">Search Result List Item</h3>}>
          <SearchResultListItem group={groupedCardData[0]} />
        </Accordion>
      </Accordion>

      <Accordion title={<h2 className="h1">Pages</h2>}>
        <Accordion title={<h3 className="h2">Home Page</h3>}>
          <div className="border border-dark">
            <HomePage />
          </div>
        </Accordion>
        <Accordion title={<h3 className="h2">Sets Page</h3>}>
          <div className="border border-dark">
            <SetsPage />
          </div>
        </Accordion>
        <Accordion title={<h3 className="h2">Search Page</h3>}>
          <div className="border border-dark">
            <SearchPage />
          </div>
        </Accordion>
        <Accordion title={<h3 className="h2">Import / Export Page</h3>}>
          <div className="border border-dark">
            <ImportExportPage />
          </div>
        </Accordion>
        <Accordion title={<h3 className="h2">Not Found Page</h3>}>
          <div className="border border-dark">
            <NotFoundPage />
          </div>
        </Accordion>
      </Accordion>
    </div>
  );
}
