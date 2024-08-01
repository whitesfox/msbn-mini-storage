/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from "zustand";

export interface BuildingInfo {
  wall: string;
  type: string;
  lWidth: number;
  lLength: number;
  lEaveHeight: number;
  lDeltaHeight: number;
  lInsetBayLength: number;
  lPos: [number, number, number];
  lRot: [number, number, number];
}

interface leanToStateInfo {
  wall: string;
  seted: boolean;
}

interface IStoreBuilding {
  leanToData: Array<BuildingInfo>;
  selectedLeanToWall: string;
  leanToState: Array<leanToStateInfo>;
  leanToInsetBay: Array<leanToStateInfo>;

  setSelectedLeanToWall: (wall: string) => void;
  updateLeanToData: (data: BuildingInfo) => void;
  addLeanToState: (data: leanToStateInfo) => void;
  addLeanToInsetBay: (data: leanToStateInfo) => void;
}

export const useLeanTo = create<IStoreBuilding>((set) => ({
  leanToData: [
    {
      wall: "EndWallFront",
      type: "Closure",
      lWidth: 20,
      lLength: 20,
      lEaveHeight: 8,
      lDeltaHeight: 0,
      lInsetBayLength: 0,
      lPos: [0, 0, 0],
      lRot: [0, 0, 0],
    },
    {
      wall: "EndWallBack",
      type: "Closure",
      lWidth: 20,
      lLength: 20,
      lEaveHeight: 8,
      lDeltaHeight: 0,
      lInsetBayLength: 0,
      lPos: [0, 0, 0],
      lRot: [0, 0, 0],
    },
    {
      wall: "SideWallRight",
      type: "Closure",
      lWidth: 20,
      lLength: 20,
      lEaveHeight: 8,
      lDeltaHeight: 0,
      lInsetBayLength: 0,
      lPos: [0, 0, 0],
      lRot: [0, 0, 0],
    },
    {
      wall: "SideWallLeft",
      type: "Closure",
      lWidth: 20,
      lLength: 20,
      lEaveHeight: 8,
      lDeltaHeight: 0,
      lInsetBayLength: 0,
      lPos: [0, 0, 0],
      lRot: [0, 0, 0],
    },
  ],
  selectedLeanToWall: "",
  leanToState: [
    { wall: "EndWallFront", seted: false },
    { wall: "EndWallBack", seted: false },
    { wall: "SideWallRight", seted: false },
    { wall: "SideWallLeft", seted: false },
  ],
  leanToInsetBay: [
    { wall: "EndWallFront", seted: false },
    { wall: "EndWallBack", seted: false },
    { wall: "SideWallRight", seted: false },
    { wall: "SideWallLeft", seted: false },
  ],
  setSelectedLeanToWall: (wall) => {
    set(() => ({
      selectedLeanToWall: wall,
    }));
  },
  updateLeanToData: (data) =>
    set((state) => ({
      ...state,
      leanToData: state.leanToData.map((item, _index) => {
        if (item.wall === data.wall) {
          return data;
        }
        return item;
      }),
      selectedLeanToWall: "",
    })),
  addLeanToState: (data) =>
    set((state) => ({
      ...state,
      leanToState: state.leanToState.map((item) => {
        if (item.wall === data.wall) return data;
        return item;
      }),
    })),
  addLeanToInsetBay: (data) =>
    set((state) => ({
      ...state,
      leanToInsetBay: state.leanToInsetBay.map((item) => {
        if (item.wall === data.wall) return data;
        return item;
      }),
    })),
}));
