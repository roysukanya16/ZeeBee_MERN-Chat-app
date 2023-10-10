import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import axios from'axios'
import {useNavigate } from 'react-router-dom'

const Login = () => {
  const [show, setShow] = useState(false)
    const [email,setEmail] = useState()
    const [password,setPassword] = useState()
    const [loading, setLoading] = useState(false)
    const toast = useToast()
    const navigate=useNavigate()


    const handleClick = ()=>setShow(!show);

    const submitHanler=()=>{
        setLoading(true)
        if(!email||!password){
            toast({
                title: "All fields are required",
                status: "warning",
                duration: 3000,
                isClosable: true,
                position: "bottom",
            })
                setLoading(false)
                return
        }else{
             try{
                axios.post("/api/user/login", { email, password})
                .then((response)=>{
                    console.log("api/user/login-response: ",response)
                    if (response.status >= 200 && response.status < 300) {
                            // Assuming the response data is already JSON
                            const data = response.data;

                            // Store the data in local storage as a JSON string
                            localStorage.setItem("userInfo", JSON.stringify(data));

                            // Display a success message
                            toast({
                                title: "Login Successful",
                                status: "success",
                                duration: 3000,
                                isClosable: true,
                                position: "bottom",
                            });

                            // Navigate to the desired location (assuming navigate is a valid function)
                            setLoading(false);
                            navigate('/chats');
                        }
             }).catch((error)=>{
                toast({
                    title: "Invalid Email Or Password",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                    position: "bottom"
                })
                setLoading(false)
            }
             )
            }catch(error){
                toast({
                    title: "ERROR !!",
                    description: error.response.data.message,                    status: "error",
                    duration: 3000,
                    isClosable: true,
                    position: "bottom",
                });
            setLoading(false);

            }
        }

    }
    
  return (
    <VStack spacing={"5px"}>
        <FormControl id='email' isRequired>
            <FormLabel>Email</FormLabel>
                <Input 
                placeholder='Enter Your Email'
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                >
                </Input>
        </FormControl>
        <FormControl id='password' isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
                <Input 
                type={show?"text":'password'}
                placeholder='Password'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                >
                </Input>
                <InputRightElement width={"4.5rem"}>
                <Button h={"1.75rem"} size="sm" onClick={handleClick}> 
                    {show ? "Hide":"Show"}
                </Button>
                </InputRightElement>
            </InputGroup>
        </FormControl>
        <Button
        width={"100%"}
        style={{marginTop:15}}
        onClick={submitHanler}>
            Login
        </Button>
        <Button
        variant={"solid"}
        colorScheme='red'
        width={"100%"}
        style={{marginTop:15}}
        isLoading={loading}
        onClick={()=>{
            setEmail("guest@eample.com");
            setPassword("123456")

        }}>
            Get Guest User Credentials
        </Button>

    </VStack>
  )
}

export default Login
