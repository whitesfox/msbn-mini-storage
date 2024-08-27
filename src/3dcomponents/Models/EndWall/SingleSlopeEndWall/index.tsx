/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unknown-property */
import * as THREE from "three";
import { useMemo } from "react";
import { EndWall } from "..";
import { useDoorStore } from "store/useDoor";
import { useStoreColor, useUpgrade } from "store";

interface ISingleSlopeEndWall {
  flag: boolean;
  width: number;
  eaveHeight: number;
  deltaHeight: number;
  basicLength: number;
}

export const SingleSlopeEndWall = ({
  flag,
  width,
  eaveHeight,
  deltaHeight,
  basicLength,
}: ISingleSlopeEndWall) => {
  const { sliceDoorData } = useDoorStore();
  const { sideWallColor, wainscotColor } = useStoreColor();

  const objData = sliceDoorData.filter((item) => {
    if (
      flag
        ? item.wall === "EndWallGabelFront"
        : item.wall === "EndWallGabelBack"
    )
      if (item.visible && item.building === "MainBuilding") return item;
  });

  const model = useMemo(() => {
    const modelShape = new THREE.Shape();

    modelShape.moveTo(-width / 2, 0);
    modelShape.lineTo(-width / 2, eaveHeight);
    modelShape.lineTo(width / 2, eaveHeight + deltaHeight);
    modelShape.lineTo(width / 2, 0);
    modelShape.closePath();

    return modelShape;
  }, [width, eaveHeight, deltaHeight]);

  return (
    <group
      castShadow
      receiveShadow
    >
      <EndWall
        name={flag ? "EndWallGabelFront" : "EndWallGabelBack"}
        sideWallColor={sideWallColor}
        modelShape={model}
        objData={objData}
        pos={
          flag
            ? [-0.05, 0, basicLength / 2]
            : [-0.05, 0, -basicLength / 2 - 0.1]
        }
        rot={[0, 0, 0]}
      />
    </group>
  );
};
