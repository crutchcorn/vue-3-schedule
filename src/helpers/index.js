import {mount} from "@vue/test-utils";
import {logDOM, getQueriesForElement} from "@testing-library/dom";

// Currently, vue-testing-library does not support Vue 3.
// This is a placeholder for now that will suffice for basic
// Testing usage
export const render = (comp) => {
    const attachTo = document.createElement('div');
    const baseElement = document.body;
    baseElement.appendChild(attachTo);
    mount(comp, {
        attachTo: attachTo
    });
    return {
        ...getQueriesForElement(document.body),
        debug: (el = baseElement) => logDOM(el)
    };
}
