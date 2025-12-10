import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Button, Input, Card } from '../components/Neo';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';

    try {
      const res = await fetch(`http://localhost:3000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (res.ok) {
        if (isLogin) {
          localStorage.setItem('token', data.token);
          window.location.href = '/'; // Simple redirect for now
        } else {
          setMessage('Registration successful! Please login.');
          setIsLogin(true);
        }
      } else {
        setMessage(data.message || 'An error occurred');
      }
    } catch (err) {
      console.error(err);
      setMessage('Network error');
    }
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto mt-10">
        <Card>
          <h2 className="text-4xl font-black mb-8 text-center uppercase">
            {isLogin ? 'Enter' : 'Join'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-bold mb-2 text-xl">USERNAME</label>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ex: ReaderOne"
              />
            </div>
            <div>
              <label className="block font-bold mb-2 text-xl">PASSWORD</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="******"
              />
            </div>
            {message && <p className="font-bold bg-red-200 border-2 border-black p-2">{message}</p>}
            <Button type="submit" className="w-full text-xl uppercase">
              {isLogin ? 'Login' : 'Register'}
            </Button>
          </form>
          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="font-bold underline decoration-4 underline-offset-4 hover:text-neo-secondary"
            >
              {isLogin ? "New here? Create account" : "Have an account? Login"}
            </button>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Login;
