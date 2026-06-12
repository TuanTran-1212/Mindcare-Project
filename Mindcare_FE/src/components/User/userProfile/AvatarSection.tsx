// src/components/profile/AvatarSection.tsx
import React, { useRef } from "react";

interface AvatarSectionProps {
  avatarSrc: string;
  onAvatarChange: (src: string) => void;
  onMessage: (msg: string, type: "success" | "error") => void;
}

/**
 * AvatarSection - displays and allows uploading a profile avatar.
 */
const AvatarSection: React.FC<AvatarSectionProps> = ({
  avatarSrc,
  onAvatarChange,
  onMessage,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      onMessage("Please select an image file.", "error");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      onMessage("File size must not exceed 5MB.", "error");
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      onAvatarChange(result);
      onMessage("Profile picture updated successfully!", "success");
    };
    reader.readAsDataURL(file);
  };

  return (
    <section className="profile-section avatar-section">
      <h2 className="section-title">Profile Picture</h2>
      <div className="avatar-container">
        <img
          id="avatar-preview"
          src={avatarSrc}
          alt="Avatar"
          className="avatar-image"
        />
        <label
          htmlFor="avatar-upload"
          className="avatar-upload-btn"
          title="Change photo"
        >
          <i className="fas fa-camera" />
        </label>
        <input
          type="file"
          id="avatar-upload"
          ref={fileInputRef}
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>
    </section>
  );
};

export default AvatarSection;
