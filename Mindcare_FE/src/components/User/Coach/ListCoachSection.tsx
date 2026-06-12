// pages/coaches/CoachListPage.tsx
//
// ══════════════════════════════════════════════════════════════════════════════
// LUỒNG HOẠT ĐỘNG TỔNG THỂ:
//
//   1. Page mount → load coaches[] từ data tĩnh (hoặc API sau này)
//   2. User chọn location dropdown → setSelectedLocation → re-render
//   3. User click tag pill → setSelectedTag → re-render
//   4. filteredCoaches = coaches.filter(theo location + tag)
//   5. usePagination(filteredCoaches) → chia trang
//   6. Items<Coach> render danh sách → mỗi item là 1 CoachCard
//
// STATE FLOW:
//   selectedLocation ─┐
//                     ├─→ filteredCoaches → usePagination → currentPageCoaches
//   selectedTag ──────┘
//
// KHI CHUYỂN SANG API (3 bước):
//   Bước 1: Thêm useState isLoading + error
//   Bước 2: Thay coaches[] bằng useEffect + fetch
//   Bước 3: Khi filter thay đổi → gọi lại API thay vì filter client-side
//   (xem comment chi tiết ở từng section bên dưới)
// ══════════════════════════════════════════════════════════════════════════════

import React, { useState, useMemo } from "react";

import { teamMembers, ALL_LOCATIONS, ALL_TAGS } from "../../../data/TeamMember";
import type { TeamMember } from "../../../data/Types";

import CoachFilterBar from "./CoachFilterBar";
import CoachCard from "./CoachCard";
import Items from "../common/itemList/ItemList";
import { PaginationNumbers } from "../common/pagination/Pagination";
import { usePagination } from "../../../utilis/usePagination";



const COACHES_PER_PAGE = 6;

const ListCoachSection = () => {
  // ── Filter state ─────────────────────────────────────────────────────────
  // "All Locations" và "All" là giá trị mặc định → không filter
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [selectedTag, setSelectedTag] = useState("All");

  // ── [API] Thêm vào đây khi có backend: ──────────────────────────────────
  // const [coachList, setCoachList] = useState<Coach[]>([]);
  // const [isLoading, setIsLoading]   = useState(true);
  // const [fetchError, setFetchError] = useState<string | null>(null);
  //
  // useEffect(() => {
  //   setIsLoading(true);
  //   const params = new URLSearchParams();
  //   if (selectedLocation !== "All Locations") params.set("location", selectedLocation);
  //   if (selectedTag !== "All")               params.set("tag", selectedTag);
  //
  //   fetch(`/api/coaches?${params.toString()}`)
  //     .then(res => { if (!res.ok) throw new Error("Failed"); return res.json(); })
  //     .then((data: Coach[]) => setCoachList(data))
  //     .catch(err => setFetchError(err.message))
  //     .finally(() => setIsLoading(false));
  // }, [selectedLocation, selectedTag]);
  // → Khi filter thay đổi, useEffect tự chạy lại nhờ dependency array

  // ── Filter logic (client-side, dùng khi data tĩnh) ──────────────────────
  // useMemo: chỉ tính lại khi selectedLocation hoặc selectedTag thay đổi
  // Tránh filter lại mỗi lần re-render không liên quan
  const filteredCoaches: TeamMember[] = useMemo(() => {
    return teamMembers.filter((coach) => {
      // Điều kiện 1: location khớp (hoặc đang chọn "All Locations")
      const matchesLocation =
        selectedLocation === "All Locations" ||
        coach.location === selectedLocation;

      // Điều kiện 2: có tag khớp (hoặc đang chọn "All")
      const matchesTag =
        selectedTag === "All" || coach.tags.includes(selectedTag);
      // Array.includes(): true nếu mảng tags chứa selectedTag

      // Cả 2 điều kiện phải đúng → hiển thị coach này
      return matchesLocation && matchesTag;
    });
  }, [selectedLocation, selectedTag]);

  // ── Pagination ───────────────────────────────────────────────────────────
  // Truyền filteredCoaches (đã filter) vào hook
  // Khi filter thay đổi → filteredCoaches đổi → hook tự reset về trang 1
  const {
    items: currentPageCoaches, // chỉ coaches của trang đang xem
    currentPage,
    totalPages,
    goToPage,
  } = usePagination(filteredCoaches, COACHES_PER_PAGE);

  // ── Handlers (callback truyền xuống CoachFilterBar) ──────────────────────
  const handleLocationChange = (location: string) => {
    setSelectedLocation(location);
    // Không cần reset selectedTag — user có thể kết hợp cả 2 filter
  };

  const handleTagChange = (tag: string) => {
    setSelectedTag(tag);
  };

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div style={{ paddingTop: "2rem", minHeight: "80vh" }}>
      {/* ── [API] Loading / Error state ─────────────────────────────────
          Bỏ comment khi có API:
          {isLoading && <div className="loading-spinner">Loading coaches...</div>}
          {fetchError && <div className="error-banner">Error: {fetchError}</div>}
      */}

      {/* ── Filter bar ────────────────────────────────────────────────── */}
      {/*
          CoachFilterBar là "controlled component":
          - value đến từ state của page này (selectedLocation, selectedTag)
          - thay đổi báo lên qua callback (onLocationChange, onTagChange)
          → Page giữ source of truth, FilterBar chỉ là UI
      */}
      <CoachFilterBar
        locationOptions={ALL_LOCATIONS}
        tagOptions={ALL_TAGS}
        selectedLocation={selectedLocation}
        selectedTag={selectedTag}
        onLocationChange={handleLocationChange}
        onTagChange={handleTagChange}
      />

      {/* ── Result count ──────────────────────────────────────────────── */}
      <div
        className="container"
        style={{
          margin: "1rem auto",
          color: "#777",
          fontSize: "0.95rem",
          width: 1200,
        }}
      >
        {filteredCoaches.length === 0
          ? "No coaches found. Try adjusting your filters."
          : `Showing ${filteredCoaches.length} coach${filteredCoaches.length > 1 ? "es" : ""}`}
      </div>

      {/* ── Coach grid ────────────────────────────────────────────────── */}
      <section className="container" style={{ width: 1200 }}>
        {filteredCoaches.length > 0 ? (
          <>
            {/*
              Items<Coach>: generic grid component
              columns={2}: 2 coach mỗi hàng (card rộng, nhiều thông tin)
              renderItem: mỗi coach → 1 CoachCard
            */}
            <Items<TeamMember>
              items={currentPageCoaches}
              columns={2}
              gap="1rem"
              renderItem={(coach) => <CoachCard coach={coach} />}
            />

            {/* Phân trang — chỉ hiện khi có nhiều hơn 1 trang */}
            {totalPages > 1 && (
              <PaginationNumbers
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={goToPage}
              />
            )}
          </>
        ) : (
          /* Empty state */
          <div
            style={{ textAlign: "center", padding: "60px 20px", color: "#aaa" }}
          >
            <p style={{ fontSize: "1.1rem" }}>
              No coaches match your current filters.
            </p>
            <button
              onClick={() => {
                setSelectedLocation("All Locations");
                setSelectedTag("All");
              }}
              style={{
                marginTop: 16,
                padding: "10px 24px",
                background: "var(--primary)",
                color: "white",
                border: "none",
                borderRadius: 8,
                cursor: "pointer",
              }}
            >
              Clear all filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default ListCoachSection;
