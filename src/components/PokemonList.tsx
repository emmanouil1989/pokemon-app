import { trpc } from "@/utils/trpc";
import { Pokemon } from "@prisma/client";
import React from "react";
import LoadingIndicator from "./LoadingIndicator";
import Image from "next/image";
import { useRouter } from "next/router";
import { PokemonDetailsType } from "@/pages/api/backend/routers/pokemonDetailsRouter";
import { useDebounce } from "use-debounce";

export default function PokemonList() {
  const [search, setSearch] = React.useState<string | undefined>(undefined);
  const [value] = useDebounce(search, 1000);
  const { data, isLoading, isSuccess } = trpc.useQuery([
    "search.pokemon",
    { search: value },
  ],{
    keepPreviousData: true,
  });

  const router = useRouter();
  const onImageClick = (id: string) => {
    router.push(`/pokemon/${id}`);
  };
  return (
    <div
      className={`flex flex-col justify-center h-full 
       w-full  items-center p-8 relative `}
    >
      {isLoading || !isSuccess ? (
        <LoadingIndicator />
      ) : (
        <>
          <h1 className="text-3xl font-bold pb-8">Pokemon list</h1>
          <div className="lg:w-4/12 w-[22rem] h-10 relative py-8 sm:py-0 mb-8 ">
            <input
              className=" rounded-3xl p-4 border-solid  bg-slate-600 w-full h-11 outline-none border-2 border-gray-300 font-bold placeholder:text-white placeholder:text-lg placeholder:font-bold"
              placeholder="Search for pokemons..."
              aria-label="Search for pokemons..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <svg
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 28 28"
              width="28px"
              height="28px"
              className="absolute top-10 sm:top-2 right-4 bottom-2"
            >
              <path
                d="M11 2a9 9 0 1 0 3.88 17.123l5.777 5.777a3 3 0 0 0 4.243-4.243l-5.777-5.777A9 9 0 0 0 11 2zm-7 9a7 7 0 1 1 14 0 7 7 0 0 1-14 0zm14.032 5.618a9.054 9.054 0 0 1-1.414 1.414l5.453 5.453a1 1 0 0 0 1.414-1.414z"
                fill="currentColor"
              ></path>
            </svg>
          </div>

          <ul className="grid xl:grid-cols-[150px_150px_150px_150px] lg:grid-cols-[150px_150px_150px] md:grid-cols-[150px_150px] grid-cols-[200px]  xl:auto-rows-[200px] lg:auto-rows-[200px]  md:auto-rows-[200px] auto-rows-[300px]  gap-8  h-full list-inside overflow-y-auto p-8">
            {data!.pokemons.map(
              ({ name, spriteUrl, pokemonId }: Pokemon, index) => (
                <li key={name} className="h-full w-full  flex justify-center">
                  <div className=" h-full w-full relative shadow-md shadow-cyan-100 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 aspect-w-1 aspect-h-1 overflow-hidden rounded-lg  xl:aspect-w-7 xl:aspect-h-8">
                    <button className="relative h-full w-full">
                      <Image
                        priority
                        src={spriteUrl}
                        alt={name}
                        layout="fill"
                        onClick={() => onImageClick(pokemonId)}
                      />
                    </button>
                  </div>
                </li>
              )
            )}
          </ul>
        </>
      )}
    </div>
  );
}
