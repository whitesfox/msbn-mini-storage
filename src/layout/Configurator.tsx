/* eslint-disable react/no-unknown-property */
import { GableBuilding } from "3dcomponents/Building/Gable";
import { SingleSlope } from "3dcomponents/Building/SingleSlope";
import { useStyle } from "store";
import { Params } from "./Params";

export const Configurator = () => {
  const { label } = useStyle();

  return (
    <group
      castShadow
      receiveShadow
    >
      {label === "Gable" ? <GableBuilding /> : null}
      {label === "Single Slope" ? <SingleSlope /> : null}
      <Params />
    </group>
  );
};
