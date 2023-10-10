import React from 'react'
import { Button,
     Center,
     IconButton, 
     Modal, 
     ModalBody,
      ModalCloseButton, 
      ModalContent,
       ModalFooter, 
       ModalHeader,
        ModalOverlay, 
        useDisclosure } from '@chakra-ui/react'
import { ViewIcon } from '@chakra-ui/icons';
import { Image,Text } from '@chakra-ui/react'

const ProfileModel = ({user,children}) => {
    const {isOpen,onOpen,onClose}=useDisclosure();
  return (
    <div>
      {children?
      (<span onClick = {onOpen}>{children}</span>):
      (<IconButton d={{base:"flex"}} icon={<ViewIcon/>} onClick={onOpen}
      />
      )}
      <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered motionPreset='slideInBottom'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
          fontSize={"40px"}
        //   fontFamily={"Work sans"}
          d="flex"
          justifyContent={"center"}>{user.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody 
          d="flex"
          flexDir="column"
          alignItems="center"
          justifyContent="space-between">
            <Center>
                    <Image
                borderRadius="full"
                boxSize="150px"
                src={user.pic}
                alt={user.name}
                />
            </Center>
            <Center>
                <Text fontSize={{base: "28px",md:"30px"}}
                fontFamily="Work sans">
                    {user.name}

                </Text>
            </Center>
            
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default ProfileModel
