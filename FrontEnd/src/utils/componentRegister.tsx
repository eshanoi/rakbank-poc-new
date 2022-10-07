import { lazy } from 'react';

export declare interface ComponentParseModel {
    typeName: string[];
    component: any;
}
const initLazyComponentsList = () => {
    let componentsList = [
        { typeName: ["HeroBlock"], component: lazy(() => import("../blocks/HeroBlock/hero-block")) },
        { typeName: ["HomePage"], component: lazy(() => import("../pages/home-page/home-page-component")) },
        { typeName: ["HeroBlockCallout", "Callout"], component: lazy(() => import("../blocks/CalloutBlock/callout-block")) },
    ];
    return componentsList as Array<ComponentParseModel>;
};
var componentsLazyList = initLazyComponentsList();

export { componentsLazyList };
