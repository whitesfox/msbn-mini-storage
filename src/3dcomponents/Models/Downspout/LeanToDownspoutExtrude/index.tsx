/* eslint-disable react/no-unknown-property */
import extrudeSetting from "assets/extrudeSetting.json";
import { easing } from "maath";
import { DoubleSide, Shape } from "three";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { useStoreColor, useStoreSize, useUpgrade } from "store";

interface ILeanToDownspoutExtude {
  type: string;
  pos: [number, number, number];
  flag: boolean;
  width: number;
  eaveHeight: number;
  deltaHeight: number;
}

export const LeanToDownspoutExtrude = ({
  type,
  pos,
  flag,
  width,
  eaveHeight,
  deltaHeight,
}: ILeanToDownspoutExtude) => {
  const downspoutRef = useRef<any>();
  const { overhangEave } = useStoreSize();
  const { downspoutsColor } = useStoreColor();
  const { downspout } = useUpgrade();

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

  //Change the downspout color
  useFrame((_state, delta) =>
    easing.dampC(downspoutRef.current.color, downspoutsColor, 0.2, delta),
  );

  return (
    <mesh
      visible={downspout}
      position={pos}
      rotation={
        flag ? [Math.PI / 2, Math.PI / 2, 0] : [-Math.PI / 2, -Math.PI / 2, 0]
      }
    >
      {/* main spout */}
      <mesh
        position={[0, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <extrudeGeometry
          args={[
            downspoutModel,
            { ...extrudeSetting, depth: downspoutMainHeight - 1 },
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
              depth:
                type === "Open"
                  ? -overhangEave - 0.4 + 0.5 * Math.sin(roofSlopeAngle)
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
          type === "Open"
            ? [
                downspoutMainHeight - 1.337,
                0,
                -overhangEave - 0.4 + 0.5 * Math.sin(roofSlopeAngle),
              ]
            : [downspoutMainHeight - 1.337, 0, -overhangEave + 0.2]
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
  );
};
