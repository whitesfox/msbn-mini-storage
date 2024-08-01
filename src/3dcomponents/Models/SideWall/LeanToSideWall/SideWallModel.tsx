/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-key */
/* eslint-disable react/no-unknown-property */
import ExtrudeSettings from "assets/extrudeSetting.json";
import * as THREE from "three";
import { useRef } from "react";
import { easing } from "maath";
import { useFrame } from "@react-three/fiber";
import { Addition, Geometry, Subtraction } from "@react-three/csg";
import { useStoreSize } from "store";

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
  lLength: number;
  width: number;
  wainscotHeight: number;
  sideWallColor: string;
  wainscotColor: string;
  modelShape: THREE.Shape;
  objData: Array<IDoor>;
  pos: [number, number, number];
  rot: [number, number, number];
  lPos: [number, number, number];
}

export const SideWallModel = ({
  flag,
  name,
  eaveHeight,
  lLength,
  width,
  wainscotHeight,
  sideWallColor,
  wainscotColor,
  modelShape,
  objData,
  pos,
  rot,
  lPos,
}: ISideWall) => {
  const mainMaterialRef = useRef<any>();
  const wainScotMaterialRef = useRef<any>();
  const { basicLength, bayLength } = useStoreSize();

  useFrame((_state, delta) => {
    easing.dampC(mainMaterialRef.current.color, sideWallColor, 0.2, delta);
    easing.dampC(wainScotMaterialRef.current.color, wainscotColor, 0.2, delta);
  });

  return (
    <mesh
      name={name}
      position={pos}
      rotation={rot}
      castShadow
      receiveShadow
    >
      <mesh position={[0, 0, wainscotHeight]}>
        <Geometry>
          <Addition>
            <extrudeGeometry
              args={[
                modelShape,
                {
                  ...ExtrudeSettings,
                  depth: eaveHeight - wainscotHeight,
                },
              ]}
            />
          </Addition>

          {objData.map((item, index) =>
            item.wall === "EndWallGabelFront" ? (
              <Subtraction
                key={index}
                position={[
                  -item.pos[0] + lLength / 2 + lPos[0],
                  0,
                  item.pos[1] - wainscotHeight,
                ]}
                rotation={[Math.PI / 2, 0, 0]}
              >
                <boxGeometry
                  args={[item.size[0], item.size[1], item.size[2] + 0.4]}
                />
              </Subtraction>
            ) : null,
          )}
          {objData.map((item, index) =>
            item.wall === "EndWallGabelBack" ? (
              <Subtraction
                key={index}
                position={[
                  item.pos[0] + lLength / 2 - lPos[0],
                  0,
                  item.pos[1] - wainscotHeight,
                ]}
                rotation={[Math.PI / 2, 0, 0]}
              >
                <boxGeometry
                  args={[item.size[0], item.size[1], item.size[2] + 0.4]}
                />
              </Subtraction>
            ) : null,
          )}
          {objData.map((item, index) =>
            item.wall === "SideWallLeft" ? (
              <Subtraction
                key={index}
                position={[
                  -item.pos[2] + lPos[2] + lLength / 2 + bayLength / 2,
                  0,
                  item.pos[1] - wainscotHeight,
                ]}
                rotation={[Math.PI / 2, 0, 0]}
              >
                <boxGeometry
                  args={[item.size[0], item.size[1], item.size[2] + 0.4]}
                />
              </Subtraction>
            ) : null,
          )}
          {objData.map((item, index) =>
            item.wall === "SideWallRight" ? (
              <Subtraction
                key={index}
                position={[
                  item.pos[2] + lLength / 2 - lPos[2] - bayLength / 2,
                  0,
                  item.pos[1] - wainscotHeight,
                ]}
                rotation={[Math.PI / 2, 0, 0]}
              >
                <boxGeometry
                  args={[item.size[0], item.size[1], item.size[2] + 0.4]}
                />
              </Subtraction>
            ) : null,
          )}
        </Geometry>

        <meshPhysicalMaterial
          side={THREE.FrontSide}
          metalness={0.7}
          roughness={0.5}
          ref={mainMaterialRef}
        />
      </mesh>
      <mesh>
        <Geometry>
          <Addition>
            <extrudeGeometry
              args={[
                modelShape,
                {
                  ...ExtrudeSettings,
                  depth: wainscotHeight,
                },
              ]}
            />
          </Addition>
          {objData.map((item, index) =>
            item.wall === "EndWallGabelFront" ? (
              <Subtraction
                key={index}
                position={[-item.pos[0] + lLength / 2, 0, item.pos[1]]}
                rotation={[Math.PI / 2, 0, 0]}
              >
                <boxGeometry
                  args={[item.size[0], item.size[1], item.size[2] + 0.4]}
                />
              </Subtraction>
            ) : null,
          )}
          {objData.map((item, index) =>
            item.wall === "EndWallGabelBack" ? (
              <Subtraction
                key={index}
                position={[item.pos[0] + lLength / 2, 0, item.pos[1]]}
                rotation={[Math.PI / 2, 0, 0]}
              >
                <boxGeometry
                  args={[item.size[0], item.size[1], item.size[2] + 0.4]}
                />
              </Subtraction>
            ) : null,
          )}
          {objData.map((item, index) =>
            item.wall === "SideWallLeft" ? (
              <Subtraction
                key={index}
                position={[
                  -item.pos[2] + lPos[2] + lLength / 2 + bayLength / 2,
                  0,
                  item.pos[1] - wainscotHeight,
                ]}
                rotation={[Math.PI / 2, 0, 0]}
              >
                <boxGeometry
                  args={[item.size[0], item.size[1], item.size[2] + 0.4]}
                />
              </Subtraction>
            ) : null,
          )}
          {objData.map((item, index) =>
            item.wall === "SideWallRight" ? (
              <Subtraction
                key={index}
                position={[
                  item.pos[2] + lLength / 2 - lPos[2] - bayLength / 2,
                  0,
                  item.pos[1] - wainscotHeight,
                ]}
                rotation={[Math.PI / 2, 0, 0]}
              >
                <boxGeometry
                  args={[item.size[0], item.size[1], item.size[2] + 0.4]}
                />
              </Subtraction>
            ) : null,
          )}
        </Geometry>
        <meshPhysicalMaterial
          side={THREE.FrontSide}
          metalness={0.7}
          roughness={0.5}
          ref={wainScotMaterialRef}
        />
      </mesh>
    </mesh>
  );
};
