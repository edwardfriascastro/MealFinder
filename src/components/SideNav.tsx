import { Category } from "../types";
import { Link, Heading, VStack, Text, SkeletonText } from "@chakra-ui/react";

type Props = {
  categories: Category[];
  loading: boolean;
  selectedCategory: Category;
  setSelectedCategory: (category: Category) => void;
};
const selectedProps = {
  bgColor: "blue.400",
  color: "white",
  fontWeight: "bold",
};

function SideNav({
  categories,
  selectedCategory,
  setSelectedCategory,
  loading,
}: Props) {
  // const selected = {
  //   strCategory: "Beef",
  // };
  return loading ? (
    <SkeletonText mt="1" noOfLines={8} spacing="6" skeletonHeight="2" />
  ) : (
    <>
      <Heading color="blue.400" fontSize={12} fontWeight="bold" mb={4}>
        CATEGORIAS
      </Heading>
      <VStack spacing={4} align="stretch">
        {categories.map((c) => (
          // Cada 'Link' debe tener una etiqueta de cierre.
          <Link
            onClick={() => setSelectedCategory(c)}
            px={2}
            py={1}
            borderRadius={5}
            _hover={{ textDecoration: "none" }}
            key={c.strCategory}
            {...(selectedCategory.strCategory == c.strCategory &&
              selectedProps)}
              
          >
            <Text>{c.strCategory}</Text>
          </Link>
        ))}
      </VStack>
    </>
  );
}

export default SideNav;
