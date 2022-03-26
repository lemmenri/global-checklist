import React from 'react'

export default function Condition({ condition }) {
    return (
        <p
            id={`language-label ${condition}`}
            className={`bg-${condition.toUpperCase()} font-medium text-light px-1 my-0.5 rounded`}
        >
            {condition.toUpperCase()}
        </p>
    )
}
