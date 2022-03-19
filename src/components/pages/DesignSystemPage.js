import React from 'react'

export default function DesignSystemPage() {
    return (
        <div className="p-2 sm:p-8 bg-light flex-grow">
            <h1 className="text-3xl my-4">Design System</h1>
            <h2 className="text-2xl my-4">Atoms</h2>
            <h3 className="text-xl my-4">Colors</h3>
            <p>Light Colors</p>
            <div className='flex flex-wrap'>
                <div className='m-2'>
                    <p className='text-sm'>Primary:</p>
                    <div className='h-6 w-24 bg-primary outline outline-dark'></div>
                </div>
                <div className='m-2'>
                    <p className='text-sm'>Light:</p>
                    <div className='h-6 w-24 bg-light outline outline-dark'></div>
                </div>
                <div className='m-2'>
                    <p className='text-sm'>Dark:</p>
                    <div className='h-6 w-24 bg-dark outline outline-light'></div>
                </div>
            </div>

            <p>Condition Colors</p>
            <div className='flex flex-wrap'>
                <div className='m-2'>
                    <p className='text-sm'>Mint:</p>
                    <div className='h-6 w-24 bg-MT outline outline-dark'></div>
                </div>
                <div className='m-2'>
                    <p className='text-sm'>Near Mint:</p>
                    <div className='h-6 w-24 bg-NM outline outline-dark'></div>
                </div>
                <div className='m-2'>
                    <p className='text-sm'>Excelent:</p>
                    <div className='h-6 w-24 bg-EX outline outline-dark'></div>
                </div>
                <div className='m-2'>
                    <p className='text-sm'>Good:</p>
                    <div className='h-6 w-24 bg-GD outline outline-dark'></div>
                </div>
                <div className='m-2'>
                    <p className='text-sm'>Light Played:</p>
                    <div className='h-6 w-24 bg-LP outline outline-dark'></div>
                </div>
                <div className='m-2'>
                    <p className='text-sm'>Played:</p>
                    <div className='h-6 w-24 bg-PL outline outline-dark'></div>
                </div>
                <div className='m-2'>
                    <p className='text-sm'>Poor:</p>
                    <div className='h-6 w-24 bg-PO outline outline-dark'></div>
                </div>
            </div>

        </div>
    )
}
