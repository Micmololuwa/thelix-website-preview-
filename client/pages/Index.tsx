import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";

// ---- Reusable SVG Icons ----

const LightbulbIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
    <rect width="48" height="48" rx="24" fill="white" fillOpacity="0.1" />
    <path d="M34.4675 19.5387C34.4713 21.0599 34.1277 22.5619 33.4628 23.9301C32.798 25.2984 31.8295 26.4967 30.6311 27.4338C30.374 27.6314 30.1654 27.8851 30.0213 28.1756C29.8772 28.4661 29.8015 28.7857 29.7999 29.11V29.8106C29.7999 30.0252 29.7576 30.2378 29.6754 30.436C29.5932 30.6343 29.4727 30.8145 29.3208 30.9661C29.1689 31.1178 28.9886 31.2381 28.7903 31.3201C28.5919 31.402 28.3793 31.4441 28.1646 31.4438H20.6949C20.2617 31.4438 19.8463 31.2718 19.54 30.9655C19.2337 30.6592 19.0616 30.2437 19.0616 29.8106V29.1081C19.0604 28.7876 18.9861 28.4717 18.8444 28.1843C18.7027 27.8969 18.4974 27.6455 18.244 27.4494C17.0494 26.5186 16.082 25.3283 15.415 23.9687C14.7481 22.609 14.3989 21.1155 14.394 19.6011C14.3627 14.1627 18.7572 9.63556 24.1897 9.50287C25.5278 9.47087 26.8588 9.70679 28.1043 10.1968C29.3499 10.6867 30.4848 11.4209 31.4425 12.3559C32.4001 13.291 33.161 14.4082 33.6806 15.6417C34.2001 16.8752 34.4676 18.2002 34.4675 19.5387ZM33.0664 19.5387C33.0668 18.3868 32.8366 17.2465 32.3896 16.1849C31.9425 15.1233 31.2876 14.1619 30.4633 13.3573C29.6391 12.5526 28.6621 11.9211 27.5901 11.4997C26.518 11.0784 25.3725 10.8758 24.221 10.9039C19.5475 11.021 15.7677 14.9101 15.7931 19.5874C15.7965 20.8913 16.0968 22.1773 16.6712 23.3478C17.2456 24.5183 18.0791 25.5426 19.1084 26.343C19.5307 26.67 19.8723 27.0895 20.1071 27.5692C20.3418 28.0488 20.4635 28.576 20.4627 29.11V29.8106C20.4627 29.8413 20.4687 29.8718 20.4805 29.9002C20.4923 29.9286 20.5095 29.9544 20.5312 29.9761C20.553 29.9979 20.5788 30.0151 20.6072 30.0269C20.6356 30.0387 20.6661 30.0447 20.6968 30.0447H28.1646C28.2267 30.0447 28.2863 30.02 28.3302 29.9761C28.3741 29.9322 28.3988 29.8727 28.3988 29.8106V29.1081C28.3999 28.5723 28.5236 28.0439 28.7603 27.5633C28.9971 27.0827 29.3407 26.6626 29.7647 26.3352C30.797 25.5292 31.6312 24.4977 32.2034 23.3197C32.7757 22.1416 33.0709 20.8483 33.0664 19.5387ZM30.7248 18.4888C30.4924 17.183 29.8647 15.98 28.9267 15.0424C27.9887 14.1047 26.7855 13.4775 25.4796 13.2456C25.3029 13.2287 25.1264 13.2793 24.9855 13.3873C24.8447 13.4952 24.7499 13.6525 24.7202 13.8275C24.6905 14.0025 24.7282 14.1822 24.8257 14.3305C24.9231 14.4789 25.0731 14.5848 25.2454 14.6271C27.2748 14.9686 28.9959 16.6916 29.3393 18.723C29.3816 18.8954 29.4876 19.0453 29.6359 19.1428C29.7843 19.2402 29.964 19.2779 30.139 19.2482C30.314 19.2185 30.4712 19.1238 30.5792 18.9829C30.6871 18.842 30.7378 18.6655 30.7209 18.4888ZM29.7999 33.8206C29.7999 34.0065 29.7261 34.1849 29.5948 34.3166C29.4635 34.4483 29.2853 34.5225 29.0993 34.5231H19.7621C19.67 34.5231 19.5788 34.5049 19.4937 34.4697C19.4086 34.4344 19.3312 34.3827 19.2661 34.3176C19.2009 34.2525 19.1493 34.1751 19.114 34.09C19.0788 34.0049 19.0606 33.9137 19.0606 33.8216C19.0606 33.7294 19.0788 33.6382 19.114 33.5531C19.1493 33.468 19.2009 33.3907 19.2661 33.3255C19.3312 33.2604 19.4086 33.2087 19.4937 33.1734C19.5788 33.1382 19.67 33.12 19.7621 33.12H29.0993C29.2856 33.12 29.4643 33.1941 29.5961 33.3258C29.7278 33.4575 29.8018 33.6362 29.8018 33.8225ZM28.3071 36.8979C28.3066 37.0838 28.2323 37.262 28.1006 37.3933C27.969 37.5246 27.7906 37.5984 27.6046 37.5984H21.2588C21.073 37.5984 20.8948 37.5246 20.7635 37.3932C20.6321 37.2618 20.5583 37.0836 20.5583 36.8979C20.5583 36.7121 20.6321 36.5339 20.7635 36.4025C20.8948 36.2711 21.073 36.1973 21.2588 36.1973H27.6085C27.7945 36.1978 27.9727 36.2721 28.104 36.4038C28.2353 36.5354 28.309 36.7138 28.309 36.8998Z" fill="white" />
  </svg>
);

