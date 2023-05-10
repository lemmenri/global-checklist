import CardImage from "./CardImage";
import React, { useState } from "react";

export default function Language({ language, imageOnHover = undefined }) {
  const [isShown, setIsShown] = useState(false)
  return (
    imageOnHover ?
      <div
        id={`language-container-${language}`}
        className="relative"
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
      >
        <dialog open={isShown} className="bg-transparent absolute z-10 inset-y-0 right-0 translate-x-12 w-64">
          <CardImage
            className="rounded-[9px] w-64 shadow-dark shadow-md"
            src={imageOnHover}
            alt={`cardimage-${language}`}
          />
        </dialog>
        <p
          id={`language-label-${language}`}
          className="bg-dark font-medium text-center text-light px-1 my-0.5 rounded border border-dark print:text-dark print:bg-light"
        >
          {language.toUpperCase()}
        </p>
      </div>
      :
      <p
        id={`language-label-${language}`}
        className="bg-dark font-medium text-center text-light px-1 my-0.5 rounded border border-dark print:text-dark print:bg-light"
      >
        {language.toUpperCase()}
      </p>
  );
}
