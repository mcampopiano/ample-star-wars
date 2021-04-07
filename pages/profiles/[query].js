import Link from 'next/link'
import useSWR from 'swr'

export async function getServerSideProps(context) {
    const res = await fetch(`https://swapi.dev/api/people/?search=${context.params.query}`)
    const json = await res.json()
    const data = json.results
    return {
        props: {
            characters: data
        }
    }

}


const characterProfile = ({ characters }) => {

    const fetcher = (url) => fetch(url).then(res => res.json())
    const getData = url => {
        try {

            const { data, error } = useSWR(`${url}`, fetcher)
            return { data, error }
        } catch (error) {
            console.log('error: ', error)
            throw error
        }
    }

    return (
        <>
            <h2>
                <Link href="/">
                    <a>Home</a>
                </Link>
            </h2>
            {
                characters.map(character => (
                    <div className="profile-section" key={character.id}>
                        <h1 className="header">{character.name}</h1>
                        <div className="about">
                            <section className="about-me">
                                <h2>About me</h2>
                                <p>I'm a {character.height} cm tall {character.species.length === 0
                                    ? "human"
                                    : character.species.map(species => {
                                        const { data, error } = getData(species)
                                        if (!data) return "loading..."
                                        return data.name
                                    })}, and {character.gender === "female"
                                        ? `I have ${character.hair_color} hair. It's rude to ask a woman's weight or age, so I won't tell you either.`
                                        : `I weigh ${character.mass} kg`}
                                </p>
                                <p>
                                    {character.gender !== "female"
                                        ? `I was born in ${character.birth_year}`
                                        : ""} {character.gender === "female" || character.hair_color === "n/a"
                                            || character.hair_color === "unknown"
                                            || character.hair_color === "none"
                                            ? ""
                                            : ` with ${character.hair_color} hair.`}
                                </p>
                            </section>
                            <section className="films">
                                <h2>Films appeared in</h2>
                                <ul>
                                    {
                                        character.films.map(film => {
                                            const { data, error } = getData(film)
                                            if (!data) return "loading"
                                            if (data !== undefined) {

                                                return <li key={data.id}>{data.title}</li>
                                            }
                                        })
                                    }
                                </ul>
                            </section>
                            <section className="starships">
                                <h2>Starships flown</h2>
                                <ul>
                                    {
                                        character.starships.map(ship => {
                                            const { data, error } = getData(ship)
                                            if (!data) return "loading"
                                            if (data !== undefined && data.length > 0) {

                                                return <li key={data.id}>{data.name}</li>
                                            }
                                        })
                                    }
                                </ul>
                                {
                                    character.starships.length === 0 &&
                                    `I did not fly any starships. At least not on camera! ;)`
                                }
                            </section>
                        </div>
                    </div>
                ))
            }
            <style jsx>
                {`
                .header {
                    width: fit-content;
                    margin: auto;
                }

                .about {
                    display: flex;
                    justify-content: space-around;
                    margin-top: 10px;
                }

                .about-me, .films, .starships {
                    border: 3px solid #EBD71C;
                    padding: 20px;
                    width: fit-content;
                }
                `}
            </style>
        </>
    )
}

export default characterProfile