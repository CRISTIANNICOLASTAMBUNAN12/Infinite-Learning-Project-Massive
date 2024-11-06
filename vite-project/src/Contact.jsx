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
      <section className="py-5">
      <div className="container px-5">
        {/* Contact form */}
        <div className="rounded-4 py-5 px-4 px-md-5">
          <div className="text-center mb-5">
            <div className="feature bg-primary bg-gradient-primary-to-secondary text-white rounded-3 mb-3">
              <i className="bi bi-envelope"></i>
            </div>
            <h1 className="fw-bolder">Get in touch</h1>
            <p className="lead fw-normal text-muted mb-0">Let's work together!</p>
          </div>
          {/* Bio Card */}
          <div className="card shadow border-0 rounded-4 mb-5">
            <div className="card-body p-5">
              <div className="row align-items-center gx-5">
                <div className="col text-center text-lg-start mb-4 mb-lg-0">
                  <div className="bg-light p-4 rounded-4">
                    <div className="d-flex flex-column">
                      <div className="d-flex justify-content-between mb-2">
                        <div className="fw-bolder">Name</div>
                        <div className="text-muted">Cristian Nicolas Tambunan</div>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <div className="fw-bolder">Phone</div>
                        <div className="text-muted">+6281263206428</div>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <div className="fw-bolder">Email</div>
                        <div className="text-muted">
                          <a href="mailto:cristiannicolastambunan@gmail.com">cristiannicolastambunan@gmail.com</a>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <div className="fw-bolder">LinkedIn</div>
                        <div className="text-muted">
                          <a
                            href="https://www.linkedin.com/in/cristian-nicolas-tambunan-4b30b5258"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            linkedin.com/in/cristian-nicolas-tambunan
                          </a>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <div className="fw-bolder">GitHub</div>
                        <div className="text-muted">
                          <a
                            href="https://github.com/CRISTIANNICOLASTAMBUNAN12"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            github.com/CristianTambunan
                          </a>
                        </div>
                      </div>
                     
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

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