const CheckIcon = () => (
  <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
    <g clipPath="url(#check-clip)">
      <path d="M13.5 24.75C14.9776 24.7518 16.4411 24.4617 17.8062 23.8962C19.1714 23.3307 20.4113 22.501 21.4549 21.4549C22.501 20.4113 23.3307 19.1714 23.8962 17.8062C24.4617 16.4411 24.7518 14.9776 24.75 13.5C24.7518 12.0224 24.4617 10.5589 23.8962 9.19378C23.3307 7.82863 22.501 6.58867 21.4549 5.54513C20.4113 4.49897 19.1714 3.66932 17.8062 3.10384C16.4411 2.53835 14.9776 2.24819 13.5 2.25001C12.0224 2.24819 10.5589 2.53835 9.19378 3.10384C7.82863 3.66932 6.58867 4.49897 5.54513 5.54513C4.49897 6.58867 3.66932 7.82863 3.10384 9.19378C2.53835 10.5589 2.24819 12.0224 2.25001 13.5C2.24819 14.9776 2.53835 16.4411 3.10384 17.8062C3.66932 19.1714 4.49897 20.4113 5.54513 21.4549C6.58867 22.501 7.82863 23.3307 9.19378 23.8962C10.5589 24.4617 12.0224 24.7518 13.5 24.75Z" fill="white" stroke="white" strokeWidth="2.25" strokeLinejoin="round" />
      <path d="M9 13.5L12.375 16.875L19.125 10.125" stroke="#F48220" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <defs>
      <clipPath id="check-clip">
        <rect width="27" height="27" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const QuoteIcon = () => (
  <svg width="123" height="99" viewBox="0 0 123 99" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-thelix-orange">
    <path d="M69.8493 98.8956V69.1577C69.8493 50.4851 74.2293 35.2705 82.9893 23.5136C91.9798 11.5263 105.235 3.68841 122.755 0V22.4763C114.917 24.3205 108.693 27.7784 104.082 32.8499C99.4719 37.691 96.475 43.5694 95.0919 50.4851H115.839V98.8956H69.8493ZM0 98.8956V69.1577C0 50.4851 4.37999 35.2705 13.14 23.5136C22.1305 11.5263 35.2704 3.68841 52.5599 0V22.4763C44.722 24.3205 38.4978 27.7784 33.8873 32.8499C29.2768 37.691 26.2799 43.5694 24.8968 50.4851H45.6441V98.8956H0Z" fill="#F48220" />
  </svg>
);

// ---- Credit Veto Logo ----
const CreditVetoLogo = () => (
  <div className="flex items-center gap-3">
    <div className="relative w-10 h-10 flex-shrink-0">
      <div className="absolute inset-x-0 bottom-0 top-1 rounded-t-[5px] rounded-b-[23px] bg-[#5B32E5]" />
      <svg style={{ borderRadius: "34.563px", background: "#F7F5F2" }} className="absolute left-[5px] top-0" width="30" height="35" viewBox="0 0 30 35" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.5108e-06 17.2815C1.7092e-06 19.551 0.381588 21.7982 1.12297 23.8949C1.86436 25.9916 2.95102 27.8967 4.32092 29.5014C5.69082 31.1062 7.31713 32.3791 9.10699 33.2476C10.8968 34.1161 12.8152 34.5631 14.7525 34.5631C16.6899 34.5631 18.6082 34.1161 20.3981 33.2476C22.188 32.3791 23.8143 31.1062 25.1842 29.5014C26.5541 27.8967 27.6407 25.9916 28.3821 23.8949C29.1235 21.7982 29.5051 19.551 29.5051 17.2815L24.0192 17.2815C24.0192 18.7071 23.7795 20.1186 23.3138 21.4356C22.8481 22.7527 22.1655 23.9493 21.305 24.9573C20.4446 25.9653 19.423 26.7649 18.2987 27.3104C17.1744 27.856 15.9695 28.1367 14.7525 28.1367C13.5356 28.1367 12.3306 27.856 11.2064 27.3104C10.0821 26.7649 9.06053 25.9653 8.20004 24.9573C7.33956 23.9493 6.65698 22.7527 6.19129 21.4356C5.7256 20.1186 5.48591 18.7071 5.48591 17.2815L1.5108e-06 17.2815Z" fill="#F7F5F2" />
      </svg>
    </div>
    <span className="font-bold text-xl text-black" style={{ fontFamily: "Inter, sans-serif" }}>Credit Veto</span>
  </div>
);

// ---- ExcelMind Logo ----
const ExcelMindLogo = () => (
  <div className="flex items-center gap-2">
    <svg width="37" height="29" viewBox="0 0 37 29" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.9919 4.66585V0C9.4268 0.372862 6.12615 2.05303 3.72694 4.71626C1.32772 7.37948 0 10.837 0 14.4215C0 18.0061 1.32772 21.4636 3.72694 24.1268C6.12615 26.7901 9.4268 28.4702 12.9919 28.8431V24.1868C11.0584 23.8825 9.25818 23.013 7.81784 21.6877C6.37751 20.3625 5.36147 18.6407 4.89765 16.7391H9.58077V12.1001H4.90532C5.36583 10.1996 6.38015 8.47856 7.81975 7.15508C9.25936 5.8316 11.0594 4.96526 12.9919 4.66585ZM36.6684 0H15.0083V4.79631C17.2794 5.21189 19.3328 6.41074 20.8112 8.18417C22.2896 9.9576 23.0992 12.1933 23.0992 14.5021C23.0992 16.8109 22.2896 19.0466 20.8112 20.8201C19.3328 22.5935 17.2794 23.7924 15.0083 24.2079V29.0042H36.6684V24.3653H23.8412C25.1289 22.9778 26.1349 21.3534 26.8034 19.5824C27.4499 17.873 29.1535 16.7967 30.98 16.7967H36.6684V12.1788H30.6059C29.776 12.1687 28.9692 11.9038 28.2949 11.42C27.6206 10.9361 27.1113 10.2567 26.836 9.47367C26.169 7.67279 25.151 6.02228 23.8412 4.61789H36.6684V0Z" fill="#094889" />
    </svg>
    <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "1.6rem", color: "#094889" }}>excel</span>
    <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "1.6rem", color: "#0A7DB6", marginLeft: "-0.4rem" }}>mind</span>
  </div>
);

