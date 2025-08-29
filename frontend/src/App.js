import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { LanguageProvider } from "./components/LanguageContext";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Equipment from "./components/Equipment";
import QSL from "./components/QSL";
import Gallery from "./components/Gallery";
import Achievements from "./components/Achievements";
import News from "./components/News";
import Contacts from "./components/Contacts";
import Footer from "./components/Footer";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <LanguageProvider>
          <Header />
          <main>
            <Hero />
            <About />
            <Equipment />
            <QSL />
            <Gallery />
            <Achievements />
            <News />
            <Contacts />
          </main>
          <Footer />
          <Toaster />
        </LanguageProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;