import { useState, useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

import RecipeCard from "./RecipeCard";

const Veggies = () => {
  const [veggie, setVeggie] = useState([]);
  const getVeggie = async () => {
    try {
      const check = localStorage.getItem("veggie");

      if (check) {
        setVeggie(JSON.parse(check));
      } else {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/random?apiKey=32e43d7a29d045559099c71efe4d598c&number=9&tags=vegetarian`
        );
        const result = await response.json();
        localStorage.setItem("veggie", JSON.stringify(result.recipes));
        setVeggie(result.recipes);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getVeggie();
  }, []);
  return (
    <div className="recipe--list">
      <h3>Our Vegetarian Picks</h3>
      <Splide
        options={{
          perPage: 3,
          arrows: false,
          pagination: false,
          drag: "free",
          margin: "5rem"
        }}
      >
        {veggie.map((recipe) => (
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

export default Veggies;
