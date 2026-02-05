import React, { useState } from 'react';

const QuizCard = ({ question, index, isInteractive = false }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [showAnswer, setShowAnswer] = useState(!isInteractive);

    const handleSelect = (option) => {
        if (!isInteractive) return;
        setSelectedOption(option);
        setShowAnswer(true);
    };

    const getOptionClass = (option) => {
        if (!showAnswer) {
            return selectedOption === option
                ? "bg-indigo-50 border-indigo-500"
                : "hover:bg-gray-50 border-transparent";
        }

        if (option === question.answer) {
            return "bg-green-50 border-green-500 text-green-700";
        }

        if (selectedOption === option && option !== question.answer) {
            return "bg-red-50 border-red-500 text-red-700";
        }

        return "opacity-50 border-transparent";
    };

    const difficultyColors = {
        easy: "badge-easy",
        medium: "badge-medium",
        hard: "badge-hard"
    };

    return (
        <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem', borderLeft: '4px solid var(--color-primary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--color-text-main)' }}>
                    <span style={{ color: 'var(--color-primary)', marginRight: '0.5rem' }}>Q{index + 1}.</span>
                    {question.question}
                </h3>
                <span className={`badge ${difficultyColors[question.difficulty] || 'badge-medium'}`}>
                    {question.difficulty}
                </span>
            </div>

            <div style={{ display: 'grid', gap: '0.75rem' }}>
                {question.options.map((option, idx) => (
                    <div
                        key={idx}
                        onClick={() => handleSelect(option)}
                        style={{
                            padding: '1rem',
                            borderRadius: '0.5rem',
                            border: '1px solid',
                            borderColor: showAnswer
                                ? (option === question.answer ? 'var(--color-success)' : (selectedOption === option ? 'var(--color-error)' : 'var(--color-border)'))
                                : (selectedOption === option ? 'var(--color-primary)' : 'var(--color-border)'),
                            backgroundColor: showAnswer
                                ? (option === question.answer ? '#f0fdf4' : (selectedOption === option && selectedOption !== question.answer ? '#fef2f2' : 'white'))
                                : (selectedOption === option ? '#eef2ff' : 'white'),
                            cursor: isInteractive && !showAnswer ? 'pointer' : 'default',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{
                                width: '24px', height: '24px', borderRadius: '50%',
                                border: '1px solid currentColor',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '0.8rem', fontWeight: 600,
                                color: 'inherit', opacity: 0.7
                            }}>
                                {String.fromCharCode(65 + idx)}
                            </div>
                            <span style={{ fontSize: '0.95rem' }}>{option}</span>
                        </div>
                    </div>
                ))}
            </div>

            {showAnswer && (
                <div className="animate-fade-in" style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--color-border)' }}>
                    <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', display: 'flex', gap: '0.5rem' }}>
                        <strong>Explanation:</strong>
                        <span>{question.explanation}</span>
                    </p>
                </div>
            )}
        </div>
    );
};

export default QuizCard;
