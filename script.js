// generating a QR code from a user-provided URL using inquirer and qr-image

import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

inquirer
    .prompt([
        {
        message:"Please enter the link if you want to encode in the QR code:",    
        name: "URL",
        },
])
    .then((answers)=>{
        const url = answers.URL;
        var qr_svg =qr.image(url);
        qr_svg.pipe(fs.createWriteStream("qr_img.png"));
       fs.writeFile("qr_img.txt", url, (err) => {
            if (err) {
                console.error("Error writing to file:", err);
            } else {
                console.log("QR code generated and saved as qr_img.png and qr_img.txt");
            }
        });
    })
    .catch((error) => {
        if(error.isTtyError) {
            console.error("Prompt couldn't be rendered in the current environment.");
        } else{
        console.error("An error occurred:", error);
        }
    });