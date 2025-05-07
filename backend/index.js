const express = require('express');
const cors = require('cors');
const db = require('./db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const awsServerlessExpress = require("aws-serverless-express");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/api/booking/dentists', async (req, res) => {
    try {
        const getDentistsQuery = 'SELECT * FROM dentists';
        const result = await db.query(getDentistsQuery);
        res.status(200).json(result.rows);
    }
    catch (error) {
        console.log(error);
        res.status(500);
    }
});

app.get('/api/booking/slots/:dentistId', async (req, res) => {
    try {
        const dentistId = req.params.dentistId;

        const getVacantTimeSlotsQuery = `
            SELECT
                id,
                TO_CHAR(time_slot::timestamp,'FMMonth DD, YYYY') AS date,
                TO_CHAR(time_slot::timestamp,'HH12:MI AM') AS time
            FROM slots
            WHERE dentist_id = $1
            AND id NOT IN
            (SELECT slot_id FROM appointments)`;
        const result = await db.query(getVacantTimeSlotsQuery, [dentistId]);
        console.log(result.rows)
        res.status(200).json(result.rows);
    }
    catch (error) {
        console.log(error);
        res.status(500);
    }
});

app.post('/api/booking/book', async (req, res) => {
    try {
        const {timeSlotId, userId} = req.body;

        const insertBookingQuery = `
            INSERT INTO appointments(user_id, slot_id)
            VALUES ($1, $2)`;
        const result = await db.query(insertBookingQuery,[userId, timeSlotId]);
        res.status(201).json(result.rows);
    }
    catch (error) {
        console.log(error);
        res.status(500);
    }
});

app.get('/api/dashboard/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;

        const getUserAppointments = `
            SELECT
                a.id,
                TO_CHAR(s.time_slot::timestamp,'FMMonth DD, YYYY') AS date,
                TO_CHAR(s.time_slot::timestamp,'HH12:MI AM') AS time,
                d.name
            FROM appointments AS a
            INNER JOIN slots AS s ON a.slot_id = s.id
            INNER JOIN dentists AS d ON s.dentist_id = d.id
            WHERE a.user_id = $1
            ORDER BY s.time_slot ASC`;
        const result = await db.query(getUserAppointments, [userId]);
        res.status(200).json(result.rows);
    }
    catch (error) {
        console.log(error);
        res.status(500);
    }
});

app.delete('/api/dashboard/:appointmentId', async (req,res) => {
    try {
        const appointmentId = req.params.appointmentId;

        const deleteAppointmentQuery = `
            DELETE FROM appointments
            WHERE id = $1`;
        const result = await db.query(deleteAppointmentQuery, [appointmentId]);
        res.status(200).json(result.rows);
    }
    catch (error) {
        console.log(error);
        res.status(500);
    }
});







app.post('/api/signup', async (req, res) => {
    try {
        const {name, gender, birthdate, email, password} = req.body;
        console.log(gender);
        console.log(birthdate);
        const passwordEncrypted = await bcrypt.hash(password, 10);

        const insertUserQuery = `
            INSERT INTO users(name, gender, birthdate, email, password)
            VALUES ($1, $2, $3, $4, $5)`;
        const result = await db.query(insertUserQuery, [name, gender.charAt(0).toUpperCase() + gender.slice(1), birthdate, email, passwordEncrypted]);
        res.status(201).json(result.rows);
    }
    catch (error) {
        console.log(error);
        res.status(500);
    } 
});

app.post('/api/login', async (req, res) => {
    try {
        console.log("api/login");
        const email = req.body.email;
        const inputPassword = req.body.password;

        const getUserQuery = `
            SELECT * FROM users
            WHERE email = $1`;
        const resultGetUserQuery = await db.query(getUserQuery, [email]);

        console.log(resultGetUserQuery)

        if (resultGetUserQuery.rows.length === 0) {
            console.log("User does not exist.");
            return res.status(401).json({message: "User does not exist."});
        }

        const userData = resultGetUserQuery.rows[0];
        const correctPassword = userData.password;
        const isPasswordMatch = await bcrypt.compare(inputPassword, correctPassword);

        if (!isPasswordMatch) {
            console.log("Invalid password.");
            return res.status(401).json({message: "Invalid password."});
        }

        const token = jwt.sign(
            { userId: userData.id, email: userData.email },
            'DOOSS',
            { expiresIn: '1h' }
        );

        console.log("Successful login");
        console.log(userData.gender);
        console.log(userData.birthdate);
        const birthdate = new Date(userData.birthdate);
        const birthDateonly = birthdate.toISOString().split('T')[0];

        res.status(200).json({token: token,
                              userId: userData.id,
                              name: userData.name,
                              email: userData.email,
                              gender: userData.gender,
                              birthdate: birthDateonly
                            });
    }
    catch (error) {
        console.log(error);
        res.status(500);
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });

// const server = awsServerlessExpress.createServer(app);

// exports.handler = (event, context) => {
//   awsServerlessExpress.proxy(server, event, context);
// };