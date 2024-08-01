/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unknown-property */
import { useMemo } from "react";
import { LeanToRigidFrameExtrude } from "../../../Models/RigidFrame/RigidFrameExtrudes/LeanToRigidFrameExturde";
import { useStoreSize, useUpgrade } from "store";
import { useRigidFrameStore } from "store/useRigidFrame";
import { EndWallLeanToRigidFrameExtrude } from "3dcomponents/Models/RigidFrame/RigidFrameExtrudes/LeanToRigidFrameExturde/EndWallLeanToRigidFrameExtrude";

interface ILeanToRigidFrameGroup {
  wall: string;
  lWidth: number;
  lLength: number;
  lEaveHeight: number;
  lDeltaHeight: number;
  lPos: [number, number, number];
}

export const LeanToRidigFrameGroup = ({
  wall,
  lWidth,
  lLength,
  lEaveHeight,
  lDeltaHeight,
  lPos,
}: ILeanToRigidFrameGroup) => {
  const { basicLength, bayLength } = useStoreSize();
  const { rigidFrameData, insetRigidFrameData } = useRigidFrameStore();
  const { roofonly } = useUpgrade();

  const LeanToRigidFrameData = useMemo(() => {
    const frameData: number[] = [];

    if (wall === "SideWallRight") {
      rigidFrameData.map((item, _index) => {
        if (
          item.pos[2] + bayLength / 2 > -(lPos[2] + lLength / 2) &&
          item.pos[2] + bayLength / 2 < -(lPos[2] - lLength / 2)
        ) {
          frameData.push(item.pos[2] + bayLength / 2);
        }
      });
      insetRigidFrameData.map((item, _index) => {
        if (
          item.pos[2] - basicLength / 2 > -(lPos[2] + lLength / 2) &&
          item.pos[2] - basicLength / 2 < -(lPos[2] - lLength / 2)
        ) {
          frameData.push(item.pos[2] - basicLength / 2);
        }
      });
    } else if (wall === "SideWallLeft") {
      rigidFrameData.map((item, _index) => {
        if (
          item.pos[2] - bayLength / 2 < lPos[2] + lLength / 2 &&
          item.pos[2] - bayLength / 2 > lPos[2] - lLength / 2
        ) {
          frameData.push(item.pos[2] - bayLength / 2);
        }
      });
      insetRigidFrameData.map((item, _index) => {
        if (
          -item.pos[2] + basicLength / 2 < lPos[2] + lLength / 2 &&
          -item.pos[2] + basicLength / 2 > lPos[2] - lLength / 2
        ) {
          frameData.push(-item.pos[2] + basicLength / 2);
        }
      });
    } else {
      const mainRigidFrame = Array.from(
        { length: Math.floor(lLength / 28) + 2 },
        () => 0,
      );

      const mainRigidFrameInterval =
        (lLength - 0.9) / (mainRigidFrame.length - 1);

      mainRigidFrame.map((_item, index) => {
        frameData.push(-lLength / 2 + 0.5 + index * mainRigidFrameInterval);
      });
    }

    return frameData;
  }, [
    wall,
    rigidFrameData,
    insetRigidFrameData,
    bayLength,
    lPos,
    lLength,
    basicLength,
  ]);

  return (
    <group renderOrder={6}>
      {wall === "EndWallFront" &&
        LeanToRigidFrameData.map((item, index) => (
          <EndWallLeanToRigidFrameExtrude
            key={index}
            pos={[lPos[0] - basicLength / 2 + bayLength / 2, lPos[1], item]}
            lWidth={lWidth}
            lEaveHeight={lEaveHeight}
            lDeltaHeight={lDeltaHeight}
            lLength={lLength}
            increaseLength={0}
          />
        ))}
      {wall === "EndWallBack" &&
        LeanToRigidFrameData.map((item, index) => (
          <EndWallLeanToRigidFrameExtrude
            key={index}
            pos={[lPos[0] - basicLength / 2, lPos[1], item]}
            lWidth={lWidth}
            lEaveHeight={lEaveHeight}
            lDeltaHeight={lDeltaHeight}
            lLength={lLength}
            increaseLength={0}
          />
        ))}
      {wall === "SideWallLeft" &&
        LeanToRigidFrameData.map((item, index) => (
          <LeanToRigidFrameExtrude
            key={index}
            pos={[lPos[0], lPos[1], item - 0.1]}
            lWidth={lWidth}
            lEaveHeight={lEaveHeight}
            lDeltaHeight={lDeltaHeight}
            increaseLength={roofonly ? 0.6 : 0.6}
          />
        ))}
      {wall === "SideWallRight" &&
        LeanToRigidFrameData.map((item, index) => (
          <LeanToRigidFrameExtrude
            key={index}
            pos={[lPos[0], lPos[1], item - 0.1]}
            lWidth={lWidth}
            lEaveHeight={lEaveHeight}
            lDeltaHeight={lDeltaHeight}
            increaseLength={roofonly ? 0.6 : 0.6}
          />
        ))}
    </group>
  );
};
