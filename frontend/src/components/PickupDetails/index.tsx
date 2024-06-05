import { ADDRESS, SCHEDULE } from '../../consts/data';
import { Label } from '../Label';

export const PickupDetails = () => (
  <ul>
    <li>
      <Label label='Срок хранения' gap={10}>1 день</Label>
    </li>
    <li>
      <Label label='Адрес 'gap={10}>{ADDRESS}</Label>
    </li>
    <li>
      <Label label='Время работы' gap={10}>{SCHEDULE}</Label>
    </li>
    <li>
      <Label label='Способ оплаты' gap={10}>При получении</Label>
    </li>
  </ul>
);
