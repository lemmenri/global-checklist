import React, { useState } from "react";
import { Loading } from "./Loading";

export default function CardImage({ className, src, alt }) {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <div>
      {!isLoaded && (
        <div>
          <Loading />
        </div>
      )}
      <img
        className={`${className} ${isLoaded ? "visible" : "invisible"}`}
        src={src}
        alt={alt}
        name="cardImage"
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
}
