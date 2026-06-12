// components/coaches/CoachFilterBar.tsx
//
// ══════════════════════════════════════════════════════════════════════════════
// LUỒNG HOẠT ĐỘNG:
//
//   CoachListPage (giữ state: selectedLocation, selectedTag)
//       ↓ truyền props xuống
//   CoachFilterBar (chỉ render UI, không giữ state)
//       ↓ user thay đổi dropdown / click tag
//   onLocationChange(value) / onTagChange(tag)
//       ↓ callback gọi lên parent
//   CoachListPage cập nhật state → re-render → danh sách coach lọc lại
//
// THIẾT KẾ "CONTROLLED COMPONENT":
//   CoachFilterBar không tự quản lý state — nhận value từ parent, gọi callback khi đổi
//   → Dễ test, dễ reset, dễ sync với URL params sau này
//
// KHI CHUYỂN SANG API:
//   Thay vì filter client-side trong CoachListPage,
//   mỗi khi selectedLocation / selectedTag thay đổi → gọi API với query params:
//   fetch(`/api/coaches?location=${selectedLocation}&tag=${selectedTag}`)
// ══════════════════════════════════════════════════════════════════════════════




// ── Props ─────────────────────────────────────────────────────────────────────

interface CoachFilterBarProps {
  // Danh sách location để populate dropdown (lấy từ ALL_LOCATIONS)
  locationOptions: string[];

  // Danh sách tag để render pill buttons (lấy từ ALL_TAGS)
  tagOptions: string[];

  // Giá trị đang được chọn — controlled từ parent
  selectedLocation: string;
  selectedTag: string;

  // Callbacks — gọi lên parent khi user thay đổi filter
  onLocationChange: (location: string) => void;
  onTagChange: (tag: string) => void;
}

// ── Component ─────────────────────────────────────────────────────────────────

const CoachFilterBar = ({
  locationOptions,
  tagOptions,
  selectedLocation,
  selectedTag,
  onLocationChange,
  onTagChange,
}: CoachFilterBarProps) => {
  return (
    <div className="search-feild " style={{ marginBottom: 0 }}>
      <form className="search-form">
        <select
          value={selectedLocation}
          onChange={(e) => onLocationChange(e.target.value)}
          // onChange: mỗi khi chọn → gọi callback → parent cập nhật state
          className="location-select"
          aria-label="Filter by coach location"
        >
          {locationOptions.map((location) => (
            <option key={location} value={location}>
              {location === "All Locations"
                ? "Coach location: All"
                : `📍 ${location}`}
            </option>
          ))}
        </select>

        <select
          value={selectedTag}
          onChange={(ev) => onTagChange(ev.target.value)}
          // onChange: mỗi khi chọn → gọi callback → parent cập nhật state
          className="location-select"
          aria-label="Filter by coach location"
        >
          {tagOptions.map((tag) => (
            <option key={tag} value={tag}>
              {tag === "All tags" ? "Coach tag: All" : ` ${tag}`}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
};

export default CoachFilterBar;
