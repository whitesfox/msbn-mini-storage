/* eslint-disable react/no-unknown-property */
import { DoubleSide } from "three";
interface IApexHaunch {
  pos: [number, number, number];
}

export const ApexHaunch = ({ pos }: IApexHaunch) => {
  return (
    <mesh position={[pos[0], pos[1], pos[2]]}>
      <boxGeometry args={[0.1, 2, 0.425]} />
      <meshPhysicalMaterial
        side={DoubleSide}
        metalness={1}
        roughness={0.6}
        color={"#C0072C"}
      />
    </mesh>
  );
};
