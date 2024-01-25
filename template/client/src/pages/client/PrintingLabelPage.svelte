<script>
    import PrintingLabel from "../../components/PrintingLabel.svelte";

    let shippingInfo = {
        recipientName: 'MyShop.com',
        recipientAddress: '123 Main St',
        recipientCity: 'Amsterdam',
        recipientState: 'Noord-Holland',
        recipientZip: '12345',
        senderName: 'Jane Smith',
        senderAddress: '456 Elm St',
        senderCity: 'Another Town',
        senderState: 'NY',
        senderZip: '54321'
    };
</script>

<PrintingLabel {shippingInfo} />