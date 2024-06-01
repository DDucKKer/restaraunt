const express = require('express');
const fs = require('fs');
const app = express();
const cors = require('cors');
require('dotenv').config();
const pool = require('./db');
const path = require("path")
const fileupload = require("express-fileupload");
const PORT = process.env.PORT || 5000
// const HOST = process.env.HOST


nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // hostname
    // auth: {
    //     type: 'OAuth2',
    //     user: process.env.MAIL_USER,
    //     accessToken: process.env.ACCESS_TOKEN,
    //     pass: process.env.MAIL_PASSWORD,
    //     clientId: process.env.OAUTH_CLIENTID,
    //     clientSecret: process.env.OAUTH_CLIENT_SECRET,
    //     refreshToken: process.env.OAUTH_REFRESH_TOKEN
    // }
});


//process.env.PORT
//process.env.NODE_ENV => production or undefined

//middleware
app.use(cors());
app.use(express.json()); //=> allows us to access the req.body

app.use(fileupload());
app.use(express.static("files"));

app.post("/upload", (req, res) => {
    const frstpath = __dirname + "/client/public/pics/";
    const scndpath = __dirname + "/client/build/pics/";
    const file = req.files.file;
    const filename = file.name;

    file.mv(`${frstpath}${filename}`, (err) => {
        if (err) {
        //   res.status(500).send({ message: "File upload failed", code: 200 });
        log.error(err.message);
        console.error(err.message)
        }
        // res.status(200).send({ message: "File Uploaded", code: 200 });
    });
    file.mv(`${scndpath}${filename}`, (err) => {
        if (err) {
        //   res.status(500).send({ message: "File upload failed", code: 200 });
        log.error(err.message);
        console.error(err.message)
        }
        // res.status(200).send({ message: "File Uploaded", code: 200 });
    });
});

// app.use(express.static(path.join(__dirname, "client/build")))
app.use(express.static("./client/build"));


if(process.env.NODE_ENV === "production"){
    //server static content
    //npm run build")
    app.use(express.static(path.join(__dirname, "client/build")))
}

console.log(__dirname)
//ROUTES

//login and register
app.use("/auth", require("./routes/jwtAuth"))

//dashboard route

app.use("/dashboard", require("./routes/dashboards"));


//SECTIONSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS

//CREATE SECTION
app.post('/sections', async (req, res) => {
    try {
        const { section_name, cuisine_id } = req.body;
        const newSection = await pool.query(
            "INSERT INTO menu_section (section_name, cuisine_id) VALUES($1, $2) RETURNING *",
            [section_name, cuisine_id]
        );

        res.json(newSection);
    } catch (err) {
        console.log(err)
        //log.error(err);
    }
})

//get all sections
app.get("/sections", async (req, res) => {
    try {
        const allSections = await pool.query("SELECT * FROM menu_section")
        res.json(allSections.rows);
    } catch (err) {
        console.log(err)
        //log.error(err);
    }
})

//get a setion
app.get("/sections/:section_id", async (req, res) => {
    try {
        const { section_id } = req.params;
        const section = await pool.query("SELECT * FROM menu_section WHERE section_id = $1", [section_id]);

        res.json(section.rows[0]);
    } catch (err) {
        console.log(err)
        //log.error(err);
    }
})
//get setions from 1 cuisine
app.get("/sections/cuisine/:cuisine_id", async (req, res) => {
    try {
        const { cuisine_id } = req.params;
        const sections = await pool.query("SELECT * FROM menu_section WHERE cuisine_id = $1", [cuisine_id]);

        res.json(sections.rows);
    } catch (err) {
        console.log(err)
        //log.error(err);
    }
})
//update a section
app.put("/sections/:section_id", async (req, res) => {
    try {
        const { section_id } = req.params;
        const { section_name } = req.body;
        const updateSection = await pool.query(
            "UPDATE menu_section SET section_name = $1 WHERE section_id = $2", 
            [section_name, section_id]
        );
        res.json("Section is Updated!");
    } catch (err) {
        console.log(err)
        //log.error(err);
    }
})

