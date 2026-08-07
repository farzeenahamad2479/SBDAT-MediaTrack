const bcrypt = require("bcrypt");
const pool = require("../db");

const signup = async (req, res) => {
    try {

        const {
            full_name,
            username,
            email,
            password
        } = req.body;


        const query = `
            INSERT INTO users (full_name, username, email, password)
            VALUES ($1, $2, $3, $4)
            RETURNING id, full_name, username, email;
        `;

        const hashedPassword = await bcrypt.hash(password, 10);

        const values = [
            full_name,
            username,
            email,
            hashedPassword
        ];

        const result = await pool.query(query, values);

        res.status(201).json({
            success: true,
            message: "Account created successfully!",
            user: result.rows[0]
        });

    } catch (err) {

        console.error(err);

        // Duplicate username or email
        if (err.code === "23505") {

            if (err.constraint.includes("username")) {
                return res.status(409).json({
                    success: false,
                    field: "username",
                    message: "This username is already taken."
                });
            }

            if (err.constraint.includes("email")) {
                return res.status(409).json({
                    success: false,
                    field: "email",
                    message: "An account with this email already exists."
                });
            }
        }

        res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again."
        });

    }
};

const login = async (req, res) => {

    try {

        const { identifier, password } = req.body;

        const query = `
            SELECT *
            FROM users
            WHERE email = $1
               OR username = $1;
        `;

        const result = await pool.query(query, [identifier]);

        if (result.rows.length === 0) {

            return res.status(401).json({
                success: false,
                message: "Invalid email/username or password."
            });

        }

        const user = result.rows[0];

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {

            return res.status(401).json({
                success: false,
                message: "Invalid email/username or password."
            });

        }

        res.json({
            success: true,
            message: "Login successful!",
            user: {
                id: user.id,
                full_name: user.full_name,
                username: user.username,
                email: user.email
            }
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: "Something went wrong."
        });

    }

};

module.exports = { signup, login };