import { Box, Text } from '@chakra-ui/react';


function Footer() {
  return (
    <Box textAlign="center" p="5" color="blue.400" borderTop="2px" borderColor="gray.200">
          <Text fontSize="3xl">{ new Date().getFullYear() } Magpiny Inc</Text>
    </Box>
  )
}

export default Footer;