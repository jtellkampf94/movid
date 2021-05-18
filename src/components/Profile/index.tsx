import { useState } from "react";
import Dropdown from "../Dropdown";
import SearchableDropdown from "../SearchableDropdown";

const Profile: React.FC = () => {
  const [state, setState] = useState<null | string>("");

  return (
    <div>
      <SearchableDropdown setWithPeople={setState} />
    </div>
  );
};

export default Profile;
