'use client'
// import Post from '@/components/Post/Post';
import { useRouter } from 'next/router';
import { useParams } from 'next/navigation'


export default function SlugPage() {
    // const router = useRouter();
    // const { postId } = router.query;
    const params = useParams()
    const slug = params?.slug || '' // "log-1-2"
    return (
        <>
            <div className='detail-post'>
                Đây là bài viết số {slug}
            </div>
        </>
    )
}