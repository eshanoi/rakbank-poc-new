import {
    useEffect,
    useState,
} from 'react';

import {
    getDataByContentIdAsync,
    getDataByContentUrlAsync,
} from './blocks/ContainerBlock/content-api';
import { IContentDataBase } from './models/base-common-model';
import { renderComponentData } from './utils/component-renderer';

// page layout
function CommonRootComponent() {
    const [blockData, setBlockData] = useState(null as unknown as IContentDataBase);

    useEffect(() => {
        const anyWindow = globalThis as any

        if (anyWindow.isInEditMode) {
            window.isEditMode = true;
            const contentId = anyWindow.top.location.hash.split('epi.cms.contentdata:///')[1].split('&')[0] as number;
            getDataByContentIdAsync(contentId).then((data) => {
                setBlockData(data as IContentDataBase);
            })
        } else {
            window.isEditMode = false;
            getDataByContentUrlAsync(window.location.pathname).then((data) => {
                setBlockData(data as IContentDataBase);
            })
        }

    }, [])
    return (

        <div className="container">
            {blockData && renderComponentData(blockData)}
        </div>
    );
}
export default CommonRootComponent;
