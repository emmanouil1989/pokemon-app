import { PokemonDetailsType } from "@/pages/api/backend/routers/pokemonDetailsRouter";
import React from "react";
import Image from "next/image";
import { map } from "zod";

type PokemonDetailsProps = {
  data: PokemonDetailsType;
};

export default function PokemonDetails({ data }: PokemonDetailsProps) {
  const { name, imageUrl, weight, height, abilities, types, stats } = data;
  return (
    <div className="flex flex-col items-center justify-between h-[800px] w-[700px] p-8 rounded shadow-md shadow-cyan-100">
      <div className="relative mx-128 w-[200px] h-[200px] sm:w-[200px] sm:h-[200px]">
        <Image src={imageUrl} alt={name} layout="fill" />
      </div>

      <div>
        <h1 className="font-bold text-3xl ">{name}</h1>
      </div>
      <div>
        <h1 className="font-bold text-3xl">Types:</h1>
        <ul className="list-disc">
          {types.map((type) => {
            return <li key={type}>{type}</li>;
          })}
        </ul>
      </div>
      <div>
        <h1 className="font-bold text-3xl ">Abilities:</h1>
        <ul className="list-disc">
          {abilities.map((ability) => {
            return <li key={ability.name}>{ability.name}</li>;
          })}
        </ul>
      </div>
      <div>
        <h1 className="font-bold text-3xl ">Weight:</h1>
        <p>{weight}</p>
      </div>
      <div>
        <h1 className="font-bold text-3xl">Height:</h1>
        <p>{height}</p>
      </div>
      <div>
        <h1 className="font-bold text-3xl">Stats:</h1>
        <ul className="list-disc">
          {stats.map((stat) => {
            return <li key={stat.name}>{stat.name}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}
