import { Box,
   Button,
    Drawer,
     DrawerBody, 
     DrawerContent,
      DrawerHeader, 
      DrawerOverlay, 
      Flex, 
      Input, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Spacer, Spinner, Text, Tooltip, useDisclosure, } from '@chakra-ui/react'
import React, { useState } from 'react'
import {BellIcon,ChevronDownIcon } from '@chakra-ui/icons'
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import { ChatState } from '../../context/ChatProvider'
import ProfileModel from './ProfileModel'
import { Navigate, useNavigate } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'
import axios from 'axios'
import ChatLoading from '../ChatLoading'
import UserListItem from '../UserAvater/userListItem'


const SideDrawer = () => {
  const [search, setSearch] = useState("")
  const [searchResult, setSearchResult] = useState([])
  const [loading, setloading] = useState(false)
  const [loadingChat, setLoadingChat] = useState(false)
  const {user,setSelectedChat,chats,setChats} = ChatState()
  const Navigate=useNavigate()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const logoutHandler=()=>{
    localStorage.removeItem("userInfo")
    Navigate('/')
  }
  const toast = useToast();

  const handleSearch=async()=>{
    if(!search){
      toast({
        title:"Empty Field",
        status:"warning",
        duration:5000,
        isClosable:true,
        position:"top-left",
      
      })
      return;
    }
    try {
      setloading(true)

      const config={
        headers:{
          Authorization: `Bearer ${user.token}`,
        },
      }
      axios.get(`/api/user?search=${search}`,config)
      .then((res)=>{
        setloading(false)
        setSearchResult(res.data)
      }).catch((err)=>{
         console.log("in axios.get(/api/user?search=")
      }) 
    } catch (error) {
      toast({
        title:"Error Occured",
        status:"error",
        duration:5000,
        isClosable:true,
        position:"bottom-left",
      
      })
    }
  }

  const accessChat=(userId)=>{
    try {
      setLoadingChat(true)
      const config={
        headers:{
          "Content-type":"application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
      axios.post(`/api/chat`,{userId},config)
      .then((res)=>{
        setloading(false)
        setSelectedChat(res.data)
        if(!chats.find((c)=>c._id===res.data._id)) {
          setChats([res.data,...chats])
          onClose()
        }
      }).catch((err)=>{
         console.log("in axios.post(/api/user)")
      }) 

      


    } catch (error) {
      toast({
        title:"Error fetching the chat",
        status:"error",
        duration:5000,
        isClosable:true,
        position:"bottom-left",
      
      })
    }
    
  }


  return (
    <>
      <Box 
        d="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px">
      <Flex>
      <Tooltip label="Search Users " hasArrow placement='bottom-end'>
        <Button variant="ghost" onClick={onOpen}>
          <i class="fa-solid fa-magnifying-glass"></i>
{/* Search */}
            <Text d={{ base: "none", md: "flex" }} px={4}>
              Search User
            </Text>
        </Button>

      </Tooltip>
      <Spacer/>
      <Text fontSize="2xl" fontFamily="Work sans">
          ZeeBee
        </Text>
        <Spacer/>

        <div>
          <Menu>
            <MenuButton p={1}>
                <BellIcon></BellIcon>
            </MenuButton>
            {/* <MenuList>

            </MenuList> */}

          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon/>}>
                <Avatar size={'sm'} cursor={'pointer'} name={user.name} src={user.pic}/>
            </MenuButton>
            <MenuList>
              <ProfileModel user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModel>
              <MenuDivider/>
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>

            </MenuList>
          </Menu>
        </div>
    
    </Flex>
    </Box>

    <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay/>
            <DrawerContent>
              <DrawerHeader borderBottomWidth={"1px"}>Search Users</DrawerHeader>
              <DrawerBody>
              <Flex>
                <Input
                placeholder='search by name or email'
                mr={1}
                value={search}
                onChange={(e)=> setSearch(e.target.value)}/>
                <Button 
                onClick={handleSearch}
                >Go</Button>
              </Flex>
              <Box my={"10px"}>
                {loading?(
                <ChatLoading/>
              ):(
                searchResult?.map((user)=>(
                  <UserListItem 
                  key={user._id}
                  user={user}
                  handleFunction={()=>accessChat(user._id)}
                  />
                ))
              )}
              </Box>
              {loadingChat && <Spinner ml = "auto" d="flex"/>}
            </DrawerBody>
            </DrawerContent>
            
    </Drawer>
    </>
  )
}

export default SideDrawer
