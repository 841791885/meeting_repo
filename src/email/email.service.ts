import { Injectable } from '@nestjs/common';
import {
  nodemailer_host,
  nodemailer_port,
  nodemailer_auth_user,
  nodemailer_auth_pass,
} from 'config';
import { createTransport, Transporter } from 'nodemailer';

@Injectable()
export class EmailService {
  transporter: Transporter;

  constructor() {
    this.transporter = createTransport({
      host: nodemailer_host,
      port: nodemailer_port,
      secure: false,
      auth: {
        user: nodemailer_auth_user,
        pass: nodemailer_auth_pass,
      },
    });
  }

  async sendMail({ to, subject, html }) {
    await this.transporter.sendMail({
      from: {
        name: '会议室预定系统',
        address: nodemailer_auth_user,
      },
      to,
      subject,
      html,
    });
  }
}
