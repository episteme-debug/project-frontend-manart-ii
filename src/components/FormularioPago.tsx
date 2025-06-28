import { PayUDatos } from '@/interface/PayUDatos';

interface Props {
    datos: PayUDatos;
}

export default function FormularioPago({ datos }: Props) {
    console.log("Datos recibidos en FormularioPago:", datos);
    return (
        <form
            method="post"
            action="https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu"
        >
            <input name="merchantId" type="hidden" value={datos.merchantId} />
            <input name="accountId" type="hidden" value={datos.accountId} />
            <input name="description" type="hidden" value={datos.description} />
            <input name="referenceCode" type="hidden" value={datos.referenceCode} />
            <input name="amount" type="hidden" value={datos.amount} />
            <input name="tax" type="hidden" value="" />
            <input name="taxReturnBase" type="hidden" value="" />
            <input name="currency" type="hidden" value={datos.currency} />
            <input name="signature" type="hidden" value={datos.signature} />
            <input name="test" type="hidden" value={datos.test} />
            <input name="buyerEmail" type="hidden" value={datos.buyerEmail} />
            <input name="responseUrl" type="hidden" value={datos.responseUrl} />
            <input name="confirmationUrl" type="hidden" value={datos.confirmationUrl} />
            <input name="Submit" type="submit" value="Pagar ahora" />
        </form>
    );
}
