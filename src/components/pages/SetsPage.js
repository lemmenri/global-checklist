import React, { useEffect, useState } from "react";
import { getCollectionCount } from "../../scripts/CardCounts";
import { getSetList, getSetTypes } from "../../scripts/ScryfallQueries";
import TextListBox from "../ListBox";
import { Loading } from "../Loading";
import SetCard from "../SetCard";

export default function SetsPage() {
  document.title = "MTG Library - Sets";

  const [setList, setSetList] = useState(undefined);
  const [totalCardCount] = useState(getCollectionCount());
  const [setTypes, setSetTypes] = useState(undefined);
  const [filteredSetList, setFilteredSetList] = useState(undefined);

  useEffect(() => {
    getSetTypes().then((res) => setSetTypes(convertSetTypes(res)));
    if (setList === undefined) {
      getSetList().then((res) => {
        setSetList(res.data);
        setFilteredSetList(res.data);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const convertSetTypes = (setTypes) => {
    const convertedSetTypes = [{ id: 1, name: "all", value: "all" }];
    let idCounter = 2;
    setTypes.forEach((type) => {
      convertedSetTypes.push({
        id: idCounter,
        name: type.replaceAll("_", " "),
        value: type,
      });
      idCounter++;
    });
    return convertedSetTypes;
  };

  const handleFilterSets = (e) => {
    e.value === "all"
      ? setFilteredSetList(setList)
      : setFilteredSetList(setList.filter((set) => set.set_type === e.value));
  };

  return (
    <div className="p-4 sm:p-8 flex-grow bg-light">
      <h1 className="display">Sets</h1>
      <p>{`${totalCardCount} cards in collection`}</p>
      {setTypes && (
        <div className="flex items-center max-w-sm py-2">
          <TextListBox
            values={setTypes}
            label="Set type"
            id="setFilter"
            onChange={handleFilterSets}
          />
        </div>
      )}
      <div className="grid gap-1 sm:gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 print:grid-cols-4">
        {filteredSetList &&
          filteredSetList.map((set) => <SetCard key={set.code} set={set} />)}
      </div>
      {!filteredSetList && <Loading />}
    </div>
  );
}
