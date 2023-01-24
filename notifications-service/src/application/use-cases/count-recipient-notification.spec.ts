/* eslint-disable prettier/prettier */
import { makeNotification } from "@test/factories/notification-factory";
import { inMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository";
import { CountRecipientNotifications } from "./count-recipient-notification";

describe('Count recipient notifications', () => {
    it('should be able to count recipient notifications', async () => {
        const notificationsRepository = new inMemoryNotificationsRepository();
        const countRecipientNotification = new CountRecipientNotifications(notificationsRepository);


        await notificationsRepository.create(
            makeNotification({ recipientId: 'recipient-1' })
        );

        await notificationsRepository.create(
            makeNotification({ recipientId: 'recipient-1' })
        );

        await notificationsRepository.create(
            makeNotification({ recipientId: 'recipient-2' })
        );

        const { count } = await countRecipientNotification.execute({
            recipientId: 'recipient-1',
        });

        expect(count).toEqual(2);
    });
})