// ---- ExcelMind Cyber Logo ----
const ExcelMindCyberLogo = () => (
  <div className="flex items-center gap-2">
    <svg width="35" height="39" viewBox="0 0 35 39" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#cyber-clip)">
        <path d="M22.2595 18.9732C21.836 19.4718 21.4124 19.9109 20.9998 20.3188C18.6555 22.6022 16.6238 23.393 16.6238 23.393C15.054 22.5867 13.6133 21.5506 12.3494 20.3188C11.9102 19.8917 11.4929 19.4426 11.0991 18.9732C11.4929 18.5039 11.9102 18.0548 12.3494 17.6276C13.6129 16.3954 15.0536 15.3592 16.6238 14.5535C16.6238 14.5535 18.6555 15.3443 20.9998 17.6276C21.4124 18.0277 21.836 18.4747 22.2595 18.9732Z" fill="#1283FF" />
        <path d="M29.3607 16.5961C28.909 17.3275 28.448 18.0183 27.9838 18.6716C27.3805 19.5171 26.7663 20.297 26.1568 21.0159C25.4426 21.8551 24.7315 22.6069 24.036 23.2836C20.0773 27.1267 16.6672 28.4598 16.6672 28.4598C14.0224 27.1032 11.5955 25.3585 9.46706 23.2836C8.73074 22.5639 8.03175 21.807 7.37283 21.0159C6.6127 20.1007 5.90565 19.1426 5.25516 18.1465C4.7863 17.4401 4.36277 16.7212 3.96424 15.996C2.03411 12.4889 0.838528 8.83966 0.0946074 5.48889H0.0789731C0.0789731 5.48889 -0.71965 14.2518 2.7624 23.2836C3.44653 25.0642 4.28317 26.7825 5.26297 28.4191C7.88904 32.8598 11.7072 36.4755 16.2843 38.8559C16.2843 38.8559 22.8326 36.2866 27.9916 27.8909C28.8977 26.4145 29.6963 24.8747 30.3812 23.2836C32.3661 18.6935 33.8195 12.8625 34.0774 5.50921C32.8615 9.96336 31.1939 13.6189 29.3607 16.5961Z" fill="#15194A" />
        <path d="M29.381 13.4218C28.9288 14.1512 28.4699 14.8435 28.0041 15.4989C27.4009 16.3444 26.7867 17.1227 26.1771 17.8432C25.4629 17.0039 24.7518 16.2522 24.0563 15.5754C20.0976 11.7324 16.6875 10.3993 16.6875 10.3993C14.0427 11.7559 11.6158 13.5006 9.48737 15.5754C8.74953 16.294 8.04897 17.0498 7.38845 17.84C6.62955 16.9242 5.92306 15.9662 5.27235 14.9706C4.80974 14.2621 4.37891 13.5448 3.97986 12.8186C4.36901 12.0184 4.80036 11.2213 5.27235 10.4368C7.89867 5.99521 11.7181 2.37934 16.2967 0C16.2967 0 22.8451 2.56934 28.0041 10.965C28.4777 11.7355 28.9387 12.5498 29.381 13.4218Z" fill="#1283FF" />
      </g>
      <defs>
        <clipPath id="cyber-clip">
          <rect width="34.0703" height="38.8511" fill="white" />
        </clipPath>
      </defs>
    </svg>
    <span className="text-[#15194A] font-semibold text-base leading-tight" style={{ fontFamily: "IBM Plex Sans, sans-serif" }}>ExcelMind<br />Cyber</span>
  </div>
);

