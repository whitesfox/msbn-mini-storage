/* eslint-disable react/no-unknown-property */
import { DoubleSide } from "three";
interface IBasePlate {
  pos: [number, number, number];
}

export const BasePlate = ({ pos }: IBasePlate) => {
  return (
    <mesh position={pos}>
      <boxGeometry args={[1, 0.05, 1]} />
      <meshPhysicalMaterial
        side={DoubleSide}
        metalness={1}
        roughness={0.6}
        color={"#C0072C"}
      />
    </mesh>
  );
};
