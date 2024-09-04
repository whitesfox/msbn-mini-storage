/* eslint-disable @typescript-eslint/no-unused-vars */
import { CameraControls } from "@react-three/drei";
import { createRef } from "react";
import { create } from "zustand";

type pitchList = {
  id: number;
  val: string;
};

interface useStoreSize {
  width: number;
  length: number;
  bayLength: number;
  eaveHeight: number;
  basicLength: number;
  deltaHeight: number;
  overhangEave: number;
  overhangPurlin: number;
  pitchOptionSize: string;

  setWidth: (value: number) => void;
  setLength: (value: number) => void;
  setBayLength: (value: number) => void;
  setEaveHeight: (value: number) => void;
  setEaveOverhang: (value: number) => void;
  setGableOverhang: (value: number) => void;
  setPitch: ({ id, val }: pitchList) => void;
}

export const useStoreSize = create<useStoreSize>((set) => ({
  width: 40,
  length: 60,
  bayLength: 0,
  eaveHeight: 16,
  basicLength: 60,
  overhangEave: 0.2,
  overhangPurlin: 0,
  deltaHeight: 45 / 14,
  pitchOptionSize: "3 / 12",

  setWidth: (value) => set((state) => ({ ...state, width: value })),
  setEaveHeight: (value) => set((state) => ({ ...state, eaveHeight: value })),
  setLength: (value) => {
    set((state) => ({
      ...state,
      basicLength: value - state.bayLength,
      length: value,
    }));
  },
  setPitch: ({ id, val }: pitchList) =>
    set((state) => ({ ...state, deltaHeight: id, pitchOptionSize: val })),
  setEaveOverhang: (value) =>
    set((state) => ({
      ...state,
      overhangEave: value === 0 ? 0.2 : value,
    })),
  setGableOverhang: (value) =>
    set((state) => ({
      ...state,
      overhangPurlin: value * 2,
    })),
  setBayLength: (value) =>
    set((state) => ({
      ...state,
      bayLength: value,
      basicLength: state.length - value,
    })),
}));

interface IStoreColor {
  roofColor: string;
  roofTrimColor: string;
  sideWallColor: string;
  wallTrimColor: string;
  baseTrimColor: string;
  roofColorLabel: string;
  downspoutsColor: string;
  mullionTrimColor: string;
  rollupDoorColor: string;
  roofTrimColorLabel: string;
  sideWallColorLabel: string;
  wallTrimColorLabel: string;
  baseTrimColorLabel: string;
  downspoutsColorLabel: string;
  mullionTrimColorLabel: string;
  rollupDoorColorLabel: string;

  setSideWallColor: (value1: string, value2: string) => void;
  setRoofColor: (value1: string, value2: string) => void;
  setRoofTrimColor: (value1: string, value2: string) => void;
  setWallTrimColor: (value1: string, value2: string) => void;
  setBaseTrimColor: (value1: string, value2: string) => void;
  setDownspoutColor: (value1: string, value2: string) => void;
  setMullionTrimColor: (value1: string, value2: string) => void;
  setRollUpDoorColor: (value1: string, value2: string) => void;
}

export const useStoreColor = create<IStoreColor>((set) => ({
  roofColor: "#b3b2b2",
  roofTrimColor: "#CFCFDC",
  sideWallColor: "#A02223",
  wallTrimColor: "#CFCFDC",
  baseTrimColor: "#CFCFDC",
  downspoutsColor: "#CFCFDC",
  mullionTrimColor: "#CFCFDC",
  rollupDoorColor: "#CFCFDC",
  roofColorLabel: "Galvalume",
  roofTrimColorLabel: "Polar White",
  sideWallColorLabel: "Red",
  wallTrimColorLabel: "Polar White",
  baseTrimColorLabel: "Polar White",
  downspoutsColorLabel: "Polar White",
  mullionTrimColorLabel: "Polar White",
  rollupDoorColorLabel: "Polar White",

  setRoofColor: (value1, value2) =>
    set((state) => ({ ...state, roofColor: value1, roofColorLabel: value2 })),
  setRoofTrimColor: (value1, value2) =>
    set((state) => ({
      ...state,
      roofTrimColor: value1,
      roofTrimColorLabel: value2,
    })),
  setSideWallColor: (value1, value2) =>
    set((state) => ({
      ...state,
      sideWallColor: value1,
      sideWallColorLabel: value2,
    })),
  setWallTrimColor: (value1, value2) =>
    set((state) => ({
      ...state,
      wallTrimColor: value1,
      wallTrimColorLabel: value2,
    })),
  setBaseTrimColor: (value1, value2) =>
    set((state) => ({
      ...state,
      baseTrimColor: value1,
      baseTrimColorLabel: value2,
    })),
  setDownspoutColor: (value1, value2) =>
    set((state) => ({
      ...state,
      downspoutsColor: value1,
      downspoutsColorLabel: value2,
    })),
  setMullionTrimColor: (value1, value2) =>
    set((state) => ({
      ...state,
      mullionTrimColor: value1,
      mullionTrimColorLabel: value2,
    })),
  setRollUpDoorColor: (value1, value2) =>
    set((state) => ({
      ...state,
      rollupDoorColor: value1,
      rollupDoorColorLabel: value2,
    })),
}));

