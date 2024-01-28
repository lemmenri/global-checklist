import { useNavigate } from "react-router";
import React, { useState, useEffect } from "react";
import Condition from "./Condition";
import Language from "./Language";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";

function getNumberAtStart(str) {
    if (startsWithNumber(str)) {
        return Number(str.match(/^\d+/)[0]);
    }

    return null;
}

function startsWithNumber(str) {
    return /^\d/.test(str);
}

export default function Table({ headers, data, key }) {
    console.log("render table")
    console.log(data)
    const [currentSortOrder, setCurrentSortOrder] = useState({
        column: headers[0].id,
        order: "asc"
    })
    const [sortedData, setSortedData] = useState(data.sort(sortByColumn))

    useEffect(() => {
        setSortedData(sortedData => (sortedData.sort(sortByColumn)))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentSortOrder])

    function sortByColumn(a, b) {
        const valueA = getNumberAtStart(a[currentSortOrder.column].toString())
        const valueB = getNumberAtStart(b[currentSortOrder.column].toString())
        if (valueA !== null && valueB !== null) {
            return currentSortOrder.order === "asc" ? valueA - valueB : valueB - valueA
        }
        const nameA = a[currentSortOrder.column].toString().toLowerCase();
        const nameB = b[currentSortOrder.column].toString().toLowerCase();
        let sortValue = 0;
        if (nameA < nameB) { sortValue = -1; }
        if (nameA > nameB) { sortValue = 1; }
        if (currentSortOrder.order === "dec") { sortValue = -sortValue; }
        return sortValue;
    }

    function sortColumn(column) {
        const newSortOrder = (column === currentSortOrder.column && currentSortOrder.order === "asc") ? "dec" : "asc"
        setCurrentSortOrder({
            column: column,
            order: newSortOrder
        })
    }

    const navigate = useNavigate();
    const goToPrinting = (id) => {
        navigate({
            pathname: `/card/${id}`,
        });
    };

    return (
        <table key={key} id={key} className="table-auto border-collapse border border-dark bg-primary text-white py-1 px-2 w-full">
            <thead>
                <tr>
                    {headers.map((column) => (
                        <th id={column.id} key={column.id} className="border border-primary font-normal text-left px-2">
                            <button onClick={() => sortColumn(column.id)} id={`sort-${column.label}`} className={`flex hover:underline`}>
                                {column.label} {column.id === currentSortOrder.column && (
                                    currentSortOrder.order === "asc"
                                        ? (
                                            <ChevronUpIcon className="w-6 h-6 pr-2" aria-hidden="true" />
                                        ) : (
                                            <ChevronDownIcon className="w-6 h-6 pr-2" aria-hidden="true" />
                                        )
                                )}
                            </button>
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className="bg-light text-dark">
                {sortedData.map((row, index) => (
                    <tr key={`row-${index}`} id={`row-${index}`}>
                        {headers.map((column) => (
                            <td
                                id={`${column.id}-${index}`}
                                key={`${column.id}-${index}`}
                                className="border border-x-0 border-primary py-1 px-2"
                            >
                                {
                                    column.id === "name" ? (
                                        <button onClick={() => goToPrinting(row.id)} className={`text-left hover:underline`}>
                                            {row[column.id]}
                                        </button>
                                    ) : (column.id === "language" ? (
                                        <Language language={row[column.id]} />
                                    ) : (column.id === "condition" ? (
                                        <Condition condition={row[column.id]} />
                                    ) : (column.id === "finish" ? (
                                        getFinishSign(row[column.id])
                                    ) : (
                                        row[column.id]
                                    ))))
                                }
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );

    function getFinishSign(finish) {
        let finishSign = "•";
        if (finish === "foil") finishSign = "✶"
        if (finish === "nonfoil") finishSign = "•"
        if (finish === "etched") finishSign = "E"
        return finishSign
    }
}
