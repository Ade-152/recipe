import { useEffect, useState, useRef} from "react";


function Home({ currentUser, onLogout }) {
     const recipesRef = useRef(null);

  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const[selectedMeal, setSelectedMeal] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const scrollToRecipes = () => {
  recipesRef.current?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};
  const handleCategoryClick = (category) => {
  setSelectedCategory(category);
  scrollToRecipes();
  setLoading(true);

  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    .then((response) => response.json())
    .then((data) => {
      setMeals(data.meals || []);
      setLoading(false);
    })
    .catch((error) => {
      console.log("Error loading category meals:", error);
      setLoading(false);
    });
};
  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.categories || []);
      })
      .catch((error) => {
        console.log("Error loading categories:", error);
      });
  }, []);
  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
      .then((response) => response.json())
      .then((data) => {
        setMeals(data.meals || []);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error loading meals:", error);
        setLoading(false);
      });
  }, []);
  const filteredMeals = meals.filter((meal) =>
    meal.strMeal.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="home-page">
      <nav className="home-navbar">
        <h2>TASTE TREASURES</h2>
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#categories">Categories</a>
          <a href="#recipes">Recipes</a>
        </div>
        <div className="nav-user">
          <span>Welcome, {currentUser}</span>
          <button onClick={onLogout}>Logout</button>
        </div>
      </nav>
      <section className="hero-section" id="home">
        <div className="hero-content">
          <p className="hero-label">THE ART OF GOOD FOOD</p>
          <h1>
            Discover the joy
            <br />
            of <span>cooking.</span>
          </h1>
          <p>
            Explore delicious recipes, discover new flavors
            and create beautiful moments around your table.
          </p>
          <a href="#recipes" className="hero-btn">
            Explore Recipes →
          </a>
        </div>
      </section>
      <section className="search-section">
        <div>
          <h2>What are you craving today?</h2>
          <p>Find something delicious to prepare.</p>
        </div>
        <input
          type="text"
          placeholder="Search for a meal..."
          value={search}
          onChange={(e) => {
  setSearch(e.target.value);
  if (e.target.value.trim()) {
    scrollToRecipes();
  }
}}
        />
      </section>
      <section className="categories-section" id="categories">
        <div className="section-heading">
          <div>
            <p>EXPLORE BY CATEGORY</p>
            <h2>Find your favorite</h2>
          </div>
        </div>
   <div className="category-list">
          {categories.map((category) => (
            <div className="category-card "
            key={category.idCategory}onClick={() => handleCategoryClick(category.strCategory)}>
  <img src={category.strCategoryThumb} alt={category.strCategory} />
  <h3>{category.strCategory}</h3>
</div>
          ))}
        </div>
      </section>
      <section className="recipes-section" id="recipes" ref={recipesRef}>
        <div className="section-heading">
          <div>
            <p>HANDPICKED FOR YOU</p>
            <h2>Explore delicious meals</h2>
          </div>
        </div>
        {loading ? (
          <p>Loading delicious recipes...</p>
        ) : filteredMeals.length > 0 ? (
          <div className="recipe-grid">
            {filteredMeals.map((meal) => (
              <div className="recipe-card" key={meal.idMeal}>
                <img src={meal.strMealThumb} alt={meal.strMeal} />

                <div className="recipe-info">
                  <h3>{meal.strMeal}</h3>
                  <p>{meal.strCategory || "Delicious recipe"}</p>

                  <button onClick={() => setSelectedMeal(meal)}>View Recipe →</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No recipes found. Try another search.</p>
        )}
      </section>
      {selectedMeal && (
  <div className="recipe-details">
    <img src={selectedMeal.strMealThumb} alt={selectedMeal.strMeal} />
    <h2>{selectedMeal.strMeal}</h2>
    <h3>Ingredients</h3>
    <h3>Cooking Instructions</h3>
    <p>{selectedMeal.strInstructions}</p>
     <button onClick={() => setSelectedMeal(null)}>
      Close ×
    </button>

  </div>
)}
      <footer className="home-footer">
        <h2>TASTE TREASURES</h2>
        <p>Discover. Create. Savor.</p>
        <p>© 2026 Taste Treasures. All rights reserved.</p>
      </footer>

    </div>
  );
}

export default Home;