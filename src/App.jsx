import { useRef } from 'react';
import { useAudio } from './hooks/useAudio';
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
  const countDownRef = useRef(null);
  const welcomeRef = useRef(null);
  const venueRef = useRef(null);
  const rsvpRef = useRef(null);
  const finalRef = useRef(null);
  const { isPlaying, showBtn, playAudio, toggleAudio } = useAudio(bgMusic);
  return (
    <div>
      {showBtn && <BtnPage isPlaying={isPlaying} onToggle={toggleAudio} />}
      <Hero title={title} name={couple} backgroundImg={base} nextSectionRef={countDownRef} onPlayAudio={playAudio} />
      <CountDown ref={countDownRef} subtitle={subtitle} names={invertedNames} targetDate={date} backgroundImg={hero} scrollTargetRef={welcomeRef} />
      <Welcome ref={welcomeRef} title={greeting.title} text={greeting.text} backgroundImg={base} iconImg={icon} scrollTargetRef={venueRef} />
      <Venue ref={venueRef} locations={locations} scrollTargetRef={rsvpRef} />
      <RsvpForm ref={rsvpRef} endpoint={endpoint} scrollTargetRef={finalRef} />
      <FinalScreen ref={finalRef} backgroundImg={story} />
    </div>
  )
}

export default App;