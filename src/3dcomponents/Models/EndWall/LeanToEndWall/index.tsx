/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unknown-property */
import * as THREE from "three";
import { useMemo } from "react";
import { useStoreColor, useUpgrade } from "store";
import { useDoorStore } from "store/useDoor";
import { EndWallModel } from "./EndWallModel";

interface ILeanToEndWall {
  name: string;
  wall: string;
  type: string;
  flag: boolean;
  lWidth: number;
  lLength: number;
  lEaveHeight: number;
  lDeltaHeight: number;
  lInsetBayLength: number;
}

export const LeanToEndWall = ({
  name,
  wall,
  type,
  flag,
  lWidth,
  lLength,
  lEaveHeight,
  lDeltaHeight,
  lInsetBayLength,
}: ILeanToEndWall) => {
  const { sideWallColor, wainscotColor } = useStoreColor();
  const { sliceDoorData } = useDoorStore();

  const model = useMemo(() => {
    const modelShape = new THREE.Shape();

    modelShape.moveTo(-lWidth, 0);
    modelShape.lineTo(0, 0);
    modelShape.lineTo(0, lEaveHeight + lDeltaHeight);
    modelShape.lineTo(-lWidth, lEaveHeight);
    modelShape.closePath();

    return modelShape;
  }, [lWidth, lEaveHeight, lDeltaHeight]);

  const objData = sliceDoorData.filter((item) => {
    if (wall === "EndWallFront") {
      if (flag ? item.wall === "SideWallRight" : item.wall === "SideWallLeft")
        if (item.visible && item.building.startsWith("Lean-to")) return item;
    } else if (wall === "EndWallBack") {
      if (flag ? item.wall === "SideWallLeft" : item.wall === "SideWallRight")
        if (item.visible && item.building.startsWith("Lean-to")) return item;
    } else if (wall === "SideWallLeft") {
      if (
        flag
          ? item.wall === "EndWallGabelFront"
          : item.wall === "EndWallGabelBack"
      )
        if (item.visible && item.building.startsWith("Lean-to")) return item;
    } else if (wall === "SideWallRight") {
      if (
        flag
          ? item.wall === "EndWallGabelBack"
          : item.wall === "EndWallGabelFront"
      )
        if (item.visible && item.building.startsWith("Lean-to")) return item;
    }
  });

  return (
    <group
      castShadow
      receiveShadow
      visible={type === "Open" ? false : true}
    >
      <EndWallModel
        name={name}
        wall={wall}
        flag={flag}
        lWidth={lWidth}
        lLength={lLength}
        sideWallColor={sideWallColor}
        modelShape={model}
        objData={objData}
        pos={
          wall === "SideWallLeft"
            ? flag
              ? [0, 0, lLength / 2 - lInsetBayLength - 0.03]
              : [0, 0, -lLength / 2 + 0.03]
            : flag
              ? [0, 0, lLength / 2 - 0.03]
              : [0, 0, lInsetBayLength - lLength / 2 + 0.03]
        }
        rot={[0, 0, 0]}
      />
    </group>
  );
};
