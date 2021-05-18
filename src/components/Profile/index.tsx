import { useState } from "react";
import Dropdown from "../Dropdown";

const sortByOptions = [
  { id: "popularity.desc", name: "Popularity Descending" },
  { id: "popularity.asc", name: "Popularity Ascending" },
  { id: "release_date.desc", name: "Release Date Descending" },
  { id: "release_date.asc", name: "Release Date Ascending" },
  { id: "revenue.desc", name: "Revenue Descending" },
  { id: "revenue.asc", name: "Revenue Ascending" },
  { id: "vote_average.desc", name: "Vote Average Descending" },
  { id: "vote_average.asc", name: "Vote Average Ascending" }
];

const Profile: React.FC = () => {
  const [state, setState] = useState<null | string>("");

  return (
    <div>
      <Dropdown title="Sort By" items={sortByOptions} setState={setState} />
      {/* <Dropdown title="Sort By" items={sortByOptions} setState={setState} /> */}
    </div>
  );
};

export default Profile;
