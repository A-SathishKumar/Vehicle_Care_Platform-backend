import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.GMAIL_USER,
        pass:process.env.GMAIL_PASS
    },
});

export const mailoptions = {
    from:"askasknkl1206@gmail.com",
    to:"askasknkl@gmail.com",
    subject:"This is For Demo",
    text:"This is for Demo Process"
};