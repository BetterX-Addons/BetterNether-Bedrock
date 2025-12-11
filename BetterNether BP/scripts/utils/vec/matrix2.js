import { Vec2 } from "./vector2";
/**
 * Includes various 2x2 matrix functions and values.
 */
export var Mat2;
(function (Mat2) {
    /**
     * The identity matrix.
     *
     * Value:
     *
     * **[`1`, `0`]**
     *
     * **[`0`, `1`]**
     */
    Mat2.Identity = {
        m11: 1, m12: 0,
        m21: 0, m22: 1,
    };
    /**
     * Determines if a value implements the {@link Matrix2} interface.
     * @param m The specified value.
     * @returns Returns **True** if the value contains the `Matrix2` properties,
     * otherwise **False**.
     */
    function isMatrix2(m) {
        return typeof m === "object"
            && 'm11' in m && 'm12' in m
            && 'm21' in m && 'm22' in m;
    }
    Mat2.isMatrix2 = isMatrix2;
    function from(u, v) {
        if (Array.isArray(u) && u.length >= 4)
            return {
                m11: u[0], m12: u[1],
                m21: u[2], m22: u[3]
            };
        if (Vec2.isVector2(u) && v)
            return {
                m11: u.x, m12: v.x,
                m21: u.y, m22: v.y
            };
        throw new Error("Invalid input values for matrix construction.");
    }
    Mat2.from = from;
    /**
     * Returns the first column vector in a matrix.
     * @param m The specified matrix.
     */
    function c1(m) {
        return {
            x: m.m11,
            y: m.m21
        };
    }
    Mat2.c1 = c1;
    /**
     * Returns the second column vector in a matrix.
     * @param m The specified matrix.
     */
    function c2(m) {
        return {
            x: m.m12,
            y: m.m22
        };
    }
    Mat2.c2 = c2;
    /**
     * Returns the first row vector in a matrix.
     * @param m The specified matrix.
     */
    function r1(m) {
        return {
            x: m.m11,
            y: m.m12
        };
    }
    Mat2.r1 = r1;
    /**
     * Returns the second row vector in a matrix.
     * @param m The specified matrix.
     */
    function r2(m) {
        return {
            x: m.m21,
            y: m.m22
        };
    }
    Mat2.r2 = r2;
    function mul(m, t) {
        if (isMatrix2(t))
            return {
                m11: Vec2.dot(r1(m), c1(t)),
                m12: Vec2.dot(r1(m), c2(t)),
                m21: Vec2.dot(r2(m), c1(t)),
                m22: Vec2.dot(r2(m), c2(t)),
            };
        else if (Vec2.isVector2(t))
            return {
                x: Vec2.dot(r1(m), t),
                y: Vec2.dot(r2(m), t)
            };
        else
            return {
                m11: m.m11 * t, m12: m.m12 * t,
                m21: m.m21 * t, m22: m.m22 * t
            };
    }
    Mat2.mul = mul;
    /**
     * Returns the trace of a matrix.
     * @param m The specified matrix.
     */
    function trace(m) {
        return m.m11 + m.m22;
    }
    Mat2.trace = trace;
    /**
     * Computes the determinant of a matrix.
     * @param m The specified matrix.
     */
    function determinant(m) {
        return m.m11 * m.m22 - m.m12 * m.m21;
    }
    Mat2.determinant = determinant;
    /**
     * Transposes a matrix.
     * @param m The specified matrix.
     */
    function transpose(m) {
        return {
            m11: m.m11, m12: m.m21,
            m21: m.m12, m22: m.m22
        };
    }
    Mat2.transpose = transpose;
    /**
     * Returns the cofactor matrix formed from a given matrix.
     * @param m The specified matrix.
     */
    function cofactor(m) {
        return {
            m11: m.m22, m12: -m.m21,
            m21: -m.m12, m22: m.m11
        };
    }
    Mat2.cofactor = cofactor;
    /**
     * Returns the adjugate matrix formed from a given matrix.
     * @param m The specified matrix.
     */
    function adjugate(m) {
        return {
            m11: m.m22, m12: -m.m12,
            m21: -m.m21, m22: m.m11
        };
    }
    Mat2.adjugate = adjugate;
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
    Mat2.inverse = inverse;
})(Mat2 || (Mat2 = {}));
