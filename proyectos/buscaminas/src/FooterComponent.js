import React from 'react';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap-social/bootstrap-social.css';
import './App.css';

function Footer(props) {
   return(
   <div className="footer">
       <div className="container">
           <div className="row justify-content-center">
               <div className="col-4 offset-1 col-sm-2">
                   <h5>Menú</h5>
                   <ul className="list-unstyled">
                       <li><a href="#">Inicio</a></li>
                       <li><a href="#">Sobre mí</a></li>
                       <li><a href="contacto.html">Contacto</a></li>
                   </ul>
               </div>
               <div className="col-7 col-sm-5">
                   <h5>¿Dónde estoy?</h5>
                   <address>
 	             Calle Mina<br />
 	             nº 8<br />
 	             ANDALUCÍA<br />
 	             <i className="fa fa-phone fa-lg"></i>: +123456789<br />
 	             <i className="fa fa-fax fa-lg"></i>: +123456789<br />
 	             <i className="fa fa-envelope fa-lg"></i>: <a href="mailto:rafaelcarrillobonilla@gmail.com">
                        rafaelcarrillobonilla@gmail.com</a>
                   </address>
               </div>
               <div className="col-12 col-sm-4 align-self-center">
               
                   <div className="text-center">
                       
                       <a className="btn btn-social-icon btn-facebook" href="#"><i className="fa fa-facebook"></i></a>
                       <a className="btn btn-social-icon btn-linkedin" target="_blank" href="https://www.linkedin.com/in/rafael-carrillo-bonilla-a6a3bb177/"><i className="fa fa-linkedin"></i></a>
                       <a className="btn btn-social-icon btn-twitter" href="#"><i className="fa fa-twitter"></i></a>
                       <a className="btn btn-social-icon btn-google" href="#"><i className="fa fa-youtube"></i></a>
                       
                   </div>
               </div>

           </div>
           <div className="row justify-content-center">
               <div className="col-auto">
                   <p><strong>RAFAEL CARRILLO BONILLA</strong></p>
               </div>
           </div>
       </div>
   </div>
   )
}

export default Footer;