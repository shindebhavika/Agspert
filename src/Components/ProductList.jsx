import React, { useState } from 'react';
import { UnorderedList, ListItem, Text, SimpleGrid, Icon } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import ProductCard from './ProductCard'; // Adjust the import based on your file structure

const ProductList = ({ selectedProducts, Products, handleProductClick }) => {
  const [expandedProducts, setExpandedProducts] = useState({});

  const toggleExpand = (productId) => {
    setExpandedProducts((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  return (
    <UnorderedList>
      {selectedProducts.map((product) => {
        const selectedProduct = Products.find((p) => p.id === product.value);
        const isExpanded = expandedProducts[product.value];

        return (
          <ListItem
            key={product.value}
            mb={2}
            cursor="pointer"
          >
            <Text display="flex" alignItems="center" onClick={() => handleProductClick(product.value)}>
              <Icon
                as={isExpanded ? ChevronUpIcon : ChevronDownIcon}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleExpand(product.value);
                }}
                mr={2}
                cursor="pointer"
              />
              {selectedProduct.name}
            </Text>
            {isExpanded && (
              <SimpleGrid
                columns={[1]}
                spacing={4}
                mt={4}
                maxH="40vh"
                overflowY="auto"
              >
                {selectedProduct.sku.map((sku, index) => (
                  <ProductCard key={sku.id} sku={sku} index={index} />
                ))}
              </SimpleGrid>
            )}
          </ListItem>
        );
      })}
    </UnorderedList>
  );
};

export default ProductList;
