import {useRouter} from 'next/router';

import {
    Container
} from 'react-bootstrap';

import ComicEditor from '../../../../components/ComicEditor';

export default function Post () {
    const router = useRouter();
    const { cid } = router.query;

    return (
        <Container>
            <ComicEditor comicID={cid} />
        </Container>
    )
}

export function getServerSideProps() {
    return {
        props: {}
    }
}