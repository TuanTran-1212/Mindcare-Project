import { images } from "../assets/images";

export interface Activity {
  id: number;
  name: string;
  image: string;
}

export const activities: Activity[] = [
  {
    id: 1,
    name: "Individual Coaching Session",
    image: images.aboutus.picture,
  },
  {
    id: 2,
    name: "Group Workshops",
    image: images.hero.h1,
  },
  {
    id: 3,
    name: "Mindfulness Sessions",
    image: images.hero.h2,
  },
  {
    id: 4,
    name: "Online Coaching",
    image: images.hero.h3,
  },
  {
    id: 5,
    name: "Team Building",
    image: images.team.member1,
  },
  {
    id: 6,
    name: "Wellness Retreats",
    image: images.team.member2,
  },
  {
    id: 7,
    name: "Personal Development",
    image: images.team.member3,
  },
  {
    id: 8,
    name: "Leadership Training",
    image: images.team.member4,
  },
];
