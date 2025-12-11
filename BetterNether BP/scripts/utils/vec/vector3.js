import { Direction } from "@minecraft/server";
/**
 * Includes various 3D vector functions and values.
 */
export var Vec3;
(function (Vec3) {
    /**
     * The zero vector.
     *
     * Value: **[`0`, `0`, `0`]**
     */
    Vec3.Zero = { x: 0, y: 0, z: 0 };
    /**
     * The one vector.
     *
     * Value: **[`1`, `1`, `1`]**
     */
    Vec3.One = { x: 1, y: 1, z: 1 };
    /**
     * The unit vector in the up direction.
     *
     * Value: **[`0`, `1`, `0`]**
     */
    Vec3.Up = { x: 0, y: 1, z: 0 };
    /**
     * The unit vector in the down direction.
     *
     * Value: **[`0`, `-1`, `0`]**
     */
    Vec3.Down = { x: 0, y: -1, z: 0 };
    /**
     * The unit vector in the north direction.
     *
     * Value: **[`0`, `0`, `-1`]**
     */
    Vec3.North = { x: 0, y: 0, z: -1 };
    /**
     * The unit vector in the south direction.
     *
     * Value: **[`0`, `0`, `1`]**
     */
    Vec3.South = { x: 0, y: 0, z: 1 };
    /**
     * The unit vector in the east direction.
     *
     * Value: **[`1`, `0`, `0`]**
     */
    Vec3.East = { x: 1, y: 0, z: 0 };
    /**
     * The unit vector in the west direction.
     *
     * Value: **[`-1`, `0`, `0`]**
     */
    Vec3.West = { x: -1, y: 0, z: 0 };
    /**
     * The standard x basis vector.
     *
     * Value: **[`1`, `0`, `0`]**
     */
    Vec3.X = Vec3.East;
    /**
     * The standard y basis vector.
     *
     * Value: **[`0`, `1`, `0`]**
     */
    Vec3.Y = Vec3.Up;
    /**
     * The standard z basis vector.
     *
     * Value: **[`0`, `0`, `1`]**
     */
    Vec3.Z = Vec3.South;
    /**
     * Tests if a value is of {@link Vector3} type.
     * @param v The specified value.
     * @returns Returns **True** if the value contains the `Vector3` properties,
     * otherwise **False**.
     */
    function isVector3(v) {
        return typeof v === "object" && 'x' in v && 'y' in v && 'z' in v;
    }
    Vec3.isVector3 = isVector3;
    function from(x, y, z) {
        if (typeof x === "number")
            return {
                x: x,
                y: y ?? x,
                z: z ?? x
            };
        if (Array.isArray(x) && x.length >= 3)
            return {
                x: x[0],
                y: x[1],
                z: x[2]
            };
        throw new Error("Invalid input values for vector construction.");
    }
    Vec3.from = from;
    /**
     * Constructs a {@link Vector3} from a {@link VectorXZ} value.
     * @param v The specified vectorXZ value.
     * @returns A {@link Vector3} with the y component set to `0`.
     */
    function fromVectorXZ(v) {
        return {
            x: v.x,
            y: 0.0,
            z: v.z
        };
    }
    Vec3.fromVectorXZ = fromVectorXZ;
    /**
     * Converts a {@link Vector3} into a {@link VectorXZ}.
     * @param v The specified vector.
     * @returns A {@link VectorXZ}, omitting the y component of `v`.
     */
    function toVectorXZ(v) {
        return {
            x: v.x,
            z: v.z
        };
    }
    Vec3.toVectorXZ = toVectorXZ;
    /**
     * Returns the corresponding unit vector to a
     * value of the `minecraft:block_face` or the
     * `minecraft:cardinal_direction` block traits.
     * @param face The value of the block trait.
     * @throws Throws an error when `face` is not of the proper type.
     */
    function fromBlockFace(face) {
        switch (face) {
            case "up": return Vec3.Up;
            case "down": return Vec3.Down;
            case "north": return Vec3.North;
            case "south": return Vec3.South;
            case "east": return Vec3.East;
            case "west": return Vec3.West;
        }
        throw new Error("Argument was not of type 'block_face' or 'cardinal_direction'.");
    }
    Vec3.fromBlockFace = fromBlockFace;
    /**
     * Converts a vector to a direction string from the
     * `minecraft:block_face` or `minecraft:cardinal_direction`
     * block traits.
     * @param v The specified vector.
     */
    function toBlockFace(v) {
        return toDirection(v).toLowerCase();
    }
    Vec3.toBlockFace = toBlockFace;
    /**
     * Returns the corresponding {@link Vector3} to the given direction.
     * @param d The specified direction value.
     */
    function fromDirection(d) {
        switch (d) {
            case Direction.Up: return Vec3.Up;
            case Direction.Down: return Vec3.Down;
            case Direction.North: return Vec3.North;
            case Direction.South: return Vec3.South;
            case Direction.East: return Vec3.East;
            case Direction.West: return Vec3.West;
        }
    }
    Vec3.fromDirection = fromDirection;
    /**
     * Converts a vector to a {@link Direction}.
     * @param v The specified vector.
     * @returns The nearest {@link Direction} to the vector.
     */
    function toDirection(v) {
        const a = abs(v), max = Math.max(a.x, a.y, a.z);
        if (max === a.x)
            return v.x >= 0 ? Direction.East : Direction.West;
        else if (max === a.y)
            return v.y >= 0 ? Direction.Up : Direction.Down;
        else
            return v.z >= 0 ? Direction.South : Direction.North;
    }
    Vec3.toDirection = toDirection;
    /**
     * Constructs a {@link Vector3} from the corresponding components in an {@link RGB} value.
     * @param c The specified RGB value.
     * @returns An {@link RGB} value with corresponding components to those in `v`.
     */
    function fromRGB(c) {
        return {
            x: c.red,
            y: c.green,
            z: c.blue
        };
    }
    Vec3.fromRGB = fromRGB;
    /**
     * Converts a {@link Vector3} into an {@link RGB} value.
     * @param v The specified vector.
     * @returns An {@link RGB} value with corresponding components to those in `v`.
     */
    function toRGB(v) {
        return {
            red: v.x,
            green: v.y,
            blue: v.z
        };
    }
    Vec3.toRGB = toRGB;
    /**
     * Converts a unit vector to a rotation vector.
     * @param v The specified unit vector.
     */
    function toRotation(v) {
        return {
            x: -degrees(Math.asin(v.y)),
            y: -degrees(Math.atan2(v.x, v.z)),
        };
    }
    Vec3.toRotation = toRotation;
    function degrees(radians) {
        return 180 * radians / Math.PI;
    }
    /**
     * Converts a vector into an array of three numbers.
     * @param v The specified vector.
     * @returns An array containing the three components of `v`.
     */
    function toArray(v) {
        const { x, y, z } = v;
        return [x, y, z];
    }
    Vec3.toArray = toArray;
    /**
     * Stringifies a vector to the form "x y z".
     * @param v The specified vector.
     */
    function toString(v) {
        return toArray(v).join(' ');
    }
    Vec3.toString = toString;
    /**
     * Parses a vector from its stringified form.
     * @param s The vector in stringified form.
     * @returns A {@link Vector3} parsed from the string.
     */
    function parse(s) {
        const [x, y, z] = s.split(" ").map(Number);
        return { x, y, z };
    }
    Vec3.parse = parse;
    /**
     * Determines if the specified vector is `NaN`.
     * @param v The specified vector.
     * @returns Returns **True** if the `v` parameter is `NaN`. Otherwise, **False**.
     */
    function isNaN(v) {
        return Number.isNaN(v.x) || Number.isNaN(v.y) || Number.isNaN(v.z);
    }
    Vec3.isNaN = isNaN;
    /**
     * Determines if the specified vector is infinite.
     * @param v The specified vector.
     * @returns Returns **True** if the `v` parameter is `+Infinity` or `-Infinity`. Otherwise, **False**.
     */
    function isInf(v) {
        return !isFinite(v);
    }
    Vec3.isInf = isInf;
    /**
     * Determines if the specified vector is finite.
     * @param v The specified vector.
     * @returns Returns **True** if the `v` parameter is finite; otherwise **False**.
     */
    function isFinite(v) {
        return Number.isFinite(v.x) && Number.isFinite(v.y) && Number.isFinite(v.z);
    }
    Vec3.isFinite = isFinite;
    /**
     * Determines if any of the components of `v` are non-zero.
     * @param v The specified vector.
     * @returns Returns `true` if at least one of the components of `v` is non-zero, otherwise `false`.
     */
    function any(v) {
        return v.x !== 0 || v.y !== 0 || v.z !== 0;
    }
    Vec3.any = any;
    /**
     * Determines if all of the components of `v` are non-zero.
     * @param v The specified vector.
     * @returns Returns `true` if all the components of `v` are non-zero, otherwise `false`.
     */
    function all(v) {
        return v.x !== 0 && v.y !== 0 && v.z !== 0;
    }
    Vec3.all = all;
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
            y: u.y > v.y ? 1 : 0,
            z: u.z > v.z ? 1 : 0
        };
    }
    Vec3.greaterThan = greaterThan;
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
            y: u.y < v.y ? 1 : 0,
            z: u.z < v.z ? 1 : 0
        };
    }
    Vec3.lessThan = lessThan;
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
            y: u.y >= v.y ? 1 : 0,
            z: u.z >= v.z ? 1 : 0
        };
    }
    Vec3.greaterEqual = greaterEqual;
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
            y: u.y <= v.y ? 1 : 0,
            z: u.z <= v.z ? 1 : 0
        };
    }
    Vec3.lessEqual = lessEqual;
    /**
     * Determines if two vectors are equal.
     * @param u The first specified vector.
     * @param v The second specified vector.
     * @returns `true` if every component of `u` is equal to those in `v`, otherwise `false`.
     */
    function equal(u, v) {
        return u.x === v.x && u.y === v.y && u.z === v.z;
    }
    Vec3.equal = equal;
    /**
     * Selects the lesser of `u` and `v`.
     * @param u The `u` input value.
     * @param v The `v` input value.
     * @return The `u` or `v` parameter, whichever is the smallest value.
     */
    function min(u, v) {
        return {
            x: Math.min(u.x, v.x),
            y: Math.min(u.y, v.y),
            z: Math.min(u.z, v.z)
        };
    }
    Vec3.min = min;
    /**
     * Selects the greater of `u` and `v`.
     * @param u The `u` input value.
     * @param v The `v` input value.
     * @return The `u` or `v` parameter, whichever is the largest value.
     */
    function max(u, v) {
        return {
            x: Math.max(u.x, v.x),
            y: Math.max(u.y, v.y),
            z: Math.max(u.z, v.z)
        };
    }
    Vec3.max = max;
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
            y: Math.min(Math.max(v.y, min.y), max.y),
            z: Math.min(Math.max(v.z, min.z), max.z)
        };
    }
    Vec3.clamp = clamp;
    /**
     * Clamps the specified vector within the range 0 to 1.
     * @param v The specified vector.
     */
    function saturate(v) {
        return {
            x: Math.min(Math.max(v.x, 0), 1),
            y: Math.min(Math.max(v.y, 0), 1),
            z: Math.min(Math.max(v.z, 0), 1)
        };
    }
    Vec3.saturate = saturate;
    /**
     * Returns the sign of `v`.
     * @param v The input value.
     * @returns `-1` if `v` is less than zero; `0` if `v` equals zero; and `1` if `v` is greater than zero.
     */
    function sign(v) {
        return {
            x: Math.sign(v.x),
            y: Math.sign(v.y),
            z: Math.sign(v.z)
        };
    }
    Vec3.sign = sign;
    /**
     * Returns the largest integer that is less than or equal to the specified vector.
     * @param v The specified vector.
     * @returns The largest integer value that is less than or equal to the `v` parameter.
     */
    function floor(v) {
        return {
            x: Math.floor(v.x),
            y: Math.floor(v.y),
            z: Math.floor(v.z)
        };
    }
    Vec3.floor = floor;
    /**
     * Returns the smallest integer value that is greater than or equal to the specified vector.
     * @param v The specified vector.
     * @returns The smallest integer value that is greater than or equal to the `v` parameter.
     */
    function ceil(v) {
        return {
            x: Math.ceil(v.x),
            y: Math.ceil(v.y),
            z: Math.ceil(v.z)
        };
    }
    Vec3.ceil = ceil;
    /**
     * Returns the fractional (or decimal) part of `v`; which is greater than or equal to 0 and less than 1.
     * @param v The specified vector.
     * @returns The fractional part of the `v` parameter.
     */
    function frac(v) {
        return {
            x: v.x - Math.floor(v.x),
            y: v.y - Math.floor(v.y),
            z: v.z - Math.floor(v.z)
        };
    }
    Vec3.frac = frac;
    /**
     * Rounds the specified vector to the nearest integer. Halfway cases are rounded to the nearest even.
     * @param v The specified vector.
     * @returns The `v` parameter, rounded to the nearest integer.
     */
    function round(v) {
        return {
            x: Math.round(v.x),
            y: Math.round(v.y),
            z: Math.round(v.z)
        };
    }
    Vec3.round = round;
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
            y: u.y % v.y,
            z: u.z % v.z
        };
    }
    Vec3.mod = mod;
    /**
     * Negates a specified vector `v`.
     * @param v The specified vector.
     * @returns The negation of the `v` parameter.
     */
    function neg(v) {
        return {
            x: -v.x,
            y: -v.y,
            z: -v.z
        };
    }
    Vec3.neg = neg;
    /**
     * Returns the absolute value of the specified vector.
     * @param v The specified vector.
     * @returns The absolute value of the `v` parameter.
     */
    function abs(v) {
        return {
            x: Math.abs(v.x),
            y: Math.abs(v.y),
            z: Math.abs(v.z)
        };
    }
    Vec3.abs = abs;
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
                y: v.y + arg.y,
                z: v.z + arg.z
            };
        return v;
    }
    Vec3.add = add;
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
                y: v.y - arg.y,
                z: v.z - arg.z
            };
        return v;
    }
    Vec3.sub = sub;
    function mul(v, m) {
        if (isVector3(m))
            return {
                x: v.x * m.x,
                y: v.y * m.y,
                z: v.z * m.z
            };
        else
            return {
                x: v.x * m,
                y: v.y * m,
                z: v.z * m
            };
    }
    Vec3.mul = mul;
    function div(v, m) {
        if (isVector3(m))
            return {
                x: v.x / m.x,
                y: v.y / m.y,
                z: v.z / m.z
            };
        else
            return {
                x: v.x / m,
                y: v.y / m,
                z: v.z / m
            };
    }
    Vec3.div = div;
    /**
     * Returns the square root of the specified vector, per component.
     * @param v The specified vector.
     * @returns The square root of the `v` parameter, per component.
     */
    function sqrt(v) {
        return {
            x: Math.sqrt(v.x),
            y: Math.sqrt(v.y),
            z: Math.sqrt(v.z)
        };
    }
    Vec3.sqrt = sqrt;
    /**
     * Returns the base-e exponential of the specified vector.
     * @param v The specified vector.
     * @returns The base-e exponential of the `v` parameter.
     */
    function exp(v) {
        return {
            x: Math.exp(v.x),
            y: Math.exp(v.y),
            z: Math.exp(v.z)
        };
    }
    Vec3.exp = exp;
    /**
     * Returns the base 2 exponential of the specified vector.
     * @param v The specified vector.
     * @returns The base 2 exponential of the `v` parameter.
     */
    function exp2(v) {
        return {
            x: Math.pow(2, v.x),
            y: Math.pow(2, v.y),
            z: Math.pow(2, v.z)
        };
    }
    Vec3.exp2 = exp2;
    /**
     * Returns the base-e logarithm of the specified vector.
     * @param v The specified vector.
     * @returns The base-e logarithm of the `v` parameter.
     */
    function log(v) {
        return {
            x: Math.log(v.x),
            y: Math.log(v.y),
            z: Math.log(v.z)
        };
    }
    Vec3.log = log;
    /**
     * Returns the base-2 logarithm of the specified vector.
     * @param v The specified vector.
     * @returns The base-2 logarithm of the `v` parameter.
     */
    function log2(v) {
        return {
            x: Math.log2(v.x),
            y: Math.log2(v.y),
            z: Math.log2(v.z)
        };
    }
    Vec3.log2 = log2;
    /**
     * Returns the base-10 logarithm of the specified vector.
     * @param v The specified vector.
     * @returns The base-10 logarithm of the `v` parameter.
     */
    function log10(v) {
        return {
            x: Math.log10(v.x),
            y: Math.log10(v.y),
            z: Math.log10(v.z)
        };
    }
    Vec3.log10 = log10;
    function pow(v, p) {
        if (isVector3(p))
            return {
                x: Math.pow(v.x, p.x),
                y: Math.pow(v.y, p.y),
                z: Math.pow(v.z, p.z)
            };
        else
            return {
                x: Math.pow(v.x, p),
                y: Math.pow(v.y, p),
                z: Math.pow(v.z, p)
            };
    }
    Vec3.pow = pow;
    /**
     * Returns the sine of the specified vector.
     * @param v The specified vector, in radians.
     * @returns The sine of the `v` parameter.
     */
    function sin(v) {
        return {
            x: Math.sin(v.x),
            y: Math.sin(v.y),
            z: Math.sin(v.z)
        };
    }
    Vec3.sin = sin;
    /**
     * Returns the arcsine of the specified vector.
     * @param v The specified vector.
     * @returns The arcsine of the `v` parameter.
     */
    function asin(v) {
        return {
            x: Math.asin(v.x),
            y: Math.asin(v.y),
            z: Math.asin(v.z)
        };
    }
    Vec3.asin = asin;
    /**
     * Returns the hyperbolic sine of the specified vector.
     * @param v The specified vector, in radians.
     * @returns The hyperbolic sine of the `v` parameter.
     */
    function sinh(v) {
        return {
            x: Math.sinh(v.x),
            y: Math.sinh(v.y),
            z: Math.sinh(v.z)
        };
    }
    Vec3.sinh = sinh;
    /**
     * Returns the hyperbolic arcsine of the specified vector.
     * @param v The specified vector.
     * @returns The hyperbolic arcsine of the `v` parameter.
     */
    function asinh(v) {
        return {
            x: Math.asinh(v.x),
            y: Math.asinh(v.y),
            z: Math.asinh(v.z)
        };
    }
    Vec3.asinh = asinh;
    /**
     * Returns the cosine of the specified vector.
     * @param v The specified vector, in radians.
     * @returns The cosine of the `v` parameter.
     */
    function cos(v) {
        return {
            x: Math.cos(v.x),
            y: Math.cos(v.y),
            z: Math.cos(v.z)
        };
    }
    Vec3.cos = cos;
    /**
     * Returns the arccosine of the specified vector.
     * @param v The specified vector. Each component should be a value within the range of -1 to 1.
     * @returns The arccosine of the `v` parameter.
     */
    function acos(v) {
        return {
            x: Math.acos(v.x),
            y: Math.acos(v.y),
            z: Math.acos(v.z)
        };
    }
    Vec3.acos = acos;
    /**
     * Returns the hyperbolic cosine of the specified vector.
     * @param v The specified vector, in radians.
     * @returns The hyperbolic cosine of the `v` parameter.
     */
    function cosh(v) {
        return {
            x: Math.cosh(v.x),
            y: Math.cosh(v.y),
            z: Math.cosh(v.z)
        };
    }
    Vec3.cosh = cosh;
    /**
     * Returns the hyperbolic arccosine of the specified vector.
     * @param v The specified vector. Each component should be a value within the range of -1 to 1.
     * @returns The hyperbolic arccosine of the `v` parameter.
     */
    function acosh(v) {
        return {
            x: Math.acosh(v.x),
            y: Math.acosh(v.y),
            z: Math.acosh(v.z)
        };
    }
    Vec3.acosh = acosh;
    /**
     * Returns the tangent of the specified vector.
     * @param v The specified vector, in radians.
     * @returns The tangent of the `v` parameter.
     */
    function tan(v) {
        return {
            x: Math.tan(v.x),
            y: Math.tan(v.y),
            z: Math.tan(v.z)
        };
    }
    Vec3.tan = tan;
    /**
     * Returns the arctangent of the specified vector.
     * @param v The specified vector.
     * @returns The arctangent of the `v` parameter. This value is within the range of -π/2 to π/2.
     */
    function atan(v) {
        return {
            x: Math.atan(v.x),
            y: Math.atan(v.y),
            z: Math.atan(v.z)
        };
    }
    Vec3.atan = atan;
    /**
     * Returns the hyperbolic tangent of the specified vector.
     * @param v The specified vector, in radians.
     * @returns The hyperbolic tangent of the `v` parameter.
     */
    function tanh(v) {
        return {
            x: Math.tanh(v.x),
            y: Math.tanh(v.y),
            z: Math.tanh(v.z)
        };
    }
    Vec3.tanh = tanh;
    /**
     * Returns the hyperbolic arctangent of the specified vector.
     * @param v The specified vector.
     * @returns The hyperbolic arctangent of the `v` parameter.
     */
    function atanh(v) {
        return {
            x: Math.atanh(v.x),
            y: Math.atanh(v.y),
            z: Math.atanh(v.z)
        };
    }
    Vec3.atanh = atanh;
    function above(v, s = 1) {
        return add(v, mul(Vec3.Up, s));
    }
    Vec3.above = above;
    function below(v, s = 1) {
        return add(v, mul(Vec3.Down, s));
    }
    Vec3.below = below;
    function north(v, s = 1) {
        return add(v, mul(Vec3.North, s));
    }
    Vec3.north = north;
    function south(v, s = 1) {
        return add(v, mul(Vec3.South, s));
    }
    Vec3.south = south;
    function east(v, s = 1) {
        return add(v, mul(Vec3.East, s));
    }
    Vec3.east = east;
    function west(v, s = 1) {
        return add(v, mul(Vec3.West, s));
    }
    Vec3.west = west;
    /**
     * Returns the dot product of two vectors.
     * @param u The first vector.
     * @param v The second vector.
     * @returns The dot product of `u` and `v`.
     */
    function dot(u, v) {
        return u.x * v.x + u.y * v.y + u.z * v.z;
    }
    Vec3.dot = dot;
    /**
     * Returns the cross product of two vectors.
     * @param u The first vector.
     * @param v The second vector.
     * @returns The cross product of `u` and `v`.
     */
    function cross(u, v) {
        return {
            x: u.y * v.z - u.z * v.y,
            y: u.z * v.x - u.x * v.z,
            z: u.x * v.y - u.y * v.x
        };
    }
    Vec3.cross = cross;
    /**
     * Returns the length of the specified vector.
     * @param v The specified vector.
     * @returns A scalar that represents the length of `v`.
     */
    function length(v) {
        return Math.hypot(v.x, v.y, v.z);
    }
    Vec3.length = length;
    /**
     * Normalizes the specified vector according to `v` / length(`v`).
     * @param v The specified vector.
     * @returns The normalized vector `v`.
     */
    function normalize(v) {
        return div(v, length(v));
    }
    Vec3.normalize = normalize;
    /**
     * Returns a distance scalar between two vectors.
     * @param u The first vector to compare.
     * @param v The second vector to compare.
     * @returns A scalar value that represents the distance between `u` and `v`.
     */
    function distance(u, v) {
        return length(sub(u, v));
    }
    Vec3.distance = distance;
    /**
     * Projects a vector `u` onto a vector `v`.
     * @param u The first value.
     * @param v The second value.
     * @returns The vector projection of `u` onto `v`.
     */
    function project(u, v) {
        return mul(v, dot(u, v) / dot(v, v));
    }
    Vec3.project = project;
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
    Vec3.reject = reject;
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
    Vec3.reflect = reflect;
    /**
     * Returns a refraction vector using an incident ray, a surface normal, and a refraction index.
     * @param i An incident direction vector.
     * @param n A surface normal vector.
     * @param eta The ratio of refractive indices between the incident medium and the refracting medium.
     * @returns A refraction vector.
     */
    function refract(i, n, eta) {
        const cosi = -dot(i, n);
        const sin2t = eta * eta * (1 - cosi * cosi);
        const cost = Math.sqrt(1 - sin2t);
        return add(mul(i, eta), mul(n, eta * cosi - cost));
    }
    Vec3.refract = refract;
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
            y: u.y + t * (v.y - u.y),
            z: u.z + t * (v.z - u.z)
        };
    }
    Vec3.lerp = lerp;
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
    Vec3.slerp = slerp;
    /**
     * Rotates a vector `v` accross an axis `k` by angle `t`.
     * @param v The vector to be rotated.
     * @param k The unit rotation axis vector.
     * @param t The angle in radians to rotate about the axis.
     * @returns The input parameter `v` rotated about `k` by the specified angle `t`.
     */
    function rotate(v, k, t) {
        const cost = Math.cos(t), sint = Math.sin(t);
        const par = mul(k, dot(v, k)), per = sub(v, par), kxv = cross(k, v);
        return add(par, add(mul(per, cost), mul(kxv, sint)));
    }
    Vec3.rotate = rotate;
})(Vec3 || (Vec3 = {}));
