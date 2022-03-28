import React from "react";
import { Box, Flex, Text, Avatar } from "@chakra-ui/react";
import { FaBath, FaBed, FaBirth } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import { millify } from "millify";

import { fetchApi, baseUrl } from "../../utils/fetchApi";
import ImageScrollbar from "../../components/ImageScrollbar";

const propertyDetails = ({
  propertyDetails: {
    price,
    rooms,
    title,
    photos,
    area,
    baths,
    rentFrequency,
    agency,
    isVerified,
    description,
    type,
    furnishingStatus,
    amenities,
  },
}) => {
  return (
    <Box margin="auto" p="4" maxWidth="1000px">
      {photos && <ImageScrollbar data={photos} />}
      <Flex paddingTop={2} alignItems="center">
        <Box paddingRight={3} color="green.400">
          {isVerified && <GoVerified />}
        </Box>

        <Flex alignItems="center">
          <Text fontWeight="bold" fontSize="lg" color="blue.400">
            AED {millify(price)} {rentFrequency && `/${rentFrequency}`}
          </Text>
          <Box>
            <Avatar size="sm" src={agency?.logo?.url} />
          </Box>
        </Flex>
      </Flex>
      <Flex
        alignItems="center"
        p="1"
        justifyContent="space-between"
        w="250px"
        color="blue.400"
      >
        {rooms}
        <FaBed /> | {baths} <FaBath /> | {millify(area)} <BsGridFill />
      </Flex>
      <Box fontSize="lg" fontWeight="bold" marginTop={2}>
        <Text fontFamily="helvetica">{title}</Text>
      </Box>
      <Box marginTop={3}>
        <Text
          padding={3}
          borderRadius={5}
          lineHeight="2"
          justifyContent="space-evenly"
          backgroundColor="gray.200"
        >
          {description}
        </Text>
      </Box>
      <Box mg="1">
        <Flex
          margin={10}
          fontWeight="black"
          justifyContent="space-between"
          fontSize="3xl"
        >
          <Text
            fontFamily="monospace"
            borderRadius={5}
            padding={4}
            backgroundColor="gray.200"
          >
            Type : {type}
          </Text>

          {furnishingStatus && (
            <Text
              fontFamily="monospace"
              borderRadius={5}
              padding={4}
              backgroundColor="gray.200"
            >
              {" "}
              Furnishing Status: {furnishingStatus}
            </Text>
          )}
        </Flex>
      </Box>

      <Box>
        {amenities.length && (
          <Text
            marginTop={5}
            fontSize="2xl"
            fontWeight="extrabold"
            color="blue.400"
          >
            Amenities
          </Text>
        )}
      </Box>
      <Box>
        <Flex
          flexWrap="wrap"
          borderRadius={12}
          padding={5}
          justifyContent="space-evenly"
          backgroundColor="gray.100"
        >
          {amenities.map((item) =>
            item.amenities.map((amenity) => (
              <Text
                backgroundColor="whiteAlpha.900"
                color="blue.400"
                mg="2"
                fontFamily="body"
                padding={2}
                borderRadius={6}
                fontSize="lg"
                fontWeight="bold"
                key={amenity.text}
                marginBottom="5"
              >
                {amenity.text}
              </Text>
            ))
          )}
        </Flex>
      </Box>
    </Box>
  );
};

export default propertyDetails;

export async function getServerSideProps({ params: { id } }) {
  const data = await fetchApi(`${baseUrl}/properties/detail?externalID=${id}`);
  return {
    props: {
      propertyDetails: data,
    },
  };
}
