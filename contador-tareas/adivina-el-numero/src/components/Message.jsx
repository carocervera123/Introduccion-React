import React from 'react';

const Message = ({ text, type }) => {
    
    const messageClass = type === 'success' ? 'message-success' :
        type === 'error' ? 'message-error' :
            'message-info';

    if (!text) return null;

    return (
        <p className={`message ${messageClass}`}>
            {text}
        </p>
    );
};

export default Message;