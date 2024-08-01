import { HStack, Image, Text } from '@chakra-ui/react'
import logo from '../assets/react.svg'
import ColorModeSwitch from './ColorModeSwitch';

const NavBar = () =>{
    return(
        <HStack>
            <Image src={logo} boxSize='60px'/>
            <Text>Navbar</Text>

            <ColorModeSwitch />
        </HStack>
    )
}
export default NavBar;