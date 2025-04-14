import React from 'react'

function App() {
  return (
    <div className="app">
      <header>
        <h1>Abhishek Sur</h1>
        <p>MBA (XLRI Jamshedpur) | B.Tech (NIT Durgapur)</p>
      </header>
      
      <main>
        <section>
          <h2>About</h2>
          <p>Experienced professional with leadership in supply chain strategy, finance, and wealth management.</p>
        </section>
        
        <section>
          <h2>Contact</h2>
          <p>Email: abhisheksur429@gmail.com</p>
          <p>Location: Kolkata, India</p>
        </section>
      </main>
      
      <footer>
        <p>&copy; {new Date().getFullYear()} Abhishek Sur. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App