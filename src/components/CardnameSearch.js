import React, { useState, useEffect } from 'react'

export default function CardnameSearch() {
    const [cardNames, setCardNames] = useState("")

    useEffect(() => {
        fetch("https://api.scryfall.com/catalog/card-names")
            .then((res) => res.json())
            .then((json) => setCardNames(json))
    }) //TODO: do something with cardnames
    
  return (
      <div>
          CardnameSearch
          <p>{cardNames !== "" && cardNames.data}</p>
      </div>
  )
}
