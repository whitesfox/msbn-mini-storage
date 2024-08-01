/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { MdDelete } from "react-icons/md";
import { SliderPanel } from "components/DisignPanel/Combobox/SliderPanel";
import { ComboboxPanel } from "components/DisignPanel/Combobox/ComboboxPanel";
import { DoorComboboxPanel } from "components/DisignPanel/Combobox/DoorComboboxPanel";
import { useStoreSize } from "store";
import { useDoorStore } from "store/useDoor";
import { doorBuildingList, placementListForLeanTo } from "assets/dataList";
import { useDoorCombo } from "store/useDoor";
import { DoorPlacementCombobox } from "components/DisignPanel/Combobox/DoorPlacementCombobox";

interface SliderStatusInfo {
  index: number;
  value: boolean;
}
interface WindowAndDoorProps {
  sliderStatus: { [key: string]: Array<boolean> };

  ItemSizeList: any;
  setPlaceMentForWindowDoor: (val: any, type?: string, index?: number) => void;
  setBuildingForWindowDoor: (val: any, type?: string, index?: number) => void;
  placementItem: { [key: string]: string };
  buildingItem: { [key: string]: string };
  placementList: any;
  deleteMultiple: (
    e: any,
    type: string,
    itemforRange: string | number,
    index: number,
    val: string | number,
    mainKey: string,
    panelName: string,
  ) => void;
  multipleItem: { [key: number]: number | string };
  multipleItemStatus: { [key: number]: boolean };
  ItemName: { [key: string]: string };
  itemNameSmall: string;
  mainKey: string;
  panelName: string;
  positionRange: { [key: string]: Array<number> };
  setMultipleItemOpenStatus: (value: { [key: number]: boolean }) => void;
  increaseCount: (type: string, index: number) => void;
  onRangeChangeHandler: (e: any, index: number, name: string) => void;
  costCalculation: (
    panelName: string,
    value: string | number,
    mainKey: string,
    booleanTypeOption?: boolean,
  ) => void;
  minMaxCalculator: (
    minOrMax: string,
    length: number,
    width: number,
    placement: string,
    type?: string,
    value?: string,
  ) => string;
  setItemName: (val: string, index: number, type: string) => void;
  setSliderStatus: (value: { [key: string]: Array<boolean> }) => void;
}

