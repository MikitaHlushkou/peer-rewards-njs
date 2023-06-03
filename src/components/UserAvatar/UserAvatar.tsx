import styles from "./UserAvatar.module.css";
import classNames from "classnames";

interface IUserAvatarProps {
  initials: string;
  fullName?: string;
  size?: "regular" | "big";
}

const UserAvatar = ({
  initials,
  fullName,
  size = "regular",
}: IUserAvatarProps) => {
  return (
    <div className={"flex flex-col  "}>
      <div
        className={classNames(styles.userAvatar, {
          [styles.big]: size === "big",
          [styles.regular]: size === "regular",
        })}
      >
        {initials}
      </div>
      {fullName && <span className={"font-bold py-1"}>{fullName}</span>}
    </div>
  );
};

export default UserAvatar;
