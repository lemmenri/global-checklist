import React from 'react'
import { useState } from 'react'
import CollectedListItem from './CollectedListItem'

export default function CollectedList({ collected }) {
    const [hasCard, setHasCard] = useState(false)
    return (
        <div className='py-4 max-w-sm'>
            <div id="collected list header" className='bg-primary text-white py-1 px-2'>
                Collected
            </div>
            {Object.keys(collected).map(language => {
                return Object.keys(collected[language]).map(finish => {
                    if (collected[language][finish] > 0) {
                        if (!hasCard) { setHasCard(true) }
                        return <CollectedListItem
                            key={`${language}${finish}`}
                            finish={finish}
                            amount={collected[language][finish]}
                            condition="NM" language={language}
                        />
                    }
                    return undefined
                })
            })}
            {!hasCard && <div className='py-1 px-2 border border-primary'>No copies listed.</div>}
        </div>
    )
}
