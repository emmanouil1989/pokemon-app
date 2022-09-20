import { trpc } from "@/utils/trpc";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import z from "zod";

const querySchema = z.object({
  "pokemon-id": z.string(),
});

const PokemonDetails: NextPage = () => {
  const router = useRouter();

  const query = querySchema.safeParse(router.query);
  const pokemonId = query.success ? query.data["pokemon-id"] : "";
  const { data } = trpc.useQuery(["details.pokemon", { pokemonId }]);
  console.log(data);

  return (
    <>
      <Head>
        <title>Pokemons </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
    </>
  );
};

export default PokemonDetails;
