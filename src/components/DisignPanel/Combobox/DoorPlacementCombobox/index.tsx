/* eslint-disable no-case-declarations */
/* eslint-disable react-hooks/rules-of-hooks */
import MovableInfoList from "utils/movable.json";
import { Fragment, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { Combobox, Transition } from "@headlessui/react";
import { useSliderUpdate, useStoreCameraControl, useStoreSize } from "store";
import { useDoorCombo, useDoorStore } from "store/useDoor";
import { useRigidFrameStore } from "store/useRigidFrame";
import { placementList } from "assets/dataList";

export interface TdataList {
  id: number | string;
  val: number | string;
}

interface MovableInfoType {
  name: string;
  type: string;
  width: number;
  height: number;
  depth: number;
}
interface IDoorPlacementCombobox {
  index: number;
  doorType: string;
  dataList: Array<TdataList>;
  type: string;
  mainKey: string;
  itemforRange: number;
  nameForRange: string;
  typeVal: string;
  costCalculation: (
    panelName: string,
    eventVal: string | number,
    mainKey: string,
    bol?: boolean,
  ) => void;
  setPlaceMentForWindowDoor: (val: any, type?: string, index?: number) => void;
}

export const DoorPlacementCombobox = ({
  index,
  doorType,
  dataList,
  type,
  mainKey,
  nameForRange,
  itemforRange,
  typeVal,
  costCalculation,
  setPlaceMentForWindowDoor,
}: IDoorPlacementCombobox) => {
  const {
    doorData,
    doorCount,
    addDoorData,
    addSliceDoorData,
    increaseDoorCount,
  } = useDoorStore();
  const { width, basicLength, length, eaveHeight } = useStoreSize();
  const { doorComboData, updateComboData } = useDoorCombo();
  const { rigidFrameData } = useRigidFrameStore();
  const { positionRange, setPositionRange } = useSliderUpdate();
  const { cameraRef } = useStoreCameraControl();
  const [selected] = useState(dataList[0]);
  const [query, setQuery] = useState("");

  const currentItem = doorComboData.filter((item) => {
    if (item.key === itemforRange && item.type === doorType) return item;
  })[0];

  const placementDataList = placementList;
  const filtereddataList =
    query === ""
      ? placementDataList
      : placementDataList.filter((items) => items.val);

  return (
    <>
      <div className="min-[84px] mb-5 mt-4 w-full flex-1 select-none rounded-xl bg-[#f7f7f7] px-[21px] py-[15px] hover:cursor-pointer">
        <h3 className="px-0 pb-[7px] pt-px text-[1.2rem] font-normal leading-normal">
          Placement
        </h3>

        <Combobox
          value={selected}
          onChange={(event) => {
            if (event) {
              const points: number[] = [];
              let count = 0;
              if (typeof event.val === "string") {
                setPlaceMentForWindowDoor(event.val, type, index);
                updateComboData("placement", event.val, index, doorType);
              }
              let movableInfo: MovableInfoType = {
                name: "",
                type: doorType,
                width: 0,
                height: 0,
                depth: 0,
              };
              movableInfo = MovableInfoList.filter((item) => {
                if (
                  item.type === currentItem.type &&
                  item.name === currentItem.size
                )
                  return item;
              })[0];

              switch (currentItem.building) {
                case "Main building":
                  switch (event.val) {
                    case "Left Endwall":
                      cameraRef.current?.setPosition(
                        ...[0, eaveHeight / 2, length * 2.7],
                        true,
                      );

                      doorData.filter((item) => {
                        if (item.wall === "EndWallGabelFront") {
                          points.push(
                            item.pos[0] - item.size[0] / 2,
                            item.pos[0] + item.size[0] / 2,
                          );
                        }
                      });
                      points.push(-width / 2 + 0.6);
                      points.push(width / 2 - 0.6);
                      points.sort(function (a, b) {
                        return a - b;
                      });

                      count = doorData.filter((item) => {
                        if (item.wall === "EndWallGabelFront") return item;
                      }).length;

                      for (let i = 0; i <= count * 2 + 1; i += 2) {
                        if (points[i + 1] - points[i] > movableInfo.width) {
                          if (movableInfo.height < eaveHeight) {
                            const tempPositionRange = { ...positionRange };

                            if (
                              tempPositionRange[`${nameForRange}`].length === 0
                            ) {
                              tempPositionRange[`${nameForRange}`].push(
                                points[i] + movableInfo?.width / 2,
                              );
                            } else {
                              tempPositionRange[`${nameForRange}`][
                                itemforRange - 1
                              ] = points[i] + movableInfo?.width / 2;
                            }

                            setPositionRange(tempPositionRange);
                            let filterdDoorData = [] as Array<any>;
                            let filterDoorDataIndex = 0;
                            if (doorData.length > 0) {
                              filterdDoorData = doorData.filter((itm) => {
                                return (
                                  itm.nameForRange === nameForRange &&
                                  itm.itemforRange === itemforRange
                                );
                              });
                              filterDoorDataIndex = doorData.findIndex(
                                (itm) => {
                                  return (
                                    itm.nameForRange === nameForRange &&
                                    itm.itemforRange === itemforRange
                                  );
                                },
                              );
                            }
                            const tempDoorData = [...doorData];

                            if (filterdDoorData.length > 0) {
                              if (
                                filterdDoorData[0].wall === "EndWallGabelFront"
                              ) {
                                filterdDoorData[0].name = movableInfo.name;
                                filterdDoorData[0].type = movableInfo.type;
                                filterdDoorData[0].size = [
                                  movableInfo?.width,
                                  movableInfo.height,
                                  movableInfo.depth,
                                ];
                                filterdDoorData[0].wall = "EndWallGabelFront";
                                filterdDoorData[0].pos = [
                                  points[i] + movableInfo.width / 2,
                                  doorType === "Window"
                                    ? 7.3 - movableInfo.height / 2
                                    : movableInfo.height / 2,
                                  basicLength / 2,
                                ];
                                filterdDoorData[0].rot = [0, 0, 0];
                                tempDoorData[filterDoorDataIndex] =
                                  filterdDoorData[0];
                                costCalculation(
                                  typeVal,
                                  filterdDoorData[0].name,
                                  mainKey,
                                  true,
                                );
                                addDoorData(tempDoorData);
                                const tempSliceDoorData = [];
                                for (let i = 0; i < tempDoorData.length; i++) {
                                  tempSliceDoorData.push({
                                    ...tempDoorData[i],
                                    visible: true,
                                  });
                                }
                                addSliceDoorData(tempSliceDoorData);
                              }
                            } else {
                              tempDoorData.push({
                                key: doorCount + 1,
                                name: movableInfo.name,
                                type: movableInfo.type,
                                building: "MainBuilding",
                                wall: "EndWallGabelFront",
                                itemforRange: itemforRange || 1,
                                nameForRange: nameForRange,
                                size: [
                                  movableInfo.width,
                                  movableInfo.height,
                                  movableInfo.depth,
                                ],
                                pos: [
                                  points[i] + movableInfo.width / 2,
                                  doorType === "Window"
                                    ? 7.3 - movableInfo.height / 2
                                    : movableInfo.height / 2,
                                  basicLength / 2,
                                ],
                                rot: [0, 0, 0],
                              });
                              costCalculation(
                                typeVal,
                                movableInfo.name,
                                mainKey,
                                true,
                              );
                              addDoorData(tempDoorData);
                              const tempSliceDoorData = tempDoorData.map(
                                (item) => ({
                                  ...item,
                                  visible: true,
                                }),
                              );

                              addSliceDoorData(tempSliceDoorData);
                              increaseDoorCount();
                              return;
                            }
                          }
                        }
                      }
                      break;
                    case "Right Endwall":
                      cameraRef.current?.setPosition(
                        ...[0, eaveHeight / 2, length * -2.7],
                        true,
                      );

                      doorData.filter((item) => {
                        if (item.wall === "EndWallGabelBack") {
                          points.push(
                            item.pos[0] - item.size[0] / 2,
                            item.pos[0] + item.size[0] / 2,
                          );
                        }
                      });
                      points.push(-width / 2 + 0.6);
                      points.push(width / 2 - 0.6);
                      points.sort(function (a, b) {
                        return a - b;
                      });

                      count = doorData.filter((item) => {
                        if (item.wall === "EndWallGabelBack") return item;
                      }).length;

                      for (let i = 0; i <= count * 2 + 1; i += 2) {
                        if (points[i + 1] - points[i] > movableInfo.width) {
                          if (movableInfo.height < eaveHeight) {
                            const tempPositionRange = { ...positionRange };

                            if (
                              tempPositionRange[`${nameForRange}`].length === 0
                            ) {
                              tempPositionRange[`${nameForRange}`].push(
                                -points[i] + movableInfo?.width / 2,
                              );
                            } else {
                              tempPositionRange[`${nameForRange}`][
                                itemforRange - 1
                              ] = -points[i] + movableInfo?.width / 2;
                            }

                            setPositionRange(tempPositionRange);
                            let filterdDoorData = [] as Array<any>;
                            let filterDoorDataIndex = 0;
                            if (doorData.length > 0) {
                              filterdDoorData = doorData.filter((itm) => {
                                return (
                                  itm.nameForRange === nameForRange &&
                                  itm.itemforRange === itemforRange
                                );
                              });
                              filterDoorDataIndex = doorData.findIndex(
                                (itm) => {
                                  return (
                                    itm.nameForRange === nameForRange &&
                                    itm.itemforRange === itemforRange
                                  );
                                },
                              );
                            }
                            const tempDoorData = [...doorData];
                            if (filterdDoorData.length > 0) {
                              if (
                                filterdDoorData[0].wall === "EndWallGabelBack"
                              ) {
                                filterdDoorData[0].name = movableInfo.name;
                                filterdDoorData[0].type = movableInfo.type;
                                filterdDoorData[0].size = [
                                  movableInfo?.width,
                                  movableInfo.height,
                                  movableInfo.depth,
                                ];
                                filterdDoorData[0].wall = "EndWallGabelBack";
                                filterdDoorData[0].pos = [
                                  points[i] + movableInfo.width / 2,
                                  doorType === "Window"
                                    ? 7.6 - movableInfo.height / 2
                                    : movableInfo.height / 2,
                                  -basicLength / 2 + 0.1,
                                ];
                                filterdDoorData[0].rot = [0, Math.PI, 0];
                                tempDoorData[filterDoorDataIndex] =
                                  filterdDoorData[0];
                                costCalculation(
                                  typeVal,
                                  filterdDoorData[0].name,
                                  mainKey,
                                  true,
                                );

                                addDoorData(tempDoorData);
                                const tempSliceDoorData = tempDoorData.map(
                                  (item) => ({
                                    ...item,
                                    visible: true,
                                  }),
                                );
                                addSliceDoorData(tempSliceDoorData);
                              }
                            } else {
                              tempDoorData.push({
                                key: doorCount + 1,
                                name: movableInfo.name,
                                type: movableInfo.type,
                                building: "MainBuilding",
                                wall: "EndWallGabelBack",
                                itemforRange: itemforRange || 1,
                                nameForRange: nameForRange,
                                size: [
                                  movableInfo.width,
                                  movableInfo.height,
                                  movableInfo.depth,
                                ],
                                pos: [
                                  points[i] + movableInfo.width / 2,
                                  doorType === "Window"
                                    ? 7.6 - movableInfo.height / 2
                                    : movableInfo.height / 2,
                                  -basicLength / 2 + 0.1,
                                ],
                                rot: [0, Math.PI, 0],
                              });
                              costCalculation(
                                typeVal,
                                movableInfo.name,
                                mainKey,
                                true,
                              );

                              addDoorData(tempDoorData);
                              const tempSliceDoorData = tempDoorData.map(
                                (item) => ({
                                  ...item,
                                  visible: true,
                                }),
                              );
                              addSliceDoorData(tempSliceDoorData);
                              increaseDoorCount();
                              return;
                            }
                          }
                        }
                      }
                      break;
                    case "Front Sidewall":
                      cameraRef.current?.setPosition(
                        ...[length * 2.7, eaveHeight / 2, 0],
                        true,
                      );

                      doorData.filter((item) => {
                        if (item.wall === "SideWallRight") {
                          points.push(
                            item.pos[2] - item.size[0] / 2,
                            item.pos[2] + item.size[0] / 2,
                          );
                        }
                      });
                      rigidFrameData.filter((item) => {
                        points.push(item.pos[2] - 0.15, item.pos[2] + 0.15);
                      });
                      points.push(-basicLength / 2 + 0.6);
                      points.push(basicLength / 2 - 0.6);
                      points.sort(function (a, b) {
                        return a - b;
                      });
                      count =
                        doorData.filter((item) => {
                          if (item.wall === "SideWallRight") return item;
                        }).length +
                        rigidFrameData.filter((item) => {
                          return item;
                        }).length;
                      for (let i = 0; i <= count * 2 + 1; i += 2) {
                        if (points[i + 1] - points[i] > movableInfo.width) {
                          if (movableInfo.height < eaveHeight) {
                            const tempPositionRange = { ...positionRange };
                            if (
                              tempPositionRange[`${nameForRange}`].length === 0
                            ) {
                              tempPositionRange[`${nameForRange}`].push(
                                -points[i] + movableInfo?.width / 2,
                              );
                            } else {
                              tempPositionRange[`${nameForRange}`][
                                itemforRange - 1
                              ] = -points[i] + movableInfo?.width / 2;
                            }
                            setPositionRange(tempPositionRange);
                            let filterdDoorData = [] as Array<any>;
                            let filterDoorDataIndex = 0;
                            if (doorData.length > 0) {
                              filterdDoorData = doorData.filter((itm) => {
                                return (
                                  itm.nameForRange === nameForRange &&
                                  itm.itemforRange === itemforRange
                                );
                              });
                              filterDoorDataIndex = doorData.findIndex(
                                (itm) => {
                                  return (
                                    itm.nameForRange === nameForRange &&
                                    itm.itemforRange === itemforRange
                                  );
                                },
                              );
                            }
                            const tempDoorData = [...doorData];
                            if (filterdDoorData.length > 0) {
                              if (filterdDoorData[0].wall === "SideWallRight") {
                                filterdDoorData[0].name = movableInfo.name;
                                filterdDoorData[0].type = movableInfo.type;
                                filterdDoorData[0].size = [
                                  movableInfo?.width,
                                  movableInfo.height,
                                  movableInfo.depth,
                                ];
                                filterdDoorData[0].wall = "SideWallRight";
                                filterdDoorData[0].pos = [
                                  width / 2 - 0.05,
                                  doorType === "Window"
                                    ? 7.6 - movableInfo.height / 2
                                    : movableInfo.height / 2,
                                  points[i] + movableInfo?.width / 2,
                                ];
                                filterdDoorData[0].rot = [0, Math.PI / 2, 0];
                                tempDoorData[filterDoorDataIndex] =
                                  filterdDoorData[0];
                                costCalculation(
                                  typeVal,
                                  filterdDoorData[0].name,
                                  mainKey,
                                );
                                addDoorData(tempDoorData);
                                const tempSliceDoorData = tempDoorData.map(
                                  (item) => ({
                                    ...item,
                                    visible: true,
                                  }),
                                );
                                addSliceDoorData(tempSliceDoorData);
                              }
                            } else {
                              tempDoorData.push({
                                key: doorCount + 1,
                                name: movableInfo.name,
                                itemforRange: itemforRange || 1,
                                nameForRange: nameForRange,
                                type: movableInfo.type,
                                building: "MainBuilding",
                                wall: "SideWallRight",
                                size: [
                                  movableInfo?.width,
                                  movableInfo.height,
                                  movableInfo.depth,
                                ],
                                pos: [
                                  width / 2 - 0.05,
                                  doorType === "Window"
                                    ? 7.6 - movableInfo.height / 2
                                    : movableInfo.height / 2,
                                  points[i] + movableInfo?.width / 2,
                                ],
                                rot: [0, Math.PI / 2, 0],
                              });
                              costCalculation(
                                typeVal,
                                movableInfo.name,
                                mainKey,
                                true,
                              );
                              addDoorData(tempDoorData);
                              const tempSliceDoorData = tempDoorData.map(
                                (item) => ({
                                  ...item,
                                  visible: true,
                                }),
                              );
                              addSliceDoorData(tempSliceDoorData);
                              increaseDoorCount();
                              return;
                            }
                          }
                        }
                      }
                      break;
                    case "Back Sidewall":
                      cameraRef.current?.setPosition(
                        ...[length * -2.7, eaveHeight / 2, 0],
                        true,
                      );

                      doorData.filter((item) => {
                        if (item.wall === "SideWallLeft") {
                          points.push(
                            item.pos[2] - item.size[0] / 2,
                            item.pos[2] + item.size[0] / 2,
                          );
                        }
                      });
                      rigidFrameData.filter((item) => {
                        points.push(item.pos[2] - 0.15, item.pos[2] + 0.15);
                      });
                      points.push(-basicLength / 2 + 0.6);
                      points.push(basicLength / 2 - 0.6);
                      points.sort(function (a, b) {
                        return a - b;
                      });
                      count =
                        doorData.filter((item) => {
                          if (item.wall === "SideWallLeft") return item;
                        }).length +
                        rigidFrameData.filter((item) => {
                          return item;
                        }).length;
                      for (let i = 0; i <= count * 2 + 1; i += 2) {
                        if (points[i + 1] - points[i] > movableInfo.width) {
                          if (movableInfo.height < eaveHeight) {
                            const tempPositionRange = { ...positionRange };

                            if (
                              tempPositionRange[`${nameForRange}`].length === 0
                            ) {
                              tempPositionRange[`${nameForRange}`].push(
                                points[i] + movableInfo?.width / 2,
                              );
                            } else {
                              tempPositionRange[`${nameForRange}`][
                                itemforRange - 1
                              ] = points[i] + movableInfo?.width / 2;
                            }
                            setPositionRange(tempPositionRange);
                            let filterdDoorData = [] as Array<any>;
                            let filterDoorDataIndex = 0;
                            if (doorData.length > 0) {
                              filterdDoorData = doorData.filter((itm) => {
                                return (
                                  itm.nameForRange === nameForRange &&
                                  itm.itemforRange === itemforRange
                                );
                              });
                              filterDoorDataIndex = doorData.findIndex(
                                (itm) => {
                                  return (
                                    itm.nameForRange === nameForRange &&
                                    itm.itemforRange === itemforRange
                                  );
                                },
                              );
                            }
                            const tempDoorData = [...doorData];
                            if (filterdDoorData.length > 0) {
                              if (filterdDoorData[0].wall === "SideWallLeft") {
                                filterdDoorData[0].name = movableInfo.name;
                                filterdDoorData[0].type = movableInfo.type;
                                filterdDoorData[0].size = [
                                  movableInfo?.width,
                                  movableInfo.height,
                                  movableInfo.depth,
                                ];
                                filterdDoorData[0].wall = "SideWallLeft";
                                filterdDoorData[0].pos = [
                                  -width / 2 - 0.1,
                                  doorType === "Window"
                                    ? 7.3 - movableInfo.height / 2
                                    : movableInfo.height / 2,
                                  points[i] + movableInfo?.width / 2,
                                ];
                                filterdDoorData[0].rot = [0, -Math.PI / 2, 0];
                                costCalculation(
                                  typeVal,
                                  filterdDoorData[0].name,
                                  mainKey,
                                  true,
                                );

                                tempDoorData[filterDoorDataIndex] =
                                  filterdDoorData[0];
                                addDoorData(tempDoorData);
                                const tempSliceDoorData = tempDoorData.map(
                                  (item) => ({
                                    ...item,
                                    visible: true,
                                  }),
                                );
                                addSliceDoorData(tempSliceDoorData);
                              }
                            } else {
                              tempDoorData.push({
                                key: doorCount + 1,
                                name: movableInfo.name,
                                type: movableInfo.type,
                                itemforRange: itemforRange || 1,
                                nameForRange: nameForRange,
                                building: "MainBuilding",
                                wall: "SideWallLeft",
                                size: [
                                  movableInfo.width,
                                  movableInfo.height,
                                  movableInfo.depth,
                                ],
                                pos: [
                                  -width / 2 - 0.1,
                                  doorType === "Window"
                                    ? 7.3 - movableInfo.height / 2
                                    : movableInfo.height / 2,
                                  points[i] + movableInfo.width / 2,
                                ],
                                rot: [0, -Math.PI / 2, 0],
                              });
                              costCalculation(
                                typeVal,
                                movableInfo.name,
                                mainKey,
                                true,
                              );
                              addDoorData(tempDoorData);
                              const tempSliceDoorData = tempDoorData.map(
                                (item) => ({
                                  ...item,
                                  visible: true,
                                }),
                              );
                              addSliceDoorData(tempSliceDoorData);
                              increaseDoorCount();
                              return;
                            }
                          }
                        }
                      }
                      break;
                    default:
                      break;
                  }
                  break;
                default:
                  break;
              }
              if (typeof costCalculation !== "undefined")
                costCalculation(type, event.val, mainKey);
            }
          }}
        >
          <div className="relative mx-auto mt-1">
            <Combobox.Button className="flex w-full items-center justify-between gap-2 space-x-2 overflow-hidden rounded-[5px] border-[1px] border-[#ccc] bg-white p-[10px] text-left text-xl hover:cursor-pointer focus:outline-none sm:text-base">
              <span className="text-base">{currentItem.placement}</span>
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
