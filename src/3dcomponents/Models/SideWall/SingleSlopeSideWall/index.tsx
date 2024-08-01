/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unknown-property */
import * as THREE from "three";
import { useMemo } from "react";
import { SideWall } from "..";
import { useDoorStore } from "store/useDoor";
import { useStoreColor, useUpgrade } from "store";

interface ISingleSlopeSideWall {
  flag: boolean;
  material: string;
  width: number;
  eaveHeight: number;
  basicLength: number;
}

export const SingleSlopeSideWall = ({
  flag,
  width,
  eaveHeight,
  basicLength,
}: ISingleSlopeSideWall) => {
  const { sliceDoorData } = useDoorStore();
  const { roofonly, wainscotHeight } = useUpgrade();
  const { sideWallColor, wainscotColor } = useStoreColor();

  const objData = sliceDoorData.filter((item) => {
    if (flag ? item.wall === "SideWallRight" : item.wall === "SideWallLeft")
      if (item.visible) return item;
  });

  const model = useMemo(() => {
    const modelShape = new THREE.Shape();

    modelShape.moveTo(0, 0);
    for (let i = 0; i < basicLength; i++) {
      modelShape.lineTo(0 + i, 0.07);
      modelShape.lineTo(0.096 + i, 0.146);
      modelShape.lineTo(0.18 + i, 0.146);
      modelShape.lineTo(0.276 + i, 0.07);
      modelShape.lineTo(0.443 + i, 0.07);
      modelShape.lineTo(0.468 + i, 0.115);
      modelShape.lineTo(0.531 + i, 0.115);
      modelShape.lineTo(0.557 + i, 0.07);
      modelShape.lineTo(0.776 + i, 0.07);
      modelShape.lineTo(0.802 + i, 0.115);
      modelShape.lineTo(0.864 + i, 0.115);
      modelShape.lineTo(0.89 + i, 0.07);
      modelShape.lineTo(1 + i, 0.07);
    }
    modelShape.lineTo(basicLength, 0);
    modelShape.closePath();

    return modelShape;
  }, [eaveHeight, basicLength]);

  return (
    <group
      castShadow
      receiveShadow
      visible={roofonly ? false : true}
    >
      <SideWall
        flag={flag}
        name={flag ? "SideWallRight" : "SideWallLeft"}
        eaveHeight={eaveHeight}
        basicLength={basicLength}
        wainscotHeight={wainscotHeight}
        sideWallColor={sideWallColor}
        wainscotColor={wainscotColor}
        modelShape={model}
        objData={objData}
        pos={
          flag
            ? [width / 2 - 0.1, 0, -basicLength / 2]
            : [-width / 2, 0, basicLength / 2]
        }
        rot={
          flag
            ? [Math.PI / 2, Math.PI, Math.PI / 2]
            : [-Math.PI / 2, 0, Math.PI / 2]
        }
      />
    </group>
  );
};
