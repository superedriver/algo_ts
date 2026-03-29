import { Huffman } from "./index";

describe("Huffman", () => {
  describe("encode and decode", () => {
    test("decode(encoded text) equals original text", () => {
      const text = "hello";
      const huffman = new Huffman(text);
      expect(huffman.decode()).toBe(text);
    });

    test("repeated single character", () => {
      const text = "aaaa";
      const huffman = new Huffman(text);
      expect(huffman.decode()).toBe(text);
    });

    test("encodedText is binary string and decode restores original", () => {
      const text = "abracadabra";
      const huffman = new Huffman(text);
      expect(huffman.encodedText).toMatch(/^[01]+$/);
      expect(huffman.encodedText.length).toBeGreaterThan(0);
      expect(huffman.decode()).toBe(text);
    });
  });

  describe("edge cases", () => {
    test("empty string throws when building tree", () => {
      expect(() => new Huffman("")).toThrow();
    });

    test("unicode characters round-trip", () => {
      const text = "привіт 世界";
      const huffman = new Huffman(text);
      expect(huffman.decode()).toBe(text);
    });

    test("digits and symbols", () => {
      const text = "a1b2c3!!!";
      const huffman = new Huffman(text);
      expect(huffman.decode()).toBe(text);
    });
  });
});
