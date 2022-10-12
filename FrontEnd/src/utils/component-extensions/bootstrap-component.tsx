import {
    useEffect,
    useState,
} from 'react';

import { IContentDataBase } from '../../models/base-common-model';
import { loadPageData } from '../api/content-api';
import { renderComponentData } from './component-renderer';

// page layout
function BootstrapComponent() {
    const [contentData, setBlockData] = useState(null as unknown as IContentDataBase);

    useEffect(() => {
        loadPageData().then((data) => {
            setBlockData(data as IContentDataBase);
        });
    }, [])
    return (

        <div className="container">
            {contentData && renderComponentData(contentData)}
        </div>
    );
}
export default BootstrapComponent;
