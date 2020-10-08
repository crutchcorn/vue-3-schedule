import {render} from '@/helpers';
import Month from '../Month.vue'

test('today should be shown', async () => {
    const attachTo = document.createElement('div');
    document.body.appendChild(attachTo);
    const {getByText} = render(Month);
    expect(getByText('October, 2020')).toBeInTheDocument();
})
