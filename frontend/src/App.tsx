// import { RequestTable } from './components/RequestTable'
import { Grid, GridItem, Show } from '@chakra-ui/react'
import NavBar from './components/NavBar';
import GameGrid from './components/GameGrid';
import PickupTable from './components/PickupTable';


function App() {
  return (
    <>
    <Grid templateAreas={{
      base: `"nav" "main"`,
      lg: `"nav nav" "aside main"`,
    }}>
      <GridItem area='nav' bg='green'>
        <NavBar />
      </GridItem>
      <Show above='lg'>
        <GridItem area='aside'>Aside</GridItem>
      </Show>
      <GridItem area='main' >
        {/* <GameGrid /> */}
        <PickupTable />
      </GridItem>
       
    </Grid>
    
    </>
  );
}

export default App
