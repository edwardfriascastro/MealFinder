import {
  Button,
  ModalContent,
  ModalOverlay,
  Modal,
  ModalFooter,
} from "@chakra-ui/react";
import RecipeModalSkeleton from "./RecipeModalSkeleton";
import { MealDetails } from "../types";
import RecipeModalContent from "./RecipeModalContent";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  loading: boolean;
  data: MealDetails | undefined;
};

function RecipeModal({ isOpen, onClose, loading, data }: Props) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          {loading ? (
            <RecipeModalSkeleton />
          ) : (
            data && <RecipeModalContent data={data} />
          )}
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              close{" "}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default RecipeModal;
