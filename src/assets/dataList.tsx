/* eslint-disable react-hooks/rules-of-hooks */
import { useStoreSize } from "store";
import { TdataList } from "components/DisignPanel/Combobox/ComboboxPanel";

export const closureList = [
  { id: 1, val: "Open" },
  { id: 2, val: "Enclosed" },
];
export const WalkDoorSizeList = [
  { id: 1, val: "3 x 7" },
  { id: 2, val: "4 x 7" },
  { id: 3, val: "6 x 7" },
];
export const placementList = [
  { id: 1, val: "Left Endwall" },
  { id: 2, val: "Right Endwall" },
  { id: 3, val: "Front Sidewall" },
  { id: 4, val: "Back Sidewall" },
];
export const placementListForLeanTo = [
  { id: 1, val: "Left Endwall" },
  { id: 2, val: "Right Endwall" },
  { id: 3, val: "Front Sidewall" },
];
export const cameraPosList = [
  [0, 5, 250],
  [50, 50, 200],
  [200, 5, 100],
  [100, 100, 100],
  [-100, 100, -200],
  [-50, 70, 150],
  [200, 50, 0],
];
export const styleList = [
  { id: 1, val: "Gable" },
  { id: 2, val: "Single Slope" },
];
export const WindowSizeList = [
  { id: 1, val: "3 x 3" },
  { id: 2, val: "3 x 4" },
  { id: 3, val: "3 x 5" },
  { id: 4, val: "4 x 3" },
  { id: 5, val: "4 x 4" },
  { id: 6, val: "4 x 5" },
  { id: 7, val: "6 x 3" },
  { id: 8, val: "6 x 4" },
  { id: 9, val: "6 x 5" },
];
export const RollupDoorSizeList = [
  { id: 1, val: "8 x 8" },
  { id: 2, val: "8 x 10" },
  { id: 3, val: "10 x 8" },
  { id: 4, val: "10 x 10" },
  { id: 5, val: "10 x 12" },
  { id: 6, val: "10 x 14" },
  { id: 7, val: "12 x 8" },
  { id: 8, val: "12 x 10" },
  { id: 9, val: "12 x 12" },
  { id: 10, val: "12 x 14" },
  { id: 11, val: "14 x 8" },
  { id: 12, val: "14 x 10" },
  { id: 13, val: "14 x 12" },
  { id: 14, val: "14 x 14" },
];

export const overhangList = [
  { id: 1, val: 0 },
  { id: 2, val: 1 },
  { id: 3, val: 2 },
  { id: 4, val: 3 },
  { id: 5, val: 4 },
  { id: 6, val: 5 },
  { id: 7, val: 6 },
];

export const widthSizeList = Array.from({ length: 111 }, () => 0).map(
  (_, index) => {
    return {
      id: index + 1,
      val: index + 10,
    };
  },
);
export const lengthSizeList = Array.from({ length: 181 }, () => 0).map(
  (_, index) => {
    return {
      id: index + 1,
      val: index + 20,
    };
  },
);
export const eaveHeightSizeList = Array.from({ length: 9 }, () => 0).map(
  (_, index) => {
    return {
      id: index + 1,
      val: index + 8,
    };
  },
);

export const recessCeilingHeight = Array.from({ length: 4 }, () => 0).map(
  (_, index) => {
    return {
      id: index + 1,
      val: index + 7,
    };
  },
);

export const doorBuildingList = () => {
  const listArray: TdataList[] = [];
  listArray.push({ id: 0, val: "Main building" });

  return listArray;
};

export const insetBayLengthList = () => {
  const { length } = useStoreSize();

  const listArray = Array.from({ length: length - 29 }, () => 0).map(
    (_, index) => {
      return {
        id: index + 1,
        val: index + 10,
      };
    },
  );

  return listArray;
};
