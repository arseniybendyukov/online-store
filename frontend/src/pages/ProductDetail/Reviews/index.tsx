import { useOutletContext } from "react-router-dom";
import { OutletContext } from "../types";
import css from './index.module.css';
import { RatingStatsBar } from "../../../components/RatingStatsBar";

export function Reviews() {
  const { reviews } = useOutletContext<OutletContext>();

  return (
    <div className={css.container}>
      <div className={css.side}>
        <RatingStatsBar
          avgRating={reviews.avgRating}
          ratings={reviews.reviews.map((review) => review.rating)}
        />
      </div>
      <div className={css.main}></div>
    </div>
  );
}
