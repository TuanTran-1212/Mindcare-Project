import HeroSection from "../../../components/User/shoping/HeroSection";

import BookShopSection from "../../../components/User/shoping/BookShopSection";
import { books } from "../../../data/BookData";

import CourseShopSection from "../../../components/User/shoping/CoursesShopSection";
import { courses } from "../../../data/CourseData";

import RegistrationContactForm from "../../../components/User/shoping/RegistrationContactForm";

const Shopping = () => {
    return (
        <>
        <HeroSection/>
        <BookShopSection books={books} itemsPerPage={4}/>
        <CourseShopSection courses={courses} itemsPerPage={4}/>
        <RegistrationContactForm/>
        </>
    )
};
export default Shopping;