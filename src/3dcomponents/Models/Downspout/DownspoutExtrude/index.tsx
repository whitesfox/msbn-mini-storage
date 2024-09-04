/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unknown-property */
import { easing } from "maath";
import { DoubleSide, Shape } from "three";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import extrudeSetting from "assets/extrudeSetting.json";
import { useStoreColor, useStoreSize, useUpgrade } from "store";

interface IDownspout {
  pos: [number, number, number];
  flag: boolean;
  width: number;
  eaveHeight: number;
  deltaHeight: number;
  endOfInsetBay: boolean;
}

export const DownspoutExtrude = ({
  pos,
  flag,
  width,
  eaveHeight,
  deltaHeight,
  endOfInsetBay,
}: IDownspout) => {
  const downspoutRef = useRef<any>();
  const { downspout } = useUpgrade();
  const downspoutVisible = useRef(true);
  const { overhangEave } = useStoreSize();
  const { downspoutsColor } = useStoreColor();

  const roofSlopeAngle = Math.atan((2 * deltaHeight) / width);

  const downspoutMainHeight =
    eaveHeight - (overhangEave / (width / 2)) * deltaHeight;

  const downspoutModel = useMemo(() => {
    const model = new Shape();

    model.moveTo(-1 / 6, -1 / 6);
    model.lineTo(1 / 6, -1 / 6);
    model.lineTo(1 / 6, 1 / 6);
    model.lineTo(-1 / 6, 1 / 6);
    model.closePath();

    return model;
  }, []);

  const downspoutHeight = useMemo(() => {
    let downspoutH = 0;

    downspoutH = eaveHeight - (overhangEave / (width / 2)) * deltaHeight;
    downspoutVisible.current = true;

    return downspoutH;
  }, [deltaHeight, eaveHeight, overhangEave, width]);

  //Change the downspout color
  useFrame((_state, delta) =>
    easing.dampC(downspoutRef.current.color, downspoutsColor, 0.2, delta),
  );

  return (
    <group visible={downspout}>
      <group visible={downspoutVisible.current}>
        <mesh
          position={pos}
          rotation={
            flag
              ? [Math.PI / 2, Math.PI / 2, 0]
              : [-Math.PI / 2, -Math.PI / 2, 0]
          }
        >
          {/* main spout */}
          <mesh
            position={[downspoutMainHeight - downspoutHeight, 0, -0.1]}
            rotation={[0, Math.PI / 2, 0]}
          >
            <extrudeGeometry
              args={[
                downspoutModel,
                { ...extrudeSetting, depth: downspoutHeight - 1 },
              ]}
            />
            <meshStandardMaterial
              metalness={0.7}
              roughness={0.5}
              ref={downspoutRef}
              color={downspoutsColor}
              side={DoubleSide}
            />
          </mesh>
          {/* middle spout */}
          <mesh position={[downspoutMainHeight - 1.17, 0, 0]}>
            <extrudeGeometry
              args={[
                downspoutModel,
                {
                  ...extrudeSetting,
                  depth: endOfInsetBay
                    ? -overhangEave - 0.5
                    : -overhangEave + 0.2,
                },
              ]}
            />
            <meshStandardMaterial
              metalness={0.7}
              roughness={0.5}
              ref={downspoutRef}
              color={downspoutsColor}
              side={DoubleSide}
            />
          </mesh>
          {/* top spout */}
          <mesh
            position={
              endOfInsetBay
                ? [downspoutMainHeight - 1.337, 0, -overhangEave - 0.4]
                : [downspoutMainHeight - 1.337, 0, -overhangEave + 0.1]
            }
            rotation={[0, Math.PI / 2, 0]}
          >
            <extrudeGeometry
              args={[
                downspoutModel,
                { ...extrudeSetting, depth: 0.7 * Math.cos(roofSlopeAngle) },
              ]}
            />
            <meshStandardMaterial
              metalness={0.7}
              roughness={0.5}
              ref={downspoutRef}
              color={downspoutsColor}
              side={DoubleSide}
            />
          </mesh>
        </mesh>
      </group>
    </group>
  );
};
