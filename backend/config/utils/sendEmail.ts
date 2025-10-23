import nodemailer from 'nodemailer'

const sendOtpEmail = async (email: string, otp:number) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.email,
            pass: process.env.pass
        }
    });

    const info = await transporter.sendMail({
        from: 'MediConnect <' + process.env.email + '>',
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is: ${otp}`
    });
}

export default sendOtpEmail 