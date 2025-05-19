# fft.js

A simple Radix-2 Fast Fourier Transform in vanilla javascript for client-side calculations.

# Setup
Load the fft.js tool via html tags in the head or body section

```bash
<script src="fft.js"></script>
```

# Usage

```javascript
const signal = [0.4, 0.382, 0.279, ...]

// Generate the FFT array 
const fourier = fft.trans(signal);          // list of complex numbers
const real_part = fft.re(fourier);          // extract the real part of the FFT
const spectrum = fft.spectrum(fourier);     // extract the spectrum

// Inverse transform to reconstruct the signal
const reconstruct = fft.inverse(fourier);   // real signal array 
```