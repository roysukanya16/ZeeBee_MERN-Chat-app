import React from 'react'
import { ChatState } from '../../context/ChatProvider'
import { Avatar, Box, Flex, Text } from '@chakra-ui/react'

const UserListItem = ({user,handleFunction}) => {
    
  return (
    <div>
        <Flex
            onClick={handleFunction}
            cursor="pointer"
            bg="#d1ebd8"
            _hover={{
                background:"#93dba6",
                color:"white",
            }}
            // width={"100%"}
            color="black"
            px={3}
            py={2}
            mb={2}
            borderRadius="lg"
            >
            <Avatar
            mr={2}
            size="sm"
            cursor="pointer"
            name={user.name}
            src={user.pic}
            />
            <Box>
                <Text>{user.name}</Text>
                <Text fontSize="xs">
                    <b>Email: {user.email}</b>
                </Text>
            </Box>

            
        </Flex>
      
    </div>
  )
}

export default UserListItem
