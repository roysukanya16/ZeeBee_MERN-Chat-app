import { CloseIcon } from '@chakra-ui/icons'
import { Box, Spacer } from '@chakra-ui/react'
import React from 'react'

const UserBadgeItem = ({user,handleFunction}) => {
  return (
    <Box
    px={2}
    py={1}
    borderRadius={"lg"}
    m={1}
    mb={2}
    variant="solid"
    fontSize={16}
    color={"white"}
    backgroundColor="green"
    cursor={"pointer"}
    onClick={handleFunction}>
      {user.name}  <CloseIcon fontSize={10}/>
    </Box>
    
  )
}

export default UserBadgeItem
