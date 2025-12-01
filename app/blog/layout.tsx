// app/account/layout.tsx
export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="blog-layout">
            {children}
        </div>
    );
}