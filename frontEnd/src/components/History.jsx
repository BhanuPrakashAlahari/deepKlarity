import React, { useState } from 'react';
import { MOCK_HISTORY, MOCK_QUIZ_RESPONSE } from '../mockData';
import QuizDisplay from './QuizDisplay';

const History = () => {
    const [selectedQuiz, setSelectedQuiz] = useState(null);

    return (
        <div className="animate-fade-in" style={{ maxWidth: '1000px', margin: '0 auto' }}>

            {!selectedQuiz ? (
                <div className="card" style={{ overflow: 'hidden' }}>
                    <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>History</h2>
                        <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>{MOCK_HISTORY.length} Quizzes Generated</span>
                    </div>

                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead style={{ background: '#f8fafc', color: 'var(--color-text-muted)', fontSize: '0.85rem', textTransform: 'uppercase' }}>
                                <tr>
                                    <th style={{ padding: '1rem' }}>Article Topic</th>
                                    <th style={{ padding: '1rem' }}>URL</th>
                                    <th style={{ padding: '1rem' }}>Date Generated</th>
                                    <th style={{ padding: '1rem' }}>Questions</th>
                                    <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {MOCK_HISTORY.map((item) => (
                                    <tr key={item.id} style={{ borderBottom: '1px solid var(--color-border)', transition: 'background 0.2s' }} className="hover:bg-gray-50">
                                        <td style={{ padding: '1rem', fontWeight: 500 }}>{item.title}</td>
                                        <td style={{ padding: '1rem', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            <a href={item.url} target="_blank" rel="noreferrer" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>
                                                {item.url}
                                            </a>
                                        </td>
                                        <td style={{ padding: '1rem', color: 'var(--color-text-muted)' }}>{item.date}</td>
                                        <td style={{ padding: '1rem', color: 'var(--color-text-muted)' }}>{item.questions_count}</td>
                                        <td style={{ padding: '1rem', textAlign: 'right' }}>
                                            <button
                                                className="btn btn-outline"
                                                style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                                                onClick={() => setSelectedQuiz(MOCK_QUIZ_RESPONSE)} // In real app, fetch specific ID
                                            >
                                                Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div>
                    <button
                        onClick={() => setSelectedQuiz(null)}
                        className="btn"
                        style={{ marginBottom: '1.5rem', color: 'var(--color-text-muted)', paddingLeft: 0 }}
                    >
                        ← Back to History
                    </button>
                    <QuizDisplay data={selectedQuiz} />
                </div>
            )}
        </div>
    );
};

export default History;
