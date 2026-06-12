
import BookShopSection from "../../../components/User/shoping/BookShopSection";
import { books } from "../../../data/BookData";

import RegistrationContactForm from "../../../components/User/shoping/RegistrationContactForm";

const BookShop = () => {
    return (
        <>
        
        <BookShopSection books={books} itemsPerPage={8} individual={true}/>
        <RegistrationContactForm/>
        </>
    )
};
export default BookShop;