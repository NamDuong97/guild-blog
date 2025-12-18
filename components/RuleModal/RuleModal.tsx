import React from 'react';
import styles from './RuleModal.module.css';
import { RuleModalProps } from '@/types';

const RuleModal: React.FC<RuleModalProps> = ({
    isShowRuleWheel,
    onClose,
}) => {
    if (!isShowRuleWheel) return null;

    const rules = [
        "Thời gian tham gia sự kiện: vĩnh viễn",
        "Đối tượng tham gia: Thành viên của bang (không tính acc clone)",
        "Mỗi người dùng được quay tối đa 1 lượt quay cho toàn bộ sự kiện",
        "Mỗi nhân vật đăng nhập vào trang sự kiện sẽ nhận 1 lượt quay may mắn. Sau khi quay thành công, BC sẽ liên hệ trao quà từ 24-48h.",
        "Mọi người có thể quay nhiều lần nhưng chỉ được tính duy nhất 1 kết quả ban đầu.",
        "Có thể xem xét hỗ trợ quy đổi phần quà giá trị tương ứng và chỉ xem xét 1 lần.",
        "Quà có giá trị cao có tỷ lệ trúng thấp hơn",
        "Quà chỉ có hiệu lực trong vòng 30 ngày kể từ khi nhận",
        "Mọi gian lận trong quá trình quay sẽ bị hủy kết quả",
        "Bang chụ có quyền thay đổi thể lệ mà không cần báo trước",
        "Quà không có giá trị quy đổi thành tiền mặt"
    ];

    return (
        <div className={styles.ruleModalOverlay}>
            <div className={styles.ruleModal}>
                <div className={styles.ruleModalHeader}>
                    <h2 className={styles.ruleModalTitle}>
                        📜 Thể Lệ Vòng Quay
                    </h2>
                    <button
                        className={styles.closeButton}
                        onClick={onClose}
                        aria-label="Đóng thể lệ"
                    >
                        ✕
                    </button>
                </div>

                <div className={styles.ruleModalContent}>
                    <div className={styles.rulesSection}>
                        <h3 className={styles.sectionTitle}>
                            Điều khoản tham gia
                        </h3>
                        <ul className={styles.rulesList}>
                            {rules.map((rule, index) => (
                                <li key={index} className={styles.ruleItem}>
                                    <span className={styles.ruleNumber}>{index + 1}.</span>
                                    <span className={styles.ruleText}>{rule}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className={styles.noteSection}>
                        <p className={styles.noteText}>
                            ⚠️ Chúc mọi người tham gia vui vẻ, may mắn và trúng nhiều phần quà giá trị!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RuleModal;