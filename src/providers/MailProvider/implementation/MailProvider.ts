import axios from 'axios';
import nodemailer from 'nodemailer';
import {
  IEmail,
  IMailProvider,
  IPushNotification,
  ISMS,
} from '../IMailProvider';

class MailProvider implements IMailProvider {
  private transport: nodemailer.Transporter;

  constructor() {
    this.transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '465', 10),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendEmail(email: IEmail): Promise<void> {
    await this.transport.sendMail(email);
  }

  async sendPush({
    workshopName,
    message,
    userIds,
  }: IPushNotification): Promise<void> {
    await axios.post(
      'https://onesignal.com/api/v1/notifications',
      {
        app_id: process.env.ONESIGNAL_APP_ID,
        include_external_user_ids: userIds,
        contents: {
          pt: message,
          en: message,
        },
        // TODO: badge_count IOS
        ios_badgeType: 'Increase',
        ios_badgeCount: 1,

        headings: {
          pt: workshopName,
          en: workshopName,
        },
        channel_for_external_user_ids: 'push',
      },
      {
        headers: {
          Authorization: `Basic ${process.env.ONESIGNAL_REST_API_KEY}`,
        },
      },
    );
  }

  async sendManyPush(data: IPushNotification[]): Promise<void> {
    const notifications = data.map(notification => ({
      app_id: process.env.ONESIGNAL_APP_ID,
      include_external_user_ids: notification.userIds,
      contents: {
        pt: notification.message,
        en: notification.message,
      },
      ios_badgeType: 'Increase',
      ios_badgeCount: 1,
      headings: {
        pt: notification.workshopName,
        en: notification.workshopName,
      },
      channel_for_external_user_ids: 'push',
    }));

    await Promise.all(
      notifications.map(notification =>
        axios.post('https://onesignal.com/api/v1/notifications', notification, {
          headers: {
            Authorization: `Basic ${process.env.ONESIGNAL_REST_API_KEY}`,
          },
        }),
      ),
    );
  }

  async sendSms({ phones, message }: ISMS): Promise<void> {
    const includePhones = phones.map(phone => {
      const cleanedPhone = phone.replace(/[^\d+]+/gm, '');

      if (!phone.startsWith('+55')) {
        return `+55${cleanedPhone}`;
      }

      return cleanedPhone;
    });

    await axios.post(
      'https://onesignal.com/api/v1/notifications',
      {
        app_id: process.env.ONESIGNAL_APP_ID,
        include_phone_numbers: includePhones,
        contents: {
          pt: message,
          en: message,
        },
        name: 'Autocenter App',
        sms_from: process.env.TWILIO_PHONE,
        channel_for_external_user_ids: 'sms',
      },
      {
        headers: {
          Authorization: `Basic ${process.env.ONESIGNAL_REST_API_KEY}`,
        },
      },
    );
  }
}

export { MailProvider };
