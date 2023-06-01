import { useNavigate } from "react-router";
import CardImage from "./CardImage";
import React, { useState } from "react";

export default function Language({ language, imageOnHover = undefined, cardId = undefined, setCardId = undefined }) {
  const [isShown, setIsShown] = useState(false)

  const navigate = useNavigate();

  const goToCard = (id) => {
    setCardId != undefined && setCardId({ id })
    navigate({
      pathname: `/card/${id}`,
    });
  };

  const showLabelContainer = (language, cardId) => {
    return (
      cardId != undefined ?
        <button onClick={() => goToCard(cardId)}>
          {showLabel(language, cardId != undefined)}
        </button>
        :
        showLabel(language, cardId != undefined)
    )
  }

  return (
    imageOnHover ?
      <div
        id={`language-container-${language}`}
        className="relative"
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
      >
        <dialog open={isShown} className="bg-transparent absolute z-10 inset-y-0 right-0 translate-x-12 w-80">
          <CardImage
            className="rounded-[18px] w-96 shadow-dark shadow-md"
            src={imageOnHover}
            alt={`cardimage-${language}`}
          />
        </dialog>
        {showLabelContainer(language, cardId)}
      </div>
      :
      showLabelContainer(language, cardId)
  );
}

function showLabel(language, hasCardId) {
  return (
    <p
      id={`language-label-${language}`}
      className={`bg-dark font-medium text-center text-light px-1 my-0.5 rounded border border-dark print:text-dark print:bg-light ${hasCardId ? "cursor-pointer" : ""}`}
    >
      {language.toUpperCase()}
    </p>
  )
}