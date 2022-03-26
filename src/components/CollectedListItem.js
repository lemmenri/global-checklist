import React from 'react'
import Condition from './Condition'
import Language from './Language'

export default function CollectedListItem({ finish, amount, condition, language }) {
    let finishSign = ""
    switch (finish) {
        case "nonfoil":
            finishSign = "•"
            break;
        case "foil":
            finishSign = "✶"
            break;
        case "etched":
            finishSign = "E"
            break;
        case "glossy":
            finishSign = "G"
            break;
    }
    return (
        <div className='flex flex-wrap space-x-4 py-1 px-2 border border-primary items-center'>
            <div id='finish' className='font-bold'>{finishSign}</div>
            <div id='amount' className=''>{amount}</div>
            <div id='condition' className=''>
                <Condition condition={condition} />
            </div>
            <div id='language' className=''>
                <Language language={language} />
            </div>
            <div id='delete' className=''>
                <button>delete</button>
            </div>
        </div>
    )
}
