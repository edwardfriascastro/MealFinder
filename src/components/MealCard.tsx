import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Image,
} from "@chakra-ui/react";
import { Meal } from "../types";

type Props = {
  meal: Meal;
  openRecipe: () => void;
};

function MealCard({ meal ,openRecipe}: Props) {

  return (
    <Card boxShadow="lg">
      <CardBody>
        <Image src={meal.strMealThumb} alt={meal.strMeal} borderRadius="lg" />
        <Heading size="md" color="blue.400">
          <Text mt={4}>{meal.strMeal}</Text>
        </Heading>
      </CardBody>
      <CardFooter pt="0">
        <Button onClick={openRecipe} variant="solid" color="white" bg="blue.400">
          Ver Receta
        </Button>
      </CardFooter>
    </Card>
  );
}

export default MealCard;
