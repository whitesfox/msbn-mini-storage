/* eslint-disable react/no-unknown-property */
import { useRef } from "react";
import { Configurator } from "./Configurator";
import { Environment } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { ViewControl } from "3dcomponents/ViewControl";
import { usePriceCalculation, usePaymentCalculation } from "store/usePrice";
import { VscSettings } from "react-icons/vsc";
import { calculateDownPaymentYears } from "utils/DownPaymentCalculator";
import { formatPrice } from "utils/PriceFormat";
import { ViewDesign } from "components/ViewDesign";

export const Scene = () => {
  const { totalPrice } = usePriceCalculation();
  const { setPaymentCalculationStatus } = usePaymentCalculation();
  const Lights = () => {
    const light = useRef<any>();

    useFrame(({ camera }) => {
      light.current.position.copy(camera.position);
    });

    return (
      <pointLight
        position={[20, 10, -10]}
        intensity={1}
        decay={0}
        ref={light}
      />
    );
  };

  return (
    <div className="relative flex h-[34vh] w-full select-none text-[#4A4A4F] md:h-screen">
      <Canvas
        className="h-full w-full bg-gray-100"
        camera={{ position: [100, 100, 100], fov: 30, near: 0.2 }}
      >
        <ambientLight intensity={1.7} />
        <Environment files={"./potsdamer_platz_1k.hdr"} />
        <Configurator />
        <Lights />
        <ViewControl />
      </Canvas>
      <ViewDesign />
      <div className="absolute bottom-[85%] flex w-full justify-center xs:text-[14px] md:bottom-16 md:text-xl">
        <p className="flex h-fit items-center justify-center rounded-full px-8 py-1 md:bg-white">
          <span>
            ${formatPrice(totalPrice)} or $
            {formatPrice(
              calculateDownPaymentYears(
                Number(`${(totalPrice / 100) * 4}`),
                Number(totalPrice),
                7,
                10,
              ),
            )}
            /mo
          </span>
          <span
            className="ml-2 cursor-pointer text-2xl text-customGreen"
            onClick={() => setPaymentCalculationStatus(true)}
          >
            <VscSettings />
          </span>
        </p>
      </div>
      <div className="absolute bottom-5 flex w-full justify-center text-[12px] xs:text-[14px] md:text-[14px]">
        <p>Price Includes Installation estimate</p>
      </div>
    </div>
  );
};