//delete a section
app.delete("/sections/:section_id", async (req, res) => {
    try {
        const { section_id } = req.params; 
        const deleteSection = await pool.query(
            "DELETE FROM menu_section WHERE section_id = $1", 
            [section_id]
        );
        res.json("Section was Deleted!");
    } catch (err) {
        console.log(err)
        //log.error(err);
    }
});
//get setions from one restaurant
app.get("/section_and_cuisines", async (req, res) => {
    try {
        const section = await pool.query("SELECT * FROM section_and_cuisines ");

        res.json(section.rows);
    } catch (err) {
        console.log(err)
        //log.error(err);
    }
})
app.get("/section_and_cuisines/:cuisine_id", async (req, res) => {
    try {
        const { cuisine_id } = req.params;
        const section = await pool.query("SELECT * FROM section_and_cuisines WHERE cuisine_id = $1", [cuisine_id]);

        res.json(section.rows);
    } catch (err) {
        console.log(err)
        //log.error(err);
    }
})
//RESTAURANTSSSSSSSSSSSSSSSSSS
//get all restaurants
app.get("/cuisines", async (req, res) => {
    try {
        const allSections = await pool.query("SELECT * FROM types_of_cuisine order by cuisine_id")
        res.json(allSections.rows);
    } catch (err) {
        console.log(err)
        //log.error(err);
    }
})
app.get("/cuisines/:cuisine_id", async (req, res) => {
    try {
        const { cuisine_id } = req.params;
        const allSections = await pool.query("SELECT * FROM types_of_cuisine WHERE cuisine_id = $1", [cuisine_id])
        res.json(allSections.rows[0]);
    } catch (err) {
        console.log(err)
        //log.error(err);
    }
})
app.delete("/cuisines/:cuisine_id", async (req, res) => {
    try {
        const { cuisine_id } = req.params;
        const deleteCus = await pool.query("DELETE FROM types_of_cuisine WHERE cuisine_id = $1", [cuisine_id])
        res.json('deleted');
    } catch (err) {
        console.log(err)
        //log.error(err);
    }
})
app.put("/cuisines/:cuisine_id", async (req, res) => {
    try {
        const { cuisine_id } = req.params;
        const { cuisine_name, description, first_bg, hours, image, logo, second_bg, image2, image3, telegram, instagram, facebook, quote } = req.body;
        const updCuisines = await pool.query(
            "UPDATE types_of_cuisine SET cuisine_name = $1, description = $2, first_bg = $3, hours = $4, image = $5, logo = $6, second_bg = $7, image2 = $8, image3 = $9, telegram = $10, instagram = $11, facebook = $12, quote = $13 WHERE cuisine_id = $14", 
            [ cuisine_name, description, first_bg, hours, image, logo, second_bg, image2, image3, telegram, instagram, facebook, quote, cuisine_id ]
        )
        res.json(updCuisines.rows);
    } catch (err) {
        console.log(err)
        //log.error(err);
    }
})

app.post("/cuisines", async (req, res) => {
    try {
        const { cuisine_name, logo } = req.body;
        const allSections = await pool.query("INSERT INTO types_of_cuisine(cuisine_name, logo) VALUES($1, $2)",
        [ cuisine_name, logo ])
        res.json(allSections.rows);
    } catch (err) {
        console.log(err)
        //log.error(err);
    }
})
//COMPLEX INFORMATION

