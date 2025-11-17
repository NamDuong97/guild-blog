'use client'

import React, { useState, useEffect } from 'react';
import styles from './AccountManagement.module.css';

interface UserProfile {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    avatar: string;
    dateOfBirth: string;
    address: string;
    gender: 'male' | 'female' | 'other';
}

const AccountManagement: React.FC = () => {
    const [user, setUser] = useState<UserProfile>({
        id: '1',
        fullName: 'Nguyễn Văn A',
        email: 'nguyenvana@email.com',
        phone: '0123456789',
        avatar: '',
        dateOfBirth: '1990-01-01',
        address: 'Hà Nội, Việt Nam',
        gender: 'male'
    });

    const [isEditing, setIsEditing] = useState(false);
    const [tempUser, setTempUser] = useState<UserProfile>(user);
    const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'settings'>('profile');

    useEffect(() => {
        const fetchUserData = async () => {
            // const response = await api.getUserProfile();
            // setUser(response.data);
        };
        fetchUserData();
    }, []);

    const handleEdit = () => {
        setTempUser(user);
        setIsEditing(true);
    };

    const handleSave = async () => {
        try {
            setUser(tempUser);
            setIsEditing(false);
            alert('Cập nhật thông tin thành công!');
        } catch (error) {
            alert('Có lỗi xảy ra khi cập nhật!');
        }
    };

    const handleCancel = () => {
        setTempUser(user);
        setIsEditing(false);
    };

    const handleInputChange = (field: keyof UserProfile, value: string) => {
        setTempUser(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                handleInputChange('avatar', e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className={styles.accountManagement}>
            <div className={styles.accountHeader}>
                <h1>Quản lý tài khoản</h1>
                <p>Quản lý thông tin cá nhân và bảo mật tài khoản</p>
            </div>

            <div className={styles.accountContainer}>
                {/* Sidebar */}
                <div className={styles.accountSidebar}>
                    <div
                        className={`${styles.sidebarItem} ${activeTab === 'profile' ? styles.active : ''}`}
                        onClick={() => setActiveTab('profile')}
                    >
                        📝 Thông tin cá nhân
                    </div>
                    <div
                        className={`${styles.sidebarItem} ${activeTab === 'security' ? styles.active : ''}`}
                        onClick={() => setActiveTab('security')}
                    >
                        🔒 Bảo mật
                    </div>
                    <div
                        className={`${styles.sidebarItem} ${activeTab === 'settings' ? styles.active : ''}`}
                        onClick={() => setActiveTab('settings')}
                    >
                        ⚙️ Cài đặt
                    </div>
                </div>

                {/* Main content */}
                <div className={styles.accountContent}>
                    {activeTab === 'profile' && (
                        <div className={styles.profileSection}>
                            <div className={styles.sectionHeader}>
                                <h2>Thông tin cá nhân</h2>
                                {!isEditing && (
                                    <button className={styles.editBtn} onClick={handleEdit}>
                                        Chỉnh sửa
                                    </button>
                                )}
                            </div>

                            <div className={styles.profileContent}>
                                {/* Avatar section */}
                                <div className={styles.avatarSection}>
                                    <div className={styles.avatarContainer}>
                                        <img
                                            src={tempUser.avatar || '/default-avatar.png'}
                                            alt="Avatar"
                                            className={styles.avatar}
                                        />
                                        {isEditing && (
                                            <div className={styles.avatarOverlay}>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleAvatarChange}
                                                    className={styles.avatarInput}
                                                />
                                                <span>📷 Thay đổi</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Form fields */}
                                <div className={styles.formGrid}>
                                    <div className={styles.formGroup}>
                                        <label>Họ và tên</label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={tempUser.fullName}
                                                onChange={(e) => handleInputChange('fullName', e.target.value)}
                                                className={styles.formInput}
                                            />
                                        ) : (
                                            <div className={styles.formValue}>{user.fullName}</div>
                                        )}
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label>Email</label>
                                        {isEditing ? (
                                            <input
                                                type="email"
                                                value={tempUser.email}
                                                onChange={(e) => handleInputChange('email', e.target.value)}
                                                className={styles.formInput}
                                            />
                                        ) : (
                                            <div className={styles.formValue}>{user.email}</div>
                                        )}
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label>Số điện thoại</label>
                                        {isEditing ? (
                                            <input
                                                type="tel"
                                                value={tempUser.phone}
                                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                                className={styles.formInput}
                                            />
                                        ) : (
                                            <div className={styles.formValue}>{user.phone}</div>
                                        )}
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label>Ngày sinh</label>
                                        {isEditing ? (
                                            <input
                                                type="date"
                                                value={tempUser.dateOfBirth}
                                                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                                                className={styles.formInput}
                                            />
                                        ) : (
                                            <div className={styles.formValue}>{user.dateOfBirth}</div>
                                        )}
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label>Giới tính</label>
                                        {isEditing ? (
                                            <select
                                                value={tempUser.gender}
                                                onChange={(e) => handleInputChange('gender', e.target.value)}
                                                className={styles.formInput}
                                            >
                                                <option value="male">Nam</option>
                                                <option value="female">Nữ</option>
                                                <option value="other">Khác</option>
                                            </select>
                                        ) : (
                                            <div className={styles.formValue}>
                                                {user.gender === 'male' ? 'Nam' : user.gender === 'female' ? 'Nữ' : 'Khác'}
                                            </div>
                                        )}
                                    </div>

                                    <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                                        <label>Địa chỉ</label>
                                        {isEditing ? (
                                            <textarea
                                                value={tempUser.address}
                                                onChange={(e) => handleInputChange('address', e.target.value)}
                                                className={styles.formInput}
                                                rows={3}
                                            />
                                        ) : (
                                            <div className={styles.formValue}>{user.address}</div>
                                        )}
                                    </div>
                                </div>

                                {/* Action buttons */}
                                {isEditing && (
                                    <div className={styles.actionButtons}>
                                        <button className={styles.saveBtn} onClick={handleSave}>
                                            Lưu thay đổi
                                        </button>
                                        <button className={styles.cancelBtn} onClick={handleCancel}>
                                            Hủy bỏ
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div className={styles.securitySection}>
                            <h2>Bảo mật tài khoản</h2>
                            <div className={styles.securityItems}>
                                <div className={styles.securityItem}>
                                    <h3>Đổi mật khẩu</h3>
                                    <p>Cập nhật mật khẩu mới để bảo vệ tài khoản</p>
                                    <button className={styles.changePasswordBtn}>
                                        Đổi mật khẩu
                                    </button>
                                </div>

                                <div className={styles.securityItem}>
                                    <h3>Xác thực 2 yếu tố</h3>
                                    <p>Bật xác thực 2 yếu tố để tăng cường bảo mật</p>
                                    <label className={styles.toggle}>
                                        <input type="checkbox" />
                                        <span className={styles.slider}></span>
                                    </label>
                                </div>

                                <div className={styles.securityItem}>
                                    <h3>Thiết bị đăng nhập</h3>
                                    <p>Quản lý các thiết bị đã đăng nhập vào tài khoản</p>
                                    <button className={styles.manageDevicesBtn}>
                                        Quản lý thiết bị
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'settings' && (
                        <div className={styles.settingsSection}>
                            <h2>Cài đặt tài khoản</h2>
                            <div className={styles.settingsItems}>
                                <div className={styles.settingItem}>
                                    <h3>Ngôn ngữ</h3>
                                    <select className={styles.settingSelect}>
                                        <option value="vi">Tiếng Việt</option>
                                        <option value="en">English</option>
                                    </select>
                                </div>

                                <div className={styles.settingItem}>
                                    <h3>Thông báo</h3>
                                    <label className={styles.toggle}>
                                        <input type="checkbox" defaultChecked />
                                        <span className={styles.slider}></span>
                                    </label>
                                    <span className={styles.settingDescription}>Nhận thông báo qua email</span>
                                </div>

                                <div className={styles.settingItem}>
                                    <h3>Chế độ riêng tư</h3>
                                    <label className={styles.toggle}>
                                        <input type="checkbox" />
                                        <span className={styles.slider}></span>
                                    </label>
                                    <span className={styles.settingDescription}>Ẩn thông tin cá nhân</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AccountManagement;