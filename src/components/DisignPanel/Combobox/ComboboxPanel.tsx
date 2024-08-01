/* eslint-disable react-hooks/rules-of-hooks */
import { Fragment, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { Combobox, Transition } from "@headlessui/react";
import { useStoreCameraControl, useStoreSize, useStyle } from "store";
import { useAction } from "store/useAction";
import { useDoorCombo } from "store/useDoor";

export interface TdataList {
  id: number | string;
  val: number | string;
}
interface ComboboxPanelPropsType {
  dataKey: number;
  doorType: string;
  panelName: string;
  valueProps: string | number;
  dataList: Array<TdataList>;
  index?: number;
  type: string;
  mainKey: string;
  costCalculation: (
    panelName: string,
    eventVal: string | number,
    mainKey: string,
  ) => void;
  setValue: (val: any, type?: string, index?: number) => void;
}

export const ComboboxPanel = ({
  dataKey,
  doorType,
  panelName,
  valueProps,
  dataList,
  index,
  type,
  mainKey,
  setValue = () => {},
  costCalculation,
}: ComboboxPanelPropsType) => {
  const { setStyle } = useStyle();

  const { eaveHeight, length } = useStoreSize();
  const [query, setQuery] = useState("");
  const { setSelectedItem } = useAction([
    "selectedBuilding",
    "setSelectedItem",
    "setSelectedBuilding",
  ]);
  const [selected] = useState(dataList[0]);
  const { cameraRef } = useStoreCameraControl();

  const filtereddataList =
    query === "" ? dataList : dataList.filter((items) => items.val);

  const { updateComboData } = useDoorCombo();

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
              if (event.val) setValue(event.val, type, index);
              if (typeof costCalculation !== "undefined")
                costCalculation(type, event.val, mainKey);
              if (panelName === "Placement") {
                if (typeof event.val === "string") {
                  updateComboData("placement", event.val, dataKey, doorType);
                }
                if (event.val === "Left Endwall") {
                  setSelectedItem("EndWallGabelFront");
                  if (mainKey === "choosewindowdoor") {
                    cameraRef.current?.setPosition(
                      ...[0, eaveHeight / 2, length * 2.7],
                      true,
                    );
                  } else {
                    cameraRef.current?.setPosition(
                      ...[0, eaveHeight / 2, length * 2.7],
                      true,
                    );
                  }
                } else if (event.val === "Right Endwall") {
                  setSelectedItem("EndWallGabelBack");
                  if (mainKey === "choosewindowdoor") {
                    cameraRef.current?.setPosition(
                      ...[0, eaveHeight / 2, length * -2.7],
                      true,
                    );
                  } else {
                    cameraRef.current?.setPosition(
                      ...[0, eaveHeight / 2, length * -2.7],
                      true,
                    );
                  }
                } else if (event.val === "Front Sidewall") {
                  setSelectedItem("SideWallRight");
                  if (mainKey === "choosewindowdoor") {
                    cameraRef.current?.setPosition(
                      ...[length * 2.7, eaveHeight / 2, 0],
                      true,
                    );
                  } else {
                    cameraRef.current?.setPosition(
                      ...[length * 2.7, eaveHeight / 2, 0],
                      true,
                    );
                  }
                } else if (event.val === "Back Sidewall") {
                  setSelectedItem("SideWallLeft");
                  if (mainKey === "choosewindowdoor") {
                    cameraRef.current?.setPosition(
                      ...[length * -2.7, eaveHeight / 2, 0],
                      true,
                    );
                  } else {
                    cameraRef.current?.setPosition(
                      ...[length * -2.7, eaveHeight / 2, 0],
                      true,
                    );
                  }
                }
              }
              if (panelName === "Building") {
                if (typeof event.val === "string") {
                  updateComboData("building", event.val, dataKey, doorType);
                }
              }
              if (panelName === "Style") {
                setStyle(`${event.val}`);
              }
            }
          }}
        >
          <div className="relative mx-auto mt-1">
            <Combobox.Button className="flex w-full items-center justify-between gap-2 space-x-2 overflow-hidden rounded-[5px] border-[1px] border-[#ccc] bg-white p-[10px] text-left text-xl hover:cursor-pointer focus:outline-none sm:text-base">
              <span className="text-base">{valueProps}</span>
              <IoMdArrowDropdown
                className={`h-5 w-5 text-gray-400 active:rotate-180`}
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
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {items.val + ""}
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
