import React from 'react'
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faLocationDot, faFile, faGraduationCap, faBriefcase, faChartLine, faLaptopCode } from '@fortawesome/free-solid-svg-icons'

// Import assets from local path
import headshot from './assets/image_1744639604456.png'

// Pages
const Home = () => (
  <>
    <HeroSection />
    <AboutSection />
    <ExperienceSection />
    <EducationSection />
    <CertificationsSection />
    <ContactSection />
  </>
);

const BlogPost = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <Link to="/" className="text-amber-500 hover:text-amber-600 mb-8 inline-block">
        &larr; Back to Home
      </Link>
      <article className="prose lg:prose-xl max-w-4xl mx-auto">
        <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
          How AI and Blockchain Are Reshaping the Life Insurance Industry: My Doctoral Research Journey
        </h1>
        <div className="text-gray-500 mb-8">April 15, 2025 • 6 min read</div>
        <p className="mb-4">
          We often hear how AI and blockchain are transforming finance, but the insurance sector—particularly life insurance—has long been considered a slow mover in the digital revolution. My doctoral research seeks to change that narrative.
        </p>
        <p className="mb-4">
          During my internship at Avendus Capital, I dove deep into India's life insurance space. I benchmarked top firms across 55 metrics, modeled valuation using regression logic, and uncovered a fascinating pattern: early adopters of digital tools were outperforming on both solvency and persistency metrics. That experience sparked a bigger question—what happens when we zoom out and look across countries?
        </p>
        <h2 className="font-serif text-2xl md:text-3xl font-semibold mt-8 mb-4">Research Focus</h2>
        <p className="mb-4">
          My research explores how AI and blockchain adoption influence the valuation and competitive strategy of life insurance firms across emerging and developed economies. I combine innovation diffusion theory and valuation models (Damodaran-style!) to analyze how technology affects embedded value, solvency ratios, and profitability.
        </p>
        <h2 className="font-serif text-2xl md:text-3xl font-semibold mt-8 mb-4">Methodology</h2>
        <p className="mb-4">
          Methodologically, I'll use a panel regression framework and construct adoption indices from firm disclosures and analyst reports. What excites me is not just the academic contribution, but how the results can help policymakers craft better tech regulations, and insurers rethink their digital playbooks.
        </p>
        <h2 className="font-serif text-2xl md:text-3xl font-semibold mt-8 mb-4">Personal Connection</h2>
        <p className="mb-4">
          This project is also deeply personal—it's a blend of strategy, technology, and finance, shaped by mentors who taught me to spot insights in unlikely places (like a "magic mirror" at a Raymond store!).
        </p>
        <h2 className="font-serif text-2xl md:text-3xl font-semibold mt-8 mb-4">Follow Along</h2>
        <p className="mb-4">
          Curious about the full proposal? Read it <a href="#" className="text-amber-500 hover:text-amber-600">here</a>.
          And stay tuned as I blog this journey, from datasets to defense.
        </p>
      </article>
    </div>
  );
};

const NotFound = () => (
  <div className="container mx-auto px-4 py-32 text-center">
    <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6">404</h1>
    <p className="text-xl mb-8">Page not found</p>
    <Link to="/" className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-4 rounded-md transition-colors">
      Return Home
    </Link>
  </div>
);

// Components
const Header = () => (
  <header className="py-6">
    <div className="container mx-auto px-4 flex justify-between items-center">
      <Link to="/" className="font-serif text-2xl font-bold">Abhishek Sur</Link>
      <nav>
        <ul className="flex space-x-6">
          <li><a href="#about" className="hover:text-amber-500 transition-colors">About</a></li>
          <li><a href="#experience" className="hover:text-amber-500 transition-colors">Experience</a></li>
          <li><a href="#education" className="hover:text-amber-500 transition-colors">Education</a></li>
          <li><a href="#contact" className="hover:text-amber-500 transition-colors">Contact</a></li>
          <li><Link to="/blog" className="hover:text-amber-500 transition-colors">Blog</Link></li>
        </ul>
      </nav>
    </div>
  </header>
);

