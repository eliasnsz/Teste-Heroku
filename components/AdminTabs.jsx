import { border, Flex, Icon, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { FaSearch, FaRegClock } from 'react-icons/fa'
import { BiAddToQueue } from 'react-icons/bi'
import Reservations from "./AdminPage/Reservations";


export default function AdminTabs({ tabOne, tabTwo, tabThree }) {
  return (
    <Tabs variant='unstyled' size="sm">
      <TabList bg="brown.200" p={2} borderRadius="lg" > 
        <Flex w="100%">
          <Tab w="100%" borderRadius="md" _selected={{ bgColor: "brown.100" }}>
            <Icon boxSize={3.5} color="brown.1000" as={FaSearch}/>
          </Tab>
          <Tab w="100%" borderRadius="md" _selected={{ bgColor: "brown.100" }}>
            <Icon boxSize={4} as={BiAddToQueue}/>
          </Tab>
          <Tab w="100%" borderRadius="md" _selected={{ bgColor: "brown.100" }}>
            <Icon boxSize={3.5} as={FaRegClock}/>
          </Tab>
        </Flex>
      </TabList>
      <TabPanels>
        <TabPanel>
          {tabOne}
        </TabPanel>
        <TabPanel>
          {tabTwo}
        </TabPanel>
        <TabPanel>
          {tabThree}
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}