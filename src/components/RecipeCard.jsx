import { Link, useLocation } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  const location = useLocation();
  return (
    <div className="recipe--card">
      <Link to={`/details/${recipe.id}`} state={{ from: location }}>
        <img src={recipe.image} />
        <p>{recipe.title}</p>
      </Link>
    </div>
  );
};

export default RecipeCard;
