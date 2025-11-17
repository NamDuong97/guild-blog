import styles from './HistoryModal.module.css';
import { HistoryModalProps } from '@/types';

const HistoryModal: React.FC<HistoryModalProps> = ({
    isShowHistory,
    onClose,
    spinHistory
}) => {

    const formatDate = (date: any) => {
        const d = new Date(date);
        if (isNaN(d.getTime())) return "Không hợp lệ";

        return new Intl.DateTimeFormat('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(d);
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'received':
                return 'Đã nhận';
            case 'pending':
                return 'Chờ nhận';
            case 'failed':
                return 'Thất bại';
            default:
                return status;
        }
    };

    const getStatusClass = (status: string) => {
        switch (status) {
            case 'received':
                return styles.statusReceived;
            case 'pending':
                return styles.statusPending;
            case 'failed':
                return styles.statusFailed;
            default:
                return '';
        }
    };

    if (!isShowHistory) return null;

    return (
        <div className={styles.historyModal}>
            <div className={styles.historyContent}>
                <div className={styles.historyHeader}>
                    <h2 className={styles.historyTitle}>Lịch Sử Vòng Quay</h2>
                    <button
                        className={styles.closeButton}
                        onClick={onClose}
                    >
                        ×
                    </button>
                </div>

                {spinHistory.length > 0 ? (
                    <div className={styles.tableContainer}>
                        <table className={styles.historyTable}>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Thời Gian</th>
                                    <th>ID</th>
                                    <th>Tên Quà</th>
                                    <th>Số Lượng</th>
                                    <th>Trạng Thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                {spinHistory.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{formatDate(item.timestamp)}</td>
                                        <td>{item.prizeId}</td>
                                        <td>{item.prizeName}</td>
                                        <td>{item.quantity}</td>
                                        <td className={getStatusClass(item.status)}>
                                            {getStatusText(item.status)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className={styles.emptyHistory}>
                        <div className={styles.emptyHistoryIcon}>🎁</div>
                        <div className={styles.emptyHistoryText}>
                            Chưa có lịch sử vòng quay
                        </div>
                        <div className={styles.emptyHistorySubtext}>
                            Thử vận may của bạn ngay nào!
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HistoryModal;