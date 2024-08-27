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
    wainscotColorLabel,
    downspoutsColorLabel,
    setRoofColor,
    setRoofTrimColor,
    setSideWallColor,
    setWallTrimColor,
    setBaseTrimColor,
    setWainscotColor,
    setDownspoutColor,
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
