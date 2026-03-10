import Navbar from './components/Navbar'
import Hero from './components/Hero'
import { Experience } from './components/Experience'
import { Education } from './components/Education'
import { Skills } from './components/Skills'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-16 space-y-16 md:space-y-24">
          <Hero />
          <Experience />
          <Skills />
          <Education />
          <Contact />
        </div>
      </main>
      <Footer />
    </>
  )
}

export default App
