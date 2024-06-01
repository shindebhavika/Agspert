import React, { useEffect, useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Text,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  FormLabel,
} from "@chakra-ui/react";
import { isViewingOrderAtom } from "../recoil-atoms";
import { useRecoilValue } from "recoil";

export default function ProductCard({ 
  data = {}, 
  index = 0, 
  handleSkuDetails = () => { }, 
  productId = '',
}) {

  const [price, setPrice] = useState('')
  const [quantity, setQuantity] = useState('')

  const isOrederViwing = useRecoilValue(isViewingOrderAtom)


  const {
    id = '',
    selling_price = ''
  } = data || {}


  useEffect(() => {
    // if both price and quantity of sku added will send it for update
    if (price && quantity) {
      handleSkuDetails(
        {
          price : +price, quantity : +quantity,
          productId, id
        }
      )
    }
  }, [price, quantity])

  return (


    <Flex
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      flexDirection="column"
      width="100%"
      justifyContent="center"
      alignItems="center">
      <Card width="100%">
        <CardHeader>
          <Flex
            justifyContent="space-between"
            pb="2rem"
            borderBottom="1px solid rgba(0, 0, 0, 0.39)">
            <Heading size="md">{index + 1}. SKU {id}</Heading>
            <Text
              bg="rgba(0, 0, 0, 0.11)"
              p="0.5rem"
              minWidth="4rem"
              borderRadius=".4rem"
              textAlign="center">
              Rate : {selling_price}
            </Text>
          </Flex>
        </CardHeader>
        <CardBody>
          <Flex justifyContent="space-between">
            <Flex flexDirection="column">
              <FormLabel htmlFor="SellingPrice">
                Selling Price
                <Text as="span" color="red"> *</Text>
              </FormLabel>
              <Input id="SellingPrice"
                onChange={
                  (e) => setPrice(e.target.value)
                }
                value={price}
                readOnly = {isOrederViwing}
              />
            </Flex>
            <Flex flexDirection="column">
              <FormLabel htmlFor="TotalItems">
                Total Items
                <Text as="span" color="red"> *</Text>
              </FormLabel>
              <Input id="TotalItems"
                onChange={
                  (e) => setQuantity(e.target.value)
                }
                value={quantity}
                readOnly = {isOrederViwing}

              />
            </Flex>
          </Flex>
        </CardBody>
        <CardFooter>
          <Text bg="rgba(0, 0, 0, 0.11)" p="0.6rem" borderRadius=".5rem">

            Net SKU Price :
            {
              price * quantity ?
                price * quantity :
                '           price after selecting sku'
            }
          </Text>
        </CardFooter>
      </Card>
    </Flex>
  );
}
