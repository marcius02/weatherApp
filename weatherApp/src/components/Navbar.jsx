import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/weather">Weather</Link>
            <Link to="/map">Map</Link>
            <Link to="/about">About</Link>
        </nav>
    );
}