import React from 'react';
import styled from 'styled-components/macro';

const StyledConsoleIcon = styled.svg`
  position: absolute;
  height: 1200px;
  top: -70px;
  left: -600px;
  z-index: -1;
  @media (min-width: ${({theme}) => theme.breakpoints.xxlgSize}){
    height: 1400px;
    width: 1400px;
    top: -270px;
    left: -700px;
  }
  @media (max-width: ${({theme}) => theme.breakpoints.smSize}){
    height: 800px;
    width: 800px;
    top: 20px;
    left: -400px;
  }
  @media (max-width: ${({theme}) => theme.breakpoints.xsSize}){
    height: 700px;
    width: 700px;
    top: 0;
    left: -350px;
  }
  
  @keyframes rotating {
    from { transform: rotate(360deg); }
    to { transform: rotate(0deg); }
  }
  
  animation: rotating 7s linear infinite;
  will-change: transform;
`;

export const TravelPlane = () => {
  return (
    <StyledConsoleIcon xmlns="http://www.w3.org/2000/svg" width="1200" height="1200" viewBox="0 0 1200 1200">
        <g fill="none" fillRule="evenodd" transform="translate(514 45)">
          <path fill="#F6F6F6" d="M69.7470598,46.6420471 L96.8767123,59.5955056 L87.7301723,59.5955056 L46.4657534,46.6420471 C52.4401366,45.9293715 56.7286251,45.5730337 59.3312189,45.5730337 C61.9338127,45.5730337 65.4057596,45.9293715 69.7470598,46.6420471 Z" transform="matrix(1 0 0 -1 0 105.169)"/>
          <polygon fill="#000" fillOpacity=".039" points="69.556 45.691 96.877 58.719 96.042 58.719 68.822 45.573" transform="matrix(1 0 0 -1 0 104.292)"/>
          <polygon fill="#E3E3E3" points="116.892 50.393 127.123 54.775 120.806 54.775 105.644 50.393" transform="matrix(1 0 0 -1 0 105.169)"/>
          <path fill="#FFF" d="M116.299081,58.809169 C105.224004,64.4073838 94.7677333,67.2064912 84.9302693,67.2064912 C52.9108107,67.2064912 53.0455543,68.8149197 20.16594,67.2064912 C10.130886,66.7155892 5.26027397,65.2421937 5.26027397,62.9365714 C5.26027397,60.6309492 9.50583013,60.6045564 14.178864,57.1946636 C16.8907559,55.2158077 18.1920065,52.6650857 24.9410155,52.3074569 C46.9279435,51.1423732 69.3844819,51.1423732 92.3106309,52.3074569 L110.459876,49.7152638 L118.004545,39.8764045 L123.616438,39.8764045 L116.299081,58.809169 Z"/>
          <path fill="#000" fillOpacity=".029" d="M116.60274,58.7191011 C105.497376,64.3726506 95.0125103,67.1994253 85.1481437,67.1994253 C53.0411211,67.1994253 53.1762332,68.8237521 20.2067027,67.1994253 C10.1442057,66.7036711 5.26027397,65.2157121 5.26027397,62.8873002 C5.26027397,61.7950092 21.6333905,65.3406335 58.3877833,64.4096385 C68.7064093,64.1482659 88.1113948,62.2514202 116.60274,58.7191011 Z"/>
          <polygon fill="#DFDFDF" points="50.411 65.113 53.05 64.854 74.159 65.113 74.521 70.204 64.264 71.865 50.411 71.865"/>
          <polygon fill="#000" fillOpacity=".029" points="50.411 68.665 74.159 67.921 74.521 70.291 64.264 71.865 50.411 71.865"/>
          <polygon fill="#FBFBFB" points="116.892 54.775 127.123 62.225 122.008 62.225 105.644 54.775"/>
          <ellipse cx="50.411" cy="68.579" fill="#BBB" rx="1" ry="3.287"/>
          <path fill="#F5F5F5" d="M71.0621283,62.918428 L98.1917808,81.9438202 L89.0452408,81.9438202 L47.7808219,62.918428 C53.7552051,61.8716858 58.0436936,61.3483146 60.6462874,61.3483146 C63.2488812,61.3483146 66.7208281,61.8716858 71.0621283,62.918428 Z"/>
          <polygon fill="#000" fillOpacity=".039" points="71.108 62.892 98.192 81.944 97.219 81.944 70.137 62.663"/>
          <rect width="1.753" height="3.067" x="28.493" y="56.528" fill="#D8D8D8" rx=".877"/>
          <rect width="1.753" height="3.067" x="42.521" y="56.528" fill="#D8D8D8" rx=".877"/>
          <rect width="1.753" height="3.067" x="56.548" y="56.528" fill="#D8D8D8" rx=".877"/>
          <rect width="1.753" height="3.067" x="70.575" y="56.528" fill="#D8D8D8" rx=".877"/>
          <rect width="1.753" height="3.067" x="84.603" y="56.528" fill="#D8D8D8" rx=".877"/>
          <rect width="1.753" height="3.067" x="32" y="56.528" fill="#D8D8D8" rx=".877"/>
          <rect width="1.753" height="3.067" x="46.027" y="56.528" fill="#D8D8D8" rx=".877"/>
          <rect width="1.753" height="3.067" x="60.055" y="56.528" fill="#D8D8D8" rx=".877"/>
          <rect width="1.753" height="3.067" x="74.082" y="56.528" fill="#D8D8D8" rx=".877"/>
          <rect width="1.753" height="3.067" x="88.11" y="56.528" fill="#D8D8D8" rx=".877"/>
          <rect width="1.753" height="3.067" x="35.507" y="56.528" fill="#D8D8D8" rx=".877"/>
          <rect width="1.753" height="3.067" x="49.534" y="56.528" fill="#D8D8D8" rx=".877"/>
          <rect width="1.753" height="3.067" x="63.562" y="56.528" fill="#D8D8D8" rx=".877"/>
          <rect width="1.753" height="3.067" x="77.589" y="56.528" fill="#D8D8D8" rx=".877"/>
          <rect width="1.753" height="3.067" x="91.616" y="56.528" fill="#D8D8D8" rx=".877"/>
          <rect width="1.753" height="3.067" x="39.014" y="56.528" fill="#D8D8D8" rx=".877"/>
          <rect width="1.753" height="3.067" x="53.041" y="56.528" fill="#D8D8D8" rx=".877"/>
          <rect width="1.753" height="3.067" x="67.068" y="56.528" fill="#D8D8D8" rx=".877"/>
          <rect width="1.753" height="3.067" x="81.096" y="56.528" fill="#D8D8D8" rx=".877"/>
          <rect width="1.753" height="3.067" x="95.123" y="56.528" fill="#D8D8D8" rx=".877"/>
          <path fill="#D8D8D8" d="M17.9316159,56.5284962 C18.3225186,56.4935939 15.7964115,58.7191011 15.484654,58.7191011 C14.8387153,58.7191011 13.7865295,58.7191011 13.2127441,58.7191011 C12.7298453,58.7191011 15.2168808,56.6731252 15.4334419,56.6731252 C16.0884725,56.6731252 17.2900445,56.5857797 17.9316159,56.5284962 Z"/>
          <path fill="#D8D8D8" d="M20.1019694 56.5282879C20.5018974 56.5064795 18.8637579 58.2934852 18.4835628 58.3732753 17.9113331 58.493367 16.2940561 58.7191011 15.7902024 58.7191011 15.6098634 58.7191011 18.0872816 56.6933888 18.2752744 56.6775692 18.8515996 56.6290715 19.4925002 56.5615226 20.1019694 56.5282879zM22.3076322 56.0904523C22.5886353 56.0528976 21.5695108 57.9009052 21.2958685 57.9618903 20.884011 58.0536787 19.6585669 58.2808989 19.2959224 58.2808989 19.1661249 58.2808989 20.6087208 56.4858949 20.73931 56.4578597 21.1437814 56.3710266 21.9032607 56.1444946 22.3076322 56.0904523z"/>
          <polygon fill="#37517C" points="113.534 60.034 70.575 60.91 77.598 61.787 109.866 61.787"/>
          <polygon fill="#37517C" points="107.397 62.663 78.027 63.19 80.696 63.364 104.821 63.539"/>
        </g>
    </StyledConsoleIcon>
  );
}