/* eslint-disable @typescript-eslint/no-unused-vars */
import MovableInfoList from "utils/movable.json";
import Slider from "../../../layout/SliderComponent/Slider";
import { useState } from "react";
import { usePlacement, useStoreSize } from "../../../store";
import { useDoorCombo } from "store/useDoor";
import { BuildingInfo, useLeanTo } from "store/useLeanTo";

interface MovableInfoType {
  name: string;
  type: string;
  width: number;
  height: number;
  depth: number;
}
type SliderProps = {
  itemNameSmall: string;
  keysVal: number;
  index?: number;
  onRangeChangeHandler?: (value: any) => void;
  sliderRange?: string;
  panelName?: string;
  setSliderStatus: (value: { [key: string]: Array<boolean> }) => void;
  sliderStatus?: { [key: string]: Array<boolean> };
  minVal?: number | string;
  maxVal?: number | string;
  placementWalkDoor?: string;
  itemforRange: number;
  doorType: string;
};

export const SliderPanel = ({
  itemNameSmall,
  keysVal,
  index,
  onRangeChangeHandler,
  sliderRange,
  panelName,
  setSliderStatus,
  sliderStatus,
  minVal,
  maxVal,
  placementWalkDoor,
  itemforRange,
  doorType,
}: SliderProps) => {
  const [query, setQuery] = useState("");
  const { doorComboData, updateComboData } = useDoorCombo();
  const { leanToData } = useLeanTo();
  const { placement } = usePlacement();
  const { basicLength, width } = useStoreSize();

  let maxValue = 0;
  let minValue = 0;

  const currentItem = doorComboData.filter((item) => {
    if (item.key === itemforRange && item.type === doorType) return item;
  })[0];

  let movableInfo: MovableInfoType = {
    name: "",
    type: doorType,
    width: 0,
    height: 0,
    depth: 0,
  };
  movableInfo = MovableInfoList.filter((item) => {
    if (item.type === currentItem.type && item.name === currentItem.size)
      return item;
  })[0];

  let currentLeanTo: BuildingInfo = {
    wall: "",
    type: "",
    lWidth: 0,
    lLength: 0,
    lEaveHeight: 0,
    lDeltaHeight: 0,
    lInsetBayLength: 0,
    lPos: [0, 0, 0],
    lRot: [0, 0, 0],
  };
  switch (currentItem.building) {
    case "Lean-to 1":
      switch (placement[0]) {
        case "Left Endwall":
          currentLeanTo = leanToData.filter(
            (item) => item.wall === "EndWallFront",
          )[0];
          if (currentItem.placement === "Left Endwall") {
            if (doorType === "Roll-up door") {
              minValue = basicLength / 2 + 4;
              maxValue =
                basicLength / 2 - movableInfo?.width + currentLeanTo.lWidth + 4;
            } else {
              minValue = basicLength / 2 + 0.2;
              maxValue =
                basicLength / 2 -
                movableInfo?.width +
                currentLeanTo.lWidth +
                0.4;
            }
          } else if (currentItem.placement === "Front Sidewall") {
            if (doorType === "Roll-up door") {
              if (Number(currentItem.size[0]) > 0) {
                maxValue =
                  (currentLeanTo.lLength - 3) / 2 + currentLeanTo.lPos[0] - 4;
                minValue =
                  -(currentLeanTo.lLength - 3) / 2 + currentLeanTo.lPos[0] + 4;
              }
            } else {
              if (Number(currentItem.size[0]) > 0) {
                maxValue =
                  (currentLeanTo.lLength - 3) / 2 + currentLeanTo.lPos[0] - 0.6;
                minValue =
                  -(currentLeanTo.lLength - 3) / 2 +
                  currentLeanTo.lPos[0] +
                  0.6;
              }
            }
          } else if (currentItem.placement === "Right Endwall") {
            if (doorType === "Roll-up door") {
              minValue = -basicLength / 2 - currentLeanTo.lWidth + 4.6;
              maxValue = -basicLength / 2 - movableInfo?.width + 4;
            } else {
              minValue = -basicLength / 2 - currentLeanTo.lWidth + 2;
              maxValue = -basicLength / 2 - movableInfo?.width + 0.8;
            }
          }
          break;
        case "Right Endwall":
          currentLeanTo = leanToData.filter(
            (item) => item.wall === "EndWallBack",
          )[0];

          if (currentItem.placement === "Left Endwall") {
            if (doorType === "Roll-up door") {
              minValue = basicLength / 2 + 4;
              maxValue =
                basicLength / 2 - movableInfo?.width + currentLeanTo.lWidth + 4;
            } else {
              minValue = basicLength / 2 + 0.2;
              maxValue =
                basicLength / 2 -
                movableInfo?.width +
                currentLeanTo.lWidth +
                0.4;
            }
          } else if (currentItem.placement === "Right Endwall") {
            if (doorType === "Roll-up door") {
              minValue = -basicLength / 2 - currentLeanTo.lWidth + 5;
              maxValue = -basicLength / 2 - movableInfo?.width + 4;
            } else {
              minValue = -basicLength / 2 - currentLeanTo.lWidth + 3;
              maxValue = -basicLength / 2 - movableInfo?.width + 1;
            }
          } else if (currentItem.placement === "Front Sidewall") {
            if (doorType === "Roll-up door") {
              maxValue = (currentLeanTo.lLength - 3) / 2 - 4;
              minValue = -(currentLeanTo.lLength - 3) / 2 + 4;
            } else {
              maxValue = (currentLeanTo.lLength - 3) / 2 - 0.6;
              minValue = -(currentLeanTo.lLength - 3) / 2 + 0.6;
            }
          }
          break;
        case "Back Sidewall":
          currentLeanTo = leanToData.filter(
            (item) => item.wall === "SideWallLeft",
          )[0];

          if (currentItem.placement === "Left Endwall") {
            if (doorType === "Roll-up door") {
              maxValue =
                currentLeanTo.lWidth / 2 + movableInfo?.width + width / 2 - 4;
              minValue =
                -currentLeanTo.lWidth / 2 + movableInfo?.width + width / 2 + 6;
            } else {
              maxValue =
                currentLeanTo.lWidth / 2 + movableInfo?.width + width / 2 + 4;
              minValue =
                -currentLeanTo.lWidth / 2 + movableInfo?.width + width / 2 + 8;
            }
          } else if (currentItem.placement === "Right Endwall") {
            if (doorType === "Roll-up door") {
              minValue = -width / 2 - currentLeanTo.lWidth + 6;
              maxValue = -width / 2 - movableInfo?.width + 4;
            } else {
              minValue = -width / 2 - currentLeanTo.lWidth + 3;
              maxValue = -width / 2 - movableInfo?.width + 1;
            }
          } else if (currentItem.placement === "Front Sidewall") {
            if (doorType === "Roll-up door") {
              minValue =
                currentLeanTo.lPos[2] -
                currentLeanTo.lLength / 2 +
                movableInfo?.width -
                3;
              maxValue =
                currentLeanTo.lPos[2] -
                movableInfo?.width -
                currentLeanTo.lInsetBayLength +
                currentLeanTo.lLength / 2 +
                3;
            } else {
              minValue =
                currentLeanTo.lPos[2] -
                currentLeanTo.lLength / 2 +
                movableInfo?.width;
              maxValue =
                currentLeanTo.lPos[2] -
                movableInfo?.width -
                currentLeanTo.lInsetBayLength +
                currentLeanTo.lLength / 2;
            }
          }
          break;
        case "Front Sidewall":
          currentLeanTo = leanToData.filter(
            (item) => item.wall === "SideWallRight",
          )[0];

          if (currentItem.placement === "Right Endwall") {
            if (doorType === "Roll-up door") {
              minValue = -width / 2 - currentLeanTo.lWidth + 6;
              maxValue = -width / 2 - movableInfo?.width + 3;
            } else {
              minValue = -width / 2 - currentLeanTo.lWidth + 3;
              maxValue = -width / 2 - movableInfo?.width + 1;
            }
          } else if (currentItem.placement === "Left Endwall") {
            if (doorType === "Roll-up door") {
              minValue = width / 2 + 4;
              maxValue =
                width / 2 + currentLeanTo.lWidth - movableInfo?.width + 3;
            } else {
              minValue = width / 2 + 2;
              maxValue =
                width / 2 + currentLeanTo.lWidth - movableInfo?.width + 1;
            }
          } else if (currentItem.placement === "Front Sidewall") {
            if (doorType === "Roll-up door") {
              minValue =
                -currentLeanTo.lPos[2] -
                currentLeanTo.lLength / 2 +
                currentLeanTo.lInsetBayLength +
                movableInfo?.width / 2 +
                0.5;
              maxValue =
                -currentLeanTo.lPos[2] +
                currentLeanTo.lLength / 2 -
                movableInfo?.width / 2 -
                2;
            } else {
              minValue =
                -currentLeanTo.lPos[2] -
                currentLeanTo.lLength / 2 +
                currentLeanTo.lInsetBayLength +
                movableInfo?.width / 2;
              maxValue =
                -currentLeanTo.lPos[2] +
                currentLeanTo.lLength / 2 -
                movableInfo?.width / 2;
            }
          }
          break;
        default:
          break;
      }
      break;
    case "Lean-to 2":
      switch (placement[1]) {
        case "Left Endwall":
          currentLeanTo = leanToData.filter(
            (item) => item.wall === "EndWallFront",
          )[0];
          if (currentItem.placement === "Left Endwall") {
            if (doorType === "Roll-up door") {
              minValue = basicLength / 2 + 4;
              maxValue =
                basicLength / 2 - movableInfo?.width + currentLeanTo.lWidth + 4;
            } else {
              minValue = basicLength / 2 + 0.2;
              maxValue =
                basicLength / 2 -
                movableInfo?.width +
                currentLeanTo.lWidth +
                0.4;
            }
          } else if (currentItem.placement === "Front Sidewall") {
            if (doorType === "Roll-up door") {
              if (Number(currentItem.size[0]) > 0) {
                maxValue =
                  (currentLeanTo.lLength - 3) / 2 + currentLeanTo.lPos[0] - 4;
                minValue =
                  -(currentLeanTo.lLength - 3) / 2 + currentLeanTo.lPos[0] + 4;
              }
            } else {
              if (Number(currentItem.size[0]) > 0) {
                maxValue =
                  (currentLeanTo.lLength - 3) / 2 + currentLeanTo.lPos[0] - 0.6;
                minValue =
                  -(currentLeanTo.lLength - 3) / 2 +
                  currentLeanTo.lPos[0] +
                  0.6;
              }
            }
          } else if (currentItem.placement === "Right Endwall") {
            if (doorType === "Roll-up door") {
              minValue = -basicLength / 2 - currentLeanTo.lWidth + 4.6;
              maxValue = -basicLength / 2 - movableInfo?.width + 4;
            } else {
              minValue = -basicLength / 2 - currentLeanTo.lWidth + 2;
              maxValue = -basicLength / 2 - movableInfo?.width + 0.8;
            }
          }
          break;
        case "Right Endwall":
          currentLeanTo = leanToData.filter(
            (item) => item.wall === "EndWallBack",
          )[0];

          if (currentItem.placement === "Left Endwall") {
            if (doorType === "Roll-up door") {
              minValue = basicLength / 2 + 4;
              maxValue =
                basicLength / 2 - movableInfo?.width + currentLeanTo.lWidth + 4;
            } else {
              minValue = basicLength / 2 + 0.2;
              maxValue =
                basicLength / 2 -
                movableInfo?.width +
                currentLeanTo.lWidth +
                0.4;
            }
          } else if (currentItem.placement === "Right Endwall") {
            if (doorType === "Roll-up door") {
              minValue = -basicLength / 2 - currentLeanTo.lWidth + 5;
              maxValue = -basicLength / 2 - movableInfo?.width + 4;
            } else {
              minValue = -basicLength / 2 - currentLeanTo.lWidth + 3;
              maxValue = -basicLength / 2 - movableInfo?.width + 1;
            }
          } else if (currentItem.placement === "Front Sidewall") {
            if (doorType === "Roll-up door") {
              maxValue = (currentLeanTo.lLength - 3) / 2 - 4;
              minValue = -(currentLeanTo.lLength - 3) / 2 + 4;
            } else {
              maxValue = (currentLeanTo.lLength - 3) / 2 - 0.6;
              minValue = -(currentLeanTo.lLength - 3) / 2 + 0.6;
            }
          }
          break;
        case "Back Sidewall":
          currentLeanTo = leanToData.filter(
            (item) => item.wall === "SideWallLeft",
          )[0];

          if (currentItem.placement === "Left Endwall") {
            if (doorType === "Roll-up door") {
              maxValue =
                currentLeanTo.lWidth / 2 + movableInfo?.width + width / 2 - 4;
              minValue =
                -currentLeanTo.lWidth / 2 + movableInfo?.width + width / 2 + 6;
            } else {
              maxValue =
                currentLeanTo.lWidth / 2 + movableInfo?.width + width / 2 + 4;
              minValue =
                -currentLeanTo.lWidth / 2 + movableInfo?.width + width / 2 + 8;
            }
          } else if (currentItem.placement === "Right Endwall") {
            if (doorType === "Roll-up door") {
              minValue = -width / 2 - currentLeanTo.lWidth + 6;
              maxValue = -width / 2 - movableInfo?.width + 4;
            } else {
              minValue = -width / 2 - currentLeanTo.lWidth + 3;
              maxValue = -width / 2 - movableInfo?.width + 1;
            }
          } else if (currentItem.placement === "Front Sidewall") {
            if (doorType === "Roll-up door") {
              minValue =
                currentLeanTo.lPos[2] -
                currentLeanTo.lLength / 2 +
                movableInfo?.width -
                3;
              maxValue =
                currentLeanTo.lPos[2] -
                movableInfo?.width -
                currentLeanTo.lInsetBayLength +
                currentLeanTo.lLength / 2 +
                3;
            } else {
              minValue =
                currentLeanTo.lPos[2] -
                currentLeanTo.lLength / 2 +
                movableInfo?.width;
              maxValue =
                currentLeanTo.lPos[2] -
                movableInfo?.width -
                currentLeanTo.lInsetBayLength +
                currentLeanTo.lLength / 2;
            }
          }
          break;
        case "Front Sidewall":
          currentLeanTo = leanToData.filter(
            (item) => item.wall === "SideWallRight",
          )[0];

          if (currentItem.placement === "Right Endwall") {
            if (doorType === "Roll-up door") {
              minValue = -width / 2 - currentLeanTo.lWidth + 6;
              maxValue = -width / 2 - movableInfo?.width + 3;
            } else {
              minValue = -width / 2 - currentLeanTo.lWidth + 3;
              maxValue = -width / 2 - movableInfo?.width + 1;
            }
          } else if (currentItem.placement === "Left Endwall") {
            if (doorType === "Roll-up door") {
              minValue = width / 2 + 4;
              maxValue =
                width / 2 + currentLeanTo.lWidth - movableInfo?.width + 3;
            } else {
              minValue = width / 2 + 2;
              maxValue =
                width / 2 + currentLeanTo.lWidth - movableInfo?.width + 1;
            }
          } else if (currentItem.placement === "Front Sidewall") {
            if (doorType === "Roll-up door") {
              minValue =
                -currentLeanTo.lPos[2] -
                currentLeanTo.lLength / 2 +
                currentLeanTo.lInsetBayLength +
                movableInfo?.width / 2 +
                0.5;
              maxValue =
                -currentLeanTo.lPos[2] +
                currentLeanTo.lLength / 2 -
                movableInfo?.width / 2 -
                2;
            } else {
              minValue =
                -currentLeanTo.lPos[2] -
                currentLeanTo.lLength / 2 +
                currentLeanTo.lInsetBayLength +
                movableInfo?.width / 2;
              maxValue =
                -currentLeanTo.lPos[2] +
                currentLeanTo.lLength / 2 -
                movableInfo?.width / 2;
            }
          }
          break;
        default:
          break;
      }
      break;
    case "Lean-to 3":
      switch (placement[2]) {
        case "Left Endwall":
          currentLeanTo = leanToData.filter(
            (item) => item.wall === "EndWallFront",
          )[0];
          if (currentItem.placement === "Left Endwall") {
            if (doorType === "Roll-up door") {
              minValue = basicLength / 2 + 4;
              maxValue =
                basicLength / 2 - movableInfo?.width + currentLeanTo.lWidth + 4;
            } else {
              minValue = basicLength / 2 + 0.2;
              maxValue =
                basicLength / 2 -
                movableInfo?.width +
                currentLeanTo.lWidth +
                0.4;
            }
          } else if (currentItem.placement === "Front Sidewall") {
            if (doorType === "Roll-up door") {
              if (Number(currentItem.size[0]) > 0) {
                maxValue =
                  (currentLeanTo.lLength - 3) / 2 + currentLeanTo.lPos[0] - 4;
                minValue =
                  -(currentLeanTo.lLength - 3) / 2 + currentLeanTo.lPos[0] + 4;
              }
            } else {
              if (Number(currentItem.size[0]) > 0) {
                maxValue =
                  (currentLeanTo.lLength - 3) / 2 + currentLeanTo.lPos[0] - 0.6;
                minValue =
                  -(currentLeanTo.lLength - 3) / 2 +
                  currentLeanTo.lPos[0] +
                  0.6;
              }
            }
          } else if (currentItem.placement === "Right Endwall") {
            if (doorType === "Roll-up door") {
              minValue = -basicLength / 2 - currentLeanTo.lWidth + 4.6;
              maxValue = -basicLength / 2 - movableInfo?.width + 4;
            } else {
              minValue = -basicLength / 2 - currentLeanTo.lWidth + 2;
              maxValue = -basicLength / 2 - movableInfo?.width + 0.8;
            }
          }
          break;
        case "Right Endwall":
          currentLeanTo = leanToData.filter(
            (item) => item.wall === "EndWallBack",
          )[0];

          if (currentItem.placement === "Left Endwall") {
            if (doorType === "Roll-up door") {
              minValue = basicLength / 2 + 4;
              maxValue =
                basicLength / 2 - movableInfo?.width + currentLeanTo.lWidth + 4;
            } else {
              minValue = basicLength / 2 + 0.2;
              maxValue =
                basicLength / 2 -
                movableInfo?.width +
                currentLeanTo.lWidth +
                0.4;
            }
          } else if (currentItem.placement === "Right Endwall") {
            if (doorType === "Roll-up door") {
              minValue = -basicLength / 2 - currentLeanTo.lWidth + 5;
              maxValue = -basicLength / 2 - movableInfo?.width + 4;
            } else {
              minValue = -basicLength / 2 - currentLeanTo.lWidth + 3;
              maxValue = -basicLength / 2 - movableInfo?.width + 1;
            }
          } else if (currentItem.placement === "Front Sidewall") {
            if (doorType === "Roll-up door") {
              maxValue = (currentLeanTo.lLength - 3) / 2 - 4;
              minValue = -(currentLeanTo.lLength - 3) / 2 + 4;
            } else {
              maxValue = (currentLeanTo.lLength - 3) / 2 - 0.6;
              minValue = -(currentLeanTo.lLength - 3) / 2 + 0.6;
            }
          }
          break;
        case "Back Sidewall":
          currentLeanTo = leanToData.filter(
            (item) => item.wall === "SideWallLeft",
          )[0];

          if (currentItem.placement === "Left Endwall") {
            if (doorType === "Roll-up door") {
              maxValue =
                currentLeanTo.lWidth / 2 + movableInfo?.width + width / 2 - 4;
              minValue =
                -currentLeanTo.lWidth / 2 + movableInfo?.width + width / 2 + 6;
            } else {
              maxValue =
                currentLeanTo.lWidth / 2 + movableInfo?.width + width / 2 + 4;
              minValue =
                -currentLeanTo.lWidth / 2 + movableInfo?.width + width / 2 + 8;
            }
          } else if (currentItem.placement === "Right Endwall") {
            if (doorType === "Roll-up door") {
              minValue = -width / 2 - currentLeanTo.lWidth + 6;
              maxValue = -width / 2 - movableInfo?.width + 4;
            } else {
              minValue = -width / 2 - currentLeanTo.lWidth + 3;
              maxValue = -width / 2 - movableInfo?.width + 1;
            }
          } else if (currentItem.placement === "Front Sidewall") {
            if (doorType === "Roll-up door") {
              minValue =
                currentLeanTo.lPos[2] -
                currentLeanTo.lLength / 2 +
                movableInfo?.width -
                3;
              maxValue =
                currentLeanTo.lPos[2] -
                movableInfo?.width -
                currentLeanTo.lInsetBayLength +
                currentLeanTo.lLength / 2 +
                3;
            } else {
              minValue =
                currentLeanTo.lPos[2] -
                currentLeanTo.lLength / 2 +
                movableInfo?.width;
              maxValue =
                currentLeanTo.lPos[2] -
                movableInfo?.width -
                currentLeanTo.lInsetBayLength +
                currentLeanTo.lLength / 2;
            }
          }
          break;
        case "Front Sidewall":
          currentLeanTo = leanToData.filter(
            (item) => item.wall === "SideWallRight",
          )[0];

          if (currentItem.placement === "Right Endwall") {
            if (doorType === "Roll-up door") {
              minValue = -width / 2 - currentLeanTo.lWidth + 6;
              maxValue = -width / 2 - movableInfo?.width + 3;
            } else {
              minValue = -width / 2 - currentLeanTo.lWidth + 3;
              maxValue = -width / 2 - movableInfo?.width + 1;
            }
          } else if (currentItem.placement === "Left Endwall") {
            if (doorType === "Roll-up door") {
              minValue = width / 2 + 4;
              maxValue =
                width / 2 + currentLeanTo.lWidth - movableInfo?.width + 3;
            } else {
              minValue = width / 2 + 2;
              maxValue =
                width / 2 + currentLeanTo.lWidth - movableInfo?.width + 1;
            }
          } else if (currentItem.placement === "Front Sidewall") {
            if (doorType === "Roll-up door") {
              minValue =
                -currentLeanTo.lPos[2] -
                currentLeanTo.lLength / 2 +
                currentLeanTo.lInsetBayLength +
                movableInfo?.width / 2 +
                0.5;
              maxValue =
                -currentLeanTo.lPos[2] +
                currentLeanTo.lLength / 2 -
                movableInfo?.width / 2 -
                2;
            } else {
              minValue =
                -currentLeanTo.lPos[2] -
                currentLeanTo.lLength / 2 +
                currentLeanTo.lInsetBayLength +
                movableInfo?.width / 2;
              maxValue =
                -currentLeanTo.lPos[2] +
                currentLeanTo.lLength / 2 -
                movableInfo?.width / 2;
            }
          }
          break;
        default:
          break;
      }
      break;
    case "Lean-to 4":
      switch (placement[3]) {
        case "Left Endwall":
          currentLeanTo = leanToData.filter(
            (item) => item.wall === "EndWallFront",
          )[0];
          if (currentItem.placement === "Left Endwall") {
            if (doorType === "Roll-up door") {
              minValue = basicLength / 2 + 4;
              maxValue =
                basicLength / 2 - movableInfo?.width + currentLeanTo.lWidth + 4;
            } else {
              minValue = basicLength / 2 + 0.2;
              maxValue =
                basicLength / 2 -
                movableInfo?.width +
                currentLeanTo.lWidth +
                0.4;
            }
          } else if (currentItem.placement === "Front Sidewall") {
            if (doorType === "Roll-up door") {
              if (Number(currentItem.size[0]) > 0) {
                maxValue =
                  (currentLeanTo.lLength - 3) / 2 + currentLeanTo.lPos[0] - 4;
                minValue =
                  -(currentLeanTo.lLength - 3) / 2 + currentLeanTo.lPos[0] + 4;
              }
            } else {
              if (Number(currentItem.size[0]) > 0) {
                maxValue =
                  (currentLeanTo.lLength - 3) / 2 + currentLeanTo.lPos[0] - 0.6;
                minValue =
                  -(currentLeanTo.lLength - 3) / 2 +
                  currentLeanTo.lPos[0] +
                  0.6;
              }
            }
          } else if (currentItem.placement === "Right Endwall") {
            if (doorType === "Roll-up door") {
              minValue = -basicLength / 2 - currentLeanTo.lWidth + 4.6;
              maxValue = -basicLength / 2 - movableInfo?.width + 4;
            } else {
              minValue = -basicLength / 2 - currentLeanTo.lWidth + 2;
              maxValue = -basicLength / 2 - movableInfo?.width + 0.8;
            }
          }
          break;
        case "Right Endwall":
          currentLeanTo = leanToData.filter(
            (item) => item.wall === "EndWallBack",
          )[0];

          if (currentItem.placement === "Left Endwall") {
            if (doorType === "Roll-up door") {
              minValue = basicLength / 2 + 4;
              maxValue =
                basicLength / 2 - movableInfo?.width + currentLeanTo.lWidth + 4;
            } else {
              minValue = basicLength / 2 + 0.2;
              maxValue =
                basicLength / 2 -
                movableInfo?.width +
                currentLeanTo.lWidth +
                0.4;
            }
          } else if (currentItem.placement === "Right Endwall") {
            if (doorType === "Roll-up door") {
              minValue = -basicLength / 2 - currentLeanTo.lWidth + 5;
              maxValue = -basicLength / 2 - movableInfo?.width + 4;
            } else {
              minValue = -basicLength / 2 - currentLeanTo.lWidth + 3;
              maxValue = -basicLength / 2 - movableInfo?.width + 1;
            }
          } else if (currentItem.placement === "Front Sidewall") {
            if (doorType === "Roll-up door") {
              maxValue = (currentLeanTo.lLength - 3) / 2 - 4;
              minValue = -(currentLeanTo.lLength - 3) / 2 + 4;
            } else {
              maxValue = (currentLeanTo.lLength - 3) / 2 - 0.6;
              minValue = -(currentLeanTo.lLength - 3) / 2 + 0.6;
            }
          }
          break;
        case "Back Sidewall":
          currentLeanTo = leanToData.filter(
            (item) => item.wall === "SideWallLeft",
          )[0];

          if (currentItem.placement === "Left Endwall") {
            if (doorType === "Roll-up door") {
              maxValue =
                currentLeanTo.lWidth / 2 + movableInfo?.width + width / 2 - 4;
              minValue =
                -currentLeanTo.lWidth / 2 + movableInfo?.width + width / 2 + 6;
            } else {
              maxValue =
                currentLeanTo.lWidth / 2 + movableInfo?.width + width / 2 + 4;
              minValue =
                -currentLeanTo.lWidth / 2 + movableInfo?.width + width / 2 + 8;
            }
          } else if (currentItem.placement === "Right Endwall") {
            if (doorType === "Roll-up door") {
              minValue = -width / 2 - currentLeanTo.lWidth + 6;
              maxValue = -width / 2 - movableInfo?.width + 4;
            } else {
              minValue = -width / 2 - currentLeanTo.lWidth + 3;
              maxValue = -width / 2 - movableInfo?.width + 1;
            }
          } else if (currentItem.placement === "Front Sidewall") {
            if (doorType === "Roll-up door") {
              minValue =
                currentLeanTo.lPos[2] -
                currentLeanTo.lLength / 2 +
                movableInfo?.width -
                3;
              maxValue =
                currentLeanTo.lPos[2] -
                movableInfo?.width -
                currentLeanTo.lInsetBayLength +
                currentLeanTo.lLength / 2 +
                3;
            } else {
              minValue =
                currentLeanTo.lPos[2] -
                currentLeanTo.lLength / 2 +
                movableInfo?.width;
              maxValue =
                currentLeanTo.lPos[2] -
                movableInfo?.width -
                currentLeanTo.lInsetBayLength +
                currentLeanTo.lLength / 2;
            }
          }
          break;
        case "Front Sidewall":
          currentLeanTo = leanToData.filter(
            (item) => item.wall === "SideWallRight",
          )[0];

          if (currentItem.placement === "Right Endwall") {
            if (doorType === "Roll-up door") {
              minValue = -width / 2 - currentLeanTo.lWidth + 6;
              maxValue = -width / 2 - movableInfo?.width + 3;
            } else {
              minValue = -width / 2 - currentLeanTo.lWidth + 3;
              maxValue = -width / 2 - movableInfo?.width + 1;
            }
          } else if (currentItem.placement === "Left Endwall") {
            if (doorType === "Roll-up door") {
              minValue = width / 2 + 4;
              maxValue =
                width / 2 + currentLeanTo.lWidth - movableInfo?.width + 3;
            } else {
              minValue = width / 2 + 2;
              maxValue =
                width / 2 + currentLeanTo.lWidth - movableInfo?.width + 1;
            }
          } else if (currentItem.placement === "Front Sidewall") {
            if (doorType === "Roll-up door") {
              minValue =
                -currentLeanTo.lPos[2] -
                currentLeanTo.lLength / 2 +
                currentLeanTo.lInsetBayLength +
                movableInfo?.width / 2 +
                0.5;
              maxValue =
                -currentLeanTo.lPos[2] +
                currentLeanTo.lLength / 2 -
                movableInfo?.width / 2 -
                2;
            } else {
              minValue =
                -currentLeanTo.lPos[2] -
                currentLeanTo.lLength / 2 +
                currentLeanTo.lInsetBayLength +
                movableInfo?.width / 2;
              maxValue =
                -currentLeanTo.lPos[2] +
                currentLeanTo.lLength / 2 -
                movableInfo?.width / 2;
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

  return (
    <>
      <div className="min-[84px] mb-5 mt-4 w-full flex-1 select-none rounded-xl bg-[#f7f7f7] px-[21px] py-[20px] hover:cursor-pointer">
        <div className="px-0 pb-[7px] pt-px text-[1.2rem] font-normal leading-normal">
          {panelName}
        </div>

        <div className="relative ml-auto mr-auto mt-1">
          <Slider
            itemNameSmall={itemNameSmall}
            keysVal={keysVal}
            placementWalkDoor={placementWalkDoor}
            index={index}
            onChange={onRangeChangeHandler}
            sliderRange={sliderRange}
            sliderStatus={sliderStatus}
            setSliderStatus={setSliderStatus}
            minVal={
              currentItem.building === "Main building" ? minVal : minValue
            }
            maxVal={
              currentItem.building === "Main building" ? maxVal : maxValue
            }
          />
        </div>
      </div>
    </>
  );
};
