import { ISendReport } from "../../domain/services/ISalesService";
import { CreateError } from "../../utils/errorHandler.util";
import { mailer } from "../../utils/mailer";
import { STATUS_CODES } from "../../utils/statusCode.util";

export class SendReport implements ISendReport {

    async sendReport(blob: string): Promise<{ success: boolean; }> {
        const base64Data = blob.replace(/^data:application\/pdf;base64,/, "")
        const pdfBuffer = Buffer.from(base64Data, "base64")

        try {
            await mailer(pdfBuffer)
            return {success: true}
        } catch (error) {
            console.log(error)
            throw new CreateError(STATUS_CODES.BAD_REQUEST, 'Mail not send, please try again later')
        }
    }

}