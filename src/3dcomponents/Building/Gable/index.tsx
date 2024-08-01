/* eslint-disable react/no-unknown-property */
import { useStoreSize } from "store";
import { GableRoof } from "3dcomponents/Models/Roof/GableRoof";
import { GableEndWall } from "3dcomponents/Models/EndWall/GableEndWall";
import { GableSideWall } from "3dcomponents/Models/SideWall/GableSideWall";
import { DoorGroup } from "3dcomponents/ModelGroups/DoorGroup";
import { GableTrimGroup } from "3dcomponents/ModelGroups/TrimGroups/GableTrimGroup";
import { GableRigidFrameGroup } from "3dcomponents/ModelGroups/RigidFrameGroups/GableRigidFrameGroup";
import { GableDownspoutGroup } from "3dcomponents/ModelGroups/DownSpoutGroups/GableDownspoutGroup";

export const GableBuilding = () => {
  const { bayLength, width, eaveHeight, deltaHeight, basicLength } =
    useStoreSize();

  return (
    <group position={[0, 0, -bayLength / 2]}>
      <GableEndWall
        flag={true}
        width={width}
        eaveHeight={eaveHeight}
        deltaHeight={deltaHeight}
        basicLength={basicLength}
      />
      <GableEndWall
        flag={false}
        width={width}
        eaveHeight={eaveHeight}
        deltaHeight={deltaHeight}
        basicLength={basicLength}
      />
      <GableSideWall
        flag={true}
        material={""}
        width={width}
        eaveHeight={eaveHeight}
        basicLength={basicLength}
      />
      <GableSideWall
        flag={false}
        material={""}
        width={width}
        eaveHeight={eaveHeight}
        basicLength={basicLength}
      />
      <GableRoof flag={true} />
      <GableRoof flag={false} />
      <DoorGroup />
      <GableTrimGroup />
      <GableRigidFrameGroup />
      <GableDownspoutGroup />
    </group>
  );
};