app.get("/complex", async (req, res) => {
    try {
        const allSections = await pool.query("SELECT * FROM complex_information")
        res.json(allSections.rows[0]);
    } catch (err) {
        console.log(err)
        //log.error(err);
    }
})
app.put("/complex", async (req, res) => {
    try {
        const { name, logo, frst_text, scnd_text, frst_bg, scnd_bg, adress, contacts, hours, frst_quote, scnd_quote, telegram, instagram, facebook, image } = req.body;
        const updComplex = await pool.query(
            "UPDATE complex_information SET name = $1, logo = $2, frst_text = $3, scnd_text = $4, frst_bg = $5, scnd_bg = $6, adress = $7, contacts = $8, hours = $9, frst_quote = $10, scnd_quote = $11, telegram = $12, instagram = $13, facebook = $14, image = $15 WHERE id = 1", 
            [ name, logo, frst_text, scnd_text, frst_bg, scnd_bg, adress, contacts, hours, frst_quote, scnd_quote, telegram, instagram, facebook, image ]
        )
        res.json(updComplex.rows);
    } catch (err) {
        console.log(err)
        //log.error(err);
    }
})
//MAIN INFORMATION

app.get("/mainifo", async (req, res) => {
    try {
        const allMenu = await pool.query("SELECT * FROM complex_information")
        res.json(allMenu.rows);
    } catch (err) {
        console.log(err)
        //log.error(err);
    }
})



//MENUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU

//CREATE

app.post('/menu', async (req, res) => {
    try {
        const { name, description, weight, section_id, cuisine_id } = req.body;
        const newDish = await pool.query(
            "INSERT INTO menu (name, description, weight, section_id, cuisine_id) VALUES($1, $2, $3, $4, $5) RETURNING *",
            [ name, description, weight, section_id, cuisine_id ]
        );

        res.json(newDish);
    } catch (err) {
        console.log(err)
        //log.error(err);
    }
})

//ALL MENU
app.get("/menu", async (req, res) => {
    try {
        const allMenu = await pool.query("SELECT * FROM all_menu")
        res.json(allMenu.rows);
    } catch (err) {
        console.log(err)
        //log.error(err);
    }
})

//DISH FROMONE category 
app.get("/menu/:section_name", async (req, res) => {
    try {
        const { section_name } = req.params;
        const menu = await pool.query("SELECT * FROM menu_and_section WHERE section_name = $1", [section_name]);

        res.json(menu.rows);
    } catch (err) {
        console.log(err)
        //log.error(err);
    }
})
//DISH FROMONE category 
app.get("/menu/cuisine/:cuisine_id", async (req, res) => {
    try {
        const { cuisine_id } = req.params;
        const menu = await pool.query("SELECT * FROM all_menu WHERE cuisine_id = $1 ORDER BY menu_id, cuisine_id, section_id", [cuisine_id]);

        res.json(menu.rows);
    } catch (err) {
        console.log(err)
        //log.error(err);
    }
})
//DISH FROMONE section 
app.get("/menu/section/:menu_id", async (req, res) => {
    try {
        const { menu_id } = req.params;
        const menu = await pool.query("SELECT * FROM menu WHERE menu_id = $1", [menu_id]);

        res.json(menu.rows[0]);
    } catch (err) {
        console.log(err)
        //log.error(err);
    }
})

//update a menu
app.put("/menu/:menu_id", async (req, res) => {
    try {
        const { menu_id } = req.params;
        const { name, description, weight, section_id } = req.body;
        const updateMenu = await pool.query(
            "UPDATE menu SET name = $1, description = $2, weight = $3, section_id = $4 WHERE menu_id = $5", 
            [name, description, weight, section_id, menu_id]
        );
        res.json("Menu is Updated!");
    } catch (err) {
        console.log(err)
        //log.error(err);
    }
})

//delete a dish
app.delete("/menu/:menu_id", async (req, res) => {
    try {
        const { menu_id } = req.params; 
        const deleteDish = await pool.query(
            "DELETE FROM menu WHERE menu_id = $1", 
            [menu_id]
        );
        res.json("Dish was Deleted!");
    } catch (err) {
        console.log(err)
        //log.error(err);
    }
});
//BOOOOOOOKIIIIIING

