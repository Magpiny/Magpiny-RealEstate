import { useState } from "react";
import { useRouter } from "next/router";
import { Flex, Box, Text, Icon } from "@chakra-ui/react";
import { BsFilter } from "react-icons/bs";
import Image from "next/image";

import SearchFilters from "../components/SearchFilters";
import Property from "../components/Property";
import noresults from "../assets/missing.jpg";
import { fetchApi, baseUrl } from "../utils/fetchApi";

function Search({ properties }) {
  const [searchFilters, setSearchFilters] = useState(false);
  const router = useRouter();
  return (
    <Box>
      <Flex
        cursor="pointer"
        bg="gray.200"
        border="1px"
        borderColor="gray.200"
        p="2"
        fontWeight="black"
        fontSize="lg"
        justifyContent="center"
        alignItems="center"
        onClick={() => setSearchFilters((prevFilters) => !prevFilters)}
      >
        <Text color="blue.400">Search...</Text>
        <Icon w={7} as={BsFilter} paddingLeft="2.5" />
      </Flex>
      {searchFilters && <SearchFilters />}
      <Text fontSize="2xl" fontWeight="bold" p="4" color="blue.400">
        Properties {router.query.purpose}
      </Text>
      <Flex flexWrap="wrap">
        {properties.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </Flex>

      {properties.length == 0 && (
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
        </Flex>
      )}
    </Box>
  );
}

export default Search;

export async function getServerSideProps({ query }) {
  const purpose = query.purpose || "for-rent";
  const rentFrequency = query.rentFrequency || "yearly";
  const minPrice = query.minPrice || "0";
  const maxPrice = query.maxPrice || "1000000";
  const roomsMin = query.roomsMin || "0";
  const bathsMin = query.bathsMin || "0";
  const sort = query.sort || "price-desc";
  const areaMax = query.areaMax || "35000";
  const locationExternalIDs = query.locationExternalID || "5002";
  const categoryExternalIDs = query.categoryExternalID || "4";

  const data = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalIDs=${categoryExternalIDs}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&areaMax=${areaMax}&sort=${sort}`
  );

  return {
    props: {
      properties: data?.hits,
    },
  };
}
