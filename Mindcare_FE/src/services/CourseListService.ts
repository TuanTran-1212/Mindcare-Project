import axios from "axios";

export interface CourseGet {
    id: number;
    courseCategoryId: number;
    courseCategoryName: string;
    title: string;
    author: string;
    description: string;
    imgUrl: string;
    originalPrice: number;
    discountPercent: number;
    finalPrice: number;
    level: string;
    active: boolean;
    delete: boolean;
    createAt: string;
    updateAt: string;
}

export interface CoursePostAndPut {
    courseCategoryId: number;
    title: string;
    author: string;
    description: string;
    imgUrl: File | null;
    stock: number;
    originalPrice: number;
    discountPercent: number;
    level: string;
    active: boolean;
}
// Tạo axios instance
const api = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export const CourseService = {
    //getAll
    getAll: async (): Promise<CourseGet[]> => {

        const response = await api.get("/Courses");
        return response.data;


    },

    //get by id
    getbyId: async (id: number): Promise<CourseGet> => {

        const response = await api.get(`/Courses/${id}`);
        return response.data;

    },

    //create new Course
    create: async (data: CoursePostAndPut): Promise<CoursePostAndPut> => {
        const formData = new FormData();
        // Append text fields
        formData.append("courseCategoryId", data.courseCategoryId.toString());
        formData.append("title", data.title);
        formData.append("author", data.author);
        formData.append("description", data.description);
        // Append file
        if (data.imgUrl) {
            formData.append("imgUrl", data.imgUrl);
        }
        formData.append("originalPrice", data.originalPrice.toString());
        formData.append("discountPrice", data.discountPercent.toString());
        formData.append("level", data.level);
        formData.append("active", String(data.active));

        const response = await api.post("/Courses", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
    },

    //update Course
    update: async (id: number, data: CoursePostAndPut): Promise<CoursePostAndPut> => {
        const formData = new FormData();
        // Append text fields
        formData.append("courseCategoryId", data.courseCategoryId.toString());
        formData.append("title", data.title);
        formData.append("author", data.author);
        formData.append("description", data.description);
        // Append file
        if (data.imgUrl) {
            formData.append("imgUrl", data.imgUrl);
        }
        formData.append("stock", data.stock.toString());
        formData.append("originalPrice", data.originalPrice.toString());
        formData.append("discountPrice", data.discountPercent.toString());
        formData.append("level", data.level);
        formData.append("active", String(data.active));
        console.log(formData);

        const response = await api.put(`/Courses/${id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
    },

    //delete from database
    delete: async (id: number): Promise<void> => {
        await api.delete(`/courses/${id}`);
    },
};

