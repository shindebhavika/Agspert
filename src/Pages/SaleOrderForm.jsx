import React, { useEffect, useState } from "react";
import {
  Modal, ModalOverlay, ModalContent,
  ModalHeader, ModalFooter, ModalBody,
  ModalCloseButton, Button, Flex,
  FormLabel, useColorMode,
  useTheme, Text, Checkbox,
} from "@chakra-ui/react";
import Select from "react-select";
import Products from "../utils/Products.json";
import FormField from "../Components/FormField";
import ProductList from "../Components/ProductList";
import { generateOrderId, getCurrentDate, getOrders, setOrder } from "../utils/helper";


function SaleOrderForm({ isOpen, onClose, orderToModify}) {

  const theme = useTheme();
  const { colorMode, toggleColorMode } = useColorMode();

  // data fields
  const [customerName, setCustomerName] = useState('')
  const [customerId, setCustomerId] = useState('')
  const [invoiceDate, setInvoiceDate] = useState('')
  const [invoiceNo, setInvoiceNo] = useState('')
  const [isPaid, setIsPaid] = useState(false)
  const [products, setProducts] = useState([]);
  const [items, setItems] = useState({});
  const [totalPrice, setTotalPrice] = useState(0)

  // to set on change data in respective fields
  function handleOnChangeData(key, value) {
    const setFuncByKey = {
      customerName: setCustomerName,
      customerId: setCustomerId,
      invoiceDate: setInvoiceDate,
      invoiceNo: setInvoiceNo,
      isPaid: setIsPaid,
    }
    setFuncByKey[key](value)
  }

  function handleDiscardOrder() {
    setCustomerName('')
    setCustomerId('')
    setInvoiceDate('')
    setInvoiceNo('')
    setIsPaid(false)
    setProducts([])
    setItems({})
    setTotalPrice(0)
  }

  function prefillData (data) {
    const {
      customerId,
      customerName,
      invoiceDate,
      invoiceNo,
      products,
      isPaid,
      totalPrice,
    } = data || {}

    setCustomerId(customerId)
    setCustomerName(customerName)
    setInvoiceDate(invoiceDate)
    setInvoiceNo(invoiceNo)
    setIsPaid(isPaid)
    setTotalPrice(totalPrice)
    setProducts(products)
 
  }

  useEffect(() => {
    // if we have order to modify will prefill all the data
    if(!orderToModify) return ;
    prefillData(orderToModify)
  }, [orderToModify])

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

  const handleSelectChange = (selectedProducts) => {
    setProducts(selectedProducts)
  };

  function createOrder() {
    const newOrder = {
      customerId,
      customerName,
      invoiceDate,
      invoiceNo,
      products,
      isPaid,
      totalPrice,
      lastModified : getCurrentDate(),
      orderId : generateOrderId()
    }


    // This function will get called on creating new order and also for editing prev order
    // so we have to handle this accordingly 
    // to solve this we can check the orderId


    // fetching prev data
    const orders = getOrders()
    // pushing new order
    orders?.push(newOrder)
    // updating orders
    setOrder(orders)
    // closing modal
    onClose()
    // reseting all data fields
    handleDiscardOrder()
  }

  function handleSkuDetails({
    price, quantity,
    productId, id
  }) {

    // This function is for adding the skus prices and quantity
    // This is critical for now can be ignored, will see this at last

    const storedProducts = [...products]
    const productIndex = products.findIndex(product => product.value = productId)
    const {
      sku = []
    } = storedProducts[productIndex]
    const skuIndex = sku.findIndex(sku => sku.id = id)
    const updatedSku = {
      ...(sku?.[skuIndex] || {}),
      price, quantity
    }
    sku.splice(skuIndex, 1, updatedSku)
    storedProducts[productIndex].sku = sku
    // we can ignore this for now 
    // will undestand this later
    setItems({
      ...items,
      [id]: price * quantity
    })
  }

  useEffect(() => {
    // to get updated total price of order
    let totalPrice = 0
    Object.values(items).forEach(
      price => totalPrice = totalPrice + price
    )
    setTotalPrice(totalPrice)
  }, [items])

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl" p="1rem">

      <ModalOverlay />

      <ModalContent>

        <ModalHeader>Sale Order Form</ModalHeader>

        <ModalCloseButton />

        <ModalBody>
          <FormField id="invoiceNumber" label="Invoice Number" placeholder="Enter Invoice Number" mb={3} onChange={(e) => handleOnChangeData('invoiceNo', e.target.value)} value={invoiceNo} readOnly = {orderToModify} />
          <FormField id="invoiceDate" label="Invoice Date" type="date" placeholder="Select Date" onChange={(e) => handleOnChangeData('invoiceDate', e.target.value)} value={invoiceDate} readOnly = {orderToModify}/>
          <FormField id="customer" label="Customer" placeholder="Enter Customer Name" mb={6} onChange={(e) => handleOnChangeData('customerName', e.target.value)} value={customerName} readOnly = {orderToModify}/>
          <FormField id="customerId" label="Customer Id" placeholder="Enter Customer Idr" mb={3} onChange={(e) => handleOnChangeData('customerId', e.target.value)} value={customerId} readOnly = {orderToModify}/>


          <FormLabel htmlFor="products" className="input-label-required">
            All Product
          </FormLabel>

          <Select
            id="products"
            options={Products.map((product) => ({
              value: product.id,
              label: product.name,
              sku: product.sku
            }))}
            isMulti
            placeholder="Select Products"
            styles={customStyles}
            mb={6}
            onChange={handleSelectChange}
            closeMenuOnSelect={false}
            value={products}
            isDisabled = {orderToModify}
          />

          {
            products?.map((product) => (
              <ProductList
                data={product}
                handleSkuDetails={handleSkuDetails}
                readOnly = {orderToModify}
              />
            ))
          }



          <Flex justifyContent="space-between">
            <Checkbox 
              className="custom-checkbox" 
              colorScheme="green" 
              size="lg"
              onChange={
                () => setIsPaid(!isPaid)
              }
              isChecked={isPaid}
            >
              Is Paid
            </Checkbox>

            <Flex className="total-summary">
              <Text className="total-summary-text">
                Total Price: {totalPrice}
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
            onClick={handleDiscardOrder}
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
            onClick={createOrder}
          >
            Create Sale Order
          </Button>

        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default SaleOrderForm;
