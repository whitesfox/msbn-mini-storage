/* eslint-disable react/no-unknown-property */
import ExtrudeSettings from "assets/extrudeSetting.json";
import * as THREE from "three";
import { useRef } from "react";
import { easing } from "maath";
import { useFrame } from "@react-three/fiber";
import { Addition, Geometry } from "@react-three/csg";
import { SliceDoor } from "3dcomponents/Models/SliceDoor";

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

interface ISideWall {
  flag: boolean;
  name: string;
  eaveHeight: number;
  basicLength: number;
  sideWallColor: string;
  wainscotColor: string;
  modelShape: THREE.Shape;
  objData: Array<IDoor>;
  pos: [number, number, number];
  rot: [number, number, number];
}

export const SideWall = ({
  flag,
  name,
  eaveHeight,
  basicLength,
  sideWallColor,
  wainscotColor,
  modelShape,
  objData,
  pos,
  rot,
}: ISideWall) => {
  const mainMaterialRef = useRef<any>();

  useFrame((_state, delta) => {
    easing.dampC(mainMaterialRef.current.color, sideWallColor, 0.2, delta);
  });

  return (
    <mesh
      name={name}
      position={pos}
      rotation={rot}
      castShadow
      receiveShadow
    >
      <mesh>
        <Geometry>
          <Addition>
            <extrudeGeometry
              args={[
                modelShape,
                {
                  ...ExtrudeSettings,
                  depth: eaveHeight,
                },
              ]}
            />
          </Addition>
          {objData.map((item, index) => (
            <SliceDoor
              pos={
                flag
                  ? [item.pos[2] + basicLength / 2, 0, item.pos[1]]
                  : [-item.pos[2] + basicLength / 2, 0, item.pos[1]]
              }
              rot={[Math.PI / 2, 0, 0]}
              index={item.key}
              size={[item.size[0], item.size[1], item.size[2] + 0.1]}
              key={index}
            />
          ))}
        </Geometry>

        <meshPhysicalMaterial
          side={THREE.FrontSide}
          metalness={0.7}
          roughness={0.5}
          ref={mainMaterialRef}
        />
      </mesh>
    </mesh>
  );
};
