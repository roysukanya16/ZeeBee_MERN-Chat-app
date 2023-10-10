// ChatPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ChatState } from '../context/ChatProvider';
import { Box, Flex } from '@chakra-ui/react';
import SideDrawer from '../components/miscellaneous/SideDrawer';
import Mychats from '../components/Mychats';
import Chatbox from '../components/Chatbox';

function ChatPage() {
  const {user} = ChatState()
  const [fetchAgain, setFetchAgain] = useState(false)
  return (
    <div style = {{width: "100%"}}>
    {user&&<SideDrawer/>}

      <Box display="flex" justifyContent="space-between" w="100%" h="100vh" p="10px">
      {user && (<Mychats fetchAgain={fetchAgain}/>)}
      
      {user && <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
    </Box>
    
    </div>
);

}

export default ChatPage;
