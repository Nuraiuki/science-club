import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import WhatWeDo from './components/WhatWeDo'
import Amplification from './components/Amplification'
import Journey from './components/Journey'
import Projects from './components/Projects'
import Community from './components/Community'
import WallOfFame from './components/WallOfFame'
import WhyJoin from './components/WhyJoin'
import JoinCTA from './components/JoinCTA'
import Footer from './components/Footer'
import { CursorRing } from './components/ui/CursorRing'

export default function App() {
  return (
    <>
      <CursorRing />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <WhatWeDo />
        <Amplification />
        <Journey />
        <Projects />
        <Community />
        <WallOfFame />
        <WhyJoin />
        <JoinCTA />
      </main>
      <Footer />
    </>
  )
}
