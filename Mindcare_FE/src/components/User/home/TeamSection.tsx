// src/components/TeamSection/TeamSection.tsx
import React from 'react';
import type { TeamMember } from '../../../data/Types';
import {PaginationArrows} from '../common/pagination/Pagination';
import { usePagination } from '../../../utilis/usePagination';
import Items from '../common/itemList/ItemList';

interface TeamSectionProps {
  teamMembers: TeamMember[];
  itemsPerPage?: number;
}

/**
 * Component hiển thị Đội Ngũ với phân trang
 * Sử dụng Items để tái sử dụng
 */
const TeamSection: React.FC<TeamSectionProps> = ({
  teamMembers,
  itemsPerPage = 6,   // 6 items = 2 hàng × 3 cột
}) => {

// add axios để lấy dữ liệu từ backend 

  const {
    items: currentMembers,
    currentPage,
    totalPages,
    goToPage,
  } = usePagination(teamMembers, itemsPerPage);

  return (
    <section className="team" id="team">
      <div className="container text-center">
        <span className="star">★</span>
        <div className="top-rated">Top Rated</div> 
        <span className="star">★</span>

        <h2 className="section-title">Our Team Members</h2>
        <p className="team-description">
          Lorem ipsum is simply dummy text of the printing and typesetting industry.
          Lorem ipsum has been the industry's since the 1900s.
        </p>

        {/* Sử dụng Items component */}
        {/* gi */}
        <Items<TeamMember>
          items={currentMembers}
          columns={3}                    // 3 cột mỗi hàng
          gap="2rem"
          renderItem={(member) => (
            <div className="team-member">
              <img 
                src={member.image} 
                alt={member.name} 
                loading="lazy"
              />
              <h3>{member.name}</h3>
              <p>{member.role}</p> 
            </div>
          )}
        />

        {/* Phân trang */}
        {totalPages > 1 && (
          <PaginationArrows
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
          />
        )}
      </div>
    </section>
  );
};

export default TeamSection;