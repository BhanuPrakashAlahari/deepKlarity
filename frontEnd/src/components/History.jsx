import React, { useState } from 'react';
import { MOCK_HISTORY, MOCK_QUIZ_RESPONSE } from '../mockData';
import QuizDisplay from './QuizDisplay';
import config from '../config';

const History = () => {
    const [selectedQuiz, setSelectedQuiz] = useState(null);


    // Use API data or mock data as fallback
    const [historyData, setHistoryData] = useState([]);

    // Fetch history from API on mount
    React.useEffect(() => {
        fetch(`${config.API_URL}/history`)
            .then(res => res.json())
            .then(data => setHistoryData(data))
            .catch(err => {
                console.error("Failed to fetch history:", err);
                setHistoryData(MOCK_HISTORY); // Fallback to mock data if API fails
            });
    }, []);


    return (
        <div className="animate-fade-in" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="card" style={{ overflow: 'hidden' }}>
                <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>History</h2>
                    <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>{historyData.length} Quizzes Generated</span>
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
                            {historyData.map((item) => (
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
                                            onClick={() => setSelectedQuiz(item)}
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

            {/* Modal for Details */}
            {selectedQuiz && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
                }} onClick={() => setSelectedQuiz(null)}>
                    <div style={{
                        backgroundColor: 'white', padding: '2rem', borderRadius: '12px',
                        width: '90%', maxWidth: '900px', maxHeight: '90vh', overflowY: 'auto',
                        position: 'relative'
                    }} onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={() => setSelectedQuiz(null)}
                            style={{
                                position: 'absolute', top: '1rem', right: '1rem',
                                background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer'
                            }}
                        >
                            ×
                        </button>
                        <QuizDisplay data={selectedQuiz} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default History;
