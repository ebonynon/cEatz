import React from "react";
import { useFormik } from "formik";
import { useRef } from "react";
import {
  Button,
  IconButton,
  useColorMode,
  useDisclosure,
  Input,
  Stack,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { FoodItemsService } from "../../services";
export default function EditComponent(props) {
  const gData = props.vl;
  const { colorMode } = useColorMode();
  const boxColor = { light: "teal.300", dark: "teal.600" };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const formik = useFormik({
    initialValues: {
      ItmID: gData.ItmID,
      ResID: gData.ResID,
      Name: gData.Name,
      ItmKind: gData.ItmKind,
      smallPrice: gData.smallPrice,
      largePrice: gData.largePrice,
      ImgURL: gData.ImgURL,
    },

    onSubmit: async (values, { resetForm }) => {
      await FoodItemsService.UpdateAFoodItem(gData.ID, values);
      resetForm({
        values: {
          ItmID: "",
          ResID: "",
          Name: "",
          ItmKind: "",
          smallPrice: "",
          largePrice: "",
          ImgURL: "",
        },
      });
      onClose();
    },
  });
  return (
    <>
      <IconButton
        rounded="full"
        onClick={onOpen}
        icon={<EditIcon />}
        bg={boxColor[colorMode]}
      />
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Edit The Food Item</DrawerHeader>
            <DrawerBody>
              <Stack spacing={1}>
                <Input
                  id="ItmID"
                  placeholder="ItmID"
                  value={formik.values.ItmID}
                  onChange={formik.handleChange}
                />
                <Input
                  id="ResID"
                  placeholder="ResID"
                  value={formik.values.ResID}
                  onChange={formik.handleChange}
                />
                <Input
                  id="Name"
                  placeholder="Name"
                  value={formik.values.Name}
                  onChange={formik.handleChange}
                />
                <Input
                  id="ItmKind"
                  placeholder="ItmKind"
                  value={formik.values.ItmKind}
                  onChange={formik.handleChange}
                />
                <Input
                  id="smallPrice"
                  placeholder="smallPrice"
                  value={formik.values.smallPrice}
                  onChange={formik.handleChange}
                />
                <Input
                  id="largePrice"
                  placeholder="largePrice"
                  value={formik.values.largePrice}
                  onChange={formik.handleChange}
                />
                <Input
                  id="ImgURL"
                  placeholder="ImgURL"
                  value={formik.values.ImgURL}
                  onChange={formik.handleChange}
                />
              </Stack>
            </DrawerBody>
            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button color="blue" onClick={formik.handleSubmit}>
                Update
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
}
