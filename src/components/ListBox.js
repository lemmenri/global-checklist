import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import Condition from "./Condition";
import Language from "./Language";

export default function TextListBox({ values, label, id, onChange }) {
  const [selected, setSelected] = useState(values[0]);

  return (
    <Listbox
      value={selected}
      onChange={(value) => {
        onChange(value);
        setSelected(value);
      }}
    >
      <Listbox.Label className="w-1/2">{`${label}:`}</Listbox.Label>
      <div
        id={`${id}-listbox`}
        className="rounded outline outline-1 focus-within:outline-2 hover:outline-2"
      >
        <Listbox.Button className="relative w-auto text-center pl-2 pr-6  cursor-default">
          <span className="block truncate">
            {selected.hasOwnProperty("type") &&
              selected.type === "condition" && (
                <Condition condition={selected.name} />
              )}
            {selected.hasOwnProperty("type") &&
              selected.type === "language" && (
                <Language language={selected.name} />
              )}
            {!selected.hasOwnProperty("type") && (
              <p className="px-1 my-0.5">{selected.name}</p>
            )}
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pointer-events-none">
            <SelectorIcon className="w-5 h-5" aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute w-auto mt-1 overflow-auto text-base bg-light rounded-md max-h-60 outline outline-dark outline-1 z-50">
            {values.map((value) => (
              <Listbox.Option
                key={value.id}
                className={({ active }) =>
                  `select-none relative py-1 pl-8 pr-2 text-center ${
                    active ? "bg-dark text-light" : ""
                  }`
                }
                value={value}
              >
                {({ selected }) => (
                  <>
                    <span className={`block truncate`}>
                      {value.hasOwnProperty("type") &&
                        value.type === "condition" && (
                          <Condition condition={value.name} />
                        )}
                      {value.hasOwnProperty("type") &&
                        value.type === "language" && (
                          <Language language={value.name} />
                        )}
                      {!value.hasOwnProperty("type") && value.name}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                        <CheckIcon className="w-5 h-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
