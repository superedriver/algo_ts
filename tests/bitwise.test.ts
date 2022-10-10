import { FlagConverter } from "../src/bitwise"

describe('Bitwise', () => {
    test('Empty Converter', () => {
        const converter = new FlagConverter();
        expect(converter.checkFlag(0b001)).toBe(false);
        expect(converter.checkFlag(0b010)).toBe(false);
        expect(converter.checkFlag(0b100)).toBe(false);
    });

    test('Converter with initial Descriptor', () => {
        const converter = new FlagConverter(0b010);
        expect(converter.checkFlag(0b001)).toBe(false);
        expect(converter.checkFlag(0b010)).toBe(true);
        expect(converter.checkFlag(0b100)).toBe(false);
    });

    test('Set setFlag', () => {
        const converter = new FlagConverter();
        expect(converter.checkFlag(0b001)).toBe(false);
        expect(converter.checkFlag(0b010)).toBe(false);
        expect(converter.checkFlag(0b100)).toBe(false);
        converter.setFlag(0b010);
        expect(converter.checkFlag(0b001)).toBe(false);
        expect(converter.checkFlag(0b010)).toBe(true);
        expect(converter.checkFlag(0b100)).toBe(false);
    });

    test('Remove setFlag', () => {
        const converter = new FlagConverter(0b010);
        expect(converter.checkFlag(0b001)).toBe(false);
        expect(converter.checkFlag(0b010)).toBe(true);
        expect(converter.checkFlag(0b100)).toBe(false);
        converter.removeFlag(0b010);
        expect(converter.checkFlag(0b001)).toBe(false);
        expect(converter.checkFlag(0b010)).toBe(false);
        expect(converter.checkFlag(0b100)).toBe(false);
    });
});
