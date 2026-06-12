import axios from "axios";

export interface categoryGet {
    id: number;
    name: string;
    courseCount: number;
    active: boolean;
}

export interface categoryPostAndPut {
    name: string;
    active: boolean;
}

// Tạo axios instance
const api = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export const CourseCategoryService = {
    // Service getAll 
    getAll: async (): Promise<categoryGet[]> => {
        try {
            const response = await api.get("/course-categories");
            return response.data;
        } catch (error) {
            console.error('Error get all course categories:', error);
            throw error;
        }
    },

    // Service create
    create: async (data: categoryPostAndPut): Promise<categoryGet> => {
        try { 
            const response = await api.post("/course-categories", data);
            return response.data as categoryGet;
        } catch (error) {
            console.error('Error create course category:', error);
            throw error;
        }
    },

    // Service update 
    update: async (id: number, data: Partial<categoryGet>): Promise<categoryGet> => {
        try {
            const response = await api.put(`/course-categories/${id}`, data);
            return response.data as categoryGet;
        } catch (error) {
            console.error(`Error update course category with id ${id}:`, error);
            throw error;
        }
    },

    // Service delete 
    delete: async (id: number): Promise<void> => {
        try {
            await api.delete(`/course-categories/${id}`);
        } catch (error) {
            console.error(`Error delete course category with id ${id}:`, error);
            throw error;
        }
    },
};

