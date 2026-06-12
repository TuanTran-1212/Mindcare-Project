import axios from "axios";

export interface BookGet {
    id: number;
    bookCategoryId: number;
    bookCategoryName: string;
    title: string;
    author: string;
    publisher: string;
    publishedYear: number //year
    description: string;
    imgUrl: string;
    stock: number;
    originalPrice: number;
    discountPercent: number;
    finalPrice: number;
    pages: number;
    active: boolean;
    delete: boolean;
    createAt: string;
    updateAt: string;
}

export interface BookPostAndPut {
    bookCategoryId: number;
    title: string;
    author: string;
    publisher: string;
    publishedYear: number //year
    description: string;
    imgUrl: File | null;
    stock: number;
    originalPrice: number;
    discountPercent: number;
    pages: number;
    active: boolean;
}
// Tạo axios instance
const api = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export const BookService = {
    //getAll
    getAll: async (): Promise<BookGet[]> => {

        const response = await api.get("/books");
        return response.data;


    },

    //get by id
    getbyId: async (id: number): Promise<BookGet> => {

        const response = await api.get(`/books/${id}`);
        return response.data;

    },

    //create new book
    create: async (data: BookPostAndPut): Promise<BookPostAndPut> => {
        const formData = new FormData();
        // Append text fields
        formData.append("bookCategoryId", data.bookCategoryId.toString());
        formData.append("title", data.title);
        formData.append("author", data.author);
        formData.append("publisher", data.publisher);
        formData.append("publishedYear", data.publishedYear.toString());
        formData.append("description", data.description);
        // Append file
        if (data.imgUrl) {
            formData.append("imgUrl", data.imgUrl);
        }
        formData.append("stock", data.stock.toString());
        formData.append("originalPrice", data.originalPrice.toString());
        formData.append("discountPrice", data.discountPercent.toString());
        formData.append("pages", data.pages.toString());
        formData.append("active", String(data.active));

        const response = await api.post("/books", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
    },

    //update book
    update: async (id: number, data: BookPostAndPut): Promise<BookPostAndPut> => {
        const formData = new FormData();
        // Append text fields
        formData.append("bookCategoryId", data.bookCategoryId.toString());
        formData.append("title", data.title);
        formData.append("author", data.author);
        formData.append("publisher", data.publisher);
        formData.append("publishedYear", data.publishedYear.toString());
        formData.append("description", data.description);
        // Append file
        if (data.imgUrl) {
            formData.append("imgUrl", data.imgUrl);
        }
        formData.append("stock", data.stock.toString());
        formData.append("originalPrice", data.originalPrice.toString());
        formData.append("discountPrice", data.discountPercent.toString());
        formData.append("pages", data.pages.toString());
        formData.append("active", String(data.active));
        console.log(formData);

        const response = await api.put(`/books/${id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
    },

    //delete from database
    delete: async (id: number): Promise<void> => {
    await api.delete(`/books/${id}`);
},
};

