import React, { useEffect, useState } from "react";
import { getSetList } from "../../scripts/ScryfallQueries";
import { Loading } from "../Loading";
import SetCard from "../SetCard";

export default function SetsPage() {
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
      {setList !== undefined &&
        setList.data.map((set) => <SetCard key={set.code} set={set} />)}
      {!setList && <Loading />}
    </div>
  );
}
