import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [displayName, setDisplayName] = useState('');
  const fullName = "Elunar";

  useEffect(() => {
    // Typing effect for the name
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullName.length) {
        setDisplayName(fullName.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 200); // Adjust the typing speed here (milliseconds)

    return () => {
      clearInterval(typingInterval);
    };
  }, [fullName]);

  // Intersection Observer setup
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <div className="App">
      <main>
        <section className="hero">
          <h1 className="typing-effect">{displayName}</h1>
          <p className="typewriter">Coder & Crypto Enthusiast</p>
        </section>
        <section className="content-section about-section" ref={(el) => (sectionRefs.current[0] = el)}>
          <h2>About Me</h2>
          <p>I'm a passionate web developer with a keen eye for design and a love for creating intuitive user experiences.</p>
        </section>
        <section className="content-section" ref={(el) => (sectionRefs.current[1] = el)}>
          <h2>My Projects</h2>
          <div className="project-grid">
            <div className="project-card">
              <h3>Project 1</h3>
              <p>A brief description of project 1.</p>
            </div>
            <div className="project-card">
              <h3>Project 2</h3>
              <p>A brief description of project 2.</p>
            </div>
            <div className="project-card">
              <h3>Project 3</h3>
              <p>A brief description of project 3.</p>
            </div>
          </div>
        </section>
        <section className="content-section" ref={(el) => (sectionRefs.current[2] = el)}>
          <h2>Get in Touch</h2>
          <form>
            <input type="text" placeholder="Name" required />
            <input type="email" placeholder="Email" required />
            <textarea placeholder="Message" required></textarea>
            <button type="submit">Send</button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default App;