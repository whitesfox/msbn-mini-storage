/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unknown-property */
import * as THREE from "three";
import ExtrudeSettings from "assets/extrudeSetting.json";
import { Addition, Geometry, Subtraction } from "@react-three/csg";
import { PatternBumpMaterial } from "3dcomponents/MetalMaterial/PatternMaterial";
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

interface IEndWall {
  name: string;
  wall: string;
  flag: boolean;
  lWidth: number;
  lLength: number;
  sideWallColor: string;
  wainscotColor: string;
  modelShape: THREE.Shape;
  wainscotModel: THREE.Shape;
  objData: Array<IDoor>;
  pos: [number, number, number];
  rot: [number, number, number];
}

export const EndWallModel = ({
  name,
  wall,
  flag,
  sideWallColor,
  wainscotColor,
  modelShape,
  wainscotModel,
  objData,
  pos,
  rot,
}: IEndWall) => {
  const { basicLength, width } = useStoreSize();

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
          {objData.map((item, index) =>
            wall === "EndWallFront" ? (
              <Subtraction
                key={index}
                position={[-item.pos[2] + basicLength / 2, item.pos[1], 0]}
                rotation={[0, 0, 0]}
              >
                <boxGeometry args={item.size} />
              </Subtraction>
            ) : null,
          )}
          {objData.map((item, index) =>
            wall === "EndWallBack" ? (
              <Subtraction
                key={index}
                position={[item.pos[2] + basicLength / 2, item.pos[1], 0]}
                rotation={[0, 0, 0]}
              >
                <boxGeometry args={[item.size[0], item.size[1], 0.2]} />
              </Subtraction>
            ) : null,
          )}
          {objData.map((item, index) =>
            wall === "SideWallLeft" ? (
              <Subtraction
                key={index}
                position={[item.pos[0] + width / 2, item.pos[1], 0]}
                rotation={[0, 0, 0]}
              >
                <boxGeometry args={[item.size[0], item.size[1], 0.2]} />
              </Subtraction>
            ) : null,
          )}
          {objData.map((item, index) =>
            wall === "SideWallRight" ? (
              flag ? (
                <Subtraction
                  key={index}
                  position={[-item.pos[0] + width / 2, item.pos[1], 0]}
                  rotation={[0, 0, 0]}
                >
                  <boxGeometry args={[item.size[0], item.size[1], 0.2]} />
                </Subtraction>
              ) : (
                <Subtraction
                  key={index}
                  position={[-item.pos[0] + width / 2 - 0.1, item.pos[1], 0]}
                  rotation={[0, 0, 0]}
                >
                  <boxGeometry args={[item.size[0], item.size[1], 0.2]} />
                </Subtraction>
              )
            ) : null,
          )}
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
          {objData.map((item, index) =>
            wall === "EndWallFront" ? (
              <Subtraction
                key={index}
                position={[-item.pos[2] + basicLength / 2, item.pos[1], 0]}
                rotation={[0, 0, 0]}
              >
                <boxGeometry args={item.size} />
              </Subtraction>
            ) : null,
          )}
          {objData.map((item, index) =>
            wall === "EndWallBack" ? (
              <Subtraction
                key={index}
                position={[item.pos[2] + basicLength / 2, item.pos[1], 0]}
                rotation={[0, 0, 0]}
              >
                <boxGeometry args={[item.size[0], item.size[1], 0.2]} />
              </Subtraction>
            ) : null,
          )}
          {objData.map((item, index) =>
            wall === "SideWallLeft" ? (
              <Subtraction
                key={index}
                position={[item.pos[0] + width / 2, item.pos[1], 0]}
                rotation={[0, 0, 0]}
              >
                <boxGeometry args={[item.size[0], item.size[1], 0.2]} />
              </Subtraction>
            ) : null,
          )}
          {objData.map((item, index) =>
            wall === "SideWallRight" ? (
              flag ? (
                <Subtraction
                  key={index}
                  position={[-item.pos[0] + width / 2, item.pos[1], 0]}
                  rotation={[0, 0, 0]}
                >
                  <boxGeometry args={[item.size[0], item.size[1], 0.2]} />
                </Subtraction>
              ) : (
                <Subtraction
                  key={index}
                  position={[-item.pos[0] + width / 2 - 0.1, item.pos[1], 0]}
                  rotation={[0, 0, 0]}
                >
                  <boxGeometry args={[item.size[0], item.size[1], 0.2]} />
                </Subtraction>
              )
            ) : null,
          )}
        </Geometry>
        <PatternBumpMaterial
          color={wainscotColor}
          rotation={-Math.PI / 2}
        />
      </mesh>
    </mesh>
  );
};
