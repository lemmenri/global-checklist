import React from "react";

export function ExternalLink({ href, externalParty, imageLocation }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex border border-dark rounded-xl px-4 py-1 hover:underline hover:cursor-pointer"
    >
      <img
        // crossorigin="anonymous"
        className="object-contain w-4 h-4 mr-2 self-center"
        src={imageLocation}
        alt={`${externalParty} icon`}
      />
      {`Open on ${externalParty}`}
    </a>
  );
}