const WindowAndDoor = ({
  sliderStatus,
  ItemSizeList,
  placementItem,
  buildingItem,
  placementList,
  multipleItem,
  multipleItemStatus,
  ItemName,
  itemNameSmall,
  mainKey,
  panelName,
  positionRange,
  setSliderStatus,
  setItemName,
  setPlaceMentForWindowDoor,
  setBuildingForWindowDoor,
  deleteMultiple,
  setMultipleItemOpenStatus,
  increaseCount,
  costCalculation,
  onRangeChangeHandler,
  minMaxCalculator,
}: WindowAndDoorProps) => {
  const { width, basicLength } = useStoreSize();
  const { doorData } = useDoorStore();
  const functionToFilterData = (index: number): string | number => {
    let filterdDoorData = [] as Array<any>;
    if (doorData.length > 0) {
      filterdDoorData = doorData.filter((itm) => {
        return itm.nameForRange === itemNameSmall && itm.itemforRange === index;
      });
    }
    if (filterdDoorData[0]) {
      return filterdDoorData[0].name;
    }
    return "";
  };
  const buildingList = doorBuildingList();
  const { doorComboData, addComboData } = useDoorCombo();

  return (
    <div>
      {Object.keys(multipleItem).length === 0 && (
        <div
          className={`min-[84px] mb-5 mt-4 rounded-xl bg-[#F7F7F7] px-[21px] py-[15px] text-[1.2rem] font-normal`}
          onClick={() => {
            increaseCount(itemNameSmall, 0);
            addComboData({
              key:
                doorComboData.filter((item) => item.type === panelName).length +
                1,
              type: panelName,
              size: "",
              placement: "",
              building: "",
            });
          }}
        >
          <p className="px-0 pb-[3.2px] pt-px">
            Add {panelName.toLocaleLowerCase()}
          </p>
          <p className="px-0 pb-[7px] pt-px text-[0.9rem]">
            Select to add a {panelName.toLocaleLowerCase()}
          </p>
        </div>
      )}
      {Object.values(multipleItem).map((keysVal, index) => {
        return (
          <div key={index}>
            <div
              className={`min-[84px] group ${multipleItemStatus[+keysVal - 1] ? "bg-gray-700 text-white" : "bg-gray-100"} relative mb-5 mt-4 rounded-xl bg-[#F7F7F7] px-[21px] py-[15px] text-[1.2rem] font-normal`}
              onPointerDown={() => {
                const tempMultipleWalkDoorOpenStatus = {
                  ...multipleItemStatus,
                };
                if (tempMultipleWalkDoorOpenStatus[+keysVal - 1]) {
                  tempMultipleWalkDoorOpenStatus[+keysVal - 1] =
                    !tempMultipleWalkDoorOpenStatus[+keysVal - 1];
                } else {
                  tempMultipleWalkDoorOpenStatus[+keysVal - 1] = true;
                }

                setMultipleItemOpenStatus(tempMultipleWalkDoorOpenStatus);
              }}
            >
              <div
                className="absolute bottom-0 right-0 top-0 hidden cursor-pointer items-center rounded-r-lg bg-red-500 p-2 group-hover:flex group-hover:text-white"
                onClick={(e) => {
                  deleteMultiple(
                    e,
                    itemNameSmall,
                    keysVal,
                    index,
                    ItemName[Number(keysVal) - 1],
                    mainKey,
                    panelName,
                  );
                  doorData.length > 0 &&
                    costCalculation(
                      itemNameSmall,
                      functionToFilterData(index + 1),
                      mainKey,
                      false,
                    );
                }}
              >
                <span>
                  <MdDelete />
                </span>
              </div>
              <p className="px-0 pb-[3.2px] pt-px">
                {panelName} {index + 1}
              </p>
              <p className="px-0 pb-[7px] pt-px text-[0.9rem]">
                Click to hide or show options
              </p>
            </div>
            <div
              className={`lean-to-details ${
                multipleItemStatus[+keysVal - 1] ? "block" : "hidden"
              }`}
            >
              <DoorComboboxPanel
                index={index + 1}
                panelName={panelName}
                panelTitle="Size"
                nameForRange={itemNameSmall}
                dataList={ItemSizeList}
                valueProps={ItemName[Number(keysVal)]}
                setValue={setItemName}
                itemforRange={Number(keysVal)}
                typeVal={itemNameSmall}
                mainKey={mainKey}
                costCalculation={costCalculation}
              />
              <ComboboxPanel
                dataKey={index + 1}
                doorType={panelName}
                panelName="Building"
                dataList={buildingList}
                valueProps={buildingItem[Number(keysVal) - 1]}
                type={itemNameSmall}
                index={Number(keysVal) - 1}
                setValue={setBuildingForWindowDoor}
                mainKey={mainKey}
                costCalculation={() => ""}
              />
              <DoorPlacementCombobox
                index={index + 1}
                doorType={panelName}
                dataList={placementListForLeanTo}
                type={itemNameSmall}
                mainKey={mainKey}
                costCalculation={() => ""}
                itemforRange={Number(keysVal)}
                nameForRange={itemNameSmall}
                typeVal={itemNameSmall}
                setPlaceMentForWindowDoor={setPlaceMentForWindowDoor}
              />

              <SliderPanel
                placementWalkDoor={placementItem[Number(keysVal)]}
                minVal={minMaxCalculator(
                  "min",
                  basicLength,
                  width,
                  placementItem[Number(keysVal)],
                  itemNameSmall,
                  ItemName[Number(keysVal)],
                )}
                maxVal={minMaxCalculator(
                  "max",
                  basicLength,
                  width,
                  placementItem[Number(keysVal)],
                  itemNameSmall,
                  ItemName[Number(keysVal)],
                )}
                index={index}
                panelName="Location"
                sliderStatus={sliderStatus}
                setSliderStatus={setSliderStatus}
                itemNameSmall={itemNameSmall}
                keysVal={Number(keysVal) - 1}
                onRangeChangeHandler={(e: any) =>
                  onRangeChangeHandler(e, Number(keysVal) - 1, itemNameSmall)
                }
                sliderRange={`${positionRange[itemNameSmall][Number(keysVal) - 1]}`}
                itemforRange={Number(keysVal)}
                doorType={panelName}
              />

              {Object.keys(multipleItem).length - 1 === index && (
                <div
                  className={`min-[84px] mb-5 mt-4 rounded-xl bg-[#F7F7F7] px-[21px] py-[15px] text-[1.2rem] font-normal`}
                  onClick={() => {
                    increaseCount(itemNameSmall, Number(keysVal));
                    addComboData({
                      key:
                        doorComboData.filter((item) => item.type === panelName)
                          .length + 1,
                      type: panelName,
                      size: "",
                      placement: "",
                      building: "",
                    });
                  }}
                >
                  <p className="px-0 pb-[3.2px] pt-px">
                    Add another {panelName.toLocaleLowerCase()}
                  </p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WindowAndDoor;
