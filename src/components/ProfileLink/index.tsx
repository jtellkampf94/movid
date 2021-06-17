import "./profileLink.scss";

interface ProfileLinkProps {
  title: string;
  handleClick: () => void;
  setTitle: (title: string) => void;
}

const ProfileLink: React.FC<ProfileLinkProps> = ({
  title,
  handleClick,
  setTitle
}) => {
  return (
    <div
      className="profile-link"
      onClick={() => {
        handleClick();
        setTitle(title);
      }}
    >
      <span className="profile-link-item">{title}</span>
    </div>
  );
};

export default ProfileLink;
