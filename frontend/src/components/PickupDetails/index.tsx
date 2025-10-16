import { ADDRESS, SCHEDULE } from '../../consts/data';
import { Label } from '../Label';

export const PickupDetails = () => (
  <ul>
    <li>
      <Label label='Storage Period' gap={10}>1 day</Label>
    </li>
    <li>
      <Label label='Address' gap={10}>{ADDRESS}</Label>
    </li>
    <li>
      <Label label='Working Hours' gap={10}>{SCHEDULE}</Label>
    </li>
    <li>
      <Label label='Payment Method' gap={10}>Cash on Delivery</Label>
    </li>
  </ul>
);
