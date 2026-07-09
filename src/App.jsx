import { useRef, useState } from 'react';
import { DATA } from './data';
import Hero from './components/Hero';
import BtnPage from './components/BtnPage';
import CountDown from './components/CountDown';
import Welcome from './components/Welcome';
import Venue from './components/Venue';
import RsvpForm from './components/RsvpForm';
import FinalScreen from './components/FinalScreen';
import { reverseCouple } from './utils/formatters';
const { title, subtitle, couple, date, endpoint, greeting, locations, images: { base, story, hero, icon }, audio: { bgMusic } } = DATA;
const invertedNames = reverseCouple(couple);

function App() {
  const nextSectionRef = useRef(null);
  const audioRef = useRef(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [showMusicBtn, setShowMusicBtn] = useState(false);
  const handleStartScroll = () => {
    if (nextSectionRef.current) {
      nextSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (!audioRef.current) {
      audioRef.current = new Audio(bgMusic);
      audioRef.current.loop = true; // Музика буде повторюватися по колу
      audioRef.current.volume = 0.5; //Гучність на 50%
    }
    audioRef.current.play()
      .then(() => {
        setIsMusicPlaying(true);
        setShowMusicBtn(true);
      })
      .catch(err => {
        console.log('Браузер заблокував', err);
        setShowMusicBtn(true);
      });
  };
  const toggleMusic = () => {
    if (!audioRef.current) return
    if (isMusicPlaying) {
      audioRef.current.pause();
      setIsMusicPlaying(false);
    } else {
      audioRef.current.play();
      setIsMusicPlaying(true);
    }
  };
  return (
    <div>
      {showMusicBtn && <BtnPage isPlaying={isMusicPlaying} onToggle={toggleMusic} />}
      <Hero title={title} name={couple} backgroundImg={base} onStart={handleStartScroll} />
      <div ref={nextSectionRef}>
        <CountDown subtitle={subtitle} names={invertedNames} targetDate={date} backgroundImg={hero} />
      </div>
      <Welcome title={greeting.title} text={greeting.text} backgroundImg={base} iconImg={icon} />
      <Venue locations={locations} />
      <RsvpForm endpoint={endpoint} />
      <FinalScreen backgroundImg={story} />
    </div>
  )
}

export default App;