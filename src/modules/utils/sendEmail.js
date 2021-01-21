const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email) => {

    sgMail.send({
        to:email,   
        from:'vuquanganh270297@gmail.com',
        subject:'Welcome to Job Finder',
        text: `Welcome to Job Finder. We hope our service will pleased you, ${email}`

    })
}

const sendRejectEmail = ({employee, company, job}) => {

    sgMail.send({
        to:employee,
        from:'vuquanganh270297@gmail.com',
        subject:`Notification from ${job} - ${company}`,
        text:'Sorry! We regret to inform that you have not been selected for this job. Please keep applying and we with you will find a suitable one.'
    })
}

const sendShortlistEmail = ({employee, company, job}) => {

    sgMail.send({
        to:employee,
        from:'vuquanganh270297@gmail.com',
        subject:`Notification from ${job} - ${company}`,
        text:'Congratulation! We happy to inform that you have been shortlisted for this job. Pay attention to your mail box or mobile phone for personal contact from the employer.'
    })
}

module.exports = {sendWelcomeEmail, sendRejectEmail, sendShortlistEmail}