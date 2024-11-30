import { Grid, GridItem, useDisclosure } from "@chakra-ui/react";
import Header from "./components/Header";
import SideNav from "./components/SideNav";
import MainContent from "./components/MainContent";
import { useEffect, useState } from "react";
import { Category, Meal, MealDetails, SearchForm } from "./types";
import useHttpData from "./hooks/useHttpData";
import axios from "axios";
import RecipeModal from "./components/RecipeModal";
import useFetch from "./hooks/useFetch";

const baseUrl = "https://www.themealdb.com/api/json/v1/1/";

const url = `${baseUrl}list.php?c=list`;

const makeMealUrl = (category: Category) =>
  `${baseUrl}filter.php?c=${category.strCategory}`;
const defaultCategory = {
  strCategory: "Beef",
};

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedCategory, setSelectedCategory] =
    useState<Category>(defaultCategory);

  const { loading, data } = useHttpData<Category>(url);

  const {
    loading: loadingMeal,
    data: dataMeal,
    setData: setMeals,
    // setLoading: setLoadingMeal,
  } = useHttpData<Meal>(makeMealUrl(defaultCategory));

  const searchAPI = (searchForm: SearchForm) => {
    const url = `${baseUrl}search.php?s=${searchForm.search}`;
    axios.get<{ meals: Meal[] }>(url).then(({ data }) => setMeals(data.meals));
  };

  const {
    fetch,
    loading: loadinMealDetails,
    data: MealDetail,
  } = useFetch<MealDetails>();

  const searchMealDetails = (meal: Meal) => {
    // www.themealdb.com/api/json/v1/1/lookup.php?i=52772
    onOpen();
    fetch(`${baseUrl}lookup.php?i=${meal.idMeal}`);
  };
  useEffect(() => {
    if (selectedCategory) {
      axios
        .get<{ meals: Meal[] }>(makeMealUrl(selectedCategory))
        .then(({ data }) => setMeals(data.meals));
    }
  }, [selectedCategory]);
  return (
    <>
      <Grid
        templateAreas={`"header header"
                          "nav main"`}
        gridTemplateRows={"50px 1fr"} // Header toma 50px y el resto 1fr
        gridTemplateColumns={{ sm: `0 1fr`, md: `250px 1fr` }} // Ajusta para responsive
        fontSize={14}
      >
        <GridItem
          boxShadow="lg"
          zIndex="1"
          pos="sticky"
          top="0"
          pt="7px"
          bg="white"
          area={"header"}
        >
          <Header onSubmit={searchAPI} />
        </GridItem>
        <GridItem
          pos="sticky"
          top="60px"
          left="0"
          p="5"
          area={"nav"}
          height="calc(100vh - 60px)"
          overflowY="auto"
        >
          <SideNav
            categories={data}
            loading={loading}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </GridItem>
        <GridItem p="4" bg="gray.100" area={"main"}>
          <MainContent
            openRecipe={searchMealDetails}
            meals={dataMeal}
            loading={loadingMeal}
          />
        </GridItem>
      </Grid>
      <RecipeModal
        data={MealDetail}
        loading={loadinMealDetails}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
}

export default App;
