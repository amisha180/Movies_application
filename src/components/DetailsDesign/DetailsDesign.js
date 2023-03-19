import { img_300, unavailable } from "../../config/config";
import "./DetailsDesign.css";
const DetailsDesign = ({
  id,
  poster,
  title,
  date,
 overview
}) => {
  return (
      
      <div className="detail">
      <img
        src={poster ? `${img_300}${poster}` : unavailable}
        alt={title}
      />
      <b >{title}</b>
      <div >
        {overview}
        </div>
        <div >{date}</div>
        </div>
  );
};

export default DetailsDesign;
