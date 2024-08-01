/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unknown-property */
import { Shape } from "three";
import { easing } from "maath";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useStoreColor, useStoreSize } from "store";
import { Addition, Geometry, Subtraction } from "@react-three/csg";

interface ISingleSlopeHangOnTrim {
  pos: [number, number, number];
  rot: [number, number, number];
  trimLength: number;
  lLength: number;
}

const trimThickness = 0.01;
const dim = 0.47;

export const SingleSlopeHangOnTrim = ({
  pos,
  rot,
  trimLength,
  lLength,
}: ISingleSlopeHangOnTrim) => {
  const trimRef = useRef<any>();
  const { overhangPurlin } = useStoreSize();
  const { roofTrimColor } = useStoreColor();

  const trimModel = useMemo(() => {
    const modelShape = new Shape();

    modelShape.moveTo(0, 0);
    modelShape.lineTo(-1 / 12, 0);
    modelShape.lineTo(
      -1 / 12 - Math.cos(Math.PI / 3) / 3,
      -Math.sin(Math.PI / 3) / 3,
    );
    modelShape.lineTo(-1 / 12, -(2 / 3) * Math.sin(Math.PI / 3));
    modelShape.lineTo(1 / 3 - 1 / 12, -(2 / 3) * Math.sin(Math.PI / 3));
    modelShape.lineTo(1 / 3 - 1 / 12, -(2 / 3) * Math.sin(Math.PI / 3) + dim);
    modelShape.lineTo(
      1 / 3 - 1 / 12 - 1 / 16,
      -(2 / 3) * Math.sin(Math.PI / 3) + dim,
    );
    modelShape.lineTo(
      1 / 3 - 1 / 12 - 1 / 16,
      -(2 / 3) * Math.sin(Math.PI / 3) + dim - trimThickness,
    );
    modelShape.lineTo(
      1 / 3 - 1 / 12 - trimThickness,
      -(2 / 3) * Math.sin(Math.PI / 3) + dim - trimThickness,
    );
    modelShape.lineTo(
      1 / 3 - 1 / 12 - trimThickness,
      -(2 / 3) * Math.sin(Math.PI / 3) + trimThickness,
    );
    modelShape.lineTo(
      -1 / 12,
      -(2 / 3) * Math.sin(Math.PI / 3) + trimThickness,
    );
    modelShape.lineTo(
      -1 / 12 -
        Math.cos(Math.PI / 3) / 3 +
        Math.sin(Math.PI / 3) * (trimThickness / Math.cos(Math.PI / 6)),
      -(2 / 3) * Math.sin(Math.PI / 3) + Math.sin(Math.PI / 3) / 3,
    );
    modelShape.lineTo(-1 / 12, -trimThickness);
    modelShape.lineTo(0, -trimThickness);
    modelShape.closePath();

    return modelShape;
  }, []);

  const SliceBox = useMemo(() => {
    const modelShape = new Shape();

    modelShape.moveTo(0, 0);
    modelShape.lineTo(Math.cos(Math.PI / 3) / 2, Math.sin(Math.PI / 3) / 2);
    modelShape.lineTo(-1, Math.sin(Math.PI / 3) / 2);
    modelShape.lineTo(-1, -Math.sin(Math.PI / 3) / 2);
    modelShape.lineTo(Math.cos(Math.PI / 3) / 2, -Math.sin(Math.PI / 3) / 2);

    return modelShape;
  }, []);

  const trimSetting = useMemo(() => {
    const setting = {
      depth: trimLength - 0.6,
      steps: 1,
      bevelEnabled: false,
      bevelThickness: 0,
      bevelSize: 0,
      bevelOffset: 0,
      bevelSegments: 1,
    };

    return setting;
  }, [trimLength]);

  useFrame((_state, delta) =>
    easing.dampC(trimRef.current.color, roofTrimColor, 0.2, delta),
  );

  return (
    <group
      rotation={[rot[0], rot[1], rot[2]]}
      position={[pos[0], pos[1], pos[2] - 0.2]}
    >
      <mesh
        castShadow
        receiveShadow
      >
        <Geometry>
          <Addition>
            <extrudeGeometry args={[trimModel, trimSetting]} />
          </Addition>
          <Subtraction
            position={[0.5, -0.29, 0.24]}
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
            position={[-0.8, -0.29, lLength + overhangPurlin + 1.16]}
            rotation={[0, Math.PI / 2, 0]}
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
        </Geometry>
        <meshStandardMaterial
          metalness={0.7}
          roughness={0.5}
          ref={trimRef}
        />
      </mesh>
    </group>
  );
};
