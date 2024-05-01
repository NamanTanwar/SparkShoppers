import React from 'react';
import { FaFacebook } from "react-icons/fa6";
import { RiTwitterXLine } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";

const Footer=()=>{
    return (
        <div className="flex flex-row justify-center space-x-6 bg-slate-800 text-white p-4">

            <div className="flex flex-col items-center space-y-2">
                
                <h2 className="text-2xl">Exclusive</h2>
                <h4>Subscribe</h4>
                <p>Get 10% off your first order</p>
                <textarea placeholder="Enter Your Email"></textarea> 
            
            </div>

            <div className="flex flex-col items-center space-y-2">
                
                <h2 className="text-2xl">Support</h2>
                <p>Block C-12,Flat No-20 Near Harihar Mandir<br/>Vikasnagar Shimla</p>
                <p>namantanwar886@gmail.com</p>
                <p>1234567890</p>

            </div>

            <div className="flex flex-col items-center space-y-2">

                <h2> My Account</h2>
                <p>Login/Register</p>
                <p>Cart</p>
                <p>Wishlist</p>
                <p>Shop</p>

            </div>

            <div className="flex flex-col items-center space-y-2">

                <h2>Quick Link</h2>
                <p>Privacy Policy</p>
                <p>Terms Of Use</p>
                <p>FAQ</p>
                <p>Contact</p>

            </div>

            <div className="flex flex-col items-center space-y-8">

                <h2>Follow Us on Social Media</h2>
                <p className="pl-4">Follow us on Socail Media and Never miss an update </p>

                <div className="flex flex-row space-x-2 justify-center">

                    <FaFacebook />
                    <RiTwitterXLine />
                    <FaInstagram />
                    <FaLinkedin />

                </div>

            </div>
        </div>
    )
}

export default Footer