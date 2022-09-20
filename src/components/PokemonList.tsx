import { trpc } from "@/utils/trpc";
import { Pokemon } from "@prisma/client";
import React from "react";
import LoadingIndicator from "./LoadingIndicator";
import Image from "next/image";

export default function PokemonList() {
  const { data, isLoading, isSuccess } = trpc.useQuery(["search.pokemon"]);
  return (
    <div
      className={`flex flex-col justify-center "h-full" 
       w-full  items-center p-8`}
    >
      {isLoading || !isSuccess ? (
        <LoadingIndicator />
      ) : (
        <>
          <h1 className="text-3xl font-bold pb-8">Pokemon list</h1>

          <ul className="grid xl:grid-cols-[150px_150px_150px_150px] lg:grid-cols-[150px_150px_150px] md:grid-cols-[150px_150px] grid-cols-[200px]  xl:auto-rows-[200px] lg:auto-rows-[200px]  md:auto-rows-[200px] auto-rows-[300px]  gap-8  h-full">
            {data.pokemons.map(({ name, spriteUrl }: Pokemon) => (
              <li key={name} className="h-full w-full  flex justify-center">
                <div className=" h-full w-full relative shadow-md shadow-cyan-100 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 aspect-w-1 aspect-h-1 overflow-hidden rounded-lg  xl:aspect-w-7 xl:aspect-h-8">
                  <button className="relative h-full w-full">
                    <Image
                      priority
                      src={spriteUrl}
                      alt={name}
                      layout="fill"
                      onClick={() => console.log("clicked")}
                    />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
