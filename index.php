<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <title>Rafael Carrillo Bonilla</title>
        <link rel="icon" type="image/x-icon" href="assets/img/favicon.ico" />
        <script src="https://use.fontawesome.com/releases/v5.15.4/js/all.js" crossorigin="anonymous"></script>
        <link href="https://fonts.googleapis.com/css?family=Saira+Extra+Condensed:500,700" rel="stylesheet" type="text/css" />
        <link href="https://fonts.googleapis.com/css?family=Muli:400,400i,800,800i" rel="stylesheet" type="text/css" />
        <link href="css/styles.css" rel="stylesheet" />
    </head>
    <body id="page-top">
        <!-- Navigation-->
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top" id="sideNav">
            <a class="navbar-brand js-scroll-trigger" href="#page-top">
                <span class="d-block d-lg-none">RAFAEL CARRILLO BONILLA</span>
                <span class="d-none d-lg-block"><img class="img-fluid img-profile rounded-circle mx-auto mb-2" src="assets/img/profile.jpg" alt="..." /></span>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
            <div class="collapse navbar-collapse" id="navbarResponsive">
                <ul class="navbar-nav">
                    <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#about">SOBRE MÍ</a></li>
                    <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#experience">EXPERIENCIA</a></li>
                    <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#education">EDUCACIÓN</a></li>
                    <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#skills">HABILIDADES</a></li>
                    <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#interests">INTERESES</a></li>
                    <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#awards">CERTIFICACIONES</a></li>
                    <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#proyectos">MIS PROYECTOS</a></li>
                </ul>
            </div>
        </nav>
        <div class="container-fluid p-0">
            <!-- SOBRE MÍ-->
            <section class="resume-section" id="about">
                <div class="resume-section-content">
                    <h1 class="mb-0">
                        RAFAEL
                        <span class="text-primary">CARRILLO BONILLA</span>
                    </h1>
                    <div class="subheading mb-5">
                        Calle Maria Rosa nº47A 1º · San Pedro Alcántara, Marbella 29670 · (+34) 691 246 323 ·
                        <a href="mailto:rafaelcarrillobonilla@gmail.com">rafaelcarrillobonilla@gmail.com</a>
                    </div>
                    <?php
                        $nacimiento="1998-03-08";
                        $fecha = time() - strtotime($nacimiento);
                        $edad = floor($fecha / 31556926);
                    ?>
                    <p class="lead mb-5">Soy un chico de <?php echo $edad;?> años, desarrollador web y técnico en sistemas micro informáticos y redes. Tengo experiencia en el trato con personas al público y estoy enfocado tanto en la parte de front-end como de back-end, aunque personalmente me gusta algo más la parte de front-end.</p>
                    <div class="social-icons">
                        <a class="social-icon" target="_blank" href="https://www.linkedin.com/in/rafael-carrillo-bonilla/"><i class="fab fa-linkedin-in"></i></a>
                        <a class="social-icon" target="_blank" href="https://github.com/rafacb98"><i class="fab fa-github"></i></a>
                    </div>
                </div>
            </section>
            <hr class="m-0" />
            <!-- EXPERIENCIA -->
            <section class="resume-section" id="experience">
                <div class="resume-section-content">
                    <h2 class="mb-5">Experiencia</h2>
                    <div class="d-flex flex-column flex-md-row justify-content-between mb-5">
                        <div class="flex-grow-1">
                            <h3 class="mb-0">Desarrollador web</h3>
                            <div class="subheading mb-3">Grupo Puya</div>
                            <p>Diseño y desarrollo de web y tienda de la empresa</p>
                        </div>
                        <div class="flex-shrink-0"><span class="text-primary">Octubre 2021 - Actualidad</span></div>
                    </div>
                    <div class="d-flex flex-column flex-md-row justify-content-between mb-5">
                        <div class="flex-grow-1">
                            <h3 class="mb-0">Desarrollador de front-end</h3>
                            <div class="subheading mb-3">Kibo Studios (Prácticas)</div>
                            <p>Desarrollo, maquetación y diseño de páginas web y de tiendas online - Creación de temas de Wordpress de cero - Creación de temas de Wocommerce de cero - Manejo de módulos, plugins y herramientas de Wordpress - Maquetación de emails
