import dotenv from 'dotenv'
import nodemailer from "nodemailer"

dotenv.config()

export const mailer = async (pdfBuffer: Buffer) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: 'akashsurendran1001@gmail.com',
        subject: "Sales Report",
        text: "Please find attached the sales report.",
        attachments: [
            {
                filename: "sales-report.pdf",
                content: pdfBuffer
            }
        ]
    })
}