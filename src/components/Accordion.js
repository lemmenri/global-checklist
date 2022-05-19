import { Transition } from "@headlessui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import React, { useState } from "react";

export default function Accordion({ title, children, opened }) {
  const [isOpen, setIsOpen] = useState(opened);

  return (
    <div className="">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="border border-x-0 border-t-0 border-dark p-2 flex w-full items-center hover:cursor-pointer"
        id="accordion-title"
      >
        {!isOpen && (
          <ChevronDownIcon className="w-6 h-6 pr-2" aria-hidden="true" />
        )}
        {isOpen && (
          <ChevronUpIcon className="w-6 h-6 pr-2" aria-hidden="true" />
        )}
        {title}
      </div>
      <Transition
        show={isOpen}
        enter="transition ease-in-out duration-500 transform"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transition ease-in-out duration-500 transform"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        <div className="p-2" id="accordion-content">
          {children}
        </div>
      </Transition>
    </div>
  );
}

Accordion.defaultProps = {
  opened: false,
};