interface IStoreCameraControl {
  cameraRef: any;
}

export const useStoreCameraControl = create<IStoreCameraControl>(() => ({
  cameraRef: createRef<CameraControls>(),
}));

interface ViewDesignProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export const useViewDesign = create<ViewDesignProps>((set) => ({
  isOpen: false,
  setIsOpen: (value) => set((state) => ({ ...state, isOpen: value })),
}));

interface CameraPosProps {
  cameraPos: number;
  setCameraPos: (value: number) => void;
}

export const useCameraPos = create<CameraPosProps>((set) => ({
  cameraPos: 30,
  setCameraPos: (value) => set((state) => ({ ...state, cameraPos: value })),
}));

interface Placement {
  placement: { [key: string]: string };
  setPlacement: (value: { [key: string]: string }) => void;
}

export const usePlacement = create<Placement>((set) => ({
  placement: {},
  setPlacement: (value) => set((state) => ({ ...state, placement: value })),
}));

interface StyleProps {
  label: string;
  setStyle: (value: string) => void;
}

export const useStyle = create<StyleProps>((set) => ({
  label: "Gable",
  setStyle: (value) => set((state) => ({ ...state, label: value })),
}));

interface UpgradeProps {
  downspout: boolean;
  setdownspout: (value: boolean) => void;
}

export const useUpgrade = create<UpgradeProps>((set) => ({
  downspout: false,
  setdownspout: (value) => set((state) => ({ ...state, downspout: value })),
}));

interface PlacementForWindowDoor {
  placementWalkDoor: { [key: string]: string };
  setPlacementWalkDoor: (value: { [key: string]: string }) => void;
  placementRollUpDoor: { [key: string]: string };
  setPlacementRollUpDoor: (value: { [key: string]: string }) => void;
  placementWindow: { [key: string]: string };
  setPlacementWindow: (value: { [key: string]: string }) => void;
}

export const usePlacementForWindowDoor = create<PlacementForWindowDoor>(
  (set) => ({
    placementWalkDoor: {},
    setPlacementWalkDoor: (value) => {
      set((state) => ({ ...state, placementWalkDoor: value }));
    },
    placementRollUpDoor: {},
    setPlacementRollUpDoor: (value) => {
      set((state) => ({ ...state, placementRollUpDoor: value }));
    },
    placementWindow: {},
    setPlacementWindow: (value) => {
      set((state) => ({ ...state, placementWindow: value }));
    },
  }),
);

interface BuildingForWindowDoor {
  buildingWalkDoor: { [key: string]: string };
  setBuildingWalkDoor: (value: { [key: string]: string }) => void;
  buildingRollUpDoor: { [key: string]: string };
  setBuildingRollUpDoor: (value: { [key: string]: string }) => void;
  buildingWindow: { [key: string]: string };
  setBuildingWindow: (value: { [key: string]: string }) => void;
}

export const useBuildingForWindowDoor = create<BuildingForWindowDoor>(
  (set) => ({
    buildingWalkDoor: {},
    setBuildingWalkDoor: (value) => {
      set((state) => ({ ...state, buildingWalkDoor: value }));
    },
    buildingRollUpDoor: {},
    setBuildingRollUpDoor: (value) => {
      set((state) => ({ ...state, buildingRollUpDoor: value }));
    },
    buildingWindow: {},
    setBuildingWindow: (value) => {
      set((state) => ({ ...state, buildingWindow: value }));
    },
  }),
);

