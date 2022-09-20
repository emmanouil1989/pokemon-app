import LoadingIndicator from "@/components/LoadingIndicator";
import PokemonDetails from "@/components/PokemonDetails";
import { trpc } from "@/utils/trpc";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import z from "zod";

const querySchema = z.object({
  "pokemon-id": z.string(),
});

const PokemonDetailsPage: NextPage = () => {
  const router = useRouter();

  const query = querySchema.safeParse(router.query);
  const pokemonId = query.success ? query.data["pokemon-id"] : "";
  const { data, isLoading, isSuccess } = trpc.useQuery([
    "details.pokemon",
    { pokemonId },
  ]);

  return (
    <>
      <Head>
        <title>Pokemons </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div
        className={`flex flex-col justify-center h-full 
       w-full  items-center p-8 relative `}
      >
        {isLoading || !isSuccess ? (
          <LoadingIndicator />
        ) : (
          <PokemonDetails data={data!} />
        )}
      </div>
    </>
  );
};

export default PokemonDetailsPage;
