import { IContentDataBase } from '../../models/base-common-model';

const baseUrl = '/api/episerver/v3.0/content/';
const prepareUrl = (url: string) => {
    if (url.includes('?')) {
        return `${url}&expand=*&epieditmode`;
    }
    let returnUrl = `${url}?expand=*`;
    if (window.isEditMode) {
        returnUrl = `${returnUrl}&epieditmode=true`;
    }
    return returnUrl;
}

const baseHeader = { 'content-type': 'application/json' } as HeadersInit;
const prepareRequestHeader = (header: HeadersInit) => {
    const language = window.location.pathname.split('/')[0];
    return { ...header, 'accept-language': language } as HeadersInit;
}

const prepareRequest = (): RequestInit => {
    const header = prepareRequestHeader(baseHeader);
    return { mode: 'no-cors', headers: header } as RequestInit;
}

export const getDataByContentIdAsync = async (blockId: string): Promise<IContentDataBase | null> => {
    // return fakeGetData(blockId);
    const url = prepareUrl(`${baseUrl}${blockId}`);
    const request = prepareRequest();

    const response = await fetch(url, request);
    if (response) {
        const jsonData = await response.json();
        return jsonData as IContentDataBase;
    }
    return null as unknown as IContentDataBase;
}

export const getDataByContentUrlAsync = async (pageUrl: string): Promise<IContentDataBase | null> => {
    const url = prepareUrl(`${baseUrl}?contentUrl=${pageUrl}`);
    const request = prepareRequest();
    try {
        const response = await fetch(url, request);
        if (response) {
            const jsonData = await response.json();
            if (jsonData.length) {
                const data = jsonData[0] as IContentDataBase;

                return data;

            }
        }
    } catch (error) {
        console.error(error);
    }

    return null as unknown as IContentDataBase;
}

export const loadPageData = () => {
    const anyWindow = globalThis as any;
    const contentDeliveryReact = anyWindow.contentDeliveryReact;
    if (contentDeliveryReact?.isInEditMode as boolean) {
        console.warn('editmode is on')
        window.isEditMode = true;

        const contentId = contentDeliveryReact?.contentLinkId
            || getContentIdFromLocation();
        return getDataByContentIdAsync(contentId)
    } else {
        window.isEditMode = false;
        return getDataByContentUrlAsync(window.location.pathname);
    }
}

const getContentIdFromLocation = () => {
    const anyWindow = globalThis as any
    const hashList = anyWindow.top.location.hash.split('epi.cms.contentdata:///')
    if (hashList.length > 1) {
        const dataSection = hashList[1].split('&')[0];
        return dataSection;
    }
    return -1;
}