// ---- Lightfort SVG Logo ----
const LightfortLogo = () => (
  <svg width="205" height="47" viewBox="0 0 205 47" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M26.1101 1.88908L19.2275 18.1177C19.078 18.4702 19.085 18.8694 19.2467 19.2164L21.7612 24.6116C22.1788 25.5076 21.5247 26.5341 20.5361 26.5341H1.35425C0.154409 26.5341 -0.450516 25.0871 0.392334 24.2331L23.9039 0.411962C24.9508 -0.648655 26.692 0.517142 26.1101 1.88908Z" fill="#21A0FC" />
    <path d="M47.3765 19.8455L22.2138 45.7187C21.1343 46.8287 19.3394 45.5465 20.0393 44.1655L29.1154 26.257C29.3029 25.8869 29.3101 25.4512 29.1349 25.0751L26.6318 19.7044C26.2173 18.815 26.8589 17.7942 27.8401 17.782L46.3909 17.5517C47.5939 17.5368 48.2154 18.983 47.3765 19.8455Z" fill="#091934" />
    <path d="M59.8525 35.4028V10.7506H64.3036V35.4028H59.8525ZM61.9754 35.4028V31.8762H76.4243V35.4028H61.9754Z" fill="#091934" />
    <path d="M77.5713 35.4028V17.9408H81.8854V35.4028H77.5713ZM77.3659 15.0647V10.3055H82.0566V15.0647H77.3659Z" fill="#091934" />
    <path d="M92.2893 42.7642C89.9839 42.7642 88.0893 42.2621 86.6056 41.2577C85.1448 40.2534 84.2774 38.8952 84.0035 37.1832H88.1122C88.3176 37.7767 88.7627 38.2332 89.4475 38.5528C90.1551 38.8952 91.0682 39.0664 92.1866 39.0664C93.8073 39.0664 95.0057 38.7012 95.7817 37.9707C96.5578 37.2631 96.9459 36.1789 96.9459 34.718V30.9517L97.254 31.0202C96.9801 32.2984 96.2839 33.3256 95.1654 34.1017C94.047 34.855 92.6774 35.2316 91.0567 35.2316C89.5046 35.2316 88.1464 34.8664 86.9823 34.1359C85.841 33.4055 84.9507 32.3897 84.3116 31.0887C83.6725 29.7647 83.3529 28.224 83.3529 26.4664C83.3529 24.6859 83.6839 23.1337 84.3459 21.8098C85.0078 20.4859 85.9323 19.4587 87.1192 18.7283C88.329 17.975 89.7328 17.5984 91.3307 17.5984C92.9741 17.5984 94.3209 17.9979 95.3709 18.7968C96.4437 19.5729 97.1057 20.6571 97.3568 22.0495L97.0828 22.0837V17.9408H101.294V34.6838C101.294 37.1718 100.484 39.1349 98.8633 40.5729C97.2654 42.0338 95.0741 42.7642 92.2893 42.7642ZM92.4605 31.8077C93.8529 31.8077 94.96 31.3397 95.7817 30.4039C96.6263 29.4452 97.0486 28.1098 97.0486 26.3979C97.0486 24.6859 96.6263 23.362 95.7817 22.4261C94.9372 21.4903 93.8187 21.0223 92.4263 21.0223C91.0567 21.0223 89.9497 21.5017 89.1051 22.4604C88.2605 23.3963 87.8383 24.7202 87.8383 26.4321C87.8383 28.1441 88.2605 29.468 89.1051 30.4039C89.9497 31.3397 91.0682 31.8077 92.4605 31.8077Z" fill="#091934" />
    <path d="M104.174 35.4028V10.7506H108.488V35.4028H104.174ZM116.431 35.4028V24.3778C116.431 23.3049 116.157 22.4946 115.609 21.9468C115.062 21.399 114.263 21.125 113.213 21.125C112.3 21.125 111.478 21.3305 110.747 21.7414C110.04 22.1522 109.481 22.7229 109.07 23.4533C108.682 24.1838 108.488 25.0283 108.488 25.987L108.043 21.8098C108.636 20.5316 109.503 19.5158 110.645 18.7625C111.786 17.9865 113.156 17.5984 114.753 17.5984C116.648 17.5984 118.12 18.1348 119.17 19.2077C120.243 20.2805 120.78 21.7071 120.78 23.4876V35.4028H116.431Z" fill="#091934" />
    <path d="M130.632 35.7452C128.486 35.7452 126.9 35.243 125.873 34.2387C124.868 33.2115 124.366 31.6821 124.366 29.6506V13.9691L128.715 12.3598V29.7533C128.715 30.5979 128.943 31.2256 129.399 31.6365C129.856 32.0474 130.575 32.2528 131.556 32.2528C131.944 32.2528 132.287 32.23 132.584 32.1843C132.903 32.1158 133.2 32.0359 133.474 31.9446V35.3001C133.2 35.437 132.812 35.5398 132.31 35.6082C131.807 35.6995 131.248 35.7452 130.632 35.7452ZM121.011 21.3305V17.9408H133.474V21.3305H121.011Z" fill="#091934" />
    <path d="M136.592 35.4028V16.3316C136.592 14.4142 137.117 12.9533 138.167 11.9489C139.24 10.9218 140.838 10.4082 142.961 10.4082C143.44 10.4082 143.84 10.431 144.159 10.4767C144.479 10.5223 144.787 10.5908 145.084 10.6821V14.0375C144.924 13.9691 144.719 13.9234 144.467 13.9006C144.216 13.8549 143.931 13.8321 143.612 13.8321C142.698 13.8321 142.014 14.0604 141.557 14.5169C141.123 14.9506 140.907 15.5897 140.907 16.4343V35.4028H136.592ZM133.442 21.3305V17.9408H144.707V21.3305H133.442Z" fill="#091934" />
    <path d="M153.358 35.7452C151.509 35.7452 149.877 35.3571 148.462 34.5811C147.069 33.805 145.985 32.7321 145.209 31.3626C144.433 29.9702 144.045 28.3838 144.045 26.6033C144.045 24.8229 144.433 23.2593 145.209 21.9126C145.985 20.5658 147.069 19.5158 148.462 18.7625C149.877 17.9865 151.509 17.5984 153.358 17.5984C155.23 17.5984 156.862 17.9865 158.254 18.7625C159.646 19.5158 160.731 20.5658 161.507 21.9126C162.283 23.2593 162.671 24.8229 162.671 26.6033C162.671 28.3838 162.272 29.9702 161.473 31.3626C160.697 32.7321 159.612 33.805 158.22 34.5811C156.827 35.3571 155.207 35.7452 153.358 35.7452ZM153.358 32.287C154.271 32.287 155.093 32.0588 155.823 31.6022C156.554 31.1229 157.124 30.4609 157.535 29.6164C157.946 28.749 158.151 27.7332 158.151 26.5691C158.151 24.8571 157.695 23.5104 156.782 22.5289C155.892 21.5473 154.75 21.0566 153.358 21.0566C151.966 21.0566 150.813 21.5473 149.9 22.5289C148.987 23.5104 148.53 24.8571 148.53 26.5691C148.53 27.7332 148.736 28.749 149.146 29.6164C149.58 30.4609 150.151 31.1229 150.858 31.6022C151.589 32.0588 152.422 32.287 153.358 32.287Z" fill="#091934" />
    <path d="M164.132 35.4028V17.9408H168.344V22.1522H168.446V35.4028H164.132ZM168.446 26.2952L168.001 22.1522C168.412 20.6685 169.108 19.5386 170.09 18.7625C171.071 17.9865 172.247 17.5984 173.617 17.5984C174.096 17.5984 174.438 17.6441 174.644 17.7354V21.8098C174.53 21.7642 174.37 21.7414 174.164 21.7414C173.959 21.7185 173.708 21.7071 173.411 21.7071C171.745 21.7071 170.501 22.0723 169.679 22.8028C168.857 23.5332 168.446 24.6973 168.446 26.2952Z" fill="#091934" />
    <path d="M185.552 35.7452C183.406 35.7452 181.82 35.243 180.793 34.2387C179.788 33.2115 179.286 31.6821 179.286 29.6506V13.9691L183.635 12.3598V29.7533C183.635 30.5979 183.863 31.2256 184.319 31.6365C184.776 32.0474 185.495 32.2528 186.477 32.2528C186.865 32.2528 187.207 32.23 187.504 32.1843C187.823 32.1158 188.12 32.0359 188.394 31.9446V35.3001C188.12 35.437 187.732 35.5398 187.23 35.6082C186.728 35.6995 186.168 35.7452 185.552 35.7452ZM175.931 21.3305V17.9408H188.394V21.3305H175.931Z" fill="#091934" />
    <path d="M189.723 35.4028V10.7506H194.038V35.4028H189.723ZM201.981 35.4028V24.3778C201.981 23.3049 201.707 22.4946 201.159 21.9468C200.612 21.399 199.813 21.125 198.763 21.125C197.85 21.125 197.028 21.3305 196.297 21.7414C195.59 22.1522 195.031 22.7229 194.62 23.4533C194.232 24.1838 194.038 25.0283 194.038 25.987L193.592 21.8098C194.186 20.5316 195.053 19.5158 196.195 18.7625C197.336 17.9865 198.706 17.5984 200.303 17.5984C202.198 17.5984 203.67 18.1348 204.72 19.2077C205.793 20.2805 206.329 21.7071 206.329 23.4876V35.4028H201.981Z" fill="#091934" />
  </svg>
);

