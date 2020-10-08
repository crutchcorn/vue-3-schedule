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
