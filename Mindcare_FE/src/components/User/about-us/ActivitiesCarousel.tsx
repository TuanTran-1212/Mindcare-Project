import type React from "react";

import type { Activity } from "../../../data/ActivitiesData";

interface ActivitiesCarouselProps {
  activities: Activity[];
}

const ActivitiesCarousel = ({ activities }: ActivitiesCarouselProps) => {
  return (
    <>
      {/* Our Activities */}
      <section className="activities pt-2 pb-2">
        {/* Carousel */}
        <div className="activities-carousel">
          <div className="activities-group">
            {activities.map((activity, index) => (
              <div className="activities-card" key={index}>
                <img src={activity.image} alt={activity.name} />
              </div>
            ))}
            {/**Duplicate */}
            {activities.map((activity, index) => (
              <div className="activities-card" key={index}>
                <img src={activity.image} alt={activity.name} />
              </div>
            ))}
            {activities.map((activity, index) => (
              <div className="activities-card" key={index}>
                <img src={activity.image} alt={activity.name} />
              </div>
            ))}
            {activities.map((activity, index) => (
              <div className="activities-card" key={index}>
                <img src={activity.image} alt={activity.name} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
export default ActivitiesCarousel;
