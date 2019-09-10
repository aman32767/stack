import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from './SideDrawer.css'
import Aux from '../../../hoc/Aux/Aux'
import Backdrop from '../../UI/Backdrop/Backdrop'
const sideDrawer = props => {
  let attachedClasses=[classes.SideDrawer,classes.Close];
  console.log(props.open)
  if(props.open){
      attachedClasses = [classes.SideDrawer, classes.Open];
  }
    return(
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <Logo height="11%" />
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
        
    )
}

export default sideDrawer;