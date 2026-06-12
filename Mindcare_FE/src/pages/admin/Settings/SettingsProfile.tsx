import React from 'react'
import { useState } from 'react'

interface ProfileForm {
  firstName: string
  lastName: string
  email: string
  phone: string
  bio: string
  website: string
  location: string
  language: string
}

interface PasswordForm {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

interface NotifSettings {
  emailOrders: boolean
  emailReviews: boolean
  emailMarketing: boolean
  smsOrders: boolean
  smsAlerts: boolean
}

const SettingsProfile: React.FC = () => {
  const [saved, setSaved] = useState(false)
  const [activeTab, setActiveTab] = useState<'profile' | 'password' | 'notifications'>('profile')

  const [profile, setProfile] = useState<ProfileForm>({
    firstName: 'User',
    lastName: 'Admin',
    email: 'admin@example.com',
    phone: '+84 901 234 567',
    bio: 'Passionate administrator with 5+ years of experience.',
    website: 'www.example.com',
    location: 'Ho Chi Minh City, Vietnam',
    language: 'English',
  })

  const [passwords, setPasswords] = useState<PasswordForm>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const [notifs, setNotifs] = useState<NotifSettings>({
    emailOrders: true,
    emailReviews: true,
    emailMarketing: false,
    smsOrders: false,
    smsAlerts: true,
  })

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const profileField = (
    key: keyof ProfileForm,
    label: string,
    type: string = 'text',
    placeholder?: string
  ) => (
    <div className="form-group">
      <label className="form-label">{label}</label>
      {type === 'textarea' ? (
        <textarea
          className="form-control"
          rows={3}
          placeholder={placeholder ?? label}
          value={profile[key]}
          onChange={e => setProfile(prev => ({ ...prev, [key]: e.target.value }))}
        />
      ) : (
        <input
          type={type}
          className="form-control"
          placeholder={placeholder ?? label}
          value={profile[key]}
          onChange={e => setProfile(prev => ({ ...prev, [key]: e.target.value }))}
        />
      )}
    </div>
  )

  return (
    <>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h4 className="mb-0">Settings</h4>
      </div>

      <div className="settings-container">
        {/* Success alert */}
        {saved && (
          <div className="alert-success mb-3">
            <i className="fas fa-check-circle me-2"></i>
            Settings saved successfully!
          </div>
        )}

        {/* Tabs */}
        <div className="mb-4">
          <ul className="nav nav-tabs">
            {(['profile', 'password', 'notifications'] as const).map(tab => (
              <li className="nav-item" key={tab}>
                <button
                  className={`nav-link${activeTab === tab ? ' active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                  style={{ textTransform: 'capitalize', cursor: 'pointer', background: 'none', border: 'none' }}
                >
                  {tab === 'profile' && <i className="fas fa-user me-1"></i>}
                  {tab === 'password' && <i className="fas fa-lock me-1"></i>}
                  {tab === 'notifications' && <i className="fas fa-bell me-1"></i>}
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Profile Tab ── */}
        {activeTab === 'profile' && (
          <>
            {/* Avatar card */}
            <div className="settings-card">
              <div className="row align-items-center">
                <div className="col-md-3">
                  <div className="avatar-section">
                    <div className="avatar-wrapper">
                      <img
                        src="https://ui-avatars.com/api/?name=User+Admin&background=0d6efd&color=fff&size=120"
                        alt="Avatar"
                        className="avatar-img"
                      />
                      <button className="avatar-change-btn" title="Change avatar">
                        <i className="fas fa-camera" style={{ fontSize: 14 }}></i>
                      </button>
                    </div>
                    <p className="name">{profile.firstName} {profile.lastName}</p>
                    <p className="role">Administrator</p>
                  </div>
                </div>
                <div className="col-md-9">
                  <div className="bg-section">
                    <img
                      src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=70"
                      alt="Cover"
                    />
                    <button className="bg-change-btn">
                      <i className="fas fa-camera"></i> Change Cover
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Personal info */}
            <div className="settings-card">
              <h3 className="form-section-title">Personal Information</h3>
              <div className="form-row">
                {profileField('firstName', 'First Name')}
                {profileField('lastName', 'Last Name')}
                {profileField('email', 'Email Address', 'email')}
                {profileField('phone', 'Phone Number', 'tel')}
              </div>
              {profileField('bio', 'Bio', 'textarea')}
            </div>

            {/* Account info */}
            <div className="settings-card">
              <h3 className="form-section-title">Account Information</h3>
              <div className="form-row">
                {profileField('website', 'Website')}
                {profileField('location', 'Location')}
              </div>
              <div className="form-group">
                <label className="form-label">Language</label>
                <select
                  className="form-control"
                  value={profile.language}
                  onChange={e => setProfile(prev => ({ ...prev, language: e.target.value }))}
                >
                  <option>English</option>
                  <option>Vietnamese</option>
                  <option>Chinese</option>
                  <option>Japanese</option>
                </select>
              </div>
            </div>

            <div className="form-actions">
              <button className="btn-back" onClick={() => window.history.back()}>
                <i className="fas fa-arrow-left"></i> Back
              </button>
              <button className="btn-save" onClick={handleSave}>
                <i className="fas fa-save me-1"></i> Save Changes
              </button>
            </div>
          </>
        )}

        {/* ── Password Tab ── */}
        {activeTab === 'password' && (
          <div className="settings-card">
            <h3 className="form-section-title">Change Password</h3>
            <p className="text-muted mb-4">
              To change your password, please fill in the fields below. Your password must be at least 8 characters long.
            </p>

            {[
              { key: 'currentPassword' as const, label: 'Current Password' },
              { key: 'newPassword' as const, label: 'New Password' },
              { key: 'confirmPassword' as const, label: 'Confirm New Password' },
            ].map(field => (
              <div className="form-group" key={field.key}>
                <label className="form-label">{field.label}</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder={field.label}
                  value={passwords[field.key]}
                  onChange={e => setPasswords(prev => ({ ...prev, [field.key]: e.target.value }))}
                />
              </div>
            ))}

            {passwords.newPassword && passwords.confirmPassword &&
              passwords.newPassword !== passwords.confirmPassword && (
                <div className="text-danger mb-3">
                  <i className="fas fa-exclamation-circle me-1"></i>
                  Passwords do not match.
                </div>
              )}

            <div className="form-actions">
              <button
                className="btn-save"
                onClick={handleSave}
                disabled={
                  !passwords.currentPassword ||
                  !passwords.newPassword ||
                  passwords.newPassword !== passwords.confirmPassword
                }
              >
                Update Password
              </button>
            </div>
          </div>
        )}

        {/* ── Notifications Tab ── */}
        {activeTab === 'notifications' && (
          <div className="settings-card">
            <h3 className="form-section-title">Email Notifications</h3>

            {[
              { key: 'emailOrders' as const, label: 'Order Updates', desc: 'Receive emails when orders are placed or updated' },
              { key: 'emailReviews' as const, label: 'New Reviews', desc: 'Receive emails when customers leave reviews' },
              { key: 'emailMarketing' as const, label: 'Marketing Emails', desc: 'Receive promotional and marketing emails' },
            ].map(item => (
              <div key={item.key} className="d-flex align-items-center justify-content-between py-3 border-bottom">
                <div>
                  <p className="fw-medium mb-0">{item.label}</p>
                  <small className="text-muted">{item.desc}</small>
                </div>
                <div className="form-check form-switch ms-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={notifs[item.key]}
                    onChange={e => setNotifs(prev => ({ ...prev, [item.key]: e.target.checked }))}
                    style={{ cursor: 'pointer', width: '2.5em', height: '1.25em' }}
                  />
                </div>
              </div>
            ))}

            <h3 className="form-section-title mt-4">SMS Notifications</h3>

            {[
              { key: 'smsOrders' as const, label: 'Order SMS', desc: 'Receive SMS for new orders' },
              { key: 'smsAlerts' as const, label: 'Security Alerts', desc: 'Receive SMS for security alerts' },
            ].map(item => (
              <div key={item.key} className="d-flex align-items-center justify-content-between py-3 border-bottom">
                <div>
                  <p className="fw-medium mb-0">{item.label}</p>
                  <small className="text-muted">{item.desc}</small>
                </div>
                <div className="form-check form-switch ms-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={notifs[item.key]}
                    onChange={e => setNotifs(prev => ({ ...prev, [item.key]: e.target.checked }))}
                    style={{ cursor: 'pointer', width: '2.5em', height: '1.25em' }}
                  />
                </div>
              </div>
            ))}

            <div className="form-actions">
              <button className="btn-save" onClick={handleSave}>
                Save Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default SettingsProfile
