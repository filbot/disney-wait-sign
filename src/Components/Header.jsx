import logo from '../assets/disneyland-logo.svg';
import audio from '../assets/audio.mp3';
import LoopingImageAudio from '../Components/Audio';

const Header = () => {
  return (
    <header>
      <LoopingImageAudio
        imgSrc={logo}
        audioSrc={audio}
        alt="Disneyland Logo"
      />
    </header>

  );
}

export default Header;