// AddBook.tsx
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';

interface BookFormData {
  title: string;
  price: number;
  status: string;
  image: File | null;  // lưu file
}

// eslint-disable-next-line react-refresh/only-export-components
const AddBook = () => {
  const { control, handleSubmit, reset, setValue } = useForm<BookFormData>({
    defaultValues: { title: '', price: 0, status: 'active', image: null }
  });
  const [preview, setPreview] = useState<string | null>(null);

  // Xử lý khi chọn file
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue('image', file);
      setPreview(URL.createObjectURL(file));  // tạo preview tạm thời
    }
  };

  const onSubmit = async (data: BookFormData) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('price', String(data.price));
    formData.append('status', data.status);
    if (data.image) {
      formData.append('image', data.image);
    }

    try {
      await axios.post('http://localhost:8080/api/books', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Thêm sách thành công');
      reset();
      setPreview(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Title</label>
        <Controller
          name="title"
          control={control}
          render={({ field }) => <input {...field} />}
        />
      </div>
      <div>
        <label>Price</label>
        <Controller
          name="price"
          control={control}
          render={({ field }) => <input type="number" {...field} />}
        />
      </div>
      <div>
        <label>Status</label>
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <select {...field}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          )}
        />
      </div>
      <div>
        <label>Book Image</label>
        <input type="file" accept="image/*" onChange={onFileChange} />
        {preview && <img src={preview} alt="preview" width="100" />}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};