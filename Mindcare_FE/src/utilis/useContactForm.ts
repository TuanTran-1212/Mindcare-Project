import { useState } from 'react';
import { showNotification } from './Notification';

interface ContactFormData {
    name: string;
    phone: string;
    email?: string;
}

export const useContactForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validatePhone = (phone: string): boolean => {
        const phoneRegex = /(0[3|5|7|8|9])+([0-9]{8})\b/;
        return phoneRegex.test(phone);
    };

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const submitForm = async (formData: ContactFormData): Promise<boolean> => {
        if (!formData.name || !formData.phone) {
            showNotification('Vui lòng điền đầy đủ thông tin bắt buộc!', 'error');
            return false;
        }

        if (!validatePhone(formData.phone)) {
            showNotification('Số điện thoại không hợp lệ!', 'error');
            return false;
        }

        if (formData.email && !validateEmail(formData.email)) {
            showNotification('Email không hợp lệ!', 'error');
            return false;
        }

        setIsSubmitting(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            showNotification('Đăng ký thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.', 'success');
            return true;
        } catch (error) {
            console.log('Error submitting contact form:', error);
            showNotification('Có lỗi xảy ra, vui lòng thử lại!', 'error');
            return false;
        } finally {
            setIsSubmitting(false);
        }
    };

    return { submitForm, isSubmitting };
};