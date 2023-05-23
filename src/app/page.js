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
    first: 10,
  };

  const data = await graphQLClient.request(query, args);
  console.log(data.pokemons);
  return data.pokemons;
}

export default async function Home() {
  const pokemons = await getPokemons();

  return (
    <>
      <div className="flex lg:flex-row md:flex-row flex-col flex-wrap items-center justify-between">
        {pokemons.map((pokemon, index) => {
          const order1 = index + 1;
          const order2 = index % 2 === 0 ? order1 + 1 : order1 - 1;

          return (
            <div
              key={pokemon.id}
              className={`div${order1} ${index % 2 === 0 ? "lg:pr-3 p-1" : "lg:pl-3 p-1"} basis-1/2 pt-6`}
            >
              <div className="border border-current bg-white p-5">
                <div className="flex flex-row w-full justify-between items-center">
                  <div className="flex-1">
                    <Image
                      src={pokemon.image}
                      alt={pokemon.name}
                      height={200}
                      width={200}
                      quality={75}
                      className="lg:h-64 lg:w-64 h-36 w-36"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="h-full flex flex-col items-center justify-center">
                      <div className="text-left">                        
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
    </>
  );
}
