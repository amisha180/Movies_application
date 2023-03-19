import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <span  className="header">
       Movies App 🎥
       <span className="icons">
       <Link id="pop" to="/"><WhatshotIcon fontSize="large"/></Link>
       <Link to="/search"><SearchIcon fontSize="large"/></Link>
       </span>
 </span>
    
    
  );
};

export default Header;
