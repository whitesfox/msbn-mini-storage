/* eslint-disable @typescript-eslint/no-unused-vars */
import Slider from "../../../layout/SliderComponent/Slider";

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
            minVal={minVal}
            maxVal={maxVal}
          />
        </div>
      </div>
    </>
  );
};
