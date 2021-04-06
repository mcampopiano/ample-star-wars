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
                    <a>Back to home</a>
                </Link>
            </h2>
            {
                characters.map(character => (
                    <div className="profile-section" key={character.id}>
                        <h1>{character.name}</h1>
                        <section className="about-me">
                            <h2>About me</h2>
                            <p>Height: {character.height}cm</p>
                            <p>Weight: {character.mass}</p>
                            <p>Hair color: {character.hair_color}</p>
                            <p>Birth year: {character.birth_year}</p>
                            <p>Species: {character.species.length === 0 
                            ? "human" 
                            : character.species.map(species => {
                                const {data, error} = getData(species)
                                if (!data) return "loading"
                                return data.name
                            })}</p>
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
                                    `${character.name} did not fly any starships. At least not on camera! ;)`
                                }
                        </section>
                    </div>
                ))
            }
        </>
    )
}

export default characterProfile