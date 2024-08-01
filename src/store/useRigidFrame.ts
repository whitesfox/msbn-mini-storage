import { create } from "zustand";

export interface IRigidFrame {
  pos: [number, number, number];
}

interface IStoreRigidFrame {
  rigidFrameData: Array<IRigidFrame>;
  insetRigidFrameData: Array<IRigidFrame>;

  addRigidFrameData: (data: Array<IRigidFrame>) => void;
  addInsetRigidFrameData: (data: Array<IRigidFrame>) => void;
}

export const useRigidFrameStore = create<IStoreRigidFrame>((set) => ({
  rigidFrameData: [],
  insetRigidFrameData: [],

  addRigidFrameData: (data) =>
    set((state) => ({
      ...state,
      rigidFrameData: data,
    })),
  addInsetRigidFrameData: (data) =>
    set((state) => ({
      ...state,
      insetRigidFrameData: data,
    })),
}));
