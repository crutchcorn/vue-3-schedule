import {mount} from "@vue/test-utils";
import {logDOM, getQueriesForElement, waitFor, fireEvent as dtlFireEvent} from "@testing-library/dom";

// Currently, vue-testing-library does not support Vue 3.
// This is a placeholder for now that will suffice for basic
// Testing usage
export const render = (comp) => {
    const attachTo = document.createElement('div');
    const baseElement = document.body;
    baseElement.appendChild(attachTo);
    const wrapper = mount(comp, {
        attachTo: attachTo
    });

    function cleanup() {
        if (
            wrapper.element.parentNode &&
            wrapper.element.parentNode === document.body
        ) {
            document.body.removeChild(wrapper.element)
        }

        try {
            wrapper.unmount()
        } finally {
            // DO nothing
        }
    }

    async function fireEvent(...args) {
        dtlFireEvent(...args)
        await waitFor(() => {})
    }

    Object.keys(dtlFireEvent).forEach(key => {
        fireEvent[key] = async (...args) => {
            dtlFireEvent[key](...args)
            await waitFor(() => {})
        }
    })

    return {
        ...getQueriesForElement(document.body),
        debug: (el = baseElement) => logDOM(el),
        cleanup,
        fireEvent
    };
}

export * from '@testing-library/dom'
