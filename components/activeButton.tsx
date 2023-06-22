import Image, { StaticImageData } from "next/image";
import { content } from "./Dialog";

interface Props {
  icon?: StaticImageData | string;
  text?: string;
  isSmall?: boolean;
  isInactive?: boolean;
  contentType?: string;
  onClick?: () => void;
}

const ActiveButton = (props: Props) => {
  let icon = props.icon;
  let text = props.text;

  const handleClick = () => {
    if (props.onClick) {
      props.onClick();
    } else {
      () => null;
    }
  };

  if (props?.contentType) {
    // get icon and text from content
    const fromContent = content(props.contentType);
    icon = fromContent?.icon;
    text = fromContent?.title;
  }

  return (
    <button
      className={`btn my-[2px] hidden sm:block ${
        props.isInactive ? "" : "active"
      } ml-4`}
      onClick={handleClick}
    >
      <div className="flex flex-row pb-2">
        {icon && (
          <Image
            src={icon}
            width={props.isSmall ? 18 : 24}
            height={props.isSmall ? 10 : 24}
            alt=""
            className="mr-2 mt-[1px] "
            style={{
              objectFit: "contain",
            }}
          />
        )}
        <div className={`${icon ? "mt-[2px]" : "mt-[1px]"} text-lg`}>
          {text}
        </div>
      </div>
    </button>
  );
};

export default ActiveButton;
