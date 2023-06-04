import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";

import RecipeCard from "../components/RecipeCard";

const Cuisine = () => {
  const { type } = useParams();
  const [cuisine, setCuisne] = useState([]);
  const [searchText, setSearchText] = useState("");

  const getCuisines = async (name) => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=32e43d7a29d045559099c71efe4d598c&cuisine=${name}`
      );

      const result = await response.json();
      console.log(result);
      setCuisne(result.results);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getCuisines(type);
  }, [type]);

  const displayedCuisine = cuisine.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchText.toLowerCase())
  );
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transform={{ duration: 0.5 }}
    >
      <Link to="/" className="back--btn">
        Back
      </Link>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <input
          type="text"
          input={searchText}
          placeholder="Search"
          onChange={(e) => setSearchText(e.target.value)}
          style={{ padding: "10px", marginBottom: "2rem", marginTop: "2rem" }}
        />
        <div className="cuisine--list">
          {displayedCuisine.length > 0 ? (
            displayedCuisine.map((recipe) => <RecipeCard recipe={recipe} />)
          ) : (
            <h4>No recipe found.</h4>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Cuisine;
