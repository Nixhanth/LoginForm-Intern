import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [stats, setStats] = useState({ totalUsers: 0, activeUsers: 0 });

    useEffect(() => {
        axios.get('http://localhost:5000/auth/stats')
            .then((res) => setStats(res.data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className='dashboard'>
            <h1>Dashboard</h1>
            <p>Total Users: {stats.totalUsers}</p>
            <p>Active Users: {stats.activeUsers}</p>
        </div>
    );
};

export default Dashboard;
