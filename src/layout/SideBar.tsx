import React from "react";
import Price from "./Price/Price";
import ColorCombo from "./ColorCombo/ColorCombo";
import Loading from "components/Ui/Loading/Progress";
import ForSelectItem from "./ForSelectItem/ForSelectItem";
import { useAddMultipleRecess, useZoomInOrOut } from "store";
import { MdDelete } from "react-icons/md";
import { useEffect, useMemo } from "react";
import { useLeanTo } from "store/useLeanTo";
import { useGetPrice, usePriceCalculation } from "store/usePrice";
import { PitchOption } from "components/DisignPanel/Combobox/PitchOption";
import { ComboboxPanel } from "components/DisignPanel/Combobox/ComboboxPanel";
import { SizeComboboxPanel } from "components/DisignPanel/Combobox/SizeComboboxPanel";
import { costCalculationFun } from "utils/costCalculation";
import { SubmitButton } from "components/SubmitButton";
import { usePlacement, useStoreSize, useStyle, useUpgrade } from "store";
import {
  eaveHeightSizeList,
  lengthSizeList,
  styleList,
  widthSizeList,
  recessCeilingHeight,
} from "assets/dataList";
import ViewDesignButton from "components/ViewDesignButton";

export const SideBar = () => {
  const { label } = useStyle();
  const { leanToData, updateLeanToData } = useLeanTo();
  const { downspout, setdownspout } = useUpgrade();
  const { placement } = usePlacement();
  const { setZoomAvailable } = useZoomInOrOut();
  const {
    width,
    eaveHeight,
    pitchOptionSize,
    leanToPitchOptionSize,
    basicLength,
    deltaHeight,
    bayLength,
    leanToDropHeightSize,
    setWidth,
    setLength,
    setEaveHeight,
    setLeanToPitch,
  } = useStoreSize();

  const {
    multipleRecess,
    multipleRecessOpenStatus,
    setMultipleRecessOpenStatus,
    setMultipleRecess,
  } = useAddMultipleRecess();

  const { priceData, isPriceLoaded, setDimension, dimension } = useGetPrice();
  const { priceList, setPriceList } = usePriceCalculation();

  useEffect(() => {
    setZoomAvailable(false);
  }, [priceData]);

  const setMainBuildingWidth = (value: number) => {
    const tempDimension = [...dimension] as Array<number>;
    tempDimension[0] = value;
    setDimension(tempDimension);
    leanToData.map((item, _index) => {
      if (item.wall === "SideWallRight")
        updateLeanToData({
          wall: leanToData[2].wall,
          type: leanToData[2].type,
          lWidth: leanToData[2].lWidth,
          lLength: leanToData[2].lLength,
          lEaveHeight: leanToData[2].lEaveHeight,
          lDeltaHeight: leanToData[2].lDeltaHeight,
          lInsetBayLength: leanToData[2].lInsetBayLength,
          lPos: [value / 2 - 0.1, leanToData[2].lPos[1], leanToData[2].lPos[2]],
          lRot: leanToData[2].lRot,
        });
      if (item.wall === "SideWallLeft")
        updateLeanToData({
          wall: leanToData[3].wall,
          type: leanToData[3].type,
          lWidth: leanToData[3].lWidth,
          lLength: leanToData[3].lLength,
          lEaveHeight: leanToData[3].lEaveHeight,
          lDeltaHeight: leanToData[3].lDeltaHeight,
          lInsetBayLength: leanToData[3].lInsetBayLength,
          lPos: [-value / 2, leanToData[3].lPos[1], leanToData[3].lPos[2]],
          lRot: leanToData[3].lRot,
        });
    });

    setWidth(value);
  };

  const setMainBuildingLength = (value: number) => {
    const tempDimension = [...dimension] as Array<number>;
    tempDimension[1] = value;
    setDimension(tempDimension);
    leanToData.map((item, _index) => {
      if (item.wall === "EndWallFront")
        updateLeanToData({
          wall: leanToData[0].wall,
          type: leanToData[0].type,
          lWidth: leanToData[0].lWidth,
          lLength: leanToData[0].lLength,
          lEaveHeight: leanToData[0].lEaveHeight,
          lDeltaHeight: leanToData[0].lDeltaHeight,
          lInsetBayLength: leanToData[0].lInsetBayLength,
          lPos: [
            leanToData[0].lPos[0],
            leanToData[0].lPos[1],
            value / 2 - bayLength,
          ],
          lRot: leanToData[0].lRot,
        });
      if (item.wall === "EndWallBack")
        updateLeanToData({
          wall: leanToData[1].wall,
          type: leanToData[1].type,
          lWidth: leanToData[1].lWidth,
          lLength: leanToData[1].lLength,
          lEaveHeight: leanToData[1].lEaveHeight,
          lDeltaHeight: leanToData[1].lDeltaHeight,
          lInsetBayLength: leanToData[1].lInsetBayLength,
          lPos: [leanToData[1].lPos[0], leanToData[1].lPos[1], -value / 2],
          lRot: leanToData[1].lRot,
        });
      if (item.wall === "SideWallRight")
        updateLeanToData({
          wall: leanToData[2].wall,
          type: leanToData[2].type,
          lWidth: leanToData[2].lWidth,
          lLength: leanToData[2].lLength,
          lEaveHeight: leanToData[2].lEaveHeight,
          lDeltaHeight: leanToData[2].lDeltaHeight,
          lInsetBayLength: leanToData[2].lInsetBayLength,
          lPos: [
            leanToData[2].lPos[0],
            leanToData[2].lPos[1],
            -value / 2 + leanToData[2].lLength / 2,
          ],
          lRot: leanToData[2].lRot,
        });
      if (item.wall === "SideWallLeft")
        updateLeanToData({
          wall: leanToData[3].wall,
          type: leanToData[3].type,
          lWidth: leanToData[3].lWidth,
          lLength: leanToData[3].lLength,
          lEaveHeight: leanToData[3].lEaveHeight,
          lDeltaHeight: leanToData[3].lDeltaHeight,
          lInsetBayLength: leanToData[3].lInsetBayLength,
          lPos: [
            leanToData[3].lPos[0],
            leanToData[3].lPos[1],
            -value / 2 + leanToData[3].lLength / 2,
          ],
          lRot: leanToData[3].lRot,
        });
    });

    setLength(value);
  };

  const leanToSizeProps = useMemo(() => {
    const leanToWidth = { Back: 0, Left: 0, Front: 0, Right: 0 } as {
      [key: string]: number;
    };
    const leanToLength = { Back: 0, Left: 0, Front: 0, Right: 0 } as {
      [key: string]: number;
    };
    const leanToEaveHeight = { Back: 0, Left: 0, Front: 0, Right: 0 } as {
      [key: string]: number;
    };

    const leanToType = { Back: "", Left: "", Front: "", Right: "" } as {
      [key: string]: string;
    };
    const leanToWall = { Back: "", Left: "", Front: "", Right: "" } as {
      [key: string]: string;
    };
    const leanToPitchList = { Back: "", Left: "", Front: "", Right: "" } as {
      [key: string]: string;
    };
    Object.keys(placement).forEach((key) => {
      if (placement[key] === "Right Endwall") {
        leanToWidth["Right Endwall"] = leanToData[1].lWidth;
        leanToLength["Right Endwall"] = leanToData[1].lLength;
        leanToEaveHeight["Right Endwall"] =
          eaveHeight - leanToData[1].lEaveHeight - leanToData[1].lDeltaHeight;
        leanToType["Right Endwall"] = leanToData[1].type;
        leanToPitchList["Right Endwall"] = leanToPitchOptionSize[1].val;
        leanToWall["Right Endwall"] = "EndWallBack";
      }

      if (placement[key] === "Back Sidewall") {
        leanToWidth["Back Sidewall"] = leanToData[3].lWidth;
        leanToLength["Back Sidewall"] = leanToData[3].lLength;
        leanToEaveHeight["Back Sidewall"] =
          eaveHeight - leanToData[3].lEaveHeight - leanToData[3].lDeltaHeight;
        leanToType["Back Sidewall"] = leanToData[3].type;
        leanToPitchList["Back Sidewall"] = leanToPitchOptionSize[3].val;
        leanToWall["Back Sidewall"] = "SideWallLeft";
      }

      if (placement[key] === "Left Endwall") {
        leanToWidth["Left Endwall"] = leanToData[0].lWidth;
        leanToLength["Left Endwall"] = leanToData[0].lLength;
        leanToEaveHeight["Left Endwall"] =
          eaveHeight - leanToData[0].lEaveHeight - leanToData[0].lDeltaHeight;
        leanToType["Left Endwall"] = leanToData[0].type;
        leanToPitchList["Left Endwall"] = leanToPitchOptionSize[0].val;
        leanToWall["Left Endwall"] = "EndWallFront";
      }

      if (placement[key] === "Front Sidewall") {
        if (label === "Single Slope") {
          leanToEaveHeight["Front Sidewall"] =
            eaveHeight +
            deltaHeight -
            leanToData[2].lEaveHeight -
            leanToData[2].lDeltaHeight;
        } else {
          leanToEaveHeight["Front Sidewall"] =
            eaveHeight - leanToData[2].lEaveHeight - leanToData[2].lDeltaHeight;
        }
        leanToWidth["Front Sidewall"] = leanToData[2].lWidth;
        leanToLength["Front Sidewall"] = leanToData[2].lLength;
        leanToType["Front Sidewall"] = leanToData[2].type;
        leanToPitchList["Front Sidewall"] = leanToPitchOptionSize[2].val;
        leanToWall["Front Sidewall"] = "SideWallRight";
      }
    });
    return {
      leanToWidth: leanToWidth,
      leanToLength: leanToLength,
      leanToEaveHeight: leanToEaveHeight,
      leanToType: leanToType,
      leanToPitchList: leanToPitchList,
      leanToWall: leanToWall,
    };
  }, [placement, leanToData, leanToPitchOptionSize]);

  const setLeanToWidth = (value: number, type?: string, index?: number) => {
    if (typeof index !== "undefined") {
      if (placement[index] === "Left Endwall") {
        setLeanToPitch({
          id:
            (value * parseInt(leanToPitchOptionSize[0].val.substring(0, 1))) /
            14,
          val: leanToPitchOptionSize[0].val.substring(0, 1) + " / 12",
          wall: "EndWallFront",
        });

        updateLeanToData({
          wall: leanToData[0].wall,
          type: leanToData[0].type,
          lWidth: value,
          lLength: leanToData[0].lLength,
          lEaveHeight:
            eaveHeight -
            (value * parseInt(leanToPitchOptionSize[0].val.substring(0, 1))) /
              14 -
            leanToDropHeightSize[0].val,
          lDeltaHeight:
            (value * parseInt(leanToPitchOptionSize[0].val.substring(0, 1))) /
            14,
          lInsetBayLength: leanToData[0].lInsetBayLength,
          lPos: leanToData[0].lPos,
          lRot: leanToData[0].lRot,
        });
      } else if (placement[index] === "Right Endwall") {
        setLeanToPitch({
          id:
            (value * parseInt(leanToPitchOptionSize[1].val.substring(0, 1))) /
            14,
          val: leanToPitchOptionSize[1].val.substring(0, 1) + " / 12",
          wall: "EndWallBack",
        });

        updateLeanToData({
          wall: leanToData[1].wall,
          type: leanToData[1].type,
          lWidth: value,
          lLength: leanToData[1].lLength,
          lEaveHeight:
            eaveHeight -
            (value * parseInt(leanToPitchOptionSize[1].val.substring(0, 1))) /
              14 -
            leanToDropHeightSize[1].val,
          lDeltaHeight:
            (value * parseInt(leanToPitchOptionSize[1].val.substring(0, 1))) /
            14,
          lInsetBayLength: leanToData[1].lInsetBayLength,
          lPos: leanToData[1].lPos,
          lRot: leanToData[1].lRot,
        });
      } else if (placement[index] === "Front Sidewall") {
        setLeanToPitch({
          id:
            (value * parseInt(leanToPitchOptionSize[2].val.substring(0, 1))) /
            14,
          val: leanToPitchOptionSize[2].val.substring(0, 1) + " / 12",
          wall: "SideWallRight",
        });

        updateLeanToData({
          wall: leanToData[2].wall,
          type: leanToData[2].type,
          lWidth: value,
          lLength: leanToData[2].lLength,
          lEaveHeight:
            eaveHeight -
            (value * parseInt(leanToPitchOptionSize[2].val.substring(0, 1))) /
              14 -
            leanToDropHeightSize[2].val,
          lDeltaHeight:
            (value * parseInt(leanToPitchOptionSize[2].val.substring(0, 1))) /
            14,
          lInsetBayLength: leanToData[2].lInsetBayLength,
          lPos: leanToData[2].lPos,
          lRot: leanToData[2].lRot,
        });
      } else if (placement[index] === "Back Sidewall") {
        setLeanToPitch({
          id:
            value *
            (parseInt(leanToPitchOptionSize[3].val.substring(0, 1)) / 14),
          val: leanToPitchOptionSize[3].val.substring(0, 1) + " / 12",
          wall: "SideWallLeft",
        });

        updateLeanToData({
          wall: leanToData[3].wall,
          type: leanToData[3].type,
          lWidth: value,
          lLength: leanToData[3].lLength,
          lEaveHeight:
            eaveHeight -
            value *
              (parseInt(leanToPitchOptionSize[3].val.substring(0, 1)) / 14) -
            leanToDropHeightSize[3].val,
          lDeltaHeight:
            value *
            (parseInt(leanToPitchOptionSize[3].val.substring(0, 1)) / 14),
          lInsetBayLength: leanToData[3].lInsetBayLength,
          lPos: leanToData[3].lPos,
          lRot: leanToData[3].lRot,
        });
      }
    }
  };

  const costCalculation = (
    panelName: string,
    value: string | number,
    mainKey: string,
    booleanTypeOption?: boolean,
  ) => {
    const constTempObj = costCalculationFun(
      panelName,
      value,
      mainKey,
      priceList,
      priceData,
      booleanTypeOption,
      placement,
      leanToSizeProps.leanToWidth,
      leanToSizeProps.leanToLength,
      leanToSizeProps.leanToEaveHeight,
      leanToSizeProps.leanToPitchList,
      eaveHeight,
    );
    setZoomAvailable(true);
    setPriceList(constTempObj.tempPriceList, constTempObj.totalCost);
  };

  const multipleRecessDeleteHandler = (
    index: number,
    keyVals: string | number,
  ) => {
    const tempRecessOpenStatus = {
      ...multipleRecessOpenStatus,
    };
    if (tempRecessOpenStatus[index]) {
      tempRecessOpenStatus[index] = false;
    }
    setMultipleRecessOpenStatus(tempRecessOpenStatus);
    const tempMultipleRecess = { ...multipleRecess };
    const tempObj = {} as { [key: string | number]: string | number };
    Object.keys(tempMultipleRecess).forEach((item: string) => {
      if (tempMultipleRecess[Number(item)] !== keyVals) {
        tempObj[+item] = tempMultipleRecess[+item];
      }
    });
    setMultipleRecess(tempObj);
  };

  return (
    <>
      {isPriceLoaded && <Loading />}
      <div className="h-auto w-full select-none flex-col p-4 text-[#4A4A4F] md:h-screen md:overflow-y-auto md:p-8">
        <div className="mx-auto w-[95%] items-center justify-center space-y-10 text-3xl font-normal md:w-3/4">
          <div className="hidden md:block md:pb-10">
            <h1 className="text-[20.8px] font-normal desktop:text-[2rem]">
              Design Your Metal Building
            </h1>
            <span className="text-[1.7rem] font-thin">
              Make your dreams a reality
            </span>
          </div>
          <div>
            <h3 className="mb-[0.3rem] mt-4 px-0 pb-[7px] pt-px text-2xl font-light leading-10">
              Choose your style
            </h3>
            <ComboboxPanel
              dataKey={0}
              doorType=""
              costCalculation={costCalculation}
              panelName="Style"
              dataList={styleList}
              valueProps={label}
              setValue={() => {}}
              type="style"
              index={0}
              mainKey={"chooseyourstyle"}
            />
          </div>
          <div>
            <h3 className="mb-[0.3rem] mt-4 px-0 pb-[7px] pt-px text-2xl font-light leading-10">
              Choose your size
            </h3>
            <SizeComboboxPanel
              panelName="Width"
              dataList={widthSizeList}
              valueProps={width}
              setValue={setMainBuildingWidth}
              costCalculation={costCalculation}
              type="mainwidth"
              mainKey={"chooseyoursize"}
            />
            <SizeComboboxPanel
              panelName="Length"
              dataList={lengthSizeList}
              valueProps={basicLength + bayLength}
              setValue={setMainBuildingLength}
              costCalculation={() => {}}
              type="mainlength"
              mainKey={"chooseyoursize"}
            />
            <SizeComboboxPanel
              panelName="Eave height"
              dataList={eaveHeightSizeList}
              valueProps={eaveHeight}
              setValue={setEaveHeight}
              costCalculation={costCalculation}
              type="eaveheight"
              mainKey={"chooseyoursize"}
            />
            <PitchOption
              valueProps={pitchOptionSize}
              type={"main"}
              wall=""
              costCalculation={costCalculation}
              mainKey={"chooseyoursize"}
              typePitch="roofpitch"
            />
          </div>
          <div className=" ">
            <h3 className="mb-[0.3rem] mt-4 px-0 pb-[7px] pt-px text-2xl font-light leading-10">
              Design your units
            </h3>

            <>
              {Object.keys(multipleRecess).length === 0 && (
                <div
                  className={`min-[84px] mb-5 mt-4 rounded-xl bg-[#F7F7F7] px-[21px] py-[15px] text-[1.2rem] font-normal`}
                  onClick={() => {
                    const tempRecessOpenStatus = {
                      ...multipleRecessOpenStatus,
                    };
                    if (tempRecessOpenStatus[0]) {
                      tempRecessOpenStatus[0] = !tempRecessOpenStatus[0];
                    } else {
                      tempRecessOpenStatus[0] = true;
                    }
                    setMultipleRecessOpenStatus(tempRecessOpenStatus);

                    const tempMultipleRecess = { ...multipleRecess };
                    tempMultipleRecess[0] = 1;

                    setMultipleRecess(tempMultipleRecess);
                  }}
                >
                  <p className="px-0 pb-[3.2px] pt-px">Recess</p>
                  <p className="px-0 pb-[7px] pt-px text-[0.9rem]">
                    Select to add a recess
                  </p>
                </div>
              )}
              {Object.values(multipleRecess).map((keysVal, index) => {
                return (
                  <React.Fragment key={index}>
                    <div
                      className={`min-[84px] group relative mb-5 mt-4 rounded-xl px-[21px] py-[15px] text-[1.2rem] font-normal ${multipleRecessOpenStatus[+keysVal - 1] ? "bg-[#B6B6B6] text-[#FFF]" : "bg-[#F7F7F7]"}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        const tempRecessOpenStatus = {
                          ...multipleRecessOpenStatus,
                        };
                        if (tempRecessOpenStatus[+keysVal - 1]) {
                          tempRecessOpenStatus[+keysVal - 1] =
                            !tempRecessOpenStatus[+keysVal - 1];
                        } else {
                          tempRecessOpenStatus[+keysVal - 1] = true;
                        }
                        setMultipleRecessOpenStatus(tempRecessOpenStatus);
                      }}
                    >
                      <div
                        className="absolute bottom-0 right-0 top-0 hidden cursor-pointer items-center rounded-r-lg bg-red-500 p-2 group-hover:flex group-hover:text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          multipleRecessDeleteHandler(index, keysVal);
                        }}
                      >
                        <span>
                          <MdDelete />
                        </span>
                      </div>
                      <p className="px-0 pb-[3.2px] pt-px">
                        Recess {index + 1}
                      </p>
                      <p className="px-0 pb-[7px] pt-px text-[0.9rem]">
                        Click to hide or show options
                      </p>
                    </div>
                    <div
                      className={`hover:cursor-pointer ${multipleRecessOpenStatus[+keysVal - 1] ? "block" : "hidden"} `}
                    >
                      <SizeComboboxPanel
                        panelName="Ceiling height"
                        dataList={recessCeilingHeight}
                        valueProps={
                          leanToSizeProps.leanToWidth[
                            `${placement[Number(index)]}`
                          ]
                        }
                        setValue={setLeanToWidth}
                        costCalculation={costCalculation}
                        type="ceilingheight"
                        mainKey={"recess"}
                        index={Number(index)}
                      />
                      {Object.keys(multipleRecess).length - 1 === index && (
                        <div
                          className={`min-[84px] mb-5 mt-4 rounded-xl bg-[#F7F7F7] px-[21px] py-[15px] text-[1.2rem] font-normal`}
                          onClick={() => {
                            const tempRecessOpenStatus = {
                              ...multipleRecessOpenStatus,
                            };
                            if (tempRecessOpenStatus[index + 1]) {
                              tempRecessOpenStatus[index + 1] =
                                !tempRecessOpenStatus[index];
                            } else {
                              tempRecessOpenStatus[index + 1] = true;
                            }

                            setMultipleRecessOpenStatus(tempRecessOpenStatus);
                            const tempMultipleRecess = { ...multipleRecess };
                            tempMultipleRecess[index + 1] = index + 2;
                            setMultipleRecess(tempMultipleRecess);
                          }}
                        >
                          <p className="px-0 pb-[3.2px] pt-px">
                            Add another recess
                          </p>
                          <p className="px-0 pb-[7px] pt-px text-[0.9rem]">
                            Select to add another recess
                          </p>
                        </div>
                      )}
                    </div>
                  </React.Fragment>
                );
              })}
            </>
          </div>
          <div>
            <h3 className="mb-[0.3rem] mt-4 px-0 pb-[7px] pt-px text-2xl font-light leading-10">
              Optional upgrades
            </h3>
            <ForSelectItem
              mainKey="optionalupgrades"
              ItemNameTitle="Gutters"
              itemValue={"Select to add gutters and downspouts"}
              itemStatus={downspout}
              setItemStatus={setdownspout}
              costCalculation={costCalculation}
            />
            <ForSelectItem
              mainKey="optionalupgrades"
              ItemNameTitle="Standing seam roof"
              itemValue={"Select to upgrade to a standing seam roof"}
              itemStatus={downspout}
              setItemStatus={setdownspout}
              costCalculation={costCalculation}
            />
            <ForSelectItem
              mainKey="optionalupgrades"
              ItemNameTitle="Insulation"
              itemValue={""}
              itemStatus={downspout}
              setItemStatus={setdownspout}
              costCalculation={costCalculation}
            />
          </div>
          <div>
            <h3 className="mb-[0.3rem] mt-4 px-0 pb-[7px] pt-px text-2xl font-light leading-10">
              Choose your colors
            </h3>
            <ColorCombo
              costCalculation={costCalculation}
              downspout={downspout}
            />
          </div>
          <div>
            <Price />
            <ViewDesignButton />
            <SubmitButton />
          </div>
        </div>
      </div>
    </>
  );
};
