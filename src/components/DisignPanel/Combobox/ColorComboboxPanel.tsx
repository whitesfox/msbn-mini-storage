import { Fragment, useRef, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { Combobox, Transition } from "@headlessui/react";
import { colorSetting } from "assets/colorList";

interface TdataList {
  value: string;
  label: string;
}

interface ColorComboboxPanelPropsType {
  panelName: string;
  valueProps: string | number;
  dataList: Array<TdataList>;
  type: string;
  mainKey: string;
  costCalculation: (
    panelName: string,
    eventVal: string | number,
    mainKey: string,
  ) => void;

  setValue?: (value1: string, value2: string) => void;
}

export const ColorComboboxPanel = ({
  panelName,
  valueProps,
  dataList,
  type,
  mainKey,
  costCalculation,
  setValue = () => {},
}: ColorComboboxPanelPropsType) => {
  const [query, setQuery] = useState("");
  const [selected] = useState(dataList[0]);
  const selectRef = useRef<any>();

  const filtereddataList =
    query === "" ? dataList : dataList.filter((items) => items.label);

  const calcSelectedNmber = () => {
    const selectedValue = dataList.findIndex(
      (item) => item.label === valueProps,
    );
    return selectedValue;
  };

  return (
    <>
      <div className="min-[84px] mb-5 mt-4 w-full flex-1 select-none rounded-xl bg-[#f7f7f7] px-[21px] py-[15px] hover:cursor-pointer">
        <h3 className="px-0 pb-[7px] pt-px text-[1.2rem] font-normal leading-normal">
          {panelName}
        </h3>

        <Combobox
          value={selected}
          onChange={(event: any) => {
            if (event.label) setValue(event.value, event.label);
            // costCalculation(type, event.label, mainKey);
          }}
        >
          <div className="relative mx-auto mt-1">
            <Combobox.Button className="flex w-full items-center justify-between gap-2 space-x-2 overflow-hidden rounded-[5px] border-[1px] border-[#ccc] bg-white p-[10px] text-left text-xl hover:cursor-pointer focus:outline-none sm:text-base">
              <span className="text-base">{valueProps}</span>
              <IoMdArrowDropdown
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
            <Transition
              as={Fragment}
              ref={selectRef}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => {
                setQuery("");
              }}
              afterEnter={() => {
                const num = calcSelectedNmber();
                selectRef.current.scrollBy({
                  top: num * 44,
                });
              }}
            >
              <div className="absolute z-20 max-h-[200px] w-full overflow-auto rounded bg-white shadow-lg ring-1 ring-black/5">
                <Combobox.Options className="mt-1 flex h-full w-full flex-col items-center justify-between overflow-auto rounded-b-md py-0 text-xl shadow-lg ring-1 ring-black/5 focus:outline-1 sm:text-base">
                  {filtereddataList.map((items, index) => (
                    <Combobox.Option
                      key={index}
                      className={({ active }) =>
                        `relative w-full cursor-default select-none p-2.5 text-left text-sm text-[#4A4A4F] ${
                          active ? "bg-zinc-100" : ""
                        }`
                      }
                      value={items}
                    >
                      {({ selected }) => (
                        <div className="flex flex-1 justify-between">
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {items.label}
                          </span>
                          <div
                            className="h-6 w-6 rounded-full"
                            style={{ backgroundColor: items.value }}
                          ></div>
                        </div>
                      )}
                    </Combobox.Option>
                  ))}
                </Combobox.Options>
              </div>
            </Transition>
          </div>
        </Combobox>
      </div>
    </>
  );
};
