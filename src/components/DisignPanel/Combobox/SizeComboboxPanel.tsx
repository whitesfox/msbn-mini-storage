/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMemo, useRef, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { IoMdArrowDropdown } from "react-icons/io";
import { usePlacement, useStoreSize } from "store";
import { useLeanTo } from "store/useLeanTo";
import {
  leanToLengthSizeList,
  leanToLengthSizeValueList,
} from "assets/dataList";

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
  const { length, bayLength, setLeanToDropHeigth } = useStoreSize();
  const { placement } = usePlacement();
  const { leanToData, updateLeanToData } = useLeanTo();
  const selectRef = useRef<any>();
  const lLengthSizeList: Array<TdataList> = leanToLengthSizeList();
  const lLengthSizeValueList: Array<TdataList> = leanToLengthSizeValueList();

  const filtereddataList = useMemo(() => {
    if (type === "leantoinsetbaylength") {
      let leanToNum = NaN;
      if (index !== undefined) {
        if (placement[index] === "Left Endwall") leanToNum = 0;
        if (placement[index] === "Right Endwall") leanToNum = 1;
        if (placement[index] === "Front Sidewall") leanToNum = 2;
        if (placement[index] === "Back Sidewall") leanToNum = 3;
      }
      if (leanToNum >= 0) {
        const listArray = Array.from(
          { length: leanToData[leanToNum].lLength - 29 },
          () => 0,
        ).map((_, index) => {
          return {
            id: index + 1,
            val: index + 10,
          };
        });
        return listArray;
      }
    } else {
      return dataList;
    }
    return [];
  }, [dataList, index, leanToData, placement, type]);

  const sizeValue = useMemo(() => {
    if (type === "leantoinsetbaylength") {
      let leanToNum = NaN;
      if (index !== undefined) {
        if (placement[index] === "Left Endwall") leanToNum = 0;
        if (placement[index] === "Right Endwall") leanToNum = 1;
        if (placement[index] === "Front Sidewall") leanToNum = 2;
        if (placement[index] === "Back Sidewall") leanToNum = 3;
      }
      if (leanToNum >= 0) {
        return leanToData[leanToNum].lInsetBayLength;
      }
    } else {
      return valueProps;
    }
    return 0;
  }, [index, leanToData, placement, type, valueProps]);

  const leanToLengthSizeValue = useMemo(() => {
    let value = "";
    if (type === "leantolength") {
      lLengthSizeValueList.map((item, index) => {
        if (item.val === valueProps) {
          value = lLengthSizeList[index].val + "";
        }
      });
    }
    return value;
  }, [lLengthSizeList, lLengthSizeValueList, type, valueProps]);

  const calcSelectedNmber = () => {
    if (panelName === "Width" || panelName === "Length") {
      if (type === "leantowidth") {
        return Math.round(sizeValue) - 8;
      } else {
        return Math.round(sizeValue) - 20;
      }
    }
    if (panelName === "Eave Height") return Math.round(sizeValue) - 8;
    if (panelName === "Drop height") return Math.round(sizeValue);
    if (panelName === "Eave overhang" || panelName === "Gable overhang")
      return Math.round(sizeValue);
    if (panelName === "Inset bay length") return Math.round(sizeValue) - 10;
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
            let leanToNum = NaN;
            if (index !== undefined) {
              if (placement[index] === "Left Endwall") leanToNum = 0;
              if (placement[index] === "Right Endwall") leanToNum = 1;
              if (placement[index] === "Front Sidewall") leanToNum = 2;
              if (placement[index] === "Back Sidewall") leanToNum = 3;
            }
            if (event) {
              switch (type) {
                case "insetbaylength":
                  Number(event.val) < length - 19
                    ? setValue(event.val, "", index)
                    : () => {};
                  // costCalculation(type, event.val, mainKey);
                  break;
                case "mainlength":
                  setValue(event.val, "", index);
                  // costCalculation(type, event.val, mainKey);
                  break;
                case "mainwidth":
                  setValue(event.val, "", index);
                  // costCalculation(type, event.val, mainKey);
                  break;
                case "leantowidth":
                  setValue(event.val, "", index);
                  // costCalculation(type, event.val, mainKey);
                  break;
                case "leantolength":
                  setValue(event.val, "", index);
                  // costCalculation(type, event.val, mainKey);
                  break;
                case "leantodropheight":
                  setValue(event.val, "", index);
                  // costCalculation(type, event.val, mainKey);
                  if (typeof event.val === "number")
                    setLeanToDropHeigth({
                      val: event.val,
                      valueKey: leanToNum,
                    });
                  break;
                case "leantoinsetbaylength":
                  setValue(event.val, index, "Inset Bay");
                  break;
                case "eaveoverhang":
                  setValue(event.val);
                  break;
                case "gableoverhang":
                  setValue(event.val);
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
              {type === "leantolength" ? (
                <span className="text-base">
                  {leanToLengthSizeValue
                    ? leanToLengthSizeValue
                    : leanToLengthSizeValue}
                </span>
              ) : (
                <span className="text-base">
                  {sizeValue ? Math.round(sizeValue) + " '" : 0}
                </span>
              )}
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
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {type === "leantolength"
                            ? items.val
                            : items.val + " '"}
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
