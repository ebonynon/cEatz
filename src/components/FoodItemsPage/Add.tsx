import React, {useRef} from "react";
import * as Yup from 'yup';
import {useFormik} from "formik";
import {useQueryCache} from "react-query";
import {
    Box,
    Grid,
    GridItem,
    Button,
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
import {AddIcon} from "@chakra-ui/icons";
import {FoodItemsService} from "../../services";

export default function AddComponent() {
    const queryClient = useQueryCache();
    const {isOpen, onOpen, onClose} = useDisclosure();
    const btnRef: any = useRef();
    const foodItemSchema = Yup.object().shape({
        ItmID: Yup.number().positive().integer().required('Required'),
        ResID: Yup.number().positive().integer().required('Required'),
        Name: Yup.string().required('Required'),
        ItmKind: Yup.string().required('Required'),
        smallPrice: Yup.number().required('Required'),
        largePrice: Yup.number().required('Required'),
        ImgURl: Yup.string().url().required('Required')
    });
    const formik = useFormik({
        initialValues: {
            ItmID: "",
            ResID: "",
            Name: "",
            ItmKind: "",
            smallPrice: "",
            largePrice: "",
            ImgURL: "",
        },
        validationSchema: foodItemSchema,
        onSubmit: async (values, {resetForm}) => {
            await FoodItemsService.AddAFoodItem(values);
            resetForm({});
            await queryClient.invalidateQueries('food-items');
            onClose();
        },
    });
    return (
        <>
            <Box borderWidth="1px" borderRadius="lg" margin={1} w="100%" p={1}>
                <Grid templateColumns="repeat(6, 1fr)" align="center" gap={6}>
                    <GridItem colStart={6}>
                        <Button leftIcon={<AddIcon/>} colorScheme="teal" onClick={onOpen}>
                            Add Food Item
                        </Button>
                    </GridItem>
                </Grid>
            </Box>
            <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay>
                    <DrawerContent>
                        <DrawerCloseButton/>
                        <DrawerHeader>Add New Food Item</DrawerHeader>
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
                            <Button color="blue" onClick={() => formik.handleSubmit()}>
                                Add
                            </Button>
                        </DrawerFooter>
                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        </>
    );
}
