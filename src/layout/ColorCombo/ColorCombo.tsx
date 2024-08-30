import React from "react";
import { ColorComboboxPanel } from "components/DisignPanel/Combobox/ColorComboboxPanel";
import { colorSetting } from "assets/colorList";

import { useStoreColor } from "store";
type ColorComboProps = {
  costCalculation: (
    panelName: string,
    value: string | number,
    mainKey: string,
    booleanTypeOption?: boolean,
  ) => void;
  downspout: boolean;
};

const ColorCombo = ({ costCalculation, downspout }: ColorComboProps) => {
  const {
    roofColorLabel,
    roofTrimColorLabel,
    sideWallColorLabel,
    wallTrimColorLabel,
    baseTrimColorLabel,
    downspoutsColorLabel,
    mullionTrimColorLabel,
    rollupDoorColorLabel,
    setRoofColor,
    setRoofTrimColor,
    setSideWallColor,
    setWallTrimColor,
    setBaseTrimColor,
    setDownspoutColor,
    setMullionTrimColor,
    setRollUpDoorColor,
  } = useStoreColor();
  return (
    <>
      {" "}
      <ColorComboboxPanel
        panelName="Roof"
        dataList={colorSetting}
        valueProps={roofColorLabel}
        setValue={setRoofColor}
        type="roof"
        costCalculation={costCalculation}
        mainKey="chooseyourcolors"
      />
      <ColorComboboxPanel
        panelName="Siding"
        dataList={colorSetting}
        valueProps={sideWallColorLabel}
        setValue={setSideWallColor}
        type="siding"
        costCalculation={costCalculation}
        mainKey="chooseyourcolors"
      />
      <ColorComboboxPanel
        panelName="Wall trim"
        dataList={colorSetting}
        valueProps={wallTrimColorLabel}
        setValue={setWallTrimColor}
        type="basetrim"
        costCalculation={costCalculation}
        mainKey="chooseyourcolors"
      />
      <ColorComboboxPanel
        panelName="Mullion trim"
        dataList={colorSetting}
        valueProps={mullionTrimColorLabel}
        setValue={setMullionTrimColor}
        type="mulliontrim"
        costCalculation={costCalculation}
        mainKey="chooseyourcolors"
      />
      <ColorComboboxPanel
        panelName="Roll-up door"
        dataList={colorSetting}
        valueProps={rollupDoorColorLabel}
        setValue={setRollUpDoorColor}
        type="rollupdoor"
        costCalculation={costCalculation}
        mainKey="chooseyourcolors"
      />
      <ColorComboboxPanel
        panelName="Base trim"
        dataList={colorSetting}
        valueProps={baseTrimColorLabel}
        setValue={setBaseTrimColor}
        type="downspouts"
        costCalculation={costCalculation}
        mainKey="chooseyourcolors"
      />
      <ColorComboboxPanel
        panelName="Roof trim"
        dataList={colorSetting}
        valueProps={roofTrimColorLabel}
        setValue={setRoofTrimColor}
        type="rooftrim"
        costCalculation={costCalculation}
        mainKey="chooseyourcolors"
      />
      {downspout && (
        <ColorComboboxPanel
          panelName="Downspout"
          dataList={colorSetting}
          valueProps={downspoutsColorLabel}
          setValue={setDownspoutColor}
          type="downspouts"
          costCalculation={costCalculation}
          mainKey="chooseyourcolors"
        />
      )}
    </>
  );
};

export default ColorCombo;
