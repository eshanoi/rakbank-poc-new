import { lazy } from 'react';

export declare interface ComponentParseModel {
    typeName: string[];
    component: any;
}
const initLazyComponentsList = () => {
    let componentsList = [
        { typeName: ["HeroBlock"], component: lazy(() => import("../../components/blocks/HeroBlock/hero-block")) },
        { typeName: ["HomePage"], component: lazy(() => import("../../components/pages/home-page/home-page-component")) },
        { typeName: ["HeroBlockCallout", "Callout"], component: lazy(() => import("../../components/blocks/CalloutBlock/callout-block")) },
    ];
    return componentsList as Array<ComponentParseModel>;
};
var componentsLazyList = initLazyComponentsList();

export { componentsLazyList };
