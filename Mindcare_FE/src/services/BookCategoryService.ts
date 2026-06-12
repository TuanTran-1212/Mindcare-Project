import axios from "axios";

export interface categoryGet {
    id: number;
    name: string;
    bookCount: number;
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

export const BookCategoryService = {
    // Service getAll 
    getAll: async (): Promise<categoryGet[]> => {
        try {
            const response = await api.get("/book-categories");
            return response.data;
        } catch (error) {
            console.error('Error get all book categories:', error);
            throw error;
        }
    },

    // Service create
    create: async (data: categoryPostAndPut): Promise<categoryGet> => {
        try { 
            const response = await api.post("/book-categories", data);
            return response.data as categoryGet;
        } catch (error) {
            console.error('Error create book category:', error);
            throw error;
        }
    },

    // Service update 
    update: async (id: number, data: Partial<categoryGet>): Promise<categoryGet> => {
        try {
            const response = await api.put(`/book-categories/${id}`, data);
            return response.data as categoryGet;
        } catch (error) {
            console.error(`Error update book category with id ${id}:`, error);
            throw error;
        }
    },

    // Service delete 
    delete: async (id: number): Promise<void> => {
        try {
            await api.delete(`/book-categories/${id}`);
        } catch (error) {
            console.error(`Error delete book category with id ${id}:`, error);
            throw error;
        }
    },
};

