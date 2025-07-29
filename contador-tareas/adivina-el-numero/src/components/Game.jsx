import React, { useState, useEffect } from 'react';
import InputNumber from './InputNumber';
import Message from './Message';
import RestartButton from './RestartButton';

const generateRandomNumber = () => Math.floor(Math.random() * 100) + 1;

const Game = () => {
    const [targetNumber, setTargetNumber] = useState(generateRandomNumber());
    const [guess, setGuess] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); 
    const [attempts, setAttempts] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        console.log(`Nuevo número secreto generado: ${targetNumber}`);
        setMessage(''); 
        setMessageType('');
    }, [targetNumber]); 

    const handleInputChange = (e) => {
        const value = e.target.value;
        if (value === '' || (/^\d+$/.test(value) && parseInt(value) >= 1 && parseInt(value) <= 100)) {
            setGuess(value);
        } else if (parseInt(value) < 1) {
            setGuess('1'); // 
        } else if (parseInt(value) > 100) {
            setGuess('100'); 
        }
    };

    const handleGuessSubmit = () => {
        const guessedNumber = parseInt(guess);

        if (isNaN(guessedNumber) || guessedNumber < 1 || guessedNumber > 100) {
            setMessage('Por favor, introduce un número entre 1 y 100.');
            setMessageType('error');
            return;
        }

        setAttempts(prevAttempts => prevAttempts + 1);

        if (guessedNumber === targetNumber) {
            setMessage(`¡Correcto! Adivinaste el número ${targetNumber} en ${attempts + 1} intentos.`);
            setMessageType('success');
            setGameOver(true);
        } else if (guessedNumber < targetNumber) {
            setMessage('El número secreto es MAYOR.');
            setMessageType('info');
        } else {
            setMessage('El número secreto es MENOR.');
            setMessageType('info');
        }
        setGuess('');
    };

    const handleRestartGame = () => {
        setTargetNumber(generateRandomNumber());
        setGuess('');
        setMessage('');
        setMessageType('');
        setAttempts(0);
        setGameOver(false);
        console.log('Juego reiniciado.');
    };

    return (
        <div className="game-container">
            <h2>Adivina el Número</h2>
            <p className="game-intro">Intenta adivinar un número entre 1 y 100.</p>

            {}
            <Message text={message} type={messageType} />

            {!gameOver && ( 
                <InputNumber
                    value={guess}
                    onChange={handleInputChange}
                    onSubmit={handleGuessSubmit}
                    disabled={gameOver}
                />
            )}

            <p className="attempts-counter">Intentos: {attempts}</p>

            <RestartButton onClick={handleRestartGame} show={gameOver || attempts > 0} />
        </div>
    );
};

export default Game;