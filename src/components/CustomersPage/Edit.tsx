import React, {useRef} from "react";
import * as Yup from 'yup';
import {useFormik} from "formik";
import {useQueryCache} from "react-query";
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
import {EditIcon} from "@chakra-ui/icons";
import {CustomersService} from "../../services";

export default function EditComponent(props: { vl: any }) {
    const gData = props.vl;
    const queryClient = useQueryCache();
    const {colorMode} = useColorMode();
    const boxColor = {light: "teal.300", dark: "teal.600"};
    const {isOpen, onOpen, onClose} = useDisclosure();
    const btnRef: any = useRef();
    const customerSchema = Yup.object().shape({
        CusID: Yup.number().positive().integer().required('Required'),
        FName: Yup.string().required('Required'),
        LName: Yup.string().required('Required'),
        Phone: Yup.number().required('Required'),
        Mail: Yup.string().email('Invalid email').required('Required')
    });
    const formik = useFormik({
        initialValues: {
            CusID: gData.CusID,
            FName: gData.FName,
            LName: gData.LName,
            Phone: gData.Phone,
            Mail: gData.Mail,
        },
        validationSchema: customerSchema,
        onSubmit: async (values, {resetForm}) => {
            await CustomersService.UpdateACustomers(gData.ID, values);
            resetForm({
                values: {CusID: "", FName: "", LName: "", Phone: "", Mail: ""},
            });
            await queryClient.invalidateQueries('customers');
            onClose();
        },
    });
    return (
        <>
            <IconButton
                aria-label=""
                rounded="full"
                onClick={onOpen}
                icon={<EditIcon/>}
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
                        <DrawerCloseButton/>
                        <DrawerHeader>Edit The Customer</DrawerHeader>
                        <DrawerBody>
                            <Stack spacing={1}>
                                <Input
                                    id="CusID"
                                    placeholder="CusID"
                                    value={formik.values.CusID}
                                    onChange={formik.handleChange}
                                />
                                <Input
                                    id="FName"
                                    placeholder="FName"
                                    value={formik.values.FName}
                                    onChange={formik.handleChange}
                                />
                                <Input
                                    id="LName"
                                    placeholder="LName"
                                    value={formik.values.LName}
                                    onChange={formik.handleChange}
                                />
                                <Input
                                    id="Phone"
                                    placeholder="Phone"
                                    value={formik.values.Phone}
                                    onChange={formik.handleChange}
                                />
                                <Input
                                    id="Mail"
                                    placeholder="Mail"
                                    value={formik.values.Mail}
                                    onChange={formik.handleChange}
                                />
                            </Stack>
                        </DrawerBody>
                        <DrawerFooter>
                            <Button variant="outline" mr={3} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button color="blue" onClick={() => formik.handleSubmit()}>
                                Update
                            </Button>
                        </DrawerFooter>
                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        </>
    );
}
