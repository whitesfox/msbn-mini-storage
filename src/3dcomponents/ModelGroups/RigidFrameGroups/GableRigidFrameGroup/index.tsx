/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unknown-property */
import { useEffect, useMemo } from "react";
import { useRigidFrameStore } from "store/useRigidFrame";
import { IRigidFrame } from "store/useRigidFrame";
import { useStoreSize, useUpgrade } from "store";
import { GableRigidFrameExtrude } from "3dcomponents/Models/RigidFrame/RigidFrameExtrudes/GableRigidFrameExtrude";

export const GableRigidFrameGroup = () => {
  const { basicLength, bayLength } = useStoreSize();
  const { addRigidFrameData, addInsetRigidFrameData } = useRigidFrameStore();

  const RigidFrameData = useMemo(() => {
    const gableRigidFrame = Array.from(
      { length: Math.floor(basicLength / 28) + 2 },
      () => 0,
    );
    const gableRigidFrameInterval =
      (basicLength - 0.9) / (gableRigidFrame.length - 1);

    const insetBayRigidFrame = Array.from(
      { length: Math.floor(bayLength / 28) + 1 },
      () => 0,
    );
    const insetBayRigidFrameInterval =
      (bayLength - 0.9) / insetBayRigidFrame.length;

    return {
      gableRigidFrame: gableRigidFrame,
      gableRigidFrameInterval: gableRigidFrameInterval,
      insetBayRigidFrame: insetBayRigidFrame,
      insetBayRigidFrameInterval: insetBayRigidFrameInterval,
    };
  }, [basicLength, bayLength]);

  useEffect(() => {
    //add position data of rigidframe
    const rigidFramePos: IRigidFrame[] = [];

    RigidFrameData.gableRigidFrame.map((_item, index) => {
      rigidFramePos.push({
        pos: [
          0,
          0,
          -basicLength / 2 +
            0.5 +
            index * RigidFrameData.gableRigidFrameInterval,
        ],
      });
    });
    addRigidFrameData(rigidFramePos);
  }, [
    basicLength,
    RigidFrameData.gableRigidFrame,
    RigidFrameData.gableRigidFrameInterval,
  ]);

  return (
    <group>
      {/* gable rigid frame */}
      {RigidFrameData.gableRigidFrame.map((_item, index) => (
        <GableRigidFrameExtrude
          key={index}
          pos={[
            0,
            0,
            -basicLength / 2 +
              0.5 +
              index * RigidFrameData.gableRigidFrameInterval,
          ]}
        />
      ))}
      {/* inset bay rigid frame */}
      <group
        position={[
          0,
          0,
          (basicLength + bayLength) / 2 +
            RigidFrameData.insetBayRigidFrameInterval,
        ]}
      >
        {RigidFrameData.insetBayRigidFrame.map((_item, index) => (
          <GableRigidFrameExtrude
            key={index}
            pos={[
              0,
              0,
              -bayLength / 2 +
                0.5 +
                index * RigidFrameData.insetBayRigidFrameInterval,
            ]}
          />
        ))}
      </group>
    </group>
  );
};
