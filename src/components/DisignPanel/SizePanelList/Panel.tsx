import { Fragment, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { Combobox, Transition } from "@headlessui/react";

type TSizeList = {
  id: number;
  val: number;
};
type TSizePanelProps = {
  sizeName: string;
  valueProps: number;
  sizeList: Array<TSizeList>;
  setValue: (value: number) => void;
};

export const SizePanel = ({
  sizeName,
  valueProps,
  sizeList,
  setValue,
}: TSizePanelProps) => {
  const [query, setQuery] = useState("");
  const [selected] = useState(sizeList[0]);

  const filteredsizeList =
    query === "" ? sizeList : sizeList.filter((items) => items.val);

  return (
    <>
      <div className="flex-1 select-none">
        <div className="font-bold">{sizeName}</div>

        <Combobox
          value={selected}
          onChange={(event) => {
            setValue(event.val);
          }}
        >
          <div className="relative mx-auto mt-1">
            <Combobox.Button className="flex w-full items-center justify-between gap-2 space-x-2 overflow-hidden rounded-lg bg-white p-3 text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
              <p>{valueProps + "'"}</p>
              <IoMdArrowDropdown
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setQuery("")}
            >
              <div className="absolute max-h-[200px] w-full overflow-auto bg-white shadow-lg ring-1 ring-black/5">
                <Combobox.Options className="mt-1 flex h-full w-full flex-col items-center justify-between overflow-auto rounded-b-md py-0 text-base shadow-lg ring-1 ring-black/5 focus:outline-1 sm:text-sm">
                  {filteredsizeList.length === 0 && query !== "" ? (
                    <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                      Nothing
                    </div>
                  ) : (
                    filteredsizeList.map((items, index) => (
                      <Combobox.Option
                        key={index}
                        className={({ active }) =>
                          `relative w-full cursor-default select-none py-2 pl-3 pr-2 text-left ${
                            active ? "bg-slate-500 text-white" : "text-gray-900"
                          }`
                        }
                        value={items}
                      >
                        {({ selected }) => (
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {items.val + "'"}
                          </span>
                        )}
                      </Combobox.Option>
                    ))
                  )}
                </Combobox.Options>
              </div>
            </Transition>
          </div>
        </Combobox>
      </div>
    </>
  );
};
