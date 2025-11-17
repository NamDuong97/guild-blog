// app/account/layout.tsx
export default function AccountLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="account-layout">
            {children}
        </div>
    );
}