interface UpgradeDoorWindows {
  multipleWalkDoor: { [key: number]: number | string };
  multipleAddWindow: { [key: number]: number | string };
  multipleWalkDoorOpenStatus: { [key: number]: boolean };
  multipleRollUpDoor: { [key: number]: number | string };
  multipleAddWindowOpenStatus: { [key: number]: boolean };
  multipleRollUpDoorOpenStatus: { [key: number]: boolean };

  setMultipleWalkDoor: (value: { [key: number]: number | string }) => void;
  setMultipleRollUpOpenStatus: (value: { [key: number]: boolean }) => void;
  setMultipleAddWindow: (value: { [key: number]: number | string }) => void;
  setMultipleWalkDoorOpenStatus: (value: { [key: number]: boolean }) => void;
  setMultipleRollUpDoor: (value: { [key: number]: number | string }) => void;
  setMultipleAddWindowOpenStatus: (value: { [key: number]: boolean }) => void;
}

export const useMultipleDoorsWindows = create<UpgradeDoorWindows>((set) => ({
  multipleWalkDoor: {},
  multipleAddWindow: {},
  multipleRollUpDoor: {},
  multipleWalkDoorOpenStatus: {},
  multipleAddWindowOpenStatus: {},
  multipleRollUpDoorOpenStatus: {},

  setMultipleWalkDoor: (value) =>
    set((state) => ({ ...state, multipleWalkDoor: value })),
  setMultipleAddWindow: (value) =>
    set((state) => ({ ...state, multipleAddWindow: value })),
  setMultipleRollUpDoor: (value) =>
    set((state) => ({ ...state, multipleRollUpDoor: value })),
  setMultipleWalkDoorOpenStatus: (value) =>
    set((state) => ({ ...state, multipleWalkDoorOpenStatus: value })),
  setMultipleRollUpOpenStatus: (value) =>
    set((state) => ({ ...state, multipleRollUpDoorOpenStatus: value })),
  setMultipleAddWindowOpenStatus: (value) =>
    set((state) => ({ ...state, multipleAddWindowOpenStatus: value })),
}));
interface SliderUpdateProps {
  positionRange: { [key: string]: Array<number> };
  setPositionRange: (value: { [key: string]: Array<number> }) => void;
}

export const useSliderUpdate = create<SliderUpdateProps>((set) => ({
  positionRange: {
    walkdoor: [],
    rollupdoor: [],
    window: [],
  },
  setPositionRange: (value) => {
    set((state) => ({ ...state, positionRange: value }));
  },
}));

interface IAddRecess {
  multipleRecess: { [key: number]: number | string };
  multipleRecessOpenStatus: { [key: number]: boolean };
  setMultipleRecessOpenStatus: (value: { [key: number]: boolean }) => void;
  setMultipleRecess: (value: { [key: number]: number | string }) => void;
}

export const useAddMultipleRecess = create<IAddRecess>((set) => ({
  multipleRecess: {},
  multipleRecessOpenStatus: {},
  setMultipleRecessOpenStatus: (value) =>
    set((state) => ({ ...state, multipleRecessOpenStatus: value })),
  setMultipleRecess: (value) =>
    set((state) => ({ ...state, multipleRecess: value })),
}));

interface IAddHall {
  multipleHall: { [key: number]: number | string };
  multipleHallOpenStatus: { [key: number]: boolean };
  setMultipleHallOpenStatus: (value: { [key: number]: boolean }) => void;
  setMultipleHall: (value: { [key: number]: number | string }) => void;
}

export const useAddMultipleHall = create<IAddHall>((set) => ({
  multipleHall: {},
  multipleHallOpenStatus: {},
  setMultipleHallOpenStatus: (value) =>
    set((state) => ({ ...state, multipleHallOpenStatus: value })),
  setMultipleHall: (value) =>
    set((state) => ({ ...state, multipleHall: value })),
}));

interface ZoomInOutProps {
  zoomAvailable: boolean;
  setZoomAvailable: (value: boolean) => void;
}
export const useZoomInOrOut = create<ZoomInOutProps>((set) => ({
  zoomAvailable: false,
  setZoomAvailable: (value) =>
    set((state) => ({ ...state, zoomAvailable: value })),
}));
