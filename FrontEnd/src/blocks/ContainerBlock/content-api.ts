import { IContentDataBase } from '../../models/base-common-model';

const baseUrl = '/api/episerver/v3.0/content/';
const prepareUrl = (url: string) => {
    if (url.includes('?')) {
        return `${url}&expand=*`;
    }
    return `${url}?expand=*`;
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

export const getDataByContentIdAsync = async (blockId: number): Promise<IContentDataBase | null> => {
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
// 
export const fetchDataAsyncXHR = (blockId: number) => {
    new Promise(r => {
        const xhr = new XMLHttpRequest();
        xhr.onload = (response) => {
            console.warn('fetch data ok', response);
            r(response)
        }
        xhr.onerror = (response) => {
            console.warn('fetch data err', response);
        }
        xhr.open('get', `https://localhost:44397/api/episerver/v3.0/content/${blockId}`);
        xhr.send();
    })

}
