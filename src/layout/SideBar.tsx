/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-case-declarations */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-unescaped-entities */
// import AddMovable from "components/Controllers/Movables/AddMovable";
import React from "react";
import Price from "./Price/Price";
import ColorCombo from "./ColorCombo/ColorCombo";
import Loading from "components/Ui/Loading/Progress";
import ForSelectItem from "./ForSelectItem/ForSelectItem";
import WindowAndDoor from "./WindowAndDoor/WindowAndDoor";
import { useZoomInOrOut } from "store";
import { MdDelete } from "react-icons/md";
import { useEffect, useMemo } from "react";
import { useLeanTo } from "store/useLeanTo";
import { minMaxFun } from "utils/minMaxFun";
import { useGetPrice, usePriceCalculation } from "store/usePrice";
import { PitchOption } from "components/DisignPanel/Combobox/PitchOption";
import {
  useDoorName,
  useDoorStore,
  useSliderStatus,
  useDoorCombo,
} from "store/useDoor";
import { ComboboxPanel } from "components/DisignPanel/Combobox/ComboboxPanel";
import { SizeComboboxPanel } from "components/DisignPanel/Combobox/SizeComboboxPanel";
import { LeanToLengthCombobox } from "components/DisignPanel/Combobox/LeanToLengthCombobox/LeanToLengthCombobox";
import { costCalculationFun } from "utils/costCalculation";
import { SubmitButton } from "components/SubmitButton";
import { useAction } from "store/useAction";
import {
  usePlacement,
  useStoreSize,
  useStyle,
  useUpgrade,
  usePlacementForWindowDoor,
  useBuildingForWindowDoor,
  useMultipleDoorsWindows,
  useAddLeanToMultiple,
  useSliderUpdate,
} from "store";
import {
  eaveHeightSizeList,
  lengthSizeList,
  overhangList,
  placementList,
  styleList,
  leanToStyleList,
  widthSizeList,
  WalkDoorSizeList,
  WindowSizeList,
  RollupDoorSizeList,
  insetBayLengthList,
  leanToWidthSizeList,
  leanToLengthSizeList,
  leanToLengthSizeValueList,
  leanToDropHeightSizeList,
} from "assets/dataList";
import ViewDesignButton from "components/ViewDesignButton";

