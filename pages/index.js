import { useState } from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export default function Home() {
  const [windSpeedParams, setWindSpeedParams] = useState({ v: '', h: '', k: '' });
  const [rainChanceParams, setRainChanceParams] = useState({ pressure: '' });
  const [result, setResult] = useState(null);

  const fetchWeatherForecast = async () => {
    const response = await fetch(`${baseUrl}/WeatherForecast`);
    const data = await response.json();
    setResult(data);
  };

  const fetchWindSpeed = async () => {
    const query = new URLSearchParams(windSpeedParams).toString();
    const response = await fetch(`${baseUrl}/WeatherForecast/GetWindSpeed?${query}`);
    const data = await response.json();
    setResult(data);
  };

  const fetchRainChance = async () => {
    const response = await fetch(`${baseUrl}/WeatherForecast/PredictRainChance`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: rainChanceParams }),
    });
    const data = await response.json();
    setResult(data);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Weather App</Typography>

      <Button variant="contained" color="primary" onClick={fetchWeatherForecast} sx={{ mb: 2 }}>
        Get Weather Forecast
      </Button>

      <Box sx={{ mb: 2 }}>
        <Typography variant="h6">Get Wind Speed</Typography>
        <TextField
          label="Reference Wind Speed (v)"
          value={windSpeedParams.v}
          onChange={(e) => setWindSpeedParams({ ...windSpeedParams, v: e.target.value })}
          fullWidth
          sx={{ mb: 1 }}
        />
        <TextField
          label="Reference Height (h)"
          value={windSpeedParams.h}
          onChange={(e) => setWindSpeedParams({ ...windSpeedParams, h: e.target.value })}
          fullWidth
          sx={{ mb: 1 }}
        />
        <TextField
          label="Wind Shear Exponent (k)"
          value={windSpeedParams.k}
          onChange={(e) => setWindSpeedParams({ ...windSpeedParams, k: e.target.value })}
          fullWidth
          sx={{ mb: 1 }}
        />
        <Button variant="contained" color="secondary" onClick={fetchWindSpeed}>
          Get Wind Speed
        </Button>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="h6">Get Rainfall Chance</Typography>
        <TextField
          label="Pressure"
          value={rainChanceParams.pressure}
          onChange={(e) => setRainChanceParams({ ...rainChanceParams, pressure: e.target.value })}
          fullWidth
          sx={{ mb: 1 }}
        />
        <Button variant="contained" color="secondary" onClick={fetchRainChance}>
          Get Rainfall Chance
        </Button>
      </Box>

      {result && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Result:</Typography>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </Box>
      )}
    </Box>
  );
}
