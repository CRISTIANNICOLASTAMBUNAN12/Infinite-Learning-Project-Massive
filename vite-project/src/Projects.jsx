import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom'; // Import Link

const App = () => {
  return (
    <div className="d-flex flex-column h-100 bg-light">
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white py-3">
        <div className="container px-5">
        <Link className="navbar-brand" to="/"> {/* Use Link for navigation */}
              <span className="fw-bolder text-primary">
                <i className="bi bi-laptop" style={{ fontSize: '2rem', color: '#000000' }}></i>
              </span>
            </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 small fw-bolder">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li> {/* Use Link */}
                <li className="nav-item"><Link className="nav-link" to="/resume">Resume</Link></li> {/* Use Link */}
                <li className="nav-item"><Link className="nav-link" to="/projects">Projects</Link></li> {/* Use Link */}
                <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li> {/* Use Link */}
            </ul>
          </div>
        </div>
      </nav>

      {/* Projects Section */}
      <main className="flex-shrink-0">
        <section className="py-5">
          <div className="container px-5 mb-5">
            <div className="text-center mb-5">
              <h1 className="display-5 fw-bolder mb-0"><span className="text-gradient d-inline">Projects</span></h1>
            </div>
            <div className="row gx-5 justify-content-center">
              <div className="col-lg-11 col-xl-9 col-xxl-8">
                {/* Project Card 1 */}
                <div className="card overflow-hidden shadow rounded-4 border-0 mb-5">
                  <div className="card-body p-0">
                    <div className="d-flex align-items-center">
                      <div className="p-5">
                        <h2 className="fw-bolder mb-0 fs-4">Information and Service Portal for Balige 2 Village</h2>
                        <p>In this project, I developed a comprehensive Information and Service Portal for Balige 2 Village aimed at improving the accessibility 
of village information and services for residents. This portal serves as a centralized platform providing various functionalities and 
information.</p>
                        <p className="text-muted fst-italic" style={{ fontSize: '0.85rem' }}>
                          <b>Technologies:</b> HTML, CSS, JavaScript, PHP, MySQL
                        </p>
                        <p className="text-muted fst-italic" style={{ fontSize: '0.85rem' }}>
                          <b>Github:</b>
                          <a href="https://github.com/CRISTIANNICOLASTAMBUNAN12/PA-1" target="_blank" rel="noopener noreferrer">
                          Information and Service Portal for Balige 2 Village
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Add more project cards as needed */}
              </div>
            </div>
            <div className="row gx-5 justify-content-center">
              <div className="col-lg-11 col-xl-9 col-xxl-8">
                {/* Project Card 1 */}
                <div className="card overflow-hidden shadow rounded-4 border-0 mb-5">
                  <div className="card-body p-0">
                    <div className="d-flex align-items-center">
                      <div className="p-5">
                        <h2 className="fw-bolder mb-0 fs-4">CIS Mobile-Based Application</h2>
                        <p>In this project, I developed a mobile-based application for CIS aimed at enhancing the accessibility and usability of CIS services for 
users. The application provides a user-friendly interface and various functionalities to facilitate user interactions with the CIS 
platform. </p>
                        <p className="text-muted fst-italic" style={{ fontSize: '0.85rem' }}>
                          <b>Technologies:</b>  Flutter, Dart, MySQL, PHP
                        </p>
                        <p className="text-muted fst-italic" style={{ fontSize: '0.85rem' }}>
                          <b>Github:</b>
                          <a href="https://github.com/CRISTIANNICOLASTAMBUNAN12/PAM_Proyek" target="_blank" rel="noopener noreferrer">
                          CIS Mobile-Based Application
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Add more project cards as needed */}
              </div>
            </div>
            <div className="row gx-5 justify-content-center">
              <div className="col-lg-11 col-xl-9 col-xxl-8">
                {/* Project Card 1 */}
                <div className="card overflow-hidden shadow rounded-4 border-0 mb-5">
                  <div className="card-body p-0">
                    <div className="d-flex align-items-center">
                      <div className="p-5">
                        <h2 className="fw-bolder mb-0 fs-4"> E-Commerce Website build Golang Programming with Microservice </h2>
                        <p>In this project, I developed an e-commerce website using Golang programming and a microservice architecture. The website 
supports various e-commerce functionalities including product listing, shopping cart, payment processing, and order management, 
aimed at providing a seamless shopping experience. </p>
                        <p className="text-muted fst-italic" style={{ fontSize: '0.85rem' }}>
                          <b>Technologies:</b> Golang, MySQL, PHP, Laravel ,JavaScript , CSS , Bootstrap 
                        </p>
                        <p className="text-muted fst-italic" style={{ fontSize: '0.85rem' }}>
                          <b>Github:</b>
                          <a href="https://github.com/CRISTIANNICOLASTAMBUNAN12/Project_Pasti_10" target="_blank" rel="noopener noreferrer">
                          E-Commerce Website build Golang Programming with Microservice 
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Add more project cards as needed */}
              </div>
            </div>
            <div className="row gx-5 justify-content-center">
              <div className="col-lg-11 col-xl-9 col-xxl-8">
                {/* Project Card 1 */}
                <div className="card overflow-hidden shadow rounded-4 border-0 mb-5">
                  <div className="card-body p-0">
                    <div className="d-flex align-items-center">
                      <div className="p-5">
                        <h2 className="fw-bolder mb-0 fs-4">Minimarket Desktop Application build Java Programming with OOP</h2>
                        <p>In this project, I developed a desktop application for a minimarket using Java programming with Object-Oriented Programming 
(OOP) principles. The application supports various functionalities such as inventory management, sales processing, and reporting, 
aiming to streamline the operations of the minimarket. </p>
                        <p className="text-muted fst-italic" style={{ fontSize: '0.85rem' }}>
                          <b>Technologies:</b> Java, JavaFX, MySQL, CSS  
                        </p>
                        <p className="text-muted fst-italic" style={{ fontSize: '0.85rem' }}>
                          <b>Github:</b>
                          <a href="https://github.com/CRISTIANNICOLASTAMBUNAN12/MinimarketManagementSystem" target="_blank" rel="noopener noreferrer">
                          Minimarket Desktop Application build Java Programming with OOP
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Add more project cards as needed */}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white py-4 mt-auto">
        <div className="container px-5">
          <div className="row justify-content-center">
            <div className="col-auto">
              <div className="small m-0">Copyright &copy; cristian</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
