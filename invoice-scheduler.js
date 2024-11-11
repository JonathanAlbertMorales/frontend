class Invoicer {
    constructor(sendSchedule) {
        this.sendSchedule = sendSchedule;
    }

    sendEmails(customerInvoices, customerPayments) {
        let emailList = [];
        let outstandingBalances = {};
        let delinquentCustomers = {};

        // Initialize outstanding balances for each customer invoice
        customerInvoices.forEach(invoice => {
            outstandingBalances[invoice.name] = invoice.amount;
        });

        // Apply customer payments
        customerPayments.forEach(payment => {
            if (outstandingBalances.hasOwnProperty(payment.name)) {
                outstandingBalances[payment.name] -= payment.amount;
            }
        });

        // Iterate through each customer invoice and generate the emails based on the send schedule
        customerInvoices.forEach(invoice => {
            let invoiceTime = invoice.invoice_time;
            let name = invoice.name;
            let amount = invoice.amount;

            // Generate emails based on the send schedule
            for (let daysBefore in this.sendSchedule) {
                let emailTime = invoiceTime + parseInt(daysBefore);
                let emailType = this.sendSchedule[daysBefore];

                // Only add emails if the customer still owes money
                if (outstandingBalances[name] > 0) {
                    emailList.push({ emailTime, emailType, name, amount: outstandingBalances[name] });
                }
            }

            // Check if the customer is delinquent
            if (outstandingBalances[name] > 0 && (invoiceTime + 30) < Date.now()) {
                delinquentCustomers[name] = outstandingBalances[name];
            }
        });

        // Sort the emails by the time they need to be sent
        emailList.sort((a, b) => a.emailTime - b.emailTime);

        // Print out the emails in the required format
        emailList.forEach(email => {
            console.log(`${email.emailTime}: [${email.emailType}] Invoice for ${email.name} for ${email.amount} dollars`);
        });

        // Print the list of delinquent customers
        console.log("\nDelinquent Customers:");
        for (let name in delinquentCustomers) {
            console.log(`${name} owes ${delinquentCustomers[name]} dollars`);
        }
    }
}

// Example usage
const sendSchedule = {
    '-10': "Upcoming",
    '0': "New",
    '20': "Reminder",
    '30': "Due"
};

const invoicer = new Invoicer(sendSchedule);

const customerInvoices = [
    { invoice_time: 0, name: "Alice", amount: 200 },
    { invoice_time: 1, name: "Bob", amount: 100 },
];

const customerPayments = [
    { payment_time: -9, name: "Alice", amount: 100 },
    { payment_time: 1, name: "Alice", amount: 50 },
    { payment_time: 0, name: "Bob", amount: 100 },
];

invoicer.sendEmails(customerInvoices, customerPayments);
