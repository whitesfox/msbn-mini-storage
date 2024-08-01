/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unknown-property */
import * as THREE from "three";
import ExtrudeSettings from "assets/extrudeSetting.json";
import { Addition, Geometry } from "@react-three/csg";
import { SliceDoor } from "3dcomponents/Models/SliceDoor";
import { PatternBumpMaterial } from "3dcomponents/MetalMaterial/PatternMaterial";

interface IDoor {
  key: number;
  name: string;
  type: string;
  wall: string;
  nameForRange: string;
  itemforRange: number;
  size: [number, number, number];
  pos: [number, number, number];
  rot: [number, number, number];
}

interface IEndWall {
  name: string;
  sideWallColor: string;
  wainscotColor: string;
  modelShape: THREE.Shape;
  wainscotModel: THREE.Shape;
  objData: Array<IDoor>;
  pos: [number, number, number];
  rot: [number, number, number];
}

export const EndWall = ({
  name,
  sideWallColor,
  wainscotColor,
  modelShape,
  wainscotModel,
  objData,
  pos,
  rot,
}: IEndWall) => {
  return (
    <mesh
      castShadow
      receiveShadow
      name={name}
      position={pos}
      rotation={rot}
    >
      <mesh>
        <Geometry>
          <Addition>
            <extrudeGeometry args={[modelShape, ExtrudeSettings]} />
          </Addition>
          {objData.map((item) => (
            <SliceDoor
              pos={[item.pos[0] + 0.05, item.pos[1], 0]}
              rot={item.rot}
              key={item.key}
              size={item.size}
              index={item.key}
            />
          ))}
        </Geometry>
        <PatternBumpMaterial
          color={sideWallColor}
          rotation={-Math.PI / 2}
        />
      </mesh>

      <mesh>
        <Geometry>
          <Addition>
            <extrudeGeometry args={[wainscotModel, ExtrudeSettings]} />
          </Addition>
          {objData.map((item) => (
            <SliceDoor
              pos={[item.pos[0], item.pos[1], 0]}
              rot={item.rot}
              key={item.key}
              size={item.size}
              index={item.key}
            />
          ))}
        </Geometry>
        <PatternBumpMaterial
          color={wainscotColor}
          rotation={-Math.PI / 2}
        />
      </mesh>
    </mesh>
  );
};
