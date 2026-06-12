import React from 'react'
import { NavLink } from 'react-router-dom'

const SKILLS = ['React', 'TypeScript', 'Node.js', 'Python', 'UI/UX Design', 'Project Management']

const SOCIAL_LINKS = [
  { href: '#', icon: 'fab fa-facebook-f', className: 'social-facebook' },
  { href: '#', icon: 'fab fa-twitter', className: 'social-twitter' },
  { href: '#', icon: 'fab fa-linkedin-in', className: 'social-linkedin' },
  { href: '#', icon: 'fab fa-instagram', className: 'social-instagram' },
  { href: '#', icon: 'fab fa-youtube', className: 'social-youtube' },
]

const MyProfile: React.FC = () => {
  return (
    <>
      {/* Cover photo */}
      <div className="profile-cover" style={{ marginLeft: '-2rem', marginRight: '-2rem' }}>
        <img
          src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&q=80"
          alt="Cover"
        />
        <button className="profile-cover-edit">
          <i className="fas fa-camera"></i> Edit Cover
        </button>
      </div>

      {/* Profile header */}
      <div className="profile-header-section">
        <div className="profile-header-content">
          <div className="profile-avatar-container">
            <img
              src="https://ui-avatars.com/api/?name=User+Admin&background=0d6efd&color=fff&size=140"
              alt="Avatar"
              className="profile-avatar"
            />
            <button className="avatar-edit-btn">
              <i className="fas fa-camera" style={{ fontSize: 14 }}></i>
            </button>
          </div>

          <div className="profile-info-content">
            <h1 className="profile-name">User Admin</h1>
            <p className="profile-username">@useradmin</p>
            <div className="profile-meta">
              <div className="profile-meta-item">
                <i className="fas fa-map-marker-alt"></i>
                <span>Ho Chi Minh City, Vietnam</span>
              </div>
              <div className="profile-meta-item">
                <i className="fas fa-briefcase"></i>
                <span>Senior Administrator</span>
              </div>
              <div className="profile-meta-item">
                <i className="fas fa-calendar-alt"></i>
                <span>Joined January 2023</span>
              </div>
            </div>
            <div className="profile-actions mt-3">
              <NavLink to="/settings" className="btn-primary-fb me-2">
                <i className="fas fa-edit"></i> Edit Profile
              </NavLink>
              <button className="btn btn-outline-secondary btn-sm">
                <i className="fas fa-share-alt"></i> Share
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="ms-auto d-none d-lg-flex gap-4 text-center">
            {[
              { label: 'Posts', value: '24' },
              { label: 'Orders Managed', value: '1.2k' },
              { label: 'Team Members', value: '6' },
            ].map(stat => (
              <div key={stat.label}>
                <h4 className="fw-bold mb-0">{stat.value}</h4>
                <small className="text-muted">{stat.label}</small>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="row">
        {/* Left column */}
        <div className="col-lg-4">
          {/* Intro */}
          <div className="content-card">
            <div className="content-card-header">
              <h3 className="content-card-title">Intro</h3>
              <button className="btn btn-soft-primary btn-sm">
                <i className="fas fa-edit me-1"></i> Edit
              </button>
            </div>
            <p className="intro-text">
              Passionate administrator with 5+ years of experience managing digital products and teams. Love building great user experiences.
            </p>

            {[
              { icon: 'fas fa-envelope', label: 'Email', value: 'admin@example.com' },
              { icon: 'fas fa-phone', label: 'Phone', value: '+84 901 234 567' },
              { icon: 'fas fa-globe', label: 'Website', value: 'www.example.com' },
              { icon: 'fas fa-graduation-cap', label: 'Education', value: 'University of Technology' },
            ].map(item => (
              <div className="intro-item" key={item.label}>
                <i className={item.icon}></i>
                <span><strong>{item.label}:</strong> {item.value}</span>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div className="content-card">
            <div className="content-card-header">
              <h3 className="content-card-title">Skills</h3>
            </div>
            <div>
              {SKILLS.map(skill => (
                <span key={skill} className="skill-badge">{skill}</span>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="content-card">
            <div className="content-card-header">
              <h3 className="content-card-title">Social Links</h3>
            </div>
            <div className="social-link-grid">
              {SOCIAL_LINKS.map((link, i) => (
                <a key={i} href={link.href} className={`social-link-item ${link.className}`}>
                  <i className={link.icon}></i>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="col-lg-8">
          {/* Activity */}
          <div className="content-card">
            <div className="content-card-header">
              <h3 className="content-card-title">Recent Activity</h3>
            </div>
            <div className="d-flex flex-column gap-3">
              {[
                { icon: 'fas fa-shopping-bag', color: 'text-info', bg: 'bg-info-subtle', action: 'Processed 5 new orders', time: '2 hours ago' },
                { icon: 'fas fa-user-plus', color: 'text-success', bg: 'bg-success-subtle', action: 'Added new team member: Frank Vu', time: '5 hours ago' },
                { icon: 'fas fa-blog', color: 'text-primary', bg: 'bg-primary-subtle', action: 'Published blog post: "Best React Resources 2025"', time: '1 day ago' },
                { icon: 'fas fa-star', color: 'text-warning', bg: 'bg-warning-subtle', action: 'Approved 12 customer reviews', time: '2 days ago' },
                { icon: 'fas fa-cog', color: 'text-secondary', bg: 'bg-secondary-subtle', action: 'Updated system settings', time: '3 days ago' },
              ].map((item, i) => (
                <div key={i} className="d-flex align-items-start gap-3">
                  <div className="avatar-sm flex-shrink-0">
                    <span className={`avatar-title ${item.bg} ${item.color} rounded-circle fs-5`}>
                      <i className={item.icon}></i>
                    </span>
                  </div>
                  <div className="flex-grow-1">
                    <p className="mb-0 fw-medium">{item.action}</p>
                    <small className="text-muted">{item.time}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats overview */}
          <div className="content-card">
            <div className="content-card-header">
              <h3 className="content-card-title">Performance Overview</h3>
            </div>
            <div className="row g-3">
              {[
                { label: 'Orders Processed', value: 1248, max: 2000, color: 'bg-primary' },
                { label: 'Blog Posts', value: 24, max: 50, color: 'bg-success' },
                { label: 'Reviews Approved', value: 156, max: 200, color: 'bg-info' },
                { label: 'Team Satisfaction', value: 92, max: 100, color: 'bg-warning' },
              ].map(stat => (
                <div className="col-md-6" key={stat.label}>
                  <div className="p-3 border rounded">
                    <div className="d-flex justify-content-between mb-2">
                      <span className="fw-medium">{stat.label}</span>
                      <span className="text-muted">{stat.value}/{stat.max}</span>
                    </div>
                    <div className="progress" style={{ height: 6 }}>
                      <div
                        className={`progress-bar ${stat.color}`}
                        style={{ width: `${(stat.value / stat.max) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MyProfile
