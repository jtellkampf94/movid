import Dropdown from "../Dropdown";

const sortByOptions = [
  { id: 1, name: "popularity.desc" },
  { id: 2, name: "popularity.asc" },
  { id: 3, name: "release_date.desc" },
  { id: 4, name: "release_date.asc" },
  { id: 5, name: "revenue.desc" },
  { id: 6, name: "revenue.asc" },
  { id: 7, name: "vote_average.desc" },
  { id: 8, name: "vote_average.asc" }
];

const Profile: React.FC = () => {
  return (
    <div>
      <Dropdown title="SortBy" items={sortByOptions} />
      <Dropdown title="SortBy" items={sortByOptions} />
    </div>
  );
};

export default Profile;
