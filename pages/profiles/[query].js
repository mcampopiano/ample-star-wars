import Link from "next/link";
import useSWR from "swr";
import Image from "next/image";

export async function getServerSideProps(context) {
  /* Takes the query paramater in the url and appends it to the http request, 
        Then converts it to json and returns the results as the value to the characters variable*/
  const res = await fetch(
    `https://swapi.dev/api/people/?search=${context.params.query}`
  );
  const json = await res.json();
  const data = json.results;
  return {
    props: {
      characters: data,
    },
  };
}

const characterProfile = ({ characters }) => {
  /* fetcher takes a url as a parameter then makes an http request to that url, then parses the returned 
    JSON string into a javascript object and returns that object.
    */
  const fetcher = (url) => fetch(url).then((res) => res.json());

  /* Takes a url as a parameter, then passes that url as the first argument
    to the useSWR function, and the the fetcher function as the second argument. useSWR
    then passes that first argument as the argument to fetcher and runs it.*/
  const getData = (url) => {
    try {
      const { data, error } = useSWR(`${url}`, fetcher);
      return { data, error };
    } catch (error) {
      throw error;
    }
  };

  if (characters.length > 1) {
    return (
      <>
        <h2>
          <Link href="/">
            <a>Home</a>
          </Link>
        </h2>
        <h1>
          Looks like there is more than one character who might meet your search
          criteria. Please select the profile you would like to view.
        </h1>
        {characters.map((character) => (
          <Link href={"/profiles/" + character.name}>
            <a>
              <h3>{character.name}</h3>
            </a>
          </Link>
        ))}
      </>
    );
  } else if (characters.length === 0) {
    return (
      <>
        <h2>
          <Link href="/">
            <a>Home</a>
          </Link>
        </h2>
        <h1>
          Hmm, unfortunately it looks like no star wars characters matched your
          search.
        </h1>
        <h2>
          It's possible that the name was mispelled, or that the character is
          from a film outside of the original saga (episodes I-VI). Please
          return to the homepage to search for a different character. We
          apologize for the inconvenience.
        </h2>
      </>
    );
  } else {
    return (
      <>
        <h2 className="home-btn">
          <Link href="/">
            <a>Home</a>
          </Link>
        </h2>
        {characters.map((character) => (
          <div className="profile-section" key={character.id}>
            <Image
              className="background-image"
              src="/star.jpg"
              alt="Stars in the nightsky"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
            />
            <h1 className="header">{character.name}</h1>
            <div className="about">
              <section className="about-me">
                <h2>About me</h2>
                <p>
                  I'm a {character.height} cm tall{" "}
                  {character.species.length === 0
                    ? "human"
                    : character.species.map((species) => {
                        const { data, error } = getData(species);
                        if (!data) return "loading...";
                        return data.name;
                      })}
                  , and{" "}
                  {character.gender === "female"
                    ? `I have ${character.hair_color} hair. It's rude to ask a woman's weight or age, so I won't tell you either.`
                    : `I weigh ${character.mass} kg`}
                </p>
                <p>
                  {character.gender !== "female"
                    ? `I was born in ${character.birth_year}`
                    : ""}{" "}
                  {character.gender === "female" ||
                  character.hair_color === "n/a" ||
                  character.hair_color === "unknown" ||
                  character.hair_color === "none"
                    ? ""
                    : ` with ${character.hair_color} hair.`}
                </p>
              </section>
              <section className="films">
                <h2>Films appeared in</h2>
                <ul>
                  {character.films.map((film) => {
                    const { data, error } = getData(film);
                    if (!data) return "loading";
                    if (data != null) {
                      return <li key={data.id}>{data.title}</li>;
                    }
                  })}
                </ul>
              </section>
              <section className="starships">
                <h2>Starships flown</h2>
                <ul>
                  {character.starships.map((ship) => {
                    const { data, error } = getData(ship);
                    if (!data) return "loading";
                    if (data != null && data.length > 0) {
                      return <li key={data.id}>{data.name}</li>;
                    }
                  })}
                </ul>
                {character.starships.length === 0 &&
                  `I did not fly any starships. At least not on camera! ;)`}
              </section>
            </div>
          </div>
        ))}
        <style jsx>
          {`
            .home-btn {
              position: absolute;
              z-index: 1;
            }
            .header {
              width: fit-content;
              margin: auto;
              z-index: 1;
              position: relative;
            }

            .about {
              display: flex;
              justify-content: space-around;
              margin-top: 10px;
            }

            .about-me,
            .films,
            .starships {
              border: 3px solid #ebd71c;
              padding: 20px;
              width: fit-content;
              z-index: 1;
            }
          `}
        </style>
      </>
    );
  }
};

export default characterProfile;
