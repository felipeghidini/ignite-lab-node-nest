/* eslint-disable prettier/prettier */
import { Content } from "@application/entities/content";
import { Notification } from "@application/entities/notification";
import { inMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository";
import { CancelNotification } from "./cancel-notification";

describe('Cancel notification', () => {
    it('should to cancel a notification', async () => {
        const notificationsRepository = new inMemoryNotificationsRepository();
        const cancelNotification = new CancelNotification(notificationsRepository);

        const notification = new Notification({
            category: 'social',
            content: new Content('This is a notification'),
            recipientId: 'example-recipient-id'
        });

        await notificationsRepository.create(notification);

        await cancelNotification.execute({
            notificationId: notification.id,
        });

        expect(notificationsRepository.notifications[0].cenceledAt).toEqual(expect.any(Date),
        );
    })
})