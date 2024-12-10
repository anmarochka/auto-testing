import { describe, it, expect } from 'vitest';
import { Calculator } from '../../src/calculator';
import * as fs from 'fs/promises';

describe("Calculator", () => {
    // Тест для метода sum
    it("should sum multiple numbers", () => {
        expect(Calculator.sum(1, 2, 3)).toBe(6);
        expect(Calculator.sum(5)).toBe(5); 
        expect(Calculator.sum()).toBe(0); 
    });

    // Тест для метода subduct
    it("should subtract two numbers", () => {
        expect(Calculator.subduct(5, 3)).toBe(2);
        expect(Calculator.subduct(10, 20)).toBe(-10); 
    });

    // Тест для метода multiply
    it("should multiply multiple numbers", () => {
        expect(Calculator.multiply(2, 3, 4)).toBe(24);
        expect(Calculator.multiply(5)).toBe(5); 
        expect(Calculator.multiply()).toBe(1); 
    });

    // Тест для метода divide
    it("should divide two numbers", () => {
        expect(Calculator.divide(10, 2)).toBe(5);
    });

    it("should throw an error for division by zero", () => {
        expect(() => Calculator.divide(10, 0)).toThrow("Division by zero is not allowed.");
    });

    // Тест для метода sumFromFile
    it("should sum numbers from a file", async () => {
        const testFilePath = 'data/numbers.txt';

        await fs.writeFile(testFilePath, '10 20 30 40');

        const result = await Calculator.sumFromFile(testFilePath);
        expect(result).toBe(100); 

        await fs.unlink(testFilePath);
    });

    // Тест для метода writeToFile
    it("should write result to a file", async () => {
        const filePath = 'data/result.txt';
        const data = 123;

        await Calculator.writeToFile(filePath, data);

        const content = await fs.readFile(filePath, 'utf8');
        expect(content).toBe("результат: 123");

        await fs.unlink(filePath);
    });

    // Дополнительный тест для обработки ошибки в sumFromFile
    it("should throw an error if the file does not exist in sumFromFile", async () => {
        const nonExistentFilePath = 'data/non_existent_file.txt';
        
        await expect(Calculator.sumFromFile(nonExistentFilePath)).rejects.toThrow("Failed to read file");
    });

    // Дополнительный тест для обработки ошибки в writeToFile
    it("should throw an error if there is an issue writing to the file in writeToFile", async () => {
        const invalidFilePath = '/invalid_path/result.txt';
        
        await expect(Calculator.writeToFile(invalidFilePath, 123)).rejects.toThrow("Failed to write to file");
    });
});