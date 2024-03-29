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
import SetCard, { SetCardExtended } from "../SetCard";
import Toggle from "../Toggle";
import { searchResultsData } from "../../testdata/SearchResultsData";
import { groupedCardData } from "../../testdata/GroupedCardData";
import SearchResultListItem from "../SearchResultListItem";
import SearchCombobox from "../SearchCombobox";
import { cardNames } from "../../testdata/CardnameData";
import CardImage from "../CardImage";
import Header from "../Header";
import Footer from "../Footer";
import NotFoundPage from "./NotFoundPage";
import CollectionPage from "./CollectionPage";
import HomePage from "./HomePage";
import SetsPage from "./SetsPage";
import SearchPage from "./SearchPage";
import ImportExportPage from "./ImportExportPage";
import CollectedListItem from "../CollectedListItem";
import CollectedList from "../CollectedList";
import { collectedCardData } from "../../testdata/CollectedCardsData";
import TextListBox from "../ListBox";
import { conditions } from "../../enums/conditions";
import ArtistSearch from "../ArtistSearch";
import CardnameSearch from "../CardnameSearch";
import CreatureTypeSearch from "../CreatureTypeSearch";
import SetSearch from "../SetSearch";
import SearchResultImageItem from "../SearchResultImageItem";
import SearchResults from "../SearchResults";
import { finishes } from "../../enums/finishes";
import PrintsListItem from "../PrintsListItem";
import Prints from "../Prints";
import { moreThenTenPrintings, twoPrintings } from "../../testdata/PrintingData";
import CardnameSearchForm from "../CardnameSearchForm";
import { exampleExtendedSetCardData } from "../../testdata/SetCardData";
import Table from "../Table";
import { collectedCardsAsListData, collectedCardsAsListHeaderData } from "../../testdata/CollectedCardsAsListData";

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
    <div role="main" className="p-4 sm:p-8 flex-grow bg-light">
      <h1 className="display">Design System</h1>
      <Accordion title={<h2 className="h1">Atoms</h2>}>
        <Accordion title={<h3 className="h2">Text</h3>}>
          <p>Display:</p>
          <p className="display mx-4">Welcome to MTG Library</p>
          <p>H1:</p>
          <p className="h1 mx-4">Welcome to MTG Library</p>
          <p>H2:</p>
          <p className="h2 mx-4">Welcome to MTG Library</p>
          <p>Regular text:</p>
          <p className="mx-4">Welcome to MTG Library</p>
          <p>Text small:</p>
          <p className="small mx-4">Welcome to MTG Library</p>
        </Accordion>
        <Accordion title={<h3 className="h2">Colors</h3>}>
          <p>Interface Colors</p>
          <div className="flex flex-wrap">
            <div className="m-2">
              <p className="small">Primary:</p>
              <div className="h-6 w-24 bg-primary border border-dark"></div>
            </div>
            <div className="m-2">
              <p className="small">Light:</p>
              <div className="h-6 w-24 bg-light border border-dark"></div>
            </div>
            <div className="m-2">
              <p className="small">Dark:</p>
              <div className="h-6 w-24 bg-dark border border-light"></div>
            </div>
          </div>

          <p>Condition Colors</p>
          <div className="flex flex-wrap">
            <div className="m-2">
              <p className="small">Mint:</p>
              <div className="h-6 w-24 bg-MT border border-dark"></div>
            </div>
            <div className="m-2">
              <p className="small">Near Mint:</p>
              <div className="h-6 w-24 bg-NM border border-dark"></div>
            </div>
            <div className="m-2">
              <p className="small">Excelent:</p>
              <div className="h-6 w-24 bg-EX border border-dark"></div>
            </div>
            <div className="m-2">
              <p className="small">Good:</p>
              <div className="h-6 w-24 bg-GD border border-dark"></div>
            </div>
            <div className="m-2">
              <p className="small">Light Played:</p>
              <div className="h-6 w-24 bg-LP border border-dark"></div>
            </div>
            <div className="m-2">
              <p className="small">Played:</p>
              <div className="h-6 w-24 bg-PL border border-dark"></div>
            </div>
            <div className="m-2">
              <p className="small">Poor:</p>
              <div className="h-6 w-24 bg-PO border border-dark"></div>
            </div>
          </div>

          <p>Collection Colors</p>
          <div className="flex flex-wrap">
            <div className="m-2">
              <p className="small">Collected:</p>
              <div className="h-6 w-24 bg-collected border border-dark"></div>
            </div>
          </div>
        </Accordion>
        <Accordion title={<h3 className="h2">Labels</h3>}>
          <p>Language</p>
          <div className="flex flex-wrap space-x-2">
            <Language language={"en"} />
          </div>
          <p>Not active language</p>
          <div className="flex flex-wrap space-x-2">
            <Language language={"en"} isActive={false} />
          </div>
          <p>Language with cardimage on hover</p>
          <div className="flex flex-wrap space-x-2">
            <Language language={"zhs"} imageOnHover={"https://cards.scryfall.io/normal/front/6/a/6af5e30b-a23c-4b37-8702-fff80982c653.jpg?1562613047"} />
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
        <Accordion title={<h3 className="h2">Accordion</h3>}>
          <Accordion title={<h4>Accordion</h4>}>
            <p>Text</p>
          </Accordion>
        </Accordion>
        <Accordion title={<h3 className="h2">Button</h3>}>
          <div className="flex flex-wrap space-x-2">
            <button className="btn">Click me!</button>
            <button className="btn bg-light text-dark border border-1 border-dark">Delete</button>
          </div>
        </Accordion>
        <Accordion title={<h3 className="h2">Toggle</h3>}>
          <Toggle
            name={"toggle"}
            label={"Toggle"}
            onToggle={() => {
              setToggle(!toggle);
            }}
          />
        </Accordion>
        <Accordion title={<h3 className="h2">Search Comboboxes</h3>}>
          <div className="space-y-4">
            <div>
              <p>Generic Combobox:</p>
              <div className="mx-4">
                <SearchCombobox
                  itemList={cardNames}
                  id="cardnameSearch"
                  placeholder="Search cards..."
                />
              </div>
            </div>
            <div>
              <p>Generic Combobox with Search Button:</p>
              <div className="mx-4">
                <SearchCombobox
                  itemList={cardNames}
                  id="cardnameSearch"
                  placeholder="Search cards..."
                  withSearchButton
                />
              </div>
            </div>
            <div>
              <p>Cardname Search:</p>
              <div className="mx-4">
                <CardnameSearch />
              </div>
            </div>
            <div>
              <p>Artist Search:</p>
              <div className="mx-4">
                <ArtistSearch />
              </div>
            </div>
            <div>
              <p>Creature Type Search:</p>
              <div className="mx-4">
                <CreatureTypeSearch />
              </div>
            </div>
            <div>
              <p>Set Search:</p>
              <div className="mx-4">
                <SetSearch />
              </div>
            </div>
          </div>
        </Accordion>
        <Accordion title={<h3 className="h2">Listbox</h3>}>
          <p>Multiple values:</p>
          <div className="space-y-4 mx-4">
            <div className="flex items-center">
              <TextListBox
                id="condition"
                values={conditions}
                label="Condition"
                onChange={() => { }}
                defaultValue={1}
              />
            </div>
            <div className="flex items-center">
              <TextListBox
                id="finishes"
                values={finishes}
                label="Finish"
                onChange={() => { }}
                defaultValue={1}
              />
            </div>
          </div>
          <p>Single value (no dropdown):</p>
          <div className="space-y-4 mx-4">
            <div className="flex items-center">
              <TextListBox
                id="finish"
                values={[
                  { id: 3, name: "E", value: "etched" },
                ]}
                label="Finish"
                onChange={() => { }}
              />
            </div>
            <div className="flex items-center">
              <TextListBox
                id="language"
                values={[
                  { id: 1, name: "en", value: "English", type: "language" },
                ]}
                label="Language"
                onChange={() => { }}
              />
            </div>
          </div>
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
        <Accordion title={<h3 className="h2">Collected List Item</h3>}>
          <CollectedListItem
            id="716c415e-5eb8-4644-ac64-5ba7c3f0ea65"
            finish="etched"
            quantity={3}
            condition="NM"
            language="EN"
          />
        </Accordion>
        <Accordion title={<h3 className="h2">Prints List Item</h3>}>
          <PrintsListItem
            collected={[
              {
                finish: "foil",
                count: 1,
              },
              {
                finish: "nonfoil",
                count: 0
              },
              {
                finish: "etched",
                count: 0
              },
            ]}
            collector_number={475}
            image="https://cards.scryfall.io/normal/front/5/4/54ced5cf-b51a-4dab-97f7-50fb18e5c463.jpg?1631666677"
            setName="Modern Horizons 2"
            id="54ced5cf-b51a-4dab-97f7-50fb18e5c463"
          />
        </Accordion>
        <Accordion title={<h3 className="h2">Search Result List Item</h3>}>
          <SearchResultListItem group={groupedCardData[0]} />
        </Accordion>
        <Accordion title={<h3 className="h2">Search Result Image Item</h3>}>
          <div className="w-72">
            <SearchResultImageItem card={defaultCardData} />
          </div>
        </Accordion>
        <Accordion title={<h3 className="h2">Table</h3>}>
          <Table headers={collectedCardsAsListHeaderData} data={collectedCardsAsListData} key={"table"} />
        </Accordion>
      </Accordion>

      <Accordion title={<h2 className="h1">Organisms</h2>}>
        <Accordion title={<h3 className="h2">Header</h3>}>
          <Header />
        </Accordion>
        <Accordion title={<h3 className="h2">Footer</h3>}>
          <Footer />
        </Accordion>
        <Accordion title={<h3 className="h2">Cardname Search Form</h3>}>
          <CardnameSearchForm />
        </Accordion>
        <Accordion title={<h3 className="h2">Set Card</h3>}>
          {exampleSetCardData && <SetCard set={exampleSetCardData} />}
          <SetCardExtended setData={exampleExtendedSetCardData} />
        </Accordion>
        <Accordion title={<h3 className="h2">Add To Collection</h3>}>
          <AddToCollection
            card={defaultCardData}
            languages={convertLanguageData(defaultOtherLanguagesList)}
          />
        </Accordion>
        <Accordion title={<h3 className="h2">Collected List</h3>}>
          <CollectedList collected={[]} />
          <CollectedList collected={collectedCardData} />
        </Accordion>
        <Accordion title={<h3 className="h2">Prints</h3>}>
          <Prints prints={[]} />
          <Prints prints={twoPrintings} />
          <Prints prints={moreThenTenPrintings} />
        </Accordion>
        <Accordion title={<h3 className="h2">Search Results</h3>}>
          <SearchResults
            searchResults={searchResultsData}
            groupedCards={groupedCardData}
          />
        </Accordion>
      </Accordion>

      <Accordion title={<h2 className="h1">Pages</h2>}>
        <Accordion title={<h3 className="h2">Home Page</h3>}>
          <div className="border border-dark">
            <HomePage />
          </div>
        </Accordion>
        <Accordion title={<h3 className="h2">Collection Page</h3>}>
          <div className="border border-dark">
            <CollectionPage />
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
