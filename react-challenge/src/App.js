import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ActorList from "./components/ActorList";
import ActorDetail from "./components/ActorDetail";
import PageNotFound from "./components/PageNotFound";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" Component={ActorList} />
        <Route path="/actor/:id" Component={ActorDetail} />
        <Route Component={PageNotFound} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
