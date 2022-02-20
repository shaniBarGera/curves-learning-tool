class Curve {
    /**
     * Creates a curve object for a specific point
     * @param controlPoints - the set of control point
     * @param num_steps - number of total steps 
     * @param step - current step ("t") to calculate
     * @constructor
    */
    constructor(controlPoints, num_steps, step, ts) {
        this.n = controlPoints.length; 
        this.cp = controlPoints.slice();
        this.ts = ts.slice();
        this.num_steps = num_steps;
        this.step = step;

        this.draw = [false];
        this.curve = null;

        this.xs = [];
        this.ys = [];

        this.tsdiff = [];
        this.base = [];
        this.point = null;
    }

    build(){
        this.fillXY();
        this.calcDiff();
        this.calcBase();
        this.interpolateXY();
    }

    fillXY(){
        Matrix.fillXY(this.xs, this.ys, this.cp);
    }

    interpolateXY(){
        this.point = new Point(0,0);
    }

    calcBase(){
        this.base.fill(1, 0, this.n)
    }

    calcDiff(){
        this.tsdiff.fill(0, 0, this.n)
    }
}

class LagrangeCurve extends Curve {
    /**
     * Creates a Lagrange curve object for a specific point
     * @param controlPoints - the set of control point
     * @param num_steps - number of total steps 
     * @param step - current step ("t") to calculate
     * @param ts - array of "t_i"s
     * @constructor
    */
    constructor(controlPoints, step, num_steps, ts) {
        super(controlPoints, num_steps, step, ts);
    }

    calcBase(){
        var t = (step / (num_steps -1)) ;
        for(var i = 0; i < this.n; ++i){
            var numerator = 1, denominator = 1;
            for(var j = 0; j < this.n; ++j){
                if(j == i) continue;
                numerator *= (t - this.ts[j]);
                denominator *= (this.ts[i] - this.ts[j]);
            }
            this.base[i] = numerator / denominator;
        }
    }
    
    interpolateXY(){
        var x = 0, y = 0;
        for(var i = 0; i < this.n; ++i){
            x += this.xs[i] * this.base[i];
            y += this.ys[i] * this.base[i];
        }
        return new Point(x, y); 
    }
}
  
class MonomialCurve extends Curve {
    /**
     * Creates a monomial basis curve object for a specific point
     * @param controlPoints - the set of control point
     * @param num_steps - number of total steps 
     * @param step - current step ("t") to calculate
     * @param k - order of curve
     * @param ts - array of "t_i"s
     * @constructor
    */
    constructor(controlPoints, num_steps, step, ts, k) {
      super(controlPoints, num_steps, step, ts);
      this.k = k;
    }
}

class CSPL extends Curve{
    /**
     * Creates a C-Spline curve object for a specific point
     * @param controlPoints - the set of control point
     * @param num_steps - number of total steps 
     * @param step - current step ("t") to calculate
     * @param k - order of curve
     * @param ts - array of "t_i"s
     * @constructor
    */
    constructor(controlPoints, num_steps, step, ts) {
        super(controlPoints, num_steps, step, ts);
        this.draw = [true];
    }
}


class CHSPL extends CSPL{
    /**
     * Creates a Cubic Hermite Basis curve object for a specific point
     * @param controlPoints - the set of control point
     * @param num_steps - number of total steps 
     * @param step - current step ("t") to calculate
     * @param k - order of curve
     * @param ts - array of "t_i"s
     * @param kControlPoints - array k's that match to contorl points
     * @constructor
    */
    constructor(controlPoints, num_steps, step, ts,  kControlPoints) {
        super(controlPoints, num_steps, step, ts);
        this.draw = [true];
        this.k_cp = kControlPoints.slice();
    }
}

class BSPL extends Curve {
    /**
     * Creates a B-Spline curve object for a specific point
     * @param controlPoints - the set of control point
     * @param num_steps - number of total steps 
     * @param step - current step ("t") to calculate
     * @param k - order of curve
     * @param ts - array of "t_i"s
     * @constructor
    */
    constructor(controlPoints, num_steps, step, ts, k) {
      super(controlPoints, num_steps, step, ts);
      this.k = k;
    }
}
  