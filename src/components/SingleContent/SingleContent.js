import { Badge } from "@material-ui/core";
import { img_300, unavailable } from "../../config/config";
import "./SingleContent.css";
import ContentModal from "../ContentModal/ContentModal";

const SingleContent = ({
  id,
  poster,
  title,
  date,
 overview
}) => {
  return (
    <ContentModal  id={id}>
      
      <img
        className="poster"
        src={poster ? `${img_300}${poster}` : unavailable}
        alt={title}
      />
      <b className="title">{title}</b>
      <div className="subTitle">
        {overview && overview.substring(0,80)}...
        </div>
        <div className="rel_date">{date}</div>
      
    </ContentModal>
  );
};

export default SingleContent;
