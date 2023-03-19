  import { useEffect, useState } from "react";
  import axios from "axios";
  import { useParams } from "react-router-dom";
  import DetailsDesign from "../../components/DetailsDesign/DetailsDesign"
  import Loader from "../../components/Loader/Loader";
  
  const Details = () => {
    //using useState to keep the track of states
    const [content,setContent] = useState();
    const [loading,setLoading] = useState(true);

    //Extracting id from url
    let {id} = useParams();

    //API calling function
    const fetchDetails = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        );
        setContent([data]);
        setLoading(false);
        // console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
  
    useEffect(() => {
      window.scroll(0, 0);
      fetchDetails();
      // eslint-disable-next-line
    }, []);
  
    return (
    <>
    {loading ? (<Loader/>) : (
      <div>
         <div className="container">
          {content &&
            content.map((c) => (
              <DetailsDesign
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              overview={c.overview}
            />
            ))} 
         </div> 
      </div>)}
      </>
    );
  };
  
  export default Details;
  