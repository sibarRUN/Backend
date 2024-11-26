import "locomotive-scroll/dist/locomotive-scroll.css";

import { AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { LocomotiveScrollProvider } from "react-locomotive-scroll";
import { ThemeProvider } from "styled-components";

import Loader from "./components/Loader";
import ScrollTriggerProxy from "./components/ScrollTriggerProxy";
import About from "./sections/About";
import Footer from "./sections/Footer";
import Home from "./sections/Home";
import Marquee from "./sections/Marquee";
import NewArrival from "./sections/NewArrival";
import Shop from "./sections/Shop";
import GlobalStyles from "./styles/GlobalStyles";
import { dark } from "./styles/Themes";

function App() {
  const containerRef = useRef(null);
  const [Loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 500);
  }, []);

  return (
    <ThemeProvider theme={dark}>
      <GlobalStyles />
      <LocomotiveScrollProvider>
        <main className="App" data-scroll-container ref={containerRef}>
          <ScrollTriggerProxy />
          <AnimatePresence>
            {Loaded ? null : <Loader />}
            <Home key="home" />
            <About key="about" />
            <Shop key="Shop" />
            <Marquee key="marquee" />
            <NewArrival key="new arrival" />
            <Footer key="Footer" />

          </AnimatePresence>
        </main>
      </LocomotiveScrollProvider>
    </ThemeProvider>
  );
}

export default App;
