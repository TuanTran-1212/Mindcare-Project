// components/RichTextEditor.tsx
import { useRef } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import axios from "axios";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const RichTextEditor = ({
  value,
  onChange,
  placeholder,
}: RichTextEditorProps) => {
  const quillRef = useRef<ReactQuill>(null);

  // Upload ảnh lên server
  const imageHandler = async () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("image", file);

      try {
        // Gọi API upload ảnh (thay bằng URL backend của bạn)
        const response = await axios.post(
          "http://localhost:8080/api/upload/image",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          },
        );
        const imageUrl = response.data.url; // Ví dụ: "/uploads/abc.jpg"

        const quill = quillRef.current?.getEditor();
        if (quill) {
          const range = quill.getSelection(true);
          quill.insertEmbed(range.index, "image", imageUrl);
        }
      } catch (error) {
        console.error("Upload ảnh thất bại", error);
        alert("Không thể upload ảnh, vui lòng thử lại");
      }
    };
  };

  // Chèn video YouTube
  const videoHandler = () => {
    const url = prompt(
      "Nhập URL YouTube (ví dụ: https://www.youtube.com/watch?v=...):",
    );
    if (url) {
      const quill = quillRef.current?.getEditor();
      if (quill) {
        const range = quill.getSelection(true);
        quill.insertEmbed(range.index, "video", url);
      }
    }
  };

  // Cấu hình toolbar (giống Word)
  const modules = {
    toolbar: {
      container: [
        // Hàng 1: Font, size, định dạng cơ bản
        [{ font: [] }, { size: [] }],
        ["bold", "italic", "underline", "strike"],
        // Hàng 2: Màu chữ, màu nền, căn lề
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        // Hàng 3: Danh sách, thụt lề
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }],
        // Hàng 4: Link, ảnh, video, undo/redo, xoá định dạng
        ["link", "image", "video"],
        [ "clean"],
      ],
      handlers: {
        image: imageHandler, // ghi đè xử lý nút ảnh
        video: videoHandler, // ghi đè xử lý nút video
      },
    },
  };

  // Các định dạng được phép
  const formats = [
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "align",
    "list",

    "indent",
    "link",
    "image",
    "video",
    
  ];

  return (
    <ReactQuill
      style={{ height: "350px", paddingBottom: "40px" }}
      ref={quillRef}
      theme="snow"
      value={value}
      onChange={onChange}
      modules={modules}
      formats={formats}
      placeholder={placeholder || "Soạn thảo nội dung..."}
    />
  );
};

export default RichTextEditor;
