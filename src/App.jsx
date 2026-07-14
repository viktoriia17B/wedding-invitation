import { useRef } from 'react';
import { useAudio } from './hooks/useAudio';
import { useWheelSnap } from './hooks/useWheelSnap';
import { useRevealSections } from './hooks/useRevealSections';
import DotNav from './components/DotNav';
import { DATA } from './data';
import Hero from './components/Hero';
import BtnPage from './components/BtnPage';
import CountDown from './components/CountDown';
import Welcome from './components/Welcome';
import Venue from './components/Venue';
import RsvpForm from './components/RsvpForm';
import { reverseCouple } from './utils/formatters';
const { title, subtitle, couple, date, endpoint, greeting, locations, images: { base, story, hero, icon }, audio: { bgMusic } } = DATA;
const invertedNames = reverseCouple(couple);

function App() {
  const countDownRef = useRef(null);
  const { isPlaying, showBtn, playAudio, toggleAudio } = useAudio(bgMusic);
  useWheelSnap();
  useRevealSections();
  return (
    <div>
      <DotNav />
      {showBtn && <BtnPage isPlaying={isPlaying} onToggle={toggleAudio} />}
      <Hero title={title} name={couple} backgroundImg={base} nextSectionRef={countDownRef} onPlayAudio={playAudio} />
      <CountDown ref={countDownRef} subtitle={subtitle} names={invertedNames} targetDate={date} backgroundImg={hero} />
      <Welcome title={greeting.title} text={greeting.text} accent={greeting.accent} backgroundImg={base} iconImg={icon} />
      <Venue locations={locations} />
      <RsvpForm endpoint={endpoint} backgroundImg={story} />
    </div>
  )
}

export default App;