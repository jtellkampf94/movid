import { useState, useEffect, Fragment } from "react";

import Header from "../Header";

import "./profile.scss";

const Profile: React.FC = () => {
  return (
    <Fragment>
      <Header />
      <div className="profile">
        <h1>Profile</h1>
      </div>
    </Fragment>
  );
};

export default Profile;
