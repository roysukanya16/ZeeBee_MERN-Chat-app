import React, { useState } from 'react'
import { VStack, FormControl, FormLabel, Input, InputGroup, InputRightElement, Button} from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import axios from'axios'
import {useNavigate } from 'react-router-dom'

const Signup = () => {
    const [show, setShow] = useState(false)
    const [name,setName] = useState()
    const [email,setEmail] = useState()
    const [confirmPassword,setConfirmPassword] = useState()
    const [password,setPassword] = useState()
    const [pic,setPic] = useState()
    const [loading,setLoading]=useState(false)
    const toast = useToast()
    const navigate=useNavigate()


    const handleClick = ()=>setShow(!show);

    const postDetails=(pics)=>{
        setLoading(true)
        if(pics === undefined){
            toast({
                title: "Please Select an Image!",
                status: "warning",
                duration: 3000,
                isClosable: true,
                position: "bottom",

            })
            return
        }

        if(pics.type === "image/jpeg" || pics.type === "image/png"){
            const data = new FormData();
            data.append("file",pics)
            data.append("upload_preset","ZeeBee")
            data.append("cloud_name","dlzzicaex")
            fetch("https://api.cloudinary.com/v1_1/dlzzicaex/image/upload",{
                method: "post",
                body: data
            }).then((res)=>{
                res.status(200)}
                ).then(data=>{
                setPic(data.url.toString())
                console.log(data)
                setLoading(false)
            }).catch((err)=>{
                console.log("API call failed")
                console.log(err)
                setLoading(false);
            })
        }else{
            toast({
                title: "Please Select an Image!",
                status: "warning",
                duration: 3000,
                isClosable: true,
                position: "bottom",})
                setLoading(false)
                return
        }
    }


    const submitHanler=()=>{
        setLoading(true)
        if(!name ||!email||!password||!confirmPassword){
            toast({
                title: "All fields are required",
                status: "warning",
                duration: 3000,
                isClosable: true,
                position: "bottom",})
                setLoading(false)
                return
        }else{
            if(password!== confirmPassword){
                toast({
                title: "Make Sure The Passwords are same",
                status: "warning",
                duration: 3000,
                isClosable: true,
                position: "bottom",})
                setLoading(false)
                return
            }

            try{
                // const config = {
                // headers: {
                // "Content-type": "application/json",
                //     },
                // };

                axios.post("/api/user", { name, email, password, pic })
                .then((response) => {
                    console.log(response)
                    // Check if the response status is OK (status code 200)
                    if (response.status >= 200 && response.status < 300) {
                        // Assuming the response data is already JSON
                        const data = response.data;

                        // Store the data in local storage as a JSON string
                        localStorage.setItem("userInfo", JSON.stringify(data));

                        // Display a success message
                        toast({
                            title: "Registration Successful",
                            status: "success",
                            duration: 3000,
                            isClosable: true,
                            position: "bottom",
                        });

                        // Navigate to the desired location (assuming navigate is a valid function)
                        setLoading(false);
                        navigate('/chats');
                    }else {
                        // Handle unexpected response status here
                        toast({
                            title: "ERROR !!",
                            description: "Unexpected response status: " + response.status,
                            status: "error",
                            duration: 3000,
                            isClosable: true,
                            position: "bottom",
                        });
                        setLoading(false);
                    }
            }).catch((error)=>{
                toast({
                    title: "Email Id Already Exists !!",
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
                description: error.response.data.message,
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "bottom",})
                setLoading(false)
            }
        }
    }
    
  return (
    <VStack spacing={"5px"}>
        <FormControl id='first-name' isRequired>
            <FormLabel>Name</FormLabel>
                <Input 
                placeholder='Enter Your Name'
                onChange={(e)=>setName(e.target.value)}
                >
                </Input>
        </FormControl>
        <FormControl id='email' isRequired>
            <FormLabel>Email</FormLabel>
                <Input 
                placeholder='Enter Your Email'
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
        <FormControl id='confirm-password' isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup>
                <Input 
                type={show?"text":'password'}
                placeholder='Confirm Password'
                onChange={(e)=>setConfirmPassword(e.target.value)}
                >
                </Input>
                <InputRightElement width={"4.5rem"}>
                <Button h={"1.75rem"} size="sm" onClick={handleClick}> 
                    {show ? "Hide":"Show"}
                </Button>
                </InputRightElement>
            </InputGroup>
        </FormControl>
        <FormControl id='pic'>
            <FormLabel> Upload Your Picture</FormLabel>
                <Input 
                type='file'
                p={1.5}
                accept='image/*'
                onChange={(e)=>postDetails(e.target.files[0])}>
                </Input>
            
        </FormControl>
        <Button
        width={"100%"}
        style={{marginTop:15}}
        onClick={submitHanler}
        isLoading={loading}>
            Sign Up
        </Button>

    </VStack>
  )
}

export default Signup
