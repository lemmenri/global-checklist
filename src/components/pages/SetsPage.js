import React, { useEffect, useState } from "react";
import { getSetList } from "../../scripts/ScryfallQueries";
import { Loading } from "../Loading";
import SetCard from "../SetCard";

export default function SetsPage() {
  document.title = "MTG-Library - Sets";

  const [setList, setSetList] = useState(undefined);

  useEffect(() => {
    if (setList === undefined) {
      getSetList().then((res) => {
        setSetList(res);
      });
    }
  }, []);

  return (
    <div className="p-4 sm:p-8 flex-grow bg-light">
      Sets Page - a list of sets
      <div className="grid gap-1 sm:gap-2 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 print:grid-cols-4">
        {setList !== undefined &&
          setList.data.map((set) => <SetCard key={set.code} set={set} />)}
      </div>
      {!setList && <Loading />}
    </div>
  );
}
