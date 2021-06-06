import { useState } from "react";
import { Link } from "react-router-dom";
import { PersonResults } from "../../redux/reducers/search-reducer";
import "./peopleCard.scss";

interface PeopleCardProps {
  backgroundURL: string | null;
  person: PersonResults;
}

const PeopleCard: React.FC<PeopleCardProps> = ({ backgroundURL, person }) => {
  const [showDetails, setShowDetails] = useState(false);

  const renderBody = () => {
    return (
      <div className="people-card-body">
        <div className="people-card-rating">
          <i className="fas fa-star people-card-rating-icon"></i>
          <div className="people-card-rating-count">
            {person.popularity.toFixed(1)}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Link to={`/people/${person.id}`}>
      <div
        className="people-card"
        onMouseEnter={() => setShowDetails(true)}
        onMouseLeave={() => setShowDetails(false)}
      >
        {backgroundURL ? (
          <div
            className="people-card-background"
            style={{
              background: `url(${backgroundURL})  no-repeat`
            }}
          >
            {renderBody()}
          </div>
        ) : (
          <div className="people-card-background-placeholder">
            <i className="people-card-background-placeholder-image far fa-user"></i>
            {renderBody()}
          </div>
        )}
        {showDetails && (
          <div className="people-card-details">
            <h2 className="people-card-details-title">
              {person.name} &#40;
              {person.known_for_department
                ? person.known_for_department
                : "Not Listed"}
              &#41;
            </h2>
          </div>
        )}
      </div>
    </Link>
  );
};

export default PeopleCard;
