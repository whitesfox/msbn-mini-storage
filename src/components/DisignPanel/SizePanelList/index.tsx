import { SizePanel } from "./Panel";
import { useStoreSize } from "store";
import { PitchOption } from "../Combobox/PitchOption";

const widthSizeList = Array.from({ length: 101 }, () => 0).map((_, index) => {
  return {
    id: index + 1,
    val: index + 20,
  };
});
const lengthSizeList = Array.from({ length: 281 }, () => 0).map((_, index) => {
  return {
    id: index + 1,
    val: index + 20,
  };
});
const eaveHeightSizeList = Array.from({ length: 17 }, () => 0).map(
  (_, index) => {
    return {
      id: index + 1,
      val: index + 8,
    };
  },
);

function SizePanelList() {
  const {
    width,
    length,
    eaveHeight,
    pitchOptionSize,
    setWidth,
    setLength,
    setEaveHeight,
  } = useStoreSize();

  return (
    <div className="flex w-full gap-3 text-center">
      <SizePanel
        sizeName="Width"
        valueProps={width}
        setValue={setWidth}
        sizeList={widthSizeList}
      />
      <SizePanel
        sizeName="Length"
        valueProps={length}
        setValue={setLength}
        sizeList={lengthSizeList}
      />
      <SizePanel
        sizeName="Eave Height"
        valueProps={eaveHeight}
        setValue={setEaveHeight}
        sizeList={eaveHeightSizeList}
      />
      <PitchOption
        valueProps={pitchOptionSize}
        type={"main"}
        wall=""
        costCalculation={() => {}}
        mainKey={""}
        typePitch=""
      />
    </div>
  );
}

export default SizePanelList;
