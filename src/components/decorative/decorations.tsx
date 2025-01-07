import React from 'react';

export function Decorations() {
    return (
        <div className="absolute inset-0 -z-10">
            {/* Clouds */}
            <svg
                className="absolute top-6 left-20 opacity-70 animate-cloud-drift"
                width="120"
                height="70"
                viewBox="0 0 120 70"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle cx="40" cy="40" r="40" fill="#ffffff" />
                <circle cx="90" cy="50" r="25" fill="#ffffff" />
            </svg>

            {/* Trees */}
            <svg
                className="absolute bottom-10 left-10"
                width="80"
                height="120"
                viewBox="0 0 80 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <rect x="35" y="50" width="10" height="70" fill="#204B87" />
                <circle cx="40" cy="30" r="30" fill="#1C3559" />
            </svg>

            {/* Circuit Lines */}
            <svg
                className="absolute right-16 top-24"
                width="240"
                height="120"
                viewBox="0 0 240 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <line x1="20" y1="20" x2="220" y2="20" stroke="#ffffff" strokeWidth="2" />
                <line x1="120" y1="20" x2="120" y2="100" stroke="#ffffff" strokeWidth="2" />
            </svg>

            {/* Car */}
            <svg
                className="absolute bottom-10 animate-car-move"
                xmlns="http://www.w3.org/2000/svg"
                x="0px" y="0px"
                width="120" height="120"
                viewBox="0 0 172 172"
                style={{ fill: '#26e07f' }}
            >
                <g fill="none" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{ mixBlendMode: 'normal' }}>
                    <path d="M0,172v-172h172v172z" fill="none"></path>
                    <g fill="#1fb141">
                        <path d="M21.5,21.5v129h64.5v-32.25v-64.5v-32.25zM86,53.75c0,17.7805 14.4695,32.25 32.25,32.25c17.7805,0 32.25,-14.4695 32.25,-32.25c0,-17.7805 -14.4695,-32.25 -32.25,-32.25c-17.7805,0 -32.25,14.4695 -32.25,32.25zM118.25,86c-17.7805,0 -32.25,14.4695 -32.25,32.25c0,17.7805 14.4695,32.25 32.25,32.25c17.7805,0 32.25,-14.4695 32.25,-32.25c0,-17.7805 -14.4695,-32.25 -32.25,-32.25z"></path>
                    </g>
                </g>
            </svg>
        </div>
    );
}