app.get("/booking", async (req, res) => {
    try {
        const allMenu = await pool.query("SELECT * FROM booking ORDER BY booking_date")
        res.json(allMenu.rows);
    } catch (err) {
        console.log(err)
        //log.error(err);
    }
})
//delete a dish
app.delete("/booking/:booking_id", async (req, res) => {
    try {
        const { booking_id } = req.params; 
        const deleteBooking = await pool.query(
            "DELETE FROM booking WHERE booking_id = $1", 
            [booking_id]
        );
        res.json("Dish was Deleted!");
    } catch (err) {
        console.log(err)
        //log.error(err);
    }
});
app.get("/booking/cuisine/:cuisine_id", async (req, res) => {
    try {
        const {cuisine_id} = req.params;
        const allMenu = await pool.query(
            "SELECT * FROM booking WHERE cuisine_id = $1 ORDER BY booking_date, booking_time",
            [cuisine_id]
        )
        res.json(allMenu.rows);
    } catch (err) {
        console.log(err)
        //log.error(err);
    }
})

app.post('/booking', async (req, res) => {
    try {
        const { client_name, client_surname, phone_number, email, booking_date, booking_time, cuisine_id, number_of_people } = req.body;
        const newBooking = await pool.query(
            "INSERT INTO booking (client_name, client_surname, phone_number, email, booking_date, booking_time, cuisine_id, number_of_people) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
            [client_name, client_surname, phone_number, email, booking_date, booking_time, cuisine_id, number_of_people]
        );
            
        const allSections = await pool.query("SELECT cuisine_name FROM types_of_cuisine WHERE cuisine_id = $1", [cuisine_id])
        
        const choosedRest = allSections.rows[0].cuisine_name
        
        
  
        transporter.sendMail({
            from: 'Odessa restaurants market <no-reply@odessarestaurantsmarket.com>',
            to: email,
            subject: `Бронь до ресторану`,
            text: `
                Доброго часу  ${client_name} ${client_surname}
                Ви успішно забронювали місце у "${choosedRest}".
                Дата: ${booking_date}
                Час: ${booking_time}
            `
          });

          transporter.sendMail({
            from: 'Odessa restaurants market <no-reply@odessarestaurantsmarket.com>',
            to: 'trofiki1@gmail.com',
            subject: 'Бронь до ресторану',
            text: `
                Створена нова бронь у "${choosedRest}".
                Ім'я: ${client_name} 
                Прізвище: ${client_surname}
                Номер телефону: ${phone_number}
                Пошта: ${email}
                Дата: ${booking_date}
                Час: ${booking_time}
                Кількість людей: ${number_of_people}
            `
        });
        res.json(newBooking);
    } catch (err) {
        console.log(err)
        //log.error(err);
    }
})

app.post('/feedback', async (req, res) => {
    try {
        const { client_name, client_surname, phone_number, email, message } = req.body;
        

        transporter.sendMail({
            from: 'Odessa restaurants market <no-reply@odessarestaurantsmarket.com>',
            to: 'trofiki1@gmail.com',
            subject: 'Повідомлення про ресторан від клієнта',
            text: `
                Створена нова бронь 
                Ім'я: ${client_name} 
                Прізвище: ${client_surname}
                Номер телефону: ${phone_number}
                Пошта: ${email}
                Повідомлення: 
                ${message}
            `
        });
    } catch (err) {
        console.log(err)
        //log.error(err);
    }
})





//BACKUP
// const util = require('util');
// const exec = util.promisify(require('child_process').exec);

// async function ls() {
//     try {
//         const { dump } = await exec(`pg_dump postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}  > restaurant.dump`);
//     } catch (err) {
//         console.error(err.message)        
//     }
// }
// ls()
// setInterval(ls, 21600000); //every 3 hours


//Logs
// var winston = require('winston');

// var tsFormat = () => (new Date()).toLocaleTimeString();
// var log = winston.createLogger({
//        transports: [
//            new (winston.transports.Console)({
//                timestamp: tsFormat,
//                colorize: true,
//                level: 'info'
//            }),
//            new (winston.transports.File)({
//                filename: './logs/log.log',
//                level: 'error'
//            })
//        ]
// });

// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "client/build/index.html"));
// });

app.listen(PORT, () => {
    console.log(`Life is Good : ${PORT}`);
});