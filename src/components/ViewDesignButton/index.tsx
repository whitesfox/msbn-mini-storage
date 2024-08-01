import { useViewDesign } from "store";

const ViewDesignButton = () => {
  const { isOpen, setIsOpen } = useViewDesign();

  const onClickHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        onClick={() => onClickHandler()}
        className="my-[15px] cursor-pointer rounded-full bg-[#196432] px-[18px] pb-[13px] pt-[11px] text-center text-[16.8px] text-white md:text-[19px]"
      >
        Click here
      </div>
    </>
  );
};

export default ViewDesignButton;
