import Link from 'next/link'

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
    return (
        <>
            <h2>
                <Link href="/">
                    <a>Back to home</a>
                </Link>
            </h2>
            {
                characters.map(character => (
                    <div className="profile-section">
                        <h1>{character.name}</h1>
                        <section className="about-me">
                            <h2>About me</h2>
                            <p>Height: {character.height}cm</p>
                            <p>Weight: {character.mass}</p>
                            <p>Hair color: {character.hair_color}</p>
                            <p>Birth year: {character.birth_year}</p>
                            <p>Species: {character.species.length === 0 ? "human" : "unknown"}</p>
                        </section>
                        <section className="films">
                            <h2>Films appeared in</h2>
                        </section>
                    </div>
                ))
            }
        </>
    )
}

export default characterProfile