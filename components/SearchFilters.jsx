import { useEffect, useState } from 'react';
import { Flex, Box, Select, Text, Spinner, Input, Icon } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { MdCancel } from 'react-icons/md';
import Image from 'next/image';

import { filterData, getFilterValues } from '../utils/filterData';
import { filterProps } from 'framer-motion';

const SearchFilters = () => {
  const [filters, setFilters ] = useState(filterData);
  const router = useRouter();
  const searchProperties = (filterValues) => {
      const path = router.pathname;
      const { query } = router;

      const values = getFilterValues(filterValues);

      values.forEach((item)=>{
        if(item.value && filterValues?.[item.name]){
          query[item.name] = item.value
        }
      });
    
    router.push({pathname:path, query})
  };
  return (
    <Flex p="4" justifyContent="center" backgroundColor="gray.200" color="blue.400" flexWrap="wrap">
        {
            filters.map((filter)=>(
                <Box key={filter.queryNmae}>
                    <Select 
                    placeholder={ filter.placeholder }
                    w="fit-content"
                    p="2.5"
                    onChange={(e)=>searchProperties({ [filter.queryName]: e.target.value })}
                    >
                        {
                            filter?.items?.map((item)=>(
                                <option value={item.value} key={item.value} >{ item.name }</option>
                            ))
                        }

                    </Select>
                </Box>
            ))
        }
    </Flex>
  )
};

export default SearchFilters;
