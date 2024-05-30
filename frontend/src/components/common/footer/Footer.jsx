import React from 'react'
import './footer.css'

const Footer = () => {
    return (
        <footer>
            <nav className='footer-nav'>
                <ul>
                    <li>Početna</li>
                    <li>Dojavite vijest</li>
                    <li>Impressum</li>
                    <li>Komentari</li>
                    <li>Kontakt</li>
                    <li>O nama</li>
                    <li>Oglašavanje</li>
                    <li>Privatnost</li>
                    <li>Sigurnost</li>
                </ul>
            </nav>
            <div className='footer-social'>
                <p>Pratite nas</p>
                <a href=''><img src='/social/fb.svg' /></a>
                <a href=''><img src='social/x.svg' /></a>
                <a href=''><img src='social/ig.svg' /></a>
                <a href=''><img src='social/yt.svg' /></a>
                <a href=''><img src='social/li.svg' /></a>
                <a href='/rss'>RSS</a>
            </div>
            <div className='footer-copyright'>
                <p>Ovo je klon web portala Klix.ba izrađen u cilju usavršavanja vještina web developmenta. Sva prava zadržava Intersoft d.o.o.</p>
            </div>
        </footer>
    );
}

export default Footer;