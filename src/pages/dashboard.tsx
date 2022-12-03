import { Badge, Box, Flex, IconButton } from '@chakra-ui/react';
import copy from 'copy-to-clipboard';


import { IoMdWallet } from "react-icons/io";
import {FiCopy} from "react-icons/fi";

export default function Dashboard() {
  return (
    <Flex
      h={'100vh'}
      bgColor={'#252528'}
      w={'full'}
      justifyContent={'center'}
      alignItems={'center'}
    >
        
        <Box bg= "#c9f99c" h='50%' w='100%' p={4} borderRadius='3xl'overflow='hidden' boxSize='60vh' mt={-400} color='black'>
        <IconButton pt={0} pl={300}  variant='outline' fontSize='30px' h='50%' w='100%' aria-label='Wallet icon' icon={<IoMdWallet />}></IconButton>
<Box  w='100%'  pl={4} fontSize='xl' fontWeight='bold' color='black'><Badge bg= "#c9f99c" fontSize='2em' color='black' >$ 500</Badge></Box>
<Box  w='100%' pt={75} pl={110}><Badge bg= "#c9f99c" fontSize='12px' fontWeight={0.8}>Wallet Address</Badge></Box>
<Box  w='100%' pt={0} mt="-1" pl={118}><Badge bg= "#c9f99c" fontSize='12px' as={'p'} className="txt">0x124...36484</Badge><IconButton mt={-50} ml={-3} variant='outline' fontSize='10px' h='50%' w='100%' aria-label='Copy icon' onClick={()=>{
    
    copy("Text");}} icon={<FiCopy />}></IconButton></Box>
</Box>
    </Flex>
  );
};