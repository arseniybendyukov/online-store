import css from './index.module.css';
import warehouse from '../../images/warehouse.webp';

export function About() {
  return (
    <div className={`container ${css.container}`}>
      <h1 className='h1'>About Our Company</h1>

      <p>
        We are dedicated to providing high-quality professional chemicals and equipment for
        industrial and laboratory needs. Our mission is to empower companies and researchers
        to achieve excellence in their work safely and efficiently.
      </p>

      <h2 className={`h3 ${css.heading}`}>Our History</h2>
      <p>
        Founded in 2005 in Novosibirsk, our company has grown into a trusted supplier of
        professional chemicals and equipment across Russia. Over the years, we have established
        partnerships with international and local manufacturers, ensuring the highest quality
        for our clients.
      </p>
      <p>
        From a small warehouse to a full-fledged logistics network, we have always focused on
        delivering excellence, reliability, and trust.
      </p>
      <img
        src={warehouse}
        alt="Warehouse"
        className={css.image}
      />

      <h2 className={`h2 ${css.heading}`}>Our Goals</h2>
      <p>
        We aim to expand our range of professional chemicals and laboratory equipment, always
        keeping innovation, safety, and environmental responsibility at the forefront.  
      </p>
      <p>
        Our vision is to be recognized as the leading supplier in Russia, providing solutions
        that help scientists, engineers, and businesses thrive.
      </p>

      <h2 className={`h2 ${css.heading}`}>Why Choose Us?</h2>
      <ul className={css.deliveryMethods}>
        <li>High-quality products from trusted international and Russian manufacturers</li>
        <li>Reliable delivery across Novosibirsk and all of Russia</li>
        <li>Professional customer support and technical consultation</li>
        <li>Commitment to safety and sustainability</li>
      </ul>
    </div>
  );
}
