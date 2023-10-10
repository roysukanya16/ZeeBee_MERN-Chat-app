import { ViewIcon } from '@chakra-ui/icons'
import { Box, Button, FormControl, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { ChatState } from '../../context/ChatProvider'
import UserBadgeItem from '../UserAvater/UserBadgeItem'
import UserListItem from '../UserAvater/userListItem'
import axios from 'axios'

const UpdateGroupChatModal = ({fetchAgain,setFetchAgain}) => {
      const { isOpen, onOpen, onClose } = useDisclosure()
      const [groupChatName, setGroupChatName] = useState()
       const [search, setSearch] = useState("")
      const [searchResult, setSearchResult] = useState([])
      const [loading, setLoading] = useState(false)
      const [renameLoading, setRenameLoading] = useState(false)

      const{selectedChat,setSelectedChat,user}=ChatState()

    const toast=useToast()

    const handleRemove=(user1)=>{
        if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
      toast({
        title: "Only admins can remove someone!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
        setLoading(true)
        const config = {
            headers: {
            Authorization: `Bearer ${user.token}`,
            },
        };

        axios.put("/api/chat/groupremove",{
            chatId: selectedChat._id,
            userId: user1._id,
        },config).then((res)=>{

            user._id === user._id? setSelectedChat():setSelectedChat(res.data)
            setFetchAgain(!fetchAgain)
            setLoading(false)
        }).catch((e)=>console.log(e))

        
        
    } catch (error) {
        toast({
        title: "Error Occured!",
        
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }

    }
    const handleAddUser=(user1)=>{
        if (selectedChat.users.find((u) => u._id === user1._id)) {
      toast({
        title: "User Already in group!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    if (selectedChat.groupAdmin._id !== user._id) {
      toast({
        title: "Only admins can add someone!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
        setLoading(true)
        const config = {
            headers: {
            Authorization: `Bearer ${user.token}`,
            },
        };

        axios.put("/api/chat/groupadd",{
            chatId: selectedChat._id,
            userId: user1._id,
        },config).then((res)=>{
            setSelectedChat(res.data)
                setFetchAgain(!fetchAgain)
                setLoading(false)
        }).catch((e)=>console.log(e))
        
    } catch (error) {
        toast({
        title: "Error Occured!",
        
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
        
    }

    }

    const handleRename=()=>{
        if(!groupChatName) return;

        try {
            setRenameLoading(true)
            const config = {
                headers: {
                Authorization: `Bearer ${user.token}`,
                },
            };

            axios.put(`/api/chat/rename`,{
                chatId: selectedChat._id,
                chatName: groupChatName,
            },
            config).then((res)=>{
                setSelectedChat(res.data)
                setFetchAgain(!fetchAgain)
                setRenameLoading(false)
            }).catch((e)=>console.log(e))
        } catch (error) {
             toast({
        title: "Error Occured!",
        
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setRenameLoading(false);
    }
    setGroupChatName("");

    }

    const handleSearch=(query)=>{
        setSearch(query)

        if(!query){
            return;
        }

        try {
            setLoading(true)
            const config={
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            }

            axios.get(`/api/user?search=${search}`,config)
            .then((res)=>{
                console.log(res.data)
                setLoading(false);
                setSearchResult(res.data)
            })
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to Search Results",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
            setLoading(false)
            
        }
      }

  return (
    <>
      <IconButton
      display={{base:"flex"}} 
      icon={<ViewIcon/>}
      onClick={onOpen} ></IconButton>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
          fontSize={"35px"}
          fontFamily={"Work sans"}
          display={"flex"}
          justifyContent={"center"}>{selectedChat.chatName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box w={"100%"} display={"flex"} flexWrap={"wrap"} pb={3}>
                {selectedChat.users.map((u)=>(
                <UserBadgeItem key={user._id} user={u} handleFunction={()=>handleRemove(u)}/>

                ))}
            </Box>
             <FormControl d="flex">
              <Input
                placeholder="Chat Name"
                w={"76%"}
                // mr={"5px"}
                mb={3}
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <Button
                variant="solid"
                colorScheme="teal"
                ml={2}
                mb={2}
                isLoading={renameLoading}
                onClick={handleRename}
              >
                Update
              </Button>
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add User to group"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            {loading ? (
              <Spinner size="lg" />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => handleAddUser(user)}
                />
              ))
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={()=>handleRemove(user) }>
              Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default UpdateGroupChatModal
