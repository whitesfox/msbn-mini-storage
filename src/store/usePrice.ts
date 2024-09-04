/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from "zustand";
import { getDocs, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
type PridDataType = { [key: string]: { [key: string]: any } };
interface GetPriceProps {
  priceData: PridDataType;
  loadingForPrice: { [key: string]: string | boolean };
  isPriceLoaded: boolean;
  fetchPrice: () => Promise<void>;
  updatePrice: (value: {
    titleDb: string;
    id: number | string;
    name: string;
    value: string;
    rowData: any;
  }) => Promise<void>;
  setPrice: (data: PridDataType) => void;
  dimension: Array<number>;
  setDimension: (value: Array<number>) => void;
}
export const useGetPrice = create<GetPriceProps>((set) => ({
  dimension: [40, 60],
  priceData: {
    chooseyourstyle: { style: {} },
    chooseyoursize: {
      width: {},
      length: {},
      eaveheight: {},
      roofpitch: {},
      insetbaylength: {},
      roofonly: {},
    },
    addoverhang: { eaveoverhang: {}, gableoverhang: {} },
    choosewindowdoor: { walkdoor: {}, rollupdoor: {}, window: {} },
    optionalupgrades: { wainscot: {}, eaveheight: {} },
  },
  isPriceLoaded: false,
  loadingForPrice: { id: "", status: false },
  setDimension: (data) => {
    set((state) => ({ ...state, dimension: data }));
  },
  setPrice: (data) => {
    set((state) => ({ ...state, priceData: data }));
  },
  fetchPrice: async () => {
    set((state) => ({ ...state, isPriceLoaded: true }));

    const querySnapshot = await getDocs(collection(db, "designerpricing"));
    const collectionData = [] as any;
    querySnapshot.forEach((doc) => {
      collectionData.push({ ...doc.data(), id: doc.id });
    });

    set((state: any) => {
      const fetchStyle: any = [];

      const tempPriceData = { ...state.priceData } as any;

      collectionData.forEach((key: any) => {
        tempPriceData[`${key.id}`] = key;
      });
      return { ...state, priceData: tempPriceData, isPriceLoaded: false };
    });
  },
  updatePrice: async (data) => {
    set((state) => ({
      ...state,
      loadingForPrice: {
        ...state.loadingForPrice,
        id: data.name,
        status: true,
      },
    }));

    const chooseYourStyleRef = doc(db, `designerpricing`, `${data.titleDb}`);
    await updateDoc(chooseYourStyleRef, {
      [data.id]: data.rowData[data.id],
    });
    set((state) => ({
      ...state,
      loadingForPrice: {
        ...state.loadingForPrice,
        id: data.name,
        status: false,
      },
    }));
  },
}));

interface PriceCalculationProps {
  priceList: { [key: string]: any };
  totalPrice: number;
  setPriceList: (value: { [key: string]: string }, totalPrice: number) => void;
}
export const usePriceCalculation = create<PriceCalculationProps>((set) => ({
  priceList: {
    chooseyourstyle: { style: "" },
    chooseyoursize: {
      width: "",
      length: "",
      eaveheight: "",
      roofpitch: "",
      insetbaylength: "",
      roofonly: "",
    },
    addoverhang: { eaveoverhang: "", gableoverhang: "" },
    choosewindowdoor: { walkdoor: "", rollupdoor: "", window: "" },
    optionalupgrades: { wainscot: "", eaveheight: "" },
  },
  totalPrice: 0,
  setPriceList: (value, totalPrice) => {
    set((state) => ({ ...state, priceList: value, totalPrice: totalPrice }));
  },
}));

interface PaymentCalculationProps {
  paymentCalculationStatus: boolean;
  setPaymentCalculationStatus: (value: boolean) => void;
}
export const usePaymentCalculation = create<PaymentCalculationProps>((set) => ({
  paymentCalculationStatus: false,
  setPaymentCalculationStatus: (value) => {
    set((state) => ({ ...state, paymentCalculationStatus: value }));
  },
}));
