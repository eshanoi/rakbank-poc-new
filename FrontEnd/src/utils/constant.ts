import { Root } from 'react-dom/client';

import { ComponentParseModel } from './component-extensions/componentRegister';

declare global {
    interface Window {
        data: any;
        isEditMode?: boolean;
        root: RootModel[];
        htmlServerSide: IServerSideHtml[];
        componentsLazyList: Array<ComponentParseModel>;
    }
}

export declare interface RootModel {
    id: string;
    root: Root;
}
export declare interface IServerSideHtml {
    selector: string;
    html: string;
}
