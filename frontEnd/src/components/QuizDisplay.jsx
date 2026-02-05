import React from 'react';
import QuizCard from './QuizCard';

const QuizDisplay = ({ data, isInteractive = false }) => {
    if (!data) return null;

    return (
        <div className="animate-fade-in">
            <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                    Quiz: {data.title}
                </h2>
                <p style={{ color: 'var(--color-text-muted)' }}>{data.summary}</p>
            </div>

            {/* New Sections Display */}
            {data.sections && (
                <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                    <strong>Sections covered:</strong> {data.sections.join(', ')}
                </div>
            )}

            <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
                {data.quiz && data.quiz.map((q, idx) => (
                    <QuizCard
                        key={q.id || idx}
                        question={q}
                        index={idx}
                        isInteractive={isInteractive}
                    />
                ))}
            </div>

            <div className="card" style={{ padding: '1.5rem', background: '#f8fafc' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem' }}>
                    Recommended Topics
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                    {data.related_topics.map((topic, idx) => (
                        <span
                            key={idx}
                            style={{
                                background: 'white',
                                padding: '0.5rem 1rem',
                                borderRadius: '2rem',
                                border: '1px solid var(--color-border)',
                                fontSize: '0.9rem',
                                color: 'var(--color-primary)',
                                fontWeight: 500,
                                cursor: 'pointer' // interactive hint
                            }}
                        >
                            {topic}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default QuizDisplay;
