import {
  Button,
  createTheme,
  Tab,
  Tabs,
  TextField,
  ThemeProvider,
} from "@material-ui/core";
import "./Search.css";
import SearchIcon from "@material-ui/icons/Search";
import { useEffect, useState } from "react";
import axios from "axios";
import CustomPagination from "../../components/Pagination/CustomPagination";
import SingleContent from "../../components/SingleContent/SingleContent";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader/Loader";

const Search = () => {
   //using useState to keep the track of states
  const [type, setType] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const [loading,setLoading] = useState(true);
  const [searching,setSearching] = useState(false);

  const lightTheme = createTheme({
    palette: {
      type: "light",
      primary: {
        main: "#000",
      },
    },
  });
//API calling function
  const fetchSearch = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}&include_adult=false&query=${searchText}`
      );
      setContent(data.results);
      setNumOfPages(data.total_pages);
      setLoading(false);
      setSearching(true);
      // console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
    // eslint-disable-next-line
  }, [type, page]);

  return (
    <>
    {loading ? (<Loader/>) : (
    <div>
      <ThemeProvider theme={lightTheme}>
      <Tabs
          value={type}
          indicatorColor="primary"
          textColor="primary"
          onChange={(event, newValue) => {
            setType(newValue);
            setPage(1);
          }}
          style={{ paddingBottom: 5 }}
          aria-label="disabled tabs example"
        >
          <Tab style={{ width: "50%" }} label="Search Movies" />
        </Tabs>
        <div className="search">
          <TextField
            style={{ flex: 1 }}
            className="searchBox"
            label="Search"
            variant="filled"
            onChange={(e) => {
              setSearchText(e.target.value);
            setSearching(false);
          }}
          />
          <Button
            onClick={fetchSearch}
            variant="contained"
            style={{ marginLeft: 10 }}
          >
            <SearchIcon fontSize="large" />
          </Button>
        </div>
        
      </ThemeProvider>
      <div className="popular">
      {(searchText && searching===true && content.length===0 )? (<h2 style={{color:"black"}}>No Movies Found</h2>):
        content.map((c) => (
            <Link to={`/${c.id}`}>
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              overview={c.overview}
            />
            </Link>
          ))
          }
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>)}
    </>
  );
};

export default Search;
