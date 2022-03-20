import React, { useState, useEffect } from 'react'
import { Combobox } from '@headlessui/react'
import { SearchIcon } from '@heroicons/react/outline'

const maxDisplayedResults = 5

export default function CardnameSearch() {
    const [cardNames, setCardNames] = useState("")
    const [selected, setSelected] = useState(void 0);
    const [query, setQuery] = useState("")

    useEffect(() => {
        fetch("https://api.scryfall.com/catalog/card-names")
           .then((res) => res.json())
           .then((json) => setCardNames(json.data))
    }, [])

    const filteredCardNames = query ?
        cardNames.filter((cardName) => cardName.toLowerCase().includes(query.toLowerCase()))
        : []

    return (
        <Combobox
            value={selected}
            onChange={setSelected}
            as="div"
            className="rounded-lg overflow-hidden border border-dark"
        >
            <div className='flex items-center'>
                <Combobox.Input
                    onChange={(event) => {
                        setQuery(event.target.value)
                    }}
                    className=" text-sm w-full bg-light border-0 active:outline-none active:border-0"
                    placeholder="Search cards..."
                    id="cardSearch"
                    name="q"
                    autoComplete="off"
                />
                <div className='text-light bg-dark p-2'>
                    <SearchIcon className='h-6 w-6' />
                </div>
            </div>
            {filteredCardNames.length > 0 && 
                <Combobox.Options static className=" text-sm max-h-72 overflow-y-auto">
                    {Object.values(filteredCardNames.slice(0, maxDisplayedResults)).map((cardName, index) => (
                        <Combobox.Option key={index} value={cardName}>
                            {({ active }) => (
                                <div className={`px-4 py-2 ${active ? 'bg-dark text-light' : ''} hover:cursor-pointer`}>{cardName}</div>
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
