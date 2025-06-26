export interface PayUDatos {
    merchantId: string;
    accountId: string;
    description: string;
    referenceCode: string;
    amount: string;
    currency: string;
    signature: string;
    test: string;
    buyerEmail: string;
    responseUrl: string;
    confirmationUrl: string;
}