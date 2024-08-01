export function calculateDownPaymentYears(
  principalPaid: number,
  principal: number,
  annualInterestRate: number,
  years: number,
) {
  // Remaining principal amount
  const principalRemaining = principal - principalPaid;

  // Convert annual interest rate to monthly interest rate
  const monthlyInterestRate = annualInterestRate / (12 * 100);

  // Total number of monthly payments
  const totalPayments = years * 12;

  // Calculate the monthly payment using the formula for a fixed-rate mortgage
  const monthlyPayment =
    (principalRemaining * monthlyInterestRate) /
    (1 - Math.pow(1 + monthlyInterestRate, -totalPayments));

  // Down payment is typically a percentage of the remaining principal (e.g., 20%)
  const downPayment = 0.2 * principalRemaining; // Change 0.2 to your desired percentage

  return Math.ceil(monthlyPayment);
}
