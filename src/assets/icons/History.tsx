import * as React from "react";

function History(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" stroke="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path stroke="none" d="M9.40303 7.33301H12.0384C12.4024 7.33301 12.697 7.63167 12.697 7.99967C12.697 8.36767 12.4024 8.66634 12.0384 8.66634H8.74437C8.65734 8.66582 8.57128 8.64816 8.49108 8.61437C8.41088 8.58058 8.33812 8.53133 8.27696 8.46943C8.2158 8.40752 8.16742 8.33417 8.13461 8.25357C8.10179 8.17297 8.08517 8.0867 8.0857 7.99967V3.99967C8.0857 3.63167 8.38037 3.33301 8.74437 3.33301C9.10837 3.33301 9.40303 3.63167 9.40303 3.99967V7.33301ZM13.403 3.28567C14.6429 4.54089 15.3364 6.23533 15.3324 7.99967C15.3324 11.6817 12.383 14.6663 8.74437 14.6663V13.333C11.655 13.333 14.015 10.945 14.015 7.99967C14.0184 6.58803 13.4634 5.23233 12.471 4.22834C11.9847 3.7335 11.4047 3.34052 10.7649 3.07233C10.125 2.80414 9.43815 2.66612 8.74437 2.66634C6.3817 2.66634 4.3817 4.23967 3.71303 6.40767L4.61437 5.79234C4.68602 5.74342 4.76669 5.70925 4.85168 5.69181C4.93667 5.67438 5.02427 5.67402 5.1094 5.69078C5.19452 5.70753 5.27547 5.74105 5.34751 5.78939C5.41955 5.83773 5.48126 5.89992 5.52903 5.97234C5.62682 6.11905 5.66296 6.29835 5.62966 6.47148C5.59635 6.64462 5.49627 6.79771 5.35103 6.89767L3.16637 8.38901C3.09471 8.43793 3.01404 8.4721 2.92906 8.48954C2.84407 8.50697 2.75646 8.50732 2.67133 8.49057C2.58621 8.47382 2.50527 8.4403 2.43322 8.39196C2.36118 8.34362 2.29947 8.28143 2.2517 8.20901L0.779033 5.99834C0.681039 5.85158 0.644775 5.67213 0.678088 5.49883C0.7114 5.32553 0.81161 5.17232 0.957033 5.07234C1.02869 5.02342 1.10935 4.98925 1.19434 4.97181C1.27933 4.95438 1.36694 4.95402 1.45207 4.97078C1.53719 4.98753 1.61813 5.02105 1.69018 5.06939C1.76222 5.11773 1.82393 5.17992 1.8717 5.25234L2.43103 6.09167C3.24103 3.33967 5.76103 1.33301 8.74437 1.33301C10.5637 1.33301 12.211 2.07967 13.403 3.28567Z" />
    </svg>
    
  );
}

const MemoHistory = React.memo(History);
export default MemoHistory;