interface ICombo {
  key: number;
  type: string;
  size: string;
  placement: string;
  building: string;
}
export const SideBar = () => {
  const { doorComboData, removeComboData } = useDoorCombo();
  const { setSelectedItem } = useAction(["setSelectedItem"]);
  const { label } = useStyle();
  const lWidthSizeList = leanToWidthSizeList();
  const lLenthSizeList = leanToLengthSizeList();
  const lLengthSizeValueList = leanToLengthSizeValueList();
  const InsetBayLengthList = insetBayLengthList();
  const lDropHeightSizeList = leanToDropHeightSizeList();
  const { leanToData, leanToInsetBay, addLeanToState, updateLeanToData } =
    useLeanTo();
  const {
    downspout,
    wainscot,
    setdownspout,
    setWainscot,
    setInsetBay,
    insetbay,
    roofonly,
    setRoofOnly,
    linerPanels,
    setLinerPanels,
  } = useUpgrade();
  const { placement, leanToPlacement, setPlacement, setLeanToPlacement } =
    usePlacement();
  const { positionRange, setPositionRange } = useSliderUpdate();
  const { sliderStatus, setSliderStatus } = useSliderStatus();
  const { setZoomAvailable } = useZoomInOrOut();
  const {
    placementWalkDoor,
    setPlacementWalkDoor,
    placementRollUpDoor,
    setPlacementRollUpDoor,
    placementWindow,
    setPlacementWindow,
  } = usePlacementForWindowDoor();
  const {
    buildingWalkDoor,
    setBuildingWalkDoor,
    buildingRollUpDoor,
    setBuildingRollUpDoor,
    buildingWindow,
    setBuildingWindow,
  } = useBuildingForWindowDoor();
  const {
    width,
    eaveHeight,
    pitchOptionSize,
    leanToPitchOptionSize,
    overhangEave,
    overhangPurlin,
    basicLength,
    deltaHeight,
    length,
    bayLength,
    leanToDeltaHeight,
    leanToDropHeightSize,
    setWidth,
    setLength,
    setEaveHeight,
    setEaveOverhang,
    setGableOverhang,
    setBayLength,
    setLeanToPitch,
  } = useStoreSize();
  const {
    walkDoorName,
    rollupDoorName,
    windowName,
    setWindowName,
    setWalkDoorName,
    setRollupDoorName,
  } = useDoorName();
  const {
    multipleLeanTo,
    multipleLeanToOpenStatus,
    setMultipleLeanToOpenStatus,
    setMultipleLeanTo,
  } = useAddLeanToMultiple();

  const {
    multipleWalkDoor,
    setMultipleWalkDoor,
    multipleRollUpDoor,
    setMultipleRollUpDoor,
    multipleAddWindow,
    setMultipleAddWindow,
    multipleWalkDoorOpenStatus,
    setMultipleWalkDoorOpenStatus,
    multipleRollUpDoorOpenStatus,
    setMultipleRollUpOpenStatus,
    multipleAddWindowOpenStatus,
    setMultipleAddWindowOpenStatus,
  } = useMultipleDoorsWindows();
  const { doorData, addDoorData, sliceDoorData, addSliceDoorData } =
    useDoorStore();
  const { priceData, fetchPrice, isPriceLoaded, setDimension, dimension } =
    useGetPrice();
  const { priceList, setPriceList, totalPrice } = usePriceCalculation();

  useEffect(() => {
    label === "Inset Bay" ? setBayLength(10) : setBayLength(0);
  }, [label]);
  useEffect(() => {
    fetchPrice();
  }, []);
  useEffect(() => {
    costCalculation("style", label, "chooseyourstyle");
    costCalculation("width", width, "chooseyoursize");
    costCalculation("eaveheight", eaveHeight, "chooseyoursize");
    costCalculation("roofpitch", pitchOptionSize, "chooseyoursize");
    // costCalculation("closure", closure, "addleanto");
    costCalculation("eaveoverhang", overhangEave, "addoverhang");
    costCalculation("gableoverhang", overhangPurlin, "addoverhang");
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

  const updateLeanTo = (value: string, type?: string, index?: number) => {
    if (typeof index !== "undefined") {
      if (placement[index] === "Left Endwall") {
        updateLeanToData({
          wall: "EndWallFront",
          type: value,
          lWidth: leanToData[0].lWidth,
          lLength: leanToData[0].lLength,
          lEaveHeight:
            eaveHeight - leanToDeltaHeight[0].val - leanToDropHeightSize[0].val,
          lDeltaHeight: leanToDeltaHeight[0].val,
          lInsetBayLength: leanToData[0].lInsetBayLength,
          lPos: [0, 0, basicLength - length / 2],
          lRot: [0, Math.PI / 2, 0],
        });
        addLeanToState({ wall: "EndWallFront", seted: true });
      } else if (placement[index] === "Right Endwall") {
        updateLeanToData({
          wall: "EndWallBack",
          type: value,
          lWidth: leanToData[1].lWidth,
          lLength: leanToData[1].lLength,
          lEaveHeight:
            eaveHeight - leanToDeltaHeight[1].val - leanToDropHeightSize[1].val,
          lDeltaHeight: leanToDeltaHeight[1].val,
          lInsetBayLength: leanToData[1].lInsetBayLength,
          lPos: [0, 0, -length / 2],
          lRot: [0, -Math.PI / 2, 0],
        });
        addLeanToState({ wall: "EndWallBack", seted: true });
      } else if (placement[index] === "Front Sidewall") {
        if (roofonly) {
          updateLeanToData({
            wall: "SideWallRight",
            type: value,
            lWidth: leanToData[2].lWidth,
            lLength: leanToData[2].lLength,
            lEaveHeight:
              eaveHeight -
              leanToDeltaHeight[2].val -
              leanToDropHeightSize[2].val,
            lDeltaHeight: leanToDeltaHeight[2].val,
            lInsetBayLength: leanToData[2].lInsetBayLength,
            lPos: [width / 2 - 0.6, 0, -length / 2 + leanToData[2].lLength / 2],
            lRot: [0, Math.PI, 0],
          });
        } else {
          updateLeanToData({
            wall: "SideWallRight",
            type: value,
            lWidth: leanToData[2].lWidth,
            lLength: leanToData[2].lLength,
            lEaveHeight:
              eaveHeight -
              leanToDeltaHeight[2].val -
              leanToDropHeightSize[2].val,
            lDeltaHeight: leanToDeltaHeight[2].val,
            lInsetBayLength: leanToData[2].lInsetBayLength,
            lPos: [
              width / 2 - 0.1,
              0,
              -length / 2 + leanToData[2].lLength / 2 - 0.03,
            ],
            lRot: [0, Math.PI, 0],
          });
        }
        addLeanToState({ wall: "SideWallRight", seted: true });
      } else if (placement[index] === "Back Sidewall") {
        if (roofonly)
          updateLeanToData({
            wall: "SideWallLeft",
            type: value,
            lWidth: leanToData[3].lWidth,
            lLength: leanToData[3].lLength,
            lEaveHeight:
              eaveHeight -
              leanToDeltaHeight[3].val -
              leanToDropHeightSize[3].val,
            lDeltaHeight: leanToDeltaHeight[3].val,
            lInsetBayLength: leanToData[3].lInsetBayLength,
            lPos: [
              -width / 2 + 0.6,
              0,
              -length / 2 + leanToData[3].lLength / 2,
            ],
            lRot: [0, 0, 0],
          });
        else
          updateLeanToData({
            wall: "SideWallLeft",
            type: value,
            lWidth: leanToData[3].lWidth,
            lLength: leanToData[3].lLength,
            lEaveHeight:
              eaveHeight -
              leanToDeltaHeight[3].val -
              leanToDropHeightSize[3].val,
            lDeltaHeight: leanToDeltaHeight[3].val,
            lInsetBayLength: leanToData[3].lInsetBayLength,
            lPos: [-width / 2, 0, -length / 2 + leanToData[3].lLength / 2],
            lRot: [0, 0, 0],
          });
        addLeanToState({ wall: "SideWallLeft", seted: true });
      }
    }
  };

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

  const setLeanToLength = (value: string, type?: string, index?: number) => {
    const lengthValue =
      lLengthSizeValueList[Number(value.charAt(value.length - 1)) - 1].val;
    if (typeof index !== "undefined") {
      let leanToNum = NaN;
      if (placement[index] === "Left Endwall") leanToNum = 0;
      if (placement[index] === "Right Endwall") leanToNum = 1;
      if (placement[index] === "Front Sidewall") leanToNum = 2;
      if (placement[index] === "Back Sidewall") leanToNum = 3;

      if (
        placement[index] === "Front Sidewall" ||
        placement[index] === "Back Sidewall"
      ) {
        if (roofonly)
          updateLeanToData({
            wall: leanToData[leanToNum].wall,
            type: leanToData[leanToNum].type,
            lWidth: leanToData[leanToNum].lWidth,
            lLength: lengthValue,
            lEaveHeight: leanToData[leanToNum].lEaveHeight,
            lDeltaHeight: leanToData[leanToNum].lDeltaHeight,
            lInsetBayLength: leanToData[leanToNum].lInsetBayLength,
            lPos: [
              leanToData[leanToNum].lPos[0],
              leanToData[leanToNum].lPos[1],
              -length / 2 + lengthValue / 2,
            ],
            lRot: leanToData[leanToNum].lRot,
          });
        else {
          updateLeanToData({
            wall: leanToData[leanToNum].wall,
            type: leanToData[leanToNum].type,
            lWidth: leanToData[leanToNum].lWidth,
            lLength: lengthValue,
            lEaveHeight: leanToData[leanToNum].lEaveHeight,
            lDeltaHeight: leanToData[leanToNum].lDeltaHeight,
            lInsetBayLength: leanToData[leanToNum].lInsetBayLength,
            lPos: [
              leanToData[leanToNum].lPos[0],
              leanToData[leanToNum].lPos[1],
              -length / 2 + lengthValue / 2 - 0.03,
            ],
            lRot: leanToData[leanToNum].lRot,
          });
        }
      }
      if (
        placement[index] === "Left Endwall" ||
        placement[index] === "Right Endwall"
      )
        updateLeanToData({
          wall: leanToData[leanToNum].wall,
          type: leanToData[leanToNum].type,
          lWidth: leanToData[leanToNum].lWidth,
          lLength: lengthValue,
          lEaveHeight: leanToData[leanToNum].lEaveHeight,
          lDeltaHeight: leanToData[leanToNum].lDeltaHeight,
          lInsetBayLength: leanToData[leanToNum].lInsetBayLength,
          lPos: [
            leanToData[leanToNum].lPos[0],
            leanToData[leanToNum].lPos[1],
            leanToData[leanToNum].lPos[2],
          ],
          lRot: leanToData[leanToNum].lRot,
        });
    }
  };

  const setLeanToDropHeight = (value: any, type?: string, index?: number) => {
    if (typeof index !== "undefined") {
      let leanToNum = NaN;
      if (placement[index] === "Left Endwall") leanToNum = 0;
      if (placement[index] === "Right Endwall") leanToNum = 1;
      if (placement[index] === "Front Sidewall") leanToNum = 2;
      if (placement[index] === "Back Sidewall") leanToNum = 3;

      if (label === "Single Slope" && placement[index] === "Front Sidewall") {
        if (value === "None") {
          updateLeanToData({
            wall: leanToData[leanToNum].wall,
            type: leanToData[leanToNum].type,
            lWidth: leanToData[leanToNum].lWidth,
            lLength: leanToData[leanToNum].lLength,
            lEaveHeight:
              eaveHeight + deltaHeight - leanToData[leanToNum].lDeltaHeight,
            lDeltaHeight: leanToData[leanToNum].lDeltaHeight,
            lInsetBayLength: leanToData[leanToNum].lInsetBayLength,
            lPos: leanToData[leanToNum].lPos,
            lRot: leanToData[leanToNum].lRot,
          });
        } else {
          updateLeanToData({
            wall: leanToData[leanToNum].wall,
            type: leanToData[leanToNum].type,
            lWidth: leanToData[leanToNum].lWidth,
            lLength: leanToData[leanToNum].lLength,
            lEaveHeight:
              eaveHeight +
              deltaHeight -
              leanToData[leanToNum].lDeltaHeight -
              value,
            lDeltaHeight: leanToData[leanToNum].lDeltaHeight,
            lInsetBayLength: leanToData[leanToNum].lInsetBayLength,
            lPos: leanToData[leanToNum].lPos,
            lRot: leanToData[leanToNum].lRot,
          });
        }
      } else {
        if (value === "None") {
          updateLeanToData({
            wall: leanToData[leanToNum].wall,
            type: leanToData[leanToNum].type,
            lWidth: leanToData[leanToNum].lWidth,
            lLength: leanToData[leanToNum].lLength,
            lEaveHeight: eaveHeight - leanToData[leanToNum].lDeltaHeight,
            lDeltaHeight: leanToData[leanToNum].lDeltaHeight,
            lInsetBayLength: leanToData[leanToNum].lInsetBayLength,
            lPos: leanToData[leanToNum].lPos,
            lRot: leanToData[leanToNum].lRot,
          });
        } else {
          updateLeanToData({
            wall: leanToData[leanToNum].wall,
            type: leanToData[leanToNum].type,
            lWidth: leanToData[leanToNum].lWidth,
            lLength: leanToData[leanToNum].lLength,
            lEaveHeight:
              eaveHeight - leanToData[leanToNum].lDeltaHeight - value,
            lDeltaHeight: leanToData[leanToNum].lDeltaHeight,
            lInsetBayLength: leanToData[leanToNum].lInsetBayLength,
            lPos: leanToData[leanToNum].lPos,
            lRot: leanToData[leanToNum].lRot,
          });
        }
      }
    }
  };

  const setLeanToInsetBayLength = (
    value: number,
    index: number,
    type: string,
  ) => {
    let leanToWall = "";
    let leanToNum = NaN;

    if (index !== undefined) {
      if (placement[index] === "Left Endwall") {
        leanToWall = "EndWallFront";
        leanToNum = 0;
      }
      if (placement[index] === "Right Endwall") {
        leanToWall = "EndWallBack";
        leanToNum = 1;
      }
      if (placement[index] === "Front Sidewall") {
        leanToWall = "SideWallRight";
        leanToNum = 2;
      }
      if (placement[index] === "Back Sidewall") {
        leanToWall = "SideWallLeft";
        leanToNum = 3;
      }
    }

    switch (leanToWall) {
      case "EndWallFront":
        updateLeanToData({
          wall: leanToWall,
          type: type,
          lWidth: leanToData[leanToNum].lWidth,
          lLength: leanToData[leanToNum].lLength,
          lEaveHeight:
            eaveHeight -
            leanToDeltaHeight[leanToNum].val -
            leanToDropHeightSize[leanToNum].val,
          lDeltaHeight: leanToDeltaHeight[leanToNum].val,
          lInsetBayLength: value,
          lPos: [0, 0, basicLength - length / 2],
          lRot: [0, Math.PI / 2, 0],
        });
        break;
      case "EndWallBack":
        updateLeanToData({
          wall: leanToWall,
          type: type,
          lWidth: leanToData[leanToNum].lWidth,
          lLength: leanToData[leanToNum].lLength,
          lEaveHeight:
            eaveHeight -
            leanToDeltaHeight[leanToNum].val -
            leanToDropHeightSize[leanToNum].val,
          lDeltaHeight: leanToDeltaHeight[leanToNum].val,
          lInsetBayLength: value,
          lPos: [0, 0, -length / 2],
          lRot: [0, -Math.PI / 2, 0],
        });
        break;
      case "SideWallRight":
        if (roofonly) {
          updateLeanToData({
            wall: leanToWall,
            type: type,
            lWidth: leanToData[leanToNum].lWidth,
            lLength: leanToData[leanToNum].lLength,
            lEaveHeight:
              eaveHeight -
              leanToDeltaHeight[leanToNum].val -
              leanToDropHeightSize[leanToNum].val,
            lDeltaHeight: leanToDeltaHeight[leanToNum].val,
            lInsetBayLength: value,
            lPos: [
              width / 2 - 0.6,
              0,
              -length / 2 + leanToData[leanToNum].lLength / 2,
            ],
            lRot: [0, Math.PI, 0],
          });
        } else {
          updateLeanToData({
            wall: leanToWall,
            type: type,
            lWidth: leanToData[leanToNum].lWidth,
            lLength: leanToData[leanToNum].lLength,
            lEaveHeight:
              eaveHeight -
              leanToDeltaHeight[leanToNum].val -
              leanToDropHeightSize[leanToNum].val,
            lDeltaHeight: leanToDeltaHeight[leanToNum].val,
            lInsetBayLength: value,
            lPos: [
              width / 2,
              0,
              -length / 2 + leanToData[leanToNum].lLength / 2,
            ],
            lRot: [0, Math.PI, 0],
          });
        }
        break;
      case "SideWallLeft":
        if (roofonly)
          updateLeanToData({
            wall: leanToWall,
            type: type,
            lWidth: leanToData[leanToNum].lWidth,
            lLength: leanToData[leanToNum].lLength,
            lEaveHeight:
              eaveHeight -
              leanToDeltaHeight[leanToNum].val -
              leanToDropHeightSize[leanToNum].val,
            lDeltaHeight: leanToDeltaHeight[leanToNum].val,
            lInsetBayLength: value,
            lPos: [
              -width / 2 + 0.6,
              0,
              -length / 2 + leanToData[leanToNum].lLength / 2,
            ],
            lRot: [0, 0, 0],
          });
        else
          updateLeanToData({
            wall: leanToWall,
            type: type,
            lWidth: leanToData[leanToNum].lWidth,
            lLength: leanToData[leanToNum].lLength,
            lEaveHeight:
              eaveHeight -
              leanToDeltaHeight[leanToNum].val -
              leanToDropHeightSize[leanToNum].val,
            lDeltaHeight: leanToDeltaHeight[leanToNum].val,
            lInsetBayLength: value,
            lPos: [
              -width / 2,
              0,
              -length / 2 + leanToData[leanToNum].lLength / 2,
            ],
            lRot: [0, 0, 0],
          });
        break;
      default:
        break;
    }
  };

  const setPlaceMentForWindowDoor = (
    val: any,
    type?: string,
    index?: number,
  ) => {
    if (type === "walkdoor") {
      const tempPlacement = { ...placementWalkDoor } as {
        [key: number]: string;
      };

      if (typeof index !== "undefined") {
        tempPlacement[index] = val;
        setPlacementWalkDoor(tempPlacement);
      }
    } else if (type === "rollupdoor") {
      const tempPlacement = { ...placementRollUpDoor };
      if (typeof index !== "undefined") {
        tempPlacement[index] = val;
        setPlacementWalkDoor(tempPlacement);
      }
      setPlacementRollUpDoor(tempPlacement);
    } else {
      const tempPlacement = { ...placementWindow };
      if (typeof index !== "undefined") {
        tempPlacement[index] = val;
        setPlacementWindow(tempPlacement);
      }
    }
  };

  const setBuildingForWindowDoor = (
    val: any,
    type?: string,
    index?: number,
  ) => {
    if (type === "walkdoor") {
      const tempBuilding = { ...buildingWalkDoor } as {
        [key: number]: string;
      };

      if (typeof index !== "undefined") {
        tempBuilding[index] = val;
        setBuildingWalkDoor(tempBuilding);
      }
    } else if (type === "rollupdoor") {
      const tempBuilding = { ...buildingRollUpDoor };
      if (typeof index !== "undefined") {
        tempBuilding[index] = val;
        setBuildingRollUpDoor(tempBuilding);
      }
      setBuildingRollUpDoor(tempBuilding);
    } else {
      const tempBuilding = { ...buildingWindow };
      if (typeof index !== "undefined") {
        tempBuilding[index] = val;
        setBuildingWindow(tempBuilding);
      }
    }
  };

  const deleteData = (
    type: string,
    itemforRange: string | number,
    multipleItem: { [key: number]: number | string },
    multipleItemOpenStatus: { [key: number]: boolean },
    setMultipleItemOpenStatus: (value: { [key: number]: boolean }) => void,
    setMultipleItemDoor: (value: { [key: number]: number | string }) => void,
    placementItem: { [key: string]: string },
    setPlacementItem: (value: { [key: string]: string }) => void,
    itemName: { [key: string]: string },
    setItemName: (value: { [key: string]: string }) => void,
    panelName: string,
    buildingItem: { [key: string]: string },
    setBuldingItem: (value: { [key: string]: string }) => void,
  ) => {
    setSelectedItem("");
    const tempDoor = doorData.filter((itm) => {
      if (itm.nameForRange === type) {
        return itm.itemforRange !== itemforRange;
      } else {
        return itm;
      }
    });
    const tempSliceDoorData = sliceDoorData.filter((itm) => {
      if (itm.nameForRange === type) {
        return itm.itemforRange !== itemforRange;
      } else {
        return itm;
      }
    });
    addDoorData(tempDoor);
    addSliceDoorData(tempSliceDoorData);
    const tempMultipleWalkItem = { ...multipleItem };
    const tempObj = {} as { [key: string | number]: string | number };
    Object.keys(tempMultipleWalkItem).forEach((item: string) => {
      if (tempMultipleWalkItem[+item] !== itemforRange) {
        tempObj[+item] = tempMultipleWalkItem[+item];
      }
    });
    const tempObjectItemOpenStatus = { ...multipleItemOpenStatus };
    Object.keys(multipleItemOpenStatus).forEach((val: number | string) => {
      if (+val === +itemforRange - 1) {
        tempObjectItemOpenStatus[+val] = false;
      }
    });

    const tempPlacement = {} as { [key: number]: string };
    Object.keys(placementItem).forEach((itm, index) => {
      if (Number(itemforRange) - 1 !== Number(itm)) {
        tempPlacement[Number(itm)] = placementItem[Number(itm)];
      }
    });

    setPlacementItem(tempPlacement);
    const tempBuilding = {} as { [key: number]: string };
    Object.keys(buildingItem).forEach((itm, index) => {
      if (Number(itemforRange) - 1 !== Number(itm)) {
        tempBuilding[Number(itm)] = buildingItem[Number(itm)];
      }
    });

    setBuldingItem(tempBuilding);

    const tempItemName = {} as { [key: number]: string };
    Object.keys(itemName).forEach((itm, index) => {
      if (Number(itemforRange) !== Number(itm)) {
        tempItemName[Number(itm)] = itemName[Number(itm)];
      }
    });

    setItemName(tempItemName);
    removeComboData(Number(itemforRange), panelName);
    setMultipleItemOpenStatus(tempObjectItemOpenStatus);
    setMultipleItemDoor(tempObj);
  };

  const deleteMultipleWindowDoor = (
    e: any,
    type: string,
    itemforRange: string | number,
    index: number,
    val: string | number,
    mainKey: string,
    panelName: string,
  ) => {
    e.stopPropagation();

    if (type === "walkdoor") {
      deleteData(
        type,
        itemforRange,
        multipleWalkDoor,
        multipleWalkDoorOpenStatus,
        setMultipleWalkDoorOpenStatus,
        setMultipleWalkDoor,
        placementWalkDoor,
        setPlacementWalkDoor,
        walkDoorName,
        setWalkDoorName,
        panelName,
        buildingWalkDoor,
        setBuildingWalkDoor,
      );
    } else if (type === "rollupdoor") {
      deleteData(
        type,
        itemforRange,
        multipleRollUpDoor,
        multipleRollUpDoorOpenStatus,
        setMultipleRollUpOpenStatus,
        setMultipleRollUpDoor,
        placementRollUpDoor,
        setPlacementRollUpDoor,
        rollupDoorName,
        setRollupDoorName,
        panelName,
        buildingRollUpDoor,
        setBuildingRollUpDoor,
      );
    } else {
      deleteData(
        type,
        itemforRange,
        multipleAddWindow,
        multipleAddWindowOpenStatus,
        setMultipleAddWindowOpenStatus,
        setMultipleAddWindow,
        placementWindow,
        setPlacementWindow,
        windowName,
        setWindowName,
        panelName,
        buildingWindow,
        setBuildingWindow,
      );
    }
  };

  const increaseCount = (type: string, index: number) => {
    if (type === "walkdoor") {
      const tempMultipleWalkDoorOpenStatus = { ...multipleWalkDoorOpenStatus };
      if (tempMultipleWalkDoorOpenStatus[index]) {
        tempMultipleWalkDoorOpenStatus[index] =
          !tempMultipleWalkDoorOpenStatus[index];
      } else {
        tempMultipleWalkDoorOpenStatus[index] = true;
      }
      setMultipleWalkDoorOpenStatus(tempMultipleWalkDoorOpenStatus);

      const tempMultipleWalkDoor = { ...multipleWalkDoor };
      tempMultipleWalkDoor[index] = index + 1;

      setMultipleWalkDoor(tempMultipleWalkDoor);
    } else if (type === "rollupdoor") {
      const tempMultipleRollUpDoorOpenStatus = {
        ...multipleRollUpDoorOpenStatus,
      };
      if (tempMultipleRollUpDoorOpenStatus[index]) {
        tempMultipleRollUpDoorOpenStatus[index] =
          !tempMultipleRollUpDoorOpenStatus[index];
      } else {
        tempMultipleRollUpDoorOpenStatus[index] = true;
      }
      setMultipleRollUpOpenStatus(tempMultipleRollUpDoorOpenStatus);

      const tempMultipleRollUpDoor = { ...multipleRollUpDoor };
      tempMultipleRollUpDoor[index] = index + 1;

      setMultipleRollUpDoor(tempMultipleRollUpDoor);
    } else {
      const tempMultipleAddWindowOpenStatus = {
        ...multipleAddWindowOpenStatus,
      };
      if (tempMultipleAddWindowOpenStatus[index]) {
        tempMultipleAddWindowOpenStatus[index] =
          !tempMultipleAddWindowOpenStatus[index];
      } else {
        tempMultipleAddWindowOpenStatus[index] = true;
      }
      setMultipleAddWindowOpenStatus(tempMultipleAddWindowOpenStatus);

      const tempMultipleAddWindow = { ...multipleAddWindow };
      tempMultipleAddWindow[index] = index + 1;

      setMultipleAddWindow(tempMultipleAddWindow);
    }
  };

  const onRangeChangeHandler = (e: any, index: number, name: string) => {
    const tempPositionRange = { ...positionRange };
    if (tempPositionRange[name].length === 0) {
      tempPositionRange[name].push(+e.target.value);
    } else {
      tempPositionRange[name][index] = +e.target.value;
    }

    setPositionRange(tempPositionRange);
  };

  const minMaxCalculator = (
    minOrMax: string,
    length: number,
    width: number,
    placement: string,
    type?: string,
    value?: string,
  ): string => {
    let tempMinMaxValue: string;
    if (value) {
      tempMinMaxValue = minMaxFun(
        placement,
        minOrMax,
        width,
        length,
        type,
        value,
      );
      return tempMinMaxValue;
    }
    return "";
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

  const multipleLeanToDeleteHandler = (
    index: number,
    keyVals: string | number,
  ) => {
    switch (placement[Number(keyVals) - 1]) {
      case "Left Endwall":
        updateLeanToData({
          wall: "EndWallFront",
          type: "Closure",
          lWidth: leanToData[0].lWidth,
          lLength: leanToData[0].lLength,
          lEaveHeight:
            eaveHeight - leanToDeltaHeight[0].val - leanToDropHeightSize[0].val,
          lDeltaHeight: leanToDeltaHeight[0].val,
          lInsetBayLength: leanToData[0].lInsetBayLength,
          lPos: [0, 0, basicLength - length / 2],
          lRot: [0, Math.PI / 2, 0],
        });
        addLeanToState({ wall: "EndWallFront", seted: false });
        break;
      case "Right Endwall":
        updateLeanToData({
          wall: "EndWallBack",
          type: "Closure",
          lWidth: leanToData[1].lWidth,
          lLength: leanToData[1].lLength,
          lEaveHeight:
            eaveHeight - leanToDeltaHeight[1].val - leanToDropHeightSize[1].val,
          lDeltaHeight: leanToDeltaHeight[1].val,
          lInsetBayLength: leanToData[1].lInsetBayLength,
          lPos: [0, 0, -length / 2],
          lRot: [0, -Math.PI / 2, 0],
        });
        addLeanToState({ wall: "EndWallBack", seted: false });
        break;
      case "Back Sidewall":
        if (roofonly)
          updateLeanToData({
            wall: "SideWallLeft",
            type: "Closure",
            lWidth: leanToData[3].lWidth,
            lLength: leanToData[3].lLength,
            lEaveHeight:
              eaveHeight -
              leanToDeltaHeight[3].val -
              leanToDropHeightSize[3].val,
            lDeltaHeight: leanToDeltaHeight[3].val,
            lInsetBayLength: leanToData[3].lInsetBayLength,
            lPos: [
              -width / 2 + 0.6,
              0,
              -length / 2 + leanToData[3].lLength / 2,
            ],
            lRot: [0, 0, 0],
          });
        else
          updateLeanToData({
            wall: "SideWallLeft",
            type: "Closure",
            lWidth: leanToData[3].lWidth,
            lLength: leanToData[3].lLength,
            lEaveHeight:
              eaveHeight -
              leanToDeltaHeight[3].val -
              leanToDropHeightSize[3].val,
            lDeltaHeight: leanToDeltaHeight[3].val,
            lInsetBayLength: leanToData[3].lInsetBayLength,
            lPos: [-width / 2, 0, -length / 2 + leanToData[3].lLength / 2],
            lRot: [0, 0, 0],
          });
        addLeanToState({ wall: "SideWallLeft", seted: false });
        break;
      case "Front Sidewall":
        if (roofonly)
          updateLeanToData({
            wall: "SideWallRight",
            type: "Closure",
            lWidth: leanToData[2].lWidth,
            lLength: leanToData[2].lLength,
            lEaveHeight:
              eaveHeight -
              leanToDeltaHeight[2].val -
              leanToDropHeightSize[2].val,
            lDeltaHeight: leanToDeltaHeight[2].val,
            lInsetBayLength: leanToData[2].lInsetBayLength,
            lPos: [width / 2 - 0.6, 0, -length / 2 + leanToData[2].lLength / 2],
            lRot: [0, Math.PI, 0],
          });
        else {
          updateLeanToData({
            wall: "SideWallRight",
            type: "Closure",
            lWidth: leanToData[2].lWidth,
            lLength: leanToData[2].lLength,
            lEaveHeight:
              eaveHeight -
              leanToDeltaHeight[2].val -
              leanToDropHeightSize[2].val,
            lDeltaHeight: leanToDeltaHeight[2].val,
            lInsetBayLength: leanToData[2].lInsetBayLength,
            lPos: [
              width / 2 - 0.1,
              0,
              -length / 2 + leanToData[2].lLength / 2 - 0.03,
            ],
            lRot: [0, Math.PI, 0],
          });
        }

        addLeanToState({ wall: "SideWallRight", seted: false });
        break;
      default:
        break;
    }
    const tempLeanToOpenStatus = {
      ...multipleLeanToOpenStatus,
    };
    if (tempLeanToOpenStatus[index]) {
      tempLeanToOpenStatus[index] = false;
    }
    setMultipleLeanToOpenStatus(tempLeanToOpenStatus);
    const tempMultipleLeanTo = { ...multipleLeanTo };
    const tempObj = {} as { [key: string | number]: string | number };
    Object.keys(tempMultipleLeanTo).forEach((item: string) => {
      if (tempMultipleLeanTo[Number(item)] !== keyVals) {
        tempObj[+item] = tempMultipleLeanTo[+item];
      }
    });
    setMultipleLeanTo(tempObj);
    const tempPlacement = {} as { [key: number]: string };
    Object.keys(placement).forEach((itm, index) => {
      if (Number(keyVals) - 1 !== Number(itm)) {
        tempPlacement[Number(itm)] = placement[Number(itm)];
      }
    });
    setPlacement(tempPlacement);
  };
  const setPlaceMentForLeanTo = (val: any, type?: string, index?: number) => {
    const tempPlacement = { ...placement } as {
      [key: number]: string;
    };
    if (typeof index !== "undefined") {
      let leanToNum = NaN;
      if (placement[index] === "Left Endwall") leanToNum = 0;
      if (placement[index] === "Right Endwall") leanToNum = 1;
      if (placement[index] === "Front Sidewall") leanToNum = 2;
      if (placement[index] === "Back Sidewall") leanToNum = 3;

      if (leanToNum >= 0) {
        updateLeanToData({
          wall: leanToData[leanToNum].wall,
          type: "Closure",
          lWidth: leanToData[leanToNum].lWidth,
          lLength: leanToData[leanToNum].lLength,
          lEaveHeight: eaveHeight - leanToData[leanToNum].lDeltaHeight,
          lDeltaHeight: leanToData[leanToNum].lDeltaHeight,
          lInsetBayLength: leanToData[leanToNum].lInsetBayLength,
          lPos: leanToData[leanToNum].lPos,
          lRot: leanToData[leanToNum].lRot,
        });
        addLeanToState({ wall: leanToData[leanToNum].wall, seted: false });
      }
      tempPlacement[index] = val;
      setPlacement(tempPlacement);

      switch (tempPlacement[index]) {
        case "Left Endwall":
          updateLeanToData({
            wall: "EndWallFront",
            type: "Enclosed",
            lWidth: leanToData[0].lWidth,
            lLength: width,
            lEaveHeight:
              eaveHeight -
              leanToDeltaHeight[0].val -
              leanToDropHeightSize[0].val,
            lDeltaHeight: leanToDeltaHeight[0].val,
            lInsetBayLength: leanToData[0].lInsetBayLength,
            lPos: [0, 0, basicLength - length / 2],
            lRot: [0, Math.PI / 2, 0],
          });
          addLeanToState({ wall: "EndWallFront", seted: true });
          break;
        case "Right Endwall":
          updateLeanToData({
            wall: "EndWallBack",
            type: "Enclosed",
            lWidth: leanToData[1].lWidth,
            lLength: width,
            lEaveHeight:
              eaveHeight -
              leanToDeltaHeight[1].val -
              leanToDropHeightSize[1].val,
            lDeltaHeight: leanToDeltaHeight[1].val,
            lInsetBayLength: leanToData[1].lInsetBayLength,
            lPos: [0, 0, -length / 2],
            lRot: [0, -Math.PI / 2, 0],
          });
          addLeanToState({ wall: "EndWallBack", seted: true });
          break;
        case "Back Sidewall":
          if (roofonly)
            updateLeanToData({
              wall: "SideWallLeft",
              type: "Enclosed",
              lWidth: leanToData[3].lWidth,
              lLength: length,
              lEaveHeight:
                eaveHeight -
                leanToDeltaHeight[3].val -
                leanToDropHeightSize[3].val,
              lDeltaHeight: leanToDeltaHeight[3].val,
              lInsetBayLength: leanToData[3].lInsetBayLength,
              lPos: [-width / 2 + 0.6, 0, 0],
              lRot: [0, 0, 0],
            });
          else
            updateLeanToData({
              wall: "SideWallLeft",
              type: "Enclosed",
              lWidth: leanToData[3].lWidth,
              lLength: length,
              lEaveHeight:
                eaveHeight -
                leanToDeltaHeight[3].val -
                leanToDropHeightSize[3].val,
              lDeltaHeight: leanToDeltaHeight[3].val,
              lInsetBayLength: leanToData[3].lInsetBayLength,
              lPos: [-width / 2, 0, 0],
              lRot: [0, 0, 0],
            });
          addLeanToState({ wall: "SideWallLeft", seted: true });
          break;
        case "Front Sidewall":
          if (roofonly)
            updateLeanToData({
              wall: "SideWallRight",
              type: "Enclosed",
              lWidth: leanToData[2].lWidth,
              lLength: length,
              lEaveHeight:
                eaveHeight -
                leanToDeltaHeight[2].val -
                leanToDropHeightSize[2].val,
              lDeltaHeight: leanToDeltaHeight[2].val,
              lInsetBayLength: leanToData[2].lInsetBayLength,
              lPos: [width / 2 - 0.6, 0, 0],
              lRot: [0, Math.PI, 0],
            });
          else {
            updateLeanToData({
              wall: "SideWallRight",
              type: "Enclosed",
              lWidth: leanToData[2].lWidth,
              lLength: length,
              lEaveHeight:
                eaveHeight -
                leanToDeltaHeight[2].val -
                leanToDropHeightSize[2].val,
              lDeltaHeight: leanToDeltaHeight[2].val,
              lInsetBayLength: leanToData[2].lInsetBayLength,
              lPos: [width / 2 - 0.1, 0, 0],
              lRot: [0, Math.PI, 0],
            });
          }

          addLeanToState({ wall: "SideWallRight", seted: true });
          break;
        default:
          break;
      }
    }
  };

  const setItemNameHandler = (val: string, index: number, type: string) => {
    if (type === "walkdoor") {
      const tempWalkDoorName = { ...walkDoorName };
      tempWalkDoorName[index] = val;
      setWalkDoorName(tempWalkDoorName);
    } else if (type === "rollupdoor") {
      const tempRollupDoorName = { ...rollupDoorName };
      tempRollupDoorName[index] = val;
      setRollupDoorName(tempRollupDoorName);
    } else {
      const tempWindowName = { ...windowName };
      tempWindowName[index] = val;
      setWindowName(tempWindowName);
    }
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
              Add a lean-to
            </h3>

            <>
              {Object.keys(multipleLeanTo).length === 0 && (
                <div
                  className={`min-[84px] mb-5 mt-4 rounded-xl bg-[#F7F7F7] px-[21px] py-[15px] text-[1.2rem] font-normal`}
                  onClick={() => {
                    const tempLeanToOpenStatus = {
                      ...multipleLeanToOpenStatus,
                    };
                    if (tempLeanToOpenStatus[0]) {
                      tempLeanToOpenStatus[0] = !tempLeanToOpenStatus[0];
                    } else {
                      tempLeanToOpenStatus[0] = true;
                    }
                    setMultipleLeanToOpenStatus(tempLeanToOpenStatus);

                    const tempMultipleLeanTo = { ...multipleLeanTo };
                    tempMultipleLeanTo[0] = 1;

                    setMultipleLeanTo(tempMultipleLeanTo);
                  }}
                >
                  <p className="px-0 pb-[3.2px] pt-px">Lean-to</p>
                  <p className="px-0 pb-[7px] pt-px text-[0.9rem]">
                    Select to add a lean-to
                  </p>
                </div>
              )}
              {Object.values(multipleLeanTo).map((keysVal, index) => {
                return (
                  <React.Fragment key={index}>
                    <div
                      className={`min-[84px] group relative mb-5 mt-4 rounded-xl px-[21px] py-[15px] text-[1.2rem] font-normal ${multipleLeanToOpenStatus[+keysVal - 1] ? "bg-[#B6B6B6] text-[#FFF]" : "bg-[#F7F7F7]"}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        const tempLeanToOpenStatus = {
                          ...multipleLeanToOpenStatus,
                        };
                        if (tempLeanToOpenStatus[+keysVal - 1]) {
                          tempLeanToOpenStatus[+keysVal - 1] =
                            !tempLeanToOpenStatus[+keysVal - 1];
                        } else {
                          tempLeanToOpenStatus[+keysVal - 1] = true;
                        }
                        setMultipleLeanToOpenStatus(tempLeanToOpenStatus);
                      }}
                    >
                      <div
                        className="absolute bottom-0 right-0 top-0 hidden cursor-pointer items-center rounded-r-lg bg-red-500 p-2 group-hover:flex group-hover:text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          multipleLeanToDeleteHandler(index, keysVal);
                        }}
                      >
                        <span>
                          <MdDelete />
                        </span>
                      </div>
                      <p className="px-0 pb-[3.2px] pt-px">
                        Lean-to {index + 1}
                      </p>
                      <p className="px-0 pb-[7px] pt-px text-[0.9rem]">
                        Click to hide or show options
                      </p>
                    </div>
                    <div
                      className={`hover:cursor-pointer ${multipleLeanToOpenStatus[+keysVal - 1] ? "block" : "hidden"} `}
                    >
                      <ComboboxPanel
                        dataKey={index}
                        doorType=""
                        panelName="Placement"
                        dataList={placementList}
                        valueProps={placement[Number(index)]}
                        setValue={setPlaceMentForLeanTo}
                        costCalculation={costCalculation}
                        type="closure"
                        index={Number(keysVal) - 1}
                        mainKey={"addleanto"}
                      />
                      <SizeComboboxPanel
                        panelName="Width"
                        dataList={lWidthSizeList}
                        valueProps={
                          leanToSizeProps.leanToWidth[
                            `${placement[Number(index)]}`
                          ]
                        }
                        setValue={setLeanToWidth}
                        costCalculation={costCalculation}
                        type="leantowidth"
                        mainKey={"addleanto"}
                        index={Number(index)}
                      />
                      <LeanToLengthCombobox
                        panelName="Length"
                        dataList={lLenthSizeList}
                        valueProps={
                          leanToSizeProps.leanToLength[
                            `${placement[Number(index)]}`
                          ]
                        }
                        setValue={setLeanToLength}
                        costCalculation={costCalculation}
                        type="leantolength"
                        mainKey={"addleanto"}
                        index={Number(index)}
                      />
                      <SizeComboboxPanel
                        panelName="Drop height"
                        dataList={lDropHeightSizeList}
                        valueProps={
                          leanToSizeProps.leanToEaveHeight[
                            `${placement[Number(index)]}`
                          ]
                        }
                        setValue={setLeanToDropHeight}
                        costCalculation={costCalculation}
                        type="leantodropheight"
                        mainKey={"addleanto"}
                        index={Number(index)}
                      />
                      <PitchOption
                        valueProps={
                          leanToSizeProps.leanToPitchList[
                            `${placement[Number(index)]}`
                          ]
                        }
                        type={"leanto"}
                        wall={
                          leanToSizeProps.leanToWall[
                            `${placement[Number(index)]}`
                          ]
                        }
                        costCalculation={costCalculation}
                        typePitch="roofpitch"
                        mainKey={"addleanto"}
                        indexKey={Number(index)}
                        setValue={setLeanToDropHeight}
                      />
                      <ForSelectItem
                        ItemNameTitle="Inset bay"
                        costCalculation={costCalculation}
                        itemStatus={placement[index]}
                        setItemStatus={updateLeanTo}
                        itemName="leantoinsetbay"
                        itemValue={"Select to inset bay"}
                        mainKey="chooseyoursize"
                        index={Number(index)}
                        setValue={setLeanToInsetBayLength}
                      />
                      <div
                        className={`${
                          leanToInsetBay.filter((item) => {
                            let compPlacement = "";
                            switch (placement[index]) {
                              case "Left Endwall":
                                compPlacement = "EndWallFront";
                                break;
                              case "Right Endwall":
                                compPlacement = "EndWallBack";
                                break;
                              case "Back Sidewall":
                                compPlacement = "SideWallLeft";
                                break;
                              case "Front Sidewall":
                                compPlacement = "SideWallRight";
                                break;
                              default:
                                break;
                            }
                            if (item.wall === compPlacement) {
                              return item;
                            }
                          })[0]?.seted === true
                            ? "block"
                            : "hidden"
                        }`}
                      >
                        <SizeComboboxPanel
                          panelName="Inset bay length"
                          dataList={InsetBayLengthList}
                          valueProps={bayLength}
                          setValue={setLeanToInsetBayLength}
                          type="leantoinsetbaylength"
                          costCalculation={costCalculation}
                          mainKey={"chooseyoursize"}
                          index={Number(index)}
                        />
                      </div>
                      <ForSelectItem
                        ItemNameTitle="Roof only"
                        costCalculation={costCalculation}
                        itemStatus={placement[index]}
                        setItemStatus={updateLeanTo}
                        itemName="leantoroofonly"
                        itemValue={"Select to remove all walls"}
                        mainKey="chooseyoursize"
                        index={Number(index)}
                        setValue={setLeanToInsetBayLength}
                      />
                      {Object.keys(multipleLeanTo).length - 1 === index &&
                        Object.keys(multipleLeanTo).length < 4 && (
                          <div
                            className={`min-[84px] mb-5 mt-4 rounded-xl bg-[#F7F7F7] px-[21px] py-[15px] text-[1.2rem] font-normal`}
                            onClick={() => {
                              const tempLeanToOpenStatus = {
                                ...multipleLeanToOpenStatus,
                              };
                              if (tempLeanToOpenStatus[index + 1]) {
                                tempLeanToOpenStatus[index + 1] =
                                  !tempLeanToOpenStatus[index];
                              } else {
                                tempLeanToOpenStatus[index + 1] = true;
                              }

                              setMultipleLeanToOpenStatus(tempLeanToOpenStatus);
                              const tempMultipleLeanTo = { ...multipleLeanTo };
                              tempMultipleLeanTo[index + 1] = index + 2;
                              setMultipleLeanTo(tempMultipleLeanTo);
                            }}
                          >
                            <p className="px-0 pb-[3.2px] pt-px">
                              Add another lean-to
                            </p>
                            <p className="px-0 pb-[7px] pt-px text-[0.9rem]">
                              Select to add another lean-to
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
              Add overhang
            </h3>
            <SizeComboboxPanel
              panelName="Eave overhang"
              dataList={overhangList}
              valueProps={overhangEave}
              setValue={setEaveOverhang}
              costCalculation={costCalculation}
              type="eaveoverhang"
              mainKey={"addoverhang"}
            />
            <SizeComboboxPanel
              panelName="Gable overhang"
              dataList={overhangList}
              valueProps={overhangPurlin / 2}
              setValue={setGableOverhang}
              costCalculation={costCalculation}
              type="gableoverhang"
              mainKey={"addoverhang"}
            />
          </div>
          <div>
            <h3 className="mb-[0.3rem] text-2xl font-light">
              Choose your window and door openings
            </h3>
            <WindowAndDoor
              setItemName={setItemNameHandler}
              ItemSizeList={WalkDoorSizeList}
              setPlaceMentForWindowDoor={setPlaceMentForWindowDoor}
              setBuildingForWindowDoor={setBuildingForWindowDoor}
              placementItem={placementWalkDoor}
              buildingItem={buildingWalkDoor}
              placementList={placementList}
              deleteMultiple={deleteMultipleWindowDoor}
              setMultipleItemOpenStatus={setMultipleWalkDoorOpenStatus}
              multipleItem={multipleWalkDoor}
              increaseCount={increaseCount}
              multipleItemStatus={multipleWalkDoorOpenStatus}
              ItemName={walkDoorName}
              itemNameSmall={"walkdoor"}
              mainKey={"choosewindowdoor"}
              panelName={"Walk-door"}
              sliderStatus={sliderStatus}
              onRangeChangeHandler={onRangeChangeHandler}
              positionRange={positionRange}
              costCalculation={costCalculation}
              minMaxCalculator={minMaxCalculator}
              setSliderStatus={setSliderStatus}
            />
            <WindowAndDoor
              setItemName={setItemNameHandler}
              ItemSizeList={RollupDoorSizeList}
              setPlaceMentForWindowDoor={setPlaceMentForWindowDoor}
              setBuildingForWindowDoor={setBuildingForWindowDoor}
              placementItem={placementRollUpDoor}
              buildingItem={buildingRollUpDoor}
              placementList={placementList}
              deleteMultiple={deleteMultipleWindowDoor}
              setMultipleItemOpenStatus={setMultipleRollUpOpenStatus}
              multipleItem={multipleRollUpDoor}
              increaseCount={increaseCount}
              multipleItemStatus={multipleRollUpDoorOpenStatus}
              ItemName={rollupDoorName}
              itemNameSmall={"rollupdoor"}
              mainKey={"choosewindowdoor"}
              panelName={"Roll-up door"}
              sliderStatus={sliderStatus}
              onRangeChangeHandler={onRangeChangeHandler}
              positionRange={positionRange}
              costCalculation={costCalculation}
              minMaxCalculator={minMaxCalculator}
              setSliderStatus={setSliderStatus}
            />
            <WindowAndDoor
              setItemName={setItemNameHandler}
              ItemSizeList={WindowSizeList}
              setPlaceMentForWindowDoor={setPlaceMentForWindowDoor}
              setBuildingForWindowDoor={setBuildingForWindowDoor}
              placementItem={placementWindow}
              buildingItem={buildingWindow}
              placementList={placementList}
              deleteMultiple={deleteMultipleWindowDoor}
              setMultipleItemOpenStatus={setMultipleAddWindowOpenStatus}
              multipleItem={multipleAddWindow}
              increaseCount={increaseCount}
              multipleItemStatus={multipleAddWindowOpenStatus}
              ItemName={windowName}
              itemNameSmall={"window"}
              mainKey={"choosewindowdoor"}
              panelName={"Window"}
              sliderStatus={sliderStatus}
              onRangeChangeHandler={onRangeChangeHandler}
              positionRange={positionRange}
              costCalculation={costCalculation}
              minMaxCalculator={minMaxCalculator}
              setSliderStatus={setSliderStatus}
            />
          </div>
          <div>
            <h3 className="mb-[0.3rem] mt-4 px-0 pb-[7px] pt-px text-2xl font-light leading-10">
              Add interior liner panels
            </h3>
          </div>
          <ForSelectItem
            ItemNameTitle="Liner panels"
            costCalculation={costCalculation}
            itemStatus={linerPanels}
            setItemStatus={setLinerPanels}
            itemName="linerpanels"
            itemValue={
              "Select to add 8' interior liner panels on main building"
            }
            mainKey="chooseyoursize"
            index={0}
          />
          <div>
            <h3 className="mb-[0.3rem] mt-4 px-0 pb-[7px] pt-px text-2xl font-light leading-10">
              Optional upgrades
            </h3>
            <ForSelectItem
              ItemNameTitle="Wainscot"
              costCalculation={costCalculation}
              itemStatus={wainscot}
              setItemStatus={setWainscot}
              itemName="wainscot"
              // itemValue={"8' exterior wainscot".replace(/'/g, "\u2019")}
              itemValue={"Select to add 3' wainscot"}
              mainKey="optionalupgrades"
              index={0}
            />
            <ForSelectItem
              ItemNameTitle="Gutters"
              costCalculation={costCalculation}
              itemStatus={downspout}
              setItemStatus={setdownspout}
              itemName="gutters"
              itemValue={"Select to add gutters and downspouts"}
              mainKey="optionalupgrades"
              index={0}
            />
          </div>
          <div>
            <h3 className="mb-[0.3rem] mt-4 px-0 pb-[7px] pt-px text-2xl font-light leading-10">
              Choose your colors
            </h3>
            <ColorCombo
              costCalculation={costCalculation}
              wainscot={wainscot}
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
