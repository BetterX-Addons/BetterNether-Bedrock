import { Mat2 } from "./matrix2";
/**
 * Includes various 2D vector functions and values.
 */
export var Vec2;
(function (Vec2) {
    /**
     * The zero vector.
     *
     * Value: **[`0`, `0`]**
     */
    Vec2.Zero = { x: 0, y: 0 };
    /**
     * The one vector.
     *
     * Value: **[`1`, `1`]**
     */
    Vec2.One = { x: 1, y: 1 };
    /**
     * The unit vector in the up direction.
     *
     * Value: **[`0`, `1`]**
     */
    Vec2.Up = { x: 0, y: 1 };
    /**
     * The unit vector in the down direction.
     *
     * Value: **[`0`, `-1`]**
     */
    Vec2.Down = { x: 0, y: -1 };
    /**
     * The unit vector in the left direction.
     *
     * Value: **[`-1`, `0`]**
     */
    Vec2.Left = { x: -1, y: 0 };
    /**
     * The unit vector in the right direction.
     *
     * Value: **[`1`, `0`]**
     */
    Vec2.Right = { x: 1, y: 0 };
    /**
     * The standard x basis vector.
     *
     * Value: **[`1`, `0`]**
     */
    Vec2.X = Vec2.Right;
    /**
     * The standard y basis vector.
     *
     * Value: **[`0`, `1`]**
     */
    Vec2.Y = Vec2.Up;
    /**
     * Tests if a value is of {@link Vector2} type.
     * @param v The specified value.
     * @returns Returns **True** if the value contains the `Vector2` properties,
     * otherwise **False**.
     */
    function isVector2(v) {
        return typeof v === "object" && 'x' in v && 'y' in v;
    }
    Vec2.isVector2 = isVector2;
    function from(x, y) {
        if (Array.isArray(x) && x.length >= 2)
            return {
                x: x[0],
                y: x[1]
            };
        else if (typeof x === "number")
            return {
                x: x,
                y: y ?? x
            };
        throw new Error("Invalid input values for vector construction.");
    }
    Vec2.from = from;
    /**
     * Constructs a {@link Vector2} from a {@link VectorXZ} value.
     * @param v The specified vectorXZ value.
     * @returns A {@link Vector2} with the Y component set to `v`'s z component.
     */
    function fromVectorXZ(v) {
        return {
            x: v.x,
            y: v.z
        };
    }
    Vec2.fromVectorXZ = fromVectorXZ;
    /**
     * Converts a {@link Vector2} into a {@link VectorXZ}.
     * @param v The specified vector.
     * @returns A {@link VectorXZ} with the Z component set to `v`'s y component.
     */
    function toVectorXZ(v) {
        return {
            x: v.x,
            z: v.y
        };
    }
    Vec2.toVectorXZ = toVectorXZ;
    /**
     * Converts a vector into an array of two numbers.
     * @param v The specified vector.
     * @returns An array containing the two components of `v`.
     */
    function toArray(v) {
        const { x, y } = v;
        return [x, y];
    }
    Vec2.toArray = toArray;
    /**
     * Stringifies a vector to the form "x y".
     * @param v The specified vector.
     */
    function toString(v) {
        return toArray(v).join(' ');
    }
    Vec2.toString = toString;
    /**
     * Parses a vector from its stringified form.
     * @param s The vector in stringified form.
     * @returns A {@link Vector2} parsed from the string.
     */
    function parse(s) {
        const [x, y] = s.split(' ').map(Number);
        return { x, y };
    }
    Vec2.parse = parse;
    /**
     * Determines if the specified vector is `NaN`.
     * @param v The specified vector.
     * @returns Returns **True** if the `v` parameter is `NaN`. Otherwise, **False**.
     */
    function isNaN(v) {
        return Number.isNaN(v.x) || Number.isNaN(v.y);
    }
    Vec2.isNaN = isNaN;
    /**
     * Determines if the specified vector is infinite.
     * @param v The specified vector.
     * @returns Returns **True** if the `v` parameter is `+Infinity` or `-Infinity`. Otherwise, **False**.
     */
    function isInf(v) {
        return !isFinite(v);
    }
    Vec2.isInf = isInf;
    /**
     * Determines if the specified vector is finite.
     * @param v The specified vector.
     * @returns Returns **True** if the `v` parameter is finite; otherwise **False**.
     */
    function isFinite(v) {
        return Number.isFinite(v.x) && Number.isFinite(v.y);
    }
    Vec2.isFinite = isFinite;
    /**
     * Determines if any of the components of `v` are non-zero.
     * @param v The specified vector.
     * @returns Returns `true` if at least one of the components of `v` is non-zero, otherwise `false`.
     */
    function any(v) {
        return v.x !== 0 || v.y !== 0;
    }
    Vec2.any = any;
    /**
     * Determines if all of the components of `v` are non-zero.
     * @param v The specified vector.
     * @returns Returns `true` if all the components of `v` are non-zero, otherwise `false`.
     */
    function all(v) {
        return v.x !== 0 && v.y !== 0;
    }
    Vec2.all = all;
    /**
     * Determines if any of the components of `u` are greater than the corresponding
     * components in `v`.
     * @param u The first vector.
     * @param v The second vector.
     * @returns A vector containing the component-wise results of the greater than comparison.
     *
     * `1` is returned if the expression resulted true, and `0` if it resulted false.
     */
    function greaterThan(u, v) {
        return {
            x: u.x > v.x ? 1 : 0,
            y: u.y > v.y ? 1 : 0
        };
    }
    Vec2.greaterThan = greaterThan;
    /**
     * Determines if any of the components of `u` are less than the corresponding
     * components in `v`.
     * @param u The first vector.
     * @param v The second vector.
     * @returns A vector containing the component-wise results of the less than comparison.
     *
     * `1` is returned if the expression resulted true, and `0` if it resulted false.
     */
    function lessThan(u, v) {
        return {
            x: u.x < v.x ? 1 : 0,
            y: u.y < v.y ? 1 : 0
        };
    }
    Vec2.lessThan = lessThan;
    /**
     * Determines if any of the components of `u` are greater than or equal to the corresponding
     * components in `v`.
     * @param u The first vector.
     * @param v The second vector.
     * @returns A vector containing the component-wise results of the greater than or equal to comparison.
     *
     * `1` is returned if the expression resulted true, and `0` if it resulted false.
     */
    function greaterEqual(u, v) {
        return {
            x: u.x >= v.x ? 1 : 0,
            y: u.y >= v.y ? 1 : 0
        };
    }
    Vec2.greaterEqual = greaterEqual;
    /**
     * Determines if any of the components of `u` are less than or equal to the corresponding
     * components in `v`.
     * @param u The first vector.
     * @param v The second vector.
     * @returns A vector containing the component-wise results of the less than or equal to comparison.
     *
     * `1` is returned if the expression resulted true, and `0` if it resulted false.
     */
    function lessEqual(u, v) {
        return {
            x: u.x <= v.x ? 1 : 0,
            y: u.y <= v.y ? 1 : 0
        };
    }
    Vec2.lessEqual = lessEqual;
    /**
     * Determines if two vectors are equal.
     * @param u The first specified vector.
     * @param v The second specified vector.
     * @returns `true` if every component of `u` is equal to those in `v`, otherwise `false`.
     */
    function equal(u, v) {
        return u.x === v.x && u.y === v.y;
    }
    Vec2.equal = equal;
    /**
     * Selects the lesser of `u` and `v`.
     * @param u The `u` input value.
     * @param v The `v` input value.
     * @return The `u` or `v` parameter, whichever is the smallest value.
     */
    function min(u, v) {
        return {
            x: Math.min(u.x, v.x),
            y: Math.min(u.y, v.y)
        };
    }
    Vec2.min = min;
    /**
     * Selects the greater of `u` and `v`.
     * @param u The `u` input value.
     * @param v The `v` input value.
     * @return The `u` or `v` parameter, whichever is the largest value.
     */
    function max(u, v) {
        return {
            x: Math.max(u.x, v.x),
            y: Math.max(u.y, v.y)
        };
    }
    Vec2.max = max;
    /**
     * Clamps the specified vector to the specified minimum and maximum values.
     * @param v A value to clamp.
     * @param min The specified minimum value.
     * @param max The specified maximum value.
     * @returns The clamped value for the `v` parameter.
     */
    function clamp(v, min, max) {
        return {
            x: Math.min(Math.max(v.x, min.x), max.x),
            y: Math.min(Math.max(v.y, min.y), max.y)
        };
    }
    Vec2.clamp = clamp;
    /**
     * Clamps the specified vector within the range 0 to 1.
     * @param v The specified vector.
     */
    function saturate(v) {
        return {
            x: Math.min(Math.max(v.x, 0), 1),
            y: Math.min(Math.max(v.y, 0), 1)
        };
    }
    Vec2.saturate = saturate;
    /**
     * Returns the sign of `v`.
     * @param v The input value.
     * @returns `-1` if `v` is less than zero; `0` if `v` equals zero; and `1` if `v` is greater than zero.
     */
    function sign(v) {
        return {
            x: Math.sign(v.x),
            y: Math.sign(v.y)
        };
    }
    Vec2.sign = sign;
    /**
     * Returns the largest integer that is less than or equal to the specified vector.
     * @param v The specified vector.
     * @returns The largest integer value that is less than or equal to the `v` parameter.
     */
    function floor(v) {
        return {
            x: Math.floor(v.x),
            y: Math.floor(v.y)
        };
    }
    Vec2.floor = floor;
    /**
     * Returns the smallest integer value that is greater than or equal to the specified vector.
     * @param v The specified vector.
     * @returns The smallest integer value that is greater than or equal to the `v` parameter.
     */
    function ceil(v) {
        return {
            x: Math.ceil(v.x),
            y: Math.ceil(v.y)
        };
    }
    Vec2.ceil = ceil;
    /**
     * Returns the fractional (or decimal) part of `v`; which is greater than or equal to 0 and less than 1.
     * @param v The specified vector.
     * @returns The fractional part of the `v` parameter.
     */
    function frac(v) {
        return {
            x: v.x - Math.floor(v.x),
            y: v.y - Math.floor(v.y)
        };
    }
    Vec2.frac = frac;
    /**
     * Rounds the specified vector to the nearest integer. Halfway cases are rounded to the nearest even.
     * @param v The specified vector.
     * @returns The `v` parameter, rounded to the nearest integer.
     */
    function round(v) {
        return {
            x: Math.round(v.x),
            y: Math.round(v.y)
        };
    }
    Vec2.round = round;
    /**
     * Returns the remainder of `u`/`v`.
     * @param u The dividend.
     * @param v The divisor.
     * @returns The remainder of the `u` parameter divided by the `v` parameter.
     * @remarks The remainder is calculated such that *x* = *i* * *y* + *f*, where *i* is an integer,
     * *f* has the same sign as *x*, and the absolute value of *f* is less than the absolute value of *y*.
     */
    function mod(u, v) {
        return {
            x: u.x % v.x,
            y: u.y % v.y
        };
    }
    Vec2.mod = mod;
    /**
     * Negates a specified vector `v`.
     * @param v The specified vector.
     * @returns The negation of the `v` parameter.
     */
    function neg(v) {
        return {
            x: -v.x,
            y: -v.y
        };
    }
    Vec2.neg = neg;
    /**
     * Returns the absolute value of the specified vector.
     * @param v The specified vector.
     * @returns The absolute value of the `v` parameter.
     */
    function abs(v) {
        return {
            x: Math.abs(v.x),
            y: Math.abs(v.y)
        };
    }
    Vec2.abs = abs;
    /**
     * Adds a set of vectors together.
     * @param v The initial vector.
     * @param args The vectors to add to `v`.
     * @returns The result of the addition of all argument vectors.
     */
    function add(v, ...args) {
        for (const arg of args)
            v = {
                x: v.x + arg.x,
                y: v.y + arg.y
            };
        return v;
    }
    Vec2.add = add;
    /**
     * Subtracts a set of vectors from one another.
     * @param v The initial vector.
     * @param args The vectors to subtract from `v`.
     * @returns The result of the subtraction of all argument vectors.
     */
    function sub(v, ...args) {
        for (const arg of args)
            v = {
                x: v.x - arg.x,
                y: v.y - arg.y
            };
        return v;
    }
    Vec2.sub = sub;
    function mul(v, m) {
        if (isVector2(m))
            return {
                x: v.x * m.x,
                y: v.y * m.y
            };
        else
            return {
                x: v.x * m,
                y: v.y * m
            };
    }
    Vec2.mul = mul;
    function div(v, m) {
        if (isVector2(m))
            return {
                x: v.x / m.x,
                y: v.y / m.y
            };
        else
            return {
                x: v.x / m,
                y: v.y / m
            };
    }
    Vec2.div = div;
    /**
     * Returns the square root of the specified vector, per component.
     * @param v The specified vector.
     * @returns The square root of the `v` parameter, per component.
     */
    function sqrt(v) {
        return {
            x: Math.sqrt(v.x),
            y: Math.sqrt(v.y)
        };
    }
    Vec2.sqrt = sqrt;
    /**
     * Returns the base-e exponential of the specified vector.
     * @param v The specified vector.
     * @returns The base-e exponential of the `v` parameter.
     */
    function exp(v) {
        return {
            x: Math.exp(v.x),
            y: Math.exp(v.y)
        };
    }
    Vec2.exp = exp;
    /**
     * Returns the base 2 exponential of the specified vector.
     * @param v The specified vector.
     * @returns The base 2 exponential of the `v` parameter.
     */
    function exp2(v) {
        return {
            x: Math.pow(2, v.x),
            y: Math.pow(2, v.y)
        };
    }
    Vec2.exp2 = exp2;
    /**
     * Returns the base-e logarithm of the specified vector.
     * @param v The specified vector.
     * @returns The base-e logarithm of the `v` parameter.
     */
    function log(v) {
        return {
            x: Math.log(v.x),
            y: Math.log(v.y)
        };
    }
    Vec2.log = log;
    /**
     * Returns the base-2 logarithm of the specified vector.
     * @param v The specified vector.
     * @returns The base-2 logarithm of the `v` parameter.
     */
    function log2(v) {
        return {
            x: Math.log2(v.x),
            y: Math.log2(v.y)
        };
    }
    Vec2.log2 = log2;
    /**
     * Returns the base-10 logarithm of the specified vector.
     * @param v The specified vector.
     * @returns The base-10 logarithm of the `v` parameter.
     */
    function log10(v) {
        return {
            x: Math.log10(v.x),
            y: Math.log10(v.y)
        };
    }
    Vec2.log10 = log10;
    function pow(v, p) {
        if (isVector2(p))
            return {
                x: Math.pow(v.x, p.x),
                y: Math.pow(v.y, p.y)
            };
        else
            return {
                x: Math.pow(v.x, p),
                y: Math.pow(v.y, p)
            };
    }
    Vec2.pow = pow;
    /**
     * Returns the sine of the specified vector.
     * @param v The specified vector, in radians.
     * @returns The sine of the `v` parameter.
     */
    function sin(v) {
        return {
            x: Math.sin(v.x),
            y: Math.sin(v.y)
        };
    }
    Vec2.sin = sin;
    /**
     * Returns the arcsine of the specified vector.
     * @param v The specified vector.
     * @returns The arcsine of the `v` parameter.
     */
    function asin(v) {
        return {
            x: Math.asin(v.x),
            y: Math.asin(v.y)
        };
    }
    Vec2.asin = asin;
    /**
     * Returns the hyperbolic sine of the specified vector.
     * @param v The specified vector, in radians.
     * @returns The hyperbolic sine of the `v` parameter.
     */
    function sinh(v) {
        return {
            x: Math.sinh(v.x),
            y: Math.sinh(v.y)
        };
    }
    Vec2.sinh = sinh;
    /**
     * Returns the hyperbolic arcsine of the specified vector.
     * @param v The specified vector.
     * @returns The hyperbolic arcsine of the `v` parameter.
     */
    function asinh(v) {
        return {
            x: Math.asinh(v.x),
            y: Math.asinh(v.y)
        };
    }
    Vec2.asinh = asinh;
    /**
     * Returns the cosine of the specified vector.
     * @param v The specified vector, in radians.
     * @returns The cosine of the `v` parameter.
     */
    function cos(v) {
        return {
            x: Math.cos(v.x),
            y: Math.cos(v.y)
        };
    }
    Vec2.cos = cos;
    /**
     * Returns the arccosine of the specified vector.
     * @param v The specified vector. Each component should be a value within the range of -1 to 1.
     * @returns The arccosine of the `v` parameter.
     */
    function acos(v) {
        return {
            x: Math.acos(v.x),
            y: Math.acos(v.y)
        };
    }
    Vec2.acos = acos;
    /**
     * Returns the hyperbolic cosine of the specified vector.
     * @param v The specified vector, in radians.
     * @returns The hyperbolic cosine of the `v` parameter.
     */
    function cosh(v) {
        return {
            x: Math.cosh(v.x),
            y: Math.cosh(v.y)
        };
    }
    Vec2.cosh = cosh;
    /**
     * Returns the hyperbolic arccosine of the specified vector.
     * @param v The specified vector. Each component should be a value within the range of -1 to 1.
     * @returns The hyperbolic arccosine of the `v` parameter.
     */
    function acosh(v) {
        return {
            x: Math.acosh(v.x),
            y: Math.acosh(v.y)
        };
    }
    Vec2.acosh = acosh;
    /**
     * Returns the tangent of the specified vector.
     * @param v The specified vector, in radians.
     * @returns The tangent of the `v` parameter.
     */
    function tan(v) {
        return {
            x: Math.tan(v.x),
            y: Math.tan(v.y)
        };
    }
    Vec2.tan = tan;
    /**
     * Returns the arctangent of the specified vector.
     * @param v The specified vector.
     * @returns The arctangent of the `v` parameter. This value is within the range of -π/2 to π/2.
     */
    function atan(v) {
        return {
            x: Math.atan(v.x),
            y: Math.atan(v.y)
        };
    }
    Vec2.atan = atan;
    /**
     * Returns the hyperbolic tangent of the specified vector.
     * @param v The specified vector, in radians.
     * @returns The hyperbolic tangent of the `v` parameter.
     */
    function tanh(v) {
        return {
            x: Math.tanh(v.x),
            y: Math.tanh(v.y)
        };
    }
    Vec2.tanh = tanh;
    /**
     * Returns the hyperbolic arctangent of the specified vector.
     * @param v The specified vector.
     * @returns The hyperbolic arctangent of the `v` parameter.
     */
    function atanh(v) {
        return {
            x: Math.atanh(v.x),
            y: Math.atanh(v.y)
        };
    }
    Vec2.atanh = atanh;
    /**
     * Returns the dot product of two vectors.
     * @param u The first vector.
     * @param v The second vector.
     * @returns The dot product of `u` and `v`.
     */
    function dot(u, v) {
        return u.x * v.x + u.y * v.y;
    }
    Vec2.dot = dot;
    /**
     * Returns the wedge product of two vectors.
     * @param u The first vector.
     * @param v The second vector.
     * @returns The wedge product of `u` and `v`.
     */
    function wedge(u, v) {
        return u.x * v.y - u.y * v.x;
    }
    Vec2.wedge = wedge;
    /**
     * Returns the length of the specified vector.
     * @param v The specified vector.
     * @returns A scalar that represents the length of `v`.
     */
    function length(v) {
        return Math.hypot(v.x, v.y);
    }
    Vec2.length = length;
    /**
     * Normalizes the specified vector according to `v` / length(`v`).
     * @param v The specified vector.
     * @returns The normalized vector `v`.
     */
    function normalize(v) {
        return div(v, length(v));
    }
    Vec2.normalize = normalize;
    /**
     * Returns a distance scalar between two vectors.
     * @param u The first vector to compare.
     * @param v The second vector to compare.
     * @returns A scalar value that represents the distance between `u` and `v`.
     */
    function distance(u, v) {
        return length(sub(u, v));
    }
    Vec2.distance = distance;
    /**
     * Projects a vector `u` onto a vector `v`.
     * @param u The first value.
     * @param v The second value.
     * @returns The vector projection of `u` onto `v`.
     */
    function project(u, v) {
        return mul(v, dot(u, v) / dot(v, v));
    }
    Vec2.project = project;
    /**
     * Gets the rejection of a vector `u` from a vector `v`.
     * @param u The first value.
     * @param v The second value.
     * @returns The vector rejection of `u` from `v`.
     * @remarks This function is equivalent to *u* - project(*u*, *v*).
     */
    function reject(u, v) {
        return sub(u, project(u, v));
    }
    Vec2.reject = reject;
    /**
     * Returns a reflection vector using an incident ray and a surface normal.
     * @param i An incident vector.
     * @param n A normal vector.
     * @returns A reflection vector.
     * @remarks This function calculates the reflection vector using the following formula: *v* = *i* - 2 * *n* * dot(*i*, *n*).
     */
    function reflect(i, n) {
        return sub(i, mul(n, 2 * dot(n, i)));
    }
    Vec2.reflect = reflect;
    /**
     * Returns a refraction vector using an incident ray, a surface normal, and a refraction index.
     * @param i An incident direction vector.
     * @param n A surface normal vector.
     * @param e The ratio of refractive indices between the incident medium and the refracting medium.
     * @returns A refraction vector.
     */
    function refract(i, n, e) {
        const cosi = -dot(i, n);
        const sin2t = e * e * (1 - cosi * cosi);
        const cost = Math.sqrt(1 - sin2t);
        return add(mul(i, e), mul(n, e * cosi - cost));
    }
    Vec2.refract = refract;
    /**
     * Performs a linear interpolation between two vectors.
     * @param u The first vector.
     * @param v The second vector.
     * @param t The interpolant value between `u` and `v`.
     * @returns The result of the linear interpolation.
     * @remarks Linear interpolation is based on the following formula: *x*\*(1-*s*) + *y*\**s* which can
     * equivalently be written as *x* + *s*\*(*y*-*x*).
     */
    function lerp(u, v, t) {
        if (t === 0)
            return u;
        if (t === 1)
            return v;
        return {
            x: u.x + t * (v.x - u.x),
            y: u.y + t * (v.y - u.y)
        };
    }
    Vec2.lerp = lerp;
    /**
     * Performs a spherical linear interpolation.
     * @param u The first unit vector.
     * @param v The second unit vector.
     * @param t A value that spherically interpolates between `u` and `v`.
     * @returns The result of the spherical linear interpolation.
     */
    function slerp(u, v, t) {
        if (t === 0)
            return u;
        if (t === 1)
            return v;
        const cost = dot(u, v);
        const theta = Math.acos(cost);
        const sint = Math.sqrt(1 - cost * cost);
        const tu = Math.sin((1 - t) * theta) / sint;
        const tv = Math.sin(t * theta) / sint;
        return add(mul(u, tu), mul(v, tv));
    }
    Vec2.slerp = slerp;
    /**
     * Rotates a vector `v` by angle `t`.
     * @param v The vector to be rotated.
     * @param t The angle in radians to rotate.
     * @returns The input parameter `v` rotated by the specified angle `t`.
     */
    function rotate(v, t) {
        const cost = Math.cos(t), sint = Math.sin(t);
        const rot = Mat2.from([
            cost, -sint,
            sint, cost
        ]);
        return Mat2.mul(rot, v);
    }
    Vec2.rotate = rotate;
})(Vec2 || (Vec2 = {}));
