import { useRouter } from 'next/router'
import Image from 'next/image'
// import '../styles/starwarsintro.module.css'

export default function Home() {
  const router = useRouter()
  return (
    <>
    <div className="big-container">
      {/* Place in Body where you'd like intro to appear  */}
      <div className="star-wars-intro">
        <Image
          className="background-image"
          src="/star.jpg"
          alt="Stars in the nightsky"
          layout="fill"
          objectFit="cover"
          objectPosition="center" />


        {/* <!-- Blue Intro Text --> */}
        <p className="intro-text">
          A few days ago, I received...
  </p>

        {/* <!-- Logo Image or Text goes in here --> */}
        <h2 className="main-logo">
          AMPLE CODING CHALLENGE
          {/* <img src="img/star-wars-intro.png" /> */}
        </h2>

        {/* <!-- All Scrolling Content Goes in here --> */}
        <div className="main-content">

          <div className="title-content">
            <p className="content-header">EPISODE I<br />The First Round Challenge</p>

            {/* <br> */}

            <p className="content-body">
              After years of galactic silence, civilization is on the brink of a new Star Wars release. Now, with the Force preparing to awaken, the people of Earth seek solace in films of old. With nowhere to turn, they gather in great numbers and watch the original trilogy without rest. Three films. 6 hours. 24 minutes. Popcorn. Slushies. Total elation.
      </p>

            {/* <!-- button or link or whatever --> */}
            <a href="./StarScroll.zip" className="space-button">Download The Code Now!</a>

          </div>
        </div>
      </div>
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
      <style jsx>{`
        
        .background-image {
          height: 100%;
          width: 100%;
          z-index: 0
        }

        .star-wars-intro {
          background-image: url("../images/star.jpg");
          width: 100%;
          height: 100%;
          font-family: "Droid Sans", arial, verdana, sans-serif;
          font-weight: 700;
          color: #EBD71C;
          background-color: #000;
          overflow: hidden;
          position: relative;
          z-index: 1
        }
        
        .star-wars-intro p.intro-text {
          position: relative;
          max-width: 16em;
          font-size: 200%;
          font-weight: 400;
          margin: 20% auto;
          color: #4ee;
          opacity: 0;
          z-index: 1;
          text-align: center;
          -webkit-animation: intro 2s ease-out;
          -moz-animation: intro 2s ease-out;
          -ms-animation: intro 2s ease-out;
          -o-animation: intro 2s ease-out;
          animation: intro 2s ease-out;
        }
        
        .star-wars-intro .main-content{
          margin-left: auto;
          margin-right: auto;
          position: absolute;
          z-index: 3;
          width: 98%;
          height: 50em;
          bottom: 0;
          font-size: 80px;
          font-weight: bold;
          text-align: justify;
          overflow: hidden;
          transform-origin: 50% 100%;
          transform: perspective(350px) rotateX(25deg);
        }
        
        .star-wars-intro .main-content:after {
          position: absolute;
          content: ' ';
          top: 0;
          bottom: 60%;
          background-image: linear-gradient(top, rgba(0,0,0,1) 0%, transparent 100%);
          pointer-events: none;
        }
        
        .star-wars-intro .space-button {
          color: #EBD71C;
          border: 12px solid #EBD71C;
          padding: 20px;
          background: transparent;
          text-decoration: none;
          margin: 0 auto;
          display: block;
          text-align: center;
        }
        
        .star-wars-intro .space-button:hover {
          background-color: #D2BE03;
          border-color: #D2BE03;
          color: black;
        }
        
        .star-wars-intro .space-button:active,
        .star-wars-intro .space-button:focus {
          background-color: #B8A40A;
          border-color: #B8A40A;
          color: black;
        }
        
        .star-wars-intro .title-content {
          position: absolute;
          top: 100%;
          animation: scroll 120s linear 4s forwards;
        }
        
        .star-wars-intro .title-content > .content-header {
          text-align: center;
        }
        
        /* Main Image Styles */
        
        .star-wars-intro .main-logo {
          position: absolute;
          width: 2.6em;
          left: 50%;
          top: 20vh;
          font-size: 10em;
          text-align: center;
          margin-left: -1.3em;
          line-height: 0.8em;
          letter-spacing: -0.05em;
          color: #000;
          text-shadow: -2px -2px 0 #EBD71C, 2px -2px 0 #EBD71C, -2px 2px 0 #EBD71C, 2px 2px 0 #EBD71C;
          opacity: 0;
          z-index: 1;
          -webkit-animation: logo 5s ease-out 2.5s;
          -moz-animation: logo 5s ease-out 2.5s;
          -ms-animation: logo 5s ease-out 2.5s;
          -o-animation: logo 5s ease-out 2.5s;
          animation: logo 5s ease-out 2.5s;
        }
        
        .star-wars-intro .main-logo > img {
          max-width: 100%;
        }
        
        @-webkit-keyframes intro {
          0% { opacity: 1; }
          90% { opacity: 1; }
          100% { opacity: 0; }
        }
        
        @-moz-keyframes intro {
          0% { opacity: 1; }
          90% { opacity: 1; }
          100% { opacity: 0; }
        }
        
        @-ms-keyframes intro {
          0% { opacity: 1; }
          90% { opacity: 1; }
          100% { opacity: 0; }
        }
        
        @-o-keyframes intro {
          0% { opacity: 1; }
          90% { opacity: 1; }
          100% { opacity: 0; }
        }
        
        @keyframes intro {
          0% { opacity: 1; }
          90% { opacity: 1; }
          100% { opacity: 0; }
        }
        
        
        @-webkit-keyframes logo {
          0% { -webkit-transform: scale(1); opacity: 1; }
          50% { opacity: 1; }
          100% { -webkit-transform: scale(0.1); opacity: 0; }
        }
        
        @-moz-keyframes logo {
          0% { -moz-transform: scale(1); opacity: 1; }
          50% { opacity: 1; }
          100% { -moz-transform: scale(0.1); opacity: 0; }
        }
        
        @-ms-keyframes logo {
          0% { -ms-transform: scale(1); opacity: 1; }
          50% { opacity: 1; }
          100% { -ms-transform: scale(0.1); opacity: 0; }
        }
        
        @-o-keyframes logo {
          0% { -o-transform: scale(1); opacity: 1; }
          50% { opacity: 1; }
          100% { -o-transform: scale(0.1); opacity: 0; }
        }
        
        @keyframes logo {
          0% { transform: scale(1); opacity: 1; }
          50% { opacity: 1; }
          100% { transform: scale(0.1); opacity: 0; }
        }
        
        @keyframes scroll {
          0% { top: 100%; }
          100% { top: -170%; }
        }
        
        @media screen and (max-width: 720px) {
          .star-wars-intro .main-content {
            font-size: 35px;
          }
          .star-wars-intro .title-content {
            position: absolute;
            top: 100%;
            animation: scroll 100s linear 4s forwards;
          }
        }`}</style>
        </div>
    </>
  )
}
