/* eslint-disable react/no-unknown-property */
import { useStoreSize } from "store";
import { SingleSlopeRoof } from "3dcomponents/Models/Roof/SingleSlopeRoof";
import { SingleSlopeEndWall } from "3dcomponents/Models/EndWall/SingleSlopeEndWall";
import { SingleSlopeSideWall } from "3dcomponents/Models/SideWall/SingleSlopeSideWall";
import { DoorGroup } from "3dcomponents/ModelGroups/DoorGroup";
import { SingleSlopeTrimGroup } from "3dcomponents/ModelGroups/TrimGroups/SingleSlopeTrimGroup";
import { SingleSlopeDownspoutGroup } from "3dcomponents/ModelGroups/DownSpoutGroups/SingleSlopeDownspoutGroup";

export const SingleSlope = () => {
  const { width, length, eaveHeight, deltaHeight, basicLength, bayLength } =
    useStoreSize();

  return (
    <group position={[0, 0, -bayLength / 2]}>
      <SingleSlopeSideWall
        flag={false}
        material={""}
        width={width}
        eaveHeight={eaveHeight}
        basicLength={basicLength}
      />
      <SingleSlopeSideWall
        flag={true}
        material={""}
        width={width}
        eaveHeight={eaveHeight + deltaHeight}
        basicLength={basicLength}
      />
      <SingleSlopeEndWall
        flag={false}
        width={width}
        eaveHeight={eaveHeight}
        deltaHeight={deltaHeight}
        basicLength={basicLength}
      />
      <SingleSlopeEndWall
        flag={true}
        width={width}
        eaveHeight={eaveHeight}
        deltaHeight={deltaHeight}
        basicLength={basicLength}
      />
      <SingleSlopeRoof
        flag={false}
        position={[width / 2, 0, 0]}
        lWidth={width}
        lLength={length}
        lEaveHeight={eaveHeight}
        lDeltaHeight={deltaHeight}
      />
      <group position={[width / 2, 0, 0]}>
        <SingleSlopeTrimGroup
          type={""}
          lWidth={width * 2}
          lLength={basicLength}
          lEaveHeight={eaveHeight}
          lDeltaHeight={deltaHeight}
        />
      </group>
      <DoorGroup />
      <SingleSlopeDownspoutGroup />
    </group>
  );
};
