/* eslint-disable react/no-unknown-property */
import { TorsionalRestraint } from "../../TorsionalRestraint";
import { BasePlate } from "../../BasePlate";
import { FramingModel } from "../../FramingModel";

interface IRigidFrameExtrude {
  pos: [number, number, number];
  lWidth: number;
  lLength: number;
  lEaveHeight: number;
  lDeltaHeight: number;
  increaseLength: number;
}

export const EndWallLeanToRigidFrameExtrude = ({
  pos,
  lWidth,
  lEaveHeight,
  lDeltaHeight,
  increaseLength,
}: IRigidFrameExtrude) => {
  const roofSlopeAngle = Math.atan((2 * lDeltaHeight) / lWidth);

  return (
    <group position={pos}>
      {/* frames */}
      <group>
        {/* left */}
        <FramingModel
          pos={[-lWidth / 2 + 1.5, 0, 0]}
          rot={[Math.PI / 2, 0, -Math.PI / 2]}
          rafter={false}
          rigidDepth={lEaveHeight - 0.5}
          outSideDepth={0}
          outSideDeviation={0}
          roofSlopeAngle={roofSlopeAngle}
          increaseLength={0}
        />
        {/* top */}
        <FramingModel
          pos={[0, lEaveHeight + lDeltaHeight - 0.5, 0]}
          rot={[Math.PI / 2, Math.PI / 2 + roofSlopeAngle, -Math.PI / 2]}
          rafter={true}
          rigidDepth={
            (lWidth / 2 - 0.5) / Math.cos(roofSlopeAngle) -
            Math.tan(roofSlopeAngle) +
            1
          }
          outSideDepth={Math.cos(roofSlopeAngle)}
          outSideDeviation={Math.tan(roofSlopeAngle)}
          roofSlopeAngle={roofSlopeAngle}
          increaseLength={0.6}
        />
      </group>
      <TorsionalRestraint
        pos={[-lWidth / 2 + 1, lEaveHeight + Math.tan(roofSlopeAngle) - 1.4, 0]}
      />
      <BasePlate pos={[-lWidth / 2 + 1, 0.025, 0]} />
    </group>
  );
};