// ---- Navbar ----
const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: "About Us", to: "/about" },
    { label: "Solutions", to: "/solutions" },
    { label: "Philanthropy", to: "/philanthropy" },
    { label: "News", to: "/news" },
    { label: "Career", to: "/career" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-white/40 shadow-sm">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-[100px] flex items-center justify-between h-[70px]">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/53e3ed38afe6949bf8626b35ba337900da7d6c16?width=188"
          alt="Thelix"
          className="h-9 w-auto"
        />
        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="text-black font-medium text-sm font-jakarta hover:text-thelix-orange transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
        {/* Mobile toggle */}
        <button
          className="md:hidden text-black p-1"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 pb-4">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="block py-3 text-black font-medium text-sm font-jakarta border-b border-gray-50 hover:text-thelix-orange transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

// ---- Hero Section ----
const HeroSection = () => (
  <section
    className="w-full"
    style={{
      background: "linear-gradient(180deg, #C4DFE8 0%, #F6F6F5 30.55%, #F2D1C0 59.77%)",
    }}
  >
    <div className="max-w-[1440px] mx-auto px-6 lg:px-[100px] pt-16 pb-0">
      <div className="flex flex-col items-center gap-3 text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl sm:text-5xl lg:text-[65px] font-bold text-black font-jakarta leading-tight">
          Leading the way in global innovation
        </h1>
        <p className="text-black/80 text-base leading-[25px] max-w-[675px] font-jakarta">
          Tincidunt neque viverra facilisi non consectetur morbi nisl pulvinar acel aliquam
          pellentesque sit vitae massa lacinia velit unc risus blandit.
        </p>
      </div>
    </div>
    <div className="w-full">
      <img
        src="https://api.builder.io/api/v1/image/assets/TEMP/0a6d6ea00c511924219aea8f4bcaf4a9cf5542ab?width=2880"
        alt="Thelix global innovation"
        className="w-full object-cover max-h-[520px] lg:max-h-[720px]"
      />
    </div>
  </section>
);

// ---- Partners Section ----
const PartnersSection = () => (
  <section className="bg-white py-8 border-b border-gray-100">
    <div className="max-w-[1440px] mx-auto px-6 lg:px-[100px]">
      <div className="flex flex-wrap items-center justify-between gap-8">
        <CreditVetoLogo />
        <ExcelMindLogo />
        <ExcelMindCyberLogo />
        <LightfortLogo />
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/597c9eb33616ddcc2e861c5728792cc6f2e327ea?width=308"
          alt="Partner"
          className="h-10 w-auto object-contain"
        />
      </div>
    </div>
  </section>
);

// ---- Orange Features Banner ----
const OrangeFeaturesBanner = () => (
  <section className="bg-thelix-orange py-16 lg:py-24">
    <div className="max-w-[1440px] mx-auto px-6 lg:px-[100px]">
      <div className="flex flex-col gap-12 lg:gap-20">
        <div className="flex flex-col gap-3 max-w-3xl">
          <h2 className="text-4xl sm:text-5xl lg:text-[65px] font-bold text-white font-jakarta leading-tight tracking-[2.6px]">
            Euismod sodales quis odio ullamcorper gravida.
          </h2>
          <p className="text-white/80 text-base leading-[25px] max-w-[868px] font-jakarta">
            Tincidunt neque viverra facilisi non consectetur morbi nisl pulvinar acel aliquam
            pellentesque sit vitae massa
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          {[
            "Tincidunt neque viverra facilisi non consectetur morbi",
            "Tincidunt neque viverra facilisi non consectetur morbi",
            "Tincidunt neque viverra facilisi non consectetur morbi",
          ].map((text, i) => (
            <div
              key={i}
              className="flex-1 flex items-center gap-4 px-5 py-5 rounded-full border border-white"
            >
              <CheckIcon />
              <p className="text-white/80 text-base leading-5 font-jakarta">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// ---- Venture Cards Section ----
const VentureCardsSection = () => {
  const cards = [
    { text: "Sit hendrerit quis id vel duis eleifend vitae pulvinar justo." },
    { text: "Sit hendrerit quis id vel duis eleifend vitae pulvinar justo." },
    { text: "Sit hendrerit quis id vel duis eleifend vitae pulvinar justo." },
    { text: "Sit hendrerit quis id vel duis eleifend vitae pulvinar justo." },
  ];

  return (
    <section className="bg-[#160A00] py-16 lg:py-24">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-[100px]">
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
          {/* Left text */}
          <div className="flex flex-col gap-3 lg:w-[45%] lg:flex-shrink-0">
            <h2 className="text-4xl sm:text-[45px] font-bold text-white font-jakarta leading-tight tracking-[1.8px]">
              Euismod sodales quis odio ullam.
            </h2>
            <p className="text-white/80 text-base leading-[25px] font-jakarta">
              Tincidunt neque viverra facilisi non consectetur morbi nisl pulvinar acel aliquam
              pellentesque sit vitae massa
            </p>
          </div>

          {/* Right cards grid */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cards.map((card, i) => (
              <div
                key={i}
                className="flex flex-col gap-10 p-5 rounded-xl border border-black/5 bg-thelix-orange"
              >
                <LightbulbIcon />
                <p className="text-white font-medium text-xl font-jakarta tracking-[0.84px] leading-normal">
                  {card.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ---- Portfolio Gallery Section ----
const PortfolioSection = () => {
  const smallImages = [
    { src: "https://api.builder.io/api/v1/image/assets/TEMP/baa461bf5edf6f253113b6716bc58173a99f248a?width=356", label: "Ed-tech" },
    { src: "https://api.builder.io/api/v1/image/assets/TEMP/0c0c5836a83aea33c39ab20c61cdb46d9a18a946?width=356", label: "Education" },
    { src: "https://api.builder.io/api/v1/image/assets/TEMP/c7c19425256418570a647c3fd217f08433a2206d?width=358", label: "Tourism" },
    { src: "https://api.builder.io/api/v1/image/assets/TEMP/8b222d3826c392e1f6a24d38c8cb258a8b436427?width=356", label: "Healthcare" },
  ];

  return (
    <section className="py-16 lg:py-24" style={{ background: "rgba(13,6,0,0.03)" }}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-[100px]">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-[45px] font-bold text-black font-jakarta tracking-[1.8px] leading-tight">
            Euismod sodales quis odio ullam.
          </h2>
          <p className="text-black/80 text-base leading-[25px] font-jakarta mt-3 max-w-xl mx-auto">
            Tincidunt neque viverra facilisi non consectetur morbi nisl pulvinar acel aliquam
            pellentesque sit vitae massa
          </p>
        </div>

        {/* Image grid */}
        <div className="flex flex-col lg:flex-row gap-3">
          {/* Large image */}
          <div className="relative rounded-lg overflow-hidden lg:w-[34%] flex-shrink-0 min-h-[280px] lg:min-h-[351px]">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/2644524c99e42097cbb6643ada4f13d81e8ce601?width=858"
              alt="Portfolio"
              className="w-full h-full object-cover absolute inset-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col gap-2">
              <h3 className="text-white font-bold text-2xl font-jakarta tracking-[1.12px]">
                Euismod sodales
              </h3>
              <p className="text-white/80 text-sm leading-[25px] font-jakarta">
                Tincidunt neque viverra facilisi non consectetur morbi nisl pulvinar acel aliquam
                pellentesque sit vitae massa
              </p>
              <button className="flex items-center gap-2 bg-thelix-orange text-white/80 text-base font-jakarta px-4 py-2 rounded w-fit mt-1 hover:bg-orange-500 transition-colors">
                Learn more
                <ArrowRight size={20} className="text-white" />
              </button>
            </div>
          </div>

          {/* Small images */}
          <div className="flex flex-row lg:flex-row gap-3 flex-1 overflow-x-auto lg:overflow-visible">
            {smallImages.map((img) => (
              <div
                key={img.label}
                className="relative rounded-lg overflow-hidden flex-shrink-0 w-[calc(50%-6px)] lg:w-auto lg:flex-1 min-h-[200px] lg:min-h-[351px]"
              >
                <img
                  src={img.src}
                  alt={img.label}
                  className="w-full h-full object-cover absolute inset-0"
                />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="text-white font-bold text-2xl font-jakarta tracking-[1.12px] whitespace-nowrap"
                    style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                  >
                    {img.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ---- Investment Commitment Section ----
const CommitmentSection = () => (
  <section className="bg-white py-16 lg:py-24">
    <div className="max-w-[1440px] mx-auto px-6 lg:px-[100px]">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left */}
        <div className="flex flex-col gap-10 lg:w-[46%]">
          <div className="flex flex-col gap-3">
            <h2 className="text-4xl sm:text-[45px] font-bold text-black font-jakarta tracking-[1.8px] leading-tight">
              Our Commitment to Impactful Investments
            </h2>
            <p className="text-black/80 text-base leading-[25px] font-jakarta">
              Our investment philosophy is centered on sectors that offer significant long-term
              returns and the potential to revolutionize economies. We believe in creating value that
              benefits all stakeholders, ensuring sustainable and inclusive growth.
            </p>
          </div>
          {/* Feature card */}
          <div
            className="flex flex-col gap-3 p-5 rounded-xl border-b-2"
            style={{
              background: "rgba(244,130,32,0.10)",
              borderBottomColor: "rgba(244,130,32,0.63)",
            }}
          >
            <h3 className="text-thelix-orange text-2xl font-bold font-jakarta tracking-[1.12px]">
              Driving Social Impact
            </h3>
            <p className="text-black/80 text-sm leading-[25px] font-jakarta">
              Thelix Holdings is committed to creating positive change by empowering communities,
              promoting sustainable development, and enhancing lives through innovative programs and
              strategic support. Our investments prioritize meaningful, lasting social impact.
            </p>
          </div>
        </div>

        {/* Right image */}
        <div className="lg:w-[38%]">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/a7a40cae2f45bc869b9e8566f866baa424d3ac6f?width=976"
            alt="Impactful Investments"
            className="w-full aspect-square object-cover rounded-2xl"
          />
        </div>
      </div>
    </div>
  </section>
);

// ---- Quote Section ----
const QuoteSection = () => (
  <section className="bg-[#160A00] py-20 lg:py-28">
    <div className="max-w-[1440px] mx-auto px-6 lg:px-[100px]">
      <div className="flex flex-col items-center gap-10 max-w-3xl mx-auto text-center">
        <QuoteIcon />
        <p className="text-white/80 text-3xl sm:text-4xl lg:text-[45px] font-normal font-jakarta leading-tight">
          Innovation is the lifeblood of any economy. When we stop innovating, we stop growing.
        </p>
        <div className="flex flex-col gap-2">
          <p className="text-thelix-orange text-2xl font-bold font-jakarta uppercase tracking-wide">
            Tolu Micheal
          </p>
          <p className="text-thelix-orange/49 text-2xl font-normal font-jakarta" style={{ color: "rgba(244,130,32,0.49)" }}>
            CVO - Chief Visionary Officer
          </p>
        </div>
      </div>
    </div>
  </section>
);

// ---- Latest Updates Section ----
const LatestUpdatesSection = () => {
  const articles = [
    {
      title: "Phasellus quis volutpat arcu ante in in. Nullam non.",
      date: "Sept. 16, 2025",
      img: "https://api.builder.io/api/v1/image/assets/TEMP/cd2f37f65034036e86c19ca0c3533b2ddbad43d0?width=738",
    },
    {
      title: "Phasellus quis volutpat arcu ante in in. Nullam non.",
      date: "Sept. 16, 2025",
      img: "https://api.builder.io/api/v1/image/assets/TEMP/cd2f37f65034036e86c19ca0c3533b2ddbad43d0?width=738",
    },
    {
      title: "Phasellus quis volutpat arcu ante in in. Nullam non.",
      date: "Sept. 16, 2025",
      img: "https://api.builder.io/api/v1/image/assets/TEMP/cd2f37f65034036e86c19ca0c3533b2ddbad43d0?width=738",
    },
  ];

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-[100px]">
        {/* Heading */}
        <div className="text-center mb-12 max-w-lg mx-auto">
          <h2 className="text-4xl sm:text-[45px] font-bold text-black font-jakarta tracking-[1.8px] leading-tight">
            Latest Update
          </h2>
          <p className="text-black/80 text-base leading-[25px] font-jakarta mt-3">
            Tincidunt neque viverra facilisi non consectetur morbi nisl pulvinar acel aliquam
            pellentesque sit vitae massa
          </p>
        </div>

        {/* Articles grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article, i) => (
            <div key={i} className="flex flex-col gap-3">
              <img
                src={article.img}
                alt={article.title}
                className="w-full h-[296px] object-cover rounded-xl"
              />
              <h3 className="text-black font-medium text-2xl font-jakarta tracking-[1.04px] leading-normal">
                {article.title}
              </h3>
              <p className="text-black/80 text-base leading-[25px] font-jakarta">{article.date}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ---- Footer ----
const Footer = () => (
  <footer className="bg-[#0D0600] pt-16 pb-8">
    <div className="max-w-[1440px] mx-auto px-6 lg:px-[100px]">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-0 lg:justify-between mb-12">
        {/* Brand */}
        <div className="max-w-sm">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/d840ca7463e4773ecd0f97ee78112084829c961e?width=409"
            alt="Thelix Holdings"
            className="h-16 w-auto mb-5"
          />
          <p className="text-white/80 text-base leading-[23px] font-jakarta">
            Ipsum nec nisi lacus morbi egestas ornare iaculis. Nulla porttitor volutpat eu purus
            elementum nunc aenean purus tellus. Ipsum commodo commodo facilisi commodo adipiscing
            dui non.
          </p>
        </div>

        {/* Footer links */}
        <div className="flex flex-col sm:flex-row gap-12 sm:gap-20 lg:gap-32">
          <div className="flex flex-col gap-6">
            <h4 className="text-white/80 font-bold text-xl font-jakarta leading-[25px]">
              Our Company
            </h4>
            <div className="flex flex-col gap-1">
              {["About Us", "Investment", "Philanthropy", "Sustainability", "News", "Careers"].map(
                (item) => (
                  <Link
                    key={item}
                    to={`/${item.toLowerCase().replace(" ", "-")}`}
                    className="text-white/80 text-sm font-jakarta leading-[34px] hover:text-thelix-orange transition-colors"
                  >
                    {item}
                  </Link>
                )
              )}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="text-white/80 font-bold text-xl font-jakarta leading-[25px]">
              Our Solution
            </h4>
            <div className="flex flex-col gap-1">
              {["Finance", "Edutech", "Education", "Healthcare", "Tourism"].map((item) => (
                <Link
                  key={item}
                  to={`/solutions`}
                  className="text-white/80 text-sm font-jakarta leading-[34px] hover:text-thelix-orange transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-white/80 text-base leading-[23px] font-jakarta">
          Copyright © 2025 Thelix Holdings
        </p>
        <p className="text-white/80 text-base leading-[23px] font-jakarta">
          Powered by Thelix Holdings
        </p>
      </div>
    </div>
  </footer>
);

// ---- Main Page ----
export default function Index() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <PartnersSection />
      <OrangeFeaturesBanner />
      <VentureCardsSection />
      <PortfolioSection />
      <CommitmentSection />
      <QuoteSection />
      <LatestUpdatesSection />
      <Footer />
    </div>
  );
}
