import CourseShopSection from "../../../components/User/shoping/CoursesShopSection";

import RegistrationContactForm from "../../../components/User/shoping/RegistrationContactForm";

const CourseShop = () => {
    return (
        <>
        
        <CourseShopSection  itemsPerPage={8} individual={true}/>
        <RegistrationContactForm/>
        </>
    )
};
export default CourseShop;