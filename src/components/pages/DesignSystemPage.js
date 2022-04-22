import React, { useState, useEffect } from "react";
import { getSet } from "../../scripts/ScryfallQueries";
import Condition from "../Condition";
import Language from "../Language";
import SetCard from "../SetCard";

export default function DesignSystemPage() {
  document.title = "MTG-Library - Design System";

  const [exampleSetCardData, setExampleSetCardData] = useState(undefined);

  useEffect(() => {
    getSet("aer").then((res) => {
      setExampleSetCardData(res);
    });
  }, []);

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
      {exampleSetCardData && <SetCard set={exampleSetCardData} />}
    </div>
  );
}
