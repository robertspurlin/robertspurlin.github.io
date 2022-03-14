import React from 'react';
import { Root, Routes } from 'react-static';
import { Router } from 'components/Router';

import './scss/index.scss';
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <Root>
      <Header />
      <div className="content">
        <React.Suspense fallback={<em>Loading...</em>}>
          <Router>
            <Routes path="*" />
          </Router>
        </React.Suspense>
      </div>
      <Footer />
    </Root>
  )
}

export default App;
