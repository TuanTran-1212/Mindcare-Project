// utilis/useFormValidation.ts
//
// ══════════════════════════════════════════════════════════════════════════════
// UNIVERSAL FORM VALIDATOR — dùng cho tất cả form trong project
//
// CÁCH HOẠT ĐỘNG:
//   1. Định nghĩa FormData với các field cần validate (field nào không có → undefined)
//   2. Gọi validateForm(data) → nhận về { valid: boolean, errors: Record<string, string> }
//   3. Nếu valid = false → errors chứa message lỗi cho từng field
//   4. Nếu valid = true  → gọi submitForm(data, onSuccess, onError) để submit
//
// CÁC FORM ĐANG DÙNG TRONG PROJECT:
//   - Contact form (name, phone, email?)       → useContactForm.ts (sẽ thay bằng file này)
//   - Order form   (name, address, phone, email, paymentMethod)
//   - Booking form (name, phone, email?, date?, message?)
//   Mỗi form chỉ truyền vào các field nó có — field không có → bỏ qua, không validate
//
// CÁCH DÙNG (xem ví dụ chi tiết ở cuối file)
// ══════════════════════════════════════════════════════════════════════════════

import { useState } from 'react';
import { showNotification } from './Notification';

// ── 1. KIỂU DỮ LIỆU ────────────────────────────────────────────────────────

/**
 * FormData — shape của dữ liệu form
 * Tất cả field đều optional (?) vì không form nào có đủ tất cả
 * Khi validate: chỉ kiểm tra field nào được truyền vào (không undefined)
 */
export interface FormData {
  name?: string;           // Họ tên — bắt buộc nếu có
  email?: string;          // Email — validate định dạng nếu có
  phone?: string;          // Số điện thoại VN — validate regex nếu có
  address?: string;        // Địa chỉ — bắt buộc nếu có
  paymentMethod?: string;  // Hình thức thanh toán — bắt buộc nếu có
  date?: string;           // Ngày hẹn / đặt lịch — bắt buộc nếu có
  message?: string;        // Tin nhắn — KHÔNG bắt buộc, chỉ kiểm tra độ dài tối đa
}

/**
 * ValidationResult — kết quả trả về sau khi validate
 * valid:  true  → tất cả field hợp lệ, có thể submit
 * valid:  false → có lỗi, errors chứa message cho từng field
 * errors: { fieldName: "thông báo lỗi" }
 */
export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
  // Record<string, string> = object với key là string, value là string
  // VD: { name: "Vui lòng nhập họ tên", phone: "Số điện thoại không hợp lệ" }
}

/**
 * SubmitOptions — tuỳ chọn khi submit form
 */
export interface SubmitOptions {
  /** URL API để gửi data. Nếu không truyền → giả lập (setTimeout) */
  apiUrl?: string;
  /** Message hiển thị khi thành công. Mặc định: "Gửi thành công!" */
  successMessage?: string;
  /** Có redirect sau khi thành công không */
  redirectUrl?: string;
  /** Thời gian giả lập API call (ms). Mặc định: 1500ms */
  mockDelay?: number;
}

// ── 2. REGEX VALIDATORS ─────────────────────────────────────────────────────

/**
 * Regex số điện thoại Việt Nam
 * Hợp lệ: 0[3,5,7,8,9]xxxxxxxx (10 chữ số)
 * VD hợp lệ:   0912345678, 0365432198, 0789123456
 * VD không hợp lệ: 01234, 123456789, 091234567 (9 số)
 */
const PHONE_REGEX = /(0[3|5|7|8|9])+([0-9]{8})\b/;

/**
 * Regex email cơ bản
 * Hợp lệ: có @, có domain, có extension
 * VD: user@gmail.com, name.last@company.vn
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ── 3. CÁC HÀM VALIDATE ĐƠN LẺ ────────────────────────────────────────────
// Export riêng để có thể dùng độc lập nếu cần

/** Kiểm tra chuỗi không rỗng sau khi trim() */
export const isRequired = (value: string | undefined): boolean =>
  !!value && value.trim().length > 0;

/** Kiểm tra số điện thoại Việt Nam */
export const isValidPhone = (phone: string): boolean =>
  PHONE_REGEX.test(phone.trim());

/** Kiểm tra định dạng email */
export const isValidEmail = (email: string): boolean =>
  EMAIL_REGEX.test(email.trim());

/** Kiểm tra độ dài tối đa (dùng cho message, description...) */
export const isWithinMaxLength = (value: string, max: number): boolean =>
  value.trim().length <= max;

// ── 4. HÀM VALIDATE TỔNG HỢP ───────────────────────────────────────────────

