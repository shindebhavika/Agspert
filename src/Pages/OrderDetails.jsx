import React, { useEffect, useState } from 'react';
import {
  Tr,Th,Table,Thead,
  Tbody,TableContainer,
  Td,Tfoot,Button,Flex,
} from '@chakra-ui/react';
import { EditIcon, ViewIcon } from '@chakra-ui/icons';
import SaleOrderForm from './SaleOrderForm'; // assuming SaleOrderForm component exists
import ToggleTheme from '../Components/ToggleTheme';
import { getOrders } from '../utils/helper';

function OrderDetails() {

  // functions to fetch and set the data in the localstorage

  const [selectedOption, setSelectedOption] = useState('active');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [reqOrders, setReqOrders] = useState([])


  useEffect(() => {
    // showing active aorders by default in the table
    const orders = getOrders()
    const activeOrders = orders?.filter(order => order.isPaid == false)
    setReqOrders(activeOrders)
  }, [])

  const handleAddOrder = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  function handleTableData (orderTypes) {
    // to set the requeted data (completed/active) in the table 
    setSelectedOption(orderTypes)
    const paymentStatus = orderTypes === 'completed' 
    const orders = getOrders()
    const activeOrders = orders?.filter(
      order => order.isPaid == paymentStatus
    )
    setReqOrders(activeOrders)
  }

  return (
    <>
      <ToggleTheme />

      <SaleOrderForm isOpen={isFormOpen} onClose={handleCloseForm} />


      <Flex justifyContent="space-between" mt="4rem" ml="3rem" mr="3rem">
        <Flex justifyContent="space-between" w="40rem">
          <Button
            onClick={() => handleTableData('active')}
            colorScheme={selectedOption === 'active' ? 'green' : 'gray'}
            p="30px"
          >
            Active Sales Orders
          </Button>

          <Button
            onClick={() => handleTableData('completed')}
            colorScheme={selectedOption === 'completed' ? 'green' : 'gray'}
            p="30px"
          >
            Completed Orders
          </Button>
        </Flex>
        <Button colorScheme="green" p="30px" onClick={handleAddOrder}>
          + Sale Order
        </Button>
      </Flex>



      <TableContainer marginTop="4rem" ml="3rem" mr="3rem">

        <Table size="sm">

          <Thead bg="#9AE6B4">
            <Tr p="300px">
              <Th p="20px">ID</Th>
              <Th>Customer</Th>
              <Th isNumeric>Total Price</Th>
              <Th>Last Modified</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>

          <Tbody>
            {reqOrders.map((order) => (
              <Tr key={order?.id}>
                <Td>{order?.customerId}</Td>
                <Td>{order?.customerName}</Td>
                <Td isNumeric>${order?.totalPrice?.toFixed(2)}</Td>
                <Td>{order?.lastModified}</Td>
                <Td>
                  <Button leftIcon={<EditIcon />} size="sm" bg="#68D391" colorScheme="#68D391" mr={2}>
                    Edit
                  </Button>
                  <Button leftIcon={<ViewIcon />} size="sm" colorScheme="yellow" color="white">
                    View
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
          
          <Tfoot></Tfoot>
        </Table>
      </TableContainer>
    </>
  );
}

export default OrderDetails;