const Footer = () => (
  <footer className="bg-gray-100 py-8">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-600 mb-4 md:mb-0">&copy; {new Date().getFullYear()} Abhishek Sur. All rights reserved.</p>
        <div className="flex space-x-4">
          <a href="https://www.linkedin.com/in/abhishek-sur/" target="_blank" rel="noopener noreferrer" className="text-amber-500 hover:text-amber-600 transition-colors">
            <FontAwesomeIcon icon={faLinkedin} size="lg" />
          </a>
          <a href="https://www.instagram.com/abhishek.sur.9/" target="_blank" rel="noopener noreferrer" className="text-amber-500 hover:text-amber-600 transition-colors">
            <FontAwesomeIcon icon={faInstagram} size="lg" />
          </a>
          <a href="mailto:abhisheksur429@gmail.com" className="text-amber-500 hover:text-amber-600 transition-colors">
            <FontAwesomeIcon icon={faEnvelope} size="lg" />
          </a>
        </div>
      </div>
    </div>
  </footer>
);

const HeroSection = () => (
  <section className="py-20 md:py-32 bg-gray-50">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Where Systems Meet Strategy and Curiosity
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            MBA (XLRI Jamshedpur) | B.Tech (NIT Durgapur) 
          </p>
          <p className="text-lg text-gray-700 mb-8">
            Transforming supply chains and financial strategies with data-driven insights and innovative approaches.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#contact" className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 px-6 rounded-md transition-colors">
              Get in Touch
            </a>
            <a href="#about" className="border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white font-medium py-3 px-6 rounded-md transition-colors">
              Learn More
            </a>
          </div>
        </div>
        <div className="md:w-1/2 md:pl-10">
          <img src={headshot} alt="Abhishek Sur" className="rounded-lg shadow-lg w-full max-w-md mx-auto" />
        </div>
      </div>
    </div>
  </section>
);

