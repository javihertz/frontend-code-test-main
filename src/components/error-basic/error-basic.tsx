import ExclamationCircle from '../../assets/images/exclamation-circle.svg';
import './error-basic.css';

export function ErrorBasic() {
  return (
    <div className='error-basic'>
      <p>We encountered an unexpected error.</p>
      <p>
        It seems the force is not with you at the moment. Please try again
        later.
      </p>
      <img
        src={ExclamationCircle}
        alt='Exclamation icon indicating an API error'
      />
    </div>
  );
}
