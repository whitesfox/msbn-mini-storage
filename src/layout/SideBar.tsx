import React from "react";
import Price from "./Price/Price";
import ColorCombo from "./ColorCombo/ColorCombo";
import Loading from "components/Ui/Loading/Progress";
import ForSelectItem from "./ForSelectItem/ForSelectItem";
import {
  useAddMultipleHall,
  useAddMultipleRecess,
  useZoomInOrOut,
} from "store";
import { MdDelete } from "react-icons/md";
import { useEffect } from "react";
import { useGetPrice, usePriceCalculation } from "store/usePrice";
import { PitchOption } from "components/DisignPanel/Combobox/PitchOption";
import { ComboboxPanel } from "components/DisignPanel/Combobox/ComboboxPanel";
import { SizeComboboxPanel } from "components/DisignPanel/Combobox/SizeComboboxPanel";
import { costCalculationFun } from "utils/costCalculation";
import { SubmitButton } from "components/SubmitButton";
import { usePlacement, useStoreSize, useStyle, useUpgrade } from "store";
import {
  WalkDoorSizeList,
  eaveHeightSizeList,
  lengthSizeList,
  styleList,
  widthSizeList,
  recessCeilingHeight,
} from "assets/dataList";
import ViewDesignButton from "components/ViewDesignButton";
import { DoorComboboxPanel } from "components/DisignPanel/Combobox/DoorComboboxPanel";

