import { useContext } from 'react';
import Image from 'next/image';
import { Box, Icon, Flex, Text } from '@chakra-ui/react';
import { ScrollMenu, VisibilityContext, } from 'react-horizontal-scrolling-menu';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';

import noresults from '../assets/missing.jpg';
const LeftArrow = () => {
    const { scrollPrev } = useContext(VisibilityContext);

    return(
        <Flex justifyContent="center" alignItems="center" margin="1">
            <Icon
                as={FaArrowAltCircleLeft}
                onClick = {()=>scrollPrev()}
                fontSize="2xl"
                cursor="pointer"
                d={['none','none','none','block']}
            />
        </Flex>
    )
};
const RightArrow = () => {
        const { scrollNext } = useContext(VisibilityContext);

    return(
        <Flex justifyContent="center" alignItems="center" margin="1">
            <Icon
                as={FaArrowAltCircleRight}
                onClick = {()=>scrollNext()}
                fontSize="2xl"
                cursor="pointer"
                d={['none','none','none','block']}
            />
        </Flex>
    )
};

const ImageScrollbar = ({ data }) => {
    console.log(data)
  return (
    <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow} style={{overflow:"hidden"}}>
        {
            data.map((item)=>(
            <Box key={item.id} itemID={item.id} overflow="hidden" width={910} >
                <Image src={item.url} 
                        placeholder="blur"
                        alt="product description" 
                        blurDataURL={item.url} 
                        width="1000px"
                        height="500px"
                        sizes="(max-width:500px) 100px, (max-width:1024px) 500px, 1000px"
                        />
            </Box>))
        }

        {
        data.length == 0 && (
        <Flex
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Image src={noresults} width={500} height={500} alt="no results" />
          <Text
            fontSize="3xl"
            marginTop={3}
            marginBottom="3.5"
            color="blue.800"
            fontWeight="bold"
          >
            Sorry! No results found!
          </Text>
        </Flex>)
        }
    </ScrollMenu>
  )
}

export default ImageScrollbar;