</p>
                        </div>
                        <div class="flex-shrink-0"><span class="text-primary">Septiembre 2020 - Diciembre 2020</span></div>
                    </div>
                    <div class="d-flex flex-column flex-md-row justify-content-between mb-5">
                        <div class="flex-grow-1">
                            <h3 class="mb-0">Técnico informático (Prácticas)</h3>
                            <div class="subheading mb-3">PCEstudio</div>
                            <p>Atención al cliente en público - Venta de productos informáticos - Reparación de equipos y periféricos informáticos - Reparación de móviles -  Manejo de Wordpress y Woocommerce - Atención y asistencia remota al cliente</p>
                        </div>
                        <div class="flex-shrink-0"><span class="text-primary">Marzo 2018 - Junio 2018</span></div>
                    </div>
                </div>
            </section>
            <hr class="m-0" />
            <!-- EDUCACIÓN-->
            <section class="resume-section" id="education">
                <div class="resume-section-content">
                    <h2 class="mb-5">Educación</h2>
                    <div class="d-flex flex-column flex-md-row justify-content-between mb-5">
                        <div class="flex-grow-1">
                            <h3 class="mb-0">I.E.S Mar de Alborán</h3>
                            <div class="subheading mb-3">FORMACIÓN PROFESIONAL GRADO SUPERIOR</div>
                            <div>Desarrollo de aplicaciones web</div>
                            <p>Nota media: 7,9</p>
                        </div>
                        <div class="flex-shrink-0"><span class="text-primary">2018 - 2020</span></div>
                    </div>
                    <div class="d-flex flex-column flex-md-row justify-content-between">
                        <div class="flex-grow-1">
                            <h3 class="mb-0">I.E.S Salduba</h3>
                            <div class="subheading mb-3">FORMACIÓN PROFESIONAL GRADO MEDIO</div>
                            <div>Sistemas microinformáticos y redes</div>
                            <p>Nota media: 7,67</p>
                        </div>
                        <div class="flex-shrink-0"><span class="text-primary">2016 - 2018</span></div>
                    </div>
                    <br/><br/>
                    <div class="d-flex flex-column flex-md-row justify-content-between">
                        <div class="flex-grow-1">
                            <h3 class="mb-0">I.E.S Guadaiza</h3>
                            <div class="subheading mb-3">EDUCACIÓN SECUNDARIA OBLIGATORIA</div>
                            <p>Nota media: 7,26</p>
                        </div>
                        <div class="flex-shrink-0"><span class="text-primary">2012 - 2016</span></div>
                    </div>
                </div>
            </section>
            <hr class="m-0" />
            <!-- HABILIDADES -->
            <section class="resume-section" id="skills">
                <div class="resume-section-content">
                    <h2 class="mb-5">Habilidades</h2>
                    <div class="subheading mb-3">Lenguajes & Herramientas</div>
                    <ul class="list-inline dev-icons">
                        <li class="list-inline-item"><i class="fab fa-html5"></i></li>
                        <li class="list-inline-item"><i class="fab fa-css3-alt"></i></li>
                        <li class="list-inline-item"><i class="fab fa-java"></i></li>
                        <li class="list-inline-item"><i class="fab fa-js-square"></i></li>
                        <li class="list-inline-item"><i class="fab fa-react"></i></li>
                        <li class="list-inline-item"><i class="fab fa-wordpress"></i></li>
                        <li class="list-inline-item"><i class="fab fa-php"></i></li>
                        <li class="list-inline-item"><i class="fab fa-bootstrap"></i></li>
                        <li class="list-inline-item"><i class="fab fa-aws"></i></li>
                    </ul>
                    <div class="subheading mb-3">Flujo de trabajo</div>
                    <ul class="fa-ul mb-0">
                        <li>
                            <span class="fa-li"><i class="fas fa-check"></i></span>
                            Mobile-First
                        </li>
                        <li>
                            <span class="fa-li"><i class="fas fa-check"></i></span>
                            Responsive Design
                        </li>
                        <li>
                            <span class="fa-li"><i class="fas fa-check"></i></span>
                            Testing & Debugging
                        </li>
                    </ul>
                </div>
            </section>
            <hr class="m-0" />
            <!-- INTERESES -->
            <section class="resume-section" id="interests">
                <div class="resume-section-content">
                    <h2 class="mb-5">Intereses</h2>
                    <p>Aparte de ser desarrollador web y técnico informatico, me encanta salir en mis tiempo libre y viajar y descubrir nuevos sitios. Me encanta
