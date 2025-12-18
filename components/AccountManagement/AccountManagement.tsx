'use client'

import React, { useState, useEffect } from 'react';
import styles from './AccountManagement.module.css';
import { useUser } from '@/contexts/UserContext';
import { Member, Sect } from '@/types';
import ChangePasswordModal from '@/components/ChangePasswordModal/ChangePasswordModal';
import { useRouter } from 'next/navigation';

const AccountManagement: React.FC = () => {
    const { user, updateMemberProfile, loadUser, updatePassword } = useUser();
    const [isEditing, setIsEditing] = useState(false);
    const [tempUser, setTempUser] = useState<Member | null>(user);
    const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'settings'>('profile');
    const [isUpdating, setIsUpdating] = useState(false);
    const [isChangePass, setIsChangePass] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (user) {
            setTempUser(user);
        }
    }, [user]);

    const handleEdit = () => {
        setTempUser(user);
        setIsEditing(true);
    };

    const handleSave = async () => {
        if (!tempUser) return;
        setIsUpdating(true);
        try {
            let finalAvatarPath = tempUser.avatar;

            // Nếu có ảnh mới (base64), upload lên server trước
            if (tempUser.avatar && tempUser.avatar.startsWith('data:image')) {
                const uploadResponse = await fetch('/api/upload-avatar', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        imageBase64: tempUser.avatar,
                        userId: tempUser.id,
                        userData: {
                            name: tempUser.name,
                            nickName: tempUser.nickName,
                            ingameName: tempUser.ingameName,
                            maxim: tempUser.maxim,
                            sect: tempUser.sect
                        }
                    }),
                });

                const uploadResult = await uploadResponse.json();
                console.log("dũ liệu sau upload la: ", uploadResult);
                if (uploadResult.success) {
                    finalAvatarPath = uploadResult.avatarPath;
                } else {
                    throw new Error(uploadResult.error || 'Upload avatar failed');
                }
            }

            // Chuẩn bị data để update profile
            const updateData = {
                id: tempUser.id,
                name: tempUser.name,
                nickName: tempUser.nickName,
                ingameName: tempUser.ingameName,
                avatar: finalAvatarPath, // Đường dẫn ảnh "images/avatars/avatar-123.jpg"
                maxim: tempUser.maxim,
                sect: tempUser.sect,
                level: tempUser.level
            };
            const success = await updateMemberProfile(updateData);
            if (success) {
                setIsEditing(false);
                // Reload user data để cập nhật state
                await loadUser();
                alert('Cập nhật thông tin thành công!');
            } else {
                alert('Có lỗi xảy ra khi cập nhật!');
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật:', error);
            alert('Có lỗi xảy ra khi cập nhật!');
        } finally {
            setIsUpdating(false);
        }
    };

    const handleCancel = () => {
        setTempUser(user);
        setIsEditing(false);
    };

    const handleChangePassword = () => {
        setIsChangePass(true);
    }

    // Hàm xử lý submit
    const handlePasswordSubmit = async (oldPassword: string, newPassword: string): Promise<boolean> => {
        try {
            const updateData = {
                id: tempUser?.id || '',
                userId: tempUser?.userId || '',
                password: newPassword
            };
            // Gọi API đổi mật khẩu của bạn ở đây
            const response = await updatePassword(updateData);

            if (response) {
                alert('Đổi mật khẩu thành công!');
                // Reload user data để cập nhật state
                await loadUser();
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Error changing password:', error);
            return false;
        }
    };

    const handleInputChange = (field: keyof Member, value: string) => {
        setTempUser(prev => prev ? {
            ...prev,
            [field]: value
        } : null);
    };

    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        const reader = new FileReader();

        reader.onload = (e) => {
            const result = e.target?.result as string;
            handleInputChange('avatar', result);
        };

        reader.readAsDataURL(file);
    };

    if (!user || !tempUser) {
        return (
            <div className={styles.accountManagement}>
                <div className={styles.loading}>Đang tải thông tin...</div>
            </div>
        );
    }

    {
        isEditing && (
            <div className={styles.actionButtons}>
                <button
                    className={styles.saveBtn}
                    onClick={handleSave}
                    disabled={isUpdating}
                >
                    {isUpdating ? 'Đang cập nhật...' : 'Lưu thay đổi'}
                </button>
                <button
                    className={styles.cancelBtn}
                    onClick={handleCancel}
                    disabled={isUpdating}
                >
                    Hủy bỏ
                </button>
            </div>
        )
    }

    const goHome = () => {
        router.push('/');
    }

    return (
        <div className={styles.accountManagement}>
            <div className={styles.resetStyles}>
                <div className={styles.accountContainer}>
                    {/* Sidebar */}
                    <div className={styles.accountSidebar}>
                        <div
                            className={styles.sidebarItem}
                            onClick={goHome}
                        >
                            🏠 Trang chủ
                        </div>
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
                                                        id="avatar-upload"
                                                        name="avatar"
                                                        multiple={false}
                                                        capture="user"
                                                        disabled={isUpdating}
                                                    />
                                                    <span>📷 Thay đổi</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Form fields */}
                                    <div className={styles.formGrid}>
                                        <div className={styles.formGroup}>
                                            <label>Tên hiển thị</label>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    value={tempUser.name}
                                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                                    className={styles.formInput}
                                                />
                                            ) : (
                                                <div className={styles.formValue}>{tempUser.name}</div>
                                            )}
                                        </div>

                                        <div className={styles.formGroup}>
                                            <label>User ID</label>
                                            <div className={styles.formValue}>{tempUser.userId}</div>
                                        </div>

                                        <div className={styles.formGroup}>
                                            <label>Biệt danh</label>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    value={tempUser.nickName}
                                                    onChange={(e) => handleInputChange('nickName', e.target.value)}
                                                    className={styles.formInput}
                                                />
                                            ) : (
                                                <div className={styles.formValue}>{tempUser.nickName}</div>
                                            )}
                                        </div>

                                        <div className={styles.formGroup}>
                                            <label>Tên trong game</label>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    value={tempUser.ingameName}
                                                    onChange={(e) => handleInputChange('ingameName', e.target.value)}
                                                    className={styles.formInput}
                                                />
                                            ) : (
                                                <div className={styles.formValue}>{tempUser.ingameName}</div>
                                            )}
                                        </div>

                                        <div className={styles.formGroup}>
                                            <label>Chức vụ</label>
                                            <div className={styles.formValue}>
                                                {tempUser.role === 'guild-master' ? 'Bang Chủ' :
                                                    tempUser.role === 'vice-master' ? 'Bang Phó' :
                                                        tempUser.role === 'hall-master' ? 'Đường Chủ' :
                                                            tempUser.role === 'village-master' ? 'Hương Chủ' :
                                                                tempUser.role === 'manager' ? 'Quản Gia' :
                                                                    tempUser.role === 'elder' ? 'Trưởng Lão' :
                                                                        tempUser.role === 'elite' ? 'Tinh Anh' : 'Bang Chúng'}
                                            </div>
                                        </div>

                                        <div className={styles.formGroup}>
                                            <label>Môn phái</label>
                                            {isEditing ? (
                                                <select
                                                    value={tempUser.sect}
                                                    onChange={(e) => handleInputChange('sect', e.target.value)}
                                                    className={styles.formInput}
                                                >
                                                    {Object.values(Sect).map((sect) => (
                                                        <option key={sect} value={sect}>
                                                            {sect}
                                                        </option>
                                                    ))}
                                                </select>
                                            ) : (
                                                <div className={styles.formValue}>{tempUser.sect}</div>
                                            )}
                                        </div>

                                        <div className={styles.formGroup}>
                                            <label>Cấp độ</label>
                                            {isEditing ? (
                                                <input
                                                    type="number"
                                                    value={tempUser.level}
                                                    onChange={(e) => handleInputChange('level', e.target.value)}
                                                    className={styles.formInput}
                                                />
                                            ) : (
                                                <div className={styles.formValue}>{tempUser.level}</div>
                                            )}
                                        </div>

                                        <div className={styles.formGroup}>
                                            <label>Trâm ngôn</label>
                                            {isEditing ? (
                                                <textarea
                                                    value={tempUser.maxim}
                                                    onChange={(e) => handleInputChange('maxim', e.target.value)}
                                                    className={styles.formInput}
                                                    rows={2}
                                                />
                                            ) : (
                                                <div className={styles.formValue}>{tempUser.maxim}</div>
                                            )}
                                        </div>

                                        <div className={styles.formGroup}>
                                            <label>Ngày tham gia</label>
                                            <div className={styles.formValue}>{new Date(tempUser.joinDate).toLocaleDateString('vi-VN')}</div>
                                        </div>

                                        <div className={styles.formGroup}>
                                            <label>Hoạt động gần nhất</label>
                                            <div className={styles.formValue}>{tempUser.lastActive}</div>
                                        </div>
                                    </div>

                                    {/* Action buttons Lưu Cập Nhật*/}
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
                                        <button className={styles.changePasswordBtn}
                                            onClick={handleChangePassword}>
                                            Đổi mật khẩu
                                        </button>
                                    </div>

                                    <div className={styles.securityItem}>
                                        <h3>Thông tin đăng nhập</h3>
                                        <p>User ID: <strong>{user.userId}</strong></p>
                                        <p>Vai trò: <strong>
                                            {user.role === 'guild-master' ? 'Bang Chủ' :
                                                user.role === 'vice-master' ? 'Bang Phó' :
                                                    user.role === 'hall-master' ? 'Đường Chủ' :
                                                        user.role === 'village-master' ? 'Hương Chủ' :
                                                            user.role === 'manager' ? 'Quản Gia' :
                                                                user.role === 'elder' ? 'Trưởng Lão' :
                                                                    user.role === 'elite' ? 'Tinh Anh' : 'Bang Chúng'}
                                        </strong></p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'settings' && (
                            <div className={styles.settingsSection}>
                                <h2>Cài đặt tài khoản</h2>
                                <div className={styles.settingsItems}>
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
            <ChangePasswordModal
                isOpen={isChangePass}
                onClose={() => setIsChangePass(false)}
                onSubmit={handlePasswordSubmit}
                oldPass={tempUser.password}
            />
        </div>
    );
};

export default AccountManagement;