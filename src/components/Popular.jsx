import { useState, useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

import RecipeCard from "./RecipeCard";

const Popular = () => {
  const [popular, setPopular] = useState([]);

  console.log(popular, "POPULAR");
  const getPopular = async () => {
    try {
      const check = localStorage.getItem("popular");

      if (check) {
        setPopular(JSON.parse(check));
      } else {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/random?apiKey=32e43d7a29d045559099c71efe4d598c&number=9`
        );
        const result = await response.json();
        localStorage.setItem("popular", JSON.stringify(result.recipes));
        setPopular(result.recipes);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getPopular();
  }, []);

  return (
    <div className="recipe--list">
      <h3>Our Popular Picks</h3>

      <Splide
        options={{
          perPage: 4,
          arrows: false,
          pagination: false,
          drag: "free",
          margin: "5rem",
        }}
      >
        {popular.map((recipe) => (
          <SplideSlide>
            <div key={recipe.id}>
              <RecipeCard recipe={recipe} />
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default Popular;
