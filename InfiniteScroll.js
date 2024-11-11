import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchNewData = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newItems = [];
        for (let i = 0; i < 15; i++) {
          newItems.push(`Item ${Math.floor(Math.random() * 1000)}`);
        }
        resolve(newItems);
      }, 1000);
    });
  };

  const addItems = (newItems) => {
    setItems((prevItems) => [...prevItems, ...newItems]);
  };

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 800 && !isLoading) {
      setIsLoading(true);
      fetchNewData().then((newItems) => {
        addItems(newItems);
        setIsLoading(false);
      });
    }
  };

  useEffect(() => {
    fetchNewData().then((newItems) => addItems(newItems));
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="container">
      {items.map((item, index) => (
        <div key={index} className="item">
          {item}
        </div>
      ))}
      {isLoading && <div id="loading">Loading...</div>}
    </div>
  );
}

export default App;
