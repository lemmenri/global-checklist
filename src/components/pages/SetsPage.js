import React, { useEffect, useState } from "react";
import { getCollectionCount, getCardCountSet } from "../../scripts/CardCounts";
import { getSetList, getSetTypes } from "../../scripts/ScryfallQueries";
import CardnameSearchForm from "../CardnameSearchForm";
import TextListBox from "../ListBox";
import { Loading } from "../Loading";
import SetCard from "../SetCard";

export default function SetsPage() {
  document.title = "MTG Library - Sets";

  const [setList, setSetList] = useState(undefined);
  const [totalCardCount] = useState(getCollectionCount());
  const [setTypes, setSetTypes] = useState(undefined);
  const [filteredSetList, setFilteredSetList] = useState(undefined);
  const [filters, setFilters] = useState({ setType: 'all', setCompleteness: 'all' });

  useEffect(() => {
    getSetTypes().then((res) => setSetTypes(convertSetTypes(res)));
    if (setList === undefined) {
      getSetList().then((res) => {
        setSetList(res);
        setFilteredSetList(res);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    switch (filters.setCompleteness) {
      case "complete":
        filters.setType === "all"
          ? setFilteredSetList(setList.filter((set) => getCardCountSet(set.code) === set.card_count && set.card_count > 0))
          : setFilteredSetList(setList.filter((set) => getCardCountSet(set.code) === set.card_count && set.card_count > 0).filter((set) => set.set_type === filters.setType))
        break;
      case "partial":
        filters.setType === "all"
          ? setFilteredSetList(setList.filter((set) => getCardCountSet(set.code) > 0 && getCardCountSet(set.code) < set.card_count))
          : setFilteredSetList(setList.filter((set) => getCardCountSet(set.code) > 0 && getCardCountSet(set.code) < set.card_count).filter((set) => set.set_type === filters.setType))
        break;
      case "empty":
        filters.setType === "all"
          ? setFilteredSetList(setList.filter((set) => getCardCountSet(set.code) === 0))
          : setFilteredSetList(setList.filter((set) => getCardCountSet(set.code) === 0).filter((set) => set.set_type === filters.setType))
        break;
      case "all":
      default:
        filters.setType === "all"
          ? setFilteredSetList(setList)
          : setFilteredSetList(setList.filter((set) => set.set_type === filters.setType));
    }
  }, [filters, setList])

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

  const handleFilterSetType = (e) => {
    setFilters({ ...filters, setType: e.value })
  };

  const handleFilterSetCompleteness = (e) => {
    setFilters({ ...filters, setCompleteness: e.value })
  };

  return (
    <div className="p-4 sm:p-8 flex-grow bg-light">
      <div className="flex flex-col-reverse sm:flex-row flex-wrap-reverse justify-between">
        <h1 className="display">Sets</h1>
        <div className="self-center">
          <CardnameSearchForm />
        </div>
      </div>
      <p>{`${totalCardCount} cards in collection`}</p>
      {setTypes && (
        <>
          <div className="flex items-center max-w-sm py-1">
            <TextListBox
              values={setTypes}
              label="Set type"
              id="setFilter"
              onChange={handleFilterSetType}
            />
          </div>
          <div className="flex items-center max-w-sm py-1">
            <TextListBox
              values={[
                {
                  id: 1,
                  name: "all",
                  value: "all"
                },
                {
                  id: 2,
                  name: "complete",
                  value: "complete"
                },
                {
                  id: 3,
                  name: "partial",
                  value: "partial"
                },
                {
                  id: 4,
                  name: "empty",
                  value: "empty"
                },
              ]}
              label="Only show"
              id="completenessFilter"
              onChange={handleFilterSetCompleteness}
            />
          </div>
        </>
      )}
      <div className="grid gap-1 sm:gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 print:grid-cols-4">
        {filteredSetList &&
          filteredSetList.map((set) => <SetCard key={set.code} set={set} />)}
      </div>
      {filteredSetList && filteredSetList.length === 0 && <p>No sets to show...</p>}
      {!filteredSetList && <Loading />}
    </div>
  );
}
