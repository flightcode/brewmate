import React, { useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { BeerCard } from "../components/BeerCard";

interface Beer {
  name: string;
  brewery: string;
  type: string;
  hops: string[];
  malts: string[];
  abv: number;
  ibu: number;
}

const BeerList: React.FC = () => {
  const [beers, setBeers] = useState([]);

  return (
    <div>
      <Helmet>
        <title>Beers - BrewMate</title>
      </Helmet>
      {beers.map((beer: Beer) => (
        <BeerCard
          name={beer.name}
          brewery={beer.brewery}
          type={beer.type}
          hops={beer.hops}
          malts={beer.malts}
          abv={beer.abv}
          ibu={beer.ibu}
        />
      ))}
    </div>
  );
};

export { BeerList };
