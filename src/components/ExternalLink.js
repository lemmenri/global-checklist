import React from "react";

export function ExternalLink({ href, externalParty, imageLocation }) {
    return <a
        href={href}
        target='_blank' rel="noopener noreferrer"
        className='flex border border-dark rounded-xl px-4 py-1 hover:underline hover:cursor-pointer'
    >
        <img scr={imageLocation} alt={`${externalParty} icon`} />
        {`Open on ${externalParty}`}
    </a>;
}
