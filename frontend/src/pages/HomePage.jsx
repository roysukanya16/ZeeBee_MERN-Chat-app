import { Container,Box,Text } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import Login from '../components/authentication/Login'
import Signup from '../components/authentication/Signup'
import { useNavigate } from 'react-router-dom'


const HomePage = () => {
      const navigate=useNavigate()

       useEffect(() => {
          const user = JSON.parse(localStorage.getItem("userInfo"))

          if(!user){
            navigate('/chats')
          }
    }, [navigate])
    

  return (
    <Container maxW='xl' centerContent>
      <Box d='flex' 
      justifyContent='center' 
      p={3} 
      bg={"white"} 
      w='100%'
      m="40px 0 15px 0"
      borderRadius="lg"
      borderWidth="1px"
      >
        <Text fontSize={'4xl'}
        fontFamily="Work sans">ZeeBee</Text>
      </Box>
      <Box
      p={4} 
      bg={"white"} 
      w='100%'
      m="40px 0 15px 0"
      borderRadius="lg"
      borderWidth="1px">
        <Tabs variant='soft-rounded' colorScheme='green'>
          <TabList mb={"1em"}>
            <Tab width={"50%"}>Login</Tab>
            <Tab width={"50%"}>Sign up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login></Login>
            </TabPanel>
            <TabPanel>
              <Signup></Signup>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  )
}

export default HomePage
