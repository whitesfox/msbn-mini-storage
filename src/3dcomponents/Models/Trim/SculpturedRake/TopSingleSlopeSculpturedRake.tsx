/* eslint-disable react/no-unknown-property */
/* eslint-disable react-hooks/exhaustive-deps */
import { Shape } from "three";
import * as THREE from "three";
import { useStoreColor, useStoreSize } from "store";
import { useEffect, useMemo, useRef, useState } from "react";
import { Addition, Geometry, Subtraction } from "@react-three/csg";

interface ITopSingleSlopeSculpturedRake {
  pos: [number, number, number];
  rot: [number, number, number];
  vec: [number, number, number];
  trimLength: number;
  posZ: number;
  deltaOverHangEave?: number;
}

const radius = 0.03;
const thickness = 0.01;
const srA = [
  (1 + 1 / 4) / 12,
  (1 + 3 / 4) / 12,
  5 / 12,
  4 / 12,
  2 / 12,
  (1 + 3 / 4) / 12,
  1 / 12,
];
const angle = Math.PI / 3;

const pointX1 = 0;
const pointY1 = 0;
const pointX2 = -srA[0];
const pointY2 = 0;
const pointX3 = -srA[0] - Math.cos(angle) * srA[1];
const pointY3 = Math.sin(angle) * srA[1];
const pointX4 = pointX3 - srA[2];
const pointY4 = pointY3;
const pointX5 = pointX4 - Math.cos(angle) * srA[3];
const pointY5 = pointY4 - Math.sin(angle) * srA[3];
const pointX6 = pointX5 + Math.cos(angle) * srA[3];
const pointY6 = pointY5 - Math.sin(angle) * srA[3];
const pointX7 = pointX6 + srA[4];
const pointY7 = pointY6;
const pointX8 = pointX7;
const pointY8 = pointY7 - srA[5] + thickness;
const pointX9 = pointX8 + 2 * thickness + radius;
const pointY9 = pointY8;
const pointX10 = pointX9;
const pointY10 = pointY9 + srA[6];
const pointX11 = pointX10 - thickness;
const pointY11 = pointY10;
const pointX12 = pointX11;
const pointY12 = pointY11 - srA[6];
const pointX13 = pointX12 - radius;
const pointY13 = pointY12;
const pointX14 = pointX13;
const pointY14 = pointY13 + srA[5];
const pointX15 = pointX14 - srA[4];
const pointY15 = pointY14;
const pointX16 = pointX5 + thickness / Math.sin(Math.PI / 2 - angle);
const pointY16 = pointY5;
const pointX17 = pointX4 + Math.tan(angle) * thickness;
const pointY17 = pointY4 - thickness;
const pointX18 = pointX3 - thickness / Math.tan(angle);
const pointY18 = pointY17;
const pointX19 = pointX2 - thickness / Math.tan(angle);
const pointY19 = -thickness;
const pointX20 = 0;
const pointY20 = -thickness;
const quaternion = new THREE.Quaternion();

