import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import dotenv from 'dotenv'
dotenv.config();

const clientId = process.env.clientId;
const clientSecret = process.env.clientSecret;
const refreshToken = process.env.refreshToken;

const OAuth2Client = new google.auth.OAuth2(
    clientId,
    clientSecret,
    'https://developers.google.com/oauthplayground'
);

OAuth2Client.setCredentials({
    refresh_token: refreshToken
});

const accessToken = OAuth2Client.getAccessToken();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: 'connect.bbms@gmail.com',
        clientId: '93864032611-kfs8mg7bg874uvnv0jh282n3alc11r92.apps.googleusercontent.com',
        clientSecret: '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',
        refreshToken: '1//04zs9sVrvSMDgCgYIARAAGAQSNwF-L9IrakrnNtshhxz3uinrsfiDG6XgW9zj1tYY4KSFoik59hwjOxvTtFOO3HR3_-lGpCFslMw',
        accessToken: accessToken
    }
});

export default transporter;