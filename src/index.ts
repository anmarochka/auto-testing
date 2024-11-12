import { Calculator } from './calculator';

async function main() {
    const resultSum = Calculator.sum(1, 2, 3, 4);
    console.log("Sum:", resultSum);

    const resultSubduct = Calculator.subduct(10, 5);
    console.log("Subduct:", resultSubduct);

    const resultMultiply = Calculator.multiply(2, 3, 4);
    console.log("Multiply:", resultMultiply);

    const resultDivide = Calculator.divide(10, 2);
    console.log("Divide:", resultDivide);

    try {
        const sumFromFile = await Calculator.sumFromFile('data/numbers.txt');
        console.log("Sum from file:", sumFromFile);
    } catch (error) {
        console.error(error);
    }

    try {
        await Calculator.writeToFile('result.txt', resultSum);
        console.log("Result written to file.");
    } catch (error) {
        console.error(error);
    }
}

main();
