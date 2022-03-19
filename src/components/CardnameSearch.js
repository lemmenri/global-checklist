import React, { useState, useEffect } from 'react'
import { Combobox } from '@headlessui/react'
import { SearchIcon, XIcon } from '@heroicons/react/outline'

const testDataCardNames = 
    [
        "Zuberi, Golden Feather",
        "Zulaport Chainmage",
        "Zulaport Cutthroat",
        "Zulaport Duelist",
        "Zulaport Enforcer",
        "Zuo Ci, the Mocking Sage",
        "Zur the Enchanter",
        "Zur's Weirding"
    ]

const maxDisplayedResults = 5

export default function CardnameSearch() {
    const [cardNames, setCardNames] = useState("")
    const [selected, setSelected] = useState(void 0);
    const [query, setQuery] = useState("")

    useEffect(() => {
        fetch("https://api.scryfall.com/catalog/card-names")
           .then((res) => res.json())
           .then((json) => setCardNames(json.data))
        //setCardNames(testDataCardNames)
    }, []) //TODO: do something with cardnames

    const filteredCardNames = query ?
        cardNames.filter((cardName) => cardName.toLowerCase().includes(query.toLowerCase()))
        : []
 
    const handleClear = () => {
        setQuery("")
        setSelected(void 0)
    }

    return (
        <Combobox
            value={selected}
            onChange={setSelected}
            as="div"
            className="bg-white rounded-xl shadow-2xl overflow-hidden"
        >
            <div className='flex items-center'>
                <SearchIcon className='h-6 w-6 m-2' />
                <Combobox.Input
                    onChange={(event) => {
                        setQuery(event.target.value)
                    }}
                    className="rounded-xl border-0 text-sm w-full"
                    placeholder="Search cards..."
                    id="cardSearch"
                    name="q"
                    autoComplete="off"
                />
                <button
                    className='m-2 rounded hover:cursor-pointer hover:bg-gray-200 active:bg-gray-200'
                    id='clear-combobox-button'
                    onClick={handleClear}
                >
                    <XIcon className='h-6 w-6' />
                </button>
            </div>
            {filteredCardNames.length > 0 && 
                <Combobox.Options static className="py-4 text-sm max-h-72 overflow-y-auto">
                    {Object.values(filteredCardNames.slice(0, maxDisplayedResults)).map((cardName, index) => (
                        <Combobox.Option key={index} value={cardName}>
                            {({ active }) => (
                                <div className={`px-4 py-2 ${active ? 'bg-gray-800 text-white' : ''} hover:cursor-pointer`}>{cardName}</div>
                            )}
                        </Combobox.Option>
                    ))}
                </Combobox.Options>
            }
            {query && filteredCardNames.length === 0 && 
                <p className='text-sm px-4 py-2'>No results found.</p>
            }
        </Combobox>
    )
}
