import React from "react";
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

const ProductCard = ({ sku, index }) => (
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
          <Heading size="md">{index + 1}. SKU {sku.id}</Heading>
          <Text
            bg="rgba(0, 0, 0, 0.11)"
            p="0.5rem"
            minWidth="4rem"
            borderRadius=".4rem"
            textAlign="center">
            Rate
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
            <Input id="SellingPrice" />
          </Flex>
          <Flex flexDirection="column">
            <FormLabel htmlFor="TotalItems">
              Total Items
              <Text as="span" color="red"> *</Text>
            </FormLabel>
            <Input id="TotalItems" />
          </Flex>
        </Flex>
      </CardBody>
      <CardFooter>
        <Text bg="rgba(0, 0, 0, 0.11)" p="0.6rem" borderRadius=".5rem">
          Net SKU Price: price after selecting sku
        </Text>
      </CardFooter>
    </Card>
  </Flex>
);

export default ProductCard;
