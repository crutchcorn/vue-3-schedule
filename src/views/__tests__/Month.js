import {render, waitFor} from '@/helpers';
import Month from '../Month.vue'
import { advanceTo } from 'jest-date-mock';

beforeAll(() => {
    advanceTo(new Date(2020, 9, 1, 0, 0, 0));
})

test('current month should be shown', async () => {
    const {getByText, cleanup} = render(Month);
    expect(getByText('October, 2020')).toBeInTheDocument();
    cleanup();
})

test('should be able to go to previous month', async () => {
    const {getByText, cleanup, fireEvent} = render(Month);
    const prevMonth = getByText('Previous Month');
    fireEvent.click(prevMonth);
    await waitFor(() => expect(getByText('September, 2020')).toBeInTheDocument());
    cleanup();
})

test('should be able to go to next month', async () => {
    const {getByText, cleanup, fireEvent} = render(Month);
    const prevMonth = getByText('Next Month');
    fireEvent.click(prevMonth);
    await waitFor(() => expect(getByText('November, 2020')).toBeInTheDocument());
    cleanup();
})

test('today button should jump to today from future date', async () => {
    const {getByText, cleanup, fireEvent} = render(Month);
    const prevMonth = getByText('Next Month');
    fireEvent.click(prevMonth);
    const today = getByText('Today');
    fireEvent.click(today);
    await waitFor(() => expect(getByText('October, 2020')).toBeInTheDocument());
    cleanup();
})

test('today button should jump to today from past date', async () => {
    const {getByText, cleanup, fireEvent} = render(Month);
    const prevMonth = getByText('Previous Month');
    fireEvent.click(prevMonth);
    const today = getByText('Today');
    fireEvent.click(today);
    await waitFor(() => expect(getByText('October, 2020')).toBeInTheDocument());
    cleanup();
})

test('show proper first day of the month', async () => {
    const {getByText, cleanup} = render(Month);
    expect(getByText('October 1, 2020')).toBeInTheDocument();
    cleanup();
})

test('show proper last day of month', async () => {
    const {getByText, cleanup} = render(Month);
    expect(getByText('October 31, 2020')).toBeInTheDocument();
    cleanup();
})

test('show day from previous month', async () => {
    const {getByText, cleanup} = render(Month);
    expect(getByText('September 27, 2020')).toBeInTheDocument();
    cleanup();
})

test('show day from next month', async () => {
    const {getByText, cleanup} = render(Month);
    expect(getByText('November 7, 2020')).toBeInTheDocument();
    cleanup();
})

test.skip('clicking on day from next month should navigate', async () => {
    const {getByText, fireEvent, cleanup} = render(Month);
    const el = getByText('November 7, 2020');
    // Throws an error:
    // Cannot read property 'push' of undefined
    fireEvent.click(el);
    await waitFor(() => expect(getByText('November 2020')).toBeInTheDocument());
    cleanup();
})

/**
 ● i get the same error as above, even when using the official library

 TypeError: Cannot read property 'push' of undefined

 36 |       <tr v-for="(week, weekI) in weekArr" :key="weekI" @keydown="arrowKeyHandler($event)">
 37 |         <td
 > 38 |           v-for="(day, dayI) in week"
 | ^
 39 |           :key="dayI"
 40 |           class="dayBox"
 41 |           :class="{diffMonth: day.diffMonth}"
 */
test.skip('i get the same error as above, even when using the official library', async () => {
    const {wrapper, cleanup} = render(Month);
    wrapper.find('[data-diffmonth="next"]').trigger('click');
    cleanup();
})
