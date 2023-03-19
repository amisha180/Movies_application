import axios from "axios";
import "./Popular.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/Pagination/CustomPagination";
import Loader from "../../components/Loader/Loader";

const Popular = () => {
  //using useState to keep the track of states
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [loading,setLoading] = useState(true);

  //API calling function
  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}&adult=false`
    );

    setContent(data.results);
    setLoading(false);
  };
  
  useEffect(() => {
    window.scroll(0, 0);
    fetchTrending();
    // eslint-disable-next-line
  }, [page]);

  return (
  <>
    {loading?(<Loader/>):(
  
    <div>
      <span className="pageTitle">Popular Movies</span>
      <div className="popular">
        {content &&
          content.map((c) => (
         <Link to={`/${c.id}`}><SingleContent
         key={c.id}
         id={c.id}
         poster={c.poster_path}
         title={c.title || c.name}
         overview={c.overview}
         date={c.first_air_date || c.release_date}
       /></Link> 
          ))}
      </div>
      <CustomPagination setPage={setPage} />
    </div>)
}
    </>
  );
};

export default Popular;
