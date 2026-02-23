import { StyleSheet } from 'react-native';
import { useState, useRef, useEffect } from 'react';

export default function DigitalTimer() { 
const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const start = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }
  };

  const pause = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  const reset = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    setSeconds(0);
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  const formatTime = () => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  return (
    <div style={styles.container}>
      <div style={styles.clock}>{formatTime()}</div>

      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={start} disabled={isRunning}>
          START
        </button>
        <button style={styles.button} onClick={pause} disabled={!isRunning}>
          PAUSE/STOP
        </button>
        <button style={styles.button} onClick={reset}>
          RESET
        </button>
      </div>
    </div>
  );
}

const styles = StyleSheet.create({
container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    fontFamily: '"Calibri", sans-serif',
},
clock: {
    fontSize: 60,
    color: '#00FF41',
    backgroundColor: '#000',
    padding: '20px 40px',
    borderRadius: 10,
    letterSpacing: 5,
    boxShadow: '0 0 20px #00FF41',
},
buttonContainer: {
    marginTop: 30,
},
button: {
    backgroundColor: '#222',
    color: '#00FF41',
    border: '1px solid #00FF41',
    padding: '10px 20px',
    margin: '20px 10px',
    borderRadius: 5,
    cursor: 'pointer',
    fontSize: 16,
}
});
