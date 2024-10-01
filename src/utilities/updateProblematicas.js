import schedule from 'node-schedule';
import { Problematica } from '../models/Problematica.js'; 
import { Op } from 'sequelize';

const checkProblematicas = async () => {
    const now = new Date();
    const twoMinutesAgo = new Date(now.getTime() - 120 * 60 * 1000);

    try {
        const problematicas = await Problematica.findAll({
            where: {
                disponible: false,
                createdAt: {
                    [Op.lte]: twoMinutesAgo
                }
            }
        });

        for (const problematica of problematicas) {
            await Problematica.update(
                { disponible: true },
                { where: { id_problematica: problematica.id_problematica } }
            );
        }
    } catch (error) {
        console.error('Error al actualizar problematicas:', error);
    }
};
schedule.scheduleJob('*/1 * * * *', checkProblematicas);