salir con mis amigos y hacer deporte, en especial el futbol.</p>
                    <p class="mb-0">Tambien me gusta mucho la magia, aunque no tengo mucho tiempo para ponerme con ella, pero cuando tengo la vena inspiradora, me gusta practicarla.
</p>
</br></br>
                    <p>Dispongo de las siguientes aptitudes y habilidades:
                    <ul>
                        <li>Carné de conducir, permiso B</li>
                        <li>Vehículo propio</li>
                        <li>Incorporación inmediata</li>
                        <li>Disponibilidad horaria</li>
                        <li>Responsabilidad e interés por el trabajo</li>
                        <li>Facilidad en el trato al público</li>
                        <li>Respeto, confianza y motivación</li>
                        <li>Abierto a cualquier oportunidad</li>
                        <li>Adaptación rápida</li>
                        <li>Trabajar en equipo</li>
                    </ul>
                </div>
            </section>
            <hr class="m-0" />
            <!-- CERTIFICADOS -->
            <section class="resume-section" id="awards">
                <div class="resume-section-content">
                    <h2 class="mb-5">CERTIFICACIONES</h2>
                    <ul class="fa-ul mb-0">
                        <li>
                            <span class="fa-li"><i class="fas fa-trophy text-warning"></i></span>
                            Inglés - Nivel B1 (Intermedio)
                        </li>
                        <li>
                            <span class="fa-li"><i class="fas fa-trophy text-warning"></i></span>
                            Curso de marketing digital - Certificado de Google (40H - 2017)
                        </li>
                        <li>
                            <span class="fa-li"><i class="fas fa-trophy text-warning"></i></span>
                            Curso de analítica web - Certificado de Google (40H - 2017)
                        </li>
                        <li>
                            <span class="fa-li"><i class="fas fa-trophy text-warning"></i></span>
                            Curso de comercio electrónico - Certificado de Google (40H - 2017)
                        </li>
                    </ul>
                </div>
            </section>
            <hr class="m-0" />
            <!-- PROYECTOS -->
            <section class="resume-section" id="proyectos">
                <div class="resume-section-content">
                    <h2 class="mb-5">Mis proyectos</h2>
                    <div class="d-flex flex-column flex-md-row justify-content-between mb-5 proyectos">
                    <img src="assets/img/logo_gestdgt+.png" alt="logogestdgt+" height="100px" class="logoproyectos" />
                        <div class="flex-grow-1">
                            <h3 class="mb-0">GestDGT+</h3>
                            <div class="subheading mb-3">Hecho mediante servicios PHP con el framework SLIM</div>
                            <p>Aplicación destinada tanto para conductores como para agentes de policia, donde cada uno puede realizar sus funciones en relación al tipo de usuario.</p>
                        </div>
                        <div class="flex-shrink-0"><a href="http://icarosproject.com/PROY/GESTDGT/" target="_blank" class="text-primary">Ir..</a></div>
                    </div>
                    <div class="d-flex flex-column flex-md-row justify-content-between mb-5 proyectos">
                    <img src="assets/img/logo_buscaminas.png" alt="logogbuscaminas" height="100px" class="logoproyectos" />
                        <div class="flex-grow-1">
                            <h3 class="mb-0">Buscaminas</h3>
                            <div class="subheading mb-3">Hecho mediante ReactJS</div>
                            <p>Mítico juego del buscaminas donde tienes unos puntos que vas sumando por desactivar y una serie de minas.</p>
                        </div>
                        <div class="flex-shrink-0"><a href="https://rafacb98.github.io/proyectos/buscaminas/index.html" target="_blank" class="text-primary">Ir..</a></div>
                    </div>
                    <div class="d-flex flex-column flex-md-row justify-content-between mb-5 proyectos">
                    <img src="assets/img/logo_demeter.jpg" alt="logodemeter" height="100px" class="logoproyectos" />
                        <div class="flex-grow-1">
                            <h3 class="mb-0">Demeter</h3>
                            <div class="subheading mb-3">Hecho mediante JavaScript</div>
                            <p>Juego con pseudocódigo en donde mediante órdenes vas moviendo el robot con el objetivo de desactivar todas las minas hasta llegar al final.</p>
                        </div>
                        <div class="flex-shrink-0"><a href="https://rafacb98.github.io/proyectos/demeter/index.html" target="_blank" class="text-primary">Ir..</a></div>
                    </div>

                </div>
            </section>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
        <script src="js/scripts.js"></script>
    </body>
</html>
