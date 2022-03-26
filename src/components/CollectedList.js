import React from 'react'
import CollectedListItem from './CollectedListItem'

export default function CollectedList() {
    return (
        <div className='py-4'>
            <div id="collected list header" className='bg-primary text-white py-1 px-2'>
                Collected
            </div>
            <CollectedListItem finish={"foil"} amount={1} condition={"nm"} language={"fr"} />
        </div>
    )
}
