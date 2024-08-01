/* eslint-disable react/no-unknown-property */
import { useMemo } from "react";
import { useStoreSize } from "store";
import { BasePlate } from "../../BasePlate";
import { ApexHaunch } from "../../ApexHaunch";
import { FramingModel } from "../../FramingModel";
import { TorsionalRestraint } from "../../TorsionalRestraint";

interface IGableRigidFrameExtrude {
  pos: [number, number, number];
}

export const GableRigidFrameExtrude = ({ pos }: IGableRigidFrameExtrude) => {
  const { width, eaveHeight, deltaHeight } = useStoreSize();

  const roofSlopeAngle = useMemo(() => {
    return Math.atan((2 * deltaHeight) / width);
  }, [width, deltaHeight]);

  return (
    <group position={[pos[0], pos[1], pos[2]]}>
      <group>
        {/* right */}
        <FramingModel
          pos={[width / 2 - 1.5, 0, 0]}
          rot={[Math.PI / 2, 0, Math.PI / 2]}
          rafter={false}
          rigidDepth={eaveHeight - 0.5}
          outSideDepth={0}
          outSideDeviation={0}
          roofSlopeAngle={roofSlopeAngle}
          increaseLength={0}
        />
        {/* left */}
        <FramingModel
          pos={[-width / 2 + 1.5, 0, 0]}
          rot={[Math.PI / 2, 0, -Math.PI / 2]}
          rafter={false}
          rigidDepth={eaveHeight - 0.5}
          outSideDepth={0}
          outSideDeviation={0}
          roofSlopeAngle={roofSlopeAngle}
          increaseLength={0}
        />
        {/* top left */}
        <FramingModel
          pos={[0, eaveHeight + deltaHeight - 0.5, 0]}
          rot={[Math.PI / 2, Math.PI / 2 + roofSlopeAngle, -Math.PI / 2]}
          rafter={true}
          rigidDepth={
            (width / 2 - 0.5) / Math.cos(roofSlopeAngle) -
            Math.tan(roofSlopeAngle)
          }
          outSideDepth={Math.cos(roofSlopeAngle)}
          outSideDeviation={Math.tan(roofSlopeAngle)}
          roofSlopeAngle={roofSlopeAngle}
          increaseLength={0}
        />
        {/* top right */}
        <FramingModel
          pos={[0, eaveHeight + deltaHeight - 0.5, 0]}
          rot={[
            Math.PI / 2 + Math.PI,
            -Math.PI / 2 + roofSlopeAngle,
            -Math.PI / 2,
          ]}
          rafter={true}
          rigidDepth={
            (width / 2 - 0.5) / Math.cos(roofSlopeAngle) -
            Math.tan(roofSlopeAngle)
          }
          outSideDepth={Math.cos(roofSlopeAngle)}
          outSideDeviation={Math.tan(roofSlopeAngle)}
          roofSlopeAngle={roofSlopeAngle}
          increaseLength={0}
        />
      </group>
      <group>
        {/* left */}
        <ApexHaunch
          pos={[
            -width / 2 + 1.5,
            eaveHeight + 1.2 * Math.tan(roofSlopeAngle) - 1,
            0,
          ]}
        />
        {/* right */}
        <ApexHaunch
          pos={[
            width / 2 - 1.5,
            eaveHeight + 1.2 * Math.tan(roofSlopeAngle) - 1,
            0,
          ]}
        />
        {/* top */}
        <ApexHaunch pos={[0, eaveHeight + deltaHeight - 1, 0]} />
      </group>
      <group>
        {/* left */}
        <TorsionalRestraint
          pos={[-width / 2 + 1, eaveHeight + Math.tan(roofSlopeAngle) - 1.4, 0]}
        />
        {/* right */}
        <TorsionalRestraint
          pos={[width / 2 - 1, eaveHeight + Math.tan(roofSlopeAngle) - 1.4, 0]}
        />
      </group>
      <group>
        {/* left */}
        <BasePlate pos={[-width / 2 + 1, 0.025, 0]} />
        {/* right */}
        <BasePlate pos={[width / 2 - 1, 0.025, 0]} />
      </group>
    </group>
  );
};
