/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMemo } from "react";
import { useStoreSize } from "store";
import { usePlacement } from "store";
import { useStyle } from "store";
import { useLeanTo } from "store/useLeanTo";
import { TdataList } from "components/DisignPanel/Combobox/ComboboxPanel";

const reverseArr = (input: TdataList[]) => {
  const ret: number[] = [];
  for (let i = input.length - 1; i >= 0; i--) {
    ret.push(Number(input[i].val));
  }
  return ret;
};

export const closureList = [
  { id: 1, val: "Open" },
  { id: 2, val: "Enclosed" },
];
export const WalkDoorSizeList = [
  { id: 1, val: "3 x 7" },
  { id: 2, val: "4 x 7" },
  { id: 3, val: "6 x 7" },
];
export const leanToStyleList = [
  { id: 1, val: "Closure" },
  { id: 2, val: "Open" },
  { id: 3, val: "Enclosed" },
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
  // { id: 2, val: "Roof Only" },
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

export const doorBuildingList = () => {
  const { leanToState } = useLeanTo();
  const listArray: TdataList[] = [];
  listArray.push({ id: 0, val: "Main building" });
  let count = 1;
  leanToState.map((item) => {
    if (item.seted) {
      listArray.push({ id: count, val: "Lean-to " + Number(count) });
      count++;
    }
  });

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

export const leanToWidthSizeList = () => {
  const { width } = useStoreSize();
  const listArray = useMemo(() => {
    const list = [];

    for (let i = 0; i < 18; i++) {
      list.push({ id: i + 1, val: i + 8 });
    }

    return list;
  }, [width]);

  return listArray;
};

export const leanToLengthSizeList = () => {
  const { bayLength, width, basicLength } = useStoreSize();
  const { placement } = usePlacement();

  let lengthValue = 0;
  Object.keys(placement).forEach((key) => {
    if (
      placement[key] === "Back Sidewall" ||
      placement[key] === "Front Sidewall"
    )
      lengthValue = basicLength;
    if (placement[key] === "Left Endwall" || placement[key] === "Right Endwall")
      lengthValue = width;
  });
  const addRigidFrame = useMemo(() => {
    return Array.from({ length: Math.floor(lengthValue / 28) + 2 }, () => 0);
  }, [lengthValue]);

  const rigidBayLength = useMemo(() => {
    const bLength = (lengthValue - 0.9) / (addRigidFrame.length - 1);

    return bLength;
  }, [lengthValue, addRigidFrame]);

  const insetBayRigidFrame = useMemo(() => {
    return Array.from({ length: Math.floor(bayLength / 28) + 1 }, () => 0);
  }, [bayLength]);

  const insetBayRigidFrameInterval = useMemo(() => {
    return Math.ceil((bayLength - 0.9) / insetBayRigidFrame.length);
  }, [bayLength]);

  const listArray = useMemo(() => {
    const list = [] as any;
    let count = 0;

    if (lengthValue > 150) count = 150 / rigidBayLength;
    else count = Math.round(lengthValue / rigidBayLength);

    for (let i = 0; i < count; i++) {
      list.push({
        id: i + 1,
        val: "Bay " + (i + 1),
      });
    }

    if (lengthValue !== width) {
      if (bayLength > 0) {
        let bayCount = 0;
        if (bayLength > 150) bayCount = 150 / bayLength;
        else bayCount = Math.round(bayLength / insetBayRigidFrameInterval);

        for (let i = count; i < bayCount + count; i++) {
          list.push({
            id: i + 1,
            val: "Bay " + (i + 1),
          });
        }
      }
    }
    return list;
  }, [lengthValue, bayLength, basicLength]);

  return listArray;
};

export const leanToLengthSizeValueList = () => {
  const { bayLength, width, basicLength } = useStoreSize();
  const { placement } = usePlacement();

  let lengthValue = 0;
  Object.keys(placement).forEach((key) => {
    if (
      placement[key] === "Back Sidewall" ||
      placement[key] === "Front Sidewall"
    )
      lengthValue = basicLength;
    if (placement[key] === "Left Endwall" || placement[key] === "Right Endwall")
      lengthValue = width;
  });
  const addRigidFrame = useMemo(() => {
    return Array.from({ length: Math.floor(lengthValue / 28) + 2 }, () => 0);
  }, [lengthValue]);

  const rigidBayLength = useMemo(() => {
    const bLength = (lengthValue - 0.9) / (addRigidFrame.length - 1);

    return bLength;
  }, [lengthValue, addRigidFrame]);

  const insetBayRigidFrame = useMemo(() => {
    return Array.from({ length: Math.floor(bayLength / 28) + 1 }, () => 0);
  }, [bayLength]);

  const insetBayRigidFrameInterval = useMemo(() => {
    return Math.ceil((bayLength - 0.9) / insetBayRigidFrame.length);
  }, [bayLength]);

  const listArray = useMemo(() => {
    const list = [] as any;
    let count = 0;

    if (lengthValue > 150) count = 150 / rigidBayLength;
    else count = Math.round(lengthValue / rigidBayLength);

    for (let i = 0; i < count; i++) {
      list.push({
        id: i + 1,
        val: Math.round(lengthValue / count),
      });
    }

    if (lengthValue !== width) {
      if (bayLength > 0) {
        let bayCount = 0;
        if (bayLength > 150) bayCount = 150 / bayLength;
        else bayCount = Math.round(bayLength / insetBayRigidFrameInterval);

        for (let i = count; i < bayCount + count; i++) {
          list.push({
            id: i + 1,
            val: Math.round(bayLength / bayCount),
          });
        }
      }
    }
    return list;
  }, [lengthValue, bayLength, basicLength]);

  return listArray;
};

export const sideWallBayLengthList = () => {
  const { bayLength, width, basicLength } = useStoreSize();

  const lengthValue = basicLength;
  const addRigidFrame = useMemo(() => {
    return Array.from({ length: Math.floor(lengthValue / 28) + 2 }, () => 0);
  }, [lengthValue]);

  const rigidBayLength = useMemo(() => {
    const bLength = (lengthValue - 0.9) / (addRigidFrame.length - 1);

    return bLength;
  }, [lengthValue, addRigidFrame]);

  const insetBayRigidFrame = useMemo(() => {
    return Array.from({ length: Math.floor(bayLength / 28) + 1 }, () => 0);
  }, [bayLength]);

  const insetBayRigidFrameInterval = useMemo(() => {
    return Math.ceil((bayLength - 0.9) / insetBayRigidFrame.length);
  }, [bayLength]);

  const listArray = useMemo(() => {
    const list = [] as any;
    let count = 0;

    if (lengthValue > 150) count = 150 / rigidBayLength;
    else count = Math.round(lengthValue / rigidBayLength);

    for (let i = 0; i < count; i++) {
      list.push({
        id: i + 1,
        val: Math.round(lengthValue / count),
      });
    }

    if (lengthValue !== width) {
      if (bayLength > 0) {
        let bayCount = 0;
        if (bayLength > 150) bayCount = 150 / bayLength;
        else bayCount = Math.round(bayLength / insetBayRigidFrameInterval);

        for (let i = count; i < bayCount + count; i++) {
          list.push({
            id: i + 1,
            val: Math.round(bayLength / bayCount),
          });
        }
      }
    }
    return list;
  }, [lengthValue, bayLength, basicLength]);

  const rightSumValuesList: number[] = [];
  let rightSumValue = 0;

  listArray.map((item: { val: number }, _index: any) => {
    rightSumValue += item.val;
    rightSumValuesList.push(rightSumValue);
  });

  const leftSumValuesList: number[] = [];
  leftSumValuesList.push(...rightSumValuesList);
  leftSumValuesList.reverse();

  return {
    leftSumValuesList: leftSumValuesList,
    rightSumValuesList: rightSumValuesList,
  };
};

export const rightSideWallBayLengthList = () => {
  const { bayLength, width, basicLength } = useStoreSize();

  const lengthValue = basicLength;
  const addRigidFrame = useMemo(() => {
    return Array.from({ length: Math.floor(lengthValue / 28) + 2 }, () => 0);
  }, [lengthValue]);

  const rigidBayLength = useMemo(() => {
    const bLength = (lengthValue - 0.9) / (addRigidFrame.length - 1);

    return bLength;
  }, [lengthValue, addRigidFrame]);

  const insetBayRigidFrame = useMemo(() => {
    return Array.from({ length: Math.floor(bayLength / 28) + 1 }, () => 0);
  }, [bayLength]);

  const insetBayRigidFrameInterval = useMemo(() => {
    return Math.ceil((bayLength - 0.9) / insetBayRigidFrame.length);
  }, [bayLength]);

  const listArray = useMemo(() => {
    const list = [] as any;
    let count = 0;

    if (lengthValue > 150) count = 150 / rigidBayLength;
    else count = Math.round(lengthValue / rigidBayLength);

    for (let i = 0; i < count; i++) {
      list.push({
        id: i + 1,
        val: Math.round(lengthValue / count),
      });
    }

    if (lengthValue !== width) {
      if (bayLength > 0) {
        let bayCount = 0;
        if (bayLength > 150) bayCount = 150 / bayLength;
        else bayCount = Math.round(bayLength / insetBayRigidFrameInterval);

        for (let i = count; i < bayCount + count; i++) {
          list.push({
            id: i + 1,
            val: Math.round(bayLength / bayCount),
          });
        }
      }
    }
    return list;
  }, [lengthValue, bayLength, basicLength]);

  const reverseListArrary = reverseArr(listArray);
  const rightSumValuesList: number[] = [];
  let rightSumValue = 0;
  reverseListArrary.map((item, _index) => {
    rightSumValue += item;
    rightSumValuesList.push(rightSumValue);
  });

  const leftSumValuesList: number[] = [];
  leftSumValuesList.push(...rightSumValuesList);
  leftSumValuesList.reverse();

  return {
    leftSumValuesList: leftSumValuesList,
    rightSumValuesList: rightSumValuesList,
  };
};

export const leanToDropHeightSizeList = () => {
  const { eaveHeight, deltaHeight } = useStoreSize();
  const { placement } = usePlacement();
  const { label } = useStyle();

  const listArray = useMemo(() => {
    let list = [] as any;
    Object.keys(placement).forEach((key) => {
      if (label === "Single Slope" && placement[key] === "Front Sidewall") {
        list = [];
        for (let i = 0; i < eaveHeight + deltaHeight - 8; i++) {
          if (i === 0) list.push({ id: i + 1, val: 0 });
          list.push({ id: i + 1, val: i + 1 });
        }
      } else {
        list = [];
        for (let i = 0; i < eaveHeight - 8; i++) {
          if (i === 0) list.push({ id: i + 1, val: 0 });
          list.push({ id: i + 1, val: i + 1 });
        }
      }
    });
    return list;
  }, [eaveHeight, deltaHeight, label, placement]);

  return listArray;
};
