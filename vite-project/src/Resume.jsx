import { useState } from 'react';
import './Home.css';
import { Link } from 'react-router-dom'; // Import Link

function App() {
  return (
    <>
      <main className="d-flex flex-column h-100 bg-light">
        {/* Navigation */}
        <nav className="navbar navbar-expand-lg navbar-light bg-white py-3">
          <div className="container px-5">
          <Link className="navbar-brand" to="/"> {/* Use Link for navigation */}
              <span className="fw-bolder text-primary">
                <i className="bi bi-laptop" style={{ fontSize: '2rem', color: '#000000' }}></i>
              </span>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
  <ul className="navbar-nav ms-auto mb-2 mb-lg-0 small fw-bolder">
    <li className="nav-item">
      <Link className="nav-link" to="/">Home</Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to="/resume">Resume</Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to="/projects">Projects</Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to="/contact">Contact</Link>
    </li>
  </ul>
</div>
          </div>
        </nav>
        {/* Page Content */}
        <div className="container px-5 my-5">
          <div className="text-center mb-5">
            <h1 className="display-5 fw-bolder mb-0">
              <span className="text-gradient d-inline">Resume</span>
            </h1>
          </div>
          <div className="row gx-5 justify-content-center">
            <div className="col-lg-11 col-xl-9 col-xxl-8">
              {/* Bio Section */}
              <section>
                <div className="text-center mb-4">
                  <h2 className="fw-bolder mb-0 fs-4">Bio</h2>
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
                                <a href="https://www.linkedin.com/in/cristian-nicolas-tambunan-4b30b5258" target="_blank" rel="noopener noreferrer">linkedin.com/in/cristian nicolas tambunan</a>
                              </div>
                            </div>
                            <div className="d-flex justify-content-between">
                              <div className="fw-bolder">GitHub</div>
                              <div className="text-muted">
                                <a href="https://github.com/CRISTIANNICOLASTAMBUNAN12" target="_blank" rel="noopener noreferrer">github.com/CristianTambunan</a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Education Section */}
              <section>
                <div className="text-center mb-4">
                  <h2 className="fw-bolder mb-0 fs-4">Education</h2>
                </div>
                {/* Education Card 1 */}
                <div className="card shadow border-0 rounded-4 mb-5">
        <div className="card-body p-5">
          <div className="row align-items-center gx-5">
            <div className="col text-center text-lg-start mb-4 mb-lg-0">
              <div className="bg-light p-4 rounded-4">
                <div className="text-secondary fw-bolder mb-2">2022 - Present</div>
                <div className="mb-2">
                  <div className="small fw-bolder">Institut Teknologi Del</div>
                  <div className="small text-muted">Sitoluama, Laguboti</div>
                </div>
                <div className="fst-italic">
                  <div className="small text-muted">Web Developer</div>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div>
                As a third-year Information Technology Diploma student at Del Institute of Technology, I have a keen interest in web development. My expertise includes designing, developing, and maintaining web applications. I use best practices such as scalable system design and efficient database management to deliver reliable solutions, enhance system performance, and improve user experience.
              </div>
            </div>
          </div>
        </div>
      </div>
              </section>
              {/* Divider */}
              <div className="pb-5"></div>
              {/* Skills Section */}
              <section>
                {/* Skillset Card */}
                <div className="card shadow border-0 rounded-4 mb-5">
                  <div className="card-body p-5">
                    {/* Professional skills list */}
                    <div className="mb-5">
                      <div className="d-flex align-items-center mb-4 text-center">
                        <div className="feature bg-primary bg-gradient-primary-to-secondary text-white rounded-3 me-3">
                          <i className="bi bi-tools"></i>
                        </div>
                        <h2 className="fw-bolder mb-0 fs-4">
                          <span className="d-inline">Professional Skills</span>
                        </h2>
                      </div>
                      <div className="row row-cols-1 row-cols-md-3 mb-4">
                        <div className="col">
                          <div className="d-flex align-items-center bg-light rounded-4 p-3 h-100">Web Developer</div>
                        </div>
                        <div className="col mb-4 mb-md-0">
                          <div className="d-flex align-items-center bg-light rounded-4 p-3 h-100">Programming Languages</div>
                        </div>
                        <div className="col mb-4 mb-md-0">
                          <div className="d-flex align-items-center bg-light rounded-4 p-3 h-100">Database Management</div>
                        </div>
                      </div>
                      <div className="row row-cols-1 row-cols-md-3">
                        <div className="col mb-4 mb-md-0">
                          <div className="d-flex align-items-center bg-light rounded-4 p-3 h-100">Debugging and Troubleshooting</div>
                        </div>
                        <div className="col mb-4 mb-md-0">
                          <div className="d-flex align-items-center bg-light rounded-4 p-3 h-100">Frameworks</div>
                        </div>
                        <div className="col">
                          <div className="d-flex align-items-center bg-light rounded-4 p-3 h-100">Microservices and APIs</div>
                        </div>
                      </div>
                    </div>
                    {/* Languages list */}
                    <div className="mb-0">
  <div className="d-flex align-items-center mb-4">
    <div className="feature bg-primary bg-gradient-primary-to-secondary text-white rounded-3 me-3">
      <i className="bi bi-code-slash"></i>
    </div>
    <h2 className="fw-bolder mb-0 fs-4">
      <span className="d-inline">Languages</span>
    </h2>
  </div>

  {/* Language Icons Section */}
  <div className="row row-cols-1 row-cols-md-3 mb-4">
    <div className="col mb-4 mb-md-0">
      <div className="d-flex align-items-center bg-light rounded-4 p-3 h-100">
        <i className="fab fa-cuttlefish language-icon me-2"></i>C
      </div>
    </div>
    <div className="col mb-4 mb-md-0">
      <div className="d-flex align-items-center bg-light rounded-4 p-3 h-100">
        <i className="fab fa-csharp language-icon me-2"></i>C#
      </div>
    </div>
    <div className="col">
      <div className="d-flex align-items-center bg-light rounded-4 p-3 h-100">
        <i className="fab fa-css3-alt language-icon me-2"></i>CSS
      </div>
    </div>
  </div>
  
  <div className="row row-cols-1 row-cols-md-3 mb-4">
    <div className="col mb-4 mb-md-0">
      <div className="d-flex align-items-center bg-light rounded-4 p-3 h-100">
        <i className="fab fa-java language-icon me-2"></i>Java
      </div>
    </div>
    <div className="col mb-4 mb-md-0">
      <div className="d-flex align-items-center bg-light rounded-4 p-3 h-100">
        <i className="fab fa-js-square language-icon me-2"></i>JavaScript
      </div>
    </div>
    <div className="col">
      <div className="d-flex align-items-center bg-light rounded-4 p-3 h-100">
        <i className="fab fa-golang language-icon me-2"></i>Golang
      </div>
    </div>
  </div>

  <div className="row row-cols-1 row-cols-md-3 mb-4">
    <div className="col mb-4 mb-md-0">
      <div className="d-flex align-items-center bg-light rounded-4 p-3 h-100">
        <i className="fab fa-php language-icon me-2"></i>PHP
      </div>
    </div>
    <div className="col mb-4 mb-md-0">
      <div className="d-flex align-items-center bg-light rounded-4 p-3 h-100">
        <i className="fas fa-database language-icon me-2"></i>SQL
      </div>
    </div>
    <div className="col">
      <div className="d-flex align-items-center bg-light rounded-4 p-3 h-100">
        <i className="fab fa-python language-icon me-2"></i>Python
      </div>
    </div>
  </div>

  <div className="row row-cols-1 row-cols-md-3 mb-4">
    <div className="col mb-4 mb-md-0">
      <div className="d-flex align-items-center bg-light rounded-4 p-3 h-100">
        <i className="fas fa-code language-icon me-2"></i>Dart
      </div>
    </div>
  </div>    
</div>

                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-white py-4 mt-auto">
        <div className="container px-5">
          <div className="row justify-content-center">
            <div className="col-auto">
              <div className="small m-0">Copyright &copy; Cristian</div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
