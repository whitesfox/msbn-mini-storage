/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from "zustand";

export interface DoorInfo {
  key: number;
  name: string;
  type: string;
  building: string;
  wall: string;
  nameForRange: string;
  itemforRange: number;
  size: [number, number, number];
  pos: [number, number, number];
  rot: [number, number, number];
}

export interface SliceDoorInfo {
  key: number;
  name: string;
  type: string;
  building: string;
  wall: string;
  nameForRange: string;
  itemforRange: number;
  visible: boolean;
  size: [number, number, number];
  pos: [number, number, number];
  rot: [number, number, number];
}

interface IStoreDoor {
  lineShow: boolean;
  doorCount: number;
  doorData: Array<DoorInfo>;
  sliceDoorData: Array<SliceDoorInfo>;

  increaseDoorCount: () => void;
  setLineShow: (value: boolean) => void;
  addDoorData: (data: Array<DoorInfo>) => void;
  removeDoorData: (keyArray: Array<number>) => void;
  updateDoorData: (data: DoorInfo, key: number) => void;
  addSliceDoorData: (data: Array<SliceDoorInfo>) => void;
  removeSliceDoorData: (keyArray: Array<number>) => void;
  updateSliceDoorData: (data: SliceDoorInfo, key: number) => void;
}

export const useDoorStore = create<IStoreDoor>((set) => ({
  lineShow: false,
  doorCount: 0,
  doorData: [],
  sliceDoorData: [],

  increaseDoorCount: () =>
    set((state) => ({
      doorCount: state.doorCount + 1,
    })),
  setLineShow: (value) => set((state) => ({ ...state, lineShow: value })),
  addDoorData: (data) =>
    set((state) => ({
      ...state,
      doorData: data,
    })),
  removeDoorData: (keyArray) =>
    set((state) => ({
      ...state,
      doorData: state.doorData.filter((item) => {
        if (keyArray.length > 0) return !keyArray.includes(item.key);
      }),
    })),
  updateDoorData: (data, key) =>
    set((state) => ({
      ...state,
      doorData: state.doorData.map((item) => {
        if (item.key === key) {
          return data;
        }
        return item;
      }),
    })),
  addSliceDoorData: (data) =>
    set((state) => ({
      ...state,
      sliceDoorData: data,
    })),
  removeSliceDoorData: (keyArray) =>
    set((state) => ({
      ...state,
      sliceDoorData: state.sliceDoorData.filter((item) => {
        if (keyArray.length > 0) return !keyArray.includes(item.key);
      }),
    })),
  updateSliceDoorData: (data, key) =>
    set((state) => ({
      ...state,
      sliceDoorData: state.sliceDoorData.map((item) => {
        if (item.key === key) {
          return data;
        }
        return item;
      }),
    })),
}));

interface DoorStore {
  walkDoorName: { [key: string]: string };
  windowName: { [key: string]: string };
  rollupDoorName: { [key: string]: string };
  setWalkDoorName: (value: { [key: string]: string }) => void;
  setWindowName: (value: { [key: string]: string }) => void;
  setRollupDoorName: (value: { [key: string]: string }) => void;
}
export const useDoorName = create<DoorStore>((set) => ({
  walkDoorName: {},
  windowName: {},
  rollupDoorName: {},
  setRollupDoorName: (value) =>
    set((state) => ({ ...state, rollupDoorName: value })),
  setWindowName: (value) => set((state) => ({ ...state, windowName: value })),
  setWalkDoorName: (value) =>
    set((state) => ({ ...state, walkDoorName: value })),
}));

interface SliderStatusInfo {
  index: number;
  value: boolean;
}
interface sliderStore {
  sliderStatus: { [key: string]: Array<boolean> };
  setSliderStatus: (value: { [key: string]: Array<boolean> }) => void;
}
export const useSliderStatus = create<sliderStore>((set) => ({
  sliderStatus: {
    walkdoor: [],
    rollupdoor: [],
    window: [],
  },
  setSliderStatus: (data) =>
    set((_state) => ({
      sliderStatus: data,
    })),
}));

interface ICombo {
  key: number;
  type: string;
  size: string;
  placement: string;
  building: string;
}
interface IDoorCombo {
  doorComboData: Array<ICombo>;
  addComboData: (data: ICombo) => void;
  removeComboData: (key: number, type: string) => void;
  updateComboData: (
    dataType: string,
    value: string,
    key: number,
    type: string,
  ) => void;
}

export const useDoorCombo = create<IDoorCombo>((set) => ({
  doorComboData: [],
  addComboData: (data) =>
    set((state) => ({
      ...state,
      doorComboData: [...state.doorComboData, data],
    })),
  removeComboData: (key, type) =>
    set((state) => ({
      ...state,
      doorComboData: state.doorComboData.filter(
        (item) => !(item.key === key && item.type === type),
      ),
    })),
  updateComboData: (dataType, value, key, type) =>
    set((state) => ({
      ...state,
      doorComboData: state.doorComboData.map((item) => {
        if (item.key === key && item.type === type) {
          switch (dataType) {
            case "size":
              return {
                key: item.key,
                type: item.type,
                size: value,
                placement: item.placement,
                building: item.building,
              };
            case "placement":
              return {
                key: item.key,
                type: item.type,
                size: item.size,
                placement: value,
                building: item.building,
              };
            case "building":
              return {
                key: item.key,
                type: item.type,
                size: item.size,
                placement: item.placement,
                building: value,
              };
            default:
              break;
          }
        }
        return item;
      }),
    })),
}));