export const SideBar = () => {
  const { label } = useStyle();
  const { downspout, setdownspout } = useUpgrade();
  const { setZoomAvailable } = useZoomInOrOut();
  const {
    width,
    eaveHeight,
    pitchOptionSize,
    basicLength,
    bayLength,
    setWidth,
    setLength,
    setEaveHeight,
  } = useStoreSize();

  const {
    multipleRecess,
    multipleRecessOpenStatus,
    setMultipleRecessOpenStatus,
    setMultipleRecess,
  } = useAddMultipleRecess();

  const {
    multipleHall,
    multipleHallOpenStatus,
    setMultipleHallOpenStatus,
    setMultipleHall,
  } = useAddMultipleHall();

  const { priceData, isPriceLoaded, setDimension, dimension } = useGetPrice();
  const { priceList, setPriceList } = usePriceCalculation();

  useEffect(() => {
    setZoomAvailable(false);
  }, [priceData]);

  const setMainBuildingWidth = (value: number) => {
    const tempDimension = [...dimension] as Array<number>;
    tempDimension[0] = value;
    setDimension(tempDimension);

    setWidth(value);
  };

  const setMainBuildingLength = (value: number) => {
    const tempDimension = [...dimension] as Array<number>;
    tempDimension[1] = value;
    setDimension(tempDimension);

    setLength(value);
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

  const multipleHallDeleteHandler = (
    index: number,
    keyVals: string | number,
  ) => {
    const tempHallOpenStatus = {
      ...multipleHallOpenStatus,
    };
    if (tempHallOpenStatus[index]) {
      tempHallOpenStatus[index] = false;
    }
    setMultipleHallOpenStatus(tempHallOpenStatus);
    const tempMultipleHall = { ...multipleHall };
    const tempObj = {} as { [key: string | number]: string | number };
    Object.keys(tempMultipleHall).forEach((item: string) => {
      if (tempMultipleHall[Number(item)] !== keyVals) {
        tempObj[+item] = tempMultipleHall[+item];
      }
    });
    setMultipleHall(tempObj);
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
          <div>
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
                        valueProps={0}
                        setValue={""}
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
            <>
              {Object.keys(multipleHall).length === 0 && (
                <div
                  className={`min-[84px] mb-5 mt-4 rounded-xl bg-[#F7F7F7] px-[21px] py-[15px] text-[1.2rem] font-normal`}
                  onClick={() => {
                    const tempHallOpenStatus = {
                      ...multipleHallOpenStatus,
                    };
                    if (tempHallOpenStatus[0]) {
                      tempHallOpenStatus[0] = !tempHallOpenStatus[0];
                    } else {
                      tempHallOpenStatus[0] = true;
                    }
                    setMultipleHallOpenStatus(tempHallOpenStatus);

                    const tempMultipleHall = { ...multipleHall };
                    tempMultipleHall[0] = 1;

                    setMultipleHall(tempMultipleHall);
                  }}
                >
                  <p className="px-0 pb-[3.2px] pt-px">Hall</p>
                  <p className="px-0 pb-[7px] pt-px text-[0.9rem]">
                    Select to add a hall
                  </p>
                </div>
              )}
              {Object.values(multipleHall).map((keysVal, index) => {
                return (
                  <React.Fragment key={index}>
                    <div
                      className={`min-[84px] group relative mb-5 mt-4 rounded-xl px-[21px] py-[15px] text-[1.2rem] font-normal ${multipleHallOpenStatus[+keysVal - 1] ? "bg-[#B6B6B6] text-[#FFF]" : "bg-[#F7F7F7]"}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        const tempHallOpenStatus = {
                          ...multipleHallOpenStatus,
                        };
                        if (tempHallOpenStatus[+keysVal - 1]) {
                          tempHallOpenStatus[+keysVal - 1] =
                            !tempHallOpenStatus[+keysVal - 1];
                        } else {
                          tempHallOpenStatus[+keysVal - 1] = true;
                        }
                        setMultipleHallOpenStatus(tempHallOpenStatus);
                      }}
                    >
                      <div
                        className="absolute bottom-0 right-0 top-0 hidden cursor-pointer items-center rounded-r-lg bg-red-500 p-2 group-hover:flex group-hover:text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          multipleHallDeleteHandler(index, keysVal);
                        }}
                      >
                        <span>
                          <MdDelete />
                        </span>
                      </div>
                      <p className="px-0 pb-[3.2px] pt-px">Hall {index + 1}</p>
                      <p className="px-0 pb-[7px] pt-px text-[0.9rem]">
                        Click to hide or show options
                      </p>
                    </div>
                    <div
                      className={`hover:cursor-pointer ${multipleHallOpenStatus[+keysVal - 1] ? "block" : "hidden"} `}
                    >
                      <DoorComboboxPanel
                        index={0}
                        panelTitle={"Hall ends"}
                        valueProps={"3 x 7 half glass doors"}
                        dataList={WalkDoorSizeList}
                        panelName={"Hall ends"}
                        itemforRange={0}
                        nameForRange={""}
                        typeVal={""}
                        mainKey={""}
                        costCalculation={costCalculation}
                      />
                      <ForSelectItem
                        mainKey="optionalupgrades"
                        ItemNameTitle="Ceiling"
                        itemValue={"Select to add hall ceiling panels"}
                        itemStatus={downspout}
                        setItemStatus={setdownspout}
                        costCalculation={costCalculation}
                      />
                      <SizeComboboxPanel
                        panelName="Ceiling height"
                        dataList={recessCeilingHeight}
                        valueProps={7}
                        setValue={""}
                        costCalculation={costCalculation}
                        type="ceilingheight"
                        mainKey={"recess"}
                        index={Number(index)}
                      />
                      <ForSelectItem
                        mainKey="optionalupgrades"
                        ItemNameTitle="Flush hall"
                        itemValue={"Select to upgrade to flush hall panels"}
                        itemStatus={downspout}
                        setItemStatus={setdownspout}
                        costCalculation={costCalculation}
                      />
                      {Object.keys(multipleHall).length - 1 === index && (
                        <div
                          className={`min-[84px] mb-5 mt-4 rounded-xl bg-[#F7F7F7] px-[21px] py-[15px] text-[1.2rem] font-normal`}
                          onClick={() => {
                            const tempHallOpenStatus = {
                              ...multipleHallOpenStatus,
                            };
                            if (tempHallOpenStatus[index + 1]) {
                              tempHallOpenStatus[index + 1] =
                                !tempHallOpenStatus[index];
                            } else {
                              tempHallOpenStatus[index + 1] = true;
                            }

                            setMultipleHallOpenStatus(tempHallOpenStatus);
                            const tempMultipleHall = { ...multipleHall };
                            tempMultipleHall[index + 1] = index + 2;
                            setMultipleHall(tempMultipleHall);
                          }}
                        >
                          <p className="px-0 pb-[3.2px] pt-px">
                            Add another hall
                          </p>
                          <p className="px-0 pb-[7px] pt-px text-[0.9rem]">
                            Select to add another hall
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
