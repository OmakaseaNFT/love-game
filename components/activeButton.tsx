import Image from "next/image";

interface Props {
  icon?: any;
  text: string;
  isSmall?: boolean;
  isInactive?: boolean;
  onClick?: () => void;
}

const ActiveButton = (props: Props) => {
  const handleClick = () => {
    if (props.onClick) {
      props.onClick();
    }
  };

  return (
    <button
      className={`btn my-[2px] hidden sm:block ${props.isInactive ? "" : "active"} ml-4`}
      onClick={handleClick}
      style={{ maxWidth: '200px' }} /* Ensure button does not overflow */
    >
      <div className="flex flex-row pb-2">
        {props.icon && (
          <Image
            src={props.icon}
            width={props.isSmall ? 18 : 24}
            height={props.isSmall ? 10 : 24}
            alt=""
            className="mr-2 mt-[1px]"
            style={{ objectFit: "contain" }}
          />
        )}
        <div className={`${props.icon ? 'mt-[2px]' : 'mt-[1px]'} text-lg`}>
          {props.text}
        </div>
      </div>
    </button>
  );
};

export default ActiveButton;
