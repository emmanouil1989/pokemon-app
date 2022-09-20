import PokemonList from "@/components/PokemonList";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Pokemons </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <PokemonList />
    </>
  );
};

export default Home;
