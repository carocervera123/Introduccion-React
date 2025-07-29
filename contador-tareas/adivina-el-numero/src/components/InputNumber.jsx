import React from 'react';

const InputNumber = ({ value, onChange, onSubmit, disabled }) => {
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            onSubmit();
        }
    };

    return (
        <div className="input-number-container">
            <input
                type="number"
                value={value}
                onChange={onChange}
                onKeyDown={handleKeyDown}
                placeholder="Introduce tu número"
                className="input-field"
                min="1"
                max="100"
                disabled={disabled} 
            />
            <button onClick={onSubmit} className="btn primary" disabled={disabled}>
                Adivinar
            </button>
        </div>
    );
};

export default InputNumber;