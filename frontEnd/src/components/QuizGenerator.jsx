import React, { useState } from 'react';
import QuizDisplay from './QuizDisplay';
import { MOCK_QUIZ_RESPONSE } from '../mockData';

import config from '../config';

const QuizGenerator = () => {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [quizData, setQuizData] = useState(null);
    const [error, setError] = useState('');

    const handleGenerate = async () => {
        if (!url) {
            setError('Please enter a valid Wikipedia URL');
            return;
        }
        if (!url.includes('wikipedia.org')) {
            setError('URL must be from wikipedia.org');
            return;
        }

        setError('');
        setLoading(true);
        setQuizData(null);

        try {
            const response = await fetch(`${config.API_URL}/generate-quiz`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.detail || 'Failed to generate quiz');
            }

            const data = await response.json();
            setQuizData(data);
        } catch (err) {
            setError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };


    // Skeleton Loader Component
    const SkeletonLoader = () => (
        <div className="card" style={{ padding: '2rem', marginTop: '2rem' }}>
            <div className="skeleton-pulse" style={{ height: '32px', width: '60%', margin: '0 auto 1rem auto', background: '#e2e8f0', borderRadius: '4px' }}></div>
            <div className="skeleton-pulse" style={{ height: '16px', width: '80%', margin: '0 auto 2rem auto', background: '#e2e8f0', borderRadius: '4px' }}></div>

            <div style={{ display: 'grid', gap: '1rem' }}>
                {[1, 2, 3].map(i => (
                    <div key={i} style={{ height: '120px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}></div>
                ))}
            </div>
            <style>{`
                @keyframes pulse { 0% { opacity: 0.6; } 50% { opacity: 1; } 100% { opacity: 0.6; } }
                .skeleton-pulse { animation: pulse 1.5s infinite ease-in-out; }
            `}</style>
        </div>
    );

    return (
        <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>

            {/* Input Section */}
            <div className="card" style={{ padding: '2rem', marginBottom: '3rem', textAlign: 'center' }}>
                <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: 700 }}>
                    Generate a Quiz from any Article
                </h2>

                <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column', maxWidth: '500px', margin: '0 auto' }}>
                    <div style={{ position: 'relative' }}>
                        <input
                            type="text"
                            className="input-field"
                            placeholder="Paste Wikipedia URL here (e.g., https://en.wikipedia.org/wiki/React)"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            disabled={loading}
                            style={{ paddingLeft: '2.5rem' }}
                        />
                        {/* Search Icon */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', width: '20px', height: '20px', color: '#94a3b8' }}
                        >
                            <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
                        </svg>
                    </div>

                    {error && <p style={{ color: 'var(--color-error)', fontSize: '0.9rem', textAlign: 'left' }}>{error}</p>}

                    <button
                        className="btn btn-primary"
                        onClick={handleGenerate}
                        disabled={loading}
                        style={{ width: '100%', justifyContent: 'center' }}
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin" viewBox="0 0 24 24" fill="none" style={{ width: '20px', height: '20px', animation: 'spin 1s linear infinite' }}>
                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeOpacity="0.3"></circle>
                                    <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                                </svg>
                                Processing Content...
                            </>
                        ) : (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" style={{ width: '20px', height: '20px' }}>
                                    <path d="M15.98 1.804a1 1 0 00-1.96 0l-.24 1.192a1 1 0 01-.784.785l-1.192.238a1 1 0 000 1.96l1.192.238a1 1 0 01.785.785l.238 1.192a1 1 0 001.96 0l.238-1.192a1 1 0 01.785-.785l1.192-.238a1 1 0 000-1.96l-1.192-.238a1 1 0 01-.785-.785l-.238-1.192zM6.949 5.684a1 1 0 00-1.898 0l-.683 2.051a1 1 0 01-.633.633l-2.051.683a1 1 0 000 1.898l2.051.683a1 1 0 01.633.633l.683 2.051a1 1 0 001.898 0l.683-2.051a1 1 0 01.633-.633l2.051-.683a1 1 0 000-1.898l-2.051-.683a1 1 0 01-.633-.633L6.95 5.684z" />
                                </svg>
                                Generate Quiz
                            </>
                        )}
                    </button>
                </div>
            </div>

            <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>

            {loading && <SkeletonLoader />}

            {/* Results Section */}
            {quizData && !loading && (
                <QuizDisplay data={quizData} isInteractive={true} />
            )}

        </div>
    );
};

export default QuizGenerator;
