import { PHONE_NUMBER } from '../../consts/data';

interface Props {
  className?: string;
}

const formatPhoneNumber = (phoneNumber: string) => (
  [...phoneNumber].filter((symbol) => /^-?\d+$/.test(symbol)).join('')
);

export function PhoneLink({ className }: Props) {
  return (
    <a
      href={`tel:+${formatPhoneNumber(PHONE_NUMBER)}`}
      className={className}
      style={{ textDecoration: 'underline' }}
    >
      {PHONE_NUMBER}
    </a>
  );
}
