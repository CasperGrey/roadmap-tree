// Updated decorations.tsx
import React from 'react';

export function Decorations() {
    return (
        <div className="absolute inset-0 -z-10">
            {/* Clouds */}
            <svg
                className="absolute top-4 left-10 opacity-50 animate-cloud-drift"
                width="100"
                height="60"
                viewBox="0 0 100 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle cx="30" cy="30" r="30" fill="#ffffff" />
                <circle cx="70" cy="40" r="20" fill="#ffffff" />
            </svg>

            {/* Trees */}
            <svg
                className="absolute bottom-10 left-5"
                width="60"
                height="100"
                viewBox="0 0 60 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <rect x="25" y="40" width="10" height="60" fill="#204B87" />
                <circle cx="30" cy="20" r="20" fill="#1C3559" />
            </svg>

            {/* Circuit Lines */}
            <svg
                className="absolute right-10 top-20"
                width="200"
                height="100"
                viewBox="0 0 200 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <line x1="10" y1="10" x2="190" y2="10" stroke="#ffffff" strokeWidth="2" />
                <line x1="100" y1="10" x2="100" y2="90" stroke="#ffffff" strokeWidth="2" />
            </svg>

            {/* Car */}
            <svg
                className="absolute bottom-10 animate-car-move"
                xmlns="http://www.w3.org/2000/svg"
                x="0px" y="0px"
                width="100" height="100"
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