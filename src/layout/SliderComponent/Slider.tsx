/* eslint-disable @typescript-eslint/no-unused-vars */
import "./Slider.css";
import { PiLineVertical } from "react-icons/pi";

type SliderProps = {
  itemNameSmall: string;
  sliderStatus?: { [key: string]: Array<boolean> };
  setSliderStatus: (value: { [key: string]: Array<boolean> }) => void;
  keysVal: number;
  index?: number;
  sliderRange?: string;
  minVal?: any;
  maxVal?: any;
  placementWalkDoor?: string;
  onChange?: (value: any) => void;
};
const Slider = ({
  itemNameSmall,
  keysVal,
  index,
  onChange,
  sliderRange,
  setSliderStatus,
  sliderStatus,
  minVal,
  maxVal,
  placementWalkDoor,
}: SliderProps) => {
  const handleMouseDown = (e: any) => {
    const tempSliderStatus = { ...sliderStatus };
    if (tempSliderStatus[itemNameSmall].length === 0) {
      tempSliderStatus[itemNameSmall].push(true);
    } else {
      tempSliderStatus[itemNameSmall][keysVal] = true;
    }
    setSliderStatus(tempSliderStatus);
  };

  const handleMouseUp = (e: any) => {
    const tempSliderStatus = { ...sliderStatus };
    if (tempSliderStatus[itemNameSmall].length === 0) {
      tempSliderStatus[itemNameSmall].push(false);
    } else {
      tempSliderStatus[itemNameSmall][keysVal] = false;
    }
    setSliderStatus(tempSliderStatus);
  };

  return (
    <div className={`w-full outline-none`}>
      <input
        step={0.05}
        type="range"
        min={minVal}
        max={maxVal}
        value={sliderRange}
        className={`slider-thumb relative h-6 w-full appearance-none rounded-full bg-gray-300 opacity-70 outline-none transition duration-200 hover:opacity-100 focus:border-transparent focus:bg-gray-300 focus:ring-transparent`}
        id="myRange"
        onChange={onChange}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
      />
      <div className="text-color absolute left-[50%] text-sm text-customGreen">
        <PiLineVertical />
      </div>
    </div>
  );
};

export default Slider;
