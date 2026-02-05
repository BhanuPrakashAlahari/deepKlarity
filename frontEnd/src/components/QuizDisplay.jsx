import React from 'react';
import QuizCard from './QuizCard';

const QuizDisplay = ({ data, isInteractive = false }) => {

    // State to toggle between "Study Mode" (answers shown) and "Test Mode" (interactive)
    const [mode, setMode] = React.useState('study'); // 'study' | 'test'
    const [submitted, setSubmitted] = React.useState(false);
    const [score, setScore] = React.useState({ correct: 0, total: 0 });
    const [userAnswers, setUserAnswers] = React.useState({}); // Store user answers in test mode

    // Reset state when mode or data changes
    React.useEffect(() => {
        setSubmitted(false);
        setScore({ correct: 0, total: 0 });
        setUserAnswers({});
    }, [mode, data]);

    const handleAnswerSelect = (questionIdx, isCorrect) => {
        // Just store the answer result for calculation later (or live score if you prefer)
        // Let's store boolean correctness for simplicity
        setUserAnswers(prev => ({ ...prev, [questionIdx]: isCorrect }));
    };

    const handleSubmit = () => {
        let correctCount = 0;
        let totalCount = 0;

        // Calculate score based on stored answers
        // Note: this assumes user answered everything. 
        // We can just iterate over userAnswers keys.
        // Or better: iterate over all questions.

        if (data.quiz) {
            totalCount = data.quiz.length;
            Object.values(userAnswers).forEach(isCorrect => {
                if (isCorrect) correctCount++;
            });
        }

        setScore({ correct: correctCount, total: totalCount });
        setSubmitted(true);
    };

    if (!data) return null;

    return (
        <div className="animate-fade-in">
            <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div></div>

                {/* Mode Toggle & Score */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    {mode === 'test' && submitted && (
                        <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>
                            Final Score: {score.correct} / {score.total}
                        </span>
                    )}
                    <div style={{ display: 'flex', background: '#e2e8f0', borderRadius: '8px', padding: '4px' }}>
                        <button
                            onClick={() => setMode('study')}
                            style={{
                                padding: '0.5rem 1rem', borderRadius: '6px', border: 'none', cursor: 'pointer',
                                background: mode === 'study' ? 'white' : 'transparent',
                                boxShadow: mode === 'study' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                                fontWeight: mode === 'study' ? 600 : 400
                            }}
                        >
                            Study Mode
                        </button>
                        <button
                            onClick={() => setMode('test')}
                            style={{
                                padding: '0.5rem 1rem', borderRadius: '6px', border: 'none', cursor: 'pointer',
                                background: mode === 'test' ? 'white' : 'transparent',
                                boxShadow: mode === 'test' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                                fontWeight: mode === 'test' ? 600 : 400
                            }}
                        >
                            Take Quiz
                        </button>
                    </div>
                </div>
            </div>

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
                        isInteractive={true}
                        mode={mode}
                        submitted={submitted} // Pass submitted state
                        onAnswer={(isCorrect) => handleAnswerSelect(idx, isCorrect)}
                    />
                ))}
            </div>

            {/* Submit Button for Test Mode */}
            {mode === 'test' && !submitted && (
                <div style={{ textAlign: 'center', marginTop: '2rem', marginBottom: '2rem' }}>
                    <button
                        className="btn btn-primary"
                        onClick={handleSubmit}
                        style={{ padding: '0.75rem 2rem', fontSize: '1.1rem' }}
                    >
                        Submit Quiz
                    </button>
                </div>
            )}

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
