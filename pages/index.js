import Link from "next/link";
import Image from "next/image";

import {baseUrl, fetchApi } from '../utils/fetchApi';
import Property from "../components/Property";

import { Flex, Box, Text, Button } from "@chakra-ui/react";


let Banner = ({purpose, title1, title2, desc1, desc2, buttonText, linkName, imgUrl }) => (
  <Flex flexWrap="wrap" justifyContent="center" alignItems="center" m="10">
    <Image src={imgUrl} width={500}  height={300}  alt="banner" />

    <Box>
      <Text color="gray.500" fontSize="3xl" fontWeight="medium">
        { purpose }
      </Text>
      <Text fontSize="2xl" fontWeight="bold">
        { title1 } <br />{title2}
      </Text>
      <Text color="gray.700" paddingTop={3} paddingBottom={6} fontSize="2xl" fontWeight="medium">
        { desc1 } <br />{desc2}
      </Text>
      <Button fontSize="xl" >
        
        <Link href={linkName}>{ buttonText }</Link>
        
      </Button>
    </Box>
  </Flex>
);

function Home({ propertyForRent, propertyForSale }){ 
  console.log(propertyForRent);
  return( 
      <Box>
        <Banner
          purpose="Rent a home"
          title1="Rental homes for"
          title12="Everyone"
          desc1 = "Explore apartments, villas, homes"
          desc2="and more"
          buttonText="Explore renting"
          linkName="/search?purpose=for-rent"
          imgUrl = "https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
          />

       <Flex flexWrap="wrap">
        { propertyForRent.map((property)=><Property property={property} key={property.id} />) }
       </Flex>

        <Banner
        purpose="Buy a home"
        title1="Find, buy and own"
        title12="your dream home"
        desc1 = "Explore apartments, villas, homes"
        desc2="and more"
        buttonText="Explore renting"
        linkName="/search?purpose=for-sale"
        imgUrl = "https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008"
        />

          <Flex flexWrap="wrap">
            { propertyForSale.map((property)=><Property property={property} key={property.id} />) }
          </Flex>
      </Box>
    
  );
};



export async function getStaticProps(){
  const propertyForSale = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`);
  const propertyForRent = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=10`);

  return {
    props:{
      propertyForRent: propertyForRent?.hits,
      propertyForSale: propertyForSale?.hits,
    }
  }
};

export default Home;
