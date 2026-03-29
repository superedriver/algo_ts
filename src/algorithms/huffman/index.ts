import { text } from "./text";
import { MinPriorityQueue } from "../../dataStructures/minPriorityQueue";

function randomLowerLatin100k(n: number): string {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  const bytes = new Uint8Array(n);
  crypto.getRandomValues(bytes);

  const arr = new Array(n);
  for (let i = 0; i < n; i++) {
    arr[i] = letters[bytes[i]! % 26];
  }
  return arr.join("");
}

class Node {
  sum: number;
  code: string;

  constructor(sum: number) {
    this.sum = sum;
    this.code = "";
  }

  buildCode(code: string) {
    this.code = code;
  }
}

class LeafNode extends Node {
  symbol: string;
  constructor(symbol: string, frequency: number) {
    super(frequency);
    this.symbol = symbol;
  }

  buildCode(code: string) {
    this.code = code;
  }
}

class InternalNode extends Node {
  left: Node;
  right: Node;

  constructor(left: Node, right: Node) {
    super(left.sum + right.sum);
    this.left = left;
    this.right = right;
  }

  buildCode(code: string) {
    this.left.buildCode(code + "1");
    this.right.buildCode(code + "0");
  }
}

const nodeComparator = (a: Node, b: Node) => a.sum - b.sum;

export class Huffman {
  text: string;
  encodedText: string;
  private codeToSymbol: Record<string, string>;

  constructor(text: string) {
    this.text = text;

    let frequencyMap: Record<string, number> = {};

    // Count frequency
    for (let i = 0; i < text.length; i++) {
      const symbol = text[i] as string;
      frequencyMap[symbol] = (frequencyMap[symbol] || 0) + 1;
    }
    // console.log("frequencyMap: ", frequencyMap);

    const mpq = new MinPriorityQueue<Node>([], nodeComparator);
    const symbolToNode: Record<string, LeafNode> = {};

    // Create LeafNodes
    Object.entries(frequencyMap).forEach(([symbol, sum]) => {
      const leafNode = new LeafNode(symbol, sum);
      mpq.insert(leafNode);

      symbolToNode[symbol] = leafNode;
    });

    // Create InternalNodes
    while (mpq.size > 1) {
      const left = mpq.extractMin();
      const right = mpq.extractMin();
      if (left === null || right === null) {
        throw new Error("Huffman: Create InternalNodes returned null while size > 1");
      }
      const internalNode = new InternalNode(left, right);
      mpq.insert(internalNode);
    }

    const root = mpq.extractMin();
    if (root === null) {
      throw new Error("Huffman: expected single root after build");
    }
    root.buildCode("");

    // Single symbol: root is the only leaf and got code "". Use "0" so encode/decode round-trip works.
    if (Object.keys(symbolToNode).length === 1) {
      root.code = "0";
      const leaf = root as LeafNode;
      symbolToNode[leaf.symbol] = leaf;
    }

    let answer = "";

    // build codeToSymbol for decoding
    this.codeToSymbol = Object.values(symbolToNode).reduce(
      (acc: Record<string, string>, leafNode: LeafNode) => {
        acc[leafNode.code] = leafNode.symbol;
        return acc;
      },
      {},
    );

    // Generate code
    for (let i = 0; i < text.length; i++) {
      const curr = text[i] as string;
      if (!symbolToNode[curr]) {
        throw new Error("invalid char");
      }
      const code = symbolToNode[curr].code;
      answer += code;
    }

    this.encodedText = answer;
  }

  decode() {
    let result = "";
    let currentCode = "";
    for (let i = 0; i < this.encodedText.length; i++) {
      currentCode += this.encodedText[i];
      if (this.codeToSymbol[currentCode]) {
        result += this.codeToSymbol[currentCode];
        currentCode = "";
      }
    }

    return result;
  }
}

async function main() {
  const huffman = new Huffman(text);
  // const huffman = new Huffman("aaaa");
  console.log("huffman.encodedText: ", huffman.encodedText);
  const res = huffman.decode();
  console.log("res: ", res);
  console.log("res === huffman", res === text);
}

main().catch(console.error);
