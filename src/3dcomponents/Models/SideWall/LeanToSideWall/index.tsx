/* eslint-disable react/no-unknown-property */
/* eslint-disable react-hooks/exhaustive-deps */
import * as THREE from "three";
import { useMemo } from "react";
import { useStoreColor, useStoreSize, useUpgrade } from "store";
import { useDoorStore } from "store/useDoor";
import { SideWallModel } from "./SideWallModel";

interface ILeanToSideWall {
  name: string;
  wall: string;
  type: string;
  flag: boolean;
  material: string;
  lWidth: number;
  lLength: number;
  lEaveHeight: number;
  lInsetBayLength: number;
  lPos: [number, number, number];
}

export const LeanToSideWall = ({
  name,
  wall,
  type,
  flag,
  lWidth,
  lLength,
  lEaveHeight,
  lInsetBayLength,
  lPos,
}: ILeanToSideWall) => {
  const { sliceDoorData } = useDoorStore();
  const { width, deltaHeight, basicLength } = useStoreSize();
  const { sideWallColor } = useStoreColor();

  const objData = sliceDoorData.filter((item) => {
    if (wall === "EndWallBack") {
      if (item.wall === "EndWallGabelBack")
        if (item.visible && item.building.startsWith("Lean-to")) return item;
    } else if (wall === "EndWallFront") {
      if (item.wall === "EndWallGabelFront")
        if (item.visible && item.building.startsWith("Lean-to")) return item;
    } else if (wall === "SideWallLeft") {
      if (item.wall === "SideWallLeft")
        if (item.visible && item.building.startsWith("Lean-to")) return item;
    } else if (wall === "SideWallRight") {
      if (item.wall === "SideWallRight")
        if (item.visible && item.building.startsWith("Lean-to")) return item;
    }
  });

  const model = useMemo(() => {
    const modelShape = new THREE.Shape();

    if (wall === "SideWallLeft") {
      modelShape.moveTo(lInsetBayLength, 0);

      for (let i = lInsetBayLength; i < lLength; i++) {
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
      modelShape.lineTo(lLength, 0);
    } else {
      modelShape.moveTo(0, 0);

      for (let i = 0; i < lLength - lInsetBayLength; i++) {
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
      modelShape.lineTo(lLength - lInsetBayLength, 0);
    }
    modelShape.closePath();

    return modelShape;
  }, [lEaveHeight, deltaHeight, basicLength, lLength, lInsetBayLength]);

  return (
    <group
      castShadow
      receiveShadow
      visible={type === "Open" ? false : true}
    >
      <SideWallModel
        flag={false}
        name={name}
        eaveHeight={lEaveHeight}
        lLength={lLength}
        width={width}
        sideWallColor={sideWallColor}
        wainscotColor={""}
        modelShape={model}
        objData={objData}
        pos={flag ? [lWidth - 0.1, 0, -lLength / 2] : [-lWidth, 0, lLength / 2]}
        rot={
          flag
            ? [Math.PI / 2, Math.PI, Math.PI / 2]
            : [-Math.PI / 2, 0, Math.PI / 2]
        }
        lPos={lPos}
      />
    </group>
  );
};
