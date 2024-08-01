/* eslint-disable react/jsx-key */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDoorStore, useSliderStatus } from "store/useDoor";
import { useStoreSize, useStyle } from "store";
import { Dimension } from "3dcomponents/Models/Dimension";
import DraggableItem from "3dcomponents/Models/DraggableItem";

export const DoorGroup = () => {
  const { label } = useStyle();
  const { doorData } = useDoorStore();
  const { width, length, basicLength, eaveHeight } = useStoreSize();
  const { sliderStatus } = useSliderStatus();

  useEffect(() => {
    doorData.map((item) => {
      const removeKeyList = [];
      if (item.wall.startsWith("SideWall")) {
        if (
          item.pos[2] + item.size[0] / 2 > length / 2 ||
          item.pos[2] - item.size[0] / 2 < -length / 2
        ) {
          removeKeyList.push(item.key);
        }
      }
      if (item.wall.startsWith("EndWall")) {
        if (
          item.pos[0] + item.size[0] / 2 > width / 2 ||
          item.pos[0] - item.size[0] / 2 < -width / 2
        ) {
          removeKeyList.push(item.key);
        }
      }
      if (item.pos[1] + item.size[1] / 2 > eaveHeight) {
        removeKeyList.push(item.key);
      }
      // if (removeKeyList.length !== 0) removeDoorData(removeKeyList);
    });
  }, [width, length, basicLength, eaveHeight, doorData, sliderStatus]);

  return (
    <group visible={label === "Roof Only" ? false : true}>
      {doorData.map((item) => (
        <group key={item.key}>
          <Dimension
            pos={[item.pos[0], item.pos[1], item.pos[2]]}
            rot={item.rot}
            index={item.key}
            type={item.type}
            building={item.building}
            name={item.name}
            doorSize={item.size}
            side={item.wall}
            itemforRange={item.itemforRange}
            nameForRange={item.nameForRange}
          />
          <DraggableItem
            pos={[item.pos[0], item.pos[1], item.pos[2]]}
            rot={item.rot}
            index={item.key}
            type={item.type}
            building={item.building}
            name={item.name}
            doorSize={item.size}
            side={item.wall}
            itemforRange={item.itemforRange}
            nameForRange={item.nameForRange}
          />
        </group>
      ))}
    </group>
  );
};
