// src/components/modals/ModalPortal.tsx
import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ModalPortalProps {
    children: ReactNode;
}

export function ModalPortal({ children }: ModalPortalProps) {
    // Create modal root if it doesn't exist
    useEffect(() => {
        let modalRoot = document.getElementById('modal-root');
        if (!modalRoot) {
            modalRoot = document.createElement('div');
            modalRoot.id = 'modal-root';
            document.body.appendChild(modalRoot);
        }

        return () => {
            // Clean up on unmount if the modal root is empty
            modalRoot = document.getElementById('modal-root');
            if (modalRoot && !modalRoot.childNodes.length) {
                modalRoot.remove();
            }
        };
    }, []);

    // Get or create modal root element
    let modalRoot = document.getElementById('modal-root');
    if (!modalRoot) {
        modalRoot = document.createElement('div');
        modalRoot.id = 'modal-root';
        document.body.appendChild(modalRoot);
    }

    return createPortal(children, modalRoot);
}