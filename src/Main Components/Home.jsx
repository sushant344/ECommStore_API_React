import React from "react";
import HeroSection from "../Components/HeroSection";
import FeatureProducts from "../Components/FeatureProducts";
import Services from "../Components/Services";
import Trusted from "../Components/Trusted";

function Home() {
  const name = "Patil Store";
  return (
    <>
      <HeroSection name={name} />
      <FeatureProducts />
      <Services />
      <Trusted />
    </>
  );
}

export default Home;
