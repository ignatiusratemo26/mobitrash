import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import HelpSupport from './pages/HelpSupport';
import Payments from './pages/Payments';
import PickupRequests from './pages/PickupRequests';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="pickup_requests" element={<PickupRequests />} />
          <Route path="payments" element={<Payments />} />
          <Route path="help_support" element={<HelpSupport />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;




// import { RequestTable } from './components/RequestTable'
// import { Grid, GridItem, Show } from '@chakra-ui/react'
// import NavBar from './components/NavBar';
// import GameGrid from './components/GameGrid';
// import PickupTable from './components/PickupTable';


// function App() {
//   return (
//     <>
//     <Grid templateAreas={{
//       base: `"nav" "main"`,
//       lg: `"nav nav" "aside main"`,
//     }}>
//       <GridItem area='nav' bg='green'>
//         <NavBar />
//       </GridItem>
//       <Show above='lg'>
//         <GridItem area='aside'>Aside</GridItem>
//       </Show>
//       <GridItem area='main' >
//         {/* <GameGrid /> */}
//         <PickupTable />
//       </GridItem>
       
//     </Grid>
    
//     </>
//   );
// }

// export default App