const AboutSection = () => (
  <section id="about" className="py-20">
    <div className="container mx-auto px-4">
      <h2 className="font-serif text-3xl md:text-4xl font-bold mb-12 text-center">About Me</h2>
      <div className="flex flex-col md:flex-row items-start gap-12">
        <div className="md:w-2/3">
          <p className="text-lg mb-6">
            I am a dedicated professional with experience in supply chain strategy, finance, and wealth management. My journey has been shaped by a passion for systems thinking and a curiosity for problem-solving at the intersection of business and technology.
          </p>
          <p className="text-lg mb-6">
            With a strategic approach to supply chain management, I've delivered AED 3M+ in savings and transformed operational efficiency. My finance and wealth management background provides me with a unique perspective on creating value through integrated business strategies.
          </p>
          <p className="text-lg mb-6">
            My academic journey through XLRI Jamshedpur (MBA) and NIT Durgapur (B.Tech) has equipped me with a solid foundation in analytics, strategy development, and leadership. I've complemented this with specialized coursework in AI/ML and statistics to stay at the forefront of data-driven decision making.
          </p>
          <p className="text-lg">
            I believe in continuous learning and applying diverse perspectives to complex business challenges. When I'm not working, you'll find me exploring behavioral economics, practicing mindfulness, and engaging with emerging technologies.
          </p>
        </div>
        <div className="md:w-1/3 bg-gray-50 p-8 rounded-lg">
          <h3 className="font-serif text-xl font-semibold mb-4">Core Competencies</h3>
          <ul className="space-y-3">
            <li className="flex items-center">
              <span className="bg-amber-100 text-amber-600 p-2 rounded-full mr-3">
                <FontAwesomeIcon icon={faChartLine} />
              </span>
              <span>Supply Chain Strategy</span>
            </li>
            <li className="flex items-center">
              <span className="bg-amber-100 text-amber-600 p-2 rounded-full mr-3">
                <FontAwesomeIcon icon={faBriefcase} />
              </span>
              <span>Finance & Wealth Management</span>
            </li>
            <li className="flex items-center">
              <span className="bg-amber-100 text-amber-600 p-2 rounded-full mr-3">
                <FontAwesomeIcon icon={faLaptopCode} />
              </span>
              <span>Data-Driven Decision Making</span>
            </li>
            <li className="flex items-center">
              <span className="bg-amber-100 text-amber-600 p-2 rounded-full mr-3">
                <FontAwesomeIcon icon={faGraduationCap} />
              </span>
              <span>Leadership & Team Management</span>
            </li>
          </ul>
          <h3 className="font-serif text-xl font-semibold mt-8 mb-4">Languages</h3>
          <div className="space-y-2">
            <div>
              <div className="flex justify-between mb-1">
                <span>English</span>
                <span>Fluent</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-amber-500 h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>Hindi</span>
                <span>Native</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-amber-500 h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>Bengali</span>
                <span>Native</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-amber-500 h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ExperienceSection = () => (
  <section id="experience" className="py-20 bg-gray-50">
    <div className="container mx-auto px-4">
      <h2 className="font-serif text-3xl md:text-4xl font-bold mb-12 text-center">Professional Experience</h2>
      
      <div className="relative">
        {/* Timeline line */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200"></div>
        
        {/* Experience items */}
        <div className="space-y-12">
          {/* Item 1 */}
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-12 md:text-right mb-8 md:mb-0">
              <h3 className="font-serif text-2xl font-semibold mb-2">Sears Holdings Corp</h3>
              <p className="text-amber-600 font-medium mb-2">Associate Manager, Supply Chain Strategy</p>
              <p className="text-gray-500 mb-4">Jan 2022 - Present</p>
              <ul className="text-gray-700 space-y-2">
                <li>Delivered AED 3M+ in efficiency savings through strategic supply chain optimization</li>
                <li>Spearheaded logistics redesign reducing delivery times by 25%</li>
                <li>Managed resource allocation across 4000+ labor hours</li>
              </ul>
            </div>
            <div className="hidden md:block w-8 h-8 rounded-full bg-amber-500 border-4 border-white absolute left-1/2 transform -translate-x-1/2"></div>
            <div className="md:w-1/2 md:pl-12"></div>
          </div>
          
          {/* Item 2 */}
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-12 order-1 md:order-none"></div>
            <div className="hidden md:block w-8 h-8 rounded-full bg-amber-500 border-4 border-white absolute left-1/2 transform -translate-x-1/2"></div>
            <div className="md:w-1/2 md:pl-12 mb-8 md:mb-0">
              <h3 className="font-serif text-2xl font-semibold mb-2">Goldman Sachs</h3>
              <p className="text-amber-600 font-medium mb-2">Associate, Wealth Management</p>
              <p className="text-gray-500 mb-4">Mar 2020 - Dec 2021</p>
              <ul className="text-gray-700 space-y-2">
                <li>Analyzed investment opportunities across diverse portfolio categories</li>
                <li>Developed financial strategies for high-net-worth clients</li>
                <li>Collaborated with investment banking teams on strategic initiatives</li>
              </ul>
            </div>
          </div>
          
          {/* Item 3 */}
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-12 md:text-right mb-8 md:mb-0">
              <h3 className="font-serif text-2xl font-semibold mb-2">Deloitte Consulting</h3>
              <p className="text-amber-600 font-medium mb-2">Business Analyst</p>
              <p className="text-gray-500 mb-4">Jul 2018 - Feb 2020</p>
              <ul className="text-gray-700 space-y-2">
                <li>Assisted in supply chain transformation projects for Fortune 500 clients</li>
                <li>Conducted data analysis to identify operational improvement opportunities</li>
                <li>Supported client presentations and strategic recommendation development</li>
              </ul>
            </div>
            <div className="hidden md:block w-8 h-8 rounded-full bg-amber-500 border-4 border-white absolute left-1/2 transform -translate-x-1/2"></div>
            <div className="md:w-1/2 md:pl-12"></div>
          </div>
        </div>
      </div>
      
      <div className="mt-16 text-center">
        <a href="/abhisheksur.github.io/AbhishekSur-Resume.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-6 rounded-md transition-colors">
          <FontAwesomeIcon icon={faFile} className="mr-2" />
          Download Resume
        </a>
      </div>
    </div>
  </section>
);

const EducationSection = () => (
  <section id="education" className="py-20">
    <div className="container mx-auto px-4">
      <h2 className="font-serif text-3xl md:text-4xl font-bold mb-12 text-center">Educational Background</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Education 1 */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <div className="bg-amber-100 text-amber-600 p-3 rounded-full mr-4">
              <FontAwesomeIcon icon={faGraduationCap} size="lg" />
            </div>
            <div>
              <h3 className="font-serif text-2xl font-semibold">MBA</h3>
              <p className="text-gray-600">XLRI Jamshedpur</p>
            </div>
          </div>
          <p className="text-gray-500 mb-4">2016 - 2018</p>
          <ul className="text-gray-700 space-y-2">
            <li>Specialized in Operations & Supply Chain Management</li>
            <li>GPA: 3.8/4.0</li>
            <li>Key courses: Strategic Management, Financial Analysis, Supply Chain Analytics</li>
            <li>Additional coursework: AI/ML, Advanced Statistics</li>
          </ul>
        </div>
        
        {/* Education 2 */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <div className="bg-amber-100 text-amber-600 p-3 rounded-full mr-4">
              <FontAwesomeIcon icon={faGraduationCap} size="lg" />
            </div>
            <div>
              <h3 className="font-serif text-2xl font-semibold">B.Tech in Mechanical Engineering</h3>
              <p className="text-gray-600">NIT Durgapur</p>
            </div>
          </div>
          <p className="text-gray-500 mb-4">2012 - 2016</p>
          <ul className="text-gray-700 space-y-2">
            <li>GPA: 9.1/10.0</li>
            <li>Dean's List for all semesters</li>
            <li>Key courses: Engineering Systems Design, Operations Research, Industrial Engineering</li>
            <li>Thesis: Optimization of Manufacturing Systems using Lean Methodologies</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
);

const CertificationsSection = () => (
  <section className="py-20 bg-gray-50">
    <div className="container mx-auto px-4">
      <h2 className="font-serif text-3xl md:text-4xl font-bold mb-12 text-center">Certifications</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <h3 className="font-serif text-xl font-semibold mb-2">Supply Chain Management Professional</h3>
          <p className="text-gray-600 mb-4">SCMDOJO • 2024</p>
          <p className="text-gray-700">Comprehensive certification covering end-to-end supply chain optimization, logistics management, and strategic procurement.</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <h3 className="font-serif text-xl font-semibold mb-2">Financial Modeling & Valuation Analyst</h3>
          <p className="text-gray-600 mb-4">Udemy • 2025</p>
          <p className="text-gray-700">Advanced financial modeling techniques, business valuation methods, and investment analysis frameworks.</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <h3 className="font-serif text-xl font-semibold mb-2">Data Science for Business Leaders</h3>
          <p className="text-gray-600 mb-4">Udemy • 2025</p>
          <p className="text-gray-700">Application of data science principles to business decision-making, predictive analytics, and strategic planning.</p>
        </div>
      </div>
    </div>
  </section>
);

const ContactSection = () => (
  <section id="contact" className="py-20">
    <div className="container mx-auto px-4">
      <h2 className="font-serif text-3xl md:text-4xl font-bold mb-12 text-center">Get in Touch</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h3 className="font-serif text-2xl font-semibold mb-6">Contact Information</h3>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-amber-100 text-amber-600 p-3 rounded-full mr-4">
                <FontAwesomeIcon icon={faEnvelope} />
              </div>
              <div>
                <h4 className="font-medium mb-1">Email</h4>
                <a href="mailto:abhisheksur429@gmail.com" className="text-amber-500 hover:text-amber-600 transition-colors">abhisheksur429@gmail.com</a>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-amber-100 text-amber-600 p-3 rounded-full mr-4">
                <FontAwesomeIcon icon={faLocationDot} />
              </div>
              <div>
                <h4 className="font-medium mb-1">Location</h4>
                <p>Kolkata, India</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-amber-100 text-amber-600 p-3 rounded-full mr-4">
                <FontAwesomeIcon icon={faLinkedin} />
              </div>
              <div>
                <h4 className="font-medium mb-1">LinkedIn</h4>
                <a href="https://www.linkedin.com/in/abhishek-sur/" target="_blank" rel="noopener noreferrer" className="text-amber-500 hover:text-amber-600 transition-colors">linkedin.com/in/abhishek-sur</a>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="font-serif text-2xl font-semibold mb-6">Send a Message</h3>
          
          <form onSubmit={(e) => {
            e.preventDefault();
            const name = e.target.name.value;
            const email = e.target.email.value;
            const message = e.target.message.value;
            window.location.href = `mailto:abhisheksur429@gmail.com?subject=Contact from ${name}&body=${message}%0A%0AReply to: ${email}`;
          }}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
              <input type="text" id="name" name="name" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500" required />
            </div>
            
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
              <input type="email" id="email" name="email" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500" required />
            </div>
            
            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
              <textarea id="message" name="message" rows="5" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500" required></textarea>
            </div>
            
            <button type="submit" className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 px-6 rounded-md transition-colors w-full">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  </section>
);

function App() {
  return (
    <Router>
      <div className="App min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<BlogPost />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App