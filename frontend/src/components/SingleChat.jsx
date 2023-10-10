import React from 'react'
import { ChatState } from '../context/ChatProvider'
import { Box, IconButton, Text } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { getSender, getSenderFull } from '../config/logics'
import ProfileModel from './miscellaneous/ProfileModel'
import UpdateGroupChatModal from './miscellaneous/UpdateGroupChatModal'

const SingleChat = ({fetchAgain,setFetchAgain}) => {
    const {user, selectedChat,setSelectedChat} = ChatState()
  return (
    <>{
        selectedChat?(<>
            <Text fontSize={{base: "28px", md:"30px"}}
            pb={3}
            px={2}
            w={"100%"}
            fontFamily={"Work sans"}
            display={"flex"}
            justifyContent={{base:"space-between"}}
            alignItems={"center"}>

                <IconButton
                display={{base:"flex", md:"none"}}
                icon={<ArrowBackIcon/>}
                onClick={()=>{
                    setSelectedChat("")
                }}>

                </IconButton>

                {!selectedChat.isGroupChat?(<>
                {getSender(user, selectedChat.users)}
                <ProfileModel user={getSenderFull(user, selectedChat.users)}/>
                </>
                ):(
                <>
                    {selectedChat.chatName.toUpperCase()}
                    <UpdateGroupChatModal fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>
                </>)}
            </Text>
            <Box 
                display={"flex"}
                flexDir={"column"}
                justifyContent={"flex-end"}
                p={3}
                bg={"#E8E8E8"}
                w={"100%"}
                h="90%"
                borderRadius={"lg"}
                overflowY={"hidden"}>

                </Box>
        
        </>):(<Box display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        h="100%"
        >
            <Text fontSize={{base:"0",md:"31"}} pb={3} fontFamily={"Work sans"}>Chat Here</Text>
        </Box>)
    }
      
    </>
  )
}

export default SingleChat
