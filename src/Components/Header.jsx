import logo from '../assets/disneyland-logo.svg'; // Adjust the path as necessary

const Header = () => {
  return (
    <header>
      <img src={logo} alt="Disneyland Logo" />
    </header>
  );
}

export default Header;