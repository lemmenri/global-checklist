import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

export default function MyListbox({ values, label }) {
  const [selected, setSelected] = useState(values[0]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      <Listbox.Label>{label}:</Listbox.Label>
      <div className="">
        <Listbox.Button className="relative w-full text-center pl-2 pr-6 rounded outline outline-1 focus:outline-2 cursor-default">
          <span className="block truncate">{selected.name}</span>
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
          <Listbox.Options className="absolute w-auto mt-1 overflow-auto text-base bg-light rounded-md max-h-60 outline outline-dark outline-1">
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
                    <span className={`block truncate`}>{value.name}</span>
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
