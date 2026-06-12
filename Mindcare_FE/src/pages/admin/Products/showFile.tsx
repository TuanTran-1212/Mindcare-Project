// pages/admin/AddBook.tsx
import React, { useState } from 'react';
import RichTextEditor from '../../../components/admin/common/RichTextEditor';
import axios from 'axios';

const AddBook = () => {
  
  const [description, setDescription] = useState('');

  const handleSubmit = async () => {
    await axios.post('/api/books', { description });
    alert('Lưu thành công');
  };

  return (
    <div>
     
      <RichTextEditor value={description} onChange={setDescription} placeholder="Mô tả sách..." />
      <button className="btn btn-primary mt-3" onClick={handleSubmit}>Lưu</button>
    </div>
  );
};

export default AddBook;