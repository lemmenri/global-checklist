import React from 'react'
import Condition from './Condition'
import Language from './Language'
import { PencilAltIcon } from '@heroicons/react/outline'

export default function AddToCollection() {
    return (
        <div className='py-4 max-w-sm'>
            <div id="add to collection header" className='bg-primary text-white py-1 px-2'>
                Add to collection
            </div>
            <div className='flex flex-wrap py-1 px-4 border border-primary justify-between items-center'>
                <div className='flex flex-wrap space-x-4 items-center'>
                    <div id='finish' className='font-bold w-10 text-center outline outline-1 rounded'>{"•"}</div>
                    <div id='amount' className='w-10 text-center outline outline-1 rounded'>{"1"}x</div>
                    <div id='condition' className='w-10'>
                        <Condition condition={"NM"} />
                    </div>
                    <div id='language' className='w-10'>
                        <Language language={"EN"} />
                    </div>
                </div>
                <div id='edit' className='w-10 text-center'>
                    <button className='p-1 rounded hover:text-light hover:bg-dark'>
                        <PencilAltIcon className='h-6 w-6' />
                    </button>
                </div>
            </div>
        </div>
    )
}
