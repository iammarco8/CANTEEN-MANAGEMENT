import ejs from "ejs";
import nodemailer from "nodemailer";
import { htmlToText } from "html-to-text";
import path from"path";

import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export class Email {
    #templateURL = path.join(__dirname,'../views/email/');
    constructor(student){
        this.to student.email;
        this.first_name = student.first_name;
        this.last_name = student.last_name;
        this.from = `[Canteen Management] <${process.env.EMAIL_FROM}>` 
        // how does this know where the config file is?
    }; 
    createMailTranport(){
        if(process.env.NODE_ENV != 'production'){
            return nodemailer.createTransport({
                host: 'sandbox.smtp.mailtrap.io',
                port: 587,
                auth: {
                    user:process.env.MAILTRAP_USER,
                    pass:process.env.MAILTRAP_PASS
                }
            });
        }else{
            return nodemailer.createTransport({
                host: 'mail.CanteenDomain.com',
                port: 465,
                secure: true,
                auth: {
                    user:process.env.EMAIL_USER,
                    pass:process.env.EMAIL_PASS
                }
            });
        }
    }

    async sendMail(template, subject, Orderinfo){
        const transport = this.createMailTranport();
        const html = await ejs.renderFile(this.#templateURL + template + '.ejs', {
            subject:subject,
            student_first_name: this.first_name,
            student_last_name: this.last_name,
        });
        return await transport.sendMail({
            to:`${this.to}, ${process.env.COPY_EMAIL}`,
            from:this.from,
            html:html,
            text:htmlToText(html),
            subject:subject
        });
    }
}