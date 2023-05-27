import styles from './UserAvatar.module.css';

interface IUserAvatarProps{
    initials:string;
    fullName?:string;
}

const UserAvatar = ({ initials, fullName }:IUserAvatarProps) => {
  return (
      <>
          <div className={styles.userAvatar}>
              {initials}
          </div>
          {fullName&&<span className={styles.fullName}>{fullName}</span>}
      </>

  );
};

export default UserAvatar;