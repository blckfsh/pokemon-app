import Image from "next/image";
import { graphQLClient } from "../../lib/graphqlClient";

async function getPokemons() {
  const query = `
  query pokemons($first: Int!){
    pokemons(first: $first){
      id
      number
      name
      weight{
        minimum
        maximum
      }
      height{
        minimum
        maximum
      }
      classification
      types
      resistant
      weaknesses
      fleeRate
      maxCP
      maxHP
      image
    }
  }
  `;

  const args = {
    first: 8, // Replace with the desired number of pokemons
  };

  const data = await graphQLClient.request(query, args);
  // console.log(data.pokemons);
  return data.pokemons;
}

export default async function Home() {
  const pokemons = await getPokemons();

  return (
    <div className="flex lg:flex-row md:flex-row flex-col flex-wrap items-center justify-between">
      {pokemons.map((pokemon, index) => {
        const order1 = index + 1;
        const order2 = index % 2 === 0 ? order1 + 1 : order1 - 1;

        return (
          <div
            key={pokemon.id}
            className={`lg:order-${order1} order-${order2} basis-1/2 p-5 bg-green-200`}
          >
            <div className="border border-current p-5 bg-red-200">
              <div className="flex flex-row w-full bg-yellow-200">
                <div className="flex-1">
                  <Image
                    src={pokemon.image}
                    alt={pokemon.name}
                    height={200}
                    width={200}
                    quality={75}
                    className="h-64 w-64"
                  />
                </div>
                <div className="flex-1">
                  <div className="h-full flex flex-col items-center justify-center bg-blue-100">
                    <div className="text-left">
                      <p>{index}</p>
                      <p>
                        {order1} {order2}
                      </p>
                      <p>{pokemon.number}</p>
                      <p>{pokemon.name}</p>
                      <p>Classification: {pokemon.classification}</p>
                      <p>Types: {pokemon.types.join(", ")}</p>
                      <p>
                        Height: {pokemon.height.minimum} -{" "}
                        {pokemon.height.maximum}
                      </p>
                      <p>
                        Weight: {pokemon.weight.minimum} -{" "}
                        {pokemon.weight.maximum}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
