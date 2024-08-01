/* eslint-disable react/no-unknown-property */
import { DoubleSide } from "three";

interface ITorsionalRestraint {
  pos: [number, number, number];
}

export const TorsionalRestraint = ({ pos }: ITorsionalRestraint) => {
  return (
    <mesh position={pos}>
      <boxGeometry args={[0.9, 0.05, 0.425]} />
      <meshPhysicalMaterial
        side={DoubleSide}
        metalness={1}
        roughness={0.6}
        color={"#C0072C"}
      />
    </mesh>
  );
};
