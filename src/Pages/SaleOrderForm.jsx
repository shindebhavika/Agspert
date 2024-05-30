import React ,{useState}from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Flex,

  FormLabel,
 
  useColorMode,
  useTheme,
  
  Text,
 
  Checkbox,
} from "@chakra-ui/react";


import Select from "react-select";
import Products from "../utils/Products.json";

import FormField from "../Components/FormField";
import ProductList from "../Components/ProductList";

function SaleOrderForm({ isOpen, onClose }) {
  const theme = useTheme();
  const { colorMode, toggleColorMode } = useColorMode();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [clickedProducts, setClickedProducts] = useState({});

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor:
        colorMode === "dark" ? theme.colors.gray[700] : theme.colors.white,
      borderColor:
        colorMode === "dark" ? theme.colors.gray[600] : theme.colors.gray[300],
      color: colorMode === "dark" ? theme.colors.white : theme.colors.black,
      padding: "6px",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor:
        colorMode === "dark" ? theme.colors.gray[700] : theme.colors.white,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? theme.colors.teal[500]
        : state.isFocused
        ? theme.colors.teal[100]
        : colorMode === "dark"
        ? theme.colors.gray[700]
        : theme.colors.white,
      color: colorMode === "dark" ? theme.colors.white : theme.colors.black,
      "&:active": {
        backgroundColor: theme.colors.teal[500],
        color: theme.colors.white,
        borderRadius: "9999px",
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: colorMode === "dark" ? theme.colors.white : theme.colors.black,
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: theme.colors.teal[100],
      color: theme.colors.teal[700],
      borderRadius: "9999px",
      padding: "6px",
      fontWeight: "bold",
      fontSize: "1.2em",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: theme.colors.teal[700],
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: theme.colors.teal[700],
      ":hover": {
        backgroundColor: theme.colors.teal[500],
        color: theme.colors.white,
      },
    }),
  };

  const handleSelectChange = (selectedOptions) => {
    setSelectedProducts(selectedOptions);
    setClickedProducts({});
  };

  const handleProductClick = (productId) => {
    setClickedProducts((prevState) => ({
      ...prevState,
      [productId]: !prevState[productId],
    }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl" p="1rem">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Sale Order Form</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormField id="invoiceNumber" label="Invoice Number" placeholder="Enter Invoice Number" mb={3} />
          <FormField id="invoiceDate" label="Invoice Date" type="date" placeholder="Select Date" />
          <FormField id="customer" label="Customer" placeholder="Enter Customer Name" mb={6} />

          <FormLabel htmlFor="products" className="input-label-required">
            All Product
          </FormLabel>
          <Select
            id="products"
            options={Products.map((product) => ({
              value: product.id,
              label: product.name,
            }))}
            isMulti
            placeholder="Select Products"
            styles={customStyles}
            mb={6}
            onChange={handleSelectChange}
          />

<ProductList
        selectedProducts={selectedProducts}
        Products={Products}
        handleProductClick={handleProductClick}
        clickedProducts={clickedProducts}
      />

          <Flex justifyContent="space-between">
            <Checkbox className="custom-checkbox" colorScheme="green" size="lg">
              Is Paid
            </Checkbox>

            <Flex className="total-summary">
              <Text className="total-summary-text">
                Total Price:
              </Text>
              <Text className="total-summary-text">
                Total Items:
              </Text>
            </Flex>
          </Flex>
        </ModalBody>
        <ModalFooter justifyContent="space-between" >
       
         <Button
            size="md"
            height="48px"
            width="200px"
            border="2px"
            color="red"
            bg="#FFF5F5"
            _hover={{ bg: "#E53E3E", color: "white" }}
            onClick={onClose}
          >
            Discard
          </Button>
          <Button
            size="md"
            height="48px"
            width="200px"
            border="2px"
            borderColor="green"
            _hover={{ bg: "#38A169", color: "white" }}
            onClick={onClose}
          >
            Create Sale Order
          </Button>
       
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default SaleOrderForm;
