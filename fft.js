// General
function round (x, decimals) {
    const f = 10**decimals;
    return Math.round(f*x)/f;
}
// Complex Toolkit
class complex {

    /* -------- Instance Methods -------- */
    constructor(re=0, im=0) {
        this.re = re
        this.im = im
    }
    // Returns the absolute value.
    abs () {
        return Math.sqrt(this.re**2 + this.im**2)
    }
    // Add another complex number and return the new resulting complex number.
    add (c) {
        return new complex(this.re + c.re, this.im + c.im)
    }
    // Subtract another complex number and return the new resulting complex number.
    sub (c) {
        return new complex(this.re - c.re, this.im - c.im)
    }
    // Multiply another number and return the new resulting complex number.
    mul (number) {
        if (Object.getPrototypeOf(number).constructor == complex)
            return new complex(this.re*number.re-this.im*number.im, this.re*number.im+this.im*number.re)
        else
            return new complex(this.re*number, this.im*number)
    }
    // Complex conjugates and returns this instance.
    cc () {
        this.im *= -1
        return this
    }
    // Inverse
    inv () {
        let r = this.re ** 2 + this.im ** 2
        return new complex(this.re/r, -this.im/r)
    }
    // Show number in console
    show () {
        if (this.im) console.log(`${this.re} + ${this.im} i`)
        else console.log(this.re);
    }
    // Set the number to 0.
    zero () {
        this.im = 0;
        this.re = 0;
        return this;
    }

    /* -------- Static Methods -------- */
    // Exponential function which accepts complex numbers. If the input is real or 
    // the imaginary part is 0 the return will be a float indicating a real number.
    static exp (c) {
        let real_factor = Math.exp(c.re);
        return new complex(real_factor*Math.cos(c.im), real_factor*Math.sin(c.im));
    }
}
// constants
const i = new complex(0, 1);
const pi = 3.14159265358979323846264338327950288419716939937510;

class fft {
    // Classic radix-2 DIT by Cooley & Tukey.
    // Discrete Fourier transform of f(x) to F(k), where k is 
    // the periodicity or frequency scale.
    // Returns a complex array.
    static trans (array, radix=2) {
        if (radix == 2) {
            const N = array.length;
            const N_half = Math.floor(N / 2);
            const omega = 2*pi / N;
            let F = []; // the fourier transform - array[complex]
            var O   = new complex(),
                E   = new complex(),
                x_e, x_o, phase, odd_phase;
            for (let k = 0; k < N_half; k++) {
                O.zero();
                E.zero();
                for (let m = 0; m < N_half; m++) {
                    x_e = new complex(array[2*m], 0);
                    x_o = new complex(array[2*m+1], 0);
                    // accumulate even and odd parts per k dimension
                    phase = complex.exp(new complex(0, -2*omega*m*k));
                    E = E.add(x_e.mul(phase));
                    O = O.add(x_o.mul(phase));
                }
                // insert the results at index k and k+N/2.
                odd_phase = complex.exp(new complex(0, -omega*k));
                F.splice(k, 0, E.add( odd_phase.mul(O) ));
                F.splice(k + N_half, 0, E.sub( odd_phase.mul(O) ));
            }
            return F;
        }
    }
    //
    static inverse (complex_array) {
        const N = complex_array.length;
        const N_half = Math.floor(N / 2);
        const omega = 2*pi / N;
        let f = []; // the fourier transform - array[complex]
        var O   = new complex(),
            E   = new complex(),
            x_e, x_o, phase, odd_phase;
        
        for (let k = 0; k < N_half; k++) {
            O.zero();
            E.zero();
            for (let m = 0; m < N_half; m++) {
                x_e = complex_array[2*m];
                x_o = complex_array[2*m+1];
                // x_e = new complex(0, array[2*m]);
                // x_o = new complex(0, array[2*m+1]);
                // accumulate even and odd parts per k dimension
                phase = complex.exp(new complex(0, 2*omega*m*k));
                E = E.add(x_e.mul(phase));
                O = O.add(x_o.mul(phase));
            }
            // insert the results at index k and k+N/2.
            odd_phase = complex.exp(new complex(0, omega*k));
            f.splice(k, 0, E.add( odd_phase.mul(O) ).mul(1/N));
            f.splice(k + N_half, 0, E.sub( odd_phase.mul(O) ).mul(1/N));
        }
        return f;
    }
    // Returns the frequency array i.e. x-axis of the fourier space.
    // Data generated with sin(f*t) will show at the value f on the x-axis.
    static freq (array, sampling_rate=1.0, decimals=2, factor=1, rad=true) {
        var x = [];
        const L = array.length;
        for (let k = 0; k < L; k++) {
            if (rad)
                x.push(round(2*pi*sampling_rate*factor*k/L, decimals))
            else
                x.push(round(sampling_rate*factor*k/L, decimals))
        }
            
        return x
    }
    // Convert complex array to a spectrum.
    static spectrum (complex_array) {
        let out = [];
        for (let i = 0; i < complex_array.length; i++)
            out.push(complex_array[i].abs());
        return out
    }
    // Extract imaginary part from a complex array.
    static im (complex_array) {
        let out = [];
        for (let i = 0; i < complex_array.length; i++)
            out.push(complex_array[i].im);
        return out
    }
    // Extract real part from a complex array.
    static re (complex_array) {
        let out = [];
        for (let i = 0; i < complex_array.length; i++)
            out.push(complex_array[i].re);
        return out
    }

}


