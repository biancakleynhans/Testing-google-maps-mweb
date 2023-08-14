import styles from '../../styles/LoadingSpinner.module.css';

const setStrokeColor = (color: string) => {
  switch (color) {
    case 'black':
      return styles.black;
    case 'white':
      return styles.white;
    case 'red':
      return styles.red;
    case 'blue':
      return styles.blue;

    default:
      return styles.black;
  }
};

interface iProps {
  strokeColor: string;
  viewBox: string;
  cx: string;
  r: string;
  strokeWidth: string;
  spinnerStyles: string;
  size: string;
}

function LoadingSpinner({ isSmall, color }: { isSmall?: boolean; color: 'black' | 'white' | 'blue' }) {
  const strokeColor = color; //'white';
  const viewBox = '50';
  const cx = '25';
  const r = '20';
  const strokeWidth = '5';
  const spinnerStyles = color; //'white';
  const size = isSmall ? 'small' : 'large';

  return (
    <div className='mx-2 flex flex-row justify-center content-center items-center'>
      <svg className={`${size === 'large' ? styles.spinner : styles.spinnerSmall} ${spinnerStyles}`} viewBox={`0 0 ${viewBox} ${viewBox}`}>
        <circle className={`${setStrokeColor(strokeColor)}`} cx={cx} cy={cx} r={r} fill='none' strokeWidth={strokeWidth}></circle>
      </svg>
    </div>
  );
}

export default LoadingSpinner;
