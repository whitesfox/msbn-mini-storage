import { create } from "zustand";
import { shallow } from "zustand/shallow";
import { StoreApi, UseBoundStore } from "zustand";

type GenericState = Record<string, any>;

export const createStoreWithSelectors = <T extends GenericState>(
  store: UseBoundStore<StoreApi<T>>,
): (<K extends keyof T>(keys: K[]) => Pick<T, K>) => {
  const useStore: <K extends keyof T>(keys: K[]) => Pick<T, K> = <
    K extends keyof T,
  >(
    keys: K[],
  ) => {
    return store((state) => {
      const x = keys.reduce((acc, cur) => {
        acc[cur] = state[cur];
        return acc;
      }, {} as T);

      return x as Pick<T, K>;
    }, shallow);
  };

  return useStore;
};

interface IStoreSelectedItem {
  selectedItem: string;
  selectedBuilding: string;
  setSelectedItem: (value: string) => void;
  setSelectedBuilding: (value: string) => void;
}

const useSelectedItem = create<IStoreSelectedItem>((set) => ({
  selectedItem: "",
  selectedBuilding: "",
  setSelectedItem: (value) =>
    set((state) => ({ ...state, selectedItem: value })),
  setSelectedBuilding: (value) =>
    set((state) => ({ ...state, selectedBuilding: value })),
}));

export const useAction = createStoreWithSelectors(useSelectedItem);
