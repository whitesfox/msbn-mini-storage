/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMemo, useRef, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { IoMdArrowDropdown } from "react-icons/io";

type TdataList = {
  id: number | string;
  val: number | string;
};
type TPanelProps = {
  panelName: string;
  valueProps: number;
  dataList: Array<TdataList>;
  type: string;
  mainKey: string;
  index?: number;
  costCalculation: (
    panelName: string,
    eventVal: string | number,
    mainKey: string,
  ) => void;
  setValue?: any;
};

export const SizeComboboxPanel = ({
  panelName,
  valueProps,
  dataList,
  costCalculation,
  type,
  mainKey,
  index,
  setValue = () => {},
}: TPanelProps) => {
  const [selected] = useState(dataList[0]);
  const selectRef = useRef<any>();

  const calcSelectedNmber = () => {
    switch (panelName) {
      case "Width":
        return Math.round(valueProps) - 10;
      case "Length":
        return Math.round(valueProps) - 20;
      case "Eave height":
        return Math.round(valueProps) - 8;
      default:
        break;
    }
    return 0;
  };

  return (
    <>
      <div className="min-[84px] mb-5 mt-4 w-full flex-1 select-none rounded-xl bg-[#f7f7f7] px-[21px] py-[15px] hover:cursor-pointer">
        <h3 className="px-0 pb-[7px] pt-px text-[1.2rem] font-normal leading-normal">
          {panelName}
        </h3>

        <Combobox
          value={selected}
          onChange={(event) => {
            if (event) {
              switch (type) {
                case "mainlength":
                  setValue(event.val, "", index);
                  break;
                case "mainwidth":
                  setValue(event.val, "", index);
                  break;
                case "eaveheight":
                  setValue(event.val);
                  break;
                default:
                  break;
              }
            }
          }}
        >
          <div className="relative mx-auto mt-1">
            <Combobox.Button className="flex w-full items-center justify-between gap-2 space-x-2 overflow-hidden rounded-[5px] border-[1px] border-[#ccc] bg-white p-[10px] text-left text-xl hover:cursor-pointer focus:outline-none sm:text-base">
              {
                <span className="text-base">
                  {valueProps ? Math.round(valueProps) + " '" : 0}
                </span>
              }
              <IoMdArrowDropdown
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
            <Transition
              as={"div"}
              ref={selectRef}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterEnter={() => {
                const num = calcSelectedNmber();
                selectRef.current.scrollBy({
                  top: num * 40,
                });
              }}
              className="absolute z-20 max-h-[200px] w-full overflow-auto rounded bg-white shadow-lg ring-1 ring-black/5"
            >
              <div className="">
                <Combobox.Options className="mt-1 flex h-full w-full flex-col items-center justify-between overflow-auto rounded-b-md py-0 text-xl shadow-lg ring-1 ring-black/5 focus:outline-1 sm:text-base">
                  {dataList.map((items, index) => (
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
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {items.val + " '"}
                        </span>
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
