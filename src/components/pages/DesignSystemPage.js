import React from "react";
import Condition from "../Condition";
import Language from "../Language";
import SetCard from "./SetCard";

const exampleSetCardData = {
  object: "set",
  id: "a4a0db50-8826-4e73-833c-3fd934375f96",
  code: "aer",
  mtgo_code: "aer",
  arena_code: "aer",
  tcgplayer_id: 1857,
  name: "Aether Revolt",
  uri: "https://api.scryfall.com/sets/a4a0db50-8826-4e73-833c-3fd934375f96",
  scryfall_uri: "https://scryfall.com/sets/aer",
  search_uri:
    "https://api.scryfall.com/cards/search?order=set&q=e%3Aaer&unique=prints",
  released_at: "2017-01-20",
  set_type: "expansion",
  card_count: 194,
  printed_size: 184,
  digital: false,
  nonfoil_only: false,
  foil_only: false,
  block_code: "kld",
  block: "Kaladesh",
  icon_svg_uri:
    "https://c2.scryfall.com/file/scryfall-symbols/sets/aer.svg?1650254400",
};

export default function DesignSystemPage() {
  return (
    <div className="p-4 sm:p-8 flex-grow bg-light">
      <h1 className="text-3xl my-4">Design System</h1>
      <h2 className="text-2xl my-4">Atoms</h2>
      <h3 className="text-xl my-4">Text</h3>
      <p>Todo</p>
      <h3 className="text-xl my-4">Colors</h3>
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

      <h3 className="text-xl my-4">Labels</h3>
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
      <h2 className="text-2xl my-4">Molecules</h2>
      <h2 className="text-2xl my-4">Organisms</h2>
      <h3 className="text-xl my-4">Set Card</h3>
      <SetCard set={exampleSetCardData} />
    </div>
  );
}
