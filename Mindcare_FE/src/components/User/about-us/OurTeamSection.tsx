import type React from "react";

import type { TeamMember } from "../../../data/Types";
import { usePagination } from "../../../utilis/usePagination";
import Items from "../common/itemList/ItemList";

interface TeamProps {
  teamMembers: TeamMember[];
  itemsPerPage: number;
}

const OurTeamSection = ({ teamMembers, itemsPerPage = 4 }: TeamProps) => {
  const { items: currentTeam } = usePagination(teamMembers, itemsPerPage);
  return (
    <>
      <section className="section green-bg">
        <div className="container">
          <h2>OUR TEAM</h2>
          <div className="team-grid p-5">
            <Items<TeamMember>
              items={currentTeam}
              columns={4}
              gap="2rem"
              renderItem={(team) => (
                <div className="team-member">
                  <img src={team.image} alt={team.name} />
                  <h3>{team.name}</h3>
                  <p>{team.role}</p>
                  <ul className="team-member-skills">
                    {team.specialties?.map((specialties, idx) => (
                      <li key={idx}>{specialties.label}</li>
                    ))}
                  </ul>
                </div>
              )}
            />
          </div>
          {/* <section className="other-members">
            <div className="team-grid">
              <div className="other-member">
                <img src="assets/img/5.jpg" alt="Nguyễn Văn E" />
                <h3>
                  Nguyễn Văn E <span>- Coach Online</span>
                </h3>
              </div>
            </div>
          </section> */}
        </div>
      </section>
    </>
  );
};
export default OurTeamSection;
