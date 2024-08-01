/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMemo, useRef, useState } from "react";
import { Combobox } from "@headlessui/react";
import { usePlacement, useStoreSize } from "store";
import { useLeanTo } from "store/useLeanTo";
import {
  sideWallBayLengthList,
  rightSideWallBayLengthList,
} from "assets/dataList";
import MultiRangeSlider from "layout/multiRangeSlider";

type TdataList = {
  id: number;
  val: string;
};

type bayLengthListType = {
  leftSumValuesList: number[];
  rightSumValuesList: number[];
};
type TPanelProps = {
  panelName: string;
  valueProps: number;
  dataList: Array<TdataList>;
  type: string;
  mainKey: string;
  index: number;
  costCalculation: (
    panelName: string,
    eventVal: string | number,
    mainKey: string,
  ) => void;
  setValue?: any;
};

export const LeanToLengthCombobox = ({
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
  const { width, basicLength, length, bayLength, setLeanToDropHeigth } =
    useStoreSize();
  const { placement } = usePlacement();
  const { leanToData, updateLeanToData } = useLeanTo();
  const lBayLengthList: bayLengthListType = sideWallBayLengthList();
  const lRightBayLengthList: bayLengthListType = rightSideWallBayLengthList();

  const sideWallRightMin = useRef(0);
  const sideWallRightMax = useRef(length);

  const sideWallLeftMin = useRef(0);
  const sideWallLeftMax = useRef(length);

  const slideValue = useMemo(() => {
    let minValue = 0;
    let maxValue = 0;

    if (index !== undefined) {
      if (placement[index] === "Left Endwall") {
        minValue = width / 2 - Math.abs(leanToData[0].lPos[0] - valueProps / 2);
        maxValue = minValue + valueProps;
      }
      if (placement[index] === "Right Endwall") {
        minValue = width / 2 - Math.abs(leanToData[1].lPos[0] + valueProps / 2);
        maxValue = minValue + valueProps;
      }
      if (placement[index] === "Front Sidewall") {
        minValue =
          length / 2 - Math.abs(leanToData[2].lPos[2] - valueProps / 2);
        maxValue = minValue + valueProps;
      }
      if (placement[index] === "Back Sidewall") {
        minValue =
          length / 2 - Math.abs(leanToData[3].lPos[2] - valueProps / 2);
        maxValue = minValue + valueProps;
      }
    }

    return {
      minValue: minValue,
      maxValue: maxValue,
    };
  }, [index, leanToData, length, placement, valueProps, width]);

  const handleSliderChagne = (min: number, max: number, name: string) => {
    let leanToNum = NaN;
    if (index !== undefined) {
      if (placement[index] === "Left Endwall") leanToNum = 0;
      if (placement[index] === "Right Endwall") leanToNum = 1;
      if (placement[index] === "Front Sidewall") leanToNum = 2;
      if (placement[index] === "Back Sidewall") leanToNum = 3;
    }

    const newData = {
      ...leanToData[leanToNum],
    };

    if (leanToNum > -1 && max > 0) {
      if (leanToData[leanToNum].lLength !== max - min) {
        if (leanToNum === 0) {
          newData.lPos = [
            (max + min - width) / 2,
            leanToData[leanToNum].lPos[1],
            leanToData[leanToNum].lPos[2],
          ];
          newData.lLength = max - min;
        } else if (leanToNum === 1) {
          newData.lPos = [
            (width - max - min) / 2,
            leanToData[leanToNum].lPos[1],
            leanToData[leanToNum].lPos[2],
          ];
          newData.lLength = max - min;
        } else if (leanToNum === 2) {
          if (name === "max") {
            lRightBayLengthList.leftSumValuesList.map(
              (item: number, index: number) => {
                if (max == length) {
                  if (min === 0) {
                    newData.lPos = [
                      leanToData[leanToNum].lPos[0],
                      leanToData[leanToNum].lPos[1],
                      -(max + sideWallRightMin.current - length) / 2,
                    ];
                    newData.lLength = max - sideWallRightMin.current;
                    sideWallRightMax.current = max;
                  } else {
                    newData.lPos = [
                      leanToData[leanToNum].lPos[0],
                      leanToData[leanToNum].lPos[1],
                      -(max + sideWallRightMin.current - length) / 2 + 0.5,
                    ];
                    newData.lLength = max - sideWallRightMin.current + 1;
                    sideWallRightMax.current = max;
                  }
                } else if (item === max) {
                  if (max < bayLength) {
                    newData.lPos = [
                      leanToData[leanToNum].lPos[0],
                      leanToData[leanToNum].lPos[1],
                      -(max + sideWallRightMin.current - length - 1) / 2 - 0.5,
                    ];
                    newData.lLength = max - sideWallRightMin.current + 1;
                    sideWallRightMax.current = max;
                  } else {
                    if (min === 0) {
                      newData.lPos = [
                        leanToData[leanToNum].lPos[0],
                        leanToData[leanToNum].lPos[1],
                        -(max + sideWallRightMin.current - length) / 2,
                      ];
                      newData.lLength = max - sideWallRightMin.current;
                      sideWallRightMax.current = max;
                    } else {
                      newData.lPos = [
                        leanToData[leanToNum].lPos[0],
                        leanToData[leanToNum].lPos[1],
                        -(max + sideWallRightMin.current - length) / 2 + 0.5,
                      ];
                      newData.lLength = max - sideWallRightMin.current + 1;
                      sideWallRightMax.current = max;
                    }
                  }
                }
              },
            );
          } else if (name === "min") {
            lRightBayLengthList.rightSumValuesList.map(
              (item: number, index: number) => {
                if (item === min) {
                  if (bayLength > 0) {
                    if (min < bayLength) {
                      newData.lPos = [
                        leanToData[leanToNum].lPos[0],
                        leanToData[leanToNum].lPos[1],
                        -(sideWallRightMax.current + min - length - 1) / 2 +
                          0.5,
                      ];
                      newData.lLength = sideWallRightMax.current - min + 2;
                      if (sideWallRightMin.current !== min)
                        sideWallRightMin.current = min;
                      return;
                    } else if (min - 1 === bayLength) {
                      newData.lPos = [
                        leanToData[leanToNum].lPos[0],
                        leanToData[leanToNum].lPos[1],
                        -(sideWallRightMax.current + min - length - 1) / 2,
                      ];
                      newData.lLength = sideWallRightMax.current - min + 1;
                      if (sideWallRightMin.current !== min)
                        sideWallRightMin.current = min;
                      return;
                    } else {
                      newData.lPos = [
                        leanToData[leanToNum].lPos[0],
                        leanToData[leanToNum].lPos[1],
                        -(sideWallRightMax.current + min - length) / 2,
                      ];
                      newData.lLength = sideWallRightMax.current - min;
                      if (sideWallRightMin.current !== min)
                        sideWallRightMin.current = min;
                      return;
                    }
                  } else {
                    newData.lPos = [
                      leanToData[leanToNum].lPos[0],
                      leanToData[leanToNum].lPos[1],
                      -(sideWallRightMax.current + min - length) / 2 + 0.5,
                    ];
                    newData.lLength = sideWallRightMax.current - min + 1;
                    if (sideWallRightMin.current !== min)
                      sideWallRightMin.current = min;
                    return;
                  }
                } else if (min === 0) {
                  newData.lPos = [
                    leanToData[leanToNum].lPos[0],
                    leanToData[leanToNum].lPos[1],
                    -(sideWallRightMax.current + min - length) / 2,
                  ];
                  newData.lLength = sideWallRightMax.current - min;
                  sideWallRightMin.current = min;
                }
              },
            );
          }
        } else if (leanToNum === 3) {
          if (name === "max") {
            lBayLengthList.leftSumValuesList.map(
              (item: number, index: number) => {
                if (max === length) {
                  if (min === 0) {
                    newData.lPos = [
                      leanToData[leanToNum].lPos[0],
                      leanToData[leanToNum].lPos[1],
                      (max + sideWallLeftMin.current - length) / 2,
                    ];
                    newData.lLength = max - sideWallLeftMin.current;
                    sideWallLeftMax.current = max;
                  } else {
                    newData.lPos = [
                      leanToData[leanToNum].lPos[0],
                      leanToData[leanToNum].lPos[1],
                      (max + sideWallLeftMin.current - length) / 2 - 0.5,
                    ];
                    newData.lLength = max - sideWallLeftMin.current + 1;
                    sideWallLeftMax.current = max;
                  }
                } else if (item === max) {
                  if (min === 0) {
                    newData.lPos = [
                      leanToData[leanToNum].lPos[0],
                      leanToData[leanToNum].lPos[1],
                      (max + sideWallLeftMin.current - length) / 2 + 0.5,
                    ];
                    newData.lLength = max - sideWallLeftMin.current + 1;
                    sideWallLeftMax.current = max;
                  } else {
                    newData.lPos = [
                      leanToData[leanToNum].lPos[0],
                      leanToData[leanToNum].lPos[1],
                      (max + sideWallLeftMin.current - length) / 2 - 0.5,
                    ];
                    newData.lLength = max - sideWallLeftMin.current + 1;
                    sideWallLeftMax.current = max;
                  }
                }
              },
            );
          } else if (name === "min") {
            lBayLengthList.rightSumValuesList.map(
              (item: number, index: number) => {
                if (min === 0) {
                  newData.lPos = [
                    leanToData[leanToNum].lPos[0],
                    leanToData[leanToNum].lPos[1],
                    (sideWallLeftMax.current + min - length) / 2,
                  ];
                  newData.lLength = sideWallLeftMax.current - min;
                  sideWallLeftMin.current = min;
                } else if (item === min) {
                  newData.lPos = [
                    leanToData[leanToNum].lPos[0],
                    leanToData[leanToNum].lPos[1],
                    (sideWallLeftMax.current + min - length) / 2 - 0.5,
                  ];
                  newData.lLength = sideWallLeftMax.current - min + 1;
                  if (sideWallLeftMin.current !== min)
                    sideWallLeftMin.current = min;
                }
              },
            );
          }
        }
      }
    }
    if (JSON.stringify(newData) !== JSON.stringify(leanToData[leanToNum])) {
      updateLeanToData(newData);
    }
  };

  return (
    <>
      <div className="min-[84px] mb-5 mt-4 w-full flex-1 select-none rounded-xl bg-[#f7f7f7] px-[21px] py-[15px] hover:cursor-pointer">
        <h3 className="px-0 pb-[7px] pt-px text-[1.2rem] font-normal leading-normal">
          {panelName}
        </h3>

        <Combobox value={selected}>
          <div className="mx-auto mt-1 flex w-full py-[3px]">
            {placement[index] === "Left Endwall" ? (
              <MultiRangeSlider
                min={0}
                max={width}
                onChange={({ min, max, name }) =>
                  handleSliderChagne(min, max, name)
                }
                minValue={slideValue.minValue}
                maxValue={slideValue.maxValue}
              />
            ) : null}
            {placement[index] === "Right Endwall" ? (
              <MultiRangeSlider
                min={0}
                max={width}
                onChange={({ min, max, name }) =>
                  handleSliderChagne(min, max, name)
                }
                minValue={slideValue.minValue}
                maxValue={slideValue.maxValue}
              />
            ) : null}
            {placement[index] === "Front Sidewall" ? (
              <MultiRangeSlider
                min={0}
                max={length}
                onChange={({ min, max, name }) =>
                  handleSliderChagne(min, max, name)
                }
                minValue={slideValue.minValue}
                maxValue={slideValue.maxValue}
              />
            ) : null}
            {placement[index] === "Back Sidewall" ? (
              <MultiRangeSlider
                min={0}
                max={length}
                onChange={({ min, max, name }) =>
                  handleSliderChagne(min, max, name)
                }
                minValue={slideValue.minValue}
                maxValue={slideValue.maxValue}
              />
            ) : null}
          </div>
        </Combobox>
      </div>
    </>
  );
};
