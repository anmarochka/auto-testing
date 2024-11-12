import * as fs from 'fs/promises';

export class Calculator {
    static sum(...args: number[]): number {
        return args.reduce((acc, curr) => acc + curr, 0);
    }

    static subduct(n1: number, n2: number): number {
        return n1 - n2;
    }

    static multiply(...args: number[]): number {
        return args.reduce((acc, curr) => acc * curr, 1);
    }

    static divide(n1: number, n2: number): number {
        if (n2 === 0) {
            throw new Error("Division by zero is not allowed.");
        }
        return n1 / n2;
    }

    static async sumFromFile(filePath: string): Promise<number> {
        try {
            const data = await fs.readFile(filePath, 'utf8');
            const numbers = data.split(/\s+/).map(Number).filter(n => !isNaN(n));
            return this.sum(...numbers);
        } catch (error) {
            throw new Error("Failed to read file: " + error.message);
        }
    }

    static async writeToFile(filePath: string, data: any): Promise<void> {
        const content = `результат: ${data}`;
        try {
            await fs.writeFile(filePath, content, 'utf8');
        } catch (error) {
            throw new Error("Failed to write to file: " + error.message);
        }
    }
}
