import { useState, useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";

const DetailsPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [isActive, setIsActive] = useState("ingredients");

  const { recipeID } = useParams();
  const getDetail = async () => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/${recipeID}/information?apiKey=32e43d7a29d045559099c71efe4d598c`
      );

      const result = await response.json();
      console.log(result, "RESULTTTTTTT");

      setRecipes(result);
    } catch (err) {
      console.error(err, "ERROR");
    }
  };

  useEffect(() => {
    getDetail();
  }, [recipeID]);

  let location = useLocation();
  console.log(location, "LOCATION");

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transform={{ duration: 0.5 }}
    >
      <Link to={`${location?.state?.from?.pathname}`} className="back--btn">
        Back
      </Link>
      <div className="details">
        <div>
          <h3>{recipes?.title}</h3>
          <h3>{<img src={recipes?.image} />}</h3>
        </div>
        <div>
          <div className="details--buttons">
            <button
              onClick={() => setIsActive("ingredients")}
              className={isActive === "ingredients" ? "activeBtn" : ""}
            >
              Ingredients
            </button>
            <button
              onClick={() => setIsActive("instructions")}
              className={isActive === "instructions" ? "activeBtn" : ""}
            >
              Instructions
            </button>
          </div>
          <motion.div
            style={{ textAlign: "left", marginLeft: "3rem" }}
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transform={{ duration: 0.5 }}
          >
            {isActive === "ingredients" ? (
              <div>
                <h3>Ingredients : </h3>
                <ul>
                  {recipes?.extendedIngredients?.map((e) => (
                    <li>{e.aisle}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <>
                <h3>Instructions : </h3>
                <p
                  dangerouslySetInnerHTML={{ __html: recipes.instructions }}
                ></p>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default DetailsPage;
