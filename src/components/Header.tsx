import {
  Button,
  Container,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { IoIosSearch } from "react-icons/io";
import { useForm } from "react-hook-form";
import { SearchForm } from "../types";

type Props = {
  onSubmit: (data: SearchForm) => void;
};
function Header({ onSubmit }: Props) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SearchForm>();

  return (
    <Container mt="1" maxW="3xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <IoIosSearch color="gray.600" />
          </InputLeftElement>
          <Input
            focusBorderColor={!!errors.search ? "crimson" : "blue.400"}
            isInvalid={!!errors.search}
            {...register("search", { required: true })}
            type="text"
            placeholder="Intenta con chicken o beans"
          />
          {/* {errors.search && (
            <p> Es necesario escribir un plato existente.</p>
          )} */}
          <Button type="submit" color="white" bgColor="blue.400" ml="2">
            Buscar
          </Button>
        </InputGroup>
      </form>
    </Container>
  );
}

export default Header;
