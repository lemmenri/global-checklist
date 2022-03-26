import React from 'react'
import Condition from './Condition'
import Language from './Language'

export default function CollectedListItem({ finish, amount, condition, language }) {
    return (
        <div className='flex space-x-4 py-1 px-2 border border-primary'>
            <div id='finish'>{finish}</div>
            <div id='amount'>{amount}</div>
            <div id='condition'>
                <Condition condition={condition} />
            </div>
            <div id='language'>
                <Language language={language} />
            </div>
            <div id='delete'>
                <button>delete</button>
            </div>
        </div>
    )
}
