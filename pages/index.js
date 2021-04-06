import { useRouter } from 'next/router'

export default function Home() {
    const router = useRouter()
    return (
        <>
            <h1>
                Search for a Star Wars character by name
            </h1>
            <form onSubmit={event => {
                event.preventDefault()
                router.push(`/profiles/${event.target.search.value}`)
            }}>
                <input name='search' id="search" type='text' />
                <button>
                    search</button>
            </form>
        </>
    )
}
