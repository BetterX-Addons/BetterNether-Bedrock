import { Vec3 } from "./vector3";
/**
 * Includes various 3x3 matrix functions and values.
 */
export var Mat3;
(function (Mat3) {
    /**
     * The identity matrix.
     *
     * Value:
     *
     * **[`1`, `0`, `0`]**
     *
     * **[`0`, `1`, `0`]**
     *
     * **[`0`, `0`, `1`]**
     */
    Mat3.Identity = {
        m11: 1, m12: 0, m13: 0,
        m21: 0, m22: 1, m23: 0,
        m31: 0, m32: 0, m33: 1
    };
    /**
     * Determines if a value implements the {@link Matrix3} interface.
     * @param m The specified value.
     * @returns Returns **True** if the value contains the `Matrix3` properties,
     * otherwise **False**.
     */
    function isMatrix3(m) {
        return typeof m === "object"
            && 'm11' in m && 'm12' in m && 'm13' in m
            && 'm21' in m && 'm22' in m && 'm23' in m
            && 'm31' in m && 'm32' in m && 'm33' in m;
    }
    Mat3.isMatrix3 = isMatrix3;
    function from(u, v, w) {
        if (Array.isArray(u) && u.length >= 9)
            return {
                m11: u[0], m12: u[1], m13: u[2],
                m21: u[3], m22: u[4], m23: u[5],
                m31: u[6], m32: u[7], m33: u[8]
            };
        if (Vec3.isVector3(u) && v && w)
            return {
                m11: u.x, m12: v.x, m13: w.x,
                m21: u.y, m22: v.y, m23: w.y,
                m31: u.z, m32: v.z, m33: w.z
            };
        throw new Error("Invalid input values for matrix construction.");
    }
    Mat3.from = from;
    /**
     * Returns the first column vector in a matrix.
     * @param m The specified matrix.
     */
    function c1(m) {
        return {
            x: m.m11,
            y: m.m21,
            z: m.m31
        };
    }
    Mat3.c1 = c1;
    /**
     * Returns the second column vector in a matrix.
     * @param m The specified matrix.
     */
    function c2(m) {
        return {
            x: m.m12,
            y: m.m22,
            z: m.m32
        };
    }
    Mat3.c2 = c2;
    /**
     * Returns the third column vector in a matrix.
     * @param m The specified matrix.
     */
    function c3(m) {
        return {
            x: m.m13,
            y: m.m23,
            z: m.m33
        };
    }
    Mat3.c3 = c3;
    /**
     * Returns the first row vector in a matrix.
     * @param m The specified matrix.
     */
    function r1(m) {
        return {
            x: m.m11,
            y: m.m12,
            z: m.m13
        };
    }
    Mat3.r1 = r1;
    /**
     * Returns the second row vector in a matrix.
     * @param m The specified matrix.
     */
    function r2(m) {
        return {
            x: m.m21,
            y: m.m22,
            z: m.m23
        };
    }
    Mat3.r2 = r2;
    /**
     * Returns the third row vector in a matrix.
     * @param m The specified matrix.
     */
    function r3(m) {
        return {
            x: m.m31,
            y: m.m32,
            z: m.m33
        };
    }
    Mat3.r3 = r3;
    function mul(m, t) {
        if (isMatrix3(t))
            return {
                m11: Vec3.dot(r1(m), c1(t)),
                m12: Vec3.dot(r1(m), c2(t)),
                m13: Vec3.dot(r1(m), c3(t)),
                m21: Vec3.dot(r2(m), c1(t)),
                m22: Vec3.dot(r2(m), c2(t)),
                m23: Vec3.dot(r2(m), c3(t)),
                m31: Vec3.dot(r3(m), c1(t)),
                m32: Vec3.dot(r3(m), c2(t)),
                m33: Vec3.dot(r3(m), c3(t))
            };
        else if (Vec3.isVector3(t))
            return {
                x: Vec3.dot(r1(m), t),
                y: Vec3.dot(r2(m), t),
                z: Vec3.dot(r3(m), t)
            };
        else
            return {
                m11: m.m11 * t, m12: m.m12 * t, m13: m.m13 * t,
                m21: m.m21 * t, m22: m.m22 * t, m23: m.m23 * t,
                m31: m.m31 * t, m32: m.m32 * t, m33: m.m33 * t
            };
    }
    Mat3.mul = mul;
    /**
     * Returns the trace of a matrix.
     * @param m The specified matrix.
     */
    function trace(m) {
        return m.m11 + m.m22 + m.m33;
    }
    Mat3.trace = trace;
    /**
     * Computes the determinant of a matrix.
     * @param m The specified matrix.
     */
    function determinant(m) {
        return m.m11 * m.m22 * m.m33 + m.m21 * m.m32 * m.m13 + m.m31 * m.m12 * m.m23
            - m.m13 * m.m22 * m.m31 - m.m23 * m.m32 * m.m11 - m.m33 * m.m12 * m.m21;
    }
    Mat3.determinant = determinant;
    /**
     * Transposes a matrix.
     * @param m The specified matrix.
     */
    function transpose(m) {
        return {
            m11: m.m11, m12: m.m21, m13: m.m31,
            m21: m.m12, m22: m.m22, m23: m.m32,
            m31: m.m13, m32: m.m23, m33: m.m33
        };
    }
    Mat3.transpose = transpose;
    /**
     * Returns the cofactor matrix formed from a given matrix.
     * @param m The specified matrix.
     */
    function cofactor(m) {
        return {
            m11: m.m22 * m.m33 - m.m23 * m.m32,
            m12: m.m23 * m.m31 - m.m21 * m.m33,
            m13: m.m21 * m.m32 - m.m22 * m.m31,
            m21: m.m13 * m.m32 - m.m12 * m.m33,
            m22: m.m11 * m.m33 - m.m13 * m.m31,
            m23: m.m12 * m.m31 - m.m11 * m.m32,
            m31: m.m12 * m.m23 - m.m13 * m.m22,
            m32: m.m13 * m.m21 - m.m11 * m.m23,
            m33: m.m11 * m.m22 - m.m12 * m.m21
        };
    }
    Mat3.cofactor = cofactor;
    /**
     * Returns the adjugate matrix formed from a given matrix.
     * @param m The specified matrix.
     */
    function adjugate(m) {
        return {
            m11: m.m22 * m.m33 - m.m23 * m.m32,
            m12: m.m13 * m.m32 - m.m12 * m.m33,
            m13: m.m12 * m.m23 - m.m13 * m.m22,
            m21: m.m23 * m.m31 - m.m21 * m.m33,
            m22: m.m11 * m.m33 - m.m13 * m.m31,
            m23: m.m13 * m.m21 - m.m11 * m.m23,
            m31: m.m21 * m.m32 - m.m22 * m.m31,
            m32: m.m12 * m.m31 - m.m11 * m.m32,
            m33: m.m11 * m.m22 - m.m12 * m.m21
        };
    }
    Mat3.adjugate = adjugate;
    /**
     * Computes the inverse of a given matrix.
     * @param m The specified matrix.
     * @throws Throws an error when the matrix is not invertible.
     */
    function inverse(m) {
        const det = determinant(m);
        if (det === 0)
            throw new Error("Matrix is not invertible.");
        return mul(adjugate(m), 1 / det);
    }
    Mat3.inverse = inverse;
    /**
     * Constructs an axis-aligned Tangent-Normal-Binormal Matrix around a given normal vector.
     * @param n The specified normal vector.
     * @returns A TNB Matrix based on the specified vector.
     */
    function buildTNB(n) {
        const t = Math.abs(n.y) === 1 ? Vec3.East :
            Vec3.normalize(Vec3.from(n.z, 0, -n.x));
        const b = Vec3.cross(n, t);
        return from(t, n, b);
    }
    Mat3.buildTNB = buildTNB;
})(Mat3 || (Mat3 = {}));