export const TopSingleSlopeSculpturedRake = ({
  pos,
  rot,
  vec,
  trimLength,
  posZ,
  deltaOverHangEave = 0,
}: ITopSingleSlopeSculpturedRake) => {
  const hegith = 0.5;

  const boxRef = useRef<any>();
  const trimRef = useRef<any>();
  const groupRef = useRef<any>();
  const { roofTrimColor } = useStoreColor();
  const [newVec, setNewVec] = useState(new THREE.Vector3());
  const {
    width,
    length,
    eaveHeight,
    deltaHeight,
    overhangEave,
    pitchOptionSize,
  } = useStoreSize();

  const extrudeSetting = useMemo(() => {
    const setting = {
      depth: trimLength + 0.5,
      steps: 1,
      bevelEnabled: false,
      bevelThickness: 0,
      bevelSize: 0,
      bevelOffset: 0,
      bevelSegments: 1,
    };

    return setting;
  }, [trimLength]);

  const SliceBox = useMemo(() => {
    const modelShape = new Shape();
    modelShape.moveTo(0, 0);
    modelShape.lineTo(Math.cos(Math.PI / 3) / 2, Math.sin(Math.PI / 3) / 2);
    modelShape.lineTo(-2, Math.sin(Math.PI / 3) / 2);
    modelShape.lineTo(-2, -Math.sin(Math.PI / 3) / 2);
    modelShape.lineTo(Math.cos(Math.PI / 3) / 2, -Math.sin(Math.PI / 3) / 2);

    return modelShape;
  }, []);

  const SculpturedRakeModel = useMemo(() => {
    const modelShape = new Shape();

    modelShape.moveTo(pointX1, pointY1);
    modelShape.lineTo(pointX2, pointY2);
    modelShape.lineTo(pointX3, pointY3);
    modelShape.lineTo(pointX4, pointY4);
    modelShape.lineTo(pointX5, pointY5);
    modelShape.lineTo(pointX6, pointY6);
    modelShape.lineTo(pointX7, pointY7);
    modelShape.lineTo(pointX8, pointY8);
    modelShape.bezierCurveTo(
      pointX8,
      pointY8 - 2 * thickness - radius,
      pointX8 + 2 * thickness + radius,
      pointY8 - 2 * thickness - radius,
      pointX9,
      pointY9,
    );
    modelShape.lineTo(pointX10, pointY10);
    modelShape.lineTo(pointX11, pointY11);
    modelShape.lineTo(pointX12, pointY12);
    modelShape.bezierCurveTo(
      pointX12,
      pointY12 - radius,
      pointX12 - radius,
      pointY12 - radius,
      pointX13,
      pointY13,
    );
    modelShape.lineTo(pointX14, pointY14);
    modelShape.lineTo(pointX15, pointY15);
    modelShape.lineTo(pointX16, pointY16);
    modelShape.lineTo(pointX17, pointY17);
    modelShape.lineTo(pointX18, pointY18);
    modelShape.lineTo(pointX19, pointY19);
    modelShape.lineTo(pointX20, pointY20);
    modelShape.closePath();

    return modelShape;
  }, []);

  useEffect(() => {
    if (groupRef.current) {
      setNewVec(new THREE.Vector3(vec[0], vec[1], vec[2]));
      groupRef.current.getWorldQuaternion(quaternion);
      groupRef.current.worldToLocal(newVec);

      boxRef.current.position.set(newVec.x, newVec.y, newVec.z);
      boxRef.current.quaternion.set(
        quaternion.x,
        -quaternion.y,
        -quaternion.z,
        -quaternion.w,
      );

      const vector = new THREE.Vector3();
      boxRef.current.localToWorld(vector);
    }
  }, [groupRef.current, width, deltaHeight, eaveHeight, length, overhangEave]);

  const deltaSliceBoxPos = [
    0.03, 0.025, 0.02, 0.018, 0.011, 0.007, 0.005, 0.003,
  ];
  return (
    <group
      position={pos}
      rotation={rot}
    >
      <mesh
        castShadow
        receiveShadow
        position={[
          0.6 - overhangEave,
          -0.21,
          hegith + posZ + deltaOverHangEave,
        ]}
      >
        <Geometry>
          <Addition>
            <extrudeGeometry args={[SculpturedRakeModel, extrudeSetting]} />
          </Addition>
          <Subtraction
            position={[
              0.5,
              -0.164,
              1.04 + deltaSliceBoxPos[parseInt(pitchOptionSize.charAt(0)) - 1],
            ]}
            rotation={[0, -Math.PI / 2, 0]}
          >
            <extrudeGeometry
              args={[
                SliceBox,
                {
                  depth: 2,
                  steps: 1,
                  bevelEnabled: false,
                  bevelThickness: 0,
                  bevelSize: 0,
                  bevelOffset: 0,
                  bevelSegments: 1,
                },
              ]}
            />
          </Subtraction>
          <Subtraction
            position={[
              0.5,
              -0.164,
              trimLength -
                0.06 +
                deltaSliceBoxPos[parseInt(pitchOptionSize.charAt(0)) - 1],
            ]}
            rotation={[0, -Math.PI / 2, Math.PI]}
          >
            <extrudeGeometry
              args={[
                SliceBox,
                {
                  depth: 2,
                  steps: 1,
                  bevelEnabled: false,
                  bevelThickness: 0,
                  bevelSize: 0,
                  bevelOffset: 0,
                  bevelSegments: 1,
                },
              ]}
            />
          </Subtraction>
          <Subtraction position={[0, -0.9, 0.5]}>
            <boxGeometry args={[1, 1, 2.5]} />
          </Subtraction>
          <Subtraction
            position={[0, -0.9, trimLength + 0.6]}
            rotation={[0, 0, Math.PI]}
          >
            <boxGeometry args={[1, 1, 2.5]} />
          </Subtraction>
        </Geometry>
        <meshStandardMaterial
          metalness={0.7}
          roughness={0.5}
          color={roofTrimColor}
          ref={trimRef}
        />
      </mesh>
    </group>
  );
};
