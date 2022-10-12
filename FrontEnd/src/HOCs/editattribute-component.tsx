export default function EditAttributeFor(keyName: string, element: HTMLElement | null) {
    if (!keyName) {
        return ""
    }
    const isInEditMode = window.isEditMode;
    if (isInEditMode) {
        element?.setAttribute(`data-epi-property-name`, keyName);
        element?.setAttribute(`data-epi-use-mvc`, "True");
    }
    return "";
}

