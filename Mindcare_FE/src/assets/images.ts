//team
import member1 from "./img/1.png";
import member2 from './img/2.jpg';
import member3 from './img/3.jpg';
import member4 from './img/4.jpg';
import member5 from './img/5.jpg';
//about us
import picture from './img/about-us-1.jpg';
import video from './img/about-us-video.png';
//book
import book1 from './img/book1.webp';
import book2 from './img/book2.webp';
import book3 from './img/book3.jpg';
//hero
import h1 from './img/hero1.jpg';
import h2 from './img/hero2.jpg';
import h3 from './img/hero3.png';
//login
import l1 from './img/login1.png';
import l2 from './img/login2.png';
import l3 from './img/login3.png';
//logo
import lo1 from './img/logo1.png';
import lo2 from './img/logo2.png';
import LoginLogo from './img/logo-login.png';
import white from './img/logo-white.png';
//method
import m1 from './img/method1.png';
import m2 from './img/method2.png';
import m3 from './img/method3.png';
//other
import discount from './img/discount.jpg';
import guarantee from './img/guarantee.png';


type Images = {
  bookPlaceholder: string;
  team: { member1: string; member2: string; member3: string; member4: string; member5: string };
  aboutus: { picture: string; video: string };
  books: { book1: string; book2: string; book3: string };
  hero: { h1: string; h2: string; h3: string };
  login: { l1: string; l2: string; l3: string };
  logo: { lo1: string; lo2: string; LoginLogo: string; white: string };
  method: { m1: string; m2: string; m3: string };
  discount: string;
  guarantee: string;
};
export const images: Images = {
  team: { member1, member2, member3, member4, member5 },
  aboutus: { picture, video },
  books: { book1, book2, book3 },
  hero: { h1, h2, h3 },
  login: { l1, l2, l3 },
  logo: { lo1, lo2, LoginLogo, white },
  method: { m1, m2, m3 },
  discount,
  guarantee,
  bookPlaceholder: book1, // Thêm ảnh placeholder cho sách
};