/**
 * validateForm — Validate toàn bộ FormData
 *
 * Logic:
 *   - Duyệt từng field trong data
 *   - Nếu field = undefined → bỏ qua (form này không có field đó)
 *   - Nếu field có giá trị → kiểm tra theo rule của field đó
 *   - Trả về { valid, errors }
 *
 * @param data - Object FormData (chỉ truyền vào field mà form có)
 * @returns ValidationResult
 */
export const validateForm = (data: FormData): ValidationResult => {
  const errors: Record<string, string> = {};

  // ── name: bắt buộc nếu được truyền vào ──────────────────────────
  // undefined = form không có field name → bỏ qua
  // "" hoặc "  " = form có field nhưng user chưa nhập → báo lỗi
  if (data.name !== undefined && !isRequired(data.name)) {
    errors.name = 'Vui lòng nhập họ tên!';
  }

  // ── phone: bắt buộc + kiểm tra định dạng VN ─────────────────────
  if (data.phone !== undefined) {
    if (!isRequired(data.phone)) {
      errors.phone = 'Vui lòng nhập số điện thoại!';
    } else if (!isValidPhone(data.phone)) {
      // Có nhập nhưng sai định dạng → báo lỗi định dạng
      errors.phone = 'Số điện thoại không hợp lệ! (VD: 0912345678)';
    }
  }

  // ── email: KHÔNG bắt buộc, nhưng nếu có thì phải đúng định dạng ─
  // Trường hợp:
  //   email = undefined       → form không có field email → bỏ qua
  //   email = ""              → form có field, user để trống → OK (không bắt buộc)
  //   email = "abc"           → có nhập nhưng sai định dạng → báo lỗi
  //   email = "abc@gmail.com" → hợp lệ → OK
  if (data.email !== undefined && data.email.trim() !== '' && !isValidEmail(data.email)) {
    errors.email = 'Email không hợp lệ! (VD: name@gmail.com)';
  }

  // ── address: bắt buộc nếu được truyền vào ───────────────────────
  if (data.address !== undefined && !isRequired(data.address)) {
    errors.address = 'Vui lòng nhập địa chỉ!';
  }

  // ── paymentMethod: bắt buộc nếu được truyền vào ─────────────────
  // Thường là radio button — undefined khi chưa chọn
  if (data.paymentMethod !== undefined && !isRequired(data.paymentMethod)) {
    errors.paymentMethod = 'Vui lòng chọn hình thức thanh toán!';
  }

  // ── date: bắt buộc nếu được truyền vào ──────────────────────────
  if (data.date !== undefined && !isRequired(data.date)) {
    errors.date = 'Vui lòng chọn ngày!';
  }

  // ── message: KHÔNG bắt buộc, chỉ giới hạn độ dài ───────────────
  // Nếu có nhập và vượt 500 ký tự → báo lỗi
  if (
    data.message !== undefined &&
    data.message.trim() !== '' &&
    !isWithinMaxLength(data.message, 500)
  ) {
    errors.message = 'Tin nhắn không được vượt quá 500 ký tự!';
  }

  return {
    valid: Object.keys(errors).length === 0,
    // Object.keys(errors).length === 0 → không có lỗi nào → valid = true
    errors,
  };
};

// ── 5. CUSTOM HOOK ──────────────────────────────────────────────────────────

/**
 * useFormValidation — React hook bọc validate + submit + loading state
 *
 * Trả về:
 *   - errors:      lỗi hiện tại (hiển thị inline dưới input)
 *   - isSubmitting: đang gửi (dùng để disable button)
 *   - validate:    gọi validateForm, lưu errors vào state
 *   - submitForm:  validate + gọi API + hiển thị notification
 *   - clearErrors: xoá toàn bộ lỗi (dùng khi reset form)
 *
 * CÁCH DÙNG:
 *   const { errors, isSubmitting, submitForm, clearErrors } = useFormValidation();
 */
export const useFormValidation = () => {
  // errors state — lưu lỗi để hiển thị inline dưới từng input
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * validate — Chỉ validate, không submit
   * Dùng khi muốn kiểm tra realtime (onBlur của input)
   */
  const validate = (data: FormData): boolean => {
    const result = validateForm(data);
    setErrors(result.errors);
    return result.valid;
  };

  /**
   * submitForm — Validate + Submit
   *
   * @param data        - FormData cần submit
   * @param options     - SubmitOptions (apiUrl, successMessage, redirectUrl...)
   * @param onSuccess   - Callback khi thành công (VD: reset form, navigate...)
   * @param onError     - Callback khi thất bại
   */
  const submitForm = async (
    data: FormData,
    options: SubmitOptions = {},
    onSuccess?: () => void,
    onError?: (error: unknown) => void,
  ): Promise<boolean> => {

    // Bước 1: Validate trước khi submit
    const result = validateForm(data);
    setErrors(result.errors);

    if (!result.valid) {
      // Lấy lỗi đầu tiên để hiển thị notification tổng
      const firstError = Object.values(result.errors)[0];
      showNotification(firstError, 'error');
      return false;
    }

    // Bước 2: Bắt đầu submit — set loading
    setIsSubmitting(true);

    try {
      if (options.apiUrl) {
        // ── Gọi API thật ──────────────────────────────────────────
        // Khi có apiUrl → fetch thật, gửi data lên server
        const response = await fetch(options.apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          // HTTP error (4xx, 5xx) → throw để catch bắt
          throw new Error(`Server error: ${response.status}`);
        }
      } else {
        // ── Giả lập API call (chưa có backend) ───────────────────
        // Dùng setTimeout để simulate delay mạng
        // Thay bằng fetch() khi có API thật
        await new Promise(resolve =>
          setTimeout(resolve, options.mockDelay ?? 1500)
        );
      }

      // Bước 3: Thành công
      showNotification(
        options.successMessage ?? 'Gửi thành công! Chúng tôi sẽ liên hệ sớm nhất.',
        'success'
      );

      // Redirect nếu có (VD: sau đặt hàng → về trang chủ)
      if (options.redirectUrl) {
        window.location.href = options.redirectUrl;
      }

      // Xoá lỗi + gọi callback thành công
      setErrors({});
      onSuccess?.(); // ?. = gọi nếu onSuccess được truyền vào, bỏ qua nếu undefined

      return true;

    } catch (error) {
      // Bước 4: Thất bại — network error hoặc server error
      console.error('Form submit error:', error);
      showNotification('Có lỗi xảy ra, vui lòng thử lại!', 'error');
      onError?.(error);
      return false;

    } finally {
      // finally: luôn chạy dù thành công hay thất bại → tắt loading
      setIsSubmitting(false);
    }
  };

  /** clearErrors — reset lỗi (dùng khi reset form hoặc user bắt đầu nhập lại) */
  const clearErrors = () => setErrors({});

  return { errors, isSubmitting, validate, submitForm, clearErrors };
};

// ══════════════════════════════════════════════════════════════════════════════
// VÍ DỤ CÁCH DÙNG TRONG TỪNG FORM
// ══════════════════════════════════════════════════════════════════════════════

// ── Ví dụ 1: Contact Form (name, phone, email tuỳ chọn) ──────────────────────a
//
// import { useFormValidation } from "../../utilis/useFormValidation";
//
// const ContactForm = () => {
//   const [name, setName]   = useState("");
//   const [phone, setPhone] = useState("");
//   const [email, setEmail] = useState("");
//   const { errors, isSubmitting, submitForm, clearErrors } = useFormValidation();
//
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const success = await submitForm(
//       { name, phone, email },           // chỉ truyền field form có (address, paymentMethod → không truyền)
//       { successMessage: "Đăng ký thành công! Chúng tôi sẽ liên hệ sớm." },
//       () => { setName(""); setPhone(""); setEmail(""); }  // onSuccess: reset form
//     );
//   };
//
//   return (
//     <form onSubmit={handleSubmit}>
//       <input value={name} onChange={e => setName(e.target.value)} placeholder="Họ tên *" />
//       {errors.name && <span className="error">{errors.name}</span>}   {/* inline error */}
//
//       <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Điện thoại *" />
//       {errors.phone && <span className="error">{errors.phone}</span>}
//
//       <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
//       {errors.email && <span className="error">{errors.email}</span>}
//
//       <button type="submit" disabled={isSubmitting}>
//         {isSubmitting ? "Đang gửi..." : "Gửi"}
//       </button>
//     </form>
//   );
// };

// ── Ví dụ 2: Order Form (name, address, phone, email, paymentMethod) ─────────
//
// const handleOrder = async () => {
//   await submitForm(
//     { name, address, phone, email, paymentMethod },
//     {
//       successMessage: "Đặt hàng thành công!",
//       redirectUrl: "/",           // redirect về trang chủ sau khi đặt hàng
//     }
//   );
// };

// ── Ví dụ 3: Booking Form (name, phone, email?, date, message?) ───────────────
//
// const handleBooking = async () => {
//   await submitForm(
//     { name, phone, email, date, message },   // email và message có thể rỗng → vẫn OK
//     {
//       apiUrl: "https://api.yoursite.com/booking",  // gọi API thật khi có backend
//       successMessage: "Đặt lịch thành công!",
//     },
//     () => form.reset()  // onSuccess: reset form
//   );
// };

// ── Ví dụ 4: Validate độc lập không cần hook (dùng ngoài React component) ────
//
// import { validateForm } from "../../utilis/useFormValidation";
//
// const result = validateForm({ name: "John", phone: "0912345678" });
// if (!result.valid) {
//   console.log(result.errors); // { phone: "..." } nếu sai định dạng
// }