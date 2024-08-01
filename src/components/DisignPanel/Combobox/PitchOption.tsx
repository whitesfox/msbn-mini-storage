/* eslint-disable react-hooks/exhaustive-deps */
import { useStoreSize } from "store";
import { IoMdArrowDropdown } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { useLeanTo } from "store/useLeanTo";

interface PitchOptionProps {
  valueProps: string;
  type: string;
  wall: string;
  typePitch: string;
  costCalculation: (
    panelName: string,
    eventVal: string | number,
    mainKey: string,
  ) => void;
  mainKey: string;
  indexKey?: number;
  setValue?: (val: any, type?: string, index?: number) => void;
}

const pitchOptionSizeList = Array.from({ length: 8 }, () => 0).map(
  (_, index) => {
    return {
      id: index + 1,
      val: `${index + 1} / 12`,
    };
  },
);
const leanToPitchOptionSizeList = Array.from({ length: 4 }, () => 0).map(
  (_, index) => {
    return {
      id: index + 1,
      val: `${index + 1} / 12`,
    };
  },
);

export const PitchOption = ({
  valueProps,
  type,
  wall,
  costCalculation,
  typePitch,
  mainKey,
  setValue,
  indexKey,
}: PitchOptionProps) => {
  const [query, setQuery] = useState("");
  const { width, setPitch, setLeanToPitch } = useStoreSize();
  const { leanToData } = useLeanTo();
  const selectRef = useRef<any>();

  const filteredPitch =
    query === ""
      ? pitchOptionSizeList
      : pitchOptionSizeList.filter((item) =>
          item.val
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, "")),
        );

  const leanToFilteredPitch =
    query === ""
      ? leanToPitchOptionSizeList
      : leanToPitchOptionSizeList.filter((item) =>
          item.val
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, "")),
        );
  useEffect(() => {
    if (type === "main")
      setPitch({
        id: ((width / 2) * parseInt(valueProps.substring(0, 1))) / 14,
        val: valueProps.substring(0, 1) + " / 12",
      });
  }, [width]);

  const calcSelectedNmber = () => {
    const selectedValue = parseFloat(valueProps.charAt(0));
    return selectedValue - 1;
  };

  return (
    <Combobox
      value={
        type === "main" ? pitchOptionSizeList[0] : leanToPitchOptionSizeList[0]
      }
      onChange={(event) => {
        if (event) {
          if (type === "main") {
            setPitch({
              id: (width / 2) * (event.id / 14),
              val: event.val,
            });
          }
          if (type === "leanto") {
            if (wall === "EndWallFront") {
              setLeanToPitch({
                id: leanToData[0].lWidth * (event.id / 14),
                val: event.val,
                wall: wall,
              });
            } else if (wall === "EndWallBack") {
              setLeanToPitch({
                id: leanToData[1].lWidth * (event.id / 14),
                val: event.val,
                wall: wall,
              });
            } else if (wall === "SideWallRight") {
              setLeanToPitch({
                id: leanToData[2].lWidth * (event.id / 14),
                val: event.val,
                wall: wall,
              });
            } else if (wall === "SideWallLeft") {
              setLeanToPitch({
                id: leanToData[3].lWidth * (event.id / 14),
                val: event.val,
                wall: wall,
              });
            }
          }
          costCalculation(typePitch, event.val, mainKey);
        }
      }}
    >
      <div className="min-[84px] mb-5 mt-4 w-full flex-1 select-none rounded-xl bg-[#f7f7f7] px-[21px] py-[15px] hover:cursor-pointer">
        <h3 className="px-0 pb-[7px] pt-px text-[1.2rem] font-normal leading-normal">
          Roof pitch
        </h3>
        <div className="relative mx-auto mt-2">
          <Combobox.Button className="flex w-full items-center justify-between gap-2 space-x-2 overflow-hidden rounded-[5px] border-[1px] border-[#ccc] bg-white p-[10px] text-left text-xl hover:cursor-pointer focus:outline-none sm:text-base">
            <span className="text-base">{valueProps}</span>
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
            afterLeave={() => setQuery("")}
            afterEnter={() => {
              const num = calcSelectedNmber();
              selectRef.current.scrollBy({
                top: num * 40,
              });
            }}
            className="absolute z-20 max-h-[200px] w-full overflow-auto rounded bg-white shadow-lg ring-1 ring-black/5"
          >
            <div>
              <Combobox.Options className="mt-1 flex h-full w-full flex-col overflow-auto rounded-b-md py-0 text-base shadow-lg ring-1 ring-black/5 focus:outline-1 sm:text-base">
                {type === "main"
                  ? filteredPitch.map((item) => (
                      <Combobox.Option
                        key={item.id}
                        className={({ active }) =>
                          `relative w-full cursor-default select-none p-2.5 text-left text-sm text-[#4A4A4F] ${
                            active ? "bg-zinc-100" : ""
                          }`
                        }
                        value={item}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {item.val}
                            </span>
                            {selected ? (
                              <span
                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                  active ? "text-white" : "text-teal-600"
                                }`}
                              ></span>
                            ) : null}
                          </>
                        )}
                      </Combobox.Option>
                    ))
                  : leanToFilteredPitch.map((item) => (
                      <Combobox.Option
                        key={item.id}
                        className={({ active }) =>
                          `relative w-full cursor-default select-none p-2.5 text-left text-sm text-[#4A4A4F] ${
                            active ? "bg-zinc-100" : ""
                          }`
                        }
                        value={item}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {item.val}
                            </span>
                            {selected ? (
                              <span
                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                  active ? "text-white" : "text-teal-600"
                                }`}
                              ></span>
                            ) : null}
                          </>
                        )}
                      </Combobox.Option>
                    ))}
              </Combobox.Options>
            </div>
          </Transition>
        </div>
      </div>
    </Combobox>
  );
};
