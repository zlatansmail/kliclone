import React from "react";
import '../App.css'
import NavItem from "../atoms/NavItem";


const Navigation = () => {
  return (
    <div className="navigation-wrapper">
      <div className='nav-items-wrapper'>
        <div className="logo-wrapper"><img id='logo' src='logo.png' alt="klix logotip" /></div>
        <NavItem content='Vijesti' link='/vijesti'/>
        <NavItem content='Biznis' link='/biznis'/>
        <NavItem content='Sport' link='/sport'/>
        <NavItem content='Magazin' link='/magazin'/>
        <NavItem content='Lifestyle' link='/lifestyle'/>
        <NavItem content='Scitech' link='/scitech'/>
        <NavItem content='Auto' link='/auto'/>
        <NavItem content='Križaljka' link='/krizaljka'/>
        <NavItem content='Posao' link='/posao'/>
        <NavItem content='Forum' link='/forum'/>
        <></>
      </div>
    </div>
  );
}
export default